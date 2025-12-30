import baseClient from './api/baseClient';
import { API_ENDPOINTS } from '../config/api';
import { getCachedTranslation, setCachedTranslation } from '../utils/translationCache';
import { normalizeText, isEmptyText } from '../utils/textUtils';

// Queue for batching requests
let translationQueue = [];
let isQueueProcessing = false;
const BATCH_INTERVAL = 75; // ms (reduced from 300ms for faster UI response)
const MAX_BATCH_SIZE = 100; // items per batch call (increased to match backend limit)

// Request deduplication: track pending requests to avoid duplicate API calls
const pendingRequests = new Map(); // { cacheKey: Promise }

const processQueue = async () => {
    if (translationQueue.length === 0) {
        isQueueProcessing = false;
        return;
    }

    isQueueProcessing = true;

    // Take a batch from the queue
    const currentBatch = translationQueue.splice(0, MAX_BATCH_SIZE);

    // Group by target language and source language to optimize API calls
    const groups = {};
    currentBatch.forEach(item => {
        const key = `${item.sourceLang || 'auto'}_${item.targetLang}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
    });

    // Process each group
    for (const key in groups) {
        const groupItems = groups[key];
        const { targetLang, sourceLang } = groupItems[0];

        // Deduplicate texts within batch
        // NOTE: This map must store the *unique index* per normalized text.
        // The previous implementation incorrectly used `uniqueTexts.length - 1` for duplicates,
        // which caused mismatched translations and made <TranslatedText> unreliable.
        const textToUniqueIdx = new Map(); // normalizedText -> uniqueIdx
        const uniqueTexts = []; // original texts (for API call)
        const textToIndices = []; // uniqueIdx -> [indices in groupItems]

        groupItems.forEach((item, idx) => {
            const normalized = normalizeText(item.text);

            let uniqueIdx = textToUniqueIdx.get(normalized);
            if (uniqueIdx === undefined) {
                uniqueIdx = uniqueTexts.length;
                textToUniqueIdx.set(normalized, uniqueIdx);
                uniqueTexts.push(item.text); // Keep original for API call
                textToIndices.push([]);
            }

            textToIndices[uniqueIdx].push(idx);
        });

        // Check cache for unique texts before API call
        const textsToTranslate = [];
        const translationMap = new Map(); // uniqueIdx -> translation
        const cachePromises = [];

        for (let i = 0; i < uniqueTexts.length; i++) {
            const text = uniqueTexts[i];

            // Only check cache here.
            //
            // Important: DO NOT check `pendingRequests` from inside `processQueue`.
            // `translateText()` registers the queue promise in `pendingRequests` *before*
            // `processQueue` runs. If we check it here, we end up awaiting the same promise
            // that this queue processing is responsible for resolving (deadlock), which
            // makes <TranslatedText> appear "not translating".
            cachePromises.push(
                getCachedTranslation(text, targetLang, sourceLang, groupItems[0].isStatic || false).then(cached => {
                    if (cached) {
                        translationMap.set(i, cached);
                    } else {
                        textsToTranslate.push({ text, uniqueIdx: i });
                    }
                })
            );
        }

        await Promise.all(cachePromises);

        // Resolve cached translations
        translationMap.forEach((translation, uniqueIdx) => {
            textToIndices[uniqueIdx].forEach(originalIdx => {
                groupItems[originalIdx].resolve(translation);
            });
        });

        // If all cached, continue to next group
        if (textsToTranslate.length === 0) {
            continue;
        }

        // Translate uncached texts
        const texts = textsToTranslate.map(item => item.text);
        const batchCacheKey = `${sourceLang || 'auto'}_${targetLang}_batch_${texts.join('|')}`;

        try {
            // Create batch translation promise
            const batchPromise = baseClient.post(API_ENDPOINTS.TRANSLATE.BATCH, {
                texts,
                targetLang,
                sourceLang: sourceLang === 'auto' ? null : sourceLang,
                isStatic: groupItems[0].isStatic || false
            }).then(response => {
                if (response && response.success && response.data && Array.isArray(response.data.translations)) {
                    return response.data.translations;
                }
                throw new Error('Invalid response format');
            });

            // Track pending batch request
            pendingRequests.set(batchCacheKey, batchPromise);

            const translations = await batchPromise;

            // Process translations
            textsToTranslate.forEach((item, idx) => {
                const translation = translations[idx];
                const originalText = item.text;

                // Cache the result
                if (translation && translation !== originalText) {
                    setCachedTranslation(originalText, translation, targetLang, sourceLang);
                }

                // Resolve all requests for this text
                textToIndices[item.uniqueIdx].forEach(originalIdx => {
                    groupItems[originalIdx].resolve(translation || originalText);
                });
            });

            // Clean up pending request
            pendingRequests.delete(batchCacheKey);
        } catch (error) {
            console.error('Batch translation failed:', error);
            // Fallback: resolve with original text
            textsToTranslate.forEach(item => {
                textToIndices[item.uniqueIdx].forEach(originalIdx => {
                    groupItems[originalIdx].resolve(groupItems[originalIdx].text);
                });
            });
            pendingRequests.delete(batchCacheKey);
        }
    }

    // Schedule next batch if items remain
    if (translationQueue.length > 0) {
        setTimeout(processQueue, BATCH_INTERVAL);
    } else {
        isQueueProcessing = false;
    }
};

const addToQueue = (text, targetLang, sourceLang = 'auto', isStatic = false) => {
    return new Promise((resolve, reject) => {
        translationQueue.push({ text, targetLang, sourceLang, isStatic, resolve, reject });
        if (!isQueueProcessing) {
            setTimeout(processQueue, 50); // Small initial delay to collect bursts
            isQueueProcessing = true;
        }
    });
};

export const translateText = async (text, targetLang, sourceLang = 'auto', isStatic = false) => {
    // Early returns
    if (isEmptyText(text) || !targetLang || targetLang === 'en') return text;
    if (sourceLang === targetLang) return text;

    // Normalize text for consistent caching
    const normalized = normalizeText(text);
    if (isEmptyText(normalized)) return text;

    // Check cache first
    const cached = await getCachedTranslation(normalized, targetLang, sourceLang, isStatic);
    if (cached) return cached;

    // Create cache key for deduplication
    const cacheKey = `${sourceLang || 'auto'}_${targetLang}_${normalized}`;

    // Check if same request is already pending
    if (pendingRequests.has(cacheKey)) {
        return pendingRequests.get(cacheKey);
    }

    // Add to queue and track pending request
    const promise = addToQueue(normalized, targetLang, sourceLang, isStatic);
    pendingRequests.set(cacheKey, promise);

    // Clean up when resolved
    promise.finally(() => {
        pendingRequests.delete(cacheKey);
    });

    return promise;
};

/**
 * Batch translate multiple texts efficiently
 * This is the preferred method for translating multiple texts
 */
export const translateBatch = async (texts, targetLang, sourceLang = 'auto', isStatic = false) => {
    if (!Array.isArray(texts) || texts.length === 0) return [];
    if (targetLang === 'en' || sourceLang === targetLang) return texts;

    // Filter out empty texts and normalize
    const normalizedTexts = texts.map(text => {
        if (isEmptyText(text)) return null;
        return normalizeText(text);
    });

    // Check cache for all texts
    const cachePromises = normalizedTexts.map((text, idx) => {
        if (!text) return Promise.resolve({ idx, text: texts[idx] });
        return getCachedTranslation(text, targetLang, sourceLang, isStatic).then(cached => ({
            idx,
            text: texts[idx],
            normalized: text,
            cached
        }));
    });

    const cacheResults = await Promise.all(cachePromises);
    const results = new Array(texts.length);
    const uncachedTexts = [];
    const uncachedIndices = [];

    cacheResults.forEach(({ idx, text, normalized, cached }) => {
        if (cached) {
            results[idx] = cached;
        } else if (normalized) {
            uncachedTexts.push(normalized);
            uncachedIndices.push(idx);
        } else {
            results[idx] = text; // Empty text, return as-is
        }
    });

    // If all cached, return results
    if (uncachedTexts.length === 0) return results;

    // Deduplicate uncached texts
    const uniqueTexts = [];
    const textToIndices = new Map(); // uniqueText -> [original indices]

    uncachedTexts.forEach((text, uncachedIdx) => {
        const originalIdx = uncachedIndices[uncachedIdx];
        if (!textToIndices.has(text)) {
            textToIndices.set(text, []);
            uniqueTexts.push(text);
        }
        textToIndices.get(text).push(originalIdx);
    });

    // Translate unique texts
    try {
        const response = await baseClient.post(API_ENDPOINTS.TRANSLATE.BATCH, {
            texts: uniqueTexts,
            targetLang,
            sourceLang: sourceLang === 'auto' ? null : sourceLang,
            isStatic
        });

        if (response && response.success && response.data && Array.isArray(response.data.translations)) {
            response.data.translations.forEach((translation, uniqueIdx) => {
                const originalText = uniqueTexts[uniqueIdx];
                const indices = textToIndices.get(originalText);

                // Cache the result
                if (translation && translation !== originalText) {
                    setCachedTranslation(originalText, translation, targetLang, sourceLang, isStatic);
                }

                // Set results for all indices that map to this unique text
                indices.forEach(originalIdx => {
                    results[originalIdx] = translation || texts[originalIdx];
                });
            });
        }
    } catch (error) {
        console.error('Batch translation error:', error);
        // Fallback: return original texts
        uncachedIndices.forEach(idx => {
            results[idx] = texts[idx];
        });
    }

    return results;
};

export const translateObject = async (obj, targetLang, sourceLang = 'auto', keys = [], isStatic = false) => {
    if (!obj || !targetLang || targetLang === 'en') return obj;

    try {
        const response = await baseClient.post(API_ENDPOINTS.TRANSLATE.OBJECT, {
            obj,
            targetLang,
            sourceLang: sourceLang === 'auto' ? null : sourceLang,
            keys,
            isStatic
        });

        if (response.success && response.data.translatedObj) {
            return response.data.translatedObj;
        }
        return obj;
    } catch (error) {
        console.error('Object translation error:', error);
        return obj;
    }
};
