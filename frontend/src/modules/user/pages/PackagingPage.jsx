import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import HeroSectionWithForm from '../../../components/common/HeroSectionWithForm'
import heroImg from '../../../assets/ourcreation/Pooja.jpeg'
import TranslatedText from '../../../components/TranslatedText'

// Category Images
import slabImg from '../../../assets/packaging/slab.png'
import tilesImg from '../../../assets/packaging/tiles.png'
import artifactsImg from '../../../assets/packaging/artifacts.png'
import otherImg from '../../../assets/packaging/other.png'

const PackagingPage = ({
    onShowSidebar,
    onShowProjects,
    onShowCreations,
    onShowProducts,
    onShowServices,
    onShowHowItWorks,
    onShowLocation,
    onShowBooking
}) => {
    const navigate = useNavigate()

    const categories = [
        { id: 'packaging-slab', name: 'Slab', image: slabImg },
        { id: 'packaging-tiles', name: 'Tiles', image: tilesImg },
        { id: 'packaging-artifacts', name: 'Artifacts', image: artifactsImg },
        { id: 'packaging-other', name: 'Other', image: otherImg },
    ]

    return (
        <div className="w-full min-h-screen bg-white">
            <Header
                variant="default"
                onShowSidebar={onShowSidebar}
                onShowProjects={onShowProjects}
                onShowCreations={onShowCreations}
                onShowProducts={onShowProducts}
                onShowServices={onShowServices}
                onShowHowItWorks={onShowHowItWorks}
                onShowLocation={onShowLocation}
                onShowBooking={onShowBooking}
            />

            <HeroSectionWithForm
                source="packaging-page"
                heroImage={heroImg}
                title="PACKAGING"
                subtitle="Secure & Premium Packaging Standards"
                description="We ensure that every masterpiece reaches you safely with our international standard packaging."
            />

            {/* Packaging Categories Section */}
            <section className="py-20 px-4 md:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-[#8B7355] uppercase bg-[#8B7355]/5 rounded-full">
                            <TranslatedText>Our Standards</TranslatedText>
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 italic mb-6">
                            <TranslatedText>Tailored Packaging for Every Masterpiece</TranslatedText>
                        </h2>
                        <div className="w-24 h-1 mx-auto bg-[#8B7355] rounded-full opacity-60"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                onClick={() => navigate(`/art/packaging/${cat.id}`)}
                                className="group relative cursor-pointer bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(139,115,85,0.15)] transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                    <h3 className="text-2xl font-serif text-white italic drop-shadow-lg mb-2">
                                        {cat.name}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                        <span className="h-[1px] w-8 bg-white/60"></span>
                                        <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]"><TranslatedText>View Gallery</TranslatedText></span>
                                        <span className="h-[1px] w-8 bg-white/60"></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Our Packaging? */}
            <section className="py-20 bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <svg className="w-8 h-8 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <h4 className="text-lg font-bold text-gray-800 mb-3"><TranslatedText>Zero Damage Policy</TranslatedText></h4>
                            <p className="text-gray-600 text-sm leading-relaxed">Multi-layered protection ensuring your stone arrives in pristine condition.</p>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <svg className="w-8 h-8 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h4 className="text-lg font-bold text-gray-800 mb-3"><TranslatedText>Global Standards</TranslatedText></h4>
                            <p className="text-gray-600 text-sm leading-relaxed">ISPM-15 compliant wooden crates suitable for international sea and air freight.</p>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <svg className="w-8 h-8 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h4 className="text-lg font-bold text-gray-800 mb-3"><TranslatedText>Expert Handling</TranslatedText></h4>
                            <p className="text-gray-600 text-sm leading-relaxed">Dedicated team of professional packers with years of experience in stone handling.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <FloatingButtons />
        </div>
    )
}

export default PackagingPage
