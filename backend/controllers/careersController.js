const Careers = require('../models/Careers');
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary');

// Get careers data
exports.getCareers = async (req, res) => {
    try {
        let careers = await Careers.findOne();

        // If no careers data exists, create an empty one
        if (!careers) {
            careers = await Careers.create({
                heroImage: { url: '', publicId: '' },
                trainingImage: { url: '', publicId: '' },
                whyJoinUs: [],
                benefits: [],
                jobs: []
            });
        }

        res.status(200).json({ success: true, data: careers });
    } catch (error) {
        console.error('Error fetching careers:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update hero image
exports.updateHeroImage = async (req, res) => {
    try {
        let careers = await Careers.findOne();
        if (!careers) {
            return res.status(404).json({ success: false, message: 'Careers data not found' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image file provided' });
        }

        // Delete old image from Cloudinary if exists
        if (careers.heroImage && careers.heroImage.publicId) {
            await deleteByPublicId(careers.heroImage.publicId);
        }

        // Upload new image to Cloudinary
        const result = await uploadBuffer(req.file.buffer, 'careers/hero');

        careers.heroImage = {
            url: result.secure_url,
            publicId: result.public_id
        };

        await careers.save();

        res.status(200).json({ success: true, data: careers });
    } catch (error) {
        console.error('Error updating hero image:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update training image
exports.updateTrainingImage = async (req, res) => {
    try {
        let careers = await Careers.findOne();
        if (!careers) {
            return res.status(404).json({ success: false, message: 'Careers data not found' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image file provided' });
        }

        // Delete old image from Cloudinary if exists
        if (careers.trainingImage && careers.trainingImage.publicId) {
            await deleteByPublicId(careers.trainingImage.publicId);
        }

        // Upload new image to Cloudinary
        const result = await uploadBuffer(req.file.buffer, 'careers/training');

        careers.trainingImage = {
            url: result.secure_url,
            publicId: result.public_id
        };

        await careers.save();

        res.status(200).json({ success: true, data: careers });
    } catch (error) {
        console.error('Error updating training image:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update why join us section
exports.updateWhyJoinUs = async (req, res) => {
    try {
        const { whyJoinUs } = req.body;

        if (!whyJoinUs || !Array.isArray(whyJoinUs)) {
            return res.status(400).json({ success: false, message: 'Invalid why join us data' });
        }

        let careers = await Careers.findOne();
        if (!careers) {
            return res.status(404).json({ success: false, message: 'Careers data not found' });
        }

        careers.whyJoinUs = whyJoinUs;
        await careers.save();

        res.status(200).json({ success: true, data: careers });
    } catch (error) {
        console.error('Error updating why join us:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update benefits section
exports.updateBenefits = async (req, res) => {
    try {
        const { benefits } = req.body;

        if (!benefits || !Array.isArray(benefits)) {
            return res.status(400).json({ success: false, message: 'Invalid benefits data' });
        }

        let careers = await Careers.findOne();
        if (!careers) {
            return res.status(404).json({ success: false, message: 'Careers data not found' });
        }

        careers.benefits = benefits;
        await careers.save();

        res.status(200).json({ success: true, data: careers });
    } catch (error) {
        console.error('Error updating benefits:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Add job
exports.addJob = async (req, res) => {
    try {
        const { title, experience, location, type, description, requirements, category } = req.body;

        if (!title || !experience || !location || !type || !description || !category) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        let careers = await Careers.findOne();
        if (!careers) {
            return res.status(404).json({ success: false, message: 'Careers data not found' });
        }

        const newJob = {
            title,
            experience,
            location,
            type,
            description,
            requirements: requirements || [],
            category,
            isActive: true
        };

        careers.jobs.push(newJob);
        await careers.save();

        res.status(200).json({ success: true, data: careers });
    } catch (error) {
        console.error('Error adding job:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update job
exports.updateJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { title, experience, location, type, description, requirements, category, isActive } = req.body;

        let careers = await Careers.findOne();
        if (!careers) {
            return res.status(404).json({ success: false, message: 'Careers data not found' });
        }

        const job = careers.jobs.id(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        if (title) job.title = title;
        if (experience) job.experience = experience;
        if (location) job.location = location;
        if (type) job.type = type;
        if (description) job.description = description;
        if (requirements) job.requirements = requirements;
        if (category) job.category = category;
        if (typeof isActive !== 'undefined') job.isActive = isActive;

        await careers.save();

        res.status(200).json({ success: true, data: careers });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete job
exports.deleteJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        let careers = await Careers.findOne();
        if (!careers) {
            return res.status(404).json({ success: false, message: 'Careers data not found' });
        }

        careers.jobs.pull(jobId);
        await careers.save();

        res.status(200).json({ success: true, data: careers });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
