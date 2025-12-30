import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translateText } from '../services/translationService';

const TranslatedText = ({ children, className = '', as: Component = 'span' }) => {
    const { language: targetLang } = useLanguage();
    const [translation, setTranslation] = useState(children);

    // Keep track of original text to avoid re-translation on every render if it hasn't changed
    const [original, setOriginal] = useState(children);

    useEffect(() => {
        if (typeof children !== 'string') return;
        setOriginal(children);
    }, [children]);

    useEffect(() => {
        let isMounted = true;

        if (original && typeof original === 'string') {
            // If target is English (source), just show original.
            // Adjust if source is not English.
            if (targetLang === 'en') {
                setTranslation(original);
                return;
            }

            translateText(original, targetLang, 'en', true) // true = isStatic
                .then(res => {
                    if (isMounted) setTranslation(res);
                })
                .catch(err => {
                    // Fallback - keep original text
                    if (isMounted) setTranslation(original);
                });
        }

        return () => { isMounted = false; };
    }, [original, targetLang]);

    // If children is not string, just render it
    if (typeof children !== 'string') return <Component className={className}>{children}</Component>;

    return (
        <Component className={className} dangerouslySetInnerHTML={{ __html: translation }} />
    );
};

export default TranslatedText;
