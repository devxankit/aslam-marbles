import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    websiteName: 'Tilak Stone Art',
    contactEmail: 'info@tilakstone.com',
    contactPhone: '+91 9876543210',
    whatsappNumber: '+91 9876543210',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    youtube: ''
  })

  const tabs = [
    { id: 'general', label: 'General Settings' },
    { id: 'social', label: 'Social Media' },
    { id: 'seo', label: 'SEO Settings' },
    { id: 'email', label: 'Email Notifications' },
    { id: 'admin', label: 'Admin Management' }
  ]

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: '',
    metaDescription: '',
    googleAnalytics: ''
  })
  const [emailSettings, setEmailSettings] = useState({
    leadNotificationEmail: 'admin@tilakstone.com',
    notifyOnNewLeads: true,
    notifyOnAppointments: true
  })
  const [loading, setLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' })
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' })

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPasswordStatus({ type: '', message: '' })

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New passwords do not match' })
      return
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordStatus({ type: 'error', message: 'Password must be at least 6 characters' })
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const res = await fetch(`${API_URL}/admin/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      const data = await res.json()
      if (res.ok) {
        // Store for demo purposes on login page
        localStorage.setItem('adminDemoPassword', passwordData.newPassword)

        setPasswordStatus({ type: 'success', message: 'Password changed successfully!' })
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setTimeout(() => {
          setShowPasswordForm(false)
          setPasswordStatus({ type: '', message: '' })
        }, 2000)
      } else {
        setPasswordStatus({ type: 'error', message: data.message || 'Error changing password' })
      }
    } catch (error) {
      setPasswordStatus({ type: 'error', message: 'Connection error. Please try again.' })
    }
  }

  const fetchSettings = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const res = await fetch(`${API_URL}/settings`)
      const data = await res.json()
      if (data.success && data.data) {
        setSettings(data.data.general || settings)
        setSeoSettings(data.data.seo || seoSettings)
        setEmailSettings(data.data.email || emailSettings)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleSave = async () => {
    // Validate required fields
    if (!settings.websiteName || !settings.contactEmail || !settings.contactPhone) {
      setSaveStatus({ type: 'error', message: 'Please fill in all required fields' })
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(settings.contactEmail)) {
      setSaveStatus({ type: 'error', message: 'Please enter a valid email address' })
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000)
      return
    }

    setSaveStatus({ type: 'loading', message: 'Saving settings...' })

    try {
      const token = localStorage.getItem('adminToken')
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const res = await fetch(`${API_URL}/settings/all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          general: settings,
          social: settings, // Settings object currently contains social fields too in original state
          seo: seoSettings,
          email: emailSettings
        })
      })

      const data = await res.json()
      if (res.ok) {
        setSaveStatus({ type: 'success', message: 'Settings saved to database!' })
      } else {
        setSaveStatus({ type: 'error', message: data.message || 'Error saving settings' })
      }
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Connection error' })
    }

    setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                    ? 'text-[#8B7355] border-[#8B7355]'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Website Name</label>
                  <input
                    type="text"
                    value={settings.websiteName}
                    onChange={(e) => setSettings({ ...settings, websiteName: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Website Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-sm text-gray-500">Click to upload logo</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook URL</label>
                  <input
                    type="url"
                    value={settings.facebook}
                    onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram URL</label>
                  <input
                    type="url"
                    value={settings.instagram}
                    onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter URL</label>
                  <input
                    type="url"
                    value={settings.twitter}
                    onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={settings.linkedin}
                    onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">YouTube URL</label>
                  <input
                    type="url"
                    value={settings.youtube}
                    onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={seoSettings.metaTitle}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                    placeholder="Enter meta title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    rows="4"
                    value={seoSettings.metaDescription}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                    placeholder="Enter meta description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Google Analytics Code</label>
                  <textarea
                    rows="3"
                    value={seoSettings.googleAnalytics}
                    onChange={(e) => setSeoSettings({ ...seoSettings, googleAnalytics: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] font-mono text-sm"
                    placeholder="Paste Google Analytics code here"
                  />
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Lead Notification Email</label>
                  <input
                    type="email"
                    value={emailSettings.leadNotificationEmail}
                    onChange={(e) => setEmailSettings({ ...emailSettings, leadNotificationEmail: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                    placeholder="admin@tilakstone.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email address to receive lead notifications</p>
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={emailSettings.notifyOnNewLeads}
                      onChange={(e) => setEmailSettings({ ...emailSettings, notifyOnNewLeads: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">Send email notification for new leads</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={emailSettings.notifyOnAppointments}
                      onChange={(e) => setEmailSettings({ ...emailSettings, notifyOnAppointments: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">Send email notification for appointments</span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'admin' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Change Password</h3>
                      <p className="text-sm text-gray-500">Update your administrative credentials</p>
                    </div>
                    {!showPasswordForm && (
                      <button
                        onClick={() => setShowPasswordForm(true)}
                        className="px-6 py-2 text-sm font-bold text-white rounded-lg transition-transform active:scale-95 shadow-md"
                        style={{ backgroundColor: '#8B7355' }}
                      >
                        Change Password
                      </button>
                    )}
                  </div>

                  {showPasswordForm && (
                    <form onSubmit={handleChangePassword} className="space-y-4 max-w-md animate-fadeIn">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 text-left">Current Password</label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#8B7355] outline-none transition-all placeholder:text-gray-300"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 text-left">New Password</label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#8B7355] outline-none transition-all placeholder:text-gray-300"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 text-left">Confirm New Password</label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#8B7355] outline-none transition-all placeholder:text-gray-300"
                          placeholder="••••••••"
                          required
                        />
                      </div>

                      {passwordStatus.message && (
                        <div className={`p-4 rounded-xl text-sm font-medium ${passwordStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                          }`}>
                          {passwordStatus.message}
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          className="flex-1 bg-[#8B7355] text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all hover:opacity-90 active:scale-95 shadow-lg"
                        >
                          Update Password
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowPasswordForm(false)
                            setPasswordStatus({ type: '', message: '' })
                            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                          }}
                          className="px-6 py-3 border-2 border-gray-200 text-gray-500 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-100 opacity-60">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Add New Admin</h3>
                    <p className="text-sm text-gray-500">Functionality coming soon</p>
                  </div>
                  <button disabled className="px-6 py-2 text-sm font-bold text-white rounded-lg bg-gray-300 cursor-not-allowed">
                    Add Admin
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              {saveStatus.message && (
                <div className={`px-4 py-2 rounded-lg ${saveStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                  {saveStatus.message}
                </div>
              )}
              <button
                onClick={handleSave}
                className="px-6 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90 ml-auto"
                style={{ backgroundColor: '#8B7355' }}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default SettingsPage

