import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const ContentPagesManagementPage = () => {
  const [pages, setPages] = useState([
    { id: 0, name: 'Corporate Information', slug: 'corporate-info', path: '/corporate-info', isDynamic: true },
    { id: 1, name: 'About Us', slug: 'about-us', path: '/about-us' },
    { id: 2, name: 'Experience Centre', slug: 'experience-centre', path: '/experience-centre' },
    { id: 3, name: 'AMS International Page', slug: 'ams-international', path: '/services/ams-international' },
    { id: 4, name: 'Why Choose Us', slug: 'why-choose-us', path: '/why-choose-us' },
    { id: 5, name: 'FAQ Page', slug: 'faq', path: '/faq' },
    { id: 6, name: 'Terms & Conditions', slug: 'terms-and-conditions', path: '/terms', isDynamic: true },
    { id: 7, name: 'Privacy Policy', slug: 'privacy-policy', path: '/privacy', isDynamic: true },
    { id: 8, name: 'Careers', slug: 'careers', path: '/careers' },
    { id: 9, name: 'The Team', slug: 'the-team', path: '/the-team' },
    { id: 10, name: 'OUR ARTIST', slug: 'artist', path: '/artist' },
    { id: 11, name: 'Our Clients', slug: 'our-clients', path: '/our-clients' },
    { id: 12, name: 'Pooja Room', slug: 'pooja-room', path: '/ourcreations/pooja-room' },
    { id: 13, name: 'Dream Temple', slug: 'dream-temple', path: '/ourcreations/dream-temple' },
    { id: 14, name: 'Communal Temples', slug: 'communal-temples', path: '/ourcreations/communal-temples' },
    { id: 15, name: 'Jain Temples', slug: 'jain-temples', path: '/ourcreations/jain-temples' }
  ])
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedPage, setSelectedPage] = useState(null)
  const location = useLocation()

  useEffect(() => {
    // Handle URL parameters (legacy)
    const params = new URLSearchParams(location.search)
    const slug = params.get('slug')
    if (slug) {
      const page = pages.find(p => p.slug === slug)
      if (page) {
        setSelectedPage(page)
        setShowEditModal(true)
      }
      return
    }

    // Handle path-based routing for Aslam House pages
    const pathname = location.pathname
    let targetSlug = null

    if (pathname === '/admin/aslam-house/careers') {
      targetSlug = 'careers'
    } else if (pathname === '/admin/aslam-house/our-artist') {
      targetSlug = 'artist'
    } else if (pathname === '/admin/aslam-house/our-clients') {
      targetSlug = 'our-clients'
    }

    if (targetSlug) {
      const page = pages.find(p => p.slug === targetSlug)
      if (page) {
        setSelectedPage(page)
        setShowEditModal(true)
      }
    }
  }, [location.search, location.pathname, pages])

  const handleEditPage = (updatedPage) => {
    setPages(pages.map(p => p.slug === updatedPage.slug ? { ...p, ...updatedPage } : p))
    setShowEditModal(false)
    setSelectedPage(null)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Content Pages Management</h1>

        {/* Pages List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#8B7355' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Page Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Path</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pages.map((page) => (
                  <tr key={page.slug} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{page.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.path}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {page.isDynamic ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase">Dynamic</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-bold uppercase">Standard</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => {
                          if (page.slug === 'the-team') {
                            window.location.href = '/admin/aslam-house/the-team'
                          } else if (page.slug === 'pooja-room') {
                            window.location.href = '/admin/content/pooja-room'
                          } else if (page.slug === 'dream-temple') {
                            window.location.href = '/admin/content/dream-temple'
                          } else if (page.slug === 'communal-temples') {
                            window.location.href = '/admin/category/communal-temples'
                          } else if (page.slug === 'jain-temples') {
                            window.location.href = '/admin/category/jain-temples'
                          } else if (page.slug === 'artist') {
                            window.location.href = '/admin/aslam-house/our-artist'
                          } else {
                            setSelectedPage(page)
                            setShowEditModal(true)
                          }
                        }}
                        className="text-[#8B7355] hover:underline font-medium"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Page Modal */}
        {showEditModal && selectedPage && (
          selectedPage.slug === 'careers' ? (
            <CareersEditModal
              page={selectedPage}
              onClose={() => {
                setShowEditModal(false)
                setSelectedPage(null)
              }}
            />
          ) : selectedPage.isDynamic ? (
            <DynamicPageEditModal
              page={selectedPage}
              onSave={handleEditPage}
              onClose={() => {
                setShowEditModal(false)
                setSelectedPage(null)
              }}
            />
          ) : (
            <PageEditModal
              page={selectedPage}
              onSave={handleEditPage}
              onClose={() => {
                setShowEditModal(false)
                setSelectedPage(null)
              }}
            />
          )
        )}
      </div>
    </AdminLayout>
  )
}

