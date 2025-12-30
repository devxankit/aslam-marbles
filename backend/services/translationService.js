const { translateClient, languageCodeMap } = require('../config/googleCloud');
const TranslationCache = require('../models/TranslationCache');
const crypto = require('crypto');
const mongoose = require('mongoose');

// Skip list for proper nouns that should NOT be translated (deity names, brand names, etc.)
const SKIP_TRANSLATION_PATTERNS = [
    // Deity names - Gods
    'Hanuman', 'Hanuman ji', 'Hanuman Ji', 'Hanumanji',
    'Ganesha', 'Ganesh', 'Ganapati', 'Ganpati',
    'Krishna', 'Krishna ji', 'Krishn', 'Shri Krishna',
    'Shiva', 'Shiv', 'Mahadev', 'Shivji', 'Shiv ji',
    'Vishnu', 'Vishnu ji', 'Vishnuji',
    'Brahma', 'Brahmaji',
    'Ram', 'Rama', 'Ram ji', 'Shri Ram',
    'Lakshman', 'Laxman', 'Lakshmana',
    'Nandi', 'Nandi ji', 'Nandiswara',
    'Sai Baba', 'Sai', 'Shirdi Sai', 'Saibaba',
    'Buddha', 'Gautam Buddha',
    'Balaji', 'Tirupati Balaji',
    'Natraja', 'Nataraja', 'Natraj',
    'Laddu Gopal', 'Ladoo Gopal', 'Gopal',
    // Deity names - Goddesses
    'Durga', 'Durga Maa', 'Durgaji', 'Maa Durga',
    'Kali', 'Mahakali', 'Kaali', 'Maa Kali',
    'Laxmi', 'Lakshmi', 'Laxmiji', 'Maa Laxmi',
    'Saraswati', 'Saraswati Devi', 'Maa Saraswati',
    'Radha', 'Radha Rani', 'Radhaji', 'Radhe',
    'Parvati', 'Parvathi', 'Parvatiji',
    // Pair/Group names
    'Ram Darbar',
    'Shiv Parivar', 'Shiv Parvati', 'Shiv-Parvati',
    'Radha Krishna', 'Radha-Krishna',
    'Vishnu Laxmi', 'Vishnu-Laxmi',
    'Ganesh Laxmi', 'Ganesh-Laxmi',
    'Ganesh Laxmi Saraswati',
    'Jugal Jodi',
    // Jain deities
    'Jain Gods', 'Jain Murti', 'Mahavir', 'Parshvanath',
    // Brand names
    'Aslam Marble', 'Aslam Marble Suppliers', 'AMS',
    // Other proper nouns
    'Tulsi', 'Tulsi Gamla'
];

// Check if text should skip translation (is a proper noun)
const shouldSkipTranslation = (text) => {
    if (!text || typeof text !== 'string') return false;
    const normalizedText = text.trim();
    // Exact match (case-insensitive)
    return SKIP_TRANSLATION_PATTERNS.some(pattern =>
        normalizedText.toLowerCase() === pattern.toLowerCase()
    );
};

// L1 Cache: In-memory cache for fastest access (short TTL)
const translationCache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour for in-memory cache
const CACHE_CLEANUP_INTERVAL = 30 * 60 * 1000; // 30 minutes

// Cache metadata to track expiration
const cacheMetadata = new Map();

// Cleanup routine for in-memory cache
setInterval(() => {
    const now = Date.now();
    for (const [key, timestamp] of cacheMetadata.entries()) {
        if (now - timestamp > CACHE_TTL) {
            translationCache.delete(key);
            cacheMetadata.delete(key);
        }
    }
}, CACHE_CLEANUP_INTERVAL);

// Helper to hash text
const hashText = (text) => {
    return crypto.createHash('sha256').update(text.trim()).digest('hex');
};

/**
 * Fallback provider: MyMemory (free, rate-limited).
 * Used when Google Translate is not configured/enabled.
 */
