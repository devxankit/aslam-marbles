import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { fetchTrustedByData, addCompanyLogo, updateCompanyLogo, deleteCompanyLogo } from '../../../utils/trustedByUtils'

const CompaniesManagementPage = () => {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [companies, setCompanies] = useState([])
    const [heading, setHeading] = useState('Trusted By')

    // Add Company State
    const [showAddModal, setShowAddModal] = useState(false)
    const [newCompany, setNewCompany] = useState({ name: '', logo: null })
    const [newLogoPreview, setNewLogoPreview] = useState(null)

    // Edit Company State
    const [showEditModal, setShowEditModal] = useState(false)
    const [editingCompany, setEditingCompany] = useState(null)
    const [editLogoPreview, setEditLogoPreview] = useState(null)

    useEffect(() => {
        loadCompanies()
    }, [])

    const loadCompanies = async () => {
        try {
            setLoading(true)
            const data = await fetchTrustedByData()
            if (data) {
                setHeading(data.heading || 'Trusted By')
                setCompanies(data.companies || [])
            }
        } catch (error) {
            console.error('Error loading companies:', error)
            alert('Failed to load companies data')
        } finally {
            setLoading(false)
        }
    }

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    const handleAddCompany = async () => {
        if (!newCompany.name || !newCompany.logo) {
            alert('Please provide company name and logo')
            return
        }

        try {
            setSaving(true)
            const token = localStorage.getItem('adminToken')
            if (!token) {
                alert('Please login as admin first')
                return
            }

            const logoBase64 = await convertFileToBase64(newCompany.logo)
            await addCompanyLogo({ name: newCompany.name, logo: logoBase64 }, token)

            alert('Company added successfully!')
            setShowAddModal(false)
            setNewCompany({ name: '', logo: null })
            setNewLogoPreview(null)
            await loadCompanies()
        } catch (error) {
            console.error('Error adding company:', error)
            alert('Failed to add company: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    const handleEditCompany = async () => {
        if (!editingCompany.name) {
            alert('Please provide company name')
            return
        }

        try {
            setSaving(true)
            const token = localStorage.getItem('adminToken')
            if (!token) {
                alert('Please login as admin first')
                return
            }

            const updateData = { name: editingCompany.name }

            if (editingCompany.newLogo) {
                const logoBase64 = await convertFileToBase64(editingCompany.newLogo)
                updateData.logo = logoBase64
            }

            await updateCompanyLogo(editingCompany._id, updateData, token)

            alert('Company updated successfully!')
            setShowEditModal(false)
            setEditingCompany(null)
            setEditLogoPreview(null)
            await loadCompanies()
        } catch (error) {
            console.error('Error updating company:', error)
            alert('Failed to update company: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    const handleDeleteCompany = async (id) => {
        if (!confirm('Are you sure you want to delete this company?')) {
            return
        }

        try {
            const token = localStorage.getItem('adminToken')
            if (!token) {
                alert('Please login as admin first')
                return
            }

            await deleteCompanyLogo(id, token)
            alert('Company deleted successfully!')
            await loadCompanies()
        } catch (error) {
            console.error('Error deleting company:', error)
            alert('Failed to delete company: ' + error.message)
        }
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-600">Loading companies data...</p>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Trusted By - Companies Management</h1>
                        <p className="text-sm text-gray-600 mt-1">Manage company logos displayed in "Trusted By" section</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
                        style={{ backgroundColor: '#8B7355' }}
                    >
                        Add Company
                    </button>
                </div>

                {/* Companies Grid */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Current Companies ({companies.length})
                    </h2>

                    {companies.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No companies added yet</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {companies.map((company) => (
                                <div key={company._id} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                                    <div className="aspect-square bg-white rounded-lg mb-3 flex items-center justify-center p-2">
                                        <img
                                            src={company.logo.url}
                                            alt={company.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <p className="text-sm font-medium text-gray-800 text-center mb-3 truncate">
                                        {company.name}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingCompany({ ...company, newLogo: null })
                                                setEditLogoPreview(company.logo.url)
                                                setShowEditModal(true)
                                            }}
                                            className="flex-1 px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCompany(company._id)}
                                            className="flex-1 px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add Company Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Add Company</h2>
                                    <button
                                        onClick={() => {
                                            setShowAddModal(false)
                                            setNewCompany({ name: '', logo: null })
                                            setNewLogoPreview(null)
                                        }}
                                        className="text-gray-500 hover:text-gray-700"
                                        disabled={saving}
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            value={newCompany.name}
                                            onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                                            placeholder="Enter company name"
                                            disabled={saving}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Logo
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0]
                                                if (file) {
                                                    setNewCompany({ ...newCompany, logo: file })
                                                    setNewLogoPreview(URL.createObjectURL(file))
                                                }
                                            }}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                                            disabled={saving}
                                        />
                                        {newLogoPreview && (
                                            <div className="mt-4 flex justify-center">
                                                <img
                                                    src={newLogoPreview}
                                                    alt="Preview"
                                                    className="w-32 h-32 object-contain border-2 border-gray-200 rounded-lg p-2"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={handleAddCompany}
                                            disabled={saving}
                                            className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90 disabled:opacity-50"
                                            style={{ backgroundColor: '#8B7355' }}
                                        >
                                            {saving ? 'Adding...' : 'Add Company'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowAddModal(false)
                                                setNewCompany({ name: '', logo: null })
                                                setNewLogoPreview(null)
                                            }}
                                            disabled={saving}
                                            className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Company Modal */}
                {showEditModal && editingCompany && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Edit Company</h2>
                                    <button
                                        onClick={() => {
                                            setShowEditModal(false)
                                            setEditingCompany(null)
                                            setEditLogoPreview(null)
                                        }}
                                        className="text-gray-500 hover:text-gray-700"
                                        disabled={saving}
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editingCompany.name}
                                            onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                                            placeholder="Enter company name"
                                            disabled={saving}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Logo (Optional - leave empty to keep current)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0]
                                                if (file) {
                                                    setEditingCompany({ ...editingCompany, newLogo: file })
                                                    setEditLogoPreview(URL.createObjectURL(file))
                                                }
                                            }}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                                            disabled={saving}
                                        />
                                        {editLogoPreview && (
                                            <div className="mt-4 flex justify-center">
                                                <img
                                                    src={editLogoPreview}
                                                    alt="Preview"
                                                    className="w-32 h-32 object-contain border-2 border-gray-200 rounded-lg p-2"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={handleEditCompany}
                                            disabled={saving}
                                            className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90 disabled:opacity-50"
                                            style={{ backgroundColor: '#8B7355' }}
                                        >
                                            {saving ? 'Updating...' : 'Update Company'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowEditModal(false)
                                                setEditingCompany(null)
                                                setEditLogoPreview(null)
                                            }}
                                            disabled={saving}
                                            className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}

export default CompaniesManagementPage
