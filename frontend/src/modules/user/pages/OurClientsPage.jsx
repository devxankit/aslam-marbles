import { useState, useEffect } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import ExpertFormSection from '../../../components/common/ExpertFormSection'
import { fetchOurClientsData } from '../../../utils/ourClientsUtils'
import headingImage from '../../../assets/house of marble/our client/heading/Residential.jpeg'
import headingImage2 from '../../../assets/house of marble/our client/heading/06fcbe87-a149-445b-912c-6787ef4a4d50.png'
import TranslatedText from '../../../components/TranslatedText'

const OurClientsPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowProducts,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  const [ourClientsData, setOurClientsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Fallback data
  const fallbackHeadingImages = [
    { id: 1, image: headingImage, alt: 'Our Clients' },
    { id: 2, image: headingImage2, alt: 'Our Clients' }
  ]

  const fallbackContentSections = [
    {
      content: 'At Aslam Marble Suppliers, we take immense pride in the trust and confidence that our clients place in us. Over the years, we have had the privilege of serving a diverse range of clients, from individual homeowners seeking exquisite marble pieces for their personal spaces to large-scale commercial and institutional projects. Our commitment to quality, craftsmanship, and customer satisfaction has made us a preferred choice for clients across India and beyond.'
    },
    {
      content: 'Each project we undertake is a testament to our dedication to excellence. We work closely with our clients to understand their vision and bring it to life through our masterful craftsmanship. From residential temples and home decor to grand communal spaces and international projects, our portfolio reflects the diversity and scale of our expertise.'
    }
  ]

  useEffect(() => {
    const loadOurClientsData = async () => {
      try {
        const data = await fetchOurClientsData()
        if (data) {
          setOurClientsData(data)
        }
      } catch (error) {
        console.error('Error loading our clients data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOurClientsData()
  }, [])

  // Use API data if available, otherwise fallback to static data
  const displayTitle = ourClientsData?.title || 'Our Valued Clients'
  const displayHeadingImages = ourClientsData?.headingImages?.length > 0
    ? ourClientsData.headingImages.map(img => ({ ...img, image: img.url }))
    : fallbackHeadingImages
  const displayContentSections = ourClientsData?.contentSections?.length > 0
    ? ourClientsData.contentSections
    : fallbackContentSections

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? displayHeadingImages.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === displayHeadingImages.length - 1 ? 0 : prev + 1
    )
  }

  const currentImage = displayHeadingImages[currentImageIndex]

  if (loading) {
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
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto"></div>
            <p className="mt-4 text-gray-600"><TranslatedText>Loading our clients page...</TranslatedText></p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

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

      {/* Image and Caption Section - Image Left, Caption Right */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Image with Navigation Arrows */}
            <div className="w-full relative group">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:shadow-3xl" style={{ aspectRatio: '16/9', maxHeight: '600px' }}>
                <img
                  src={currentImage.image}
                  alt={currentImage.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

                {/* Navigation Arrows - Only show if more than one image */}
                {displayHeadingImages.length > 1 && (
                  <>
                    {/* Left Arrow */}
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 bg-white/95 hover:bg-white text-[#8B7355] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-[#8B7355]/20"
                      aria-label="Previous image"
                    >
                      <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 bg-white/95 hover:bg-white text-[#8B7355] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-[#8B7355]/20"
                      aria-label="Next image"
                    >
                      <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image Indicator Dots - Only show if more than one image */}
                {displayHeadingImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                    {displayHeadingImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`rounded-full transition-all duration-300 ${index === currentImageIndex
                          ? 'bg-white w-8 h-2'
                          : 'bg-white/50 hover:bg-white/75 w-2 h-2'
                          }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Caption */}
            <div className="w-full">
              <div className="space-y-6">
                {/* Decorative Element */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-16" style={{ backgroundColor: '#8B7355' }}></div>
                  <h2 className="text-3xl md:text-4xl font-serif text-[#8B7355] italic">
                    <TranslatedText>{displayTitle}</TranslatedText>
                  </h2>
                </div>

                {displayContentSections.map((section, index) => (
                  <p key={index} className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed italic" style={{ fontWeight: 400 }}>
                    <TranslatedText>{section.content}</TranslatedText>
                  </p>
                ))}
              </div>
            </div>
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

export default OurClientsPage

