const PoojaRoom = require('../models/PoojaRoom');
const { uploadBuffer } = require('../utils/cloudinary');

// @desc    Get Pooja Room Page Data
// @route   GET /api/pooja-room
// @access  Public
const getPoojaRoomData = async (req, res) => {
    try {
        let poojaRoomData = await PoojaRoom.findOne();
        if (!poojaRoomData) {
            return res.json({});
        }
        res.json(poojaRoomData);
    } catch (error) {
        console.error('Error fetching Pooja Room data:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update Pooja Room Page Data
// @route   PUT /api/pooja-room
// @access  Private/Admin
const updatePoojaRoomData = async (req, res) => {
    try {
        const {
            heroTitle, heroSubtitle,
            cons1Title, cons1Desc,
            cons2Title, cons2Desc,
            baTitle, baDesc,
            collection, services, gallery
        } = req.body;

        let poojaRoomData = await PoojaRoom.findOne();
        if (!poojaRoomData) {
            poojaRoomData = new PoojaRoom();
        }

        // Handle text content (selectively update to avoid losing nested fields like images)
        if (heroTitle !== undefined || heroSubtitle !== undefined) {
            if (!poojaRoomData.heroSection) poojaRoomData.heroSection = {};
            if (heroTitle !== undefined) poojaRoomData.heroSection.title = heroTitle;
            if (heroSubtitle !== undefined) poojaRoomData.heroSection.subtitle = heroSubtitle;
        }

        if (cons1Title !== undefined || cons1Desc !== undefined) {
            if (!poojaRoomData.consultation) poojaRoomData.consultation = {};
            if (!poojaRoomData.consultation.section1) poojaRoomData.consultation.section1 = {};
            if (cons1Title !== undefined) poojaRoomData.consultation.section1.title = cons1Title;
            if (cons1Desc !== undefined) poojaRoomData.consultation.section1.description = cons1Desc;
        }

        if (cons2Title !== undefined || cons2Desc !== undefined) {
            if (!poojaRoomData.consultation) poojaRoomData.consultation = {};
            if (!poojaRoomData.consultation.section2) poojaRoomData.consultation.section2 = {};
            if (cons2Title !== undefined) poojaRoomData.consultation.section2.title = cons2Title;
            if (cons2Desc !== undefined) poojaRoomData.consultation.section2.description = cons2Desc;
        }

        if (baTitle !== undefined || baDesc !== undefined) {
            if (!poojaRoomData.beforeAfter) poojaRoomData.beforeAfter = {};
            if (baTitle !== undefined) poojaRoomData.beforeAfter.title = baTitle;
            if (baDesc !== undefined) poojaRoomData.beforeAfter.description = baDesc;
        }

        if (collection) {
            try {
                poojaRoomData.collection = JSON.parse(collection);
            } catch (e) {
                console.error('Error parsing collection:', e);
            }
        }
        if (services) {
            try {
                poojaRoomData.services = JSON.parse(services);
            } catch (e) {
                console.error('Error parsing services:', e);
            }
        }
        if (gallery) {
            try {
                poojaRoomData.gallery = JSON.parse(gallery);
            } catch (e) {
                console.error('Error parsing gallery:', e);
            }
        }

        // Handle image uploads
        if (req.files) {
            if (req.files.heroImage) {
                const result = await uploadBuffer(req.files.heroImage[0].buffer, 'pooja-room');
                if (!poojaRoomData.heroSection) poojaRoomData.heroSection = {};
                poojaRoomData.heroSection.image = { url: result.secure_url, alt: 'Hero' };
            }
            if (req.files.cons1Image) {
                const result = await uploadBuffer(req.files.cons1Image[0].buffer, 'pooja-room');
                if (!poojaRoomData.consultation) poojaRoomData.consultation = {};
                if (!poojaRoomData.consultation.section1) poojaRoomData.consultation.section1 = {};
                poojaRoomData.consultation.section1.image = { url: result.secure_url, alt: 'Consultation 1' };
            }
            if (req.files.cons2Image) {
                const result = await uploadBuffer(req.files.cons2Image[0].buffer, 'pooja-room');
                if (!poojaRoomData.consultation) poojaRoomData.consultation = {};
                if (!poojaRoomData.consultation.section2) poojaRoomData.consultation.section2 = {};
                poojaRoomData.consultation.section2.image = { url: result.secure_url, alt: 'Consultation 2' };
            }
            if (req.files.beforeImage) {
                const result = await uploadBuffer(req.files.beforeImage[0].buffer, 'pooja-room');
                if (!poojaRoomData.beforeAfter) poojaRoomData.beforeAfter = {};
                poojaRoomData.beforeAfter.beforeImage = { url: result.secure_url, alt: 'Before' };
            }
            if (req.files.afterImage) {
                const result = await uploadBuffer(req.files.afterImage[0].buffer, 'pooja-room');
                if (!poojaRoomData.beforeAfter) poojaRoomData.beforeAfter = {};
                poojaRoomData.beforeAfter.afterImage = { url: result.secure_url, alt: 'After' };
            }
        }

        poojaRoomData.lastUpdated = Date.now();
        const updatedData = await poojaRoomData.save();
        res.json(updatedData);
    } catch (error) {
        console.error('Error updating Pooja Room data:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getPoojaRoomData,
    updatePoojaRoomData
};
