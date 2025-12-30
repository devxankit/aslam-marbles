const PageContent = require('../models/PageContent');
const asyncHandler = require('express-async-handler');
const { cloudinary } = require('../utils/cloudinary');

// @desc    Get page content by slug
// @route   GET /api/page-content/:slug
// @access  Public
const getPageContent = asyncHandler(async (req, res) => {
    const page = await PageContent.findOne({ slug: req.params.slug });
    if (page) {
        res.json(page);
    } else {
        res.status(404);
        throw new Error('Page not found');
    }
});

// @desc    Update or create page content
// @route   POST /api/page-content
// @access  Private/Admin
const upsertPageContent = asyncHandler(async (req, res) => {
    const { slug, title, heroSection, sections, metadata } = req.body;

    let page = await PageContent.findOne({ slug });

    // Handle Hero Image Upload (if Base64)
    if (heroSection?.image?.url && heroSection.image.url.startsWith('data:image')) {
        const result = await cloudinary.uploader.upload(heroSection.image.url, {
            folder: `pages/${slug}/hero`,
            resource_type: 'image'
        });
        heroSection.image.url = result.secure_url;
        heroSection.image.publicId = result.public_id;
    }

    // Handle Section Images Upload
    if (sections && Array.isArray(sections)) {
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].image?.url && sections[i].image.url.startsWith('data:image')) {
                const result = await cloudinary.uploader.upload(sections[i].image.url, {
                    folder: `pages/${slug}/sections`,
                    resource_type: 'image'
                });
                sections[i].image.url = result.secure_url;
                sections[i].image.publicId = result.public_id;
            }
        }
    }

    if (page) {
        page.title = title || page.title;
        page.heroSection = heroSection || page.heroSection;
        page.sections = sections || page.sections;
        page.metadata = metadata || page.metadata;

        const updatedPage = await page.save();
        res.json(updatedPage);
    } else {
        page = await PageContent.create({
            slug,
            title,
            heroSection,
            sections,
            metadata
        });
        res.status(201).json(page);
    }
});

module.exports = {
    getPageContent,
    upsertPageContent
};
