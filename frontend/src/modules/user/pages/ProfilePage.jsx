import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TranslatedText from '../../../components/TranslatedText'

const ProfilePage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          navigate('/login', { replace: true })
          return
        }

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
        const response = await fetch(`${API_URL}/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profile')
        }

        setUser(data.user)
      } catch (err) {
        setError(err.message || 'Failed to load profile')
        // If unauthorized, redirect to login
        if (err.message.includes('Token') || err.message.includes('authorization')) {
          localStorage.removeItem('authToken')
          localStorage.removeItem('user')
          navigate('/login', { replace: true })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    navigate('/login', { replace: true })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto mb-4"></div>
          <p className="text-gray-600"><TranslatedText>Loading profile...</TranslatedText></p>
        </div>
      </div>
    )
  }

  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-[#8B7355] text-white rounded-lg hover:opacity-90"
          >
            <TranslatedText>Go to Login</TranslatedText>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        variant="default"
        onShowSidebar={() => { }}
        onShowProjects={() => { }}
        onShowCreations={() => { }}
        onShowServices={() => { }}
        onShowProducts={() => { }}
      />

      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message Banner */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-green-800 font-semibold"><TranslatedText>Registration Complete!</TranslatedText></p>
              <p className="text-green-700 text-sm"><TranslatedText>Sign Up Successful! Welcome to Aslam Marble Suppliers.</TranslatedText></p>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B7355] to-[#7a6349] py-8 px-6 text-center">
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-[#8B7355]">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{user?.name || 'User'}</h1>
              <p className="text-white/90">{user?.email || ''}</p>
            </div>

            {/* Profile Details */}
            <div className="p-6 md:p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4"><TranslatedText>Profile Information</TranslatedText></h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2"><TranslatedText>Full Name</TranslatedText></label>
                      <p className="text-gray-800 text-lg">{user?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2"><TranslatedText>Email</TranslatedText></label>
                      <p className="text-gray-800 text-lg">{user?.email || 'N/A'}</p>
                      {user?.isEmailVerified ? (
                        <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded"><TranslatedText>Verified</TranslatedText></span>
                      ) : (
                        <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded"><TranslatedText>Not Verified</TranslatedText></span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2"><TranslatedText>Phone Number</TranslatedText></label>
                      <p className="text-gray-800 text-lg">{user?.phone || 'N/A'}</p>
                      {user?.isPhoneVerified ? (
                        <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                      ) : (
                        <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Not Verified</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2"><TranslatedText>Member Since</TranslatedText></label>
                      <p className="text-gray-800 text-lg">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Status */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4"><TranslatedText>Account Status</TranslatedText></h3>
                  <div className="flex items-center gap-2">
                    {user?.isActive ? (
                      <>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-800"><TranslatedText>Active Account</TranslatedText></span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-gray-800"><TranslatedText>Inactive Account</TranslatedText></span>
                      </>
                    )}
                  </div>
                </div>

                {/* Order History */}
                <div className="border-t border-gray-200 pt-6">
                  <OrderHistory />
                </div>


                {/* Actions */}
                <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 px-6 py-3 bg-[#8B7355] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    <TranslatedText>Continue Shopping</TranslatedText>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <TranslatedText>Logout</TranslatedText>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const response = await fetch(`${API_URL}/orders/my-orders`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="py-4 text-center text-gray-500"><TranslatedText>Loading your orders...</TranslatedText></div>;
  if (error) return <div className="py-4 text-center text-red-500">{error}</div>;

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4"><TranslatedText>Your Order History</TranslatedText></h3>
      {orders.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4"><TranslatedText>You haven't placed any orders yet.</TranslatedText></p>
          <Link to="/" className="text-[#8B7355] font-semibold hover:underline">
            <TranslatedText>Start Shopping</TranslatedText>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-xl p-4 hover:border-[#8B7355] transition-colors bg-white shadow-sm">
              <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter"><TranslatedText>Order ID</TranslatedText></p>
                  <p className="font-mono text-sm text-gray-700">{order.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter"><TranslatedText>Date</TranslatedText></p>
                  <p className="text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter"><TranslatedText>Amount</TranslatedText></p>
                  <p className="font-bold text-[#8B7355]">₹{order.total?.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter"><TranslatedText>Status</TranslatedText></p>
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                    {order.status || 'pending'}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2"><TranslatedText>Items</TranslatedText></p>
                <div className="flex flex-wrap gap-2">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                      {item.image && <img src={item.image} alt="" className="w-8 h-8 rounded object-cover" />}
                      <span className="text-sm font-medium text-gray-800">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
