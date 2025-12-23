import React, { createContext, useState, useContext, useEffect } from 'react';
import { LANGUAGES, DEFAULT_LANGUAGE, isRTL, normalizeLanguageCode } from '../utils/languageUtils';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Try to get from localStorage
        const saved = localStorage.getItem('app_language');
        return saved ? normalizeLanguageCode(saved) : DEFAULT_LANGUAGE;
    });

    const [prevLanguage, setPrevLanguage] = useState(language);
    const [isChangingLanguage, setIsChangingLanguage] = useState(false);

    useEffect(() => {
        // Persist to localStorage
        localStorage.setItem('app_language', language);

        // Update document direction and language attribute
        const dir = isRTL(language) ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = language;
        document.body.dir = dir; // Sometimes needed for specific frameworks
    }, [language]);

    const changeLanguage = (code) => {
        const normCode = normalizeLanguageCode(code);
        if (normCode === language) return;

        setPrevLanguage(language);
        setIsChangingLanguage(true);
        setLanguage(normCode);

        // Short delay to allow transitions if needed, or just reset state
        setTimeout(() => {
            setIsChangingLanguage(false);
        }, 500);
    };

    return (
        <LanguageContext.Provider value={{
            language,
            languages: LANGUAGES,
            changeLanguage,
            isChangingLanguage,
            isRTL: isRTL(language),
            prevLanguage
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
