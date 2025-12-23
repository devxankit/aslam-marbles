const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch Jain Temples page data from the backend
 * @returns {Promise<Object>} The page data
 */
export const fetchJainTemplesData = async () => {
    try {
        const response = await fetch(`${API_URL}/jain-temples`);
        const result = await response.json();

        if (result.success) {
            return result.data;
        } else {
            console.error('Failed to fetch jain temples data:', result.message);
            return null;
        }
    } catch (error) {
        console.error('Error fetching jain temples data:', error);
        return null;
    }
};
