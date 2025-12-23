const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_ORIGIN = API_URL.replace(/\/api$/, '');

export const buildImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_ORIGIN}${imagePath}`;
};

export const fetchNavItems = async (group, onlyActive = true) => {
  if (!group) return [];
  try {
    const params = new URLSearchParams({ group });
    if (onlyActive) params.set('isActive', 'true');
    const res = await fetch(`${API_URL}/nav-items?${params.toString()}`);
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to fetch items');
    }
    return data.data || [];
  } catch (error) {
    console.error('[navItems] fetch error:', error);
    return [];
  }
};

export const fetchAslamHouseItems = async () => {
  try {
    return await fetchNavItems('aslam-house', true);
  } catch (error) {
    console.error('[aslamHouseUtils] fetch error:', error);
    return [];
  }
};

