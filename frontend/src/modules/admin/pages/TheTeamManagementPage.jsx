import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const TheTeamManagementPage = () => {
    const [heroImage, setHeroImage] = useState(null)
    const [heroPreview, setHeroPreview] = useState('')
    const [teamMembers, setTeamMembers] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [message, setMessage] = useState({ type: '', text: '' })

    // Modal states for adding/editing members
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)
    const [editingMember, setEditingMember] = useState(null)
    const [memberFormData, setMemberFormData] = useState({
        name: '',
        position: '',
        description: '',
        image: null
    })
    const [memberImagePreview, setMemberImagePreview] = useState('')

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'
    const token = localStorage.getItem('adminToken')

    useEffect(() => {
        fetchTeamData()
    }, [])

    const fetchTeamData = async () => {
        try {
            const res = await fetch(`${API_URL}/team`)
            const result = await res.json()
            if (result.success && result.data) {
                setHeroPreview(result.data.heroImage?.url || '')
                setTeamMembers(result.data.members || [])
            }
        } catch (error) {
            console.error('Error fetching team data:', error)
            setMessage({ type: 'error', text: 'Failed to load team data' })
        } finally {
            setFetching(false)
        }
    }

    const handleHeroImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setHeroImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setHeroPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const saveHeroImage = async () => {
        if (!heroImage) return
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('heroImage', heroImage)

            const res = await fetch(`${API_URL}/team/hero-image`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

            const result = await res.json()
            if (result.success) {
                setMessage({ type: 'success', text: 'Hero image updated successfully!' })
                setHeroImage(null)
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to update hero image' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Connection error' })
        } finally {
            setLoading(false)
        }
    }

    const handleMemberImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setMemberFormData({ ...memberFormData, image: file })
            const reader = new FileReader()
            reader.onloadend = () => {
                setMemberImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const openMemberModal = (member = null) => {
        if (member) {
            setEditingMember(member)
            setMemberFormData({
                name: member.name,
                position: member.position,
                description: member.description,
                image: null
            })
            setMemberImagePreview(member.image?.url || '')
        } else {
            setEditingMember(null)
            setMemberFormData({
                name: '',
                position: '',
                description: '',
                image: null
            })
            setMemberImagePreview('')
        }
        setIsMemberModalOpen(true)
    }

    const closeMemberModal = () => {
        setIsMemberModalOpen(false)
        setEditingMember(null)
        setMemberFormData({ name: '', position: '', description: '', image: null })
        setMemberImagePreview('')
    }

    const handleMemberSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', memberFormData.name)
            formData.append('position', memberFormData.position)
            formData.append('description', memberFormData.description)
            if (memberFormData.image) {
                formData.append('memberImage', memberFormData.image)
            }

            const url = editingMember
                ? `${API_URL}/team/member/${editingMember._id}`
                : `${API_URL}/team/member`
            const method = editingMember ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

            const result = await res.json()
            if (result.success) {
                setMessage({
                    type: 'success',
                    text: editingMember ? 'Member updated successfully!' : 'Member added successfully!'
                })
                setTeamMembers(result.data.members)
                closeMemberModal()
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to save member' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Connection error' })
        } finally {
            setLoading(false)
        }
    }

    const deleteMember = async (id) => {
        if (!window.confirm('Are you sure you want to delete this member?')) return
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/team/member/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const result = await res.json()
            if (result.success) {
                setMessage({ type: 'success', text: 'Member deleted successfully' })
                setTeamMembers(result.data.members)
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to delete member' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Connection error' })
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355]"></div>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto space-y-12 py-8 px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">The Team Management</h1>
                        <p className="text-gray-500 italic mt-1 font-serif">Manage hero image and team members grid</p>
                    </div>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                        <div className="flex items-center gap-3">
                            <span className="text-xl">{message.type === 'success' ? '✓' : '⚠'}</span>
                            <p className="font-medium">{message.text}</p>
                        </div>
                        <button onClick={() => setMessage({ type: '', text: '' })} className="text-current opacity-50 hover:opacity-100">×</button>
                    </div>
                )}

                {/* Section: Hero Image */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="bg-[#8B7355] text-white p-1.5 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </span>
                        Hero Image (Horizontal)
                    </h2>

                    <div className="relative w-full h-[300px] rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group">
                        {heroPreview ? (
                            <img src={heroPreview} alt="Hero" className="w-full h-full object-cover" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-300 italic">No image uploaded</div>
                        )}
                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Change Hero Image
                            <input type="file" className="hidden" onChange={handleHeroImageChange} accept="image/*" />
                        </label>
                    </div>

                    {heroImage && (
                        <div className="flex justify-end">
                            <button
                                onClick={saveHeroImage}
                                disabled={loading}
                                className="bg-[#8B7355] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#6B5A42] transition-colors shadow-lg"
                            >
                                {loading ? 'Uploading...' : 'Save Hero Image'}
                            </button>
                        </div>
                    )}
                </section>

                {/* Section: Team Members */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <span className="bg-[#8B7355] text-white p-1.5 rounded-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354l1.1 1.1a2 2 0 002.828 0l1.1-1.1m0 0a2 2 0 012.828 0l1.1 1.1a2 2 0 010 2.828l-1.1 1.1m0 0a2 2 0 01-2.828 0l-1.1-1.1a2 2 0 010-2.828l1.1-1.1z" /></svg>
                            </span>
                            Team Members Grid
                        </h2>
                        <button
                            onClick={() => openMemberModal()}
                            className="bg-[#8B7355] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#6B5A42] transition-colors shadow-md flex items-center gap-2"
                        >
                            <span>+</span> Add Member
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {teamMembers.map((member) => (
                            <div key={member._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="relative h-64 bg-gray-100">
                                    <img
                                        src={member.image?.url}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => openMemberModal(member)}
                                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                                            title="Edit"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                        </button>
                                        <button
                                            onClick={() => deleteMember(member._id)}
                                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                            title="Delete"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-800 uppercase truncate">{member.name}</h3>
                                    <p className="text-sm text-[#8B7355] font-medium uppercase truncate">{member.position}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Member Add/Edit Modal */}
            {isMemberModalOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMemberModal}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                            </h2>
                            <button onClick={closeMemberModal} className="text-gray-400 hover:text-gray-600 transition-colors text-3xl">&times;</button>
                        </div>

                        <form onSubmit={handleMemberSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Image Upload */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Member Photo</label>
                                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group">
                                        {memberImagePreview ? (
                                            <img src={memberImagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-sm italic p-4 text-center">
                                                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                                Click to upload photo
                                            </div>
                                        )}
                                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold text-sm">
                                            Change Photo
                                            <input type="file" className="hidden" onChange={handleMemberImageChange} accept="image/*" />
                                        </label>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={memberFormData.name}
                                            onChange={(e) => setMemberFormData({ ...memberFormData, name: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none"
                                            placeholder="e.g. John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Position</label>
                                        <input
                                            type="text"
                                            required
                                            value={memberFormData.position}
                                            onChange={(e) => setMemberFormData({ ...memberFormData, position: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none"
                                            placeholder="e.g. Chief Executive Officer"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Bio/Description</label>
                                        <textarea
                                            required
                                            rows="8"
                                            value={memberFormData.description}
                                            onChange={(e) => setMemberFormData({ ...memberFormData, description: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none resize-none"
                                            placeholder="Enter member description..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-6 border-t font-bold">
                                <button
                                    type="button"
                                    onClick={closeMemberModal}
                                    className="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6B5A42] transition-colors shadow-lg disabled:bg-gray-400"
                                >
                                    {loading ? 'Saving...' : 'Save Member'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}

export default TheTeamManagementPage
