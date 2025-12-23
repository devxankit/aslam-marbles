import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'

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
          <p className="text-gray-600">Loading profile...</p>
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
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        variant="default"
        onShowSidebar={() => {}}
        onShowProjects={() => {}}
        onShowCreations={() => {}}
        onShowServices={() => {}}
        onShowProducts={() => {}}
      />

      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message Banner */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-green-800 font-semibold">Registration Complete!</p>
              <p className="text-green-700 text-sm">Sign Up Successful! Welcome to Aslam Marble Suppliers.</p>
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
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
                      <p className="text-gray-800 text-lg">{user?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
                      <p className="text-gray-800 text-lg">{user?.email || 'N/A'}</p>
                      {user?.isEmailVerified ? (
                        <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                      ) : (
                        <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Not Verified</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Phone Number</label>
                      <p className="text-gray-800 text-lg">{user?.phone || 'N/A'}</p>
                      {user?.isPhoneVerified ? (
                        <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                      ) : (
                        <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Not Verified</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Member Since</label>
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Status</h3>
                  <div className="flex items-center gap-2">
                    {user?.isActive ? (
                      <>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-800">Active Account</span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-gray-800">Inactive Account</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 px-6 py-3 bg-[#8B7355] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Logout
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

export default ProfilePage

