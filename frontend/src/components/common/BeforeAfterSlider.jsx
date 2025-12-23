import React, { useState, useRef, useEffect } from 'react';

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef(null);

    const startResizing = () => {
        setIsResizing(true);
    };

    const stopResizing = () => {
        setIsResizing(false);
    };

    const onMouseMove = (e) => {
        if (!isResizing || !containerRef.current) return;

        // Support both mouse and touch events
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        if (!clientX) return;

        const { left, width } = containerRef.current.getBoundingClientRect();
        const position = ((clientX - left) / width) * 100;

        setSliderPosition(Math.min(Math.max(position, 0), 100));
    };

    useEffect(() => {
        const handleUp = () => stopResizing();

        window.addEventListener('mouseup', handleUp);
        window.addEventListener('touchend', handleUp);

        return () => {
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchend', handleUp);
        };
    }, []);

    return (
        <div
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
            ref={containerRef}
            onMouseDown={startResizing}
            onTouchStart={startResizing}
            onMouseMove={onMouseMove}
            onTouchMove={onMouseMove}
        >
            {/* After Image (Background) */}
            <img
                src={afterImage}
                alt="After"
                className="absolute top-0 left-0 w-full h-full object-cover"
                draggable="false"
            />

            {/* Before Image (Foreground - Clipped) */}
            <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    className="absolute top-0 left-0 max-w-none h-full object-cover"
                    style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
                    draggable="false"
                />
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/30 backdrop-blur-md rounded-full border-2 border-white flex items-center justify-center shadow-lg transform -translate-x-1/2">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" transform="translate(-4, 0)" />
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" transform="translate(4, 0)" />
                    </svg>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm font-bold backdrop-blur-sm pointer-events-none">
                BEFORE
            </div>
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm font-bold backdrop-blur-sm pointer-events-none">
                AFTER
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
