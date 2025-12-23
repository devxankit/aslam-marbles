const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'

export const fetchInternationalProjectsData = async () => {
    try {
        const response = await fetch(`${API_URL}/international-projects`)
        const result = await response.json()

        if (result.success) {
            return result.data
        } else {
            console.error('Failed to fetch international projects data:', result.message)
            return null
        }
    } catch (error) {
        console.error('Error fetching international projects data:', error)
        return null
    }
}
