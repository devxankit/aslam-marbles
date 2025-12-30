import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translateBatch } from '../services/translationService';

export const usePageTranslation = (staticTexts = [], sourceLang = 'en') => {
    const { language: targetLang } = useLanguage();
    const [translatedMap, setTranslatedMap] = useState({});
    const [isTranslating, setIsTranslating] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const translateAll = async () => {
            if (sourceLang === targetLang) {
                setTranslatedMap({}); // Clear translations, fall back to keys/originals
                return;
            }

            if (!staticTexts || staticTexts.length === 0) return;

            // PERFORMANCE OPTIMIZATION: Check if we have everything in cache first
            // This prevents "flicker" where text shows loading state unnecessarily

            // We'll treat the initial load differently. If we can get results fast, we won't set isTranslating to true
            // preventing the UI from showing a loader for cached content.

            try {
                // Use batch API for efficient translation (single API call instead of N calls)
                // translateBatch handles checking both L1 (memory/local) and L2 (backend) caches
                const translationsPromise = translateBatch(staticTexts, targetLang, sourceLang, true); // true = isStatic

                // If we don't have results within 50ms, trigger loading state
                const loadingTimer = setTimeout(() => {
                    if (isMounted) setIsTranslating(true);
                }, 50);

                const translations = await translationsPromise;
                clearTimeout(loadingTimer);

                if (isMounted) {
                    const newMap = {};
                    staticTexts.forEach((original, idx) => {
                        newMap[original] = translations[idx] || original;
                    });
                    setTranslatedMap(newMap);
                    setIsTranslating(false);
                }
            } catch (error) {
                console.error('Page translation error:', error);
                // Fallback: use original texts
                if (isMounted) {
                    const fallbackMap = {};
                    staticTexts.forEach(text => {
                        fallbackMap[text] = text;
                    });
                    setTranslatedMap(fallbackMap);
                    setIsTranslating(false);
                }
            }
        };

        translateAll();

        return () => { isMounted = false; };
    }, [targetLang, JSON.stringify(staticTexts), sourceLang]); // JSON.stringify for array dep check

    const getTranslatedText = (text) => {
        if (sourceLang === targetLang) return text;
        return translatedMap[text] || text; // Return translation or original while loading
    };

    return {
        getTranslatedText,
        isTranslating,
        translatedMap // access to raw map if needed
    };
};
