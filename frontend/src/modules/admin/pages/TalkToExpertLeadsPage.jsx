import { useState, useEffect } from 'react'
import { Search, Download, Eye, Trash2, Calendar, Mail, Phone, MapPin, User, FileText, X } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const TalkToExpertLeadsPage = () => {
    const [consultations, setConsultations] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterSource, setFilterSource] = useState('all')
    const [selectedConsultation, setSelectedConsultation] = useState(null)
    const [showDetailModal, setShowDetailModal] = useState(false)

    useEffect(() => {
        fetchConsultations()
    }, [])

    const fetchConsultations = async () => {
        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${API_URL}/expert-consultations`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.json()
            if (data.success) {
                setConsultations(data.data)
            }
        } catch (error) {
            console.error('Failed to fetch consultations:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${API_URL}/expert-consultations/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            })
            if (res.ok) {
                fetchConsultations()
            }
        } catch (error) {
            console.error('Failed to update status:', error)
        }
    }

    const deleteConsultation = async (id) => {
        if (!confirm('Are you sure you want to delete this consultation?')) return

        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${API_URL}/expert-consultations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.ok) {
                fetchConsultations()
                alert('Deleted successfully!')
            }
        } catch (error) {
            console.error('Failed to delete consultation:', error)
        }
    }

    const exportToCSV = () => {
        const headers = ['Date', 'Name', 'Email', 'Phone', 'City', 'Type', 'Status', 'Budget', 'Timeline', 'Source']
        const rows = filteredConsultations.map(c => [
            new Date(c.createdAt).toLocaleDateString(),
            c.fullName,
            c.email,
            c.phone,
            c.city,
            c.type,
            c.status,
            c.budget || 'N/A',
            c.timeline || 'N/A',
            c.source || 'N/A'
        ])

        const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `talk-to-expert-leads-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
    }

    const filteredConsultations = consultations.filter(c => {
        const matchesSearch = c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone.includes(searchTerm)
        const matchesStatusFilter = filterStatus === 'all' || c.status === filterStatus
        const matchesSourceFilter = filterSource === 'all' || c.source === filterSource
        return matchesSearch && matchesStatusFilter && matchesSourceFilter
    })

    const stats = {
        total: consultations.length,
        new: consultations.filter(c => c.status === 'new').length,
        inProgress: consultations.filter(c => c.status === 'in_progress').length,
        completed: consultations.filter(c => c.status === 'completed').length
    }

    // Get unique sources for filter
    const sources = [...new Set(consultations.map(c => c.source).filter(Boolean))]

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Talk to Expert Leads</h1>
                    <p className="text-gray-600">Manage all expert consultation requests from various pages</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Leads</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">New</p>
                                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.new}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">In Progress</p>
                                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.inProgress}</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Completed</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <FileText className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Export Button */}
                            <button
                                onClick={exportToCSV}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                            >
                                <Download className="w-5 h-5" />
                                Export CSV
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Status Filter */}
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="closed">Closed</option>
                            </select>

                            {/* Source Filter */}
                            <select
                                value={filterSource}
                                onChange={(e) => setFilterSource(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Pages</option>
                                {sources.map(source => (
                                    <option key={source} value={source}>{source}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredConsultations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <FileText className="w-16 h-16 text-gray-300 mb-4" />
                            <p className="text-gray-500 text-lg">No consultations found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact Info</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Page Source</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredConsultations.map((consultation) => (
                                        <tr key={consultation._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(consultation.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                                        <User className="w-4 h-4 text-gray-400" />
                                                        {consultation.fullName}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Mail className="w-4 h-4 text-gray-400" />
                                                        {consultation.email}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Phone className="w-4 h-4 text-gray-400" />
                                                        {consultation.phone}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <MapPin className="w-4 h-4 text-gray-400" />
                                                        {consultation.city}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                                                    {consultation.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={consultation.status}
                                                    onChange={(e) => updateStatus(consultation._id, e.target.value)}
                                                    className="text-xs font-semibold px-3 py-1 rounded-full border focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="new">NEW</option>
                                                    <option value="contacted">CONTACTED</option>
                                                    <option value="in_progress">IN PROGRESS</option>
                                                    <option value="completed">COMPLETED</option>
                                                    <option value="closed">CLOSED</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                                    {consultation.source || 'Unknown'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedConsultation(consultation)
                                                            setShowDetailModal(true)
                                                        }}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteConsultation(consultation._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedConsultation && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Consultation Details</h3>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Full Name</label>
                                    <p className="text-gray-900 mt-1">{selectedConsultation.fullName}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Type</label>
                                    <p className="text-gray-900 mt-1">{selectedConsultation.type}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Email</label>
                                    <p className="text-gray-900 mt-1">{selectedConsultation.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Phone</label>
                                    <p className="text-gray-900 mt-1">{selectedConsultation.phone}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">City</label>
                                    <p className="text-gray-900 mt-1">{selectedConsultation.city}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">About</label>
                                    <p className="text-gray-900 mt-1 capitalize">{selectedConsultation.aboutYourself}</p>
                                </div>
                                {selectedConsultation.lookingFor && (
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600">Looking For</label>
                                        <p className="text-gray-900 mt-1 capitalize">{selectedConsultation.lookingFor}</p>
                                    </div>
                                )}
                                {selectedConsultation.budget && (
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600">Budget</label>
                                        <p className="text-gray-900 mt-1">{selectedConsultation.budget}</p>
                                    </div>
                                )}
                                {selectedConsultation.timeline && (
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600">Timeline</label>
                                        <p className="text-gray-900 mt-1">{selectedConsultation.timeline}</p>
                                    </div>
                                )}
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Page Source</label>
                                    <p className="text-gray-900 mt-1">{selectedConsultation.source || 'Unknown'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Submitted On</label>
                                    <p className="text-gray-900 mt-1">{new Date(selectedConsultation.createdAt).toLocaleString()}</p>
                                </div>
                            </div>

                            {selectedConsultation.additionalInfo && (
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Additional Information</label>
                                    <p className="text-gray-900 mt-1 whitespace-pre-wrap">{selectedConsultation.additionalInfo}</p>
                                </div>
                            )}
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TalkToExpertLeadsPage
