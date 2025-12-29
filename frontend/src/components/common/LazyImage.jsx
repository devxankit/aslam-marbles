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

    // If no valid src, show placeholder
    if (!src || src.trim() === '') {
        return (
            <div className={`relative overflow-hidden bg-gray-100 flex items-center justify-center ${className}`}>
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
        );
    }

    // Generate placeholder (tiny, blurred version) for Cloudinary images
    const placeholderSrc = src?.includes('cloudinary')
        ? optimizeCloudinaryImage(src, { width: 40, quality: 'auto' })
        : src;

    // Generate optimized target src
    const optimizedSrc = src?.includes('cloudinary')
        ? optimizeCloudinaryImage(src, { width: width || 800, quality: 'auto' })
        : src;

    useEffect(() => {
        if (optimizedSrc && optimizedSrc.trim() !== '') {
            setCurrentSrc(optimizedSrc);
        }
    }, [optimizedSrc]);

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ width: width ? 'fit-content' : undefined }}>
            {/* Placeholder Image (Blurred) */}
            {placeholderSrc && placeholderSrc.trim() !== '' && (
                <img
                    src={placeholderSrc}
                    alt={alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 blur-lg scale-110 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
                    aria-hidden="true"
                />
            )}

            {/* Main Image */}
            {currentSrc && currentSrc.trim() !== '' && (
                <img
                    src={currentSrc}
                    alt={alt}
                    width={width}
                    height={height}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imageClassName}`}
                />
            )}
        </div>
    );
};

export default LazyImage;
