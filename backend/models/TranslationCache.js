const mongoose = require('mongoose');
const crypto = require('crypto');

const translationCacheSchema = new mongoose.Schema({
    cacheKey: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    sourceLang: {
        type: String,
        required: true,
        index: true
    },
    targetLang: {
        type: String,
        required: true,
        index: true
    },
    originalText: {
        type: String,
        required: true
    },
    translatedText: {
        type: String,
        required: true
    },
    textHash: {
        type: String,
        required: true,
        index: true
    },
    isStatic: {
        type: Boolean,
        default: false,
        index: true
    },
    hitCount: {
        type: Number,
        default: 0
    },
    lastAccessed: {
        type: Date,
        default: Date.now,
        index: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true,
        expires: 0 // TTL index - MongoDB will auto-delete expired documents
    }
}, {
    timestamps: true
});

// Generate cache key helper
translationCacheSchema.statics.generateCacheKey = function(sourceLang, targetLang, textHash) {
    return `${sourceLang || 'auto'}_${targetLang}_${textHash}`;
};

// Generate text hash helper
translationCacheSchema.statics.hashText = function(text) {
    return crypto.createHash('sha256').update(text).digest('hex');
};

// Find or create cache entry
translationCacheSchema.statics.findOrCreate = async function(data) {
    const { sourceLang, targetLang, originalText, translatedText, isStatic = false, ttlDays = 30 } = {
        ...data,
        ttlDays: data.isStatic ? 90 : 30 // Static content: 90 days, dynamic: 30 days
    };

    const textHash = this.hashText(originalText.trim());
    const cacheKey = this.generateCacheKey(sourceLang, targetLang, textHash);
    const expiresAt = new Date(Date.now() + (ttlDays * 24 * 60 * 60 * 1000));

    const cacheEntry = await this.findOneAndUpdate(
        { cacheKey },
        {
            $set: {
                sourceLang,
                targetLang,
                originalText,
                translatedText,
                textHash,
                isStatic,
                expiresAt,
                lastAccessed: new Date()
            },
            $inc: { hitCount: 1 }
        },
        {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
    );

    return cacheEntry;
};

// Find cached translation
translationCacheSchema.statics.findCached = async function(sourceLang, targetLang, text) {
    const textHash = this.hashText(text.trim());
    const cacheKey = this.generateCacheKey(sourceLang, targetLang, textHash);

    const cached = await this.findOneAndUpdate(
        { cacheKey, expiresAt: { $gt: new Date() } },
        {
            $set: { lastAccessed: new Date() },
            $inc: { hitCount: 1 }
        },
        { new: true }
    );

    return cached ? cached.translatedText : null;
};

// Cleanup expired entries (manual cleanup, TTL index handles auto-cleanup)
translationCacheSchema.statics.cleanupExpired = async function() {
    const result = await this.deleteMany({
        expiresAt: { $lt: new Date() }
    });
    return result.deletedCount;
};

// Get cache statistics
translationCacheSchema.statics.getStats = async function() {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                totalEntries: { $sum: 1 },
                totalHits: { $sum: '$hitCount' },
                avgHits: { $avg: '$hitCount' },
                staticEntries: {
                    $sum: { $cond: ['$isStatic', 1, 0] }
                },
                dynamicEntries: {
                    $sum: { $cond: ['$isStatic', 0, 1] }
                }
            }
        }
    ]);

    return stats[0] || {
        totalEntries: 0,
        totalHits: 0,
        avgHits: 0,
        staticEntries: 0,
        dynamicEntries: 0
    };
};

module.exports = mongoose.model('TranslationCache', translationCacheSchema);

