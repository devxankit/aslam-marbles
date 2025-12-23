import { useState, useEffect, useRef } from 'react'
import AdminLayout from '../components/AdminLayout'

const MurtiManagementPage = () => {
    const [hierarchy, setHierarchy] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [uploadingHero, setUploadingHero] = useState(false)
    const [pageData, setPageData] = useState(null)

    // Modals
    const [showAddProductModal, setShowAddProductModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)

    const heroInputRef = useRef(null)
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const token = localStorage.getItem('adminToken')

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (selectedCategory) {
            fetchProducts(selectedCategory.id)
        }
    }, [selectedCategory])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [pageRes, hierarchyRes] = await Promise.all([
                fetch(`${API_URL}/murtis/page`),
                fetch(`${API_URL}/murtis/hierarchy`)
            ])
            const pageData = await pageRes.json()
            const hierarchyData = await hierarchyRes.json()

            if (pageData.success) setPageData(pageData.data)
            if (hierarchyData.success) {
                setHierarchy(hierarchyData.data)
                // Select first category by default if none selected
                if (!selectedCategory && hierarchyData.data.length > 0 && hierarchyData.data[0].categories.length > 0) {
                    setSelectedCategory(hierarchyData.data[0].categories[0])
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchProducts = async (categoryId) => {
        setLoadingProducts(true)
        try {
            const res = await fetch(`${API_URL}/murtis/products/${categoryId}`)
            const result = await res.json()
            if (result.success) setProducts(result.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoadingProducts(false)
        }
    }

    const handleUploadHero = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = async () => {
            const base64 = reader.result
            setUploadingHero(true)
            try {
                const updatedCategory = {
                    ...selectedCategory,
                    heroSection: {
                        ...selectedCategory.heroSection,
                        image: { url: base64, alt: selectedCategory.name }
                    }
                }
                const res = await fetch(`${API_URL}/murtis/categories`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(updatedCategory)
                })
                const result = await res.json()
                if (result.success) {
                    setSelectedCategory(result.data)
                    // Refresh hierarchy to update sync
                    fetchData()
                }
            } catch (error) {
                alert('Upload failed')
            } finally {
                setUploadingHero(false)
            }
        }
        reader.readAsDataURL(file)
    }

    const handleUpsertProduct = async (productData) => {
        try {
            setLoadingProducts(true)
            const res = await fetch(`${API_URL}/murtis/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ ...productData, categoryId: selectedCategory.id })
            })
            const result = await res.json()
            if (result.success) {
                fetchProducts(selectedCategory.id)
                setShowAddProductModal(false)
                setEditingProduct(null)
            }
        } catch (error) {
            alert('Operation failed')
        } finally {
            setLoadingProducts(false)
        }
    }

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Delete this product?')) return
        try {
            const res = await fetch(`${API_URL}/murtis/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const result = await res.json()
            if (result.success) fetchProducts(selectedCategory.id)
        } catch (error) {
            alert('Delete failed')
        }
    }

    return (
        <AdminLayout>
            <div className="p-4 md:p-8 space-y-8 min-h-screen">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Murti Management</h1>
                        <p className="text-gray-500">Manage categories, products and deity hierarchy.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#8B7355]"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar: Hierarchy */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 flex justify-between items-center">
                                    <span>Categories</span>
                                    {/* Add Category Button could go here */}
                                </div>
                                <div className="p-2 space-y-4 max-h-[70vh] overflow-y-auto">
                                    {hierarchy.map((group) => (
                                        <div key={group._id} className="space-y-1">
                                            <h3 className="px-3 py-1 text-xs font-black text-[#8B7355] uppercase tracking-widest">{group.name}</h3>
                                            {group.categories.map((cat) => (
                                                <button
                                                    key={cat._id}
                                                    onClick={() => setSelectedCategory(cat)}
                                                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${selectedCategory?.id === cat.id ? 'bg-[#8B7355] text-white font-bold shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                                                >
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Section */}
                        <div className="lg:col-span-3 space-y-8">
                            {selectedCategory && (
                                <div className="space-y-6 animate-fadeIn">
                                    {/* Hero Banner Manager */}
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                        <div className="relative h-48 md:h-64 group bg-gray-100">
                                            <img
                                                src={selectedCategory.heroSection?.image?.url || 'https://via.placeholder.com/1200x400'}
                                                alt="Category Hero"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => heroInputRef.current.click()}
                                                    className="bg-white text-gray-900 px-6 py-2.5 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
                                                >
                                                    {uploadingHero ? 'Uploading...' : 'Change Category Header'}
                                                </button>
                                            </div>
                                            <input type="file" ref={heroInputRef} className="hidden" accept="image/*" onChange={handleUploadHero} />
                                        </div>
                                        <div className="p-6">
                                            <h2 className="text-2xl font-bold text-gray-800">{selectedCategory.name}</h2>
                                            <p className="text-gray-500 text-sm mt-1">{selectedCategory.heroSection?.subtitle || 'No subtitle set'}</p>
                                        </div>
                                    </div>

                                    {/* Product List */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xl font-bold text-gray-800">Statues in {selectedCategory.name} ({products.length})</h3>
                                            <button
                                                onClick={() => setShowAddProductModal(true)}
                                                className="bg-[#8B7355] text-white px-5 py-2 rounded-full font-bold hover:bg-[#725e45] shadow-lg transition-all flex items-center gap-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                                Add New Statue
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {products.map((product) => (
                                                <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                                                    <div className="relative aspect-square bg-gray-50">
                                                        <img
                                                            src={product.images?.[0]?.url || 'https://via.placeholder.com/300'}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => setEditingProduct(product)}
                                                                className="p-2 bg-blue-500 text-white rounded-full hover:scale-110 transition-transform"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteProduct(product._id)}
                                                                className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="p-3">
                                                        <p className="font-bold text-gray-800 text-sm truncate">{product.name}</p>
                                                        <p className="text-[#8B7355] text-xs font-bold">₹{product.price?.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Product Modal */}
            {(showAddProductModal || editingProduct) && (
                <ProductDialog
                    product={editingProduct}
                    onClose={() => { setShowAddProductModal(false); setEditingProduct(null); }}
                    onSave={handleUpsertProduct}
                    loading={loadingProducts}
                />
            )}
        </AdminLayout>
    )
}

const ProductDialog = ({ product, onClose, onSave, loading }) => {
    const [formData, setFormData] = useState(product || {
        name: '', sku: '', price: '', material: '', size: '', description: '', images: []
    })
    const [preview, setPreview] = useState(product?.images?.[0]?.url || null)

    const handleFile = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
                setFormData({ ...formData, images: [reader.result] })
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold">{product ? 'Edit Statue' : 'Add New Statue'}</h3>
                    <button onClick={onClose}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden border relative group">
                                <img src={preview || 'https://via.placeholder.com/400'} className="w-full h-full object-cover" />
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFile} />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                                    <span className="text-white text-sm font-bold bg-black/40 px-3 py-1 rounded-full">Change Image</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-black uppercase text-gray-400">Name</label>
                                <input className="w-full p-2 border rounded-lg focus:ring-2 ring-[#8B7355]/20 outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-black uppercase text-gray-400">SKU</label>
                                    <input className="w-full p-2 border rounded-lg outline-none" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-black uppercase text-gray-400">Price (₹)</label>
                                    <input type="number" className="w-full p-2 border rounded-lg outline-none" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-black uppercase text-gray-400">Material</label>
                                <input className="w-full p-2 border rounded-lg outline-none" value={formData.material} onChange={e => setFormData({ ...formData, material: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-xs font-black uppercase text-gray-400">Size</label>
                                <input className="w-full p-2 border rounded-lg outline-none" value={formData.size} onChange={e => setFormData({ ...formData, size: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-black uppercase text-gray-400">Description</label>
                        <textarea rows="4" className="w-full p-3 border rounded-lg outline-none" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                    </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2 border rounded-lg font-bold hover:bg-white">Cancel</button>
                    <button onClick={() => onSave(formData)} disabled={loading} className="px-8 py-2 bg-[#8B7355] text-white rounded-lg font-bold hover:bg-[#725e45] shadow-lg disabled:opacity-50">
                        {loading ? 'Saving...' : 'Save Statue'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MurtiManagementPage
