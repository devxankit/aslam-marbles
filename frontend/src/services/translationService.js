import baseClient from './api/baseClient';
import { API_ENDPOINTS } from '../config/api';
import { getCachedTranslation, setCachedTranslation } from '../utils/translationCache';

// Queue for batching requests
let translationQueue = [];
let isQueueProcessing = false;
const BATCH_INTERVAL = 200; // ms
const MAX_BATCH_SIZE = 10; // items per batch call to backend (backend allows 100, we keep it small on frontend for responsiveness)

const processQueue = async () => {
    if (translationQueue.length === 0) {
        isQueueProcessing = false;
        return;
    }

    isQueueProcessing = true;

    // Take a batch from the queue
    const currentBatch = translationQueue.splice(0, MAX_BATCH_SIZE);

    // Group by target language and source language to optimize API calls
    // (Assuming mostly one target lang active at a time, but good to handle)
    const groups = {};
    currentBatch.forEach(item => {
        const key = `${item.sourceLang || 'auto'}_${item.targetLang}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
    });

    // Process each group
    for (const key in groups) {
        const groupItems = groups[key];
        const texts = groupItems.map(item => item.text);
        const { targetLang, sourceLang } = groupItems[0];

        try {
            // Check cache again just in case (though we check before queueing usually)
            // Actually simpler to check before queueing. Here we just fetch.

            const response = await baseClient.post(API_ENDPOINTS.TRANSLATE.BATCH, {
                texts,
                targetLang,
                sourceLang: sourceLang === 'auto' ? null : sourceLang
            });

            if (response && response.success && response.data && Array.isArray(response.data.translations)) {
                response.data.translations.forEach((translation, idx) => {
                    const originalText = texts[idx];
                    const item = groupItems[idx];

                    // Cache the result
                    if (translation !== originalText) {
                        setCachedTranslation(originalText, translation, targetLang, sourceLang);
                    }

                    // Resolve promise
                    item.resolve(translation);
                });
            } else {
                // Fallback or error format
                groupItems.forEach((item, idx) => {
                    item.resolve(item.text); // Return original on format error
                });
            }
        } catch (error) {
            console.error('Batch translation failed:', error);
            // Fallback
            groupItems.forEach(item => item.resolve(item.text));
        }
    }

    // Schedule next batch if items remain
    if (translationQueue.length > 0) {
        setTimeout(processQueue, BATCH_INTERVAL);
    } else {
        isQueueProcessing = false;
    }
};

const addToQueue = (text, targetLang, sourceLang = 'auto') => {
    return new Promise((resolve, reject) => {
        translationQueue.push({ text, targetLang, sourceLang, resolve, reject });
        if (!isQueueProcessing) {
            setTimeout(processQueue, 50); // Small initial delay to collect bursts
            isQueueProcessing = true;
        }
    });
};

export const translateText = async (text, targetLang, sourceLang = 'auto') => {
    if (!text || !targetLang || targetLang === 'en') return text; // Assuming 'en' is source, skip. Adjust if source is different.
    if (sourceLang === targetLang) return text;

    // Check cache first
    const cached = await getCachedTranslation(text, targetLang, sourceLang);
    if (cached) return cached;

    // Add to queue
    return addToQueue(text, targetLang, sourceLang);
};

export const translateObject = async (obj, targetLang, sourceLang = 'auto', keys = []) => {
    if (!obj || !targetLang || targetLang === 'en') return obj;

    try {
        const response = await baseClient.post(API_ENDPOINTS.TRANSLATE.OBJECT, {
            obj,
            targetLang,
            sourceLang: sourceLang === 'auto' ? null : sourceLang,
            keys
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
