import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { indianLocations, internationalLocations, formatLocationName } from '../../../data/locations'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const pageOptions = [
  { key: 'how-it-works', name: 'How It Works' },
  { key: 'murti', name: 'Murti' },
  { key: 'dream-temple', name: 'Dream Temple' },
  { key: 'ams-international', name: 'AMS International' },
  { key: 'location', name: 'Location' },
  { key: 'general', name: 'General' }
]

const allLocations = [
  ...indianLocations.map((loc) => formatLocationName(loc.name)),
  ...internationalLocations.map((loc) => loc.name)
]

const FAQsManagementPage = () => {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedPage, setSelectedPage] = useState('how-it-works')
  const [selectedLocation, setSelectedLocation] = useState('Mumbai')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedFAQ, setSelectedFAQ] = useState(null)
  const [faqToDelete, setFaqToDelete] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const adminToken = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null

  const fetchFAQsData = async () => {
    try {
      setLoading(true)
      setError('')
      const params = new URLSearchParams({ pageKey: selectedPage, isActive: 'true' })
      if (selectedPage === 'location' && selectedLocation) {
        params.append('location', selectedLocation)
      }

      const res = await fetch(`${API_URL}/faqs?${params.toString()}`)
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch FAQs')
      }
      setFaqs(data.data || [])
    } catch (err) {
      console.error('Error fetching FAQs:', err)
      setError(err.message || 'Failed to fetch FAQs')
      setFaqs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFAQsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPage, selectedLocation])

  const handleAddFAQ = async (newFAQ) => {
    try {
      setError('')
      setSuccess('')
      if (!adminToken) {
        setError('Admin token missing. Please log in again.')
        return
      }

      const payload = {
        pageKey: selectedPage,
        question: newFAQ.question,
        answer: newFAQ.answer,
        displayOrder: newFAQ.displayOrder || 0,
        isActive: true
      }

      if (selectedPage === 'location') {
        payload.location = newFAQ.location || selectedLocation
      }

      const res = await fetch(`${API_URL}/faqs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to add FAQ')
      }

      setSuccess('FAQ added successfully')
      setShowAddModal(false)
      fetchFAQsData()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Error adding FAQ:', err)
      setError(err.message || 'Failed to add FAQ')
    }
  }

  const handleEditFAQ = async (updatedFAQ) => {
    if (!updatedFAQ || !updatedFAQ._id) return
    try {
      setError('')
      setSuccess('')
      if (!adminToken) {
        setError('Admin token missing. Please log in again.')
        return
      }

      const payload = {
        pageKey: selectedPage,
        question: updatedFAQ.question,
        answer: updatedFAQ.answer,
        displayOrder: updatedFAQ.displayOrder || 0,
        isActive: updatedFAQ.isActive !== undefined ? updatedFAQ.isActive : true
      }

      if (selectedPage === 'location') {
        payload.location = updatedFAQ.location || selectedLocation
      }

      const res = await fetch(`${API_URL}/faqs/${updatedFAQ._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update FAQ')
      }

      setSuccess('FAQ updated successfully')
      setShowEditModal(false)
      setSelectedFAQ(null)
      fetchFAQsData()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Error updating FAQ:', err)
      setError(err.message || 'Failed to update FAQ')
    }
  }

  const handleDeleteFAQ = (faq) => {
    setFaqToDelete(faq)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (!faqToDelete || !faqToDelete._id) return
    try {
      setError('')
      setSuccess('')
      if (!adminToken) {
        setError('Admin token missing. Please log in again.')
        return
      }

      const res = await fetch(`${API_URL}/faqs/${faqToDelete._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete FAQ')
      }

      setSuccess('FAQ deleted successfully')
      setShowDeleteConfirm(false)
      setFaqToDelete(null)
      fetchFAQsData()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Error deleting FAQ:', err)
      setError(err.message || 'Failed to delete FAQ')
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">FAQs Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: '#8B7355' }}
          >
            + Add New FAQ
          </button>
        </div>

        {success && (
          <div className="p-3 rounded-md bg-green-50 border border-green-200 text-green-700 text-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Page</label>
              <select
                value={selectedPage}
                onChange={(e) => {
                  setSelectedPage(e.target.value)
                  setFaqs([])
                }}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
              >
                {pageOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedPage === 'location' && (
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value)
                    setFaqs([])
                  }}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                >
                  {allLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* FAQs List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading FAQs...</div>
          ) : faqs.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p>
                No FAQs found for{' '}
                {selectedPage === 'location'
                  ? `${selectedPage} (${selectedLocation})`
                  : selectedPage}
                . Click &quot;Add New FAQ&quot; to get started.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {faqs.map((faq) => (
                <div key={faq._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          Page:{' '}
                          {pageOptions.find((p) => p.key === faq.pageKey)?.name || faq.pageKey}
                        </span>
                        {faq.location && (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                            {faq.location}
                          </span>
                        )}
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700">
                          Order: {faq.displayOrder ?? 0}
                        </span>
                        {!faq.isActive && (
                          <span className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-600">
                            Inactive
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">{faq.question}</h3>
                      <div
                        className="text-sm text-gray-600 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => {
                          setSelectedFAQ(faq)
                          setShowEditModal(true)
                        }}
                        className="px-3 py-1 text-sm text-[#8B7355] hover:underline font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFAQ(faq)}
                        className="px-3 py-1 text-sm text-red-600 hover:underline font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add FAQ Modal */}
        {showAddModal && (
          <FAQFormModal
            pageKey={selectedPage}
            location={selectedPage === 'location' ? selectedLocation : ''}
            onSave={handleAddFAQ}
            onClose={() => setShowAddModal(false)}
          />
        )}

        {/* Edit FAQ Modal */}
        {showEditModal && selectedFAQ && (
          <FAQFormModal
            faq={selectedFAQ}
            pageKey={selectedPage}
            location={selectedFAQ.location || (selectedPage === 'location' ? selectedLocation : '')}
            onSave={handleEditFAQ}
            onClose={() => {
              setShowEditModal(false)
              setSelectedFAQ(null)
            }}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && faqToDelete && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this FAQ? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false)
                      setFaqToDelete(null)
                    }}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

// FAQ Form Modal Component
const FAQFormModal = ({ faq, pageKey, location, onSave, onClose }) => {
  const isLocationPage = pageKey === 'location'

  const [formData, setFormData] = useState(
    faq
      ? {
        question: faq.question,
        answer: faq.answer,
        displayOrder: faq.displayOrder ?? 0,
        isActive: faq.isActive ?? true,
        location: faq.location || location || ''
      }
      : {
        question: '',
        answer: '',
        displayOrder: 0,
        isActive: true,
        location: location || ''
      }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (faq) {
      onSave({ ...faq, ...formData })
    } else {
      onSave(formData)
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {faq ? 'Edit FAQ' : 'Add New FAQ'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            <span className="font-semibold mr-1">Page:</span>
            {pageOptions.find((p) => p.key === pageKey)?.name || pageKey}
            {isLocationPage && formData.location && (
              <>
                <span className="mx-1">|</span>
                <span className="font-semibold mr-1">Location:</span>
                {formData.location}
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isLocationPage && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                >
                  <option value="">Select a location</option>
                  {allLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Question *</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Answer *</label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows="6"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                You can use basic HTML tags like &lt;br /&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;
                etc.
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) =>
                  setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) || 0 })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
            </div>
            {faq && (
              <div className="flex items-center gap-2">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
                  Active
                </label>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: '#8B7355' }}
              >
                {faq ? 'Update FAQ' : 'Add FAQ'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FAQsManagementPage
