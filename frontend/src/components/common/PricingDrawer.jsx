import React, { useEffect, useState } from 'react'
import pricingImage from '../../assets/pricing_tiers.png'
import dreamTemple1 from '../../assets/locationicons/templecardimages/dreams1.jpeg'

const PricingDrawer = ({ isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            document.body.style.overflow = 'hidden'
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300)
            document.body.style.overflow = 'unset'
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    if (!isVisible && !isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 w-full md:w-[600px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6 md:p-8 space-y-8">
                    {/* Header Image */}
                    <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-lg relative bg-gray-50 flex items-center justify-center">
                        {/* As requested: "isme jo image ka option he usme ek image lga do first temple image" 
                           I will display the first dream temple image here.
                           I am keeping the pricing tiers image import but using dreamTemple1 as requested.
                       */}
                        <img
                            src={dreamTemple1}
                            alt="Temple Sanctuary"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Caption Section */}
                    <div className="text-center space-y-4">
                        <h3 className="text-2xl font-serif text-[#8B7355] italic">Where Elegance Meets Devotion</h3>
                        <h4 className="text-xl font-serif text-[#8B7355] italic">A Glimpse Into Our Pricing Philosophy</h4>
                        <div className="w-16 h-1 bg-[#8B7355] mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base text-justify">
                        <p>
                            At Tilak Stone Arts, each temple and pooja room is a masterpiece, designed to bring peace and sanctity to your home. Our pricing reflects the custom craftsmanship, premium materials, and unparalleled artistry that go into creating a sacred space tailored exclusively for you.
                        </p>
                        <p>
                            We understand that investing in a marble temple or pooja room is a decision steeped in both emotion and tradition. Here's an overview of how our pricing is structured, what’s included, and the value you receive.
                        </p>
                    </div>

                    {/* Pricing Tiers Content */}
                    <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h5 className="text-lg font-serif text-[#8B7355] italic border-b border-gray-200 pb-2 mb-4">Our Service Plans</h5>

                        {/* Tier 1 */}
                        <div className="space-y-4 border-b border-gray-200 pb-6 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full border-2 border-[#8B7355] flex items-center justify-center text-[#8B7355]">
                                    <div className="w-3 h-3 bg-[#8B7355] rounded-full"></div>
                                </div>
                                <h6 className="font-bold text-[#8B7355] text-lg uppercase">Elegant Essentials</h6>
                            </div>
                            <div className="pl-11">
                                <p className="text-sm text-gray-600 mb-4">
                                    Perfect for compact spaces with a focus on simplicity and functionality (Est. ₹2-5 Lakh).
                                </p>
                                <button
                                    onClick={() => {
                                        onClose();
                                        window.location.href = '/checkout'; // Or use navigate if possible, but PricingDrawer might not have it
                                    }}
                                    className="px-6 py-2 bg-[#8B7355] text-white text-xs font-bold rounded-full hover:opacity-90 transition-all uppercase tracking-widest"
                                >
                                    Select Plan
                                </button>
                            </div>
                        </div>

                        {/* Tier 2 */}
                        <div className="space-y-4 border-b border-gray-200 pb-6 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rotate-45 border-2 border-[#8B7355] flex items-center justify-center text-[#8B7355]">
                                    <div className="w-3 h-3 bg-[#8B7355] transform"></div>
                                </div>
                                <h6 className="font-bold text-[#8B7355] text-lg uppercase">Signature Designs</h6>
                            </div>
                            <div className="pl-11">
                                <p className="text-sm text-gray-600 mb-4">
                                    Mid-sized temples featuring moderate detailing and premium materials (Est. ₹12-50 Lakh).
                                </p>
                                <button
                                    onClick={() => {
                                        onClose();
                                        window.location.href = '/checkout';
                                    }}
                                    className="px-6 py-2 bg-[#8B7355] text-white text-xs font-bold rounded-full hover:opacity-90 transition-all uppercase tracking-widest"
                                >
                                    Select Plan
                                </button>
                            </div>
                        </div>

                        {/* Tier 3 */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[28px] border-b-[#8B7355] relative top-[-4px]"></div>
                                <h6 className="font-bold text-[#8B7355] text-lg uppercase">Bespoke Masterpieces</h6>
                            </div>
                            <div className="pl-11">
                                <p className="text-sm text-gray-600 mb-4">
                                    Grandeur redefined with intricate carvings and custom features (Est. ₹50 Lakh+).
                                </p>
                                <button
                                    onClick={() => {
                                        onClose();
                                        window.location.href = '/checkout';
                                    }}
                                    className="px-6 py-2 bg-[#8B7355] text-white text-xs font-bold rounded-full hover:opacity-90 transition-all uppercase tracking-widest"
                                >
                                    Select Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PricingDrawer
