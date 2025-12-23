const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'

export const fetchResidentialProjectsData = async () => {
    try {
        const response = await fetch(`${API_URL}/residential-projects`)
        const result = await response.json()

        if (result.success) {
            return result.data
        } else {
            console.error('Failed to fetch residential projects data:', result.message)
            return null
        }
    } catch (error) {
        console.error('Error fetching residential projects data:', error)
        return null
    }
}
