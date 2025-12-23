import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { useParams } from 'react-router-dom'

const LeadsManagementPage = () => {
  const { type } = useParams()
  const [activeTab, setActiveTab] = useState(type === 'users' ? 'users' : 'leads')
  const [leads, setLeads] = useState([])
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLead, setSelectedLead] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [leadToDelete, setLeadToDelete] = useState(null)
  const [loading, setLoading] = useState(false)

  // Dummy data - in production, fetch from API
  const dummyLeads = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 9876543210',
      city: 'Mumbai',
      type: 'DOMESTIC',
      status: 'new',
      date: '2024-01-15',
      budget: '5-10 Lakhs',
      lookingFor: 'Complete Pooja Room'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 9876543211',
      city: 'Delhi',
      type: 'INTERNATIONAL',
      status: 'in_discussion',
      date: '2024-01-14',
      budget: '10-20 Lakhs',
      lookingFor: 'Dream Temple'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+91 9876543212',
      city: 'Ahmedabad',
      type: 'DOMESTIC',
      status: 'quotation_sent',
      date: '2024-01-13',
      budget: '3-5 Lakhs',
      lookingFor: 'Murti Collection',
      address: '123, Main Street, Ahmedabad',
      pincode: '380001',
      message: 'Looking for premium quality murtis for home temple.'
    },
    {
      id: 4,
      name: 'Sunita Reddy',
      email: 'sunita@example.com',
      phone: '+91 9876543213',
      city: 'Hyderabad',
      type: 'DOMESTIC',
      status: 'closed',
      date: '2024-01-12',
      budget: '15-20 Lakhs',
      lookingFor: 'Complete Dream Temple',
      address: '456, Park Avenue, Hyderabad',
      pincode: '500001',
      message: 'Interested in complete dream temple package.'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      phone: '+91 9876543214',
      city: 'Pune',
      type: 'DOMESTIC',
      status: 'new',
      date: '2024-01-16',
      budget: '8-12 Lakhs',
      lookingFor: 'Pooja Room Setup',
      address: '789, MG Road, Pune',
      pincode: '411001',
      message: 'Need complete pooja room design and installation.'
    }
  ]

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      if (activeTab === 'users') {
        setLoading(true)
        try {
          // Try admin token first, then user token
          const adminToken = localStorage.getItem('adminToken')
          const userToken = localStorage.getItem('authToken')
          const token = adminToken || userToken

          if (!token) {
            console.error('No authentication token found')
            return
          }

          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
          const response = await fetch(`${API_URL}/users`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })

          const data = await response.json()
          if (data.success) {
            setUsers(data.users || [])
          }
        } catch (error) {
          console.error('Failed to fetch users:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUsers()
  }, [activeTab])

  useEffect(() => {
    const fetchAppointments = async () => {
      if (activeTab !== 'leads' || type !== 'appointments') return
      setLoading(true)
      try {
        const adminToken = localStorage.getItem('adminToken')
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
        const res = await fetch(`${API_URL}/appointments`, {
          headers: {
            'Content-Type': 'application/json',
            ...(adminToken ? { 'Authorization': `Bearer ${adminToken}` } : {})
          }
        })
        const data = await res.json()
        if (res.ok && data.success !== false) {
          const mapped = (data.appointments || []).map((apt, idx) => ({
            id: apt._id || idx,
            name: apt.fullName,
            email: '',
            phone: apt.contactNumber,
            city: apt.city,
            status: apt.status || 'pending',
            date: apt.selectedDate,
            appointmentType: apt.appointmentType,
            time: apt.selectedTime
          }))
          setLeads(mapped)
        } else {
          console.error('Failed to fetch appointments:', data.message)
          setLeads([])
        }
      } catch (err) {
        console.error('Failed to fetch appointments:', err)
        setLeads([])
      } finally {
        setLoading(false)
      }
    }

    const fetchJobApplications = async () => {
      if (activeTab !== 'leads' || type !== 'job-openings') return
      setLoading(true)
      try {
        const adminToken = localStorage.getItem('adminToken')
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
        const res = await fetch(`${API_URL}/jobs`, {
          headers: {
            'Content-Type': 'application/json',
            ...(adminToken ? { 'Authorization': `Bearer ${adminToken}` } : {})
          }
        })
        const data = await res.json()
        if (res.ok && data.success !== false) {
          const mapped = (data.applications || []).map((app, idx) => ({
            id: app._id || idx,
            name: app.fullName,
            email: app.email,
            phone: app.phoneNo,
            city: app.currentCity,
            status: app.status || 'new',
            date: app.createdAt ? app.createdAt.slice(0, 10) : '',
            department: app.department,
            role: app.applyingFor,
            currentPosition: app.currentPosition,
            resumeName: app.resumeName
          }))
          setLeads(mapped)
        } else {
          console.error('Failed to fetch job applications:', data.message)
          setLeads([])
        }
      } catch (err) {
        console.error('Failed to fetch job applications:', err)
        setLeads([])
      } finally {
        setLoading(false)
      }
    }

    const loadDummyLeads = () => {
      if (activeTab === 'leads' && type !== 'appointments' && type !== 'job-openings') {
        setLeads(dummyLeads)
      }
    }

    fetchAppointments()
    fetchJobApplications()
    loadDummyLeads()
  }, [type, activeTab])

  const getPageTitle = () => {
    if (activeTab === 'users') return 'Registered Users'
    switch (type) {
      case 'job-openings': return 'Job Applications'
      case 'appointments': return 'Appointment Bookings'
      default: return 'Leads Management'
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm)
    return matchesSearch
  })

  const statusOptions = type === 'appointments'
    ? [
      { value: 'all', label: 'All' },
      { value: 'pending', label: 'Pending' },
      { value: 'confirmed', label: 'Confirmed' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' }
    ]
    : type === 'job-openings'
      ? [
        { value: 'all', label: 'All' },
        { value: 'new', label: 'New' },
        { value: 'in_review', label: 'In Review' },
        { value: 'shortlisted', label: 'Shortlisted' },
        { value: 'hired', label: 'Hired' },
        { value: 'rejected', label: 'Rejected' }
      ]
      : [
        { value: 'all', label: 'All' },
        { value: 'new', label: 'New' },
        { value: 'in_discussion', label: 'In Discussion' },
        { value: 'quotation_sent', label: 'Quotation Sent' },
        { value: 'closed', label: 'Closed' }
      ]

  const getStatusBadge = (status) => {
    const styles = type === 'appointments'
      ? {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      }
      : type === 'job-openings'
        ? {
          new: 'bg-blue-100 text-blue-800',
          in_review: 'bg-yellow-100 text-yellow-800',
          shortlisted: 'bg-purple-100 text-purple-800',
          hired: 'bg-green-100 text-green-800',
          rejected: 'bg-red-100 text-red-800'
        }
        : {
          new: 'bg-blue-100 text-blue-800',
          in_discussion: 'bg-yellow-100 text-yellow-800',
          quotation_sent: 'bg-purple-100 text-purple-800',
          closed: 'bg-green-100 text-green-800'
        }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status?.toString().replace('_', ' ').toUpperCase()}
      </span>
    )
  }

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === 'all' || lead.status === filter
    const matchesSearch = searchTerm === '' ||
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
    return matchesFilter && matchesSearch
  })

  const handleViewDetails = (lead) => {
    setSelectedLead(lead)
    setShowDetailsModal(true)
  }

  const handleEdit = (lead) => {
    setSelectedLead(lead)
    setShowEditModal(true)
  }

  const handleDelete = (lead) => {
    setLeadToDelete(lead)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (leadToDelete) {
      setLeads(leads.filter(lead => lead.id !== leadToDelete.id))
      setShowDeleteConfirm(false)
      setLeadToDelete(null)
    }
  }

  const handleStatusUpdate = (leadId, newStatus) => {
    setLeads(leads.map(lead =>
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ))
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus })
    }
  }

  const handleSaveEdit = (updatedLead) => {
    setLeads(leads.map(lead =>
      lead.id === updatedLead.id ? updatedLead : lead
    ))
    setShowEditModal(false)
    setSelectedLead(null)
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'City', 'Status', 'Date', 'Budget', 'Looking For']
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        lead.id,
        `"${lead.name}"`,
        lead.email,
        lead.phone,
        lead.city,
        lead.status,
        lead.date,
        lead.budget || '',
        `"${lead.lookingFor || ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${getPageTitle().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: '#8B7355' }}
          >
            Export CSV
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md p-1 flex gap-2">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'leads'
              ? 'text-white'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
            style={activeTab === 'leads' ? { backgroundColor: '#8B7355' } : {}}
          >
            Leads
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'users'
              ? 'text-white'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
            style={activeTab === 'users' ? { backgroundColor: '#8B7355' } : {}}
          >
            Users ({users.length})
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
              />
            </div>
            <div className="flex gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === option.value
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  style={filter === option.value ? { backgroundColor: '#8B7355' } : {}}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leads Table */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: '#8B7355' }}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">City</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{lead.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.city}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(lead.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleViewDetails(lead)}
                              className="text-[#8B7355] hover:underline font-medium"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(lead)}
                              className="text-blue-600 hover:underline font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(lead)}
                              className="text-red-600 hover:underline font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Table */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B7355] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading users...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: '#8B7355' }}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Registered</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                          {users.length === 0 ? 'No users registered yet' : 'No users found matching search'}
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user._id || user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            #{user._id?.toString().slice(-6) || user.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.isActive ? (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                Active
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => {
                                setSelectedUser(user)
                                setShowUserDetailsModal(true)
                              }}
                              className="text-[#8B7355] hover:underline font-medium"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {showDetailsModal && selectedLead && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Lead Details</h2>
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    setSelectedLead(null)
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">ID</label>
                    <p className="text-gray-800">#{selectedLead.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Status</label>
                    <div className="mt-1">{getStatusBadge(selectedLead.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Name</label>
                    <p className="text-gray-800">{selectedLead.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Email</label>
                    <p className="text-gray-800">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Phone</label>
                    <p className="text-gray-800">{selectedLead.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">City</label>
                    <p className="text-gray-800">{selectedLead.city}</p>
                  </div>
                  {selectedLead.address && (
                    <div className="col-span-2">
                      <label className="text-sm font-semibold text-gray-600">Address</label>
                      <p className="text-gray-800">{selectedLead.address}</p>
                    </div>
                  )}
                  {selectedLead.pincode && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Pincode</label>
                      <p className="text-gray-800">{selectedLead.pincode}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Date</label>
                    <p className="text-gray-800">{selectedLead.date}</p>
                  </div>
                  {selectedLead.budget && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Budget</label>
                      <p className="text-gray-800">{selectedLead.budget}</p>
                    </div>
                  )}
                  {selectedLead.lookingFor && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Looking For</label>
                      <p className="text-gray-800">{selectedLead.lookingFor}</p>
                    </div>
                  )}
                  {selectedLead.message && (
                    <div className="col-span-2">
                      <label className="text-sm font-semibold text-gray-600">Message</label>
                      <p className="text-gray-800">{selectedLead.message}</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Update Status</label>
                  <div className="flex gap-2">
                    {statusOptions.filter(opt => opt.value !== 'all').map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleStatusUpdate(selectedLead.id, option.value)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedLead.status === option.value
                          ? 'text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        style={selectedLead.status === option.value ? { backgroundColor: '#8B7355' } : {}}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false)
                      handleEdit(selectedLead)
                    }}
                    className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
                    style={{ backgroundColor: '#8B7355' }}
                  >
                    Edit Lead
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false)
                      setSelectedLead(null)
                    }}
                    className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedLead && (
        <EditLeadModal
          lead={selectedLead}
          onSave={handleSaveEdit}
          onClose={() => {
            setShowEditModal(false)
            setSelectedLead(null)
          }}
        />
      )}

      {/* User Details Modal */}
      {showUserDetailsModal && selectedUser && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                <button
                  onClick={() => {
                    setShowUserDetailsModal(false)
                    setSelectedUser(null)
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">User ID</label>
                    <p className="text-gray-800">#{selectedUser._id?.toString().slice(-6) || selectedUser.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Status</label>
                    <div className="mt-1">
                      {selectedUser.isActive ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Name</label>
                    <p className="text-gray-800">{selectedUser.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Email</label>
                    <p className="text-gray-800">{selectedUser.email}</p>
                    {selectedUser.isEmailVerified && (
                      <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Phone</label>
                    <p className="text-gray-800">{selectedUser.phone}</p>
                    {selectedUser.isPhoneVerified && (
                      <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Registered On</label>
                    <p className="text-gray-800">
                      {selectedUser.createdAt
                        ? new Date(selectedUser.createdAt).toLocaleString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                        : 'N/A'}
                    </p>
                  </div>
                  {selectedUser.lastLogin && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Last Login</label>
                      <p className="text-gray-800">
                        {new Date(selectedUser.lastLogin).toLocaleString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowUserDetailsModal(false)
                      setSelectedUser(null)
                    }}
                    className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
                    style={{ backgroundColor: '#8B7355' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && leadToDelete && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete lead <strong>#{leadToDelete.id} - {leadToDelete.name}</strong>? This action cannot be undone.
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
                    setLeadToDelete(null)
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
    </AdminLayout>
  )
}

// Edit Lead Modal Component
const EditLeadModal = ({ lead, onSave, onClose }) => {
  const [formData, setFormData] = useState(lead)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Edit Lead</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                >
                  <option value="new">New</option>
                  <option value="in_discussion">In Discussion</option>
                  <option value="quotation_sent">Quotation Sent</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Budget</label>
                <input
                  type="text"
                  value={formData.budget || ''}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Looking For</label>
                <input
                  type="text"
                  value={formData.lookingFor || ''}
                  onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  value={formData.message || ''}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: '#8B7355' }}
              >
                Save Changes
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

export default LeadsManagementPage

