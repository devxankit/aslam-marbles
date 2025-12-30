import React, { useState, useEffect } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import HeroSectionWithForm from '../../../components/common/HeroSectionWithForm'
import ImageGallery from '../../../components/common/ImageGallery'
import ExpertFormOverlay from '../../../components/common/ExpertFormOverlay'
import TranslatedText from '../../../components/TranslatedText'
import { usePageTranslation } from '../../../contexts/PageTranslationContext'

const StoneCategoryTemplate = ({
    categoryId, // e.g., 'sandstone', 'marble'
    title,
    subtitle,
    description,
    defaultHeroImage,
    onShowSidebar,
    onShowProjects,
    onShowCreations,
    onShowProducts,
    onShowServices,
    onShowHowItWorks,
    onShowLocation,
    onShowBooking,
    galleryLayout
}) => {
    const { getTranslatedText } = usePageTranslation()
    const [products, setProducts] = useState([])
    const [categoryData, setCategoryData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showMobileForm, setShowMobileForm] = useState(false)

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Category Data (for Hero Image)
                const catRes = await fetch(`${API_URL}/stone-products/categories/${categoryId}`)
                if (catRes.ok) {
                    const catData = await catRes.json()
                    setCategoryData(catData)
                }

                // 2. Fetch Products
                const prodRes = await fetch(`${API_URL}/stone-products/category/${categoryId}`)
                if (prodRes.ok) {
                    const prodData = await prodRes.json()
                    setProducts(prodData)
                }
            } catch (error) {
                console.error(`Error fetching data for ${categoryId}:`, error)
            } finally {
                setLoading(false)
            }
        }

        if (categoryId) {
            fetchData()
        }
    }, [categoryId, API_URL])

    // Map backend product structure to what ImageGallery expects
    const galleryImages = products.map(p => {
        const imageUrl = (typeof p.image === 'string' ? p.image : p.image?.url) ||
            (typeof p.images?.[0] === 'string' ? p.images[0] : p.images?.[0]?.url) ||
            'https://via.placeholder.com/300';

        // Debug logging
        // console.log(`Product: ${p.name}, Image Type: ${typeof p.image}, Extracted URL: ${imageUrl}`);

        return {
            ...p, // Spread first to allow overwrites
            id: p._id || p.id,
            name: p.name,
            image: imageUrl,
            origin: p.specifications?.origin || 'India',
            color: p.specifications?.color || 'Standard'
        }
    })

    // Determine Hero Image: Admin uploaded > Prop Default
    const heroImage = categoryData?.heroSection?.image?.url || defaultHeroImage

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
                source={`stone-category-${categoryId}`}
                heroImage={heroImage}
                title={title}
                subtitle={subtitle}
                description={description}
                enableMobileModal={true}
                disableGradient={true}
                onMobileButtonClick={() => setShowMobileForm(true)}
            />

            {loading ? (
                <div className="py-24 text-center">
                    <div className="inline-block w-12 h-12 border-t-2 border-b-2 border-[#8B7355] rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-500"><TranslatedText>Loading collection...</TranslatedText></p>
                </div>
            ) : galleryImages.length > 0 ? (
                <ImageGallery
                    title={`${getTranslatedText("Our")} ${title} ${getTranslatedText("Gallery")}`}
                    description={`${getTranslatedText("Explore our exclusive collection of")} ${title.toLowerCase()}, ${getTranslatedText("carefully sourced and crafted for excellence.")}`}
                    images={galleryImages}
                    stoneType={categoryId} // used for navigation path
                    origin="India"
                    layout={galleryLayout}
                    basePath={categoryId.startsWith('packaging-') ? '/art/packaging' : '/products'}
                />
            ) : (
                <div className="py-24 text-center text-gray-500">
                    <p className="text-xl"><TranslatedText>No products found for</TranslatedText> {title}.</p>
                    <p className="text-sm mt-2"><TranslatedText>Please check back soon or contact us.</TranslatedText></p>
                </div>
            )}

            {/* Mobile Form Modal */}
            {showMobileForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
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
                        <ExpertFormOverlay source={`stone-category-${categoryId}`} className="w-full flex flex-col max-h-[85vh]" />
                    </div>
                </div>
            )}
            <Footer />
            <FloatingButtons />
        </div>
    )
}

export default StoneCategoryTemplate
