import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const CommunalTemplesManagementPage = () => {
    const [fetching, setFetching] = useState(true)
    const [saving, setSaving] = useState(null)
    const [message, setMessage] = useState({ type: '', text: '' })

    const [hero, setHero] = useState({
        title: '',
        subtitle: '',
        image: null,
        preview: ''
    })

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const token = localStorage.getItem('adminToken')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await fetch(`${API_URL}/communal-temples`)
            const result = await res.json()
            if (result.success && result.data) {
                const data = result.data
                setHero({
                    title: data.heroSection?.title || '',
                    subtitle: data.heroSection?.subtitle || '',
                    image: null,
                    preview: data.heroSection?.image?.url || ''
                })
            }
        } catch (error) {
            console.error('Error fetching communal temples data:', error)
            setMessage({ type: 'error', text: 'Failed to fetch data' })
        } finally {
            setFetching(false)
        }
    }

    const handleImageChange = (e, callback) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                callback(file, reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const uploadFile = async (file, fieldName) => {
        const formData = new FormData()
        formData.append(fieldName, file)
        const res = await fetch(`${API_URL}/communal-temples/upload`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        })
        const data = await res.json()
        if (data.success) return { url: data.url, publicId: data.publicId }
        throw new Error(data.message || 'Upload failed')
    }

    const saveHero = async () => {
        setSaving('heroSection')
        setMessage({ type: '', text: '' })
        try {
            let heroImageUrl = hero.preview
            let heroPublicId = null

            if (hero.image) {
                const uploadResult = await uploadFile(hero.image, 'heroImage')
                heroImageUrl = uploadResult.url
                heroPublicId = uploadResult.publicId
            }

            const data = {
                title: hero.title,
                subtitle: hero.subtitle,
                image: {
                    url: heroImageUrl,
                    publicId: heroPublicId,
                    alt: hero.title
                }
            }

            const res = await fetch(`${API_URL}/communal-temples`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ heroSection: data })
            })

            const result = await res.json()
            if (result.success) {
                setMessage({ type: 'success', text: 'Hero Banner updated successfully!' })
                setHero(prev => ({ ...prev, image: null, preview: result.data.heroSection.image?.url || prev.preview }))
            } else {
                setMessage({ type: 'error', text: result.message || 'Save failed' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Hero upload failed: ' + error.message })
        } finally {
            setSaving(null)
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
            <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 font-serif">Communal Temples Management</h1>
                        <p className="text-gray-500 mt-2 text-lg font-medium">Update the header image and introductory text.</p>
                    </div>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-2xl flex items-center justify-between shadow-lg sticky top-6 z-50 backdrop-blur-md animate-fadeIn ${message.type === 'success' ? 'bg-green-50/90 text-green-800 border-green-100' : 'bg-red-50/90 text-red-800 border-red-100'} border`}>
                        <p className="font-semibold">{message.text}</p>
                        <button onClick={() => setMessage({ type: '', text: '' })} className="hover:bg-black/5 p-2 rounded-full transition-colors font-bold text-xl">×</button>
                    </div>
                )}

                {/* Section 1: Hero Banner */}
                <section className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 space-y-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <span className="bg-[#8B7355] text-white w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-[#8B7355]/20">1</span>
                            <h2 className="text-2xl font-bold text-gray-800 font-serif">Master Hero Banner</h2>
                        </div>
                        <button onClick={saveHero} disabled={saving === 'heroSection'} className="bg-[#8B7355] text-white px-10 py-3.5 rounded-2xl font-bold hover:bg-[#6B5A42] hover:-translate-y-1 transition-all shadow-xl shadow-[#8B7355]/20 disabled:bg-gray-400">
                            {saving === 'heroSection' ? 'Updating...' : 'Sync Banner'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Main Title</label>
                                <input type="text" value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#8B7355] transition-all font-serif text-2xl" />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Subheading</label>
                                <textarea value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} rows="4" className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#8B7355] transition-all resize-none text-lg" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Horizontal Banner Image</label>
                            <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden bg-gray-50 border-4 border-dashed border-gray-200 group hover:border-[#8B7355] transition-all cursor-pointer shadow-inner">
                                {hero.preview ? <img src={hero.preview} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Hero" /> : <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 font-bold">CLICK TO UPLOAD</div>}
                                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white font-black gap-3 backdrop-blur-sm">
                                    <span className="text-xl">REPLACE IMAGE</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, (file, prev) => setHero({ ...hero, image: file, preview: prev }))} />
                                </label>
                            </div>
                            <p className="text-xs text-gray-400 italic">Recommended: Horizontal image with high resolution for wide screens.</p>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    )
}

export default CommunalTemplesManagementPage
