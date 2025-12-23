const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchTestimonials = async () => {
  try {
    const url = `${API_URL}/testimonials?isActive=true`;
    console.log(`[testimonialUtils] Fetching testimonials from: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    console.error('[testimonialUtils] API returned success: false', data);
    return [];
  } catch (error) {
    console.error('[testimonialUtils] Error fetching testimonials:', error);
    throw error;
  }
};

