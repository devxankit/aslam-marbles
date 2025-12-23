import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const OurClientsManagementPage = () => {
  const [ourClientsData, setOurClientsData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Form states
  const [title, setTitle] = useState('Our Valued Clients')
  const [contentSections, setContentSections] = useState([
    { content: '' },
    { content: '' }
  ])

  // Heading images state
  const [headingImages, setHeadingImages] = useState([])
  const [newHeadingImage, setNewHeadingImage] = useState(null)
  const [newHeadingImagePreview, setNewHeadingImagePreview] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    fetchOurClientsData()
  }, [])

  const fetchOurClientsData = async () => {
    try {
      const res = await fetch(`${API_URL}/our-clients`)
      const result = await res.json()
      
      if (result.success && result.data) {
        const data = result.data
        setOurClientsData(data)
        setTitle(data.title || 'Our Valued Clients')
        
        // Set content sections
        if (data.contentSections && data.contentSections.length >= 2) {
          setContentSections([
            { content: data.contentSections[0]?.content || '' },
            { content: data.contentSections[1]?.content || '' }
          ])
        }
        
        // Set heading images
        setHeadingImages(data.headingImages || [])
      }
    } catch (error) {
      console.error('Error fetching our clients data:', error)
      setMessage({ type: 'error', text: 'Failed to load our clients data' })
    } finally {
      setFetching(false)
    }
  }

  const handleNewHeadingImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewHeadingImage(file)
        setNewHeadingImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const saveContentAndTitle = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/our-clients`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          contentSections: contentSections.map((section, index) => ({
            content: section.content,
            order: index + 1
          }))
        })
      })
      
      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Title and content updated successfully!' })
        setOurClientsData(result.data)
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update content' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    } finally {
      setLoading(false)
    }
  }

  const addHeadingImage = async () => {
    if (!newHeadingImage) {
      setMessage({ type: 'error', text: 'Please select an image first' })
      return
    }
    
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', newHeadingImage)
      formData.append('alt', 'Our Clients')
      formData.append('order', headingImages.length + 1)
      
      const res = await fetch(`${API_URL}/our-clients/heading-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      
      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Heading image added successfully!' })
        setOurClientsData(result.data)
        setHeadingImages(result.data.headingImages || [])
        setNewHeadingImage(null)
        setNewHeadingImagePreview('')
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to add heading image' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    } finally {
      setLoading(false)
    }
  }

  const deleteHeadingImage = async (imageId) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/our-clients/heading-image/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const result = await res.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Heading image deleted successfully!' })
        setOurClientsData(result.data)
        setHeadingImages(result.data.headingImages || [])
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to delete heading image' })
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
            <p className="mt-4 text-gray-600">Loading our clients data...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Our Clients Page Management</h1>

        {/* Message Display */}
        {message.text && (
          <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        {/* Title and Content Sections */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Title and Content</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                placeholder="Our Valued Clients"
              />
            </div>

            {contentSections.map((section, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Section {index + 1}
                </label>
                <textarea
                  value={section.content}
                  onChange={(e) => {
                    const updatedSections = [...contentSections]
                    updatedSections[index].content = e.target.value
                    setContentSections(updatedSections)
                  }}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                  placeholder={`Enter content for section ${index + 1}`}
                />
              </div>
            ))}

            <button
              onClick={saveContentAndTitle}
              disabled={loading}
              className="px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#7A6349] disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Title & Content'}
            </button>
          </div>
        </div>

        {/* Heading Images (Carousel) */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Heading Images (Carousel)</h2>
          
          {/* Current Images */}
          {headingImages.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3">Current Images ({headingImages.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {headingImages.map((image, index) => (
                  <div key={image._id} className="relative border rounded-lg overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.alt} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => deleteHeadingImage(image._id)}
                        className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 shadow-lg font-bold text-xl"
                        title="Delete image"
                      >
                        ×
                      </button>
                    </div>
                    <div className="p-2 bg-gray-50">
                      <p className="text-sm text-gray-600">Order: {image.order || index + 1}</p>
                      <p className="text-sm text-gray-600">Alt: {image.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Image */}
          <div className="border-t pt-6">
            <h3 className="font-medium mb-3">Add New Image</h3>
            
            <div className="space-y-4">
              {newHeadingImagePreview && (
                <div className="relative w-full max-w-md h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img 
                    src={newHeadingImagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleNewHeadingImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8B7355] file:text-white hover:file:bg-[#7A6349]"
                />
              </div>

              {newHeadingImage && (
                <button
                  onClick={addHeadingImage}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Image to Carousel'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default OurClientsManagementPage
