const translationService = require('../services/translationService');
const { languageCodeMap } = require('../config/googleCloud');

/**
 * Translate a single text
 */
const translateText = async (req, res) => {
    try {
        const { text, targetLang, sourceLang } = req.body;

        if (!text || !targetLang) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters: text and targetLang'
            });
        }

        const translation = await translationService.translateText(text, targetLang, sourceLang);

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
        const { texts, targetLang, sourceLang } = req.body;

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

        const translations = await translationService.translateBatch(texts, targetLang, sourceLang);

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
        const { obj, targetLang, sourceLang, keys } = req.body;

        if (!obj || typeof obj !== 'object' || !targetLang) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters: obj and targetLang'
            });
        }

        const translatedObj = await translationService.translateObject(obj, targetLang, sourceLang, keys);

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

module.exports = {
    translateText,
    translateBatch,
    translateObject
};
