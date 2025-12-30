const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PageContent = require('../models/PageContent');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pages = [
    {
        slug: 'privacy-policy',
        title: 'Privacy Policy',
        heroSection: {
            title: 'Privacy Policy',
            subtitle: 'Your Privacy Matters to Us',
            description: 'Learn how we collect, use, and protect your personal information at Aslam Marble Suppliers.'
        },
        sections: [
            {
                title: 'Introduction',
                content: 'At Aslam Marble Suppliers (AMS), we are committed to protecting your privacy. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information that you provide to us through our website.',
                order: 1
            },
            {
                title: 'Information We Collect',
                content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, phone number, and shipping address.',
                order: 2
            }
        ]
    },
    {
        slug: 'terms-and-conditions',
        title: 'Terms & Conditions',
        heroSection: {
            title: 'Terms & Conditions',
            subtitle: 'Legal Agreement for Using Our Services',
            description: 'Please read these terms and conditions carefully before using our website.'
        },
        sections: [
            {
                title: 'Acceptance of Terms',
                content: 'By accessing or using our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.',
                order: 1
            }
        ]
    },
    {
        slug: 'corporate-info',
        title: 'Corporate Information',
        heroSection: {
            title: 'About AMS',
            subtitle: 'Excellence in Marble Craftsmanship',
            description: 'Aslam Marble Suppliers is a leading provider of premium marble products, dedicated to quality and artistry.'
        },
        sections: [
            {
                title: 'Our Heritage',
                content: 'Born in the heart of Makrana, Aslam Marble Suppliers carries a legacy of multiple generations in stone carving and marble supply.',
                order: 1
            }
        ]
    }
];

const seedPages = async () => {
    try {
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!uri) throw new Error('MONGODB_URI not found');
        await mongoose.connect(uri);
        console.log('MongoDB Connected...');

        for (const page of pages) {
            await PageContent.findOneAndUpdate(
                { slug: page.slug },
                page,
                { upsert: true, new: true }
            );
            console.log(`Seeded page: ${page.slug}`);
        }

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding pages:', error);
        process.exit(1);
    }
};

seedPages();
