import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const ResidentialProjectsManagementPage = () => {
  const [residentialData, setResidentialData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Form states
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')
  const [sectionTitle, setSectionTitle] = useState('')
  const [sectionDescription, setSectionDescription] = useState('')

  // Image states
  const [heroImage, setHeroImage] = useState(null)
  const [heroPreview, setHeroPreview] = useState('')
  const [galleryImage, setGalleryImage] = useState(null)
  const [galleryPreview, setGalleryPreview] = useState('')

  // Gallery image form states
  const [imageTitle, setImageTitle] = useState('')
  const [imageDescription, setImageDescription] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [imageLocation, setImageLocation] = useState('')
  const [imageAddress, setImageAddress] = useState('')
  const [imageClient, setImageClient] = useState('')
  const [imageDuration, setImageDuration] = useState('')

  // Edit states
  const [editingImage, setEditingImage] = useState(null)
  const [showAddImageForm, setShowAddImageForm] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    fetchResidentialData()
  }, [])

  const fetchResidentialData = async () => {
    try {
      setFetching(true)
      const res = await fetch(`${API_URL}/residential-projects`)
      if (res.status === 404) {
        // If 404, we might not have initialized data yet. 
        // Similar to communal projects logic, but communal logic handled it inside getCommunalProjectsData if not found? 
        // No, controller returns 404. We should handle it gracefully here so user can "Create" it by saving.
        setResidentialData({ galleryImages: [] })
        setFetching(false)
        return
      }
      const result = await res.json()

      if (result.success && result.data) {
        const data = result.data
        setResidentialData(data)
        setTitle(data.title || '')
        setSubtitle(data.subtitle || '')
        setDescription(data.description || '')
        setSectionTitle(data.sectionTitle || '')
        setSectionDescription(data.sectionDescription || '')
        setHeroPreview(data.heroImage?.url || '')
      }
    } catch (error) {
      console.error('Error fetching residential projects data:', error)
      setMessage({ type: 'error', text: 'Failed to load residential projects data' })
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
      const res = await fetch(`${API_URL}/residential-projects`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          subtitle,
          description,
          sectionTitle,
          sectionDescription
        })
      })

      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Basic information updated successfully!' })
        setResidentialData(result.data)
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
      formData.append('alt', 'Residential Projects Hero')

      const res = await fetch(`${API_URL}/residential-projects/hero-image`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Hero image updated successfully!' })
        setResidentialData(result.data)
        setHeroImage(null)
        setHeroPreview(result.data.heroImage?.url || '')
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update hero image' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    } finally {
      setLoading(false)
    }
  }

  const resetFormOnly = () => {
    setGalleryImage(null)
    setGalleryPreview('')
    setImageTitle('')
    setImageDescription('')
    setImageAlt('')
    setImageLocation('')
    setImageAddress('')
    setImageClient('')
    setImageDuration('')
  }

  const addGalleryImage = async () => {
    if (!galleryImage) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', galleryImage)
      formData.append('title', imageTitle || 'Residential Project')
      formData.append('description', imageDescription || 'A beautiful residential project.')
      formData.append('alt', imageAlt || 'Residential Project')
      formData.append('location', imageLocation)
      formData.append('address', imageAddress)
      formData.append('client', imageClient)
      formData.append('duration', imageDuration)

      const res = await fetch(`${API_URL}/residential-projects/gallery-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Gallery image added successfully!' })
        setResidentialData(result.data)
        resetFormOnly()
        setShowAddImageForm(false)
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to add gallery image' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    } finally {
      setLoading(false)
    }
  }

  const updateGalleryImage = async (imageId) => {
    setLoading(true)
    try {
      const formData = new FormData()
      if (galleryImage) {
        formData.append('image', galleryImage)
      }
      formData.append('title', imageTitle)
      formData.append('description', imageDescription)
      formData.append('alt', imageAlt)
      formData.append('location', imageLocation)
      formData.append('address', imageAddress)
      formData.append('client', imageClient)
      formData.append('duration', imageDuration)

      const res = await fetch(`${API_URL}/residential-projects/gallery-image/${imageId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Gallery image updated successfully!' })
        setResidentialData(result.data)
        setEditingImage(null)
        resetFormOnly()
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update gallery image' })
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
      const res = await fetch(`${API_URL}/residential-projects/gallery-image/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Gallery image deleted successfully!' })
        setResidentialData(result.data)
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to delete gallery image' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    } finally {
      setLoading(false)
    }
  }

  const startEditImage = (image) => {
    setEditingImage(image)
    setImageTitle(image.title)
    setImageDescription(image.description)
    setImageAlt(image.alt)
    setImageLocation(image.location || '')
    setImageAddress(image.address || '')
    setImageClient(image.client || '')
    setImageDuration(image.duration || '')
    setGalleryPreview(image.url)
  }

  if (fetching) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading residential projects data...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Residential Projects Management</h1>

        {/* Message Display */}
        {message.text && (
          <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Page Content</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
              <textarea
                value={sectionDescription}
                onChange={(e) => setSectionDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              />
            </div>

            <button
              onClick={saveBasicInfo}
              disabled={loading}
              className="px-6 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#7A6349] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving Content...
                </span>
              ) : (
                '💾 Save Content'
              )}
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
                className="px-6 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#7A6349] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading Image...
                  </span>
                ) : (
                  '💾 Save Hero Image'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Gallery Images */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Gallery Images</h2>
            <button
              onClick={() => {
                if (showAddImageForm) {
                  resetFormOnly()
                  setShowAddImageForm(false)
                } else {
                  resetFormOnly()
                  setShowAddImageForm(true)
                }
              }}
              className={`px-6 py-2 rounded-lg font-medium transition-colors shadow-lg ${showAddImageForm
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
                }`}
            >
              {showAddImageForm ? '❌ Cancel' : '➕ Add New Image'}
            </button>
          </div>

          {/* Add Image Form */}
          {showAddImageForm && (
            <div className="mb-6 p-6 border-2 border-[#8B7355] rounded-lg bg-gradient-to-br from-[#8B7355]/5 to-[#8B7355]/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#8B7355]">Add New Gallery Image</h3>
                <button
                  onClick={() => {
                    setShowAddImageForm(false)
                    resetFormOnly()
                  }}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  ×
                </button>
              </div>

              {galleryPreview && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                  <img src={galleryPreview} alt="Preview" className="w-48 h-32 object-cover rounded-lg border-2 border-gray-200" />
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'gallery')}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8B7355] file:text-white hover:file:bg-[#7A6349] file:cursor-pointer"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image Title</label>
                    <input
                      type="text"
                      placeholder="e.g., 'Modern Villa'"
                      value={imageTitle}
                      onChange={(e) => setImageTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="e.g., 'Udaipur, Rajasthan'"
                      value={imageLocation}
                      onChange={(e) => setImageLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    placeholder="Full address of the project"
                    value={imageAddress}
                    onChange={(e) => setImageAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                    <input
                      type="text"
                      placeholder="e.g., 'Private Client'"
                      value={imageClient}
                      onChange={(e) => setImageClient(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g., '1 Year'"
                      value={imageDuration}
                      onChange={(e) => setImageDuration(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image Description</label>
                  <textarea
                    placeholder="Describe this project..."
                    value={imageDescription}
                    onChange={(e) => setImageDescription(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
                  <input
                    type="text"
                    placeholder="Accessibility text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setShowAddImageForm(false)
                      resetFormOnly()
                    }}
                    className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addGalleryImage}
                    disabled={loading || !galleryImage}
                    className="flex-1 px-4 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#7A6349] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving Image...
                      </span>
                    ) : (
                      '💾 Save Image'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Current Gallery Images */}
          {residentialData?.galleryImages && residentialData.galleryImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {residentialData.galleryImages.map((image, index) => (
                <div key={image._id} className="border border-gray-200 rounded-lg p-4">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-medium text-sm mb-1">{image.title}</h4>
                  <p className="text-xs text-gray-500"><strong>Loc:</strong> {image.location || 'N/A'}</p>
                  <p className="text-xs text-gray-500"><strong>Client:</strong> {image.client || 'N/A'}</p>
                  <p className="text-xs text-gray-600 mb-3 mt-1 line-clamp-2">{image.description}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditImage(image)}
                      className="flex-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteGalleryImage(image._id)}
                      className="flex-1 px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No gallery images found. Add some images to get started.</p>
            </div>
          )}
        </div>

        {/* Edit Image Modal */}
        {editingImage && (
          <div
            className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setEditingImage(null)
                resetFormOnly()
              }
            }}
          >
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Edit Gallery Image</h3>
                  <button
                    onClick={() => {
                      setEditingImage(null)
                      resetFormOnly()
                    }}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold transition-colors"
                  >
                    ×
                  </button>
                </div>

                {galleryPreview && (
                  <div className="mb-4">
                    <img src={galleryPreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                  </div>
                )}

                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'gallery')}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8B7355] file:text-white hover:file:bg-[#7A6349]"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Image Title"
                        value={imageTitle}
                        onChange={(e) => setImageTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Location"
                        value={imageLocation}
                        onChange={(e) => setImageLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Address"
                    value={imageAddress}
                    onChange={(e) => setImageAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Client"
                        value={imageClient}
                        onChange={(e) => setImageClient(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Duration"
                        value={imageDuration}
                        onChange={(e) => setImageDuration(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                      />
                    </div>
                  </div>

                  <textarea
                    placeholder="Image Description"
                    value={imageDescription}
                    onChange={(e) => setImageDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                  />

                  <input
                    type="text"
                    placeholder="Alt Text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditingImage(null)
                        resetFormOnly()
                      }}
                      className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => updateGalleryImage(editingImage._id)}
                      disabled={loading}
                      className="flex-1 px-4 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#7A6349] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-lg"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving Changes...
                        </span>
                      ) : (
                        '💾 Save Changes'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default ResidentialProjectsManagementPage
