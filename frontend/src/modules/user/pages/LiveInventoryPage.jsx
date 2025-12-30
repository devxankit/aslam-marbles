import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import HeroSectionWithForm from '../../../components/common/HeroSectionWithForm'
import ExpertFormOverlay from '../../../components/common/ExpertFormOverlay'
import LazyImage from '../../../components/common/LazyImage'
import TrustedBySection from '../../../components/common/TrustedBySection'
import ExpertFormSection from '../../../components/common/ExpertFormSection'

// Import images
import heroImage from '../../../assets/services/live inventory/inventory1.png'
import horizontalImage from '../../../assets/services/live inventory/inventory2.png'
import sideImage from '../../../assets/services/live inventory/inventory3.png'
import { usePageTranslation } from '../../../hooks/usePageTranslation'
import TranslatedText from '../../../components/TranslatedText'

const LiveInventoryPage = ({
    onShowSidebar,
    onShowProjects,
    onShowCreations,
    onShowProducts,
    onShowServices,
    onShowHowItWorks,
    onShowLocation,
    onShowBooking,
    onShowCart,
    onShowLikes
}) => {
    const [inventory, setInventory] = useState([])
    const [pageSettings, setPageSettings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showMobileForm, setShowMobileForm] = useState(false)

    const { getTranslatedText } = usePageTranslation()
    const navigate = useNavigate()

    const handleBuyNow = (item) => {
        const checkoutItem = {
            id: item._id,
            name: item.name,
            price: item.price || 0,
            image: item.image?.url,
            quantity: 1,
            category: 'Live Inventory'
        }

        navigate('/checkout', {
            state: {
                items: [checkoutItem]
            }
        })
    }

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [inventoryRes, settingsRes] = await Promise.all([
                    fetch(`${API_URL}/live-inventory`),
                    fetch(`${API_URL}/live-inventory/settings`)
                ])

                if (inventoryRes.ok) {
                    const data = await inventoryRes.json()
                    setInventory(data)
                }

                if (settingsRes.ok) {
                    const settings = await settingsRes.json()
                    setPageSettings(settings)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])



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

            {/* Hero Section with Talk to Expert Form */}
            <HeroSectionWithForm
                source="live-inventory-page"
                heroImage={pageSettings?.headSection?.heroImage?.url || heroImage}
                title={getTranslatedText(pageSettings?.headSection?.title || "Live Inventory")}
                subtitle={getTranslatedText(pageSettings?.headSection?.subtitle || "Exclusive Marble Collection")}
                description={getTranslatedText(pageSettings?.headSection?.description || "Explore our real-time stock of premium natural stones. From rare Italian marble to exquisite Indian granite, find the perfect slab for your dream project.")}
                enableMobileModal={true}
                onMobileButtonClick={() => setShowMobileForm(true)}
            />

            {/* Mobile Form Modal */}
            {showMobileForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn md:hidden">
                    <div
                        className="relative w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-scaleIn bg-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowMobileForm(false)}
                            className="absolute top-3 right-3 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/80 text-gray-500 hover:bg-gray-200 transition-colors backdrop-blur-sm"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="max-h-[85vh] overflow-y-auto">
                            <ExpertFormOverlay source="live-inventory-page" className="w-full flex flex-col shadow-none" />
                        </div>
                    </div>
                </div>
            )}

            {/* Introduction Section */}
            <section className="w-full py-12 md:py-20 px-3 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 lg:p-12 border-2 border-white/50">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <span className="text-[#8B7355] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 block">
                                    <TranslatedText>Premium Selection</TranslatedText>
                                </span>
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-6 leading-tight">
                                    <TranslatedText>Handpicked Stones for Your Masterpiece</TranslatedText>
                                </h2>
                                <p className="text-sm md:text-lg text-gray-600 leading-relaxed mb-8">
                                    <TranslatedText>Our live inventory features the finest selection of natural stones, available for immediate viewing and purchase. Each slab is photographed in high resolution to give you a true-to-life representation of its patterns and textures.</TranslatedText>
                                </p>
                                <div className="w-24 h-1 bg-[#8B7355]"></div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                                    <img
                                        src={sideImage}
                                        alt={getTranslatedText("Marble Stock")}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inventory Grid Section */}
            <div className="w-full py-16 px-4 md:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <div className="text-center mb-10 md:mb-16">
                        <span className="text-[#8B7355] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-3 block">
                            <TranslatedText>Real-Time Stock</TranslatedText>
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-6 tracking-tight">
                            <TranslatedText>Available Slabs & Blocks</TranslatedText>
                        </h2>
                        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#8B7355] to-transparent mx-auto opacity-40"></div>
                    </div>



                    {/* Inventory Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#8B7355]"></div>
                        </div>
                    ) : inventory.length === 0 ? (
                        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="text-gray-500 text-lg"><TranslatedText>No inventory items found.</TranslatedText></p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
                            {inventory.map((item) => (
                                <div key={item._id} className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(139,115,85,0.15)] transition-all duration-500 border border-gray-100 flex flex-col hover:-translate-y-1">
                                    {/* Image Container */}
                                    <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                                        <LazyImage
                                            src={item.image?.url || 'https://via.placeholder.com/600x400?text=Stone+Image'}
                                            alt={item.name}
                                            className="w-full h-full"
                                            imageClassName="transition-transform duration-1000 group-hover:scale-110"
                                            width={600}
                                        />
                                        {item.status !== 'Available' && (
                                            <div className="absolute top-4 right-4 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md z-10">
                                                <TranslatedText>{item.status}</TranslatedText>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-serif text-gray-900 mb-1 line-clamp-1">{item.name}</h3>

                                        </div>

                                        <div className="space-y-2 border-t border-gray-100 pt-4 mb-6 flex-1">
                                            {item.specifications?.dimensions && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500"><TranslatedText>Dimensions</TranslatedText></span>
                                                    <span className="font-medium text-gray-800"><TranslatedText>{item.specifications.dimensions}</TranslatedText></span>
                                                </div>
                                            )}
                                            {item.specifications?.origin && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500"><TranslatedText>Origin</TranslatedText></span>
                                                    <span className="font-medium text-gray-800"><TranslatedText>{item.specifications.origin}</TranslatedText></span>
                                                </div>
                                            )}
                                            {item.specifications?.finish && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500"><TranslatedText>Finish</TranslatedText></span>
                                                    <span className="font-medium text-gray-800"><TranslatedText>{item.specifications.finish}</TranslatedText></span>
                                                </div>
                                            )}
                                            {item.price && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500"><TranslatedText>Price</TranslatedText></span>
                                                    <span className="font-bold text-[#8B7355]">₹{item.price.toLocaleString('en-IN')}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleBuyNow(item)}
                                                className="flex-1 bg-[#8B7355] text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all duration-300 shadow-lg shadow-[#8B7355]/20 hover:shadow-gray-900/20"
                                            >
                                                <TranslatedText>Buy Now</TranslatedText>
                                            </button>
                                            <button
                                                onClick={() => setShowMobileForm(true)}
                                                className="flex-1 border-2 border-gray-100 text-gray-900 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-50 hover:border-[#8B7355]/30 transition-all duration-300"
                                            >
                                                <TranslatedText>Enquire</TranslatedText>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            {/* Horizontal Image Section */}
            <section className="w-full pb-16 md:pb-24 px-3 md:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <LazyImage
                            src={pageSettings?.horizontalSection?.image?.url || horizontalImage}
                            alt={getTranslatedText("Natural Stone Collection")}
                            className="w-full h-full"
                            imageClassName="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl md:rounded-[2.5rem]"></div>
                    </div>
                </div>
            </section>

            <ExpertFormSection />
            <TrustedBySection />
            <Footer />
            <FloatingButtons />
        </div>
    )
}

export default LiveInventoryPage
