import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const OurArtistManagementPage = () => {
  const [artistData, setArtistData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Image states
  const [heroImage, setHeroImage] = useState(null)
  const [heroPreview, setHeroPreview] = useState('')
  const [visitStoreImage, setVisitStoreImage] = useState(null)
  const [visitStorePreview, setVisitStorePreview] = useState('')
  const [galleryImages, setGalleryImages] = useState([
    { file: null, preview: '', alt: 'Artisan' },
    { file: null, preview: '', alt: 'Artisan' },
    { file: null, preview: '', alt: 'Artisan' },
    { file: null, preview: '', alt: 'Artisan' }
  ])

  // Form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sections, setSections] = useState([
    { content: '' },
    { content: '' },
    { content: '' }
  ])
  const [visitStoreButtonText, setVisitStoreButtonText] = useState('Visit Store')
  const [visitStoreButtonLink, setVisitStoreButtonLink] = useState('/visit-store')

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
        setTitle(data.title || 'Our Artist')
        setDescription(data.description || '')
        
        // Set sections with exactly 3 sections
        if (data.sections && data.sections.length >= 3) {
          setSections([
            { content: data.sections[0]?.content || '' },
            { content: data.sections[1]?.content || '' },
            { content: data.sections[2]?.content || '' }
          ])
        }
        
        setHeroPreview(data.heroImage?.url || '')
        setVisitStorePreview(data.visitStoreSection?.image?.url || '')
        setVisitStoreButtonText(data.visitStoreSection?.buttonText || 'Visit Store')
        setVisitStoreButtonLink(data.visitStoreSection?.buttonLink || '/visit-store')
        
        // Populate gallery images state with existing data
        if (data.galleryImages && data.galleryImages.length > 0) {
          const updatedGallery = [...galleryImages]
          data.galleryImages.forEach((img, index) => {
            if (index < updatedGallery.length) {
              updatedGallery[index].alt = img.alt || 'Artisan'
            }
          })
          setGalleryImages(updatedGallery)
        }
      }
    } catch (error) {
      console.error('Error fetching artist data:', error)
      setMessage({ type: 'error', text: 'Failed to load artist data' })
    } finally {
      setFetching(false)
    }
  }

  const handleImageChange = (e, type, index = null) => {
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
        } else if (type === 'gallery' && index !== null) {
          const updatedGallery = [...galleryImages]
          updatedGallery[index].file = file
          updatedGallery[index].preview = reader.result
          setGalleryImages(updatedGallery)
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
          sections: sections.map((section, index) => ({
            content: section.content,
            order: index
          }))
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

  const saveContentSections = async () => {
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
          sections: sections.map((section, index) => ({
            content: section.content,
            order: index
          }))
        })
      })
      
      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Content sections updated successfully!' })
        setArtistData(result.data)
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update content sections' })
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

  const saveGalleryImage = async (index) => {
    const imageFile = galleryImages[index].file
    if (!imageFile) return
    
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', imageFile)
      formData.append('alt', galleryImages[index].alt)
      formData.append('order', index)
      
      const res = await fetch(`${API_URL}/artists/gallery`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      
      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: `Gallery image ${index + 1} updated successfully!` })
        setArtistData(result.data)
        
        // Reset the file input
        const updatedGallery = [...galleryImages]
        updatedGallery[index].file = null
        updatedGallery[index].preview = ''
        setGalleryImages(updatedGallery)
      } else {
        setMessage({ type: 'error', text: result.message || `Failed to update gallery image ${index + 1}` })
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
        <h1 className="text-2xl font-bold text-gray-800">Our Artist Page Management</h1>

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
          
          <div className="mb-4">
            <img 
              src={heroPreview || artistData?.heroImage?.url || ''} 
              alt="Hero" 
              className="w-full max-w-md h-48 object-cover rounded-lg" 
            />
          </div>

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
          <h2 className="text-xl font-semibold mb-4">Content Sections</h2>
          
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-2">Section {index + 1}</h3>
                
                <div className="space-y-2">
                  <textarea
                    placeholder={`Section ${index + 1} Content`}
                    value={section.content}
                    onChange={(e) => {
                      const updatedSections = [...sections]
                      updatedSections[index].content = e.target.value
                      setSections(updatedSections)
                    }}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                  />
                </div>
              </div>
            ))}
            
            <button
              onClick={saveContentSections}
              disabled={loading}
              className="px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#7A6349] disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Content Sections'}
            </button>
          </div>
        </div>

        {/* Gallery Images */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Gallery Images</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-medium">Gallery Image {index + 1}</h3>
                
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group">
                  {image.preview ? (
                    <img src={image.preview} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                  ) : artistData?.galleryImages?.[index]?.url ? (
                    <img src={artistData.galleryImages[index].url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">No image selected</div>
                  )}
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Change Image
                    <input type="file" className="hidden" onChange={(e) => handleImageChange(e, 'gallery', index)} accept="image/*" />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => {
                      const updatedGallery = [...galleryImages]
                      updatedGallery[index].alt = e.target.value
                      setGalleryImages(updatedGallery)
                    }}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none"
                    placeholder="Enter alt text"
                  />
                </div>

                {image.file && (
                  <button
                    onClick={() => saveGalleryImage(index)}
                    disabled={loading}
                    className="w-full bg-[#8B7355] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#6B5A42] transition-colors text-sm"
                  >
                    {loading ? 'Uploading...' : 'Save Image'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Visit Store Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Visit Store Section</h2>
          
          <div className="mb-4">
            <img 
              src={visitStorePreview || artistData?.visitStoreSection?.image?.url || ''} 
              alt="Visit Store" 
              className="w-full max-w-md h-48 object-cover rounded-lg" 
            />
          </div>

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

export default OurArtistManagementPage