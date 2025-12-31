import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSelector = ({ variant = 'default' }) => {
    const { language, languages, changeLanguage, isChangingLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentLang = languages[language] || languages['en'];

    const isVideoOverlay = variant === 'video-overlay';

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300
                    text-[11px] uppercase font-bold tracking-wider
                    ${isOpen
                        ? 'border-[#8B8B5C] bg-[#8B8B5C] text-white'
                        : isVideoOverlay
                            ? 'border-white/30 bg-black/20 text-white backdrop-blur-sm hover:border-white'
                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-[#8B8B5C] hover:bg-white'}
                `}
            >
                <span className="text-sm leading-none">{currentLang.flag}</span>
                <span>{currentLang.label}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu - Aligned to touch and overlap slightly for seamless look */}
            <div className={`
                absolute right-0 top-0 w-full min-w-[140px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border transition-all duration-300 z-[300]
                ${isOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
                    : 'opacity-0 -translate-y-2 pointer-events-none scale-95'}
                ${isVideoOverlay
                    ? 'bg-black/95 backdrop-blur-2xl border-white/20'
                    : 'bg-white border-gray-200'}
            `}>
                {/* Active Selection Header (Inside Dropdown) */}
                <div
                    onClick={() => setIsOpen(false)}
                    className={`
                        flex items-center gap-2 px-3 py-1.5 cursor-pointer rounded-t-xl border-b
                        text-[11px] uppercase font-bold tracking-wider
                        ${isVideoOverlay ? 'text-white border-white/10' : 'text-gray-900 border-gray-100'}
                    `}
                >
                    <span className="text-sm leading-none">{currentLang.flag}</span>
                    <span>{currentLang.label}</span>
                    <ChevronDown className="w-3 h-3 rotate-180" />
                </div>

                <div className="p-1 max-h-[350px] overflow-y-auto custom-scrollbar">
                    {Object.entries(languages).map(([code, { label, flag }]) => {
                        const isSelected = language === code;
                        return (
                            <button
                                key={code}
                                onClick={() => {
                                    changeLanguage(code);
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all
                                    ${isSelected
                                        ? 'bg-[#8B8B5C] text-white shadow-lg'
                                        : isVideoOverlay
                                            ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-black'}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-base">{flag}</span>
                                    <span className="text-xs font-semibold">{label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5" />}
                            </button>
                        );
                    })}
                </div>

                {isChangingLanguage && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center rounded-xl z-[301]">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Translating</span>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #8B8B5C;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default LanguageSelector;
