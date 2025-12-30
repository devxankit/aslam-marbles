import { openDB } from 'idb';
import { normalizeText, hashText } from './textUtils';

const DB_NAME = 'stone_art_translation_cache';
const STORE_NAME = 'translations';
const DB_VERSION = 1;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const STATIC_CACHE_TTL = 90 * 24 * 60 * 60 * 1000; // 90 days for static content
const MAX_STORE_SIZE = 50 * 1024 * 1024; // 50MB (approximate check)
const LOCALSTORAGE_PREFIX = 'trans_cache_';
const MAX_LOCALSTORAGE_SIZE = 5 * 1024 * 1024; // 5MB for localStorage

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

/**
 * Generate cache key with normalized text and hash
 */
const getCacheKey = async (text, targetLang, sourceLang = 'auto') => {
    if (!text) return null;
    const normalized = normalizeText(text);
    const textHash = await hashText(normalized);
    return `${sourceLang}_${targetLang}_${textHash}`;
};

/**
 * Get from localStorage fallback
 */
const getFromLocalStorage = (key) => {
    if (typeof window === 'undefined') return null;
    try {
        const item = localStorage.getItem(LOCALSTORAGE_PREFIX + key);
        if (!item) return null;
        const cached = JSON.parse(item);
        const now = Date.now();
        if (now - cached.timestamp < cached.ttl) {
            return cached.translation;
        }
        // Expired, remove it
        localStorage.removeItem(LOCALSTORAGE_PREFIX + key);
        return null;
    } catch (error) {
        console.warn('localStorage read error:', error);
        return null;
    }
};

/**
 * Set in localStorage fallback
 */
const setToLocalStorage = (key, translation, ttl) => {
    if (typeof window === 'undefined') return;
    try {
        // Check localStorage size before adding
        let currentSize = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const storageKey = localStorage.key(i);
            if (storageKey && storageKey.startsWith(LOCALSTORAGE_PREFIX)) {
                currentSize += localStorage.getItem(storageKey)?.length || 0;
            }
        }
        
        const item = JSON.stringify({ translation, timestamp: Date.now(), ttl });
        if (currentSize + item.length > MAX_LOCALSTORAGE_SIZE) {
            // Clear old entries if needed
            clearOldLocalStorageEntries();
        }
        
        localStorage.setItem(LOCALSTORAGE_PREFIX + key, item);
    } catch (error) {
        // Quota exceeded or other error
        console.warn('localStorage write error:', error);
        clearOldLocalStorageEntries();
    }
};

/**
 * Clear old localStorage entries
 */
const clearOldLocalStorageEntries = () => {
    if (typeof window === 'undefined') return;
    try {
        const now = Date.now();
        const keysToRemove = [];
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(LOCALSTORAGE_PREFIX)) {
                try {
                    const item = JSON.parse(localStorage.getItem(key));
                    if (now - item.timestamp > item.ttl) {
                        keysToRemove.push(key);
                    }
                } catch (e) {
                    keysToRemove.push(key); // Remove invalid entries
                }
            }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
        console.warn('Error clearing localStorage:', error);
    }
};

export const getCachedTranslation = async (text, targetLang, sourceLang, isStatic = false) => {
    if (!text) return null;
    
    const ttl = isStatic ? STATIC_CACHE_TTL : CACHE_TTL;
    const key = await getCacheKey(text, targetLang, sourceLang);
    if (!key) return null;

    // Try IndexedDB first
    if (dbPromise) {
        try {
            const db = await dbPromise;
            const cached = await db.get(STORE_NAME, key);

            if (cached) {
                const age = Date.now() - cached.timestamp;
                if (age < cached.ttl || age < ttl) {
                    return cached.translation;
                } else {
                    // Expired, remove it
                    db.delete(STORE_NAME, key);
                }
            }
        } catch (error) {
            console.warn('IndexedDB cache read error:', error);
        }
    }

    // Fallback to localStorage
    const cached = getFromLocalStorage(key);
    if (cached) return cached;

    return null;
};

export const setCachedTranslation = async (text, translation, targetLang, sourceLang, isStatic = false) => {
    if (!text || !translation || text === translation) return;
    
    const ttl = isStatic ? STATIC_CACHE_TTL : CACHE_TTL;
    const key = await getCacheKey(text, targetLang, sourceLang);
    if (!key) return;

    const cacheData = {
        translation,
        timestamp: Date.now(),
        ttl
    };

    // Store in IndexedDB (primary)
    if (dbPromise) {
        try {
            const db = await dbPromise;
            await db.put(STORE_NAME, cacheData, key);
        } catch (error) {
            console.warn('IndexedDB cache write error:', error);
        }
    }

    // Also store in localStorage as fallback
    setToLocalStorage(key, translation, ttl);
};

export const clearExpiredCache = async () => {
    const now = Date.now();

    // Clear IndexedDB expired entries
    if (dbPromise) {
        try {
            const db = await dbPromise;
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            let cursor = await store.openCursor();

            while (cursor) {
                const { timestamp, ttl } = cursor.value;
                const age = now - timestamp;
                if (age > (ttl || CACHE_TTL)) {
                    cursor.delete();
                }
                cursor = await cursor.continue();
            }
            await tx.done;
        } catch (error) {
            console.warn('IndexedDB cache cleanup error:', error);
        }
    }

    // Clear localStorage expired entries
    clearOldLocalStorageEntries();
};
