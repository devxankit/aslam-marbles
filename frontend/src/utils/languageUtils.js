// Language configurations
export const LANGUAGES = {
    en: { code: 'en', label: 'English', dir: 'ltr', flag: '🇬🇧' },
    hi: { code: 'hi', label: 'Hindi', dir: 'ltr', flag: '🇮🇳' },
    gu: { code: 'gu', label: 'Gujarati', dir: 'ltr', flag: '🇮🇳' },
    mr: { code: 'mr', label: 'Marathi', dir: 'ltr', flag: '🇮🇳' },
    bn: { code: 'bn', label: 'Bengali', dir: 'ltr', flag: '🇮🇳' },
    te: { code: 'te', label: 'Telugu', dir: 'ltr', flag: '🇮🇳' },
    ta: { code: 'ta', label: 'Tamil', dir: 'ltr', flag: '🇮🇳' },
    kn: { code: 'kn', label: 'Kannada', dir: 'ltr', flag: '🇮🇳' },
    ml: { code: 'ml', label: 'Malayalam', dir: 'ltr', flag: '🇮🇳' },
    pa: { code: 'pa', label: 'Punjabi', dir: 'ltr', flag: '🇮🇳' },
    ar: { code: 'ar', label: 'Arabic', dir: 'rtl', flag: '🇸🇦' },
    he: { code: 'he', label: 'Hebrew', dir: 'rtl', flag: '🇮🇱' },
    ur: { code: 'ur', label: 'Urdu', dir: 'rtl', flag: '🇵🇰' },
    fa: { code: 'fa', label: 'Persian', dir: 'rtl', flag: '🇮🇷' },
    sw: { code: 'sw', label: 'Swahili', dir: 'ltr', flag: '🇰🇪' },
};

export const DEFAULT_LANGUAGE = 'en';

export const RTL_LANGUAGES = ['ar', 'he', 'ur', 'fa'];

// Normalize language code (e.g., 'en-US' -> 'en')
export const normalizeLanguageCode = (code) => {
    if (!code) return DEFAULT_LANGUAGE;
    const shortCode = code.split('-')[0].toLowerCase();
    return LANGUAGES[shortCode] ? shortCode : DEFAULT_LANGUAGE;
};

// Check if language is RTL
export const isRTL = (code) => {
    const normCode = normalizeLanguageCode(code);
    return RTL_LANGUAGES.includes(normCode);
};

// Get language config
export const getLanguageConfig = (code) => {
    const normCode = normalizeLanguageCode(code);
    return LANGUAGES[normCode] || LANGUAGES[DEFAULT_LANGUAGE];
};
