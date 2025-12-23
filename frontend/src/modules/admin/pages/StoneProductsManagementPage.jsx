import { useState, useEffect, useRef } from 'react'
import AdminLayout from '../components/AdminLayout'

const StoneProductsManagementPage = () => {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [uploadingHero, setUploadingHero] = useState(false)

    // Add Product Modal State
    const [showAddModal, setShowAddModal] = useState(false)
    const [newProductImage, setNewProductImage] = useState(null)
    const [newProductPreview, setNewProductPreview] = useState(null)
    const [newProductName, setNewProductName] = useState('')
    const [addingProduct, setAddingProduct] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)

    const heroInputRef = useRef(null)

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'
    const token = localStorage.getItem('adminToken')

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (selectedCategory) {
            fetchProducts(selectedCategory.id)
        }
    }, [selectedCategory])

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/stone-products/categories`)
            const data = await response.json()
            setCategories(data)
            if (data.length > 0 && !selectedCategory) {
                setSelectedCategory(data[0])
            }
            setLoading(false)
        } catch (error) {
            console.error('Error fetching categories:', error)
            setLoading(false)
        }
    }

    const fetchProducts = async (categoryId) => {
        setLoadingProducts(true)
        try {
            const response = await fetch(`${API_URL}/stone-products/category/${categoryId}`)
            if (response.ok) {
                const data = await response.json()
                setProducts(data)
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoadingProducts(false)
        }
    }

    // --- Hero Image Upload ---
    const handleHeroImageClick = () => {
        heroInputRef.current.click()
    }

    const handleHeroFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            alert('File size too large. Please select an image under 5MB.')
            return
        }

        const reader = new FileReader()
        reader.onloadend = async () => {
            const base64String = reader.result
            setUploadingHero(true)

            // Create updated category object
            const updatedCategory = {
                ...selectedCategory,
                heroSection: {
                    ...selectedCategory.heroSection,
                    image: {
                        ...selectedCategory.heroSection.image,
                        url: base64String // Backend will upload this to Cloudinary
                    }
                }
            }

            try {
                const response = await fetch(`${API_URL}/stone-products/categories`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(updatedCategory)
                })

                if (!response.ok) throw new Error('Failed to update hero image')

                const data = await response.json()
                setSelectedCategory(data) // Update local state with new URL from backend
                setUploadingHero(false)
            } catch (error) {
                console.error('Error updating hero:', error)
                alert('Failed to update hero image')
                setUploadingHero(false)
            }
        }
        reader.readAsDataURL(file)
    }

    // --- Product Actions ---
    const handleAddProduct = async (e) => {
        e.preventDefault()
        if (!newProductImage || !newProductName) {
            alert('Please provide both an image and a name.')
            return
        }

        setAddingProduct(true)
        const reader = new FileReader()
        reader.onloadend = async () => {
            const base64String = reader.result

            const newProduct = {
                categoryId: selectedCategory.id,
                name: newProductName,
                image: {
                    url: base64String, // Backend handles upload
                    alt: newProductName
                },
                specifications: {
                    origin: selectedCategory.origin || 'India',
                    color: 'Standard'
                },
                displayOrder: products.length + 1
            }

            try {
                const response = await fetch(`${API_URL}/stone-products`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(newProduct)
                })

                if (!response.ok) throw new Error('Failed to create product')

                await fetchProducts(selectedCategory.id) // Refresh list
                setShowAddModal(false)
                setNewProductName('')
                setNewProductImage(null)
                setNewProductPreview(null)
            } catch (error) {
                console.error('Error creating product:', error)
                alert('Failed to add product')
            } finally {
                setAddingProduct(false)
            }
        }
        reader.readAsDataURL(newProductImage)
    }

    const handleUpdateProductDisplay = async () => {
        if (!editingProduct) return
        setLoadingProducts(true) // Reuse loading state or create new one

        const submitUpdate = async (productData) => {
            try {
                const response = await fetch(`${API_URL}/stone-products/${editingProduct._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(productData)
                })

                if (!response.ok) throw new Error('Failed to update product')

                await fetchProducts(selectedCategory.id)
                setEditingProduct(null)
            } catch (error) {
                console.error('Error updating product:', error)
                alert('Failed to update product')
            } finally {
                setLoadingProducts(false)
            }
        }

        if (editingProduct.newImageFile) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result
                const updatedData = {
                    ...editingProduct,
                    image: {
                        ...editingProduct.image,
                        url: base64String
                    }
                }
                // Remove temp fields
                delete updatedData.newImageFile
                delete updatedData.newImagePreview
                submitUpdate(updatedData)
            }
            reader.readAsDataURL(editingProduct.newImageFile)
        } else {
            submitUpdate(editingProduct)
        }
    }

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return

        try {
            const response = await fetch(`${API_URL}/stone-products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) throw new Error('Failed to delete product')

            setProducts(products.filter(p => p._id !== productId))
        } catch (error) {
            console.error('Error deleting product:', error)
            alert('Failed to delete product')
        }
    }

    return (
        <AdminLayout>
            <div className="space-y-8 min-h-screen pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">My Products Management</h1>
                    <p className="text-gray-600">Select a category below to manage its content.</p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355]"></div>
                    </div>
                ) : (
                    <>
                        {/* Top Navigation */}
                        <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide border-b border-gray-200">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition-all duration-200 shadow-sm ${selectedCategory?.id === category.id
                                        ? 'bg-[#8B7355] text-white shadow-md transform scale-105'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        {/* Main Content */}
                        {selectedCategory && (
                            <div className="space-y-8 animate-fadeIn">

                                {/* Hero Image Section */}
                                <div className="space-y-3">
                                    <h2 className="text-xl font-bold text-gray-800 border-l-4 border-[#8B7355] pl-3">
                                        Horizontal (Hero) Image
                                    </h2>

                                    <div className="relative w-full h-64 md:h-80 bg-gray-200 rounded-xl overflow-hidden shadow-lg border border-gray-200 group">
                                        <img
                                            src={selectedCategory.heroSection?.image?.url || 'https://via.placeholder.com/1200x400?text=No+Hero+Image'}
                                            alt={`${selectedCategory.name} Hero`}
                                            className={`w-full h-full object-cover transition-opacity ${uploadingHero ? 'opacity-50' : 'opacity-100'}`}
                                        />

                                        {/* Overlay for Edit */}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={handleHeroImageClick}
                                                disabled={uploadingHero}
                                                className="bg-white text-gray-900 px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all flex items-center gap-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                                {uploadingHero ? 'Uploading...' : 'Change Hero Image'}
                                            </button>
                                        </div>

                                        <input
                                            type="file"
                                            ref={heroInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleHeroFileChange}
                                        />
                                    </div>
                                </div>

                                {/* Product Gallery */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-l-4 border-[#8B7355] pl-3">
                                        <h2 className="text-xl font-bold text-gray-800">
                                            Product Gallery ({products.length})
                                        </h2>
                                        <button
                                            onClick={() => setShowAddModal(true)}
                                            className="bg-[#8B7355] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#725E45] transition-colors shadow-sm flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                            Add Product
                                        </button>
                                    </div>

                                    {loadingProducts ? (
                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse"></div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                            {/* Add New Tile (Visual Cue) */}
                                            <div
                                                onClick={() => setShowAddModal(true)}
                                                className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-[#8B7355] hover:text-[#8B7355] hover:bg-[#8B7355]/5 transition-all cursor-pointer group"
                                            >
                                                <svg className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                                <span className="font-semibold">Add New</span>
                                            </div>

                                            {products.map((product) => (
                                                <div key={product._id} className="group relative bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                                                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 mb-3 relative">
                                                        <img
                                                            src={product.image?.url || product.image}
                                                            alt={product.name}
                                                            loading="lazy"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        {/* Action Overlay */}
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    setEditingProduct(product)
                                                                }}
                                                                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transform hover:scale-110 transition-all shadow-lg"
                                                                title="Edit Details"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    handleDeleteProduct(product._id)
                                                                }}
                                                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transform hover:scale-110 transition-all shadow-lg"
                                                                title="Delete Image"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="font-semibold text-gray-800 text-sm truncate">{product.name}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Add Product Modal */}
                        {showAddModal && (
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
                                    <div className="p-6 border-b border-gray-100">
                                        <h3 className="text-xl font-bold text-gray-800">Add New Image</h3>
                                    </div>

                                    <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                                            <div className="relative h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-[#8B7355] transition-colors group">
                                                {newProductPreview ? (
                                                    <img src={newProductPreview} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="text-center text-gray-400">
                                                        <svg className="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                        <span className="text-sm">Click to Upload</span>
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0]
                                                        if (file) {
                                                            setNewProductImage(file)
                                                            setNewProductPreview(URL.createObjectURL(file))
                                                        }
                                                    }}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    required={!newProductPreview}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Name/Title</label>
                                            <input
                                                type="text"
                                                value={newProductName}
                                                onChange={(e) => setNewProductName(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                                                placeholder="e.g. Red Stone"
                                                required
                                            />
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <button
                                                type="submit"
                                                disabled={addingProduct}
                                                className="flex-1 bg-[#8B7355] text-white py-2 rounded-lg font-bold hover:bg-[#725E45] transition-colors disabled:opacity-70"
                                            >
                                                {addingProduct ? 'Adding...' : 'Add Product'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowAddModal(false)
                                                    setNewProductImage(null)
                                                    setNewProductPreview(null)
                                                }}
                                                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Edit Product Modal */}
                        {editingProduct && (
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                                <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col">
                                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                        <h3 className="text-xl font-bold text-gray-800">Edit Product Details</h3>
                                        <button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-gray-600">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>

                                    <div className="p-6 overflow-y-auto custom-scrollbar">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {/* Image Section */}
                                            <div className="md:col-span-1 space-y-4">
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-semibold text-gray-700">Product Image</label>
                                                    <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
                                                        <img
                                                            src={editingProduct.newImagePreview || editingProduct.image?.url}
                                                            alt={editingProduct.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <div className="text-white text-center">
                                                                <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                                <span className="text-xs font-medium">Change Image</span>
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                if (file) {
                                                                    setEditingProduct({
                                                                        ...editingProduct,
                                                                        newImageFile: file,
                                                                        newImagePreview: URL.createObjectURL(file)
                                                                    });
                                                                }
                                                            }}
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Details Section */}
                                            <div className="md:col-span-2 space-y-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Name / Title</label>
                                                    <input
                                                        type="text"
                                                        value={editingProduct.name}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                                    <textarea
                                                        value={editingProduct.description || ''}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                                        rows="3"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] text-sm resize-none"
                                                        placeholder="Product description... (e.g. This premium natural stone is sourced directy...)"
                                                    />
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                    <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Technical Specifications</h4>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 mb-1">Origin</label>
                                                            <input
                                                                type="text"
                                                                value={editingProduct.specifications?.origin || ''}
                                                                onChange={(e) => setEditingProduct({
                                                                    ...editingProduct,
                                                                    specifications: { ...editingProduct.specifications, origin: e.target.value }
                                                                })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B7355] text-sm"
                                                                placeholder="e.g. International"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 mb-1">Color</label>
                                                            <input
                                                                type="text"
                                                                value={editingProduct.specifications?.color || ''}
                                                                onChange={(e) => setEditingProduct({
                                                                    ...editingProduct,
                                                                    specifications: { ...editingProduct.specifications, color: e.target.value }
                                                                })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B7355] text-sm"
                                                                placeholder="e.g. Various"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 mb-1">Finish</label>
                                                            <input
                                                                type="text"
                                                                value={editingProduct.specifications?.finish || ''}
                                                                onChange={(e) => setEditingProduct({
                                                                    ...editingProduct,
                                                                    specifications: { ...editingProduct.specifications, finish: e.target.value }
                                                                })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B7355] text-sm"
                                                                placeholder="e.g. Honed, Brushed"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 mb-1">Offered In</label>
                                                            <input
                                                                type="text"
                                                                value={editingProduct.specifications?.offeredIn || ''}
                                                                onChange={(e) => setEditingProduct({
                                                                    ...editingProduct,
                                                                    specifications: { ...editingProduct.specifications, offeredIn: e.target.value }
                                                                })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B7355] text-sm"
                                                                placeholder="e.g. Tiles, Pavers"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 mb-1">Tiles Size (Dimensions)</label>
                                                            <input
                                                                type="text"
                                                                value={editingProduct.specifications?.dimensions || ''}
                                                                onChange={(e) => setEditingProduct({
                                                                    ...editingProduct,
                                                                    specifications: { ...editingProduct.specifications, dimensions: e.target.value }
                                                                })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B7355] text-sm"
                                                                placeholder="e.g. 30 x 30 cm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 mb-1">Price</label>
                                                            <input
                                                                type="text"
                                                                value={editingProduct.specifications?.price || ''}
                                                                onChange={(e) => setEditingProduct({
                                                                    ...editingProduct,
                                                                    specifications: { ...editingProduct.specifications, price: e.target.value }
                                                                })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B7355] text-sm"
                                                                placeholder="e.g. ₹45 - ₹65 per sq.ft"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3 justify-end">
                                        <button
                                            onClick={() => setEditingProduct(null)}
                                            className="px-6 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-white transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleUpdateProductDisplay}
                                            disabled={loadingProducts}
                                            className="px-6 py-2 bg-[#8B7355] text-white rounded-lg font-bold hover:bg-[#725E45] transition-colors shadow-sm disabled:opacity-70"
                                        >
                                            {loadingProducts ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </AdminLayout>
    )
}

export default StoneProductsManagementPage
