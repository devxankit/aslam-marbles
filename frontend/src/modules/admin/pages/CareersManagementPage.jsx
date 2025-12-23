import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const CareersManagementPage = () => {
    const [images, setImages] = useState({
        heroImage: null,
        trainingImage: null
    })
    const [previews, setPreviews] = useState({
        heroImage: '',
        trainingImage: ''
    })
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [message, setMessage] = useState({ type: '', text: '' })

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const token = localStorage.getItem('adminToken')

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch(`${API_URL}/careers`)
                const result = await res.json()
                if (result.success && result.data) {
                    setPreviews({
                        heroImage: result.data.heroImage?.url || '',
                        trainingImage: result.data.trainingImage?.url || ''
                    })
                }
            } catch (error) {
                console.error('Error fetching careers content:', error)
            } finally {
                setFetching(false)
            }
        }
        fetchContent()
    }, [API_URL])

    const handleImageChange = (e, type) => {
        const file = e.target.files[0]
        if (file) {
            setImages(prev => ({ ...prev, [type]: file }))
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [type]: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleImageSave = async (e) => {
        e.preventDefault()
        if (!images.heroImage && !images.trainingImage) {
            setMessage({ type: 'error', text: 'Please select at least one image to update.' })
            return
        }

        setLoading(true)
        setMessage({ type: '', text: '' })

        try {
            // Handle hero image upload
            if (images.heroImage) {
                const heroFormData = new FormData()
                heroFormData.append('heroImage', images.heroImage)

                const heroRes = await fetch(`${API_URL}/careers/hero-image`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: heroFormData
                })

                const heroResult = await heroRes.json()
                if (!heroResult.success) {
                    throw new Error(heroResult.message || 'Failed to update hero image.')
                }
            }

            // Handle training image upload
            if (images.trainingImage) {
                const trainingFormData = new FormData()
                trainingFormData.append('trainingImage', images.trainingImage)

                const trainingRes = await fetch(`${API_URL}/careers/training-image`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: trainingFormData
                })

                const trainingResult = await trainingRes.json()
                if (!trainingResult.success) {
                    throw new Error(trainingResult.message || 'Failed to update training image.')
                }
            }

            setMessage({ type: 'success', text: 'Images updated successfully!' })
            setImages({ heroImage: null, trainingImage: null })
            
            // Refresh previews
            const res = await fetch(`${API_URL}/careers`)
            const result = await res.json()
            if (result.success && result.data) {
                setPreviews({
                    heroImage: result.data.heroImage?.url || '',
                    trainingImage: result.data.trainingImage?.url || ''
                })
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Connection error. Please try again.' })
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
            <div className="max-w-5xl mx-auto space-y-12 py-8 px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Careers Management</h1>
                        <p className="text-gray-500 italic mt-1 font-serif">Manage hero and training images for the careers page</p>
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

                {/* Section: Images */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="bg-[#8B7355] text-white p-1.5 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </span>
                        Career Page Images
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Hero Image */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                            <h3 className="font-bold text-gray-700 uppercase tracking-wider text-sm">Hero Image</h3>
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group">
                                {previews.heroImage ? (
                                    <img src={previews.heroImage} alt="Hero" className="w-full h-full object-cover" />
                                ) : <div className="absolute inset-0 flex items-center justify-center text-gray-300 italic">No image selected</div>}
                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold">
                                    Change Image
                                    <input type="file" className="hidden" onChange={(e) => handleImageChange(e, 'heroImage')} accept="image/*" />
                                </label>
                            </div>
                        </div>

                        {/* Training Image */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                            <h3 className="font-bold text-gray-700 uppercase tracking-wider text-sm">Training Image</h3>
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group">
                                {previews.trainingImage ? (
                                    <img src={previews.trainingImage} alt="Training" className="w-full h-full object-cover" />
                                ) : <div className="absolute inset-0 flex items-center justify-center text-gray-300 italic">No image selected</div>}
                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold">
                                    Change Image
                                    <input type="file" className="hidden" onChange={(e) => handleImageChange(e, 'trainingImage')} accept="image/*" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handleImageSave} disabled={loading} className="bg-gray-800 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-black transition-all">
                            {loading ? 'Uploading...' : 'Update Selected Images'}
                        </button>
                    </div>
                </section>
            </div>
        </AdminLayout>
    )
}

export default CareersManagementPage