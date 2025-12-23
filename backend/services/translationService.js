const { translateClient, languageCodeMap } = require('../config/googleCloud');

// In-memory cache: { "source_target_text": "translation", ... }
// This is a simple implementation. For production scaling, consider Redis.
const translationCache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const CACHE_CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour

// Cache metadata to track expiration
const cacheMetadata = new Map();

// Cleanup routine
setInterval(() => {
    const now = Date.now();
    for (const [key, timestamp] of cacheMetadata.entries()) {
        if (now - timestamp > CACHE_TTL) {
            translationCache.delete(key);
            cacheMetadata.delete(key);
        }
    }
}, CACHE_CLEANUP_INTERVAL);

/**
 * Generate a cache key for a translation request
 */
const getCacheKey = (text, targetLang, sourceLang) => {
    // Use base64 for text to handle special characters safely in keys
    const textKey = Buffer.from(text).toString('base64');
    return `${sourceLang || 'auto'}_${targetLang}_${textKey}`;
};

/**
 * Translate a single text string
 */
const translateText = async (text, targetLang, sourceLang = null) => {
    if (!text || typeof text !== 'string') return text;

    // Normalize codes
    const targetCode = languageCodeMap[targetLang] || targetLang;

    // Check cache
    const cacheKey = getCacheKey(text, targetCode, sourceLang);
    if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey);
    }

    try {
        const options = { to: targetCode };
        if (sourceLang) {
            options.from = languageCodeMap[sourceLang] || sourceLang;
        }

        // Exponential backoff logic for rate limits could be implemented here if needed,
        // but the Google client handles some retries automatically.
        // For manual implementation:
        const [translation] = await retryOperation(() => translateClient.translate(text, options));

        // Cache the result
        // NEVER cache if translation equals original (implies failure or same lang) - unless strict requirement
        // But here we might want to cache valid same-lang translations if they happen?
        // The requirement says: "Never cache translations that equal original text"
        // However, for valid same-language requests, they are equal.
        // We'll assume the client is smart enough to not request same-lang translation,
        // or if they do, we shouldn't cache it as a "costly" operation result.
        if (translation !== text) {
            translationCache.set(cacheKey, translation);
            cacheMetadata.set(cacheKey, Date.now());
        }

        return translation;
    } catch (error) {
        console.error(`Translation error for "${text.substring(0, 20)}...":`, error.message);
        // Graceful fallback
        return text;
    }
};

/**
 * Translate an array of texts
 */
const translateBatch = async (texts, targetLang, sourceLang = null) => {
    if (!Array.isArray(texts) || texts.length === 0) return [];

    const targetCode = languageCodeMap[targetLang] || targetLang;

    // Identify missing translations
    const results = new Array(texts.length).fill(null);
    const uncachedIndices = [];
    const uncachedTexts = [];

    texts.forEach((text, index) => {
        if (!text || typeof text !== 'string') {
            results[index] = text;
            return;
        }
        const cacheKey = getCacheKey(text, targetCode, sourceLang);
        if (translationCache.has(cacheKey)) {
            results[index] = translationCache.get(cacheKey);
        } else {
            uncachedIndices.push(index);
            uncachedTexts.push(text);
        }
    });

    // If all cached, return
    if (uncachedTexts.length === 0) return results;

    // Process uncached in batches if Google API has limits (handled by client mostly, but good to chunk)
    // Google Cloud Translate v2 standard limit is 128 strings per request (Basic) or higher (Advanced).
    // We'll chunk safely at 100.
    const CHUNK_SIZE = 100;

    for (let i = 0; i < uncachedTexts.length; i += CHUNK_SIZE) {
        const chunk = uncachedTexts.slice(i, i + CHUNK_SIZE);
        const chunkIndices = uncachedIndices.slice(i, i + CHUNK_SIZE);

        try {
            const options = { to: targetCode };
            if (sourceLang) options.from = languageCodeMap[sourceLang] || sourceLang;

            const [translations] = await retryOperation(() => translateClient.translate(chunk, options));

            // Handle case where single string returns string instead of array
            const translationArray = Array.isArray(translations) ? translations : [translations];

            translationArray.forEach((trans, idx) => {
                const originalIndex = chunkIndices[idx];
                const originalText = chunk[idx];

                results[originalIndex] = trans;

                // Cache
                if (trans !== originalText) {
                    const cacheKey = getCacheKey(originalText, targetCode, sourceLang);
                    translationCache.set(cacheKey, trans);
                    cacheMetadata.set(cacheKey, Date.now());
                }
            });
        } catch (error) {
            console.error('Batch translation error:', error.message);
            // Fallback for this chunk
            chunkIndices.forEach(idx => {
                results[idx] = texts[idx];
            });
        }
    }

    return results;
};

/**
 * Recursively translate object values for specified keys
 */
const translateObject = async (obj, targetLang, sourceLang = null, keysToTranslate = []) => {
    if (!obj || typeof obj !== 'object') return obj;

    // Deep clone to avoid mutating original if needed, assuming valid JSON
    const result = JSON.parse(JSON.stringify(obj));

    // Collect all texts that need translation to do a batch request
    const textMap = new Map(); // path -> text

    const collectTexts = (current, path = '') => {
        if (Array.isArray(current)) {
            current.forEach((item, idx) => collectTexts(item, `${path}[${idx}]`));
        } else if (current && typeof current === 'object') {
            Object.keys(current).forEach(key => {
                const newPath = path ? `${path}.${key}` : key;
                const value = current[key];

                // If it's a string and key is in keysToTranslate (or keysToTranslate is empty/wildcard?)
                // Requirement implies "Selective key translation".
                // If keysToTranslate is provided, only translate those keys.
                // If key is in keysToTranslate:
                const shouldTranslate = !keysToTranslate.length || keysToTranslate.includes(key);

                if (typeof value === 'string' && shouldTranslate) {
                    textMap.set(newPath, value);
                } else if (typeof value === 'object') {
                    collectTexts(value, newPath);
                }
            });
        }
    };

    collectTexts(result);

    if (textMap.size === 0) return result;

    const paths = Array.from(textMap.keys());
    const texts = Array.from(textMap.values());

    const translations = await translateBatch(texts, targetLang, sourceLang);

    // Apply translations back to result
    paths.forEach((path, index) => {
        setObjectValue(result, path, translations[index]);
    });

    return result;
};

// Helper for object path setting
const setObjectValue = (obj, path, value) => {
    // Handle array indexing like 'items[0].description'
    // Simplified path handling: existing keys only
    // This is a basic implementation. A proper 'lodash.set' style might be needed for complex cases,
    // but for our traversal structure, strictly following the path generated should work.
    // Note: path is like 'items[0].name' or 'title'

    // We need to parse brackets for arrays
    const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');

    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
};

/**
 * Retry Operation with Exponential Backoff
 */
const retryOperation = async (fn, retries = 3, delay = 1000) => {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) throw error;

        // Check if error is retryable (rate limits usually 429 or 5xx)
        // Google Cloud errors usually have a code
        if (error.code === 429 || error.code === 500 || error.code === 503) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return retryOperation(fn, retries - 1, delay * 2);
        }

        throw error;
    }
};

module.exports = {
    translateText,
    translateBatch,
    translateObject
};
