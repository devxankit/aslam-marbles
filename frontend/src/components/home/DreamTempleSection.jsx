import React from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTranslation } from '../../contexts/PageTranslationContext'
import dreamTemple1 from '../../assets/locationicons/templecardimages/dreams1.jpeg'
import dreamTemple2 from '../../assets/locationicons/templecardimages/dreams2.jpeg'
import dreamTemple3 from '../../assets/locationicons/templecardimages/dreams3.jpeg'
import dreamTemple4 from '../../assets/locationicons/templecardimages/dreams4.jpeg'
import TranslatedText from '../TranslatedText'

const DreamTempleSection = ({ onOpenPricing }) => {
    const navigate = useNavigate()
    const { getTranslatedText } = usePageTranslation()
    const temples = [
        {
            id: 1,
            image: dreamTemple1,
            size: '3ft Wide',
            price: '2.85L',
            fullPrice: 285000,
            description: '3ft Wide Temples'
        },
        {
            id: 2,
            image: dreamTemple2,
            size: '4ft Wide',
            price: '4.95L',
            fullPrice: 495000,
            description: '4ft Wide Temples'
        },
        {
            id: 3,
            image: dreamTemple3,
            size: '5ft Wide',
            price: '6.95L',
            fullPrice: 695000,
            description: '5ft Wide Temples'
        },
        {
            id: 4,
            image: dreamTemple4,
            size: '6ft Wide &',
            price: '8.95L',
            fullPrice: 895000,
            description: '6ft Wide & Above Temples'
        }
    ]

    return (
        <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-14 lg:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-4 md:mb-5">
                        <TranslatedText>OUR DREAM TEMPLE COLLECTION</TranslatedText>
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        <TranslatedText>Transform your sacred space with our meticulously crafted marble temples, designed to bring peace and divinity into your home.</TranslatedText>
                    </p>
                    <div className="w-24 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: '#8B7355' }}></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12">
                    {temples.map((temple) => (
                        <div
                            key={temple.id}
                            className="group cursor-pointer bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#8B7355] transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 flex flex-col"
                        >
                            {/* Image Container - Slightly smaller height */}
                            <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
                                <img
                                    src={temple.image}
                                    alt={getTranslatedText(temple.description)}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                />
                                {/* Overlay for Buy Now on Mobile or hover */}
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate('/checkout', {
                                                state: {
                                                    items: [{
                                                        id: `temple-home-${temple.id}`,
                                                        name: temple.description,
                                                        image: temple.image,
                                                        price: temple.fullPrice,
                                                        quantity: 1,
                                                        size: temple.size
                                                    }]
                                                }
                                            })
                                        }}
                                        className="bg-white text-[#8B7355] px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform"
                                    >
                                        <TranslatedText>BUY NOW</TranslatedText>
                                    </button>
                                </div>
                            </div>

                            {/* Info Container */}
                            <div className="p-4 md:p-6 bg-white text-center flex-1 flex flex-col justify-center">
                                <p className="text-[10px] md:text-xs font-bold text-[#8B7355] mb-1 uppercase tracking-widest leading-none">
                                    <TranslatedText>Starts at</TranslatedText>
                                </p>
                                <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1 leading-none">
                                    ₹{temple.price}
                                </p>
                                <p className="text-sm md:text-lg font-serif italic text-gray-600 truncate">
                                    <TranslatedText>{temple.size}</TranslatedText>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Understand Pricing Button */}
                <div className="flex justify-center">
                    <button
                        onClick={onOpenPricing}
                        className="group relative px-8 py-4 bg-[#8B7355] text-white text-lg font-bold uppercase tracking-widest rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                        <span className="relative z-10 group-hover:text-[#8B7355] transition-colors duration-300"><TranslatedText>View Pricing</TranslatedText></span>
                        <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default DreamTempleSection
