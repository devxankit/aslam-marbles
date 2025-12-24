import React, { useState, useCallback, memo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import StepSection from '../../../components/common/StepSection'
import StepInfoItem from '../../../components/common/StepInfoItem'
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver'
import { THEME_COLORS } from '../../../utils/theme'
import headingImage from '../../../assets/ourcreation/communal temple/heading/8d836775-b2f6-4c0a-8ab4-5b7c27a36e55.png'
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from '../../../utils/constants'
import turnkeyIcon from '../../../assets/ourcreation/communal temple/lcons/Gemini_Generated_Image_br9ai2br9ai2br9a.png'
import templesMadeIcon from '../../../assets/ourcreation/communal temple/lcons/Gemini_Generated_Image_gifll4gifll4gifl.png'
import siteSupervisionIcon from '../../../assets/ourcreation/communal temple/lcons/Gemini_Generated_Image_s13ihos13ihos13i.png'
import transparencyIcon from '../../../assets/ourcreation/communal temple/lcons/Gemini_Generated_Image_8wdizp8wdizp8wdi.png'
// 5 Step Icons and GIFs
import icon1 from '../../../assets/how it work/icons/icon1.png'
import icon2 from '../../../assets/how it work/icons/icon2.png'
import icon3 from '../../../assets/how it work/icons/icon3.png'
import icon4 from '../../../assets/how it work/icons/icon4.png'
import icon5 from '../../../assets/how it work/icons/icon5.png'
import gif1 from '../../../assets/how it work/5stepvideo/image1.gif'
import gif2 from '../../../assets/how it work/5stepvideo/image2.gif'
import gif3 from '../../../assets/how it work/5stepvideo/image3.gif'
import gif4 from '../../../assets/how it work/5stepvideo/image4.gif'
import gif5 from '../../../assets/how it work/5stepvideo/image5.gif'
// Service Icons
import wallIcon from '../../../assets/ourcreation/pooja room/icons/1wall.png'
import floorIcon from '../../../assets/ourcreation/pooja room/icons/2floor.png'
import virtualIcon from '../../../assets/ourcreation/pooja room/icons/3virtual.png'
import customDesignIcon from '../../../assets/ourcreation/pooja room/icons/4custom design.png'
import visualisationIcon from '../../../assets/ourcreation/pooja room/icons/5visualisation.png'
import projectTrackingIcon from '../../../assets/ourcreation/pooja room/icons/6project tracking.png'
import { fetchCommunalTemplesData } from '../../../utils/communalTemplesUtils'

const CommunalTemplesPage = ({ onShowCart, onShowLikes }) => {
  const navigate = useNavigate()
  const [formStep, setFormStep] = useState(1)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { refs, visibleSections } = useIntersectionObserver(0.3)
  const [pageData, setPageData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchCommunalTemplesData()
        if (data) {
          setPageData(data)
        }
      } catch (error) {
        console.error("Error loading communal temples data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev)
  }, [])

  const [formData, setFormData] = useState({
    type: 'DOMESTIC',
    fullName: '',
    email: '',
    phone: '',
    city: '',
    aboutYourself: '',
    lookingFor: '',
    budget: '',
    timeline: '',
    additionalInfo: '',
    designReferences: null
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you! Your form has been submitted.')
    setFormStep(1)
    setFormData({
      type: 'DOMESTIC',
      fullName: '',
      email: '',
      phone: '',
      city: '',
      aboutYourself: '',
      lookingFor: '',
      budget: '',
      timeline: '',
      additionalInfo: '',
      designReferences: null
    })
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

      {/* Hero Image Container with Form Overlay */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {/* Horizontal Heading Image */}
        <img
          src={pageData?.heroSection?.image?.url || headingImage}
          alt={pageData?.heroSection?.image?.alt || "Communal Temples"}
          className="w-full h-full object-cover object-top"
        />

        {/* Gradient Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/0"></div>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/10">
          <h1 className="text-4xl md:text-6xl font-serif text-white italic drop-shadow-2xl mb-4">
            {pageData?.heroSection?.title || "Crafting Sacred Communal Spaces"}
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium max-w-3xl drop-shadow-lg">
            {pageData?.heroSection?.subtitle || "Exquisite marble temples built with devotion and architectural excellence for communities worldwide."}
          </p>
        </div>
      </div>

      {/* Why Choose Us Section - Updated Design */}
      <section className="w-full py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-[#8B7355] italic mb-6">Why Choose Us</h2>
            <div className="w-24 h-1 mx-auto bg-[#8B7355] rounded-full opacity-60"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {(pageData?.whyChooseUs || [
              { icon: turnkeyIcon, title: "Turnkey Projects", desc: "End-to-end execution from design to completion" },
              { icon: templesMadeIcon, title: "100+ Temples", desc: "Successfully delivered over 100 communal temples" },
              { icon: siteSupervisionIcon, title: "Site Supervision", desc: "Dedicated supervisors ensuring quality at every step" },
              { icon: transparencyIcon, title: "100% Transparency", desc: "Clear communication and transparent pricing" }
            ]).map((item, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(139,115,85,0.15)] transition-all duration-500 hover:-translate-y-2 text-center">
                <div className="w-24 h-24 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-[#8B7355]/5 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500"></div>
                  <img src={item.icon?.url || item.icon} alt={item.title} className="w-full h-full object-contain relative z-10 p-2" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#8B7355] transition-colors">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc || item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Steps Section */}
      <div className="w-full bg-white py-8 md:py-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic font-bold mb-3">
              Build Your Dream Temple in Just 5 Steps
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600">
              Ready to design your Dream Temple? Here's how you can get started.
            </p>
          </div>

          {/* 5 Steps Icons */}
          <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 mt-6 md:mt-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center flex-shrink-0 w-[100px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
              <div className="relative mb-3 rounded-full">
                <img
                  src={pageData?.fiveSteps?.steps[0]?.icon?.url || icon1}
                  alt="Step 1 - Let's Connect"
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                {pageData?.fiveSteps?.steps[0]?.title || "Let's Connect One on One"}
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="hidden sm:flex items-center justify-center mx-0.5 md:mx-1 flex-shrink-0">
              <svg className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-5 xl:w-10 xl:h-6" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12L35 12M35 12L26 3M35 12L26 21" stroke={THEME_COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-shrink-0 w-[100px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
              <div className="relative mb-3 rounded-full">
                <img
                  src={pageData?.fiveSteps?.steps[1]?.icon?.url || icon2}
                  alt="Step 2 - Explore Catalog"
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                {pageData?.fiveSteps?.steps[1]?.title || "Explore our Catalog"}
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="hidden sm:flex items-center justify-center mx-0.5 md:mx-1 flex-shrink-0">
              <svg className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-5 xl:w-10 xl:h-6" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12L35 12M35 12L26 3M35 12L26 21" stroke={THEME_COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-shrink-0 w-[100px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
              <div className="relative mb-3 rounded-full">
                <img
                  src={pageData?.fiveSteps?.steps[2]?.icon?.url || icon3}
                  alt="Step 3 - Place Order"
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                {pageData?.fiveSteps?.steps[2]?.title || "Place The Order"}
              </p>
            </div>

            {/* Arrow 3 */}
            <div className="hidden sm:flex items-center justify-center mx-0.5 md:mx-1 flex-shrink-0">
              <svg className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-5 xl:w-10 xl:h-6" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12L35 12M35 12L26 3M35 12L26 21" stroke={THEME_COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center flex-shrink-0 w-[100px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
              <div className="relative mb-3 rounded-full">
                <img
                  src={pageData?.fiveSteps?.steps[3]?.icon?.url || icon4}
                  alt="Step 4 - Approval"
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                {pageData?.fiveSteps?.steps[3]?.title || "Approval"}
              </p>
            </div>

            {/* Arrow 4 */}
            <div className="hidden sm:flex items-center justify-center mx-0.5 md:mx-1 flex-shrink-0">
              <svg className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-5 xl:w-10 xl:h-6" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12L35 12M35 12L26 3M35 12L26 21" stroke={THEME_COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center flex-shrink-0 w-[100px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
              <div className="relative mb-3 rounded-full">
                <img
                  src={pageData?.fiveSteps?.steps[4]?.icon?.url || icon5}
                  alt="Step 5 - Delivery and Installation"
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                {pageData?.fiveSteps?.steps[4]?.title || "Delivery and Installation"}
              </p>
            </div>
          </div>

          {/* Start Your Project Button */}
          <div className="flex justify-center mt-6 md:mt-8 mb-8 md:mb-10">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="px-6 py-3 md:px-8 md:py-4 text-white text-sm md:text-base font-bold uppercase tracking-wide transition-colors shadow-lg hover:opacity-90"
              style={{ backgroundColor: THEME_COLORS.primary }}
            >
              Start Your Project Now
            </button>
          </div>
        </div>
      </div>

      {/* Step 1: Let's Connect One on One */}
      <StepSection
        stepRef={refs.step1}
        isVisible={visibleSections.step1}
        gifSrc={pageData?.fiveSteps?.steps[0]?.gif?.url || gif1}
        gifAlt="Let's Connect One on One"
        subtitle="GET STARTED WITH OUR 5 STEP EASY PROCESS"
        title={pageData?.fiveSteps?.steps[0]?.title || "LETS CONNECT ONE ON ONE"}
      >
        <div className="space-y-4">
          <StepInfoItem
            title="It all Begins with a Form"
            description="Let's get acquainted. The more we learn about you, the better we can design your home."
            buttonText="Fill Form Link"
            onButtonClick={() => navigate('/book-appointment')}
          />
          <StepInfoItem
            title="Connect over a Meet"
            description="Let's get acquainted. The more we learn about you, the better we can design your home."
          />
        </div>
      </StepSection>

      {/* Step 2: Start with Your Design */}
      <StepSection
        stepRef={refs.step2}
        isVisible={visibleSections.step2}
        gifSrc={pageData?.fiveSteps?.steps[1]?.gif?.url || gif2}
        gifAlt="Start with Your Design"
        bgColor={THEME_COLORS.secondary}
      >
        <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-4">
          Start With Your Design
        </h2>
        <div className="space-y-4">
          <StepInfoItem
            title="Pay the Design Fee"
            description="Once we understand your requirements and we feel we can help you, and you are happy with the session, start with your design by choosing one of the design plans. Don't Worry if you have wrong measurements we also take our own site measurements in one of the plans."
          />
          <StepInfoItem
            title="Finalise your Design"
            description="Once we agree on a Design we will finalise it to start the production."
          />
        </div>
      </StepSection>

      {/* Step 3: Place The Order */}
      <div className="w-full bg-white py-8 md:py-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <StepSection
            stepRef={refs.step3}
            isVisible={visibleSections.step3}
            gifSrc={pageData?.fiveSteps?.steps[2]?.gif?.url || gif3}
            gifAlt="Place The Order"
          >
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-4">
              Place The Order
            </h2>
            <div className="space-y-4">
              <StepInfoItem
                title="Start the Order Process"
                description="Once you're happy with what we've proposed, pay 50% of the final quote."
              />
              <StepInfoItem
                title="The Work Commences"
                description="Keep a tab on your project status on the portal provided."
              />
            </div>
          </StepSection>

          {/* Status Banner */}
          <div className="w-full py-4 md:py-6 px-6 md:px-8 rounded-lg flex items-center gap-4 mt-8" style={{ backgroundColor: THEME_COLORS.primary }}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white text-sm md:text-base lg:text-lg font-bold uppercase">
              YOU ARE HALF WAY THERE ! YOUR ORDER IS IN PROCESS
            </p>
          </div>
        </div>
      </div>

      {/* Step 4: Approval */}
      <div className="w-full bg-white py-8 md:py-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <StepSection
            stepRef={refs.step4}
            isVisible={visibleSections.step4}
            gifSrc={pageData?.fiveSteps?.steps[3]?.gif?.url || gif4}
            gifAlt="Approval"
            bgColor={THEME_COLORS.accent}
          >
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-4">
              Approval
            </h2>
            <div className="space-y-4">
              <StepInfoItem
                title="Give your Approval"
                description="Once the Order reaches the approval stage, you will be asked to provide your feedback and approve"
              />
              <StepInfoItem
                title="Pay 100% at Execution Milestone"
                description="Once the Order is fully set according to your requirements pay the 100% and the next stage begins."
              />
            </div>
          </StepSection>

          {/* Payment Confirmation Banner */}
          <div className="w-full py-4 md:py-6 px-6 md:px-8 rounded-lg flex items-center gap-4 mt-8" style={{ backgroundColor: THEME_COLORS.primary }}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white text-sm md:text-base lg:text-lg font-bold uppercase">
              HURRAH! COMPLETE PAYMENT HAS BEEN MADE!
            </p>
          </div>
        </div>
      </div>

      {/* Step 5: Delivery and Installation */}
      <StepSection
        stepRef={refs.step5}
        isVisible={visibleSections.step5}
        gifSrc={pageData?.fiveSteps?.steps[4]?.gif?.url || gif5}
        gifAlt="Delivery and Installation"
      >
        <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-4">
          Delivery And Installation
        </h2>
        <div className="space-y-4">
          <StepInfoItem
            title="Prepare for Delivery"
            description="Once the 100% of the order value is received we prepare for the Delivery and Installation of the Order"
          />
          <StepInfoItem
            title="Installation"
            description="Our Team reaches your Home and Install it at your space"
          />
        </div>
      </StepSection>

      {/* Services Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-14 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic mb-4 md:mb-5 tracking-wide">
              We Offer Unparalleled Services
            </h2>
            <div className="w-24 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: THEME_COLORS.primary }}></div>
          </div>

          {/* Services Grid - 2x3 Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {(pageData?.services || [
              { id: 1, name: 'Wall Cladding', icon: wallIcon },
              { id: 2, name: 'Floor Inlay', icon: floorIcon },
              { id: 3, name: 'Virtual Tour', icon: virtualIcon },
              { id: 4, name: 'Custom Design', icon: customDesignIcon },
              { id: 5, name: '3D visualisation', icon: visualisationIcon },
              { id: 6, name: 'Project Tracking', icon: projectTrackingIcon }
            ]).map((service, index) => (
              <div
                key={service.id || index}
                className="group cursor-pointer bg-white border-2 border-gray-200 rounded-xl p-6 md:p-8 hover:border-[#8B7355] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                    <img
                      src={service.icon?.url || service.icon}
                      alt={service.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-[#8B7355] transition-colors duration-300">
                    {service.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE AMS DIFFERENCE Comparison Table Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-4 md:mb-5 tracking-wide">
              The AMS Difference
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover why thousands choose us for their sacred space design
            </p>
            <div className="w-24 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: THEME_COLORS.primary }}></div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`
  .scrollbar - hide:: -webkit - scrollbar {
  display: none;
}
`}</style>
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-transform duration-300 min-w-full">
              <thead>
                <tr>
                  <th className="px-2 py-3 md:px-3 md:py-3 text-left text-xs md:text-sm font-bold text-gray-800 uppercase border border-gray-200 bg-gray-50">
                    Feature
                  </th>
                  <th
                    className="px-2 py-3 md:px-3 md:py-3 text-center text-xs md:text-sm font-bold text-white uppercase border border-gray-200"
                    style={{ backgroundColor: THEME_COLORS.primary }}
                  >
                    Aslam Marble Suppliers
                  </th>
                  <th className="px-2 py-3 md:px-3 md:py-3 text-center text-xs md:text-sm font-bold text-gray-800 uppercase border border-gray-200 bg-gray-50">
                    Local Vendors
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1: Artisanal Expertise */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    Artisanal Expertise
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: THEME_COLORS.primary }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>25+ Years Experience</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>May Vary</span>
                    </div>
                  </td>
                </tr>

                {/* Row 2: Customized Design */}
                <tr className="hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#f9f9f9' }}>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    Customized Design
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: THEME_COLORS.primary }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Tradition & Modernity</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Limited Options</span>
                    </div>
                  </td>
                </tr>

                {/* Row 3: Durability and Quality */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    Durability and Quality
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: THEME_COLORS.primary }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Assured</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Questionable</span>
                    </div>
                  </td>
                </tr>

                {/* Row 4: Established Trust */}
                <tr className="hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#f9f9f9' }}>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    Established Trust
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: THEME_COLORS.primary }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Proven Reliability</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Uncertain</span>
                    </div>
                  </td>
                </tr>

                {/* Row 5: End to End Support */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    End to End Support
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: THEME_COLORS.primary }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>From Design to Installation</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Limited</span>
                    </div>
                  </td>
                </tr>

                {/* Row 6: Marble Expertise */}
                <tr className="hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#f9f9f9' }}>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    Marble Expertise
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: THEME_COLORS.primary }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Specialized Knowledge</span>
                    </div >
                  </td >
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>General Know-how</span>
                    </div>
                  </td>
                </tr>

                {/* Row 7: Global Standards Compliance */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    Global Standards Compliance
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: THEME_COLORS.primary }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>International Quality</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Unverified</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <TrustedBySection />
      <Footer />
      <FloatingButtons />

      {/* Talk to Expert Sidebar */}
      {/* Backdrop */}
      {
        isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-500 animate-fadeIn"
            onClick={() => setIsSidebarOpen(false)}
          />
        )
      }

      {/* Sidebar Content */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[101] shadow-[0_0_50px_rgba(0,0,0,0.2)] transform transition-transform duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-[#8B7355]/10">
            <div>
              <h3 className="text-lg font-bold text-[#8B7355] uppercase tracking-wide">Talk to Our Expert</h3>
              <p className="text-[10px] text-[#8B7355]/70 font-bold uppercase tracking-widest mt-0.5">Customized Temple Solutions</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold px-2 py-1 bg-[#8B7355] text-white rounded-full">{formStep}/2</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-300 transform hover:rotate-90"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {formStep === 1 ? (
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setFormStep(2); }}>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${formData.type === 'DOMESTIC' ? 'border-[#8B7355] bg-[#8B7355]/5' : 'border-gray-300'} group-hover:border-[#8B7355]`}>
                      {formData.type === 'DOMESTIC' && <div className="w-2 h-2 rounded-full bg-[#8B7355] animate-scaleIn" />}
                    </div>
                    <input
                      type="radio"
                      name="type"
                      value="DOMESTIC"
                      checked={formData.type === 'DOMESTIC'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="hidden"
                    />
                    <span className={`text-xs font-bold tracking-wider transition-colors ${formData.type === 'DOMESTIC' ? 'text-[#8B7355]' : 'text-gray-500'} group-hover:text-[#8B7355]`}>DOMESTIC</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${formData.type === 'INTERNATIONAL' ? 'border-[#8B7355] bg-[#8B7355]/5' : 'border-gray-300'} group-hover:border-[#8B7355]`}>
                      {formData.type === 'INTERNATIONAL' && <div className="w-2 h-2 rounded-full bg-[#8B7355] animate-scaleIn" />}
                    </div>
                    <input
                      type="radio"
                      name="type"
                      value="INTERNATIONAL"
                      checked={formData.type === 'INTERNATIONAL'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="hidden"
                    />
                    <span className={`text-xs font-bold tracking-wider transition-colors ${formData.type === 'INTERNATIONAL' ? 'text-[#8B7355]' : 'text-gray-500'} group-hover:text-[#8B7355]`}>INTERNATIONAL</span>
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B7355] focus:bg-white focus:ring-1 focus:ring-[#8B7355] transition-all"
                      required
                    />
                  </div>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B7355] focus:bg-white focus:ring-1 focus:ring-[#8B7355] transition-all"
                      required
                    />
                  </div>
                  <div className="flex bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#8B7355] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#8B7355] transition-all">
                    <div className="flex items-center px-4 bg-gray-100/50 border-r border-gray-200">
                      <span className="text-sm font-medium">🇮🇳 +91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 px-4 py-3.5 text-sm bg-transparent focus:outline-none"
                      required
                    />
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="City *"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B7355] focus:bg-white focus:ring-1 focus:ring-[#8B7355] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <p className="text-xs font-black text-gray-400 mb-4 uppercase tracking-[0.2em] shadow-sm inline-block">Tell us about yourself *</p>
                  <div className="space-y-3">
                    <label className="flex items-start gap-4 cursor-pointer p-3 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-[#8B7355]/30 transition-all group">
                      <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${formData.aboutYourself === 'homeowner' ? 'border-[#8B7355] bg-[#8B7355]' : 'border-gray-300 bg-white'}`}>
                        {formData.aboutYourself === 'homeowner' && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                      </div>
                      <input
                        type="radio"
                        name="aboutYourself"
                        value="homeowner"
                        checked={formData.aboutYourself === 'homeowner'}
                        onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                        className="hidden"
                        required
                      />
                      <span className="text-xs md:text-sm font-medium text-gray-600 leading-snug group-hover:text-gray-900 transition-colors">I am a homeowner looking for a communal temple</span>
                    </label>
                    <label className="flex items-start gap-4 cursor-pointer p-3 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-[#8B7355]/30 transition-all group">
                      <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${formData.aboutYourself === 'designer' ? 'border-[#8B7355] bg-[#8B7355]' : 'border-gray-300 bg-white'}`}>
                        {formData.aboutYourself === 'designer' && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                      </div>
                      <input
                        type="radio"
                        name="aboutYourself"
                        value="designer"
                        checked={formData.aboutYourself === 'designer'}
                        onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                        className="hidden"
                        required
                      />
                      <span className="text-xs md:text-sm font-medium text-gray-600 leading-snug group-hover:text-gray-900 transition-colors">I am an interior designer/consultant seeking solutions</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8B7355] text-white py-4 rounded-xl text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#7A6548] transition-all duration-300 shadow-xl hover:shadow-[#8B7355]/20 transform hover:-translate-y-1 mt-6"
                >
                  Next Step →
                </button>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">What are you looking for? *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Small Temple', 'Medium Temple', 'Large Temple', 'Custom Design'].map((opt) => (
                        <label key={opt} className={`cursor-pointer text-center py-3 px-2 rounded-xl border text-xs font-bold transition-all duration-300 ${formData.lookingFor === opt ? 'bg-[#8B7355] border-[#8B7355] text-white shadow-lg shadow-[#8B7355]/20 scale-[1.02]' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'} `}>
                          <input
                            type="radio"
                            name="lookingFor"
                            value={opt}
                            checked={formData.lookingFor === opt}
                            onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                            className="hidden"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">Budget Range *</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B7355] outline-none transition-all appearance-none font-medium text-gray-700"
                      required
                    >
                      <option value="">Select Budget</option>
                      {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">Requirement Details</label>
                    <textarea
                      placeholder="Tell us more about your requirements..."
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-4 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B7355] focus:bg-white resize-none transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="flex-1 py-4 border-2 border-gray-100 rounded-xl text-xs font-bold text-gray-400 hover:text-[#8B7355] hover:border-[#8B7355] transition-all duration-300 uppercase tracking-widest"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] bg-[#8B7355] text-white py-4 rounded-xl text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#7A6548] transition-all duration-300 shadow-xl hover:shadow-[#8B7355]/20 transform hover:-translate-y-1"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}

            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100 italic text-center">
              <p className="text-sm text-gray-500 leading-relaxed">
                "Our experts will analyze your requirements and get back to you with a curated proposal within 24-48 hours."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TrustedBySection() {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-gray-400 uppercase tracking-[0.3em] font-bold text-xs mb-8">Trusted By Leading Organizations</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
          {/* Add logos here if needed */}
        </div>
      </div>
    </section>
  )
}

export default memo(CommunalTemplesPage)
