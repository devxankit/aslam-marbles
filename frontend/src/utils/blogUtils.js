const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchBlogs = async () => {
  try {
    const url = `${API_URL}/blogs?isActive=true`;
    console.log(`[blogUtils] Fetching blogs from: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    console.error('[blogUtils] API returned success: false', data);
    return [];
  } catch (error) {
    console.error('[blogUtils] Error fetching blogs:', error);
    throw error;
  }
};

export const fetchBlogById = async (id) => {
  try {
    const url = `${API_URL}/blogs/${id}`;
    console.log(`[blogUtils] Fetching blog by ID from: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    console.error('[blogUtils] API returned success: false', data);
    return null;
  } catch (error) {
    console.error('[blogUtils] Error fetching blog by ID:', error);
    throw error;
  }
};

