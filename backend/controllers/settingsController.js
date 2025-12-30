const Settings = require('../models/Settings');

// Get all settings
exports.getSettings = async (req, res, next) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            // Create default settings if none exist
            settings = await Settings.create({});
        }
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (err) {
        next(err);
    }
};

// Update general settings
exports.updateGeneralSettings = async (req, res, next) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) settings = new Settings();

        settings.general = { ...settings.general, ...req.body };
        await settings.save();

        res.status(200).json({
            success: true,
            data: settings.general
        });
    } catch (err) {
        next(err);
    }
};

// Update social settings
exports.updateSocialSettings = async (req, res, next) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) settings = new Settings();

        settings.social = { ...settings.social, ...req.body };
        await settings.save();

        res.status(200).json({
            success: true,
            data: settings.social
        });
    } catch (err) {
        next(err);
    }
};

// Update SEO settings
exports.updateSeoSettings = async (req, res, next) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) settings = new Settings();

        settings.seo = { ...settings.seo, ...req.body };
        await settings.save();

        res.status(200).json({
            success: true,
            data: settings.seo
        });
    } catch (err) {
        next(err);
    }
};

// Update email settings
exports.updateEmailSettings = async (req, res, next) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) settings = new Settings();

        settings.email = { ...settings.email, ...req.body };
        await settings.save();

        res.status(200).json({
            success: true,
            data: settings.email
        });
    } catch (err) {
        next(err);
    }
};

// Update all settings at once
exports.updateAllSettings = async (req, res, next) => {
    try {
        const { general, social, seo, email } = req.body;
        let settings = await Settings.findOne();
        if (!settings) settings = new Settings();

        if (general) settings.general = { ...settings.general, ...general };
        if (social) settings.social = { ...settings.social, ...social };
        if (seo) settings.seo = { ...settings.seo, ...seo };
        if (email) settings.email = { ...settings.email, ...email };

        await settings.save();

        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (err) {
        next(err);
    }
};
