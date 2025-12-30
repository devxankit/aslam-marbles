const translationService = require('../services/translationService');
const TranslationCache = require('../models/TranslationCache');
const { languageCodeMap } = require('../config/googleCloud');

/**
 * Translate a single text
 */
const translateText = async (req, res) => {
    try {
        const { text, targetLang, sourceLang, isStatic = false } = req.body;

        if (!text || !targetLang) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters: text and targetLang'
            });
        }

        const translation = await translationService.translateText(text, targetLang, sourceLang, isStatic);

        res.json({
            success: true,
            data: {
                original: text,
                translation,
                sourceLang: sourceLang || 'auto',
                targetLang
            }
        });
    } catch (error) {
        console.error('Controller Translate Error:', error);
        res.status(500).json({ success: false, message: 'Translation failed', error: error.message });
    }
};

/**
 * Translate a batch of texts
 */
const translateBatch = async (req, res) => {
    try {
        const { texts, targetLang, sourceLang, isStatic = false } = req.body;

        if (!texts || !Array.isArray(texts) || !targetLang) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters: texts (array) and targetLang'
            });
        }

        if (texts.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'Batch size limit exceeded. Max 100 items.'
            });
        }

        const translations = await translationService.translateBatch(texts, targetLang, sourceLang, isStatic);

        res.json({
            success: true,
            data: {
                translations,
                sourceLang: sourceLang || 'auto',
                targetLang
            }
        });
    } catch (error) {
        console.error('Controller Batch Translate Error:', error);
        res.status(500).json({ success: false, message: 'Batch translation failed', error: error.message });
    }
};

/**
 * Translate object fields
 */
const translateObject = async (req, res) => {
    try {
        const { obj, targetLang, sourceLang, keys, isStatic = false } = req.body;

        if (!obj || typeof obj !== 'object' || !targetLang) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters: obj and targetLang'
            });
        }

        const translatedObj = await translationService.translateObject(obj, targetLang, sourceLang, keys, isStatic);

        res.json({
            success: true,
            data: {
                translatedObj,
                sourceLang: sourceLang || 'auto',
                targetLang
            }
        });
    } catch (error) {
        console.error('Controller Object Translate Error:', error);
        res.status(500).json({ success: false, message: 'Object translation failed', error: error.message });
    }
};

/**
 * Get cache statistics
 */
const getCacheStats = async (req, res) => {
    try {
        const stats = await TranslationCache.getStats();
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Cache stats error:', error);
        res.status(500).json({ success: false, message: 'Failed to get cache stats', error: error.message });
    }
};

/**
 * Cleanup expired cache entries
 */
const cleanupCache = async (req, res) => {
    try {
        const deletedCount = await TranslationCache.cleanupExpired();
        res.json({
            success: true,
            data: {
                deletedCount,
                message: `Cleaned up ${deletedCount} expired cache entries`
            }
        });
    } catch (error) {
        console.error('Cache cleanup error:', error);
        res.status(500).json({ success: false, message: 'Cache cleanup failed', error: error.message });
    }
};

module.exports = {
    translateText,
    translateBatch,
    translateObject,
    getCacheStats,
    cleanupCache
};
