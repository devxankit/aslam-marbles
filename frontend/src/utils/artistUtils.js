const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'

export const fetchArtistData = async () => {
  try {
    const response = await fetch(`${API_URL}/artists`)
    const result = await response.json()
    
    if (result.success) {
      return result.data
    } else {
      console.error('Failed to fetch artist data:', result.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching artist data:', error)
    return null
  }
}

export const buildImageUrl = (imagePath) => {
  if (!imagePath) return ''
  
  // If it's already a full URL (Cloudinary), return as is
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // If it's a relative path, build the full URL
  return `${API_URL}/${imagePath.replace(/^\//, '')}`
}
