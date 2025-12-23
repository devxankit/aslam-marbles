import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const ArtistManagementPage = () => {
  const [artistData, setArtistData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Image states
  const [heroImage, setHeroImage] = useState(null)
  const [heroPreview, setHeroPreview] = useState('')
  const [visitStoreImage, setVisitStoreImage] = useState(null)
  const [visitStorePreview, setVisitStorePreview] = useState('')
  const [galleryImage, setGalleryImage] = useState(null)
  const [galleryPreview, setGalleryPreview] = useState('')

  // Form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sections, setSections] = useState([])
  const [visitStoreButtonText, setVisitStoreButtonText] = useState('')
  const [visitStoreButtonLink, setVisitStoreButtonLink] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    fetchArtistData()
  }, [])

  const fetchArtistData = async () => {
    try {
      const res = await fetch(`${API_URL}/artists`)
      const result = await res.json()
      
      if (result.success && result.data) {
        const data = result.data
        setArtistData(data)
        setTitle(data.title || '')
        setDescription(data.description || '')
        setSections(data.sections || [])
        setHeroPreview(data.heroImage?.url || '')
        setVisitStorePreview(data.visitStoreSection?.image?.url || '')
        setVisitStoreButtonText(data.visitStoreSection?.buttonText || '')
        setVisitStoreButtonLink(data.visitStoreSection?.buttonLink || '')
      }
    } catch (error) {
      console.error('Error fetching artist data:', error)
      setMessage({ type: 'error', text: 'Failed to load artist data' })
    } finally {
      setFetching(false)
    }
  }

  const handleImageChange = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === 'hero') {
          setHeroImage(file)
          setHeroPreview(reader.result)
        } else if (type === 'visitStore') {
          setVisitStoreImage(file)
          setVisitStorePreview(reader.result)
        } else if (type === 'gallery') {
          setGalleryImage(file)
          setGalleryPreview(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const saveBasicInfo = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/artists`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          sections
        })
      })

      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Basic information updated successfully!' })
        setArtistData(result.data)
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update basic information' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    } finally {
      setLoading(false)
    }
  }

  const saveHeroImage = async () => {
    if (!heroImage) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', heroImage)

      const res = await fetch(`${API_URL}/artists/hero-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Hero image updated successfully!' })
        setArtistData(result.data)
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

  const addGalleryImage = async () => {
    if (!galleryImage) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', galleryImage)
      formData.append('alt', 'Artisan')

      const res = await fetch(`${API_URL}/artists/gallery`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Gallery image added successfully!' })
        setArtistData(result.data)
        setGalleryImage(null)
        setGalleryPreview('')
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to add gallery image' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    } finally {
      setLoading(false)
    }
  }

  const deleteGalleryImage = async (imageId) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/artists/gallery/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Gallery image deleted successfully!' })
        setArtistData(result.data)
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to delete gallery image' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    } finally {
      setLoading(false)
    }
  }

  const saveVisitStoreSection = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      if (visitStoreImage) {
        formData.append('image', visitStoreImage)
      }
      formData.append('buttonText', visitStoreButtonText)
      formData.append('buttonLink', visitStoreButtonLink)

      const res = await fetch(`${API_URL}/artists/visit-store`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Visit store section updated successfully!' })
        setArtistData(result.data)
        setVisitStoreImage(null)
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update visit store section' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    } finally {
      setLoading(false)
    }
  }

  const addSection = () => {
    setSections([...sections, { title: '', content: '', order: sections.length + 1 }])
  }

  const updateSection = (index, field, value) => {
    const updatedSections = [...sections]
    updatedSections[index][field] = value
    setSections(updatedSections)
  }

  const removeSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index)
    setSections(updatedSections)
  }

  if (fetching) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading artist data...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Artist Page Management</h1>

        {/* Message Display */}
        {message.text && (
          <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              />
            </div>

            <button
              onClick={saveBasicInfo}
              disabled={loading}
              className="px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#7A6349] disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Basic Info'}
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Hero Image</h2>
          
          {heroPreview && (
            <div className="mb-4">
              <img src={heroPreview} alt="Hero" className="w-full max-w-md h-48 object-cover rounded-lg" />
            </div>
          )}

          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'hero')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8B7355] file:text-white hover:file:bg-[#7A6349]"
            />

            {heroImage && (
              <button
                onClick={saveHeroImage}
                disabled={loading}
                className="px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#7A6349] disabled:opacity-50"
              >
                {loading ? 'Uploading...' : 'Save Hero Image'}
              </button>
            )}
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Content Sections</h2>
            <button
              onClick={addSection}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Section
            </button>
          </div>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Section {index + 1}</h3>
                  <button
                    onClick={() => removeSection(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Section Title"
                    value={section.title}
                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                  />
                  <textarea
                    placeholder="Section Content"
                    value={section.content}
                    onChange={(e) => updateSection(index, 'content', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Images */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Gallery Images</h2>
          
          {/* Current Gallery Images */}
          {artistData?.galleryImages && artistData.galleryImages.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Current Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {artistData.galleryImages.map((image, index) => (
                  <div key={image._id} className="relative">
                    <img 
                      src={image.url} 
                      alt={image.alt} 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => deleteGalleryImage(image._id)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Gallery Image */}
          <div className="space-y-4">
            <h3 className="font-medium">Add New Image</h3>
            
            {galleryPreview && (
              <div className="mb-4">
                <img src={galleryPreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'gallery')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8B7355] file:text-white hover:file:bg-[#7A6349]"
            />

            {galleryImage && (
              <button
                onClick={addGalleryImage}
                disabled={loading}
                className="px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#7A6349] disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add to Gallery'}
              </button>
            )}
          </div>
        </div>

        {/* Visit Store Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Visit Store Section</h2>
          
          {visitStorePreview && (
            <div className="mb-4">
              <img src={visitStorePreview} alt="Visit Store" className="w-full max-w-md h-48 object-cover rounded-lg" />
            </div>
          )}

          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'visitStore')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8B7355] file:text-white hover:file:bg-[#7A6349]"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={visitStoreButtonText}
                onChange={(e) => setVisitStoreButtonText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
              <input
                type="text"
                value={visitStoreButtonLink}
                onChange={(e) => setVisitStoreButtonLink(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              />
            </div>

            <button
              onClick={saveVisitStoreSection}
              disabled={loading}
              className="px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#7A6349] disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Visit Store Section'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ArtistManagementPage
