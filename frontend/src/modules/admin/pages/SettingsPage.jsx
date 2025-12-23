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
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' })

  const handleSave = () => {
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

    // In production, save to API
    // For now, save to localStorage
    localStorage.setItem('adminSettings', JSON.stringify({
      general: settings,
      seo: seoSettings,
      email: emailSettings
    }))

    setSaveStatus({ type: 'success', message: 'Settings saved successfully!' })
    setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000)
  }

  useEffect(() => {
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem('adminSettings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        if (parsed.general) setSettings(parsed.general)
        if (parsed.seo) setSeoSettings(parsed.seo)
        if (parsed.email) setEmailSettings(parsed.email)
      } catch (e) {
        console.error('Error loading settings:', e)
      }
    }
  }, [])

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
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
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
                    onChange={(e) => setSettings({...settings, websiteName: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
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
                    onChange={(e) => setSettings({...settings, facebook: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram URL</label>
                  <input
                    type="url"
                    value={settings.instagram}
                    onChange={(e) => setSettings({...settings, instagram: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter URL</label>
                  <input
                    type="url"
                    value={settings.twitter}
                    onChange={(e) => setSettings({...settings, twitter: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={settings.linkedin}
                    onChange={(e) => setSettings({...settings, linkedin: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">YouTube URL</label>
                  <input
                    type="url"
                    value={settings.youtube}
                    onChange={(e) => setSettings({...settings, youtube: e.target.value})}
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
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">Change Password</p>
                    <p className="text-sm text-gray-500">Update your admin password</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-white rounded-lg" style={{ backgroundColor: '#8B7355' }}>
                    Change Password
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">Add New Admin</p>
                    <p className="text-sm text-gray-500">Create a new admin account</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-white rounded-lg" style={{ backgroundColor: '#8B7355' }}>
                    Add Admin
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              {saveStatus.message && (
                <div className={`px-4 py-2 rounded-lg ${
                  saveStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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

