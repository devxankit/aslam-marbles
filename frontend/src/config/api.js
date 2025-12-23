const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_CONFIG = {
    BASE_URL: API_BASE_URL,
    TIMEOUT: 30000,
    HEADERS: {
        'Content-Type': 'application/json',
    },
};

export const API_ENDPOINTS = {
    TRANSLATE: {
        SINGLE: '/v1/translate',
        BATCH: '/v1/translate/batch',
        OBJECT: '/v1/translate/object',
    },
};
