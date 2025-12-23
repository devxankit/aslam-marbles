import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const DreamTempleManagementPage = () => {
    const [fetching, setFetching] = useState(true)
    const [saving, setSaving] = useState(null)
    const [uploading, setUploading] = useState(null)
    const [message, setMessage] = useState({ type: '', text: '' })

    const [hero, setHero] = useState({
        title: '',
        subtitle: '',
        description: '',
        image: null,
        preview: ''
    })
    const [collection, setCollection] = useState([])

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const token = localStorage.getItem('adminToken')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await fetch(`${API_URL}/dream-temple`)
            const data = await res.json()
            if (res.ok && data._id) {
                setHero({
                    title: data.heroSection?.title || '',
                    subtitle: data.heroSection?.subtitle || '',
                    description: data.heroSection?.description || '',
                    image: null,
                    preview: data.heroSection?.image?.url || ''
                })
                setCollection(data.collection || [])
            }
        } catch (error) {
            console.error('Error fetching dream temple data:', error)
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

    const uploadFile = async (file) => {
        const formData = new FormData()
        formData.append('image', file)
        const res = await fetch(`${API_URL}/dream-temple/upload-single`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        })
        const data = await res.json()
        if (res.ok) return data.url
        throw new Error(data.message || 'Upload failed')
    }

    const saveSection = async (section, dataToSend) => {
        setSaving(section)
        setMessage({ type: '', text: '' })
        try {
            const formData = new FormData()
            Object.keys(dataToSend).forEach(key => {
                if (dataToSend[key] instanceof File) {
                    formData.append(key, dataToSend[key])
                } else if (Array.isArray(dataToSend[key])) {
                    formData.append(key, JSON.stringify(dataToSend[key]))
                } else if (typeof dataToSend[key] === 'object' && dataToSend[key] !== null) {
                    formData.append(key, JSON.stringify(dataToSend[key]))
                } else if (dataToSend[key] !== undefined) {
                    formData.append(key, dataToSend[key])
                }
            })

            const res = await fetch(`${API_URL}/dream-temple`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            })

            const result = await res.json()
            if (res.ok) {
                setMessage({ type: 'success', text: `${section.toUpperCase()} section saved successfully!` })
                if (section === 'hero' && result.heroSection) {
                    setHero(prev => ({ ...prev, image: null, preview: result.heroSection.image?.url || prev.preview }))
                }
            } else {
                setMessage({ type: 'error', text: result.message || 'Save failed' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Connection error' })
        } finally {
            setSaving(null)
        }
    }

    const handleCollectionImageUpload = async (e, index) => {
        const file = e.target.files[0]
        if (!file) return
        setUploading(`coll-${index}`)
        try {
            const url = await uploadFile(file)
            const newColl = [...collection]
            newColl[index].image = { url, alt: newColl[index].description }
            setCollection(newColl)
        } catch (error) {
            setMessage({ type: 'error', text: error.message })
        } finally {
            setUploading(null)
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
            <div className="max-w-6xl mx-auto space-y-8 pb-20">
                <div className="flex items-center justify-between border-b pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 font-serif">Dream Temple Management</h1>
                        <p className="text-gray-500 mt-1">Updates are live immediately after saving each section.</p>
                    </div>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-xl flex items-center justify-between shadow-sm sticky top-4 z-50 animate-fadeIn ${message.type === 'success' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'} border`}>
                        <p className="font-medium flex items-center gap-2">
                            {message.type === 'success' ? '✅' : '❌'} {message.text}
                        </p>
                        <button onClick={() => setMessage({ type: '', text: '' })} className="opacity-50 hover:opacity-100 font-bold text-lg">×</button>
                    </div>
                )}

                {/* Section 1: Hero */}
                <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <span className="bg-[#8B7355] text-white p-1 px-2 rounded-md">1</span>
                            Hero Banner
                        </h2>
                        <button
                            onClick={() => saveSection('hero', { heroTitle: hero.title, heroSubtitle: hero.subtitle, heroDescription: hero.description, heroImage: hero.image })}
                            disabled={saving === 'hero'}
                            className={`px-6 py-2 rounded-lg text-white font-bold transition-all ${saving === 'hero' ? 'bg-gray-400' : 'bg-[#8B7355] hover:bg-[#6B5A42] hover:shadow-lg'}`}
                        >
                            {saving === 'hero' ? 'Saving...' : 'Save Hero'}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Banner Title</label>
                                <input
                                    type="text"
                                    value={hero.title}
                                    onChange={(e) => setHero({ ...hero, title: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#8B7355]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Banner Subtitle</label>
                                <input
                                    type="text"
                                    value={hero.subtitle}
                                    onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#8B7355]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Banner Description</label>
                                <textarea
                                    value={hero.description}
                                    onChange={(e) => setHero({ ...hero, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#8B7355]/20"
                                />
                            </div>
                        </div>
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group">
                            {hero.preview ? <img src={hero.preview} className="w-full h-full object-cover" /> : null}
                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold text-sm">
                                Change Banner Image
                                <input type="file" className="hidden" onChange={(e) => handleImageChange(e, (file, prev) => setHero({ ...hero, image: file, preview: prev }))} />
                            </label>
                        </div>
                    </div>
                </section>

                {/* Section 2: Collection */}
                <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <span className="bg-[#8B7355] text-white p-1 px-2 rounded-md">2</span>
                            Temple Collection
                        </h2>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setCollection([...collection, { description: '', size: '', price: '', image: { url: '' } }])}
                                className="bg-white border-2 border-[#8B7355] text-[#8B7355] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#8B7355]/5"
                            >
                                + Add Temple
                            </button>
                            <button
                                onClick={() => saveSection('collection', { collection: collection })}
                                disabled={saving === 'collection'}
                                className={`px-6 py-2 rounded-lg text-white font-bold transition-all ${saving === 'collection' ? 'bg-gray-400' : 'bg-[#8B7355] hover:bg-[#6B5A42] hover:shadow-lg'}`}
                            >
                                {saving === 'collection' ? 'Saving...' : 'Save Collection'}
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {collection.map((item, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-xl border relative group space-y-3 shadow-sm hover:shadow-md transition-shadow">
                                <button
                                    onClick={() => setCollection(collection.filter((_, i) => i !== index))}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md z-10 hover:bg-red-600"
                                >
                                    ×
                                </button>
                                <div className="relative aspect-square rounded-lg overflow-hidden border bg-white group/img shadow-inner">
                                    {uploading === `coll-${index}` ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
                                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#8B7355] border-t-transparent"></div>
                                        </div>
                                    ) : null}
                                    {item.image?.url ? (
                                        <img src={item.image.url} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                                    )}
                                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold text-center p-2">
                                        Upload Image
                                        <input type="file" className="hidden" onChange={(e) => handleCollectionImageUpload(e, index)} />
                                    </label>
                                </div>
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        value={item.description}
                                        onChange={(e) => {
                                            const newColl = [...collection];
                                            newColl[index].description = e.target.value;
                                            setCollection(newColl);
                                        }}
                                        placeholder="Temple Description (e.g. 3ft Wide)"
                                        className="w-full text-xs px-2 py-2 border rounded outline-none focus:border-[#8B7355]"
                                    />
                                    <input
                                        type="text"
                                        value={item.size}
                                        onChange={(e) => {
                                            const newColl = [...collection];
                                            newColl[index].size = e.target.value;
                                            setCollection(newColl);
                                        }}
                                        placeholder="Size"
                                        className="w-full text-xs px-2 py-2 border rounded outline-none focus:border-[#8B7355]"
                                    />
                                    <input
                                        type="text"
                                        value={item.price}
                                        onChange={(e) => {
                                            const newColl = [...collection];
                                            newColl[index].price = e.target.value;
                                            setCollection(newColl);
                                        }}
                                        placeholder="Price (e.g. 2.85L)"
                                        className="w-full text-xs px-2 py-2 border rounded outline-none focus:border-[#8B7355]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AdminLayout>
    )
}

export default DreamTempleManagementPage
