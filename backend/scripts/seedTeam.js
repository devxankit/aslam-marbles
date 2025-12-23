const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { uploadBuffer } = require('../utils/cloudinary');
const Team = require('../models/Team');

dotenv.config();

const teamData = {
    heroImagePath: '../../my-project/src/assets/house of marble/team/heading/Gemini_Generated_Image_ipme0eipme0eipme (1).png',
    members: [
        {
            name: 'RAJEEV GANGWAL',
            position: 'FOUNDER & CHAIRMAN',
            imagePath: '../../my-project/src/assets/house of marble/team/Screenshot 2025-12-10 131359.png',
            description: "As the Founder and Chairman of Tilak Stone Arts, my journey has been one of dedication, craftsmanship, and a deep commitment to preserving spiritual heritage through art. I have always believed that a home's sanctity lies in the space we create for the divine. What started as a passion to blend spirituality with luxury has now evolved into a global vision — to transform homes into sanctuaries. Every temple we create is a reflection of timeless craftsmanship and an invitation to foster inner peace and connection. I am honored to lead a team that shares this vision and together, we continue to elevate spiritual spaces worldwide."
        },
        {
            name: 'TEAM MEMBER 2',
            position: 'CHIEF EXECUTIVE OFFICER',
            imagePath: '../../my-project/src/assets/house of marble/team/Screenshot 2025-12-10 131414.png',
            description: 'With over two decades of experience in the stone art industry, I bring strategic vision and operational excellence to Tilak Stone Arts. My passion lies in bridging traditional craftsmanship with modern innovation, ensuring that every project we undertake meets the highest standards of quality and artistry. I am committed to expanding our reach globally while maintaining the authentic essence of our craft.'
        }
    ]
};

const uploadLocalFile = async (relativeFilePath, folder = 'team') => {
    try {
        const absolutePath = path.resolve(__dirname, relativeFilePath);
        if (!fs.existsSync(absolutePath)) {
            console.error(`File not found: ${absolutePath}`);
            return null;
        }
        const buffer = fs.readFileSync(absolutePath);
        const result = await uploadBuffer(buffer, folder);
        return {
            url: result.secure_url,
            publicId: result.public_id
        };
    } catch (error) {
        console.error(`Error uploading ${relativeFilePath}:`, error.message);
        return null;
    }
};

const seedTeam = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing team data
        await Team.deleteMany({});
        console.log('Cleared existing team data');

        // Upload Hero Image
        console.log('Uploading Hero Image...');
        const heroImage = await uploadLocalFile(teamData.heroImagePath);

        // Upload Members Images
        const members = [];
        for (const member of teamData.members) {
            console.log(`Uploading image for ${member.name}...`);
            const image = await uploadLocalFile(member.imagePath);
            members.push({
                name: member.name,
                position: member.position,
                image: image,
                description: member.description
            });
        }

        // Create Team document
        const team = new Team({
            heroImage,
            members
        });

        await team.save();
        console.log('Team data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding team:', error);
        process.exit(1);
    }
};

seedTeam();
