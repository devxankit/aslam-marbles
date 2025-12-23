import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch Trusted By data
 * @returns {Promise<Object>} Trusted By data
 */
export const fetchTrustedByData = async () => {
    try {
        const response = await axios.get(`${API_URL}/trusted-by`);
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error('Failed to fetch trusted by data');
    } catch (error) {
        console.error('Error fetching trusted by data:', error);
        throw error;
    }
};

/**
 * Update heading (Admin only)
 * @param {string} heading - New heading text
 * @param {string} token - Admin authentication token
 * @returns {Promise<Object>} Updated data
 */
export const updateTrustedByHeading = async (heading, token) => {
    try {
        const response = await axios.put(
            `${API_URL}/trusted-by/heading`,
            { heading },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error('Failed to update heading');
    } catch (error) {
        console.error('Error updating heading:', error);
        throw error;
    }
};

/**
 * Add company logo (Admin only)
 * @param {Object} data - Company data {name, logo (base64)}
 * @param {string} token - Admin authentication token
 * @returns {Promise<Object>} Updated data
 */
export const addCompanyLogo = async (data, token) => {
    try {
        const response = await axios.post(
            `${API_URL}/trusted-by/company`,
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error('Failed to add company logo');
    } catch (error) {
        console.error('Error adding company logo:', error);
        throw error;
    }
};

/**
 * Update company logo (Admin only)
 * @param {string} id - Company ID
 * @param {Object} data - Company data {name, logo (base64)}
 * @param {string} token - Admin authentication token
 * @returns {Promise<Object>} Updated data
 */
export const updateCompanyLogo = async (id, data, token) => {
    try {
        const response = await axios.put(
            `${API_URL}/trusted-by/company/${id}`,
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error('Failed to update company logo');
    } catch (error) {
        console.error('Error updating company logo:', error);
        throw error;
    }
};

/**
 * Delete company logo (Admin only)
 * @param {string} id - Company ID
 * @param {string} token - Admin authentication token
 * @returns {Promise<Object>} Updated data
 */
export const deleteCompanyLogo = async (id, token) => {
    try {
        const response = await axios.delete(
            `${API_URL}/trusted-by/company/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error('Failed to delete company logo');
    } catch (error) {
        console.error('Error deleting company logo:', error);
        throw error;
    }
};

/**
 * Reorder companies (Admin only)
 * @param {Array} companies - Array of {id, order}
 * @param {string} token - Admin authentication token
 * @returns {Promise<Object>} Updated data
 */
export const reorderCompanies = async (companies, token) => {
    try {
        const response = await axios.put(
            `${API_URL}/trusted-by/reorder`,
            { companies },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error('Failed to reorder companies');
    } catch (error) {
        console.error('Error reordering companies:', error);
        throw error;
    }
};
