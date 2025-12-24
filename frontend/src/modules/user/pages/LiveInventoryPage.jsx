import React, { useState, useEffect } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import HeroSectionWithForm from '../../../components/common/HeroSectionWithForm'
import inventoryHero from '../../../assets/services/live inventory/inventory2.png'

const LiveInventoryPage = ({
    onShowSidebar,
    onShowProjects,
    onShowCreations,
    onShowProducts,
    onShowServices,
    onShowHowItWorks,
    onShowLocation,
    onShowBooking
}) => {
    const [inventory, setInventory] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('All')

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

    useEffect(() => {
        fetchInventory()
    }, [])

    const fetchInventory = async () => {
        try {
            const res = await fetch(`${API_URL}/live-inventory`)
            const data = await res.json()
            setInventory(data)
        } catch (error) {
            console.error('Error fetching inventory:', error)
        } finally {
            setLoading(false)
        }
    }

    const categories = ['All', ...new Set(inventory.map(item => item.category))]

    const filteredInventory = filter === 'All'
        ? inventory
        : inventory.filter(item => item.category === filter)

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
                heroImage={inventoryHero}
                title="LIVE INVENTORY"
                subtitle="Available Stock at Your Fingertips"
                description="Browse our real-time collection of premium marble and stone slabs currently available in our warehouse."
            />

            {/* Inventory Section */}
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${filter === cat
                                        ? 'bg-[#8B7355] text-white shadow-xl scale-105'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-12 h-12 border-t-2 border-b-2 border-[#8B7355] rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredInventory.map((item) => (
                                <div
                                    key={item._id}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_50px_rgba(139,115,85,0.15)] transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={item.image.url}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${item.status === 'Available' ? 'bg-green-500 text-white' :
                                                    item.status === 'Reserved' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-[#8B7355] border border-[#8B7355]/20">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <h3 className="text-2xl font-serif text-gray-900 italic mb-4">{item.name}</h3>

                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dimensions</p>
                                                <p className="text-sm font-medium text-gray-700">{item.specifications?.dimensions || 'N/A'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quantity</p>
                                                <p className="text-sm font-medium text-gray-700">{item.specifications?.quantity || 'N/A'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Origin</p>
                                                <p className="text-sm font-medium text-gray-700">{item.specifications?.origin || 'N/A'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Finish</p>
                                                <p className="text-sm font-medium text-gray-700">{item.specifications?.finish || 'N/A'}</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={onShowBooking}
                                            className="w-full bg-[#8B7355] text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#725E45] transition-all shadow-lg hover:shadow-xl active:scale-95"
                                        >
                                            Enquiry Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredInventory.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-400 font-serif italic">No inventory found for this category.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
            <FloatingButtons />
        </div>
    )
}

export default LiveInventoryPage
