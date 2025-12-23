const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch Communal Temples page data from the backend
 * @returns {Promise<Object>} The page data
 */
export const fetchCommunalTemplesData = async () => {
    try {
        const response = await fetch(`${API_URL}/communal-temples`);
        const result = await response.json();

        if (result.success) {
            return result.data;
        } else {
            console.error('Failed to fetch communal temples data:', result.message);
            return null;
        }
    } catch (error) {
        console.error('Error fetching communal temples data:', error);
        return null;
    }
};
