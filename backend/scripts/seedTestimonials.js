const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Testimonial = require('../models/Testimonial');
const connectDB = require('../config/db');
const { testimonials } = require('../../my-project/src/data/testimonials');

dotenv.config();

connectDB(process.env.MONGODB_URI);

const seedTestimonials = async () => {
  try {
    console.log('✅ Connected to MongoDB');

    // Clear existing testimonials
    await Testimonial.deleteMany({});
    console.log('🗑️  Cleared existing testimonials');

    // Seed testimonials
    const testimonialsToSeed = testimonials.map((testimonial, index) => ({
      name: testimonial.name,
      location: testimonial.location,
      designation: testimonial.designation || null,
      review: testimonial.review,
      rating: testimonial.rating || 5,
      image: testimonial.image || null,
      displayOrder: testimonial.id || index,
      isActive: true,
    }));

    await Testimonial.insertMany(testimonialsToSeed);
    console.log(`✅ Seeded ${testimonialsToSeed.length} testimonials`);
    console.log('🎉 Testimonial seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding testimonials:', error);
    process.exit(1);
  }
};

seedTestimonials();

