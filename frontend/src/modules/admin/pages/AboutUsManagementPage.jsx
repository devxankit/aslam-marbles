import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { journeyTimeline as defaultTimeline } from '../../../data/aboutUsJourney'
import { companyValues as defaultValues } from '../../../data/aboutUsValues'

const AboutUsManagementPage = () => {
    const [images, setImages] = useState({
        heroBgImage: null,
        introImage: null
    })
    const [previews, setPreviews] = useState({
        heroBgImage: '',
        introImage: ''
    })
    const [timeline, setTimeline] = useState([])
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(false)
    const [contentLoading, setContentLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [message, setMessage] = useState({ type: '', text: '' })

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'
    const token = localStorage.getItem('adminToken')

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch(`${API_URL}/about-us`)
                const result = await res.json()
                if (result.success && result.data) {
                    setPreviews({
                        heroBgImage: result.data.heroBgImage?.url || '',
                        introImage: result.data.introImage?.url || ''
                    })
                    setTimeline(result.data.timeline?.length > 0 ? result.data.timeline : defaultTimeline)
                    setValues(result.data.values?.length > 0 ? result.data.values : defaultValues)
                } else {
                    // Fallback to defaults
                    setTimeline(defaultTimeline)
                    setValues(defaultValues)
                }
            } catch (error) {
                console.error('Error fetching about us content:', error)
                setTimeline(defaultTimeline)
                setValues(defaultValues)
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
        if (!images.heroBgImage && !images.introImage) {
            setMessage({ type: 'error', text: 'Please select at least one image to update.' })
            return
        }

        setLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const formData = new FormData()
            if (images.heroBgImage) formData.append('heroBgImage', images.heroBgImage)
            if (images.introImage) formData.append('introImage', images.introImage)

            const res = await fetch(`${API_URL}/about-us/images`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

            const result = await res.json()
            if (result.success) {
                setMessage({ type: 'success', text: 'Images updated successfully!' })
                setImages({ heroBgImage: null, introImage: null })
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to update images.' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Connection error. Please try again.' })
        } finally {
            setLoading(false)
        }
    }

    const handleContentSave = async () => {
        setContentLoading(true)
        setMessage({ type: '', text: '' })
        try {
            const res = await fetch(`${API_URL}/about-us/content`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ timeline, values })
            })
            const result = await res.json()
            if (result.success) {
                setMessage({ type: 'success', text: 'Timeline and Values updated successfully!' })
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to update content.' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Connection error. Please try again.' })
        } finally {
            setContentLoading(false)
        }
    }

    // Timeline Handlers
    const addTimelineItem = () => {
        setTimeline([{ year: '', title: '', description: '' }, ...timeline])
    }
    const removeTimelineItem = (index) => {
        const list = [...timeline]
        list.splice(index, 1)
        setTimeline(list)
    }
    const updateTimelineItem = (index, field, value) => {
        const newTimeline = [...timeline]
        newTimeline[index] = { ...newTimeline[index], [field]: value }
        setTimeline(newTimeline)
    }

    // Values Handlers
    const addValueItem = () => {
        setValues([{ title: '', description: '' }, ...values])
    }
    const removeValueItem = (index) => {
        const list = [...values]
        list.splice(index, 1)
        setValues(list)
    }
    const updateValueItem = (index, field, value) => {
        const newValues = [...values]
        newValues[index] = { ...newValues[index], [field]: value }
        setValues(newValues)
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
                        <h1 className="text-3xl font-bold text-gray-800">About Us Management</h1>
                        <p className="text-gray-500 italic mt-1 font-serif">Manage images, timeline milestones, and company values</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleContentSave}
                            disabled={contentLoading}
                            className={`px-6 py-2 rounded-lg text-white font-semibold transition-all shadow-md ${contentLoading ? 'bg-gray-400' : 'bg-[#8B7355] hover:bg-[#6B5A42]'}`}
                        >
                            {contentLoading ? 'Saving...' : 'Save Content Changes'}
                        </button>
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
                        Media Assets
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Hero Background */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                            <h3 className="font-bold text-gray-700 uppercase tracking-wider text-sm">Hero Background</h3>
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group">
                                {previews.heroBgImage ? (
                                    <img src={previews.heroBgImage} alt="Hero" className="w-full h-full object-cover" />
                                ) : <div className="absolute inset-0 flex items-center justify-center text-gray-300 italic">No image selected</div>}
                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold">
                                    Change Image
                                    <input type="file" className="hidden" onChange={(e) => handleImageChange(e, 'heroBgImage')} />
                                </label>
                            </div>
                        </div>

                        {/* Intro Image */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                            <h3 className="font-bold text-gray-700 uppercase tracking-wider text-sm">Introduction Image</h3>
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group">
                                {previews.introImage ? (
                                    <img src={previews.introImage} alt="Intro" className="w-full h-full object-cover" />
                                ) : <div className="absolute inset-0 flex items-center justify-center text-gray-300 italic">No image selected</div>}
                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold">
                                    Change Image
                                    <input type="file" className="hidden" onChange={(e) => handleImageChange(e, 'introImage')} />
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

                {/* Section: Timeline */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <span className="bg-[#8B7355] text-white p-1.5 rounded-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </span>
                            Timeline Milestones
                        </h2>
                        <button type="button" onClick={addTimelineItem} className="text-[#8B7355] hover:underline font-bold">+ Add Milestone</button>
                    </div>

                    <div className="space-y-4">
                        {timeline.map((item, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 relative group">
                                <button onClick={() => removeTimelineItem(index)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Year</label>
                                        <input
                                            type="text"
                                            value={item.year}
                                            onChange={(e) => updateTimelineItem(index, 'year', e.target.value)}
                                            className="w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none"
                                            placeholder="e.g. 1995"
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Milestone Title</label>
                                        <input
                                            type="text"
                                            value={item.title}
                                            onChange={(e) => updateTimelineItem(index, 'title', e.target.value)}
                                            className="w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none"
                                            placeholder="Enter milestone title"
                                        />
                                    </div>
                                    <div className="md:col-span-4">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => updateTimelineItem(index, 'description', e.target.value)}
                                            rows="2"
                                            className="w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none"
                                            placeholder="Describe the milestone..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section: Values */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <span className="bg-[#8B7355] text-white p-1.5 rounded-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </span>
                            Company Values
                        </h2>
                        <button type="button" onClick={addValueItem} className="text-[#8B7355] hover:underline font-bold">+ Add Value</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative group">
                                <button onClick={() => removeValueItem(index)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                </button>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Value Title</label>
                                        <input
                                            type="text"
                                            value={item.title}
                                            onChange={(e) => updateValueItem(index, 'title', e.target.value)}
                                            className="w-full bg-gray-50 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none font-bold"
                                            placeholder="e.g. Integrity"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => updateValueItem(index, 'description', e.target.value)}
                                            rows="3"
                                            className="w-full bg-gray-50 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none"
                                            placeholder="Define this value..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="pt-10 border-t flex justify-center">
                    <button
                        onClick={handleContentSave}
                        disabled={contentLoading}
                        className={`px-12 py-4 rounded-2xl text-white font-bold text-lg uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl active:scale-95 ${contentLoading ? 'bg-gray-400' : 'bg-[#8B7355] hover:bg-[#6B5A42]'}`}
                    >
                        {contentLoading ? 'Syncing with Server...' : 'Save All Content Updates'}
                    </button>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AboutUsManagementPage
