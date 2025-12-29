import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { Plus, Trash2, Edit2, Upload, X, Save } from 'lucide-react'

const SpecialCollectionManagementPage = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const tabParam = searchParams.get('tab')

    const [activeTab, setActiveTab] = useState('on-sale') // 'on-sale' or 'limited-edition'
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        displayOrder: 0,
        sku: '',
        specifications: { material: '', size: '', origin: '' },
        images: [], // Existing images { url, publicId }
        newImages: [] // File objects
    })

    // Auth
    const adminToken = localStorage.getItem('adminToken')
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

    const fileInputRef = useRef(null)

    useEffect(() => {
        if (tabParam) {
            setActiveTab(tabParam === 'limited-edition' ? 'limited-edition' : 'on-sale')
        }
    }, [tabParam])

    useEffect(() => {
        fetchProducts()
    }, [activeTab])

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/special-products/${activeTab}`)
            const data = await res.json()
            if (data.success) {
                setProducts(data.data)
            }
        } catch (error) {
            console.error('Failed to fetch products', error)
        } finally {
            setLoading(false)
        }
    }

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product)
            setFormData({
                name: product.name,
                price: product.price,
                description: product.description || '',
                displayOrder: product.displayOrder || 0,
                sku: product.sku || '',
                specifications: product.specifications || { material: '', size: '', origin: '' },
                images: product.images || [],
                newImages: []
            })
        } else {
            setEditingProduct(null)
            setFormData({
                name: '',
                price: '',
                description: '',
                displayOrder: products.length + 1,
                sku: '',
                specifications: { material: '', size: '', origin: '' },
                images: [],
                newImages: []
            })
        }
        setIsModalOpen(true)
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData(prev => ({
                ...prev,
                newImages: [...prev.newImages, ...Array.from(e.target.files)]
            }))
        }
    }

    const removeNewImage = (index) => {
        setFormData(prev => ({
            ...prev,
            newImages: prev.newImages.filter((_, i) => i !== index)
        }))
    }

    // Note: Removing existing images logic is complex if not supported by backend explicitly 
    // without deleting from Cloudinary immediately or handling efficient diffs.
    // For now, let's allow removing from the list which will update the product's image list on save.
    const removeExistingImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formPayload = new FormData()
        formPayload.append('collectionType', activeTab)
        formPayload.append('categorySlug', activeTab === 'on-sale' ? 'exclusive-offers' : 'limited-series')
        formPayload.append('name', formData.name)
        formPayload.append('price', formData.price)
        formPayload.append('description', formData.description)
        formPayload.append('displayOrder', formData.displayOrder)
        formPayload.append('sku', formData.sku)

        // Specifications
        formPayload.append('specifications', JSON.stringify(formData.specifications || {}))

        // Existing images as JSON string
        formPayload.append('images', JSON.stringify(formData.images))

        // New images
        formData.newImages.forEach(file => {
            formPayload.append('images', file)
        })

        if (editingProduct) {
            formPayload.append('id', editingProduct._id)
        }

        try {
            const res = await fetch(`${API_URL}/special-products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                },
                body: formPayload
            })
            const result = await res.json()
            if (result.success) {
                setIsModalOpen(false)
                fetchProducts()
            } else {
                alert(result.message || 'Operation failed')
            }
        } catch (error) {
            console.error(error)
            alert('Error submitting form')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return

        try {
            const res = await fetch(`${API_URL}/special-products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            })
            const result = await res.json()
            if (result.success) {
                fetchProducts()
            } else {
                alert(result.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Special Collections</h1>
                        <p className="text-gray-600">Manage On Sale and Limited Edition products</p>
                    </div>

                    <div className="flex gap-2 bg-white p-1 rounded-lg border shadow-sm">
                        <button
                            onClick={() => setActiveTab('on-sale')}
                            className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'on-sale'
                                ? 'bg-[#8B7355] text-white font-medium shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            On Sale
                        </button>
                        <button
                            onClick={() => setActiveTab('limited-edition')}
                            className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'limited-edition'
                                ? 'bg-[#8B7355] text-white font-medium shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Limited Edition
                        </button>
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#725e45] transition-colors"
                    >
                        <Plus size={20} />
                        Add Product
                    </button>
                </div>

                {/* Product List */}
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading...</div>
                    ) : products.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No products found for {activeTab === 'on-sale' ? 'On Sale' : 'Limited Edition'}.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold text-gray-600">Image</th>
                                        <th className="px-6 py-3 font-semibold text-gray-600">Name</th>
                                        <th className="px-6 py-3 font-semibold text-gray-600">Price</th>
                                        <th className="px-6 py-3 font-semibold text-gray-600">SKU</th>
                                        <th className="px-6 py-3 font-semibold text-gray-600">Order</th>
                                        <th className="px-6 py-3 font-semibold text-gray-600 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {products.map(product => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden border bg-gray-100">
                                                    {product.images && product.images[0] ? (
                                                        <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                                            <td className="px-6 py-4 text-gray-600">₹{product.price.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">{product.sku}</td>
                                            <td className="px-6 py-4 text-gray-500">{product.displayOrder}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleOpenModal(product)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
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

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {editingProduct ? 'Edit Product' : 'Add Product'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                                        <input
                                            type="text"
                                            value={formData.sku}
                                            onChange={e => setFormData({ ...formData, sku: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                                        <input
                                            type="number"
                                            value={formData.displayOrder}
                                            onChange={e => setFormData({ ...formData, displayOrder: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none resize-none"
                                        />
                                    </div>

                                    {/* Specifications */}
                                    <div className="md:col-span-2 border-t pt-4 mt-2">
                                        <h3 className="text-sm font-semibold text-gray-800 mb-3">Specifications</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Material</label>
                                                <input
                                                    type="text"
                                                    value={formData.specifications?.material || ''}
                                                    onChange={e => setFormData({
                                                        ...formData,
                                                        specifications: { ...formData.specifications, material: e.target.value }
                                                    })}
                                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-[#8B7355] outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Size</label>
                                                <input
                                                    type="text"
                                                    value={formData.specifications?.size || ''}
                                                    onChange={e => setFormData({
                                                        ...formData,
                                                        specifications: { ...formData.specifications, size: e.target.value }
                                                    })}
                                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-[#8B7355] outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Origin</label>
                                                <input
                                                    type="text"
                                                    value={formData.specifications?.origin || ''}
                                                    onChange={e => setFormData({
                                                        ...formData,
                                                        specifications: { ...formData.specifications, origin: e.target.value }
                                                    })}
                                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-[#8B7355] outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700">Images</label>

                                    <div className="flex flex-wrap gap-4">
                                        {/* Existing Images */}
                                        {formData.images.map((img, idx) => (
                                            <div key={'existing-' + idx} className="relative w-24 h-24 rounded-lg overflow-hidden border group">
                                                <img src={img.url} alt="" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingImage(idx)}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}

                                        {/* New Images */}
                                        {formData.newImages.map((file, idx) => (
                                            <div key={'new-' + idx} className="relative w-24 h-24 rounded-lg overflow-hidden border bg-gray-50 group">
                                                <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover opacity-80" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewImage(idx)}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}

                                        {/* Upload Button */}
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:border-[#8B7355] hover:text-[#8B7355] transition-colors"
                                        >
                                            <Upload size={24} />
                                            <span className="text-xs mt-1">Upload</span>
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            multiple
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#725e45] font-medium transition-colors flex items-center gap-2"
                                    >
                                        <Save size={18} />
                                        Save Product
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

export default SpecialCollectionManagementPage
