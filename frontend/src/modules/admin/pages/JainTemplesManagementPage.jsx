import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const JainTemplesManagementPage = () => {
    const [fetching, setFetching] = useState(true)
    const [saving, setSaving] = useState(null)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [uploadingIndex, setUploadingIndex] = useState(null)

    const [hero, setHero] = useState({
        title: '',
        subtitle: '',
        image: null,
        preview: ''
    })

    const [projectsSection, setProjectsSection] = useState({
        title: '',
        description: '',
        projects: []
    })

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const token = localStorage.getItem('adminToken')

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => setMessage({ type: '', text: '' }), 4000)
            return () => clearTimeout(timer)
        }
    }, [message])

    const fetchData = async () => {
        try {
            const res = await fetch(`${API_URL}/jain-temples`)
            const result = await res.json()
            if (result.success && result.data) {
                const data = result.data
                setHero({
                    title: data.heroSection?.title || '',
                    subtitle: data.heroSection?.subtitle || '',
                    image: null,
                    preview: data.heroSection?.image?.url || ''
                })
                setProjectsSection({
                    title: data.projectsSection?.title || '',
                    description: data.projectsSection?.description || '',
                    projects: data.projectsSection?.projects || []
                })
            }
        } catch (error) {
            console.error('Error fetching jain temples data:', error)
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
        const res = await fetch(`${API_URL}/jain-temples/upload`, {
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
                const uploadResult = await uploadFile(hero.image)
                heroImageUrl = uploadResult.url
                heroPublicId = uploadResult.publicId
            }

            const data = {
                heroSection: {
                    title: hero.title,
                    subtitle: hero.subtitle,
                    image: {
                        url: heroImageUrl,
                        publicId: heroPublicId,
                        alt: hero.title
                    }
                }
            }

            const res = await fetch(`${API_URL}/jain-temples`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
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

    const saveProjectsSection = async () => {
        setSaving('projectsSection')
        setMessage({ type: '', text: '' })
        try {
            const res = await fetch(`${API_URL}/jain-temples`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ projectsSection })
            })

            const result = await res.json()
            if (result.success) {
                setMessage({ type: 'success', text: 'Projects section updated successfully!' })
            } else {
                setMessage({ type: 'error', text: result.message || 'Save failed' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Save failed: ' + error.message })
        } finally {
            setSaving(null)
        }
    }

    const handleProjectImageChange = async (index, file) => {
        if (!file) return
        setUploadingIndex(index)
        try {
            const uploadResult = await uploadFile(file)
            const updatedProjects = [...projectsSection.projects]
            updatedProjects[index].image = {
                url: uploadResult.url,
                publicId: uploadResult.publicId
            }
            setProjectsSection({ ...projectsSection, projects: updatedProjects })
            setMessage({ type: 'success', text: 'Project image uploaded! Remember to save changes.' })
        } catch (error) {
            setMessage({ type: 'error', text: 'Project image upload failed: ' + error.message })
        } finally {
            setUploadingIndex(null)
        }
    }

    const addNewProject = () => {
        setProjectsSection({
            ...projectsSection,
            projects: [
                ...projectsSection.projects,
                { title: '', location: '', description: '', image: { url: '', publicId: '' }, client: 'Private Client', status: 'Completed' }
            ]
        })
    }

    const removeProject = (index) => {
        if (window.confirm('Are you sure you want to remove this project? Changes will be permanent after saving.')) {
            const updatedProjects = projectsSection.projects.filter((_, i) => i !== index)
            setProjectsSection({ ...projectsSection, projects: updatedProjects })
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
                        <h1 className="text-4xl font-bold text-gray-900 font-serif">Jain Temples Management</h1>
                        <p className="text-gray-500 mt-2 text-lg font-medium">Update the header and project showcase.</p>
                    </div>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-2xl flex items-center justify-between shadow-lg sticky top-6 z-50 backdrop-blur-md animate-fadeIn ${message.type === 'success' ? 'bg-green-50/90 text-green-800 border-green-100' : (message.type === 'error' ? 'bg-red-50/90 text-red-800 border-red-100' : 'bg-blue-50/90 text-blue-800 border-blue-100')} border`}>
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
                            <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden bg-gray-50 border-4 border-dashed border-gray-200 group transition-all shadow-inner">
                                {hero.preview ? <img src={hero.preview} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Hero" /> : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 font-bold">
                                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        CLICK TO UPLOAD
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-white font-black text-xl mb-4">PREVIEW MODE</span>
                                </div>

                                <div className="absolute bottom-4 right-4">
                                    <label className="bg-white text-[#8B7355] px-6 py-3 rounded-xl font-bold shadow-2xl cursor-pointer hover:bg-gray-50 transition-all flex items-center gap-2 border border-gray-100">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Update Header Image
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, (file, prev) => setHero({ ...hero, image: file, preview: prev }))} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Projects Showcase */}
                <section className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 space-y-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <span className="bg-[#8B7355] text-white w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-[#8B7355]/20">2</span>
                            <h2 className="text-2xl font-bold text-gray-800 font-serif">Projects Showcase</h2>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={addNewProject} className="bg-gray-50 text-[#8B7355] px-6 py-3.5 rounded-2xl font-bold hover:bg-white border-2 border-transparent hover:border-[#8B7355]/20 transition-all flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add New Project
                            </button>
                            <button onClick={saveProjectsSection} disabled={saving === 'projectsSection'} className="bg-[#8B7355] text-white px-10 py-3.5 rounded-2xl font-bold hover:bg-[#6B5A42] hover:-translate-y-1 transition-all shadow-xl shadow-[#8B7355]/20 disabled:bg-gray-400">
                                {saving === 'projectsSection' ? 'Updating...' : 'Save Projects'}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Section Title</label>
                                <input type="text" value={projectsSection.title} onChange={(e) => setProjectsSection({ ...projectsSection, title: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#8B7355] transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Description</label>
                                <textarea value={projectsSection.description} onChange={(e) => setProjectsSection({ ...projectsSection, description: e.target.value })} rows="1" className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#8B7355] transition-all resize-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
                            {projectsSection.projects.map((project, index) => (
                                <div key={index} className="bg-white p-6 rounded-[2rem] border-2 border-gray-100 space-y-4 relative group hover:shadow-2xl transition-all duration-500">
                                    <button onClick={() => removeProject(index)} className="absolute top-4 right-4 bg-red-50 text-red-500 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-500 hover:text-white">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>

                                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group/img shadow-inner flex items-center justify-center">
                                        {uploadingIndex === index ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8B7355]"></div>
                                                <span className="text-[10px] font-bold text-[#8B7355]">UPLOADING...</span>
                                            </div>
                                        ) : project.image?.url ? (
                                            <img src={project.image.url} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700" alt={project.title} />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-gray-300 font-bold text-xs uppercase tracking-widest gap-2">
                                                <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                No Image
                                            </div>
                                        )}

                                        <div className="absolute bottom-3 right-3">
                                            <label className="bg-white/90 backdrop-blur-md text-[#8B7355] p-2 rounded-xl shadow-lg cursor-pointer hover:bg-white transition-all block border border-white/50">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleProjectImageChange(index, e.target.files[0])} />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Project Title</label>
                                            <input type="text" placeholder="Title" value={project.title} onChange={(e) => {
                                                const updated = [...projectsSection.projects];
                                                updated[index].title = e.target.value;
                                                setProjectsSection({ ...projectsSection, projects: updated });
                                            }} className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white transition-colors" />
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Location</label>
                                            <input type="text" placeholder="Location" value={project.location} onChange={(e) => {
                                                const updated = [...projectsSection.projects];
                                                updated[index].location = e.target.value;
                                                setProjectsSection({ ...projectsSection, projects: updated });
                                            }} className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white transition-colors" />
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Description</label>
                                            <textarea placeholder="Description" value={project.description} onChange={(e) => {
                                                const updated = [...projectsSection.projects];
                                                updated[index].description = e.target.value;
                                                setProjectsSection({ ...projectsSection, projects: updated });
                                            }} rows="2" className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm resize-none focus:bg-white transition-colors" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Client</label>
                                                <input type="text" placeholder="Client" value={project.client || ''} onChange={(e) => {
                                                    const updated = [...projectsSection.projects];
                                                    updated[index].client = e.target.value;
                                                    setProjectsSection({ ...projectsSection, projects: updated });
                                                }} className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:bg-white transition-colors" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Status</label>
                                                <input type="text" placeholder="Status" value={project.status || ''} onChange={(e) => {
                                                    const updated = [...projectsSection.projects];
                                                    updated[index].status = e.target.value;
                                                    setProjectsSection({ ...projectsSection, projects: updated });
                                                }} className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:bg-white transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    )
}

export default JainTemplesManagementPage
