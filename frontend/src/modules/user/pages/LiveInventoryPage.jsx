import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import HeroSectionWithForm from '../../../components/common/HeroSectionWithForm'
import ExpertFormOverlay from '../../../components/common/ExpertFormOverlay'
import LazyImage from '../../../components/common/LazyImage'

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
    const [loading, setLoading] = useState(true)
    const [showMobileForm, setShowMobileForm] = useState(false)
    const [filterCategory, setFilterCategory] = useState('All')
    const navigate = useNavigate()

    const handleBuyNow = (item) => {
        const checkoutItem = {
            id: item._id,
            name: item.name,
            price: item.price || 0, // Ensure price exists
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
    const defaultHeroImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${API_URL}/live-inventory`)
                if (res.ok) {
                    const data = await res.json()
                    setInventory(data)
                }
            } catch (error) {
                console.error('Error fetching inventory:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchInventory()
    }, [])

    const categories = ['All', ...new Set(inventory.map(item => item.category))]

    const filteredInventory = filterCategory === 'All'
        ? inventory
        : inventory.filter(item => item.category === filterCategory)

    return (
        <div className="w-full min-h-screen bg-white">
            {/* Navigation - Using CreationsNavBar for consistency with Product pages, or Header based on design preference. 
          MurtiPage uses CreationsNavBar. Let's use that. */}
            <CreationsNavBar
                onShowCart={onShowCart}
                onShowLikes={onShowLikes}
                onShowSidebar={onShowSidebar}
            />

            {/* Hero Section with Talk to Expert Form */}
            <HeroSectionWithForm
                source="live-inventory-page"
                heroImage={defaultHeroImage} // Plan to replace this with generated image later
                title="Live Inventory"
                subtitle="Exclusive Marble Collection"
                description="Explore our real-time stock of premium natural stones. From rare Italian marble to exquisite Indian granite, find the perfect slab for your dream project."
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

            {/* Main Content */}
            <div className="w-full py-16 px-4 md:px-8 bg-white">
                <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <span className="text-[#8B7355] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2 md:mb-4 block">
                            Real-Time Stock
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif text-[#8B7355] italic mb-4 md:mb-6 tracking-tight">
                            Available Slabs & Blocks
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
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat}
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
                        <div className="text-center py-16 bg-gray-50 rounded-2xl">
                            <p className="text-gray-500 text-lg">No inventory items found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredInventory.map((item) => (
                                <div key={item._id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
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
                                                {item.status}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-serif text-gray-900 mb-1 line-clamp-1">{item.name}</h3>
                                            <p className="text-[#8B7355] text-xs font-bold uppercase tracking-widest">{item.category}</p>
                                        </div>

                                        <div className="space-y-2 border-t border-gray-100 pt-4">
                                            {item.specifications?.dimensions && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Dimensions</span>
                                                    <span className="font-medium text-gray-800">{item.specifications.dimensions}</span>
                                                </div>
                                            )}
                                            {item.specifications?.origin && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Origin</span>
                                                    <span className="font-medium text-gray-800">{item.specifications.origin}</span>
                                                </div>
                                            )}
                                            {item.specifications?.finish && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Finish</span>
                                                    <span className="font-medium text-gray-800">{item.specifications.finish}</span>
                                                </div>
                                            )}
                                            {item.price && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Price</span>
                                                    <span className="font-bold text-[#8B7355]">₹{item.price.toLocaleString('en-IN')}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-2 mt-6">
                                            <button
                                                onClick={() => handleBuyNow(item)}
                                                className="flex-1 bg-[#8B7355] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors duration-300"
                                            >
                                                Buy Now
                                            </button>
                                            <button
                                                onClick={() => setShowMobileForm(true)}
                                                className="flex-1 border border-gray-300 text-gray-900 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors duration-300"
                                            >
                                                Enquire
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            <Footer />
            <FloatingButtons />
        </div>
    )
}

export default LiveInventoryPage
