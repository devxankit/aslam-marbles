import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import baseClient from '../../../services/api/baseClient';

const AdminForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const res = await baseClient.post('/admin/forgot-password', { email: email.trim() });
            if (res.success) {
                setMessage('OTP sent to your email.');
                setStep(2);
            } else {
                setError(res.message || 'Failed to send OTP');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }
        setLoading(true);

        try {
            const res = await baseClient.post('/admin/reset-password', {
                email: email.trim(),
                otp: otp.trim(),
                password
            });
            if (res.success) {
                setMessage('Password reset successful. Redirecting to login...');
                setTimeout(() => navigate('/admin/login'), 3000);
            } else {
                setError(res.message || 'Failed to reset password');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2" style={{ color: '#8B7355' }}>
                            Reset Admin Password
                        </h1>
                        <p className="text-gray-600 text-sm">
                            {step === 1 ? 'Enter your email to receive an OTP' : 'Enter the OTP and your new password'}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-6">
                            {message}
                        </div>
                    )}

                    {step === 1 ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] transition-colors"
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 bg-[#8B7355] shadow-lg hover:shadow-xl disabled:opacity-50"
                            >
                                {loading ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                            <div className="text-center">
                                <Link to="/admin/login" className="text-sm font-medium text-[#8B7355] hover:underline">
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">OTP Code</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] transition-colors text-center font-bold tracking-widest"
                                    placeholder="000000"
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] transition-colors"
                                    placeholder="••••••••"
                                    minLength={6}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 bg-[#8B7355] shadow-lg hover:shadow-xl disabled:opacity-50"
                            >
                                {loading ? 'Resetting Password...' : 'Reset Password'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminForgotPasswordPage;
