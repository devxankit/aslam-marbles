import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
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
        title="AMS INTERNATIONAL"
        subtitle="Global Excellence in Stone Art"
        description="Expanding our legacy of craftsmanship and design excellence across international markets, bringing premium stone art solutions to clients worldwide."
      />

      {/* End to End Solutions Section */}


      {/* GIF with Caption Section */}
      <section className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - GIF */}
            <div className="order-1 md:order-1">
              <div className="relative overflow-hidden rounded-xl shadow-2xl bg-white p-4">
                <img
                  src={internationalGif}
                  alt="AMS International"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Right Side - Caption */}
            <div className="order-2 md:order-2">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic mb-3 sm:mb-6 md:mb-8 leading-tight font-bold">
                <TranslatedText>What Sets AMS International Apart – Short Version</TranslatedText>
              </h2>
              <div className="space-y-2 sm:space-y-4 md:space-y-5">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8B7355] mt-1 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-[#8B7355]">Strong Connector System:</span> Durable nut-and-bolt fittings for secure global installations.
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8B7355] mt-1 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-[#8B7355]">Premium Vietnam Marble:</span> High-quality stone with unmatched shine and energy.
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8B7355] mt-1 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-[#8B7355]">Artistic Detailing:</span> Painting, inlay, overlay, and embossing for rich visual appeal.
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8B7355] mt-1 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-[#8B7355]">Smart Storage Units:</span> Stylish base cabinets for pooja essentials.
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8B7355] mt-1 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-[#8B7355]">Push-to-Open Drawers:</span> Sleek, modern, knob-less design.
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8B7355] mt-1 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-[#8B7355]">Built-In Ambient Lighting:</span> Soft, divine illumination for a serene atmosphere.
                  </p>
                </div>
              </div>
              <div className="w-24 h-1 rounded-full mt-4 sm:mt-6" style={{ backgroundColor: '#8B7355' }}></div>
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
      <section className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-6 md:mb-8 text-center tracking-wide font-bold">
            Understand Your Shipping Timelines
          </h2>

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
                      Temple Width (in feet)
                    </th>
                    <th className="border border-gray-300 px-1 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] xs:text-[10px] sm:text-sm md:text-base font-semibold whitespace-normal md:whitespace-nowrap align-top leading-tight">
                      Design Phase
                    </th>
                    <th className="border border-gray-300 px-1 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] xs:text-[10px] sm:text-sm md:text-base font-semibold whitespace-normal md:whitespace-nowrap align-top leading-tight">
                      Production Lead Time
                    </th>
                    <th className="border border-gray-300 px-1 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] xs:text-[10px] sm:text-sm md:text-base font-semibold whitespace-normal md:whitespace-nowrap align-top leading-tight">
                      Shipping Time
                    </th>
                    <th className="border border-gray-300 px-1 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] xs:text-[10px] sm:text-sm md:text-base font-semibold whitespace-normal md:whitespace-nowrap align-top leading-tight">
                      Average Weight
                    </th>
                    <th className="border border-gray-300 px-1 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] xs:text-[10px] sm:text-sm md:text-base font-semibold whitespace-normal md:whitespace-nowrap align-top leading-tight">
                      Port Delivery Charges <span className="block text-[8px] xs:text-[9px] sm:text-xs font-normal opacity-90 mt-0.5">(Based on October 2024)</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shippingData[activeTab].data.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-300 px-1 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-[9px] xs:text-[10px] sm:text-sm md:text-base text-gray-800 font-medium whitespace-normal md:whitespace-nowrap align-top">
                        {row.width}
                      </td>
                      <td className="border border-gray-300 px-1 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-[9px] xs:text-[10px] sm:text-sm md:text-base text-gray-700 whitespace-normal md:whitespace-nowrap align-top">
                        {row.design}
                      </td>
                      <td className="border border-gray-300 px-1 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-[9px] xs:text-[10px] sm:text-sm md:text-base text-gray-700 whitespace-normal md:whitespace-nowrap align-top">
                        {row.production}
                      </td>
                      <td className="border border-gray-300 px-1 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-[9px] xs:text-[10px] sm:text-sm md:text-base text-gray-700 whitespace-normal md:whitespace-nowrap align-top">
                        {row.shipping}
                      </td>
                      <td className="border border-gray-300 px-1 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-[9px] xs:text-[10px] sm:text-sm md:text-base text-gray-700 whitespace-normal md:whitespace-nowrap align-top">
                        {row.weight}
                      </td>
                      <td className="border border-gray-300 px-1 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-[9px] xs:text-[10px] sm:text-sm md:text-base text-gray-700 font-semibold whitespace-normal md:whitespace-nowrap align-top">
                        {row.charges}
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
              {shippingData[activeTab].note}
            </p>
          </div>
        </div>
      </section>

      {/* 5 Steps Process Section */}
      <ProcessStepsSection selectedStep={selectedProcessStep} onStepChange={setSelectedProcessStep} />

      {/* End to End Solutions Section (Moved) */}
      <section className="w-full py-6 md:py-12 px-2 md:px-6 lg:px-8 bg-[#fffbf0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8 lg:gap-12">
            {/* Design */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 flex items-center justify-center mb-1 sm:mb-3 md:mb-4">
                <img
                  src={designIcon}
                  alt="Design"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[9px] xs:text-[10px] sm:text-base md:text-lg font-medium text-gray-800 leading-tight">
                Design
              </p>
            </div>

            {/* Production */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 flex items-center justify-center mb-1 sm:mb-3 md:mb-4">
                <img
                  src={productionIcon}
                  alt="Production"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[9px] xs:text-[10px] sm:text-base md:text-lg font-medium text-gray-800 leading-tight">
                Production
              </p>
            </div>

            {/* Shipping */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 flex items-center justify-center mb-1 sm:mb-3 md:mb-4">
                <img
                  src={shippingIcon}
                  alt="Shipping"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[9px] xs:text-[10px] sm:text-base md:text-lg font-medium text-gray-800 leading-tight">
                Shipping
              </p>
            </div>

            {/* DIY Assembly */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 flex items-center justify-center mb-1 sm:mb-3 md:mb-4">
                <img
                  src={diyAssemblyIcon}
                  alt="DIY Assembly"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[9px] xs:text-[10px] sm:text-base md:text-lg font-medium text-gray-800 leading-tight">
                DIY Assembly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic text-center mb-8 md:mb-12 font-bold">
            <TranslatedText>Frequently Asked Questions</TranslatedText>
          </h2>

          <div className="space-y-4">
            {loadingFAQs ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-base md:text-lg"><TranslatedText>Loading FAQs...</TranslatedText></p>
              </div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-base md:text-lg"><TranslatedText>No FAQs available at the moment.</TranslatedText></p>
              </div>
            ) : (
              faqs.map((faq, index) => {
                const faqId = faq._id || faq.id || index
                const isExpanded = expandedFaq === faqId
                return (
                  <div key={faqId} className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-base md:text-lg font-semibold text-gray-800 flex-shrink-0">
                          Q.{index + 1}
                        </span>
                        <span className={`text-sm md:text-base font-medium flex-1 ${isExpanded ? 'text-[#8B7355]' : 'text-gray-800'}`}>
                          {faq.question}
                        </span>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {isExpanded ? (
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </div>
                    </button>
                    {isExpanded && faq.answer && (
                      <div className="px-5 pb-4 pt-0">
                        <div className="pl-8 border-l-2 border-gray-300">
                          <div
                            className="text-sm md:text-base text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </section>

      <TrustedBySection />
      <Footer />
      <FloatingButtons />
    </div>
  )
}

const ProcessStepsSection = ({ selectedStep, onStepChange }) => {
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic text-center tracking-wide font-bold">
            <TranslatedText>Our 5-Step Process</TranslatedText>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-8">
          <div className="relative">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`relative mb-2 sm:mb-5 cursor-pointer group ${selectedStep === step.id ? 'opacity-100' : 'opacity-70'}`}
                onClick={() => onStepChange(step.id)}
              >
                <div className="flex items-start gap-1.5 sm:gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[#8B8B5C] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 z-10 mt-0.5 sm:mt-0`}>
                    <span className="text-white text-[10px] sm:text-sm font-bold">{step.id}</span>
                  </div>

                  <div className={`flex-1 bg-white rounded-lg shadow-md p-2 sm:p-4 hover:shadow-lg transition-all duration-300 ${selectedStep === step.id ? 'ring-1 sm:ring-2 ring-[#8B8B5C]' : ''}`}>
                    <h3 className="text-[10px] sm:text-sm font-bold text-gray-800 mb-0.5 sm:mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-[9px] sm:text-xs text-gray-600 leading-tight sm:leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white">
            <div className="bg-white rounded-lg p-3 sm:p-6 border sm:border-0 border-gray-100 shadow-sm sm:shadow-none h-full">
              <h2 className="text-sm sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                {steps.find(s => s.id === selectedStep)?.title}
              </h2>
              <p className="text-[10px] sm:text-sm text-gray-500 mb-3 sm:mb-4 leading-relaxed">
                {steps.find(s => s.id === selectedStep)?.description}
              </p>
              <hr className="border-gray-300 mb-3 sm:mb-5" />
              <div className="space-y-3 sm:space-y-5">
                <p className="text-[10px] sm:text-sm text-gray-500 leading-relaxed">
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

export default TSAInternationalPage

