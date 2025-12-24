import { useState, useEffect, useRef } from 'react'
import AdminLayout from '../components/AdminLayout'

const LiveInventoryManagementPage = () => {
    const [inventory, setInventory] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAddModal, setShowAddModal] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const [saving, setSaving] = useState(false)

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        status: 'Available',
        specifications: {
            dimensions: '',
            quantity: '',
            origin: '',
            finish: ''
        },
        displayOrder: 0,
        isPublic: true
    })
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const token = localStorage.getItem('adminToken')

    useEffect(() => {
        fetchInventory()
    }, [])

    const fetchInventory = async () => {
        try {
            const res = await fetch(`${API_URL}/live-inventory?public=false`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const data = await res.json()
            setInventory(data)
        } catch (error) {
            console.error('Error fetching inventory:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            let finalImage = formData.image || { url: '' }

            if (imageFile) {
                const reader = new FileReader()
                const base64 = await new Promise((resolve) => {
                    reader.onload = (e) => resolve(e.target.result)
                    reader.readAsDataURL(imageFile)
                })
                finalImage.url = base64
            }

            const payload = { ...formData, image: finalImage }
            const method = editingItem ? 'PUT' : 'POST'
            const url = editingItem ? `${API_URL}/live-inventory/${editingItem._id}` : `${API_URL}/live-inventory`

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                fetchInventory()
                closeModal()
            }
        } catch (error) {
            console.error('Error saving inventory:', error)
        } finally {
            setSaving(false)
        }
    }

    const handleEdit = (item) => {
        setEditingItem(item)
        setFormData(item)
        setImagePreview(item.image.url)
        setShowAddModal(true)
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return
        try {
            const res = await fetch(`${API_URL}/live-inventory/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) fetchInventory()
        } catch (error) {
            console.error('Error deleting item:', error)
        }
    }

    const closeModal = () => {
        setShowAddModal(false)
        setEditingItem(null)
        setFormData({
            name: '',
            category: '',
            status: 'Available',
            specifications: {
                dimensions: '',
                quantity: '',
                origin: '',
                finish: ''
            },
            displayOrder: 0,
            isPublic: true
        })
        setImageFile(null)
        setImagePreview(null)
    }

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Live Inventory Management</h1>
                        <p className="text-gray-600">Manage real-time available stock for customers.</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-[#8B7355] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg hover:bg-[#725E45] transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add New Item
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355]"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Image</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Name</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Category</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {inventory.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <img src={item.image.url} className="w-16 h-12 object-cover rounded-md shadow-sm" />
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{item.category}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${item.status === 'Available' ? 'bg-green-100 text-green-700' :
                                                    item.status === 'Reserved' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-3">
                                                <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                                                <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b px-8 py-6 flex justify-between items-center z-10">
                                <h2 className="text-xl font-bold text-gray-800">{editingItem ? 'Edit Item' : 'Add New Inventory'}</h2>
                                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">×</button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Image</label>
                                    <div
                                        onClick={() => document.getElementById('inv-image').click()}
                                        className="relative aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer group overflow-hidden"
                                    >
                                        {imagePreview ? (
                                            <img src={imagePreview} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center">
                                                <svg className="w-10 h-10 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                <p className="text-sm text-gray-400 mt-2">Click to upload image</p>
                                            </div>
                                        )}
                                        <input id="inv-image" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full mt-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#8B7355] transition-colors"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Category</label>
                                        <input
                                            type="text"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full mt-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#8B7355] transition-colors"
                                            placeholder="e.g. Marble"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Dimensions</label>
                                        <input
                                            type="text"
                                            value={formData.specifications.dimensions}
                                            onChange={(e) => setFormData({ ...formData, specifications: { ...formData.specifications, dimensions: e.target.value } })}
                                            className="w-full mt-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#8B7355] transition-colors"
                                            placeholder="e.g. 10 x 6 ft"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Quantity</label>
                                        <input
                                            type="text"
                                            value={formData.specifications.quantity}
                                            onChange={(e) => setFormData({ ...formData, specifications: { ...formData.specifications, quantity: e.target.value } })}
                                            className="w-full mt-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#8B7355] transition-colors"
                                            placeholder="e.g. 15 slabs"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full mt-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#8B7355] transition-colors"
                                        >
                                            <option value="Available">Available</option>
                                            <option value="Reserved">Reserved</option>
                                            <option value="Sold">Sold</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Public Visibility</label>
                                        <select
                                            value={formData.isPublic}
                                            onChange={(e) => setFormData({ ...formData, isPublic: e.target.value === 'true' })}
                                            className="w-full mt-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#8B7355] transition-colors"
                                        >
                                            <option value="true">Visible</option>
                                            <option value="false">Hidden</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 bg-[#8B7355] text-white py-3 rounded-xl font-bold shadow-lg hover:bg-[#725E45] transition-all disabled:opacity-50"
                                    >
                                        {saving ? 'Saving...' : (editingItem ? 'Update Item' : 'Add Item')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}

export default LiveInventoryManagementPage
