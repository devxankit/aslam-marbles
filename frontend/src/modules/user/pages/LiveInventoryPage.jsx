import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import HeroSectionWithForm from '../../../components/common/HeroSectionWithForm'
import ExpertFormOverlay from '../../../components/common/ExpertFormOverlay'
import LazyImage from '../../../components/common/LazyImage'

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
    const [filterCategory, setFilterCategory] = useState('All')
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

    const categories = ['All', ...new Set(inventory.map(item => item.category))]

    const filteredInventory = filterCategory === 'All'
        ? inventory
        : inventory.filter(item => item.category === filterCategory)

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
                title={pageSettings?.headSection?.title || "Live Inventory"}
                subtitle={pageSettings?.headSection?.subtitle || "Exclusive Marble Collection"}
                description={pageSettings?.headSection?.description || "Explore our real-time stock of premium natural stones. From rare Italian marble to exquisite Indian granite, find the perfect slab for your dream project."}
                heroImage={defaultHeroImage} // Plan to replace this with generated image later
                title={getTranslatedText("Live Inventory")}
                subtitle={getTranslatedText("Exclusive Marble Collection")}
                description={getTranslatedText("Explore our real-time stock of premium natural stones. From rare Italian marble to exquisite Indian granite, find the perfect slab for your dream project.")}
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
            <section className="w-full py-12 md:py-16 px-4 md:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-[#8B7355] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                                Premium Selection
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif text-[#8B7355] italic mb-6 leading-tight">
                                Handpicked Stones for Your Masterpiece
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Our live inventory features the finest selection of natural stones, available for immediate viewing and purchase. Each slab is photographed in high resolution to give you a true-to-life representation of its patterns and textures.
                            </p>
                            <div className="w-24 h-1 bg-[#8B7355]"></div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/3]">
                            <img
                                src={sideImage}
                                alt="Marble Stock"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Inventory Grid Section */}
            <div className="w-full py-16 px-4 md:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <span className="text-[#8B7355] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2 md:mb-4 block">
                            <TranslatedText>Real-Time Stock</TranslatedText>
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif text-[#8B7355] italic mb-4 md:mb-6 tracking-tight">
                            <TranslatedText>Available Slabs & Blocks</TranslatedText>
                        </h2>
                        <div className="w-12 h-[1px] bg-[#8B7355] mx-auto opacity-30"></div>
                    </div>

                    {/* Filter Tabs */}
                    {categories.length > 2 && (
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilterCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300
                    ${filterCategory === cat
                                            ? 'bg-[#8B7355] text-white shadow-lg'
                                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    <TranslatedText>{cat}</TranslatedText>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Inventory Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#8B7355]"></div>
                        </div>
                    ) : filteredInventory.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-lg">No inventory items found matching your criteria.</p>
                            <div className="text-center py-16 bg-gray-50 rounded-2xl">
                                <p className="text-gray-500 text-lg"><TranslatedText>No inventory items found matching your criteria.</TranslatedText></p>
                            </div>
                            ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredInventory.map((item) => (
                                    <div key={item._id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                                        {/* Image Container */}
                                        <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                                            <LazyImage
                                                src={item.image?.url || 'https://via.placeholder.com/600x400?text=Stone+Image'}
                                                alt={item.name}
                                                className="w-full h-full"
                                                imageClassName="transition-transform duration-700 group-hover:scale-110"
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
                                                <p className="text-[#8B7355] text-xs font-bold uppercase tracking-widest"><TranslatedText>{item.category}</TranslatedText></p>
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

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleBuyNow(item)}
                                                    className="flex-1 bg-[#8B7355] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors duration-300"
                                                >
                                                    <TranslatedText>Buy Now</TranslatedText>
                                                </button>
                                                <button
                                                    onClick={() => setShowMobileForm(true)}
                                                    className="flex-1 border border-gray-300 text-gray-900 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors duration-300"
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
                <section className="w-full">
                    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                        <LazyImage
                            src={pageSettings?.horizontalSection?.image?.url || horizontalImage}
                            alt="Natural Stone Collection"
                            className="w-full h-full"
                            imageClassName="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                </section>

                <Footer />
                <FloatingButtons />
            </div>
            )
}

            export default LiveInventoryPage
