const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'

export const fetchOurClientsData = async () => {
  try {
    const response = await fetch(`${API_URL}/our-clients`)
    const result = await response.json()
    
    if (result.success) {
      return result.data
    }
    
    return null
  } catch (error) {
    console.error('Error fetching our clients data:', error)
    return null
  }
}
