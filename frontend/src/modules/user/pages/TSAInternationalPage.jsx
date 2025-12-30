import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import ExpertFormSection from '../../../components/common/ExpertFormSection'
import HeroSectionWithForm from '../../../components/common/HeroSectionWithForm'
import { fetchFAQs } from '../../../utils/faqUtils'
import { internationalLocations } from '../../../data/locations'
import TranslatedText from '../../../components/TranslatedText'

// Import hero image
import tsaInternationalHeroImage from '../../../assets/services/TSA international/heading/howitwork_bannerimg.jpeg'

// Import icon card images
import designIcon from '../../../assets/services/TSA international/heading/icon card/Design.jpg'
import productionIcon from '../../../assets/services/TSA international/heading/icon card/production.png'
import shippingIcon from '../../../assets/services/TSA international/heading/icon card/hipping.png'
import diyAssemblyIcon from '../../../assets/services/TSA international/heading/icon card/diy assembly.png'

// Import GIF
import internationalGif from '../../../assets/services/TSA international/gif video/international.gif'
import { usePageTranslation } from '../../../hooks/usePageTranslation'

const TSAInternationalPage = ({
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
  const scrollContainerRef = useRef(null)
  const [activeTab, setActiveTab] = useState('USA')
  const [selectedProcessStep, setSelectedProcessStep] = useState(1)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [faqs, setFaqs] = useState([])
  const [loadingFAQs, setLoadingFAQs] = useState(true)
  const [showMobileForm, setShowMobileForm] = useState(false)
  const { getTranslatedText } = usePageTranslation()

  // Fetch FAQs from API
  useEffect(() => {
    const loadFAQs = async () => {
      try {
        setLoadingFAQs(true)
        const data = await fetchFAQs('ams-international')
        setFaqs(data || [])
      } catch (error) {
        console.error('Error loading FAQs:', error)
        setFaqs([])
      } finally {
        setLoadingFAQs(false)
      }
    }
    loadFAQs()
  }, [])

  const handleLocationClick = (locationName) => {
    navigate(`/location/${locationName.toLowerCase()}`)
  }

  // Shipping timelines data
  const shippingData = {
    USA: {
      data: [
        { width: '3feet', design: '1 week', production: '6-8 weeks', shipping: '4-5 weeks', weight: '200-300 kgs', charges: '$1100++' },
        { width: '4feet', design: '1 week', production: '6-8 weeks', shipping: '4-5 weeks', weight: '400 kgs <', charges: '$1350++' },
        { width: '5feet', design: '7-10 days', production: '8-10 weeks', shipping: '4-5 weeks', weight: '600 kgs <', charges: '$1700++' },
        { width: '6feet', design: '7-10 days', production: '8-10 weeks', shipping: '4-5 weeks', weight: '750 kgs <', charges: '$2000++' },
        { width: '7feet', design: '2-3 weeks', production: '10-12 weeks', shipping: '4-5 weeks', weight: '850 kgs <', charges: '$2400++' },
        { width: '8feet & Beyond', design: '2-3 weeks', production: '10-12 weeks', shipping: '4-5 weeks', weight: '900 kgs <', charges: '$2800++' }
      ],
      note: 'Please note that these are average estimates for all ports. For example, charges to New York port are up to 20% lower. Accurate packing and shipping costs can be provided once your Dream Temple size is finalized.'
    },
    UAE: {
      data: [
        { width: '3feet', design: '1 week', production: '6-8 weeks', shipping: '3 weeks', weight: '200-300 kgs', charges: '$950++' },
        { width: '4feet', design: '1 week', production: '6-8 weeks', shipping: '3 weeks', weight: '400 kgs <', charges: '$1175++' },
        { width: '5feet', design: '7-10 days', production: '8-10 weeks', shipping: '3 weeks', weight: '600 kgs <', charges: '$1500++' },
        { width: '6feet', design: '7-10 days', production: '8-10 weeks', shipping: '3 weeks', weight: '750 kgs <', charges: '$1760++' },
        { width: '7feet & Beyond', design: '2-3 weeks', production: '10-12 weeks', shipping: '3 weeks', weight: '850 kgs <', charges: '$2050++' }
      ],
      note: 'Please note these rough estimates include packing and shipping to the UAE Port (Jebel Ali). The estimated shipping time from Kishangarh to the Port of Jebel Ali is approximately 21 days (3 weeks).'
    },
    AUSTRALIA: {
      data: [
        { width: '3feet', design: '1 week', production: '6-8 weeks', shipping: '6 weeks', weight: '200-300 kgs', charges: 'AU$1500++' },
        { width: '4feet', design: '1 week', production: '6-8 weeks', shipping: '6 weeks', weight: '400 kgs <', charges: 'AU$1800++' },
        { width: '5feet', design: '7-10 days', production: '8-10 weeks', shipping: '6 weeks', weight: '600 kgs <', charges: 'AU$2250++' },
        { width: '6feet', design: '7-10 days', production: '8-10 weeks', shipping: '6 weeks', weight: '750 kgs <', charges: 'AU$2660++' },
        { width: '7feet & Beyond', design: '2-3 weeks', production: '10-12 weeks', shipping: '6 weeks', weight: '850 kgs <', charges: 'AU$3100++' }
      ],
      note: 'Please note these costs are average estimates for the Port of Sydney. For other Australian ports, the shipping time is approximately 50-60 days. Accurate packing and shipping costs will be provided once your Dream Temple size is finalized.'
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let scrollPosition = 0
    const scrollSpeed = 1 // pixels per frame
    const animationDuration = 30 // milliseconds per frame

    const scroll = () => {
      scrollPosition += scrollSpeed

      // Reset scroll position when it reaches the end
      if (scrollPosition >= container.scrollWidth - container.clientWidth) {
        scrollPosition = 0
      }

      container.scrollLeft = scrollPosition
    }

    const intervalId = setInterval(scroll, animationDuration)

    // Pause on hover
    const handleMouseEnter = () => {
      clearInterval(intervalId)
    }

    const handleMouseLeave = () => {
      const newIntervalId = setInterval(scroll, animationDuration)
      // Store interval ID for cleanup
      container._scrollInterval = newIntervalId
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearInterval(intervalId)
      if (container._scrollInterval) {
        clearInterval(container._scrollInterval)
      }
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
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

      {/* Hero Section with Form */}
      <HeroSectionWithForm
        source="tsa-international-page"
        heroImage={tsaInternationalHeroImage}
        title={getTranslatedText("AMS INTERNATIONAL")}
        subtitle={getTranslatedText("Global Excellence in Stone Art")}
        description={getTranslatedText("Expanding our legacy of craftsmanship and design excellence across international markets, bringing premium stone art solutions to clients worldwide.")}
        disableGradient={true}
        enableMobileModal={true}
        onMobileButtonClick={() => setShowMobileForm(true)}
      />

      {/* Mobile Form Modal */}
      {showMobileForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setShowMobileForm(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-scaleIn bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <ExpertFormOverlay
              source="tsa-international-page"
              className="w-full flex flex-col max-h-[85vh]"
              onClose={() => setShowMobileForm(false)}
            />
          </div>
        </div>
      )}

      {/* End to End Solutions Section */}


      {/* GIF with Caption Section */}
      <section className="w-full py-12 md:py-20 px-3 md:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 lg:p-12 border-2 border-white/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left Side - GIF */}
              <div className="order-1">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                  <img
                    src={internationalGif}
                    alt="AMS International"
                    className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
                </div>
              </div>

              {/* Right Side - Caption */}
              <div className="order-2">
                <span className="text-[#8B7355] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 block">
                  <TranslatedText>Global Standards</TranslatedText>
                </span>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-6 leading-tight">
                  <TranslatedText>What Sets AMS International Apart</TranslatedText>
                </h2>

                <div className="space-y-4 md:space-y-6 mb-8">
                  {[
                    { title: "Strong Connector System", desc: "Durable nut-and-bolt fittings for secure global installations." },
                    { title: "Premium Vietnam Marble", desc: "High-quality stone with unmatched shine and energy." },
                    { title: "Artistic Detailing", desc: "Painting, inlay, overlay, and embossing for rich visual appeal." },
                    { title: "Smart Storage Units", desc: "Stylish base cabinets for pooja essentials." },
                    { title: "Push-to-Open Drawers", desc: "Sleek, modern, knob-less design." },
                    { title: "Built-In Ambient Lighting", desc: "Soft, divine illumination for a serene atmosphere." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className="w-2 h-2 rounded-full bg-[#8B7355] mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                      <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
                        <span className="font-bold text-[#8B7355]"><TranslatedText>{item.title}:</TranslatedText></span> <TranslatedText>{item.desc}</TranslatedText>
                      </p>
                    </div>
                  ))}
                </div>
                <div className="w-24 h-1 bg-[#8B7355]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Locations Auto-Scroll Section */}
      <section className="w-full py-8 md:py-12 bg-[#fffbf0]">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic text-center tracking-wide font-bold">
              <TranslatedText>Our International Presence</TranslatedText>
            </h2>
          </div>

          {/* Auto-scrolling container - Full Width Background */}
          <div
            ref={scrollContainerRef}
            className="w-full overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
          >
            <div className="flex items-center gap-6 sm:gap-10 md:gap-16 lg:gap-24 xl:gap-32 py-4" style={{ width: 'max-content' }}>
              {/* Duplicate locations for seamless loop */}
              {[...internationalLocations, ...internationalLocations, ...internationalLocations].map((location, index) => (
                <div
                  key={`${location.name}-${index}`}
                  className="flex-shrink-0 flex flex-col items-center group cursor-pointer"
                  onClick={() => handleLocationClick(location.name)}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 p-1 sm:p-2">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="mt-2 text-[10px] sm:text-xs md:text-sm font-bold text-[#8B7355] uppercase tracking-wider text-center">
                    {location.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Timelines Section */}
      <section className="w-full py-12 md:py-24 px-3 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#8B7355] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-3 block">
              <TranslatedText>Logistics & Delivery</TranslatedText>
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-6 tracking-tight">
              <TranslatedText>Shipping Timelines</TranslatedText>
            </h2>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#8B7355] to-transparent mx-auto opacity-40"></div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
            {['USA', 'UAE', 'AUSTRALIA'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 md:px-6 md:py-2 lg:px-8 lg:py-3 text-xs sm:text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wide transition-all duration-300 whitespace-nowrap ${activeTab === tab
                  ? 'bg-black text-white'
                  : 'bg-white text-black border-2 border-gray-300 hover:border-[#8B7355]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="w-full border-collapse bg-white shadow-lg">
                <thead>
                  <tr className="bg-[#8B7355] text-white">
                    <th className="border border-gray-300 px-1 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] xs:text-[10px] sm:text-sm md:text-base font-semibold whitespace-normal md:whitespace-nowrap align-top leading-tight">
                      <TranslatedText>Temple Width (in feet)</TranslatedText>
                    </th>
                    <th className="border border-gray-300 px-1 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] xs:text-[10px] sm:text-sm md:text-base font-semibold whitespace-normal md:whitespace-nowrap align-top leading-tight">
                      <TranslatedText>Design Phase</TranslatedText>
                    </th>
                    <th className="border border-gray-300 px-1 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] xs:text-[10px] sm:text-sm md:text-base font-semibold whitespace-normal md:whitespace-nowrap align-top leading-tight">
                      <TranslatedText>Production Lead Time</TranslatedText>
                    </th>
                    <th className="border border-gray-300 px-1 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] xs:text-[10px] sm:text-sm md:text-base font-semibold whitespace-normal md:whitespace-nowrap align-top leading-tight">
                      <TranslatedText>Shipping Time</TranslatedText>
                    </th>
                    <th className="border border-gray-300 px-1 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] xs:text-[10px] sm:text-sm md:text-base font-semibold whitespace-normal md:whitespace-nowrap align-top leading-tight">
                      <TranslatedText>Average Weight</TranslatedText>
                    </th>
                    <th className="border border-gray-300 px-1 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] xs:text-[10px] sm:text-sm md:text-base font-semibold whitespace-normal md:whitespace-nowrap align-top leading-tight">
                      <TranslatedText>Port Delivery Charges</TranslatedText> <span className="block text-[8px] xs:text-[9px] sm:text-xs font-normal opacity-90 mt-0.5">(<TranslatedText>Based on October 2024</TranslatedText>)</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shippingData[activeTab].data.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-300 px-1 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-[9px] xs:text-[10px] sm:text-sm md:text-base text-gray-800 font-medium whitespace-normal md:whitespace-nowrap align-top">
                        <TranslatedText>{row.width}</TranslatedText>
                      </td>
                      <td className="border border-gray-300 px-1 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-[9px] xs:text-[10px] sm:text-sm md:text-base text-gray-700 whitespace-normal md:whitespace-nowrap align-top">
                        <TranslatedText>{row.design}</TranslatedText>
                      </td>
                      <td className="border border-gray-300 px-1 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-[9px] xs:text-[10px] sm:text-sm md:text-base text-gray-700 whitespace-normal md:whitespace-nowrap align-top">
                        <TranslatedText>{row.production}</TranslatedText>
                      </td>
                      <td className="border border-gray-300 px-1 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-[9px] xs:text-[10px] sm:text-sm md:text-base text-gray-700 whitespace-normal md:whitespace-nowrap align-top">
                        <TranslatedText>{row.shipping}</TranslatedText>
                      </td>
                      <td className="border border-gray-300 px-1 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-[9px] xs:text-[10px] sm:text-sm md:text-base text-gray-700 whitespace-normal md:whitespace-nowrap align-top">
                        <TranslatedText>{row.weight}</TranslatedText>
                      </td>
                      <td className="border border-gray-300 px-1 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-[9px] xs:text-[10px] sm:text-sm md:text-base text-gray-700 font-semibold whitespace-normal md:whitespace-nowrap align-top">
                        <TranslatedText>{row.charges}</TranslatedText>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Note */}
          <div className="mt-6 md:mt-8 p-4 md:p-5 bg-gray-50 rounded-lg border-l-4 border-[#8B7355]">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 uppercase">
              {activeTab}
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>{shippingData[activeTab].note}</TranslatedText>
            </p>
          </div>
        </div>
      </section>

      {/* 5 Steps Process Section */}
      <ProcessStepsSection selectedStep={selectedProcessStep} onStepChange={setSelectedProcessStep} />

      {/* End to End Solutions Section */}
      <section className="w-full py-12 md:py-20 px-3 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
            {[
              { icon: designIcon, title: "Design" },
              { icon: productionIcon, title: "Production" },
              { icon: shippingIcon, title: "Shipping" },
              { icon: diyAssemblyIcon, title: "DIY Assembly" }
            ].map((item, idx) => (
              <div key={idx} className="group flex flex-col items-center text-center bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:-translate-y-2">
                <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="text-sm md:text-xl font-serif text-[#8B7355] italic font-bold tracking-wider">
                  <TranslatedText>{item.title}</TranslatedText>
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 px-3 md:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#8B7355] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-3 block">
              <TranslatedText>Support</TranslatedText>
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-6 tracking-tight">
              <TranslatedText>Frequently Asked Questions</TranslatedText>
            </h2>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#8B7355] to-transparent mx-auto opacity-40"></div>
          </div>

          <div className="space-y-4">
            {loadingFAQs ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-[#8B7355] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600 text-base md:text-lg"><TranslatedText>Loading FAQs...</TranslatedText></p>
                </div>
              </div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500 text-base md:text-lg"><TranslatedText>No FAQs available at the moment.</TranslatedText></p>
              </div>
            ) : (
              faqs.map((faq, index) => {
                const faqId = faq._id || faq.id || index
                const isExpanded = expandedFaq === faqId
                return (
                  <div
                    key={faqId}
                    className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all duration-300 ${isExpanded ? 'border-[#8B7355] shadow-md ring-1 ring-[#8B7355]/20' : 'border-gray-100 hover:shadow-md hover:border-gray-200'}`}
                  >
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                      className="w-full px-5 md:px-6 py-5 flex items-center justify-between text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <span className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold flex-shrink-0 transition-colors ${isExpanded ? 'bg-[#8B7355] text-white' : 'bg-[#8B7355]/10 text-[#8B7355] group-hover:bg-[#8B7355]/20'}`}>
                          {index + 1}
                        </span>
                        <span className={`text-base font-bold flex-1 transition-colors ${isExpanded ? 'text-[#8B7355]' : 'text-gray-800'}`}>
                          {faq.question}
                        </span>
                      </div>
                      <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isExpanded ? 'bg-[#8B7355] rotate-180' : 'bg-gray-100'}`}>
                        <svg className={`w-4 h-4 transition-colors ${isExpanded ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      {faq.answer && (
                        <div className="px-6 pb-6">
                          <div className="pl-14 border-l-2 border-[#8B7355]/30">
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

      <ExpertFormSection />
      <TrustedBySection />
      <Footer />
      <FloatingButtons />
    </div>
  )
}

const ProcessStepsSection = ({ selectedStep, onStepChange }) => {
  const { getTranslatedText } = usePageTranslation()

  const steps = [
    {
      id: 1,
      title: "Let's Connect One on One",
      description: "This is the first step where we connect with you one on one to understand your requirements and preferences."
    },
    {
      id: 2,
      title: "Start With Your Design",
      description: "In this step, we collaborate with you to create a design that meets your vision and requirements."
    },
    {
      id: 3,
      title: "Place The Order",
      description: "Once the design is finalized, you can place the order for your customized pooja room."
    },
    {
      id: 4,
      title: "Approval",
      description: "Before proceeding, we ensure that everything is approved by you to meet your expectations."
    },
    {
      id: 5,
      title: "Delivery & Installation",
      description: "Finally, we deliver and install your pooja room at your desired location."
    }
  ]

  return (
    <section className="w-full py-6 md:py-12 px-3 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#8B7355] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-3 block">
            <TranslatedText>Our Methodology</TranslatedText>
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-6 tracking-tight">
            <TranslatedText>Our 5-Step Process</TranslatedText>
          </h2>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#8B7355] to-transparent mx-auto opacity-40"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="space-y-4 md:space-y-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`group relative bg-white rounded-2xl p-5 md:p-6 cursor-pointer transition-all duration-500 border-2 ${selectedStep === step.id ? 'border-[#8B7355] shadow-xl' : 'border-gray-50 hover:border-gray-200'}`}
                onClick={() => onStepChange(step.id)}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className={`flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-sm md:text-xl font-black transition-all duration-500 ${selectedStep === step.id ? 'bg-[#8B7355] text-white rotate-[360deg]' : 'bg-gray-100 text-[#8B7355]'}`}>
                    0{step.id}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm md:text-lg font-black uppercase tracking-widest mb-2 transition-colors duration-300 ${selectedStep === step.id ? 'text-[#8B7355]' : 'text-gray-800'}`}>
                      <TranslatedText>{step.title}</TranslatedText>
                    </h3>
                    <p className="text-xs md:text-base text-gray-500 line-clamp-2 md:line-clamp-none font-medium">
                      <TranslatedText>{step.description}</TranslatedText>
                    </p>
                  </div>
                </div>
                {selectedStep === step.id && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:block">
                    <div className="w-6 h-6 bg-[#8B7355] rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="sticky top-24">
            <div className="bg-[#8B7355]/5 rounded-3xl p-6 md:p-10 border-2 border-white shadow-2xl backdrop-blur-sm">
              <div className="w-16 h-1 bg-[#8B7355] mb-8"></div>
              <h2 className="text-2xl md:text-4xl font-serif text-[#8B7355] italic mb-6 leading-tight">
                <TranslatedText>{steps.find(s => s.id === selectedStep)?.title}</TranslatedText>
              </h2>
              <div className="space-y-6">
                <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
                  <TranslatedText>{steps.find(s => s.id === selectedStep)?.description}</TranslatedText>
                </p>
                <div className="pt-6 border-t border-[#8B7355]/20">
                  <div className="flex items-center gap-4 text-[#8B7355]">
                    <div className="w-8 h-8 rounded-full bg-[#8B7355] text-white flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-bold text-xs md:text-sm uppercase tracking-widest">
                      <TranslatedText>Guaranteed Quality</TranslatedText>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TSAInternationalPage

