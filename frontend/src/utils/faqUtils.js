const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchFAQs = async (pageKey, location = null) => {
  try {
    let url = `${API_URL}/faqs?pageKey=${pageKey}&isActive=true`;
    if (location) {
      url += `&location=${encodeURIComponent(location)}`;
    }
    console.log(`[faqUtils] Fetching FAQs from: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    console.error('[faqUtils] API returned success: false', data);
    return [];
  } catch (error) {
    console.error('[faqUtils] Error fetching FAQs:', error);
    throw error;
  }
};

export const fetchAllFAQs = async () => {
  try {
    const pageKeys = ['how-it-works', 'murti', 'dream-temple', 'ams-international'];
    const allPromises = pageKeys.map((pageKey) => fetchFAQs(pageKey));

    // Fetch location FAQs for all Indian locations (same list as in backend seeder)
    const indianLocations = [
      'Mumbai',
      'Delhi',
      'Ahmedabad',
      'Kolkata',
      'Pune',
      'Surat',
      'Jaipur',
      'Bengaluru',
      'Hyderabad',
    ];
    const locationPromises = indianLocations.map((location) =>
      fetchFAQs('location', location)
    );

    const allResults = await Promise.all(
      [...allPromises, ...locationPromises].map((p) =>
        p.catch((e) => {
          console.warn('[faqUtils] Failed fetching one FAQ group:', e.message);
          return [];
        })
      )
    );

    const allAggregatedFAQs = [];
    let index = 0;

    // Process page FAQs
    pageKeys.forEach((pageKey) => {
      const result = allResults[index++] || [];
      result.forEach((faq) => {
        allAggregatedFAQs.push({
          ...faq,
          pageKey,
          pageName:
            pageKey
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ') || 'General',
        });
      });
    });

    // Process location FAQs
    indianLocations.forEach((location) => {
      const result = allResults[index++] || [];
      result.forEach((faq) => {
        allAggregatedFAQs.push({
          ...faq,
          pageKey: 'location',
          pageName: `Location (${location})`,
        });
      });
    });

    return allAggregatedFAQs;
  } catch (error) {
    console.error('[faqUtils] Error fetching all FAQs:', error);
    throw error;
  }
};


