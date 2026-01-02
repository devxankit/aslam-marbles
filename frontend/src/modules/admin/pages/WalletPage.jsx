import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import baseClient from '../../../services/api/baseClient';
import { toast } from 'react-hot-toast';

const WalletPage = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        totalRevenue: 0,
        paymentStats: {
            pending: { count: 0, amount: 0 },
            completed: { count: 0, amount: 0 },
        },
        recentTransactions: []
    });

    useEffect(() => {
        fetchWalletDetails();
    }, []);

    const fetchWalletDetails = async () => {
        try {
            const response = await baseClient.get('/wallet');
            if (response.success) {
                setData(response.data);
            }
        } catch (error) {
            console.error('Error fetching wallet details:', error);
            toast.error('Failed to load wallet details');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        failed: 'bg-red-100 text-red-800',
        refunded: 'bg-gray-100 text-gray-800'
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355]"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Wallet & Payments</h1>
                        <p className="text-gray-500 mt-1">Manage and view your Razorpay payment details</p>
                    </div>
                    <button
                        onClick={fetchWalletDetails}
                        className="px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#736044] transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh Data
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Revenue */}
                    <div className="bg-gradient-to-br from-[#8B7355] to-[#736044] rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold opacity-90">Total Revenue</h3>
                            <div className="p-2 bg-white/20 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-3xl font-bold">{formatCurrency(data.totalRevenue)}</p>
                        <p className="text-sm mt-2 opacity-80">Lifetime earnings</p>
                    </div>

                    {/* Monthly Revenue */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">This Month</h3>
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{formatCurrency(data.monthlyRevenue || 0)}</p>
                        <p className="text-sm mt-2 text-gray-500">
                            Revenue from {new Date().toLocaleString('default', { month: 'long' })}
                        </p>
                    </div>

                    {/* Today's Revenue - replacing Successful Payments for now or adding as 5th? Better to replace Successful Payment card with Today's Revenue as it is more actionable financial data */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Today</h3>
                            <div className="p-2 bg-green-50 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{formatCurrency(data.dailyRevenue || 0)}</p>
                        <p className="text-sm mt-2 text-gray-500">
                            Revenue today
                        </p>
                    </div>

                    {/* Pending / Failed */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Pending / Failed</h3>
                            <div className="p-2 bg-yellow-50 rounded-lg">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-2xl font-bold text-gray-800">
                                    {(data.paymentStats.pending?.count || 0) + (data.paymentStats.failed?.count || 0)}
                                </p>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Count</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-gray-600">
                                    {formatCurrency((data.paymentStats.pending?.amount || 0) + (data.paymentStats.failed?.amount || 0))}
                                </p>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Value</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Order ID</th>
                                    <th className="px-6 py-4 font-semibold">Customer</th>
                                    <th className="px-6 py-4 font-semibold">Method</th>
                                    <th className="px-6 py-4 font-semibold">Amount</th>
                                    <th className="px-6 py-4 font-semibold h-full text-center">Status</th>
                                    <th className="px-6 py-4 font-semibold">Razorpay Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data.recentTransactions.length > 0 ? (
                                    data.recentTransactions.map((tx) => (
                                        <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                                                {new Date(tx.createdAt).toLocaleDateString()}
                                                <br />
                                                <span className="text-xs text-gray-400">{new Date(tx.createdAt).toLocaleTimeString()}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                                #{tx.orderId}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-500">{tx.customerDetails?.email || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    {tx.paymentMethod}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-gray-800">
                                                {formatCurrency(tx.finalTotal)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[tx.paymentStatus] || 'bg-gray-100 text-gray-800'}`}>
                                                    {tx.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 text-xs">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1" title="Payment ID">
                                                        <span className="font-semibold text-gray-400 w-8">Pay:</span>
                                                        <span className="font-mono bg-gray-50 px-1 rounded">{tx.razorpayPaymentId || '-'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1" title="Order ID">
                                                        <span className="font-semibold text-gray-400 w-8">Ord:</span>
                                                        <span className="font-mono bg-gray-50 px-1 rounded">{tx.razorpayOrderId || '-'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                            No transactions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default WalletPage;
