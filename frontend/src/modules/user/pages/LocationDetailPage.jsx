import { useState, useEffect } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import HeroSectionWithForm from '../../../components/common/HeroSectionWithForm'
import ExpertFormOverlay from '../../../components/common/ExpertFormOverlay'
import TranslatedText from '../../../components/TranslatedText'

import { formatLocationName, indianLocations } from '../../../data/locations'
import { fetchFAQs } from '../../../utils/faqUtils'
import { dreamTemples } from '../../../data/dreamTemples'

import templedesignImg from '../../../assets/locationicons/middlecard/templedesign.png'
import marblecuttingImg from '../../../assets/locationicons/middlecard/marblecutting.png'
import settingImg from '../../../assets/locationicons/middlecard/setting.png'

// Default hero image for locations
const defaultHeroImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'

const LocationDetailPage = ({
  location,
  onBack,
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  const [selectedProcessStep, setSelectedProcessStep] = useState(1)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [faqs, setFaqs] = useState([])
  const [loadingFAQs, setLoadingFAQs] = useState(true)
  const [showMobileForm, setShowMobileForm] = useState(false)

  // Check if location is Indian or International
  const isIndianLocation = indianLocations.some(
    loc => loc.name.toUpperCase() === location.toUpperCase()
  )

  // Fetch FAQs from API
  useEffect(() => {
    if (!isIndianLocation) {
      setLoadingFAQs(false)
      return
    }

    const loadFAQs = async () => {
      try {
        setLoadingFAQs(true)
        const formattedLocation = formatLocationName(location)
        const data = await fetchFAQs('location', formattedLocation)
        setFaqs(data || [])
      } catch (error) {
        console.error('Error loading FAQs:', error)
        setFaqs([])
      } finally {
        setLoadingFAQs(false)
      }
    }
    loadFAQs()
  }, [location, isIndianLocation])

  return (
    <div className="w-full min-h-screen relative bg-white overflow-x-hidden">
      <Header
        variant="locationDetail"
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
      />

      {/* Hero Section with Form */}
      <HeroSectionWithForm
        source={`location-detail-${location}`}
        heroImage={defaultHeroImage}
        title={`Premium Marble Temples in ${location}`}
        subtitle="Your Trusted Marble Temple Manufacturer"
        description={`Discover exquisite handcrafted marble temples and pooja rooms in ${location}. We bring divine artistry to your home with premium quality and expert craftsmanship.`}
        enableMobileModal={true}
        disableGradient={true}
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
              <ExpertFormOverlay source={`location-detail-${location}`} className="w-full flex flex-col shadow-none" />
            </div>
          </div>
        </div>
      )}

      {/* WE TAKE CARE OF EVERYTHING Section */}
      <section className="w-full py-8 md:py-16 lg:py-24 px-2 md:px-8 bg-gradient-to-b from-white to-[#fdfaf5]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-16">
            <span className="text-[#8B7355] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2 md:mb-4 block">
              <TranslatedText>End-to-End Service</TranslatedText>
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-4 md:mb-6 tracking-tight">
              <TranslatedText>We Take Care of Everything</TranslatedText>
            </h2>
            <div className="w-12 md:w-20 h-0.5 md:h-1 bg-[#8B7355]/30 mx-auto mb-4 md:mb-6"></div>
            <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Our Pooja Room Experts in <span className="font-semibold text-[#8B7355]">{location}</span> will make your journey hassle-free — from design to installation.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-3 gap-2 md:gap-8 lg:gap-10">
            {/* Card 1 - Design */}
            <div className="group relative bg-white rounded-lg md:rounded-2xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 transform md:hover:-translate-y-2">
              {/* Step Number Badge */}
              <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 w-6 h-6 md:w-10 md:h-10 bg-[#8B7355] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs md:text-lg">1</span>
              </div>

              {/* Image */}
              <div className="relative h-24 sm:h-40 md:h-72 overflow-hidden">
                <img
                  src={templedesignImg}
                  alt="We Design"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-2 md:p-8 border-t-2 md:border-t-4 border-[#8B7355]">
                <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 mb-1 md:mb-4">
                  <div className="hidden md:flex w-12 h-12 bg-[#8B7355]/10 rounded-xl items-center justify-center">
                    <svg className="w-6 h-6 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-[10px] sm:text-sm md:text-2xl font-bold text-gray-800 group-hover:text-[#8B7355] transition-colors text-center md:text-left leading-tight">WE DESIGN</h3>
                </div>
                <p className="hidden md:block text-sm md:text-base text-gray-600 leading-relaxed">
                  Visualize your dream pooja room with our expert 3D designers who bring your sacred space to life.
                </p>
              </div>
            </div>

            {/* Card 2 - Create */}
            <div className="group relative bg-white rounded-lg md:rounded-2xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 transform md:hover:-translate-y-2">
              {/* Step Number Badge */}
              <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 w-6 h-6 md:w-10 md:h-10 bg-[#8B7355] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs md:text-lg">2</span>
              </div>

              {/* Image */}
              <div className="relative h-24 sm:h-40 md:h-72 overflow-hidden">
                <img
                  src={marblecuttingImg}
                  alt="We Create"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-2 md:p-8 border-t-2 md:border-t-4 border-[#8B7355]">
                <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 mb-1 md:mb-4">
                  <div className="hidden md:flex w-12 h-12 bg-[#8B7355]/10 rounded-xl items-center justify-center">
                    <svg className="w-6 h-6 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-[10px] sm:text-sm md:text-2xl font-bold text-gray-800 group-hover:text-[#8B7355] transition-colors text-center md:text-left leading-tight">WE CREATE</h3>
                </div>
                <p className="hidden md:block text-sm md:text-base text-gray-600 leading-relaxed">
                  Handcrafted with precision using the finest marble by our skilled artisans for lasting beauty.
                </p>
              </div>
            </div>

            {/* Card 3 - Install */}
            <div className="group relative bg-white rounded-lg md:rounded-2xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 transform md:hover:-translate-y-2">
              {/* Step Number Badge */}
              <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 w-6 h-6 md:w-10 md:h-10 bg-[#8B7355] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs md:text-lg">3</span>
              </div>

              {/* Image */}
              <div className="relative h-24 sm:h-40 md:h-72 overflow-hidden">
                <img
                  src={settingImg}
                  alt="We Install"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-2 md:p-8 border-t-2 md:border-t-4 border-[#8B7355]">
                <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 mb-1 md:mb-4">
                  <div className="hidden md:flex w-12 h-12 bg-[#8B7355]/10 rounded-xl items-center justify-center">
                    <svg className="w-6 h-6 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className="text-[10px] sm:text-sm md:text-2xl font-bold text-gray-800 group-hover:text-[#8B7355] transition-colors text-center md:text-left leading-tight">WE INSTALL</h3>
                </div>
                <p className="hidden md:block text-sm md:text-base text-gray-600 leading-relaxed">
                  Professional delivery and seamless installation at your doorstep for a divine experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Steps Process Section */}
      <ProcessStepsSection selectedStep={selectedProcessStep} onStepChange={setSelectedProcessStep} />

      {/* Dream Temples Section - Premium Design */}
      <section className="w-full py-8 md:py-16 lg:py-24 px-2 md:px-6 lg:px-8 bg-[#fdfaf5]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-20">
            <span className="text-[#8B7355] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2 md:mb-4 block">
              Artisanal Excellence
            </span>
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-4 md:mb-6 tracking-tight">
              Our Dream Temple Collection in {location}
            </h2>
            <div className="w-12 md:w-20 h-0.5 md:h-1 bg-[#8B7355]/30 mx-auto mb-4 md:mb-8"></div>
            <p className="text-sm md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light px-4">
              Transform your sacred space with our meticulously crafted marble temples, designed to bring peace and divinity into your home.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-8 lg:gap-10">
            {dreamTemples.map((temple) => (
              <div
                key={temple.id}
                className="group cursor-pointer bg-white rounded-lg md:rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-[0_10px_30px_-10px_rgba(139,115,85,0.15)] md:hover:shadow-[0_30px_60px_-15px_rgba(139,115,85,0.15)] transform md:hover:-translate-y-3"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <img
                    src={temple.image}
                    alt={temple.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />

                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-black/5 md:bg-black/20 group-hover:bg-black/30 md:group-hover:bg-black/40 transition-colors duration-500"></div>

                  {/* Subtle Top Gradient - Reduced on mobile */}
                  <div className="absolute top-0 inset-x-0 h-8 md:h-24 bg-gradient-to-b from-black/30 to-transparent"></div>

                  {/* Elegant Price Badge - Desktop Only (Slides in) */}
                  <div className="absolute top-2 md:top-10 left-0 overflow-hidden pointer-events-none hidden md:block">
                    <div className="bg-[#8B7355] text-white px-4 py-1 md:px-6 md:py-2 shadow-lg md:shadow-2xl transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out">
                      <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">{temple.price}</span>
                    </div>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-2 md:p-8 bg-white text-center border-t border-gray-50 flex flex-col justify-center h-auto min-h-[50px] md:min-h-[auto]">
                  <p className="text-[#8B7355] text-[6px] md:text-[10px] font-bold uppercase tracking-[0.05em] md:tracking-[0.2em] mb-1 md:mb-3 line-clamp-1 truncate w-full">
                    {temple.price}
                  </p>
                  <h3 className="text-[8px] md:text-2xl font-serif text-gray-800 italic mb-0 md:mb-2 group-hover:text-[#8B7355] transition-colors duration-300 leading-tight">
                    {temple.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Only show for Indian locations */}
      {isIndianLocation && (
        <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-10 md:mb-14">
              <span className="inline-block px-4 py-1.5 bg-[#8B7355]/10 text-[#8B7355] text-sm font-semibold rounded-full mb-4">
                FAQs
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                <TranslatedText>Frequently Asked Questions</TranslatedText>
              </h2>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                Everything you need to know about our premium marble temples and pooja rooms in {location}
              </p>
            </div>

            <div className="space-y-3">
              {loadingFAQs ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-[#8B7355] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 text-base md:text-lg"><TranslatedText>Loading FAQs...</TranslatedText></p>
                  </div>
                </div>
              ) : faqs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-base md:text-lg"><TranslatedText>No FAQs available at the moment.</TranslatedText></p>
                </div>
              ) : (
                faqs.map((faq, index) => {
                  const faqId = faq._id || faq.id || index
                  const isExpanded = expandedFaq === faqId
                  return (
                    <div
                      key={faqId}
                      className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-300 ${isExpanded ? 'border-[#8B7355] shadow-md ring-1 ring-[#8B7355]/20' : 'border-gray-100 hover:shadow-md hover:border-gray-200'}`}
                    >
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                        className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 md:gap-4 flex-1">
                          <span className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-sm md:text-base font-bold flex-shrink-0 transition-colors ${isExpanded ? 'bg-[#8B7355] text-white' : 'bg-[#8B7355]/10 text-[#8B7355] group-hover:bg-[#8B7355]/20'}`}>
                            {index + 1}
                          </span>
                          <span className={`text-sm md:text-base font-medium flex-1 transition-colors ${isExpanded ? 'text-[#8B7355]' : 'text-gray-800 group-hover:text-[#8B7355]'}`}>
                            {faq.question}
                          </span>
                        </div>
                        <div className={`flex-shrink-0 ml-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isExpanded ? 'bg-[#8B7355] rotate-180' : 'bg-gray-100 group-hover:bg-[#8B7355]/10'}`}>
                          <svg className={`w-4 h-4 transition-colors ${isExpanded ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        {faq.answer && (
                          <div className="px-5 md:px-6 pb-5 md:pb-6">
                            <div className="pl-11 md:pl-14 border-l-2 border-[#8B7355]/30">
                              <div
                                className="text-sm md:text-base text-gray-600 leading-relaxed prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  )
}

const ProcessStepsSection = ({ selectedStep, onStepChange }) => {
  const steps = [
    {
      id: 1,
      title: "LET'S CONNECTED ONE ON ONE",
      description: "This is the first step where we connect with you one on one to understand your requirements and preferences."
    },
    {
      id: 2,
      title: "START WITH YOUR DESIGN",
      description: "In this step, we collaborate with you to create a design that meets your vision and requirements."
    },
    {
      id: 3,
      title: "PLACE THE ORDER",
      description: "Once the design is finalized, you can place the order for your customized pooja room."
    },
    {
      id: 4,
      title: "APPROVAL",
      description: "Before proceeding, we ensure that everything is approved by you to meet your expectations."
    },
    {
      id: 5,
      title: "DELIVERY & INSTALLATION",
      description: "Finally, we deliver and install your pooja room at your desired location."
    }
  ]

  return (
    <section className="w-full py-8 md:py-12 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic text-center tracking-wide font-bold">
            <TranslatedText>Our 5-Step Process</TranslatedText>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="relative">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`relative mb-5 cursor-pointer group ${selectedStep === step.id ? 'opacity-100' : 'opacity-70'}`}
                onClick={() => onStepChange(step.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-[#8B8B5C] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 z-10`}>
                    <span className="text-white text-sm font-bold">{step.id}</span>
                  </div>

                  <div className={`flex-1 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 ${selectedStep === step.id ? 'ring-2 ring-[#8B8B5C]' : ''}`}>
                    <h3 className="text-sm font-bold text-gray-800 mb-2 uppercase">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase">
                {steps.find(s => s.id === selectedStep)?.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                {steps.find(s => s.id === selectedStep)?.description}
              </p>
              <hr className="border-gray-300 mb-5" />
              <div className="space-y-5">
                <p className="text-sm text-gray-500 leading-relaxed">
                  More details about this step will be shown here. This is a simplified version of the process steps detail view.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationDetailPage

