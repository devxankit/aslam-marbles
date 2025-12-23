import { openDB } from 'idb';

const DB_NAME = 'stone_art_translation_cache';
const STORE_NAME = 'translations';
const DB_VERSION = 1;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const MAX_STORE_SIZE = 50 * 1024 * 1024; // 50MB (approximate check)

let dbPromise;

if (typeof window !== 'undefined') {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        },
    });
}

const getCacheKey = (text, targetLang, sourceLang = 'auto') => {
    // Simple check for text
    if (!text) return null;
    // Use a hash or base64 for key to handle special chars safely
    // For simplicity here, we use a prefix. In production, maybe hash big text.
    return `${sourceLang}_${targetLang}_${text}`;
};

export const getCachedTranslation = async (text, targetLang, sourceLang) => {
    if (!dbPromise || !text) return null;

    try {
        const key = getCacheKey(text, targetLang, sourceLang);
        const db = await dbPromise;
        const cached = await db.get(STORE_NAME, key);

        if (cached) {
            if (Date.now() - cached.timestamp < CACHE_TTL) {
                return cached.translation;
            } else {
                // Expired
                db.delete(STORE_NAME, key);
            }
        }
        return null;
    } catch (error) {
        console.warn('Translation cache read error:', error);
        return null;
    }
};

export const setCachedTranslation = async (text, translation, targetLang, sourceLang) => {
    if (!dbPromise || !text || !translation || text === translation) return;

    try {
        const key = getCacheKey(text, targetLang, sourceLang);
        const db = await dbPromise;
        await db.put(STORE_NAME, {
            translation,
            timestamp: Date.now()
        }, key);
    } catch (error) {
        console.warn('Translation cache write error:', error);
    }
};

export const clearExpiredCache = async () => {
    if (!dbPromise) return;

    try {
        const db = await dbPromise;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        let cursor = await store.openCursor();

        const now = Date.now();

        while (cursor) {
            const { timestamp } = cursor.value;
            if (now - timestamp > CACHE_TTL) {
                cursor.delete();
            }
            cursor = await cursor.continue();
        }
        await tx.done;
    } catch (error) {
        console.warn('Cache cleanup error:', error);
    }
};