const translateViaMyMemory = async (text, targetLang, sourceLang = 'en') => {
    try {
        const q = encodeURIComponent(text);
        const langpair = encodeURIComponent(`${sourceLang}|${targetLang}`);
        const url = `https://api.mymemory.translated.net/get?q=${q}&langpair=${langpair}`;

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'aslam-marbles-translation/1.0'
            }
        });

        if (!res.ok) return text;
        const data = await res.json().catch(() => null);
        const translated = data?.responseData?.translatedText;

        // Check for error messages from API that indicate failed translation
        if (typeof translated === 'string') {
            const lowerTranslated = translated.toLowerCase();
            // Filter out common error messages from translation APIs
            if (lowerTranslated.includes('does not need a translation') ||
                lowerTranslated.includes('optional') ||
                lowerTranslated.includes('city name') ||
                lowerTranslated.includes('probably does not') ||
                lowerTranslated.includes('no translation')) {
                return text; // Return original if error message detected
            }
            if (translated.trim()) return translated;
        }
        return text;
    } catch (_) {
        return text;
    }
};

/**
 * Generate a cache key for a translation request
 */
const getCacheKey = (text, targetLang, sourceLang) => {
    const textHash = hashText(text);
    return TranslationCache.generateCacheKey(sourceLang || 'auto', targetLang, textHash);
};

/**
 * Get from L1 (in-memory) cache
 */
const getL1Cache = (cacheKey) => {
    if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey);
    }
    return null;
};

const isMongoConnected = () => mongoose.connection?.readyState === 1;

/**
 * Set L1 (in-memory) cache
 */
const setL1Cache = (cacheKey, translation) => {
    translationCache.set(cacheKey, translation);
    cacheMetadata.set(cacheKey, Date.now());
};

/**
 * Get from L2 (MongoDB) cache with L1 fallback
 */
const getCachedTranslation = async (text, targetLang, sourceLang, isStatic = false) => {
    const normalizedText = text.trim();
    const cacheKey = getCacheKey(normalizedText, targetLang, sourceLang);

    // Check L1 cache first (fastest)
    const l1Cached = getL1Cache(cacheKey);
    if (l1Cached) {
        return l1Cached;
    }

    // Check L2 cache (MongoDB) - only if connected. Otherwise mongoose buffering can stall requests.
    if (!isMongoConnected()) {
        return null;
    }

    try {
        const l2Cached = await TranslationCache.findCached(
            sourceLang || 'auto',
            targetLang,
            normalizedText
        );

        if (l2Cached) {
            // Populate L1 cache for faster future access
            setL1Cache(cacheKey, l2Cached);
            return l2Cached;
        }
    } catch (error) {
        console.error('MongoDB cache read error:', error.message);
        // Continue to API call if cache fails
    }

    return null;
};

/**
 * Set cache in both L1 and L2
 */
const setCachedTranslation = async (text, translation, targetLang, sourceLang, isStatic = false) => {
    if (translation === text) return; // Don't cache if translation equals original

    const normalizedText = text.trim();
    const cacheKey = getCacheKey(normalizedText, targetLang, sourceLang);

    // Set L1 cache
    setL1Cache(cacheKey, translation);

    // Set L2 cache (MongoDB) - async, only if connected
    if (isMongoConnected()) {
        TranslationCache.findOrCreate({
            sourceLang: sourceLang || 'auto',
            targetLang,
            originalText: normalizedText,
            translatedText: translation,
            isStatic,
            ttlDays: isStatic ? 90 : 30
        }).catch(error => {
            console.error('MongoDB cache write error:', error.message);
            // Non-critical error, continue
        });
    }
};

/**
 * Translate a single text string
 */
