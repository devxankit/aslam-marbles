import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translateText } from '../services/translationService';

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
                // Collect requests
                const promises = staticTexts.map(text =>
                    translateText(text, targetLang, sourceLang)
                        .then(res => ({ original: text, translated: res }))
                );

                const results = await Promise.all(promises);

                if (isMounted) {
                    const newMap = {};
                    results.forEach(({ original, translated }) => {
                        newMap[original] = translated;
                    });
                    setTranslatedMap(newMap);
                }
            } catch (error) {
                console.error('Page translation error:', error);
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