// Careers Edit Modal Component
const CareersEditModal = ({ page, onClose }) => {
  const [careersData, setCareersData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [heroImage, setHeroImage] = useState(null)
  const [heroPreview, setHeroPreview] = useState('')
  const [trainingImage, setTrainingImage] = useState(null)
  const [trainingPreview, setTrainingPreview] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    fetchCareersData()
  }, [])

  const fetchCareersData = async () => {
    try {
      const res = await fetch(`${API_URL}/careers`)
      const result = await res.json()
      if (result.success && result.data) {
        setCareersData(result.data)
        setHeroPreview(result.data.heroImage?.url || '')
        setTrainingPreview(result.data.trainingImage?.url || '')
      }
    } catch (error) {
      console.error('Error fetching careers data:', error)
      setMessage({ type: 'error', text: 'Failed to load careers data' })
    } finally {
      setFetching(false)
    }
  }

  const handleHeroImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setHeroImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setHeroPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTrainingImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setTrainingImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setTrainingPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const saveHeroImage = async () => {
    if (!heroImage) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('heroImage', heroImage)

      const res = await fetch(`${API_URL}/careers/hero-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Hero image updated successfully!' })
        setCareersData(result.data)
        setHeroImage(null)
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update hero image' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    } finally {
      setLoading(false)
    }
  }

  const saveTrainingImage = async () => {
    if (!trainingImage) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('trainingImage', trainingImage)

      const res = await fetch(`${API_URL}/careers/training-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Training image updated successfully!' })
        setCareersData(result.data)
        setTrainingImage(null)
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update training image' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Edit Careers Page</h2>
              <p className="text-gray-500 text-sm mt-1">Manage hero and training images</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {message.text && (
            <div className={`p-4 rounded-xl flex items-center justify-between ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
              <p className="font-medium">{message.text}</p>
              <button onClick={() => setMessage({ type: '', text: '' })} className="text-current opacity-50 hover:opacity-100">×</button>
            </div>
          )}

          {fetching ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355]"></div>
            </div>
          ) : (
            <>
              {/* Hero Image Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="bg-[#8B7355] text-white p-1.5 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </span>
                  Hero Image (Horizontal Banner)
                </h3>

                <div className="relative w-full h-[250px] rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group">
                  {heroPreview ? (
                    <img src={heroPreview} alt="Hero" className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">No image</div>
                  )}
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Change Image
                    <input type="file" className="hidden" onChange={handleHeroImageChange} accept="image/*" />
                  </label>
                </div>

                {heroImage && (
                  <button
                    onClick={saveHeroImage}
                    disabled={loading}
                    className="w-full bg-[#8B7355] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#6B5A42] transition-colors"
                  >
                    {loading ? 'Uploading...' : 'Save Hero Image'}
                  </button>
                )}
              </div>

              {/* Training Image Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="bg-[#8B7355] text-white p-1.5 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </span>
                  Training & Development Image
                </h3>

                <div className="relative w-full h-[300px] rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group">
                  {trainingPreview ? (
                    <img src={trainingPreview} alt="Training" className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">No image</div>
                  )}
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Change Image
                    <input type="file" className="hidden" onChange={handleTrainingImageChange} accept="image/*" />
                  </label>
                </div>

                {trainingImage && (
                  <button
                    onClick={saveTrainingImage}
                    disabled={loading}
                    className="w-full bg-[#8B7355] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#6B5A42] transition-colors"
                  >
                    {loading ? 'Uploading...' : 'Save Training Image'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Page Edit Modal Component
const PageEditModal = ({ page, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    ...page,
    content: page.content || '',
    metaTitle: page.metaTitle || '',
    metaDescription: page.metaDescription || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Edit Page: {page.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Page Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Path</label>
              <input
                type="text"
                value={formData.path}
                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Title</label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Description</label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Page Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows="10"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                placeholder="Enter page content (HTML supported)"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: '#8B7355' }}
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Dynamic Page Edit Modal Component
const DynamicPageEditModal = ({ page, onSave, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [activeTab, setActiveTab] = useState('hero')

  const [formData, setFormData] = useState({
    slug: page.slug,
    title: page.name,
    heroSection: {
      title: '',
      subtitle: '',
      description: '',
      image: { url: '', public_id: '' }
    },
    sections: [],
    metadata: {
      title: '',
      description: '',
      keywords: []
    }
  })

  const [heroImageFile, setHeroImageFile] = useState(null)
  const [heroPreview, setHeroPreview] = useState('')
  const [sectionImages, setSectionImages] = useState({}) // { index: File }
  const [sectionPreviews, setSectionPreviews] = useState({}) // { index: url }

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    fetchPageContent()
  }, [page.slug])

  const fetchPageContent = async () => {
    try {
      const res = await fetch(`${API_URL}/page-content/${page.slug}`)
      if (res.ok) {
        const data = await res.json()
        setFormData(prev => ({
          ...prev,
          ...data,
          heroSection: data.heroSection || prev.heroSection,
          sections: data.sections || prev.sections,
          metadata: data.metadata || prev.metadata
        }))
        if (data.heroSection?.image?.url) {
          setHeroPreview(data.heroSection.image.url)
        }
        const previews = {}
        data.sections?.forEach((sec, idx) => {
          if (sec.image?.url) previews[idx] = sec.image.url
        })
        setSectionPreviews(previews)
      }
    } catch (error) {
      console.error('Error fetching page content:', error)
    } finally {
      setFetching(false)
    }
  }

  const handleHeroImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setHeroImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setHeroPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSectionImageChange = (index, e) => {
    const file = e.target.files[0]
    if (file) {
      setSectionImages(prev => ({ ...prev, [index]: file }))
      const reader = new FileReader()
      reader.onloadend = () => setSectionPreviews(prev => ({ ...prev, [index]: reader.result }))
      reader.readAsDataURL(file)
    }
  }

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '', content: '', order: prev.sections.length, image: { url: '', public_id: '' } }]
    }))
  }

  const removeSection = (index) => {
    const newSections = formData.sections.filter((_, i) => i !== index)
    // Update orders
    const updatedSections = newSections.map((sec, i) => ({ ...sec, order: i }))
    setFormData(prev => ({ ...prev, sections: updatedSections }))

    // Also remove previews and files
    const newPreviews = { ...sectionPreviews }
    delete newPreviews[index]
    setSectionPreviews(newPreviews)

    const newFiles = { ...sectionImages }
    delete newFiles[index]
    setSectionImages(newFiles)
  }

  const updateSection = (index, field, value) => {
    const newSections = [...formData.sections]
    newSections[index][field] = value
    setFormData(prev => ({ ...prev, sections: newSections }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const data = new FormData()
      data.append('slug', formData.slug)
      data.append('title', formData.title)
      data.append('heroSection', JSON.stringify(formData.heroSection))
      data.append('sections', JSON.stringify(formData.sections))
      data.append('metadata', JSON.stringify(formData.metadata))

      if (heroImageFile) {
        data.append('heroImage', heroImageFile)
      }

      // Append section images with index as key
      Object.keys(sectionImages).forEach(index => {
        data.append(`sectionImage_${index}`, sectionImages[index])
      })

      const res = await fetch(`${API_URL}/page-content`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      })

      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Page updated successfully!' })
        setTimeout(() => onSave(formData), 1500)
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update page' })
      }
    } catch (error) {
      console.error('Error saving page:', error)
      setMessage({ type: 'error', text: 'Connection error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355]"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading Page Content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Edit {page.name}</h2>
            <p className="text-sm text-gray-500">Slug: {page.slug}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b flex gap-4 overflow-x-auto no-scrollbar bg-gray-50">
          {[
            { id: 'hero', label: 'Hero Section', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { id: 'sections', label: 'Content Sections', icon: 'M4 6h16M4 12h16M4 18h7' },
            { id: 'seo', label: 'SEO & Metadata', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 flex items-center gap-2 border-b-2 font-medium transition-all ${activeTab === tab.id ? 'border-[#8B7355] text-[#8B7355]' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} /></svg>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50/30">
          {message.text && (
            <div className={`p-4 rounded-xl flex items-center justify-between shadow-sm border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
              }`}>
              <div className="flex items-center gap-3">
                {message.type === 'success' ? (
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                ) : (
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                )}
                <span className="font-medium text-sm md:text-base">{message.text}</span>
              </div>
              <button type="button" onClick={() => setMessage({ type: '', text: '' })} className="text-current opacity-40 hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                      Hero Title
                      <span className="text-[10px] text-gray-400 font-normal uppercase italic tracking-wider">Required</span>
                    </label>
                    <input
                      type="text"
                      value={formData.heroSection.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, heroSection: { ...prev.heroSection, title: e.target.value } }))}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none transition-all"
                      placeholder="Main catchy headline..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Hero Subtitle</label>
                    <input
                      type="text"
                      value={formData.heroSection.subtitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, heroSection: { ...prev.heroSection, subtitle: e.target.value } }))}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none transition-all"
                      placeholder="Secondary catchphrase..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Hero Description</label>
                    <textarea
                      value={formData.heroSection.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, heroSection: { ...prev.heroSection, description: e.target.value } }))}
                      rows="4"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none transition-all resize-none"
                      placeholder="Brief introduction or policy summary..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                    Hero Banner Image
                    <span className="text-[10px] text-gray-400 font-normal uppercase italic tracking-wider">1920x600 recommended</span>
                  </label>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 group">
                    {heroPreview ? (
                      <img src={heroPreview} alt="Hero Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="text-sm font-medium">Click to upload image</p>
                      </div>
                    )}
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold backdrop-blur-sm">
                      <div className="flex flex-col items-center">
                        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                        <span>Change Hero Image</span>
                      </div>
                      <input type="file" className="hidden" onChange={handleHeroImageChange} accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Content Blocks</h3>
                  <p className="text-sm text-gray-500">Add detailed sections with text and optional images.</p>
                </div>
                <button
                  type="button"
                  onClick={addSection}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#8B7355] text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  Add New Section
                </button>
              </div>

              <div className="space-y-6">
                {formData.sections.map((section, index) => (
                  <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fadeIn">
                    <div className="bg-gray-50/80 px-4 py-3 border-b flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => updateSection(index, 'title', e.target.value)}
                          placeholder="Section Heading..."
                          className="bg-transparent font-bold text-gray-800 focus:outline-none placeholder:text-gray-400 min-w-[200px]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSection(index)}
                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                    <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Section Body</label>
                        <textarea
                          value={section.content}
                          onChange={(e) => updateSection(index, 'content', e.target.value)}
                          rows="6"
                          className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#8B7355]/10 focus:border-[#8B7355] outline-none transition-all resize-none"
                          placeholder="Enter section content here..."
                          required
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Section Image (Optional)</label>
                        <div className="relative h-[200px] rounded-xl overflow-hidden border-2 border-dashed border-gray-100 bg-gray-50/50 group">
                          {sectionPreviews[index] ? (
                            <img src={sectionPreviews[index]} alt={`Section ${index + 1}`} className="w-full h-full object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
                              <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              <p className="text-xs">No image selected</p>
                            </div>
                          )}
                          <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold backdrop-blur-[2px]">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            {sectionPreviews[index] ? 'Replace Image' : 'Add Image'}
                            <input type="file" className="hidden" onChange={(e) => handleSectionImageChange(index, e)} accept="image/*" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {formData.sections.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <h4 className="text-gray-400 font-medium">Your page has no content sections yet.</h4>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="max-w-3xl mx-auto space-y-6 bg-white p-8 rounded-2xl shadow-sm border">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Search Engine Optimization</h3>
                <p className="text-sm text-gray-500 mb-6 border-b pb-4">Configure how this page appears in search results.</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                    SEO Page Title
                    <span className="text-[10px] text-gray-400 font-normal uppercase italic tracking-wider">{formData.metadata.title.length}/60 chars</span>
                  </label>
                  <input
                    type="text"
                    value={formData.metadata.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, metadata: { ...prev.metadata, title: e.target.value } }))}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none transition-all"
                    placeholder="Page title for browser tab..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                    Meta Description
                    <span className="text-[10px] text-gray-400 font-normal uppercase italic tracking-wider">{formData.metadata.description.length}/160 chars</span>
                  </label>
                  <textarea
                    value={formData.metadata.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, metadata: { ...prev.metadata, description: e.target.value } }))}
                    rows="4"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none transition-all resize-none"
                    placeholder="Write a brief snippet that search engines will display..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Keywords (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.metadata.keywords.join(', ')}
                    onChange={(e) => setFormData(prev => ({ ...prev, metadata: { ...prev.metadata, keywords: e.target.value.split(',').map(k => k.trim()) } }))}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none transition-all"
                    placeholder="privacy, marble, aslam, india..."
                  />
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-gray-50 flex items-center justify-between sticky bottom-0 z-10">
          <p className="text-sm text-gray-500 italic hidden md:block">
            * Changes are saved immediately to the database upon clicking "Save Page".
          </p>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 md:flex-none px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`flex-1 md:flex-none px-12 py-3 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8B7355] hover:bg-[#6B5A42] hover:shadow-xl'
                } text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95`}
            >
              {loading && <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              {loading ? 'Saving...' : 'Save Page Content'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentPagesManagementPage

