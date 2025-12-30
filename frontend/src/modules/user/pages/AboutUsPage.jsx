import { useState, useRef, useEffect } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import ExpertFormSection from '../../../components/common/ExpertFormSection'
import { journeyTimeline } from '../../../data/aboutUsJourney'
import { companyValues } from '../../../data/aboutUsValues'
import headingImage from '../../../assets/house of marble/about us/heading/Gemini_Generated_Image_ipme0eipme0eipme (1).png'
import aboutImage1 from '../../../assets/house of marble/about us/Screenshot 2025-12-10 131359.png'
import aboutImage2 from '../../../assets/house of marble/about us/Screenshot 2025-12-10 131414.png'
import { teamMembers } from '../../../data/teamMembers'
import TranslatedText from '../../../components/TranslatedText'

// CSS to hide scrollbar
const scrollbarHideStyle = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

const AboutUsPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowProducts,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  const [dynamicContent, setDynamicContent] = useState(null)
  const journeyScrollRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_URL}/about-us`)
        const result = await res.json()
        if (result.success && result.data) {
          setDynamicContent(result.data)
        }
      } catch (error) {
        console.error('Error fetching about us dynamic content:', error)
      }
    }
    fetchContent()
  }, [])

  const scrollJourney = (direction) => {
    if (journeyScrollRef.current) {
      const scrollAmount = 400
      if (direction === 'left') {
        journeyScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        journeyScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="w-full min-h-screen relative">
      <style>{scrollbarHideStyle}</style>

      {/* Fixed Background Image - Unified for Mobile & Desktop */}
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url('${dynamicContent?.heroBgImage?.url || headingImage}')`,
          backgroundColor: '#1a1a1a'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Wrapper - Scrolls Over Background */}
      <div className="relative z-10">
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

        {/* Hero Section - Title Over Background */}
        <section className="relative w-full h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <h1 className="text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white uppercase tracking-wider text-center px-4 leading-tight" style={{
              textShadow: '3px 3px 12px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.3)',
              letterSpacing: '0.05em',
              fontWeight: '900'
            }}>
              <TranslatedText>About Aslam Marble Suppliers</TranslatedText>
            </h1>
          </div>
        </section>

        {/* Introduction Section - Content Above Background */}
        <section className="w-full min-h-screen py-8 md:py-16 lg:py-20 px-3 md:px-6 lg:px-8 flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 lg:p-12 border-2 border-white/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                {/* Left Side - Image */}
                <div className="w-full">
                  <div className="relative overflow-hidden rounded-xl shadow-2xl">
                    <img
                      src={dynamicContent?.introImage?.url || aboutImage1}
                      alt="Aslam Marble Suppliers"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                {/* Right Side - Introduction */}
                <div className="w-full">
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <div className="w-1 h-12 md:h-16" style={{ backgroundColor: '#8B7355' }}></div>
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic">
                        <TranslatedText>Introduction</TranslatedText>
                      </h2>
                    </div>
                    <div className="space-y-3 md:space-y-4 text-gray-700 leading-relaxed">
                      <p className="text-sm md:text-lg">
                        <span className="font-bold text-gray-900"><TranslatedText>Aslam Marble Suppliers</TranslatedText></span> <TranslatedText>stands as a beacon of excellence in the realm of marble craftsmanship and spiritual artistry. With decades of unwavering dedication, we have transformed countless spaces into sanctuaries of divine beauty and timeless elegance.</TranslatedText>
                      </p>
                      <p className="text-sm md:text-lg">
                        <TranslatedText>Our journey began with a simple yet profound vision: to blend traditional Indian craftsmanship with contemporary design sensibilities, creating marble masterpieces that honor both heritage and innovation. Every piece we create is a testament to our commitment to quality, precision, and the sacred art of stone carving.</TranslatedText>
                      </p>
                      <p className="text-sm md:text-lg">
                        <TranslatedText>From intricate temple installations to elegant home decor, we have served clients across India and beyond, bringing the essence of spiritual artistry into their spaces. Our team of skilled artisans, guided by generations of knowledge, ensures that each creation tells a story of devotion, craftsmanship, and timeless beauty.</TranslatedText>
                      </p>
                      <p className="text-sm md:text-lg">
                        <TranslatedText>At Aslam Marble Suppliers, we don't just create products; we craft experiences that connect the divine with the everyday, transforming ordinary spaces into extraordinary sanctuaries of peace and devotion.</TranslatedText>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR VISION Section */}
        <section className="w-full py-12 md:py-20 lg:py-24" style={{ backgroundColor: '#FFFAF0' }}>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-[#333] tracking-[0.2em] mb-6 md:mb-8 uppercase">
              <TranslatedText>OUR VISION</TranslatedText>
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xl text-gray-700 font-light italic leading-relaxed max-w-5xl mx-auto">
              <TranslatedText>"Crafting exquisite temples with precision and artistry; Ensuring client satisfaction with timeless designs."</TranslatedText>
            </p>
          </div>
        </section>

        {/* Scrolling Team Images Section */}
        <section className="w-full py-8 md:py-12 bg-white overflow-hidden relative">
          <div className="flex animate-scroll-right-to-left gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-4 md:gap-6">
                {teamMembers.map((member, idx) => (
                  <div
                    key={`${i}-${idx}`}
                    className="flex-shrink-0 w-60 h-80 md:w-80 md:h-[420px] overflow-hidden rounded-xl shadow-lg"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110 grayscale hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Our Journey Timeline Section - Merged with Horizontal Scroll */}
        <section className="w-full py-8 md:py-16 lg:py-20 px-3 md:px-6 lg:px-8">
          <div className="w-full max-w-full mx-auto">
            {/* Title and Timeline in One Container */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 lg:p-12 border-2 border-white/50">
              {/* Title Section */}
              <div className="mb-8 md:mb-12 text-center">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-3 md:mb-4">
                  <TranslatedText>Timeline of Excellence</TranslatedText>
                </h2>
                <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
                  <TranslatedText>A journey through the milestones that have shaped Aslam Marble Suppliers into the trusted name it is today.</TranslatedText>
                </p>
              </div>

              {/* Horizontal Scrollable Timeline */}
              <div className="relative">
                {/* Left Arrow */}
                <button
                  onClick={() => scrollJourney('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-14 md:h-14 bg-[#8B7355] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#A08A6F] transition-colors"
                  aria-label="Scroll left"
                >
                  <svg className="w-4 h-4 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Right Arrow */}
                <button
                  onClick={() => scrollJourney('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-14 md:h-14 bg-[#8B7355] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#A08A6F] transition-colors"
                  aria-label="Scroll right"
                >
                  <svg className="w-4 h-4 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Scrollable Timeline - Horizontal Layout */}
                <div
                  ref={journeyScrollRef}
                  className="flex flex-row gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 px-10 md:px-16"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  {(dynamicContent?.timeline?.length > 0 ? dynamicContent.timeline : journeyTimeline).map((item, index) => (
                    <div
                      key={index}
                      className="group relative flex-shrink-0 bg-white rounded-xl shadow-md hover:shadow-xl p-5 md:p-8 border border-gray-50 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
                      style={{ width: '260px', minWidth: '260px', maxWidth: '260px' }}
                    >
                      {/* Background Accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#8B7355]/5 rounded-bl-full transform translate-x-8 -translate-y-8 transition-transform duration-500 group-hover:scale-150"></div>

                      {/* Year Indicator */}
                      <div className="relative z-10 flex items-start justify-between mb-4 md:mb-6">
                        <div className="flex flex-col">
                          <span className="text-2xl md:text-3xl font-bold text-[#8B7355] mb-1 md:mb-2"><TranslatedText>{item.year}</TranslatedText></span>
                          <div className="w-8 md:w-12 h-1 rounded-full" style={{ backgroundColor: '#8B7355' }}></div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 uppercase tracking-widest mb-2 md:mb-4 group-hover:text-[#8B7355] transition-colors">
                          <TranslatedText>{item.title}</TranslatedText>
                        </h3>
                        <p className="text-xs md:text-base text-gray-600 leading-relaxed italic" style={{ fontWeight: 400 }}>
                          <TranslatedText>{item.description}</TranslatedText>
                        </p>
                      </div>

                      {/* Bottom Gradient Border */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B7355]/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="w-full py-8 md:py-16 lg:py-20 px-3 md:px-6 lg:px-8">
          <div className="w-full max-w-full mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 lg:p-12 border-2 border-white/50">
              {/* Title Section */}
              <div className="mb-8 md:mb-12 text-center">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-3 md:mb-4">
                  <TranslatedText>Our Values</TranslatedText>
                </h2>
                <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
                  <TranslatedText>We uphold our values in every step, guiding our craftsmanship, decisions, and interactions as the foundation of excellence in temple making.</TranslatedText>
                </p>
              </div>

              {/* Values Grid - Cards with Theme Enhancement */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
                {(dynamicContent?.values?.length > 0 ? dynamicContent.values : companyValues).map((value, index) => (
                  <div
                    key={index}
                    className="group relative bg-white rounded-xl shadow-md hover:shadow-xl p-4 md:p-7 border border-gray-50 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
                  >
                    {/* Background Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-[#8B7355]/5 rounded-bl-full transform translate-x-6 -translate-y-6 md:translate-x-8 md:-translate-y-8 transition-transform duration-500 group-hover:scale-150"></div>

                    {/* Header with Icon/Number */}
                    <div className="relative z-10 flex items-start justify-between mb-2 md:mb-4">
                      <div className="flex flex-col">
                        <span className="text-xl md:text-3xl font-bold text-[#8B7355]/20 mb-1">0{index + 1}</span>
                        <div className="w-6 md:w-10 h-0.5 rounded-full" style={{ backgroundColor: '#8B7355' }}></div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="relative z-10 text-xs md:text-xl font-bold text-gray-800 uppercase tracking-wider mb-2 md:mb-3 group-hover:text-[#8B7355] transition-colors">
                      <TranslatedText>{value.title}</TranslatedText>
                    </h3>

                    {/* Description */}
                    <p className="relative z-10 text-[10px] md:text-sm text-gray-600 leading-relaxed italic" style={{ fontWeight: 400 }}>
                      <TranslatedText>{value.description}</TranslatedText>
                    </p>

                    {/* Bottom Gradient Border */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B7355]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ExpertFormSection />
        <TrustedBySection />
        <Footer />
        <FloatingButtons />
      </div>
    </div>
  )
}

export default AboutUsPage

