import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const LiveInventoryManagementPage = () => {
    const [activeTab, setActiveTab] = useState('inventory') // 'inventory' or 'settings'
    const [inventory, setInventory] = useState([])
    const [pageSettings, setPageSettings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingOperation, setLoadingOperation] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const [settingsForm, setSettingsForm] = useState({
        headSection: {
            title: '', subtitle: '', description: '', heroImage: { url: '' }
        },
        horizontalSection: {
            image: { url: '' }
        }
    })

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const token = localStorage.getItem('adminToken')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [inventoryRes, settingsRes] = await Promise.all([
                fetch(`${API_URL}/live-inventory?public=false`),
                fetch(`${API_URL}/live-inventory/settings`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ])

            if (inventoryRes.ok) {
                const data = await inventoryRes.json()
                setInventory(data)
            }
            if (settingsRes.ok) {
                const settings = await settingsRes.json()
                setPageSettings(settings)
                setSettingsForm(settings)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleInventoryDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return

        try {
            const res = await fetch(`${API_URL}/live-inventory/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.ok) {
                fetchData()
            } else {
                alert('Failed to delete item')
            }
        } catch (error) {
            console.error('Error deleting:', error)
        }
    }

    const handleInventorySave = async (data) => {
        try {
            setLoadingOperation(true)
            const url = editingItem
                ? `${API_URL}/live-inventory/${editingItem._id}`
                : `${API_URL}/live-inventory`

            const method = editingItem ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })

            const result = await res.json()
            if (res.ok) {
                fetchData()
                setShowModal(false)
                setEditingItem(null)
            } else {
                alert(result.message || 'Operation failed')
            }
        } catch (error) {
            console.error('Error saving:', error)
            alert('Something went wrong')
        } finally {
            setLoadingOperation(false)
        }
    }

    const handleSettingsSave = async () => {
        try {
            setLoadingOperation(true)
            console.log("Saving settings payload:", settingsForm);
            const res = await fetch(`${API_URL}/live-inventory/settings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(settingsForm)
            })

            if (res.ok) {
                alert('Page settings updated successfully!')
                fetchData()
            } else {
                const err = await res.json();
                console.error("Settings save error:", err);
                alert('Failed to update settings')
            }
        } catch (error) {
            console.error('Error saving settings:', error)
        } finally {
            setLoadingOperation(false)
        }
    }

    const handleSettingsImageChange = (section, file) => {
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (section === 'hero') {
                    setSettingsForm(prev => ({
                        ...prev,
                        headSection: {
                            ...prev.headSection,
                            heroImage: { ...prev.headSection.heroImage, url: reader.result }
                        }
                    }))
                } else if (section === 'horizontal') {
                    setSettingsForm(prev => ({
                        ...prev,
                        horizontalSection: {
                            ...prev.horizontalSection,
                            image: { ...prev.horizontalSection.image, url: reader.result }
                        }
                    }))
                }
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <AdminLayout>
            <div className="p-4 md:p-8 min-h-screen">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Live Inventory Management</h1>
                        <p className="text-gray-500">Manage your stock and page appearance.</p>
                    </div>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('inventory')}
                            className={`px-4 py-2 rounded-md font-medium transition-all ${activeTab === 'inventory' ? 'bg-white shadow-sm text-[#8B7355]' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Inventory Items
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`px-4 py-2 rounded-md font-medium transition-all ${activeTab === 'settings' ? 'bg-white shadow-sm text-[#8B7355]' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Page Settings
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#8B7355]"></div>
                    </div>
                ) : (
                    <>
                        {activeTab === 'inventory' ? (
                            <>
                                <div className="flex justify-end mb-6">
                                    <button
                                        onClick={() => { setEditingItem(null); setShowModal(true); }}
                                        className="bg-[#8B7355] text-white px-6 py-2 rounded-full font-bold hover:bg-[#725e45] shadow-lg transition-all flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                        Add New Item
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {inventory.map((item) => (
                                        <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                                            <div className="relative aspect-[4/3] bg-gray-50">
                                                <img
                                                    src={item.image?.url || 'https://via.placeholder.com/400'}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-2 right-2 flex gap-1">
                                                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded text-white ${item.status === 'Available' ? 'bg-green-500' : 'bg-center-500'}`}>
                                                        {item.status}
                                                    </span>
                                                </div>

                                                {/* Actions Overlay */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                    <button
                                                        onClick={() => { setEditingItem(item); setShowModal(true); }}
                                                        className="p-2 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleInventoryDelete(item._id)}
                                                        className="p-2 bg-red-600 text-white rounded-full hover:scale-110 transition-transform"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-gray-800 line-clamp-1">{item.name}</h3>

                                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                                    <div><span className="font-semibold">Size:</span> {item.specifications?.dimensions || '-'}</div>
                                                    <div><span className="font-semibold">Qty:</span> {item.specifications?.quantity || '-'}</div>
                                                </div>
                                                <div className="mt-2 text-sm font-bold text-[#8B7355]">
                                                    ₹{item.price?.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-6 md:p-8 space-y-8">
                                {/* Head Section Settings */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold border-b pb-2 text-gray-800">Hero Section Settings</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Page Title</label>
                                                <input
                                                    value={settingsForm.headSection?.title}
                                                    onChange={e => setSettingsForm({ ...settingsForm, headSection: { ...settingsForm.headSection, title: e.target.value } })}
                                                    className="w-full p-2 border rounded-lg focus:ring-2 ring-[#8B7355]/20 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Subtitle</label>
                                                <input
                                                    value={settingsForm.headSection?.subtitle}
                                                    onChange={e => setSettingsForm({ ...settingsForm, headSection: { ...settingsForm.headSection, subtitle: e.target.value } })}
                                                    className="w-full p-2 border rounded-lg focus:ring-2 ring-[#8B7355]/20 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                                <textarea
                                                    value={settingsForm.headSection?.description}
                                                    onChange={e => setSettingsForm({ ...settingsForm, headSection: { ...settingsForm.headSection, description: e.target.value } })}
                                                    className="w-full p-2 border rounded-lg focus:ring-2 ring-[#8B7355]/20 outline-none h-32 resize-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Hero Background Image</label>
                                            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden border relative group cursor-pointer">
                                                <img
                                                    src={settingsForm.headSection?.heroImage?.url || 'https://via.placeholder.com/800x400?text=Hero+Image'}
                                                    className="w-full h-full object-cover"
                                                />
                                                <input
                                                    type="file"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={(e) => handleSettingsImageChange('hero', e.target.files[0])}
                                                    accept="image/*"
                                                />
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-sm font-bold bg-black/40 px-3 py-1 rounded-full">Change Image</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500">Recommended size: 1920x1080px</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Horizontal Section Settings */}
                                <div className="space-y-6 pt-6 border-t">
                                    <h3 className="text-xl font-bold border-b pb-2 text-gray-800">Bottom Banner Settings</h3>

                                    <div className="space-y-4">
                                        <label className="block text-sm font-semibold text-gray-700">Horizontal Banner Image</label>
                                        <div className="aspect-[21/9] bg-gray-100 rounded-xl overflow-hidden border relative group cursor-pointer w-full">
                                            <img
                                                src={settingsForm.horizontalSection?.image?.url || 'https://via.placeholder.com/800x400?text=Banner+Image'}
                                                className="w-full h-full object-cover"
                                            />
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={(e) => handleSettingsImageChange('horizontal', e.target.files[0])}
                                                accept="image/*"
                                            />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white text-sm font-bold bg-black/40 px-3 py-1 rounded-full">Change Image</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500">Recommended: High resolution landscape image</p>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6 border-t">
                                    <button
                                        onClick={handleSettingsSave}
                                        disabled={loadingOperation}
                                        className="bg-[#8B7355] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#725e45] shadow-lg disabled:opacity-50 transition-all"
                                    >
                                        {loadingOperation ? 'Saving...' : 'Save Settings'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Inventory Modal */}
            {showModal && (
                <InventoryModal
                    item={editingItem}
                    onClose={() => { setShowModal(false); setEditingItem(null); }}
                    onSave={handleInventorySave}
                    loading={loadingOperation}
                />
            )}
        </AdminLayout>
    )
}

const InventoryModal = ({ item, onClose, onSave, loading }) => {
    const [formData, setFormData] = useState(item || {
        name: '',
        category: '',
        image: { url: '' },
        specifications: { dimensions: '', quantity: '', origin: '', finish: '' },
        status: 'Available',
        displayOrder: 0,
        price: '',
        isPublic: true
    })
    const [preview, setPreview] = useState(item?.image?.url || null)

    const handleFile = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
                setFormData({ ...formData, image: { ...formData.image, url: reader.result } })
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold">{item ? 'Edit Item' : 'Add New Inventory Item'}</h3>
                    <button onClick={onClose}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Image Uploader */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400">Item Image</label>
                            <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border relative group cursor-pointer">
                                <img src={preview || 'https://via.placeholder.com/400?text=Upload+Image'} className="w-full h-full object-cover" />
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFile} accept="image/*" />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-sm font-bold bg-black/40 px-3 py-1 rounded-full">Change Image</span>
                                </div>
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black uppercase text-gray-400">Name</label>
                                <input
                                    className="w-full p-2 border rounded-lg focus:ring-2 ring-[#8B7355]/20 outline-none"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Statuario Marble Block A"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-black uppercase text-gray-400">Status</label>
                                    <select
                                        className="w-full p-2 border rounded-lg outline-none"
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Reserved">Reserved</option>
                                        <option value="Sold">Sold</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-black uppercase text-gray-400">Publicly Visible</label>
                                    <select
                                        className="w-full p-2 border rounded-lg outline-none"
                                        value={formData.isPublic}
                                        onChange={e => setFormData({ ...formData, isPublic: e.target.value === 'true' })}
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-black uppercase text-gray-400">Price (₹)</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-lg focus:ring-2 ring-[#8B7355]/20 outline-none"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="Enter price"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-gray-400 border-b block pb-1">Specifications</label>
                        <div className="grid grid-cols-2 component gap-4">
                            <div>
                                <label className="text-xs text-gray-500">Dimensions</label>
                                <input
                                    className="w-full p-2 border rounded-lg outline-none"
                                    value={formData.specifications?.dimensions || ''}
                                    onChange={e => setFormData({ ...formData, specifications: { ...formData.specifications, dimensions: e.target.value } })}
                                    placeholder="e.g. 10ft x 6ft"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Quantity</label>
                                <input
                                    className="w-full p-2 border rounded-lg outline-none"
                                    value={formData.specifications?.quantity || ''}
                                    onChange={e => setFormData({ ...formData, specifications: { ...formData.specifications, quantity: e.target.value } })}
                                    placeholder="e.g. 50 Slabs"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Origin</label>
                                <input
                                    className="w-full p-2 border rounded-lg outline-none"
                                    value={formData.specifications?.origin || ''}
                                    onChange={e => setFormData({ ...formData, specifications: { ...formData.specifications, origin: e.target.value } })}
                                    placeholder="e.g. Italy"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Finish</label>
                                <input
                                    className="w-full p-2 border rounded-lg outline-none"
                                    value={formData.specifications?.finish || ''}
                                    onChange={e => setFormData({ ...formData, specifications: { ...formData.specifications, finish: e.target.value } })}
                                    placeholder="e.g. Polished"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2 border rounded-lg font-bold hover:bg-white text-gray-600">Cancel</button>
                    <button
                        onClick={() => onSave(formData)}
                        disabled={loading}
                        className="px-8 py-2 bg-[#8B7355] text-white rounded-lg font-bold hover:bg-[#725e45] shadow-lg disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Item'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LiveInventoryManagementPage
