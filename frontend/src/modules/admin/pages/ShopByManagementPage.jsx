import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { Plus, Trash2, Edit2, Upload, X, Save } from 'lucide-react'

const ShopByManagementPage = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    // Main Section: 'rooms' or 'occasions'
    const [activeSection, setActiveSection] = useState('rooms')
    // Specific Category slug (e.g., 'pooja-room')
    const [activeCategory, setActiveCategory] = useState('')

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
        specifications: { material: '', size: '', origin: '' },
        images: [],
        newImages: []
    })

    const categories = {
        rooms: [
            { name: 'Pooja Room', slug: 'pooja-room' },
            { name: 'Living Room', slug: 'living-room' },
            { name: 'Dinning Room', slug: 'dinning-room' },
            { name: 'Powder Room', slug: 'powder-room' },
            { name: 'Foyer', slug: 'foyer' }
        ],
        occasions: [
            { name: 'Housewarming', slug: 'housewarming' },
            { name: 'Festivals', slug: 'festivals' },
            { name: 'Wedding', slug: 'wedding' },
            { name: 'Religious Ceremonies', slug: 'religious-ceremonies' },
            { name: 'Memorials', slug: 'memorials' }
        ]
    }

    const adminToken = localStorage.getItem('adminToken')
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const fileInputRef = useRef(null)

    // Set default category when section changes
    useEffect(() => {
        if (categories[activeSection] && categories[activeSection].length > 0) {
            setActiveCategory(categories[activeSection][0].slug)
        }
    }, [activeSection])

    useEffect(() => {
        if (activeSection && activeCategory) {
            fetchProducts()
        }
    }, [activeSection, activeCategory])

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/shop-by-products/${activeSection}/${activeCategory}`)
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
                price: product.price || '',
                description: product.description || '',
                displayOrder: product.displayOrder || 0,
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

    const removeExistingImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formPayload = new FormData()
        formPayload.append('section', activeSection)
        formPayload.append('categorySlug', activeCategory)
        formPayload.append('name', formData.name)
        formPayload.append('price', formData.price)
        formPayload.append('description', formData.description)
        formPayload.append('displayOrder', formData.displayOrder)
        formPayload.append('specifications', JSON.stringify(formData.specifications || {}))
        formPayload.append('images', JSON.stringify(formData.images))
        formData.newImages.forEach(file => {
            formPayload.append('images', file)
        })

        if (editingProduct) {
            formPayload.append('id', editingProduct._id)
        }

        try {
            const res = await fetch(`${API_URL}/shop-by-products`, {
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
            const res = await fetch(`${API_URL}/shop-by-products/${id}`, {
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
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Shop By Collections</h1>
                    <p className="text-gray-600">Manage Rooms and Occasions products</p>
                </div>

                {/* Section Tabs */}
                <div className="flex gap-2 bg-white p-1 rounded-lg border shadow-sm w-fit">
                    <button
                        onClick={() => setActiveSection('rooms')}
                        className={`px-4 py-2 rounded-md transition-colors ${activeSection === 'rooms'
                            ? 'bg-[#8B7355] text-white font-medium shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        Rooms
                    </button>
                    <button
                        onClick={() => setActiveSection('occasions')}
                        className={`px-4 py-2 rounded-md transition-colors ${activeSection === 'occasions'
                            ? 'bg-[#8B7355] text-white font-medium shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        Occasions
                    </button>
                </div>

                {/* Categories Sub-nav */}
                <div className="flex flex-wrap gap-2">
                    {categories[activeSection]?.map(cat => (
                        <button
                            key={cat.slug}
                            onClick={() => setActiveCategory(cat.slug)}
                            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${activeCategory === cat.slug
                                    ? 'bg-[#8B7355]/10 border-[#8B7355] text-[#8B7355] font-medium'
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800 capitalize">
                        {categories[activeSection]?.find(c => c.slug === activeCategory)?.name || activeCategory} Products
                    </h2>
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
                        <div className="p-8 text-center text-gray-500">No products found. Add one to get started.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold text-gray-600">Image</th>
                                        <th className="px-6 py-3 font-semibold text-gray-600">Name</th>
                                        <th className="px-6 py-3 font-semibold text-gray-600">Price</th>
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
                                            <td className="px-6 py-4 text-gray-600">{product.price}</td>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                        <input
                                            type="text"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
                                            placeholder="e.g. Price on Request"
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
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700">Images</label>
                                    <div className="flex flex-wrap gap-4">
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

export default ShopByManagementPage
