import React from 'react'
import dreamTemple1 from '../../assets/locationicons/templecardimages/dreams1.jpeg'
import dreamTemple2 from '../../assets/locationicons/templecardimages/dreams2.jpeg'
import dreamTemple3 from '../../assets/locationicons/templecardimages/dreams3.jpeg'
import dreamTemple4 from '../../assets/locationicons/templecardimages/dreams4.jpeg'

const DreamTempleSection = ({ onOpenPricing }) => {
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
                        OUR DREAM TEMPLE COLLECTION
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Transform your sacred space with our meticulously crafted marble temples, designed to bring peace and divinity into your home.
                    </p>
                    <div className="w-24 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: '#8B7355' }}></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
                    {temples.map((temple) => (
                        <div
                            key={temple.id}
                            className="group cursor-pointer bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#8B7355] transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2"
                        >
                            {/* Image Container */}
                            <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden bg-gray-100">
                                <img
                                    src={temple.image}
                                    alt={temple.description}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-125"
                                />
                                {/* Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                {/* Price Badge */}
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                    <span className="text-sm font-bold" style={{ color: '#8B7355' }}>INR {temple.price}</span>
                                </div>
                            </div>

                            {/* Info Container */}
                            <div className="p-5 md:p-6 bg-white">
                                <div className="mb-2">
                                    <p className="text-xs md:text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">
                                        Starting at
                                    </p>
                                    <p className="text-lg md:text-xl font-bold text-black mb-2 group-hover:text-[#8B7355] transition-colors duration-300">
                                        INR {temple.price}
                                    </p>
                                    <p className="text-base md:text-lg font-semibold text-gray-800">
                                        {temple.description}
                                    </p>
                                </div>
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
                        <span className="relative z-10 group-hover:text-[#8B7355] transition-colors duration-300">Understand Pricing</span>
                        <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default DreamTempleSection
