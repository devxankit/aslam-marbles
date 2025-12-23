import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch HomePage data from the backend
 * @returns {Promise<Object>} HomePage data
 */
export const fetchHomePageData = async () => {
    try {
        const response = await axios.get(`${API_URL}/home-page`);
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error('Failed to fetch home page data');
    } catch (error) {
        console.error('Error fetching home page data:', error);
        throw error;
    }
};

/**
 * Update HomePage data (Admin only)
 * @param {Object} data - HomePage data to update
 * @param {string} token - Admin authentication token
 * @returns {Promise<Object>} Updated HomePage data
 */
export const updateHomePageData = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/home-page`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error('Failed to update home page data');
    } catch (error) {
        console.error('Error updating home page data:', error);
        throw error;
    }
};

/**
 * Upload video to HomePage videos section (Admin only)
 * @param {string} videoFile - Base64 encoded video file
 * @param {string} token - Admin authentication token
 * @returns {Promise<Object>} Updated videos section
 */
export const uploadHomePageVideo = async (videoFile, token) => {
    try {
        const response = await axios.post(`${API_URL}/home-page/videos`,
            { videoFile },
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
        throw new Error('Failed to upload video');
    } catch (error) {
        console.error('Error uploading video:', error);
        throw error;
    }
};

/**
 * Delete video from HomePage videos section (Admin only)
 * @param {string} publicId - Cloudinary public ID of the video
 * @param {string} token - Admin authentication token
 * @returns {Promise<Object>} Success message
 */
export const deleteHomePageVideo = async (publicId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/home-page/videos/${publicId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.data.success) {
            return response.data;
        }
        throw new Error('Failed to delete video');
    } catch (error) {
        console.error('Error deleting video:', error);
        throw error;
    }
};

/**
 * Update before/after images (Admin only)
 * @param {Object} data - Before/after images data
 * @param {string} token - Admin authentication token
 * @returns {Promise<Object>} Updated before/after section
 */
export const updateBeforeAfterImages = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/home-page/before-after`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error('Failed to update before/after images');
    } catch (error) {
        console.error('Error updating before/after images:', error);
        throw error;
    }
};

/**
 * Update completed projects section (Admin only)
 * @param {Object} data - Completed projects section data
 * @param {string} token - Admin authentication token
 * @returns {Promise<Object>} Updated completed projects section
 */
export const updateCompletedProjects = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/home-page/completed-projects`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error('Failed to update completed projects section');
    } catch (error) {
        console.error('Error updating completed projects section:', error);
        throw error;
    }
};

/**
 * Update hero section (Admin only)
 * @param {Object} data - Hero section data (video, mainHeading, subHeading, supplierText)
 * @param {string} token - Admin authentication token
 * @returns {Promise<Object>} Updated hero section
 */
export const updateHeroSection = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/home-page/hero-section`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error('Failed to update hero section');
    } catch (error) {
        console.error('Error updating hero section:', error);
        throw error;
    }
};
