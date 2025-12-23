const TrustedBy = require('../models/TrustedBy');
const { cloudinary } = require('../utils/cloudinary');

// @desc    Get Trusted By data
// @route   GET /api/trusted-by
// @access  Public
const getTrustedBy = async (req, res) => {
    try {
        let trustedBy = await TrustedBy.findOne({ isActive: true });

        if (!trustedBy) {
            trustedBy = new TrustedBy();
            await trustedBy.save();
        }

        res.json({ success: true, data: trustedBy });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update Trusted By heading
// @route   PUT /api/trusted-by/heading
// @access  Private/Admin
const updateHeading = async (req, res) => {
    try {
        const { heading } = req.body;

        let trustedBy = await TrustedBy.findOne({ isActive: true });
        if (!trustedBy) {
            trustedBy = new TrustedBy();
        }

        trustedBy.heading = heading || trustedBy.heading;
        await trustedBy.save();

        res.json({ success: true, data: trustedBy });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add company logo
// @route   POST /api/trusted-by/company
// @access  Private/Admin
const addCompany = async (req, res) => {
    try {
        const { name, logo } = req.body;

        if (!name || !logo) {
            return res.status(400).json({ success: false, message: 'Name and logo are required' });
        }

        // Upload logo to Cloudinary
        const result = await cloudinary.uploader.upload(logo, {
            folder: 'trusted-by/logos',
            transformation: [
                { width: 300, height: 300, crop: 'limit' },
                { quality: 'auto', fetch_format: 'auto' }
            ]
        });

        let trustedBy = await TrustedBy.findOne({ isActive: true });
        if (!trustedBy) {
            trustedBy = new TrustedBy();
        }

        trustedBy.companies.push({
            name,
            logo: {
                url: result.secure_url,
                publicId: result.public_id
            },
            order: trustedBy.companies.length
        });

        await trustedBy.save();
        res.json({ success: true, data: trustedBy });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update company logo
// @route   PUT /api/trusted-by/company/:id
// @access  Private/Admin
const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, logo } = req.body;

        let trustedBy = await TrustedBy.findOne({ isActive: true });
        if (!trustedBy) {
            return res.status(404).json({ success: false, message: 'Trusted By data not found' });
        }

        const company = trustedBy.companies.id(id);
        if (!company) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }

        // Update name if provided
        if (name) {
            company.name = name;
        }

        // Update logo if provided
        if (logo && typeof logo === 'string' && logo.startsWith('data:image')) {
            // Delete old logo from Cloudinary
            if (company.logo.publicId) {
                await cloudinary.uploader.destroy(company.logo.publicId);
            }

            // Upload new logo
            const result = await cloudinary.uploader.upload(logo, {
                folder: 'trusted-by/logos',
                transformation: [
                    { width: 300, height: 300, crop: 'limit' },
                    { quality: 'auto', fetch_format: 'auto' }
                ]
            });

            company.logo = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }

        await trustedBy.save();
        res.json({ success: true, data: trustedBy });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete company logo
// @route   DELETE /api/trusted-by/company/:id
// @access  Private/Admin
const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        let trustedBy = await TrustedBy.findOne({ isActive: true });
        if (!trustedBy) {
            return res.status(404).json({ success: false, message: 'Trusted By data not found' });
        }

        const company = trustedBy.companies.id(id);
        if (!company) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }

        // Delete logo from Cloudinary
        if (company.logo.publicId) {
            await cloudinary.uploader.destroy(company.logo.publicId);
        }

        // Remove company from array
        trustedBy.companies.pull(id);
        await trustedBy.save();

        res.json({ success: true, message: 'Company deleted successfully', data: trustedBy });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Reorder companies
// @route   PUT /api/trusted-by/reorder
// @access  Private/Admin
const reorderCompanies = async (req, res) => {
    try {
        const { companies } = req.body; // Array of {id, order}

        let trustedBy = await TrustedBy.findOne({ isActive: true });
        if (!trustedBy) {
            return res.status(404).json({ success: false, message: 'Trusted By data not found' });
        }

        companies.forEach(({ id, order }) => {
            const company = trustedBy.companies.id(id);
            if (company) {
                company.order = order;
            }
        });

        await trustedBy.save();
        res.json({ success: true, data: trustedBy });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getTrustedBy,
    updateHeading,
    addCompany,
    updateCompany,
    deleteCompany,
    reorderCompanies
};
