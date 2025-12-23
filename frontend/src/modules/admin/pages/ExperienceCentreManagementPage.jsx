import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const ExperienceCentreManagementPage = () => {
    const [content, setContent] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'
    const token = localStorage.getItem('adminToken')

    const fetchContent = async () => {
        try {
            const res = await fetch(`${API_URL}/experience-centre`)
            const result = await res.json()
            if (result.success) {
                setContent(result.data)
            }
        } catch (error) {
            console.error('Error fetching experience centre content:', error)
        } finally {
            setFetching(false)
        }
    }

    useEffect(() => {
        fetchContent()
    }, [API_URL])

    const handleTextUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/experience-centre/text`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    mainCaption: content.mainCaption,
                    subCaption: content.subCaption,
                    journeyText: content.journeyText
                })
            })
            const result = await res.json()
            if (result.success) {
                setMessage({ type: 'success', text: 'Text content updated successfully!' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update text.' })
        } finally {
            setLoading(false)
        }
    }

    const handleHeroUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setLoading(true)
        const formData = new FormData()
        formData.append('image', file)

        try {
            const res = await fetch(`${API_URL}/experience-centre/hero`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            })
            const result = await res.json()
            if (result.success) {
                setContent(result.data)
                setMessage({ type: 'success', text: 'Hero image updated!' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Upload failed.' })
        } finally {
            setLoading(false)
        }
    }

    const handleRegularSlotUpdate = async (slot, file) => {
        if (!file) return
        setLoading(true)
        const formData = new FormData()
        formData.append('slot', slot)
        formData.append('image', file)

        try {
            const res = await fetch(`${API_URL}/experience-centre/regular`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            })
            const result = await res.json()
            if (result.success) {
                setContent(result.data)
                setMessage({ type: 'success', text: `Gallery image slot ${slot + 1} updated!` })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Update failed.' })
        } finally {
            setLoading(false)
        }
    }

    const removeRegular = async (publicId) => {
        if (!window.confirm('Are you sure you want to remove this image?')) return
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/experience-centre/regular/${publicId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const result = await res.json()
            if (result.success) {
                setContent(result.data)
                setMessage({ type: 'success', text: 'Image removed!' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Delete failed.' })
        } finally {
            setLoading(false)
        }
    }

    const handleHorizontalUpdate = async (slot, file = null, caption = null) => {
        setLoading(true)
        const formData = new FormData()
        formData.append('slot', slot)
        if (file) formData.append('image', file)
        if (caption !== null) formData.append('caption', caption)

        try {
            const res = await fetch(`${API_URL}/experience-centre/horizontal`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            })
            const result = await res.json()
            if (result.success) {
                setContent(result.data)
                setMessage({ type: 'success', text: `Horizontal image slot ${slot + 1} updated!` })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Update failed.' })
        } finally {
            setLoading(false)
        }
    }

    if (fetching) return <AdminLayout><div className="p-8 text-center text-[#8B7355] font-bold">Loading Experience Center Content...</div></AdminLayout>

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto py-8 px-4 space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Experience Centre Management</h1>
                        <p className="text-gray-500 italic mt-1 font-serif">Manage the visual flow and storytelling of your showroom</p>
                    </div>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300 ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                        <div className="flex items-center gap-3">
                            <span className="text-xl">{message.type === 'success' ? '✓' : '⚠'}</span>
                            <p className="font-medium">{message.text}</p>
                        </div>
                        <button onClick={() => setMessage({ type: '', text: '' })} className="text-current opacity-50 hover:opacity-100 text-2xl">&times;</button>
                    </div>
                )}

                {/* Hero Image Section */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-xl font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-6 bg-[#8B7355] rounded-full"></span>
                        Main Hero Banner
                    </h2>
                    <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group shadow-inner">
                        {content.heroImage?.url ? (
                            <img src={content.heroImage.url} alt="Hero" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : <div className="absolute inset-0 flex items-center justify-center text-gray-300 italic">No image uploaded</div>}
                        <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center cursor-pointer text-white font-bold backdrop-blur-[2px]">
                            <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Replace Hero Image
                            <input type="file" className="hidden" onChange={handleHeroUpload} />
                        </label>
                    </div>
                </section>

                {/* Regular Images (4-4 Grid) */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-6 bg-[#8B7355] rounded-full"></span>
                            Gallery Grid (4x3 Structure)
                        </h2>
                    </div>
                    <p className="text-sm text-gray-500 italic">Replace images in the exact order they appear in the 4-image rows (parallel images) on the live page.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[...Array(12)].map((_, i) => {
                            const img = content.regularImages?.[i]
                            return (
                                <div key={i} className="relative group aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-1 ring-gray-100">
                                    {img?.url ? (
                                        <img src={img.url} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 text-xs text-center p-4">
                                            Slot {i + 1}<br />Empty
                                        </div>
                                    )}
                                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-sm font-bold backdrop-blur-sm">
                                        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                        Slot {i + 1}
                                        <input type="file" className="hidden" onChange={(e) => handleRegularSlotUpdate(i, e.target.files[0])} />
                                    </label>
                                    {img?.url && (
                                        <button
                                            onClick={() => removeRegular(img.publicId)}
                                            className="absolute top-2 right-2 bg-red-500/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-md"
                                        >
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Text Content Section */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold text-gray-700 uppercase tracking-wider">Text Content & Captions</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Main Caption (Top)</label>
                            <textarea
                                value={content.mainCaption}
                                onChange={(e) => setContent({ ...content, mainCaption: e.target.value })}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#8B7355] outline-none"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Sub Caption (Bottom)</label>
                            <textarea
                                value={content.subCaption}
                                onChange={(e) => setContent({ ...content, subCaption: e.target.value })}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#8B7355] outline-none"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">The Journey of Creation Text</label>
                            <textarea
                                value={content.journeyText}
                                onChange={(e) => setContent({ ...content, journeyText: e.target.value })}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#8B7355] outline-none"
                                rows="6"
                            />
                        </div>
                        <button onClick={handleTextUpdate} className="bg-[#8B7355] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6B5A42] transition-all">
                            Save Text Changes
                        </button>
                    </div>
                </section>

                {/* Horizontal Images Section */}
                <section className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-6 bg-[#8B7355] rounded-full"></span>
                        Horizontal Highlight Images
                    </h2>
                    <div className="space-y-8">
                        {[0, 1, 2].map((i) => {
                            const data = content.horizontalImages?.[i] || {}
                            return (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-1">
                                        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group">
                                            {data.url ? (
                                                <img src={data.url} className="w-full h-full object-cover" />
                                            ) : <div className="absolute inset-0 flex items-center justify-center text-gray-300 italic">Slot {i + 1} Empty</div>}
                                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold">
                                                Replace Image
                                                <input type="file" className="hidden" onChange={(e) => handleHorizontalUpdate(i, e.target.files[0], null)} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-4">
                                        <h3 className="font-bold text-gray-800">Highlight Image {i + 1} Caption</h3>
                                        <input
                                            type="text"
                                            placeholder="Enter italic caption for this image..."
                                            value={data.caption || ''}
                                            onChange={(e) => {
                                                const newHorizontal = [...(content.horizontalImages || [])]
                                                if (!newHorizontal[i]) newHorizontal[i] = { caption: '' }
                                                newHorizontal[i].caption = e.target.value
                                                setContent({ ...content, horizontalImages: newHorizontal })
                                            }}
                                            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#8B7355]"
                                        />
                                        <button
                                            onClick={() => handleHorizontalUpdate(i, null, data.caption)}
                                            className="text-[#8B7355] font-bold hover:underline"
                                        >
                                            Save Caption Only
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </AdminLayout>
    )
}

export default ExperienceCentreManagementPage
