const Order = require('../models/Order');

// @desc    Get wallet details
// @route   GET /api/wallet
// @access  Private (Admin)
const getWalletDetails = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        // Run all aggregations in parallel for better performance
        const [
            revenueAggregation,
            monthlyRevenueAggregation,
            dailyRevenueAggregation,
            statusCounts,
            recentTransactions
        ] = await Promise.all([
            // 1. Total Revenue
            Order.aggregate([
                { $match: { paymentStatus: 'completed' } },
                { $group: { _id: null, totalRevenue: { $sum: '$finalTotal' } } }
            ]),
            // 2. Monthly Revenue
            Order.aggregate([
                {
                    $match: {
                        paymentStatus: 'completed',
                        createdAt: { $gte: startOfMonth }
                    }
                },
                { $group: { _id: null, totalRevenue: { $sum: '$finalTotal' } } }
            ]),
            // 3. Daily Revenue
            Order.aggregate([
                {
                    $match: {
                        paymentStatus: 'completed',
                        createdAt: { $gte: startOfDay }
                    }
                },
                { $group: { _id: null, totalRevenue: { $sum: '$finalTotal' } } }
            ]),
            // 4. Status Counts
            Order.aggregate([
                { $group: { _id: '$paymentStatus', count: { $sum: 1 }, totalAmount: { $sum: '$finalTotal' } } }
            ]),
            // 5. Recent Transactions
            Order.find({})
                .select('orderId paymentMethod paymentStatus razorpayPaymentId razorpayOrderId finalTotal createdAt customerDetails.email')
                .sort({ createdAt: -1 })
                .limit(20)
        ]);

        // Process results
        const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;
        const monthlyRevenue = monthlyRevenueAggregation.length > 0 ? monthlyRevenueAggregation[0].totalRevenue : 0;
        const dailyRevenue = dailyRevenueAggregation.length > 0 ? dailyRevenueAggregation[0].totalRevenue : 0;

        // Format status counts
        const paymentStats = {
            pending: { count: 0, amount: 0 },
            processing: { count: 0, amount: 0 },
            completed: { count: 0, amount: 0 },
            failed: { count: 0, amount: 0 },
            refunded: { count: 0, amount: 0 }
        };

        statusCounts.forEach(stat => {
            if (paymentStats[stat._id]) {
                paymentStats[stat._id] = { count: stat.count, amount: stat.totalAmount };
            }
        });

        res.status(200).json({
            success: true,
            data: {
                totalRevenue,
                monthlyRevenue,
                dailyRevenue,
                paymentStats,
                recentTransactions
            }
        });
    } catch (error) {
        console.error('Error fetching wallet details:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error fetching wallet details',
            error: error.message
        });
    }
};

module.exports = {
    getWalletDetails
};
