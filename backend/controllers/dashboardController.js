const ExpertConsultation = require('../models/ExpertConsultation');
const Appointment = require('../models/Appointment');
const Order = require('../models/Order');
const MurtiProduct = require('../models/MurtiProduct');
const StoneProduct = require('../models/StoneProduct');
const Blog = require('../models/Blog');
const Testimonial = require('../models/Testimonial');

exports.getDashboardStats = async (req, res) => {
    try {
        // Current date - 24 hours
        const yesterday = new Date();
        yesterday.setHours(yesterday.getHours() - 24);

        const [
            totalExpertConsultations,
            newExpertConsultations,
            totalAppointments,
            pendingAppointments,
            totalOrders,
            totalRevenue,
            totalMurtis,
            totalStones,
            totalBlogs,
            totalTestimonials
        ] = await Promise.all([
            ExpertConsultation.countDocuments(),
            ExpertConsultation.countDocuments({ createdAt: { $gte: yesterday } }),
            Appointment.countDocuments(),
            Appointment.countDocuments({ status: 'pending' }),
            Order.countDocuments(),
            Order.aggregate([
                { $match: { paymentStatus: 'completed' } },
                { $group: { _id: null, total: { $sum: "$total" } } }
            ]),
            MurtiProduct.countDocuments(),
            StoneProduct.countDocuments(),
            Blog.countDocuments(),
            Testimonial.countDocuments()
        ]);

        const stats = {
            totalLeads: totalExpertConsultations + totalAppointments,
            newLeads: newExpertConsultations,
            pendingAppointments,
            totalOrders,
            revenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
            totalProducts: totalMurtis + totalStones,
            totalBlogs,
            totalTestimonials
        };

        res.status(200).json({
            success: true,
            stats
        });

    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching stats',
            error: error.message
        });
    }
};
