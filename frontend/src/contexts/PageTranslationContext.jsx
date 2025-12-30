import React, { createContext, useContext, useCallback } from 'react';
import { useLanguage } from './LanguageContext';

const PageTranslationContext = createContext();

export const PageTranslationProvider = ({ children }) => {
    const { language } = useLanguage();

    // Ideally this would look up from a cache of synchronously available translations
    const getTranslatedText = useCallback((text) => {
        return text;
    }, [language]);

    return (
        <PageTranslationContext.Provider value={{ getTranslatedText }}>
            {children}
        </PageTranslationContext.Provider>
    );
};

export const usePageTranslation = () => {
    const context = useContext(PageTranslationContext);
    if (!context) {
        throw new Error('usePageTranslation must be used within a PageTranslationProvider');
    }
    return context;
};
