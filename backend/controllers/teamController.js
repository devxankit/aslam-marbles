const Team = require('../models/Team');
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary');

// Get Team Data
exports.getTeam = async (req, res) => {
    try {
        let team = await Team.findOne();
        if (!team) {
            team = await Team.create({ members: [] });
        }
        res.status(200).json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Hero Image
exports.updateHeroImage = async (req, res) => {
    try {
        let team = await Team.findOne();
        if (!team) {
            team = new Team({ members: [] });
        }

        const { files } = req;
        if (files && files.heroImage) {
            // Delete old if exists
            if (team.heroImage && team.heroImage.publicId) {
                await deleteByPublicId(team.heroImage.publicId);
            }

            const result = await uploadBuffer(files.heroImage[0].buffer, 'team');
            team.heroImage = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }

        await team.save();
        res.status(200).json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add Team Member
exports.addMember = async (req, res) => {
    try {
        const { name, position, description } = req.body;
        let team = await Team.findOne();
        if (!team) {
            team = new Team({ members: [] });
        }

        const memberData = { name, position, description };

        const { files } = req;
        if (files && files.memberImage) {
            const result = await uploadBuffer(files.memberImage[0].buffer, 'team/members');
            memberData.image = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }

        team.members.push(memberData);
        await team.save();
        res.status(201).json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Team Member
exports.updateMember = async (req, res) => {
    try {
        const { memberId } = req.params;
        const { name, position, description } = req.body;
        const team = await Team.findOne();

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team data not found' });
        }

        const member = team.members.id(memberId);
        if (!member) {
            return res.status(404).json({ success: false, message: 'Member not found' });
        }

        const { files } = req;
        if (files && files.memberImage) {
            // Delete old image if it exists
            if (member.image && member.image.publicId) {
                await deleteByPublicId(member.image.publicId);
            }

            const result = await uploadBuffer(files.memberImage[0].buffer, 'team/members');
            member.image = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }

        member.name = name || member.name;
        member.position = position || member.position;
        member.description = description || member.description;

        await team.save();
        res.status(200).json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Team Member
exports.deleteMember = async (req, res) => {
    try {
        const { memberId } = req.params;
        const team = await Team.findOne();

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team data not found' });
        }

        const member = team.members.id(memberId);
        if (!member) {
            return res.status(404).json({ success: false, message: 'Member not found' });
        }

        // Delete image from Cloudinary
        if (member.image && member.image.publicId) {
            await deleteByPublicId(member.image.publicId);
        }

        team.members.pull(memberId);
        await team.save();
        res.status(200).json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
