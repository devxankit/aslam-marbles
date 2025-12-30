/**
 * Image optimization utilities for Cloudinary
 */

/**
 * Optimize Cloudinary image URL with transformations
 * @param {string} url - Original Cloudinary URL
 * @param {object} options - Transformation options
 * @returns {string} Optimized URL
 */
export const optimizeCloudinaryImage = (url, options = {}) => {
    if (!url || !url.includes('cloudinary')) return url;

    const {
        width = 800,
        quality = 'auto',
        format = 'auto',
        crop = 'limit'
    } = options;

    // Add transformations to URL
    const params = `w_${width},q_${quality},f_${format},c_${crop}`;

    // Insert transformations before /upload/
    return url.replace('/upload/', `/upload/${params}/`);
};

/**
 * Get responsive image URLs for different screen sizes
 * @param {string} url - Original Cloudinary URL
 * @returns {object} URLs for different sizes
 */
export const getResponsiveImages = (url) => {
    if (!url || !url.includes('cloudinary')) {
        return {
            mobile: url,
            tablet: url,
            desktop: url,
            original: url
        };
    }

    return {
        mobile: optimizeCloudinaryImage(url, { width: 640 }),
        tablet: optimizeCloudinaryImage(url, { width: 1024 }),
        desktop: optimizeCloudinaryImage(url, { width: 1920 }),
        original: url
    };
};

/**
 * Generate srcSet for responsive images
 * @param {string} url - Original Cloudinary URL
 * @returns {string} srcSet string
 */
export const generateSrcSet = (url) => {
    if (!url || !url.includes('cloudinary')) return '';

    const sizes = [640, 768, 1024, 1280, 1920];

    return sizes
        .map(size => `${optimizeCloudinaryImage(url, { width: size })} ${size}w`)
        .join(', ');
};

/**
 * Optimized Image Component Props
 * @param {string} url - Image URL
 * @param {string} alt - Alt text
 * @returns {object} Props for img tag
 */
export const getOptimizedImageProps = (url, alt = '') => {
    return {
        src: optimizeCloudinaryImage(url),
        srcSet: generateSrcSet(url),
        sizes: '(max-width: 640px)  (max-width: 1024px) 50vw, 33vw',
        alt,
        loading: 'lazy',
        decoding: 'async'
    };
};

export default {
    optimizeCloudinaryImage,
    getResponsiveImages,
    generateSrcSet,
    getOptimizedImageProps
};
