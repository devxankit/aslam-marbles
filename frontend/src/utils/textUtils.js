/**
 * Text normalization and hashing utilities for translation optimization
 */

/**
 * Normalize text for comparison and caching
 * - Trim whitespace
 * - Remove extra spaces
 * - Convert to lowercase for comparison (optional)
 */
export const normalizeText = (text) => {
    if (!text || typeof text !== 'string') return '';
    return text.trim().replace(/\s+/g, ' ');
};

/**
 * Generate a hash for text content (simple hash for cache keys)
 * Uses a simple hash function - for production, consider crypto.subtle.digest
 */
export const hashText = async (text) => {
    if (!text) return '';
    
    // Use Web Crypto API if available (browser)
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (error) {
            console.warn('Crypto API not available, using fallback hash');
        }
    }
    
    // Fallback: simple hash function
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
};

/**
 * Remove HTML tags from text before caching/translation
 */
export const stripHTML = (text) => {
    if (!text || typeof text !== 'string') return text;
    return text.replace(/<[^>]*>/g, '').trim();
};

/**
 * Check if text is empty or whitespace only
 */
export const isEmptyText = (text) => {
    if (!text || typeof text !== 'string') return true;
    return text.trim().length === 0;
};

