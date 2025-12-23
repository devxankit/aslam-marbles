import { useState, useCallback, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translateText, translateObject as translateObjService } from '../services/translationService';

export const useDynamicTranslation = ({ sourceLang = 'en' } = {}) => {
    const { language: targetLang, isChangingLanguage } = useLanguage();
    const [isTranslating, setIsTranslating] = useState(false);
    const mountedRef = useRef(true);

    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const translate = useCallback(async (text, overrideTarget) => {
        if (!text) return '';
        const target = overrideTarget || targetLang;

        // Optimization: Skip if source == target
        if (sourceLang === target) return text;

        // setIsTranslating(true); // Individual calls might flicker loading states too much
        try {
            const result = await translateText(text, target, sourceLang);
            return result;
        } catch (error) {
            console.error('Translation hook error:', error);
            return text;
        } finally {
            // setIsTranslating(false);
        }
    }, [targetLang, sourceLang]);

    const translateBatch = useCallback(async (textsArray) => {
        if (!textsArray || textsArray.length === 0) return [];
        if (sourceLang === targetLang) return textsArray;

        setIsTranslating(true);
        try {
            const promises = textsArray.map(text => translateText(text, targetLang, sourceLang));
            const results = await Promise.all(promises);
            return results;
        } catch (error) {
            console.error('Batch translation hook error:', error);
            return textsArray;
        } finally {
            if (mountedRef.current) setIsTranslating(false);
        }
    }, [targetLang, sourceLang]);

    const translateObject = useCallback(async (obj, keys = []) => {
        if (!obj) return obj;
        if (sourceLang === targetLang) return obj;

        setIsTranslating(true);
        try {
            const result = await translateObjService(obj, targetLang, sourceLang, keys);
            return result;
        } catch (error) {
            console.error('Object translation hook error:', error);
            return obj;
        } finally {
            if (mountedRef.current) setIsTranslating(false);
        }
    }, [targetLang, sourceLang]);

    return {
        translate,
        translateBatch,
        translateObject,
        isTranslating,
        currentLanguage: targetLang
    };
};
