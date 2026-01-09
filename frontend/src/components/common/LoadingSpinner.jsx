import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-[#8B7355] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[#8B7355] font-serif italic text-lg animate-pulse">Loading Masterpieces...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
