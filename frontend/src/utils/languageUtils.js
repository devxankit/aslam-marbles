// Language configurations
export const LANGUAGES = {
    en: { code: 'en', label: 'English', dir: 'ltr', flag: '🇬🇧' },
    hi: { code: 'hi', label: 'हिंदी', dir: 'ltr', flag: '🇮🇳' },
    gu: { code: 'gu', label: 'ગુજરાતી', dir: 'ltr', flag: '🇮🇳' },
    mr: { code: 'mr', label: 'मराठी', dir: 'ltr', flag: '🇮🇳' },
    bn: { code: 'bn', label: 'বাংলা', dir: 'ltr', flag: '🇮🇳' },
    te: { code: 'te', label: 'తెలుగు', dir: 'ltr', flag: '🇮🇳' },
    ta: { code: 'ta', label: 'தமிழ்', dir: 'ltr', flag: '🇮🇳' },
    kn: { code: 'kn', label: 'ಕನ್ನಡ', dir: 'ltr', flag: '🇮🇳' },
    ml: { code: 'ml', label: 'മലയാളം', dir: 'ltr', flag: '🇮🇳' },
    pa: { code: 'pa', label: 'ਪੰਜਾਬੀ', dir: 'ltr', flag: '🇮🇳' },
    ar: { code: 'ar', label: 'العربية', dir: 'rtl', flag: '🇸🇦' },
    he: { code: 'he', label: 'עברית', dir: 'rtl', flag: '🇮🇱' },
    ur: { code: 'ur', label: 'اردو', dir: 'rtl', flag: '🇵🇰' },
    fa: { code: 'fa', label: 'فارسی', dir: 'rtl', flag: '🇮🇷' },
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