const translateText = async (text, targetLang, sourceLang = null, isStatic = false) => {
    if (!text || typeof text !== 'string') return text;

    const normalizedText = text.trim();
    if (!normalizedText) return text;

    // Skip translation for proper nouns (deity names, brand names, etc.)
    if (shouldSkipTranslation(normalizedText)) {
        return normalizedText;
    }

    // Normalize codes
    const targetCode = languageCodeMap[targetLang] || targetLang;

    // Check cache (L1 + L2)
    const cached = await getCachedTranslation(normalizedText, targetCode, sourceLang, isStatic);
    if (cached) {
        return cached;
    }

    try {
        const options = { to: targetCode };
        if (sourceLang) {
            options.from = languageCodeMap[sourceLang] || sourceLang;
        }

        // Call Google Translate API with retry logic
        const [translation] = await retryOperation(() => translateClient.translate(normalizedText, options));

        // Cache the result (L1 + L2)
        if (translation && translation !== normalizedText) {
            await setCachedTranslation(normalizedText, translation, targetCode, sourceLang, isStatic);
        }

        return translation || normalizedText;
    } catch (error) {
        console.error(`Translation error for "${normalizedText.substring(0, 20)}...":`, error.message);

        // Fallback provider (works without Google Cloud config)
        const fallback = await translateViaMyMemory(normalizedText, targetCode, sourceLang || 'en');
        if (fallback && fallback !== normalizedText) {
            await setCachedTranslation(normalizedText, fallback, targetCode, sourceLang, isStatic);
        }
        return fallback || normalizedText;
    }
};

/**
 * Translate an array of texts
 */
const translateBatch = async (texts, targetLang, sourceLang = null, isStatic = false) => {
    if (!Array.isArray(texts) || texts.length === 0) return [];

    const targetCode = languageCodeMap[targetLang] || targetLang;

    // Identify missing translations (check both L1 and L2 cache)
    const results = new Array(texts.length).fill(null);
    const uncachedIndices = [];
    const uncachedTexts = [];
    const cachePromises = [];

    texts.forEach((text, index) => {
        if (!text || typeof text !== 'string') {
            results[index] = text;
            return;
        }

        const normalizedText = text.trim();
        if (!normalizedText) {
            results[index] = text;
            return;
        }

        // Check cache asynchronously
        cachePromises.push(
            getCachedTranslation(normalizedText, targetCode, sourceLang, isStatic)
                .then(cached => {
                    if (cached) {
                        results[index] = cached;
                    } else {
                        uncachedIndices.push(index);
                        uncachedTexts.push(normalizedText);
                    }
                })
        );
    });

    // Wait for all cache checks to complete
    await Promise.all(cachePromises);

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

                // Cache (L1 + L2)
                if (trans && trans !== originalText) {
                    setCachedTranslation(originalText, trans, targetCode, sourceLang, isStatic);
                }
            });
        } catch (error) {
            console.error('Batch translation error:', error.message);

            // Fallback for this chunk via MyMemory
            // Use parallel processing with concurrency control (5 at a time) to avoid extreme slowness while respecting rate limits
            const FALLBACK_CONCURRENCY = 5;
            for (let j = 0; j < chunk.length; j += FALLBACK_CONCURRENCY) {
                const subChunkIndices = chunkIndices.slice(j, j + FALLBACK_CONCURRENCY);
                const subChunkTexts = chunk.slice(j, j + FALLBACK_CONCURRENCY);

                await Promise.all(subChunkTexts.map(async (originalText, subIdx) => {
                    const originalIndex = subChunkIndices[subIdx];
                    const fallback = await translateViaMyMemory(originalText, targetCode, sourceLang || 'en');

                    results[originalIndex] = fallback || texts[originalIndex];

                    if (fallback && fallback !== originalText) {
                        setCachedTranslation(originalText, fallback, targetCode, sourceLang, isStatic);
                    }
                }));
            }
        }
    }

    return results;
};

/**
 * Recursively translate object values for specified keys
 */
const translateObject = async (obj, targetLang, sourceLang = null, keysToTranslate = [], isStatic = false) => {
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

    const translations = await translateBatch(texts, targetLang, sourceLang, isStatic);

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
