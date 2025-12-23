import React from 'react';
import { optimizeCloudinaryImage, generateSrcSet } from '../utils/imageOptimization';

/**
 * Optimized Image Component with lazy loading and responsive images
 */
const OptimizedImage = ({
    src,
    alt = '',
    className = '',
    width,
    quality = 'auto',
    ...props
}) => {
    // Optimize the image URL
    const optimizedSrc = optimizeCloudinaryImage(src, { width, quality });

    // Generate srcSet for responsive images
    const srcSet = generateSrcSet(src);

    return (
        <img
            src={optimizedSrc}
            srcSet={srcSet}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={alt}
            className={className}
            loading="lazy"
            decoding="async"
            {...props}
        />
    );
};

export default OptimizedImage;
