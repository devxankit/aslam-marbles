import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const ContentPagesManagementPage = () => {
  const [pages, setPages] = useState([
    { id: 1, name: 'About Us', slug: 'about-us', path: '/about-us' },
    { id: 2, name: 'Experience Centre', slug: 'experience-centre', path: '/experience-centre' },
    { id: 3, name: 'AMS International Page', slug: 'tsa-international', path: '/services/tsa-international' },
    { id: 4, name: 'Why Choose Us', slug: 'why-choose-us', path: '/why-choose-us' },
    { id: 5, name: 'FAQ Page', slug: 'faq', path: '/faq' },
    { id: 6, name: 'Terms & Conditions', slug: 'terms', path: '/terms' },
    { id: 7, name: 'Privacy Policy', slug: 'privacy', path: '/privacy' },
    { id: 8, name: 'Careers', slug: 'careers', path: '/careers' },
    { id: 9, name: 'The Team', slug: 'the-team', path: '/the-team' },
    { id: 10, name: 'OUR ARTIST', slug: 'artisans-of-tilak', path: '/artisans-of-tilak' },
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
      targetSlug = 'artisans-of-tilak'
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
    setPages(pages.map(p => p.id === updatedPage.id ? updatedPage : p))
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
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{page.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.path}</td>
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

export default ContentPagesManagementPage

