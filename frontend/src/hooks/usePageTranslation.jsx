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

            setIsTranslating(true);

            try {
                // Use batch API for efficient translation (single API call instead of N calls)
                const translations = await translateBatch(staticTexts, targetLang, sourceLang, true); // true = isStatic

                if (isMounted) {
                    const newMap = {};
                    staticTexts.forEach((original, idx) => {
                        newMap[original] = translations[idx] || original;
                    });
                    setTranslatedMap(newMap);
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
                }
            } finally {
                if (isMounted) setIsTranslating(false);
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
