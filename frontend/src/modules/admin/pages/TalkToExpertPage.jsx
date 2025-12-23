import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const TalkToExpertPage = () => {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedConsultation, setSelectedConsultation] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [consultationToDelete, setConsultationToDelete] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [editFormData, setEditFormData] = useState({})

  useEffect(() => {
    fetchConsultations()
  }, [filter, searchTerm])

  const fetchConsultations = async () => {
    setLoading(true)
    try {
      const adminToken = localStorage.getItem('adminToken')
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

      let url = `${API_URL}/expert-consultations?status=${filter}`
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`
      }

      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { 'Authorization': `Bearer ${adminToken}` } : {})
        }
      })

      const data = await res.json()
      if (res.ok && data.success !== false) {
        setConsultations(data.consultations || [])
      } else {
        console.error('Failed to fetch consultations:', data.message)
        setConsultations([])
      }
    } catch (err) {
      console.error('Failed to fetch consultations:', err)
      setConsultations([])
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (consultation) => {
    setSelectedConsultation(consultation)
    setShowDetailsModal(true)
  }

  const handleEdit = (consultation) => {
    setEditFormData({
      status: consultation.status,
      notes: consultation.notes || ''
    })
    setSelectedConsultation(consultation)
    setShowEditModal(true)
  }

  const handleUpdate = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken')
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

      const res = await fetch(`${API_URL}/expert-consultations/${selectedConsultation._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { 'Authorization': `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify(editFormData)
      })

      const data = await res.json()
      if (res.ok && data.success !== false) {
        alert('Consultation updated successfully!')
        setShowEditModal(false)
        fetchConsultations()
      } else {
        alert(data.message || 'Failed to update consultation')
      }
    } catch (err) {
      console.error('Error updating consultation:', err)
      alert('Failed to update consultation')
    }
  }

  const handleDeleteClick = (consultation) => {
    setConsultationToDelete(consultation)
    setShowDeleteConfirm(true)
  }

  const handleDelete = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken')
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

      const res = await fetch(`${API_URL}/expert-consultations/${consultationToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { 'Authorization': `Bearer ${adminToken}` } : {})
        }
      })

      const data = await res.json()
      if (res.ok && data.success !== false) {
        alert('Consultation deleted successfully!')
        setShowDeleteConfirm(false)
        setConsultationToDelete(null)
        fetchConsultations()
      } else {
        alert(data.message || 'Failed to delete consultation')
      }
    } catch (err) {
      console.error('Error deleting consultation:', err)
      alert('Failed to delete consultation')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    }
    return colors[status] || colors.new
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Talk to Expert Consultations</h1>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-800">{consultations.length}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">
              {consultations.filter(c => c.status === 'new').length}
            </div>
            <div className="text-sm text-gray-600">New</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-yellow-600">
              {consultations.filter(c => c.status === 'contacted').length}
            </div>
            <div className="text-sm text-gray-600">Contacted</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">
              {consultations.filter(c => c.status === 'in_progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {consultations.filter(c => c.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : consultations.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No consultations found</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {consultations.map((consultation) => (
                    <tr key={consultation._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {consultation.fullName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {consultation.email}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {consultation.phone}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {consultation.city}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {consultation.type}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(consultation.status)}`}>
                          {consultation.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(consultation.createdAt)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(consultation)}
                            className="text-[#8B7355] hover:text-[#7a6349]"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(consultation)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(consultation)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedConsultation && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Consultation Details</h2>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-base text-gray-900">{selectedConsultation.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-base text-gray-900">{selectedConsultation.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-base text-gray-900">{selectedConsultation.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">City</label>
                    <p className="text-base text-gray-900">{selectedConsultation.city}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Type</label>
                    <p className="text-base text-gray-900">{selectedConsultation.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">About Yourself</label>
                    <p className="text-base text-gray-900">
                      {selectedConsultation.aboutYourself === 'homeowner'
                        ? 'Homeowner looking for pooja unit/room'
                        : 'Interior designer/consultant'}
                    </p>
                  </div>
                  {selectedConsultation.lookingFor && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Looking For</label>
                      <p className="text-base text-gray-900">
                        {selectedConsultation.lookingFor === 'singular'
                          ? 'Singular Marble Mandir Unit'
                          : 'Complete Pooja Room Solution'}
                      </p>
                    </div>
                  )}
                  {selectedConsultation.budget && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Budget</label>
                      <p className="text-base text-gray-900">{selectedConsultation.budget}</p>
                    </div>
                  )}
                  {selectedConsultation.timeline && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Timeline</label>
                      <p className="text-base text-gray-900">{selectedConsultation.timeline}</p>
                    </div>
                  )}
                  {selectedConsultation.additionalInfo && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Additional Information</label>
                      <p className="text-base text-gray-900">{selectedConsultation.additionalInfo}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <p className="text-base">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedConsultation.status)}`}>
                        {selectedConsultation.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Submitted On</label>
                    <p className="text-base text-gray-900">{formatDate(selectedConsultation.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && selectedConsultation && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Edit Consultation</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={editFormData.status}
                      onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdate}
                      className="flex-1 px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:opacity-90"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this consultation? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false)
                      setConsultationToDelete(null)
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
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

export default TalkToExpertPage

