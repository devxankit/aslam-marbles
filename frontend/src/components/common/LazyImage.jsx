import { useState, useEffect } from 'react';
import { optimizeCloudinaryImage } from '../../utils/imageOptimization';

const LazyImage = ({
    src,
    alt,
    className = '',
    imageClassName = '',
    width,
    height,
    priority = false
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState('');

    // Generate placeholder (tiny, blurred version) for Cloudinary images
    const placeholderSrc = src?.includes('cloudinary')
        ? optimizeCloudinaryImage(src, { width: 40, quality: 'auto' })
        : src; // For local/other images, use original as placeholder (or a generic one if we had it)

    // Generate optimized target src
    // If width is provided, ask Cloudinary for that specific width
    const optimizedSrc = src?.includes('cloudinary')
        ? optimizeCloudinaryImage(src, { width: width || 800, quality: 'auto' })
        : src;

    useEffect(() => {
        // If priority is true, load immediately. Otherwise, native lazy loading handles fetching,
        // but we can pre-set the src to the optimized one.
        setCurrentSrc(optimizedSrc);
    }, [optimizedSrc]);

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ width: width ? 'fit-content' : undefined }}>
            {/* Placeholder Image (Blurred) */}
            <img
                src={placeholderSrc}
                alt={alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 blur-lg scale-110 ${isLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
                aria-hidden="true"
            />

            {/* Main Image */}
            <img
                src={currentSrc}
                alt={alt}
                width={width}
                height={height}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    } ${imageClassName}`}
            />
        </div>
    );
};

export default LazyImage;
