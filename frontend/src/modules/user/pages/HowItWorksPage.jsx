import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import StepSection from '../../../components/common/StepSection'
import StepInfoItem from '../../../components/common/StepInfoItem'
import HeroSectionWithForm from '../../../components/common/HeroSectionWithForm'
import ExpertFormOverlay from '../../../components/common/ExpertFormOverlay'
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver'
import { THEME_COLORS } from '../../../utils/theme'
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from '../../../utils/constants'
import { fetchFAQs } from '../../../utils/faqUtils'
import howItWorksBg from '../../../assets/how it work/voice of devotion.jpeg'
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

const HowItWorksPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowLocation,
  onShowBooking
}) => {
  const navigate = useNavigate()
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [formStep, setFormStep] = useState(1)
  const [showMobileForm, setShowMobileForm] = useState(false)
  const [faqs, setFaqs] = useState([])
  const [loadingFAQs, setLoadingFAQs] = useState(true)
  const { refs, visibleSections } = useIntersectionObserver(0.3)

  // Fetch FAQs from API
  useEffect(() => {
    const loadFAQs = async () => {
      try {
        setLoadingFAQs(true)
        const data = await fetchFAQs('how-it-works')
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

  const scrollToForm = useCallback(() => {
    const formContainer = document.getElementById('expert-form-container')
    if (formContainer) {
      const containerPosition = formContainer.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: containerPosition - 100,
        behavior: 'smooth'
      })
    }
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
    <div className="w-full min-h-screen bg-white relative">
      <Header
        variant="default"
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowServices={onShowServices}
        onShowHowItWorks={() => { }}
        onShowLocation={() => navigate('/location')}
        onShowBooking={() => navigate('/book-appointment')}
      />


      {/* Hero Section with Form */}
      <HeroSectionWithForm
        heroImage={howItWorksBg}
        title="How It Works"
        subtitle="Your Journey to a Divine Home"
        description="Discover how we bring your dream temple to life in 5 simple steps. From design to installation, we handle everything with care and precision."
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
              <ExpertFormOverlay className="w-full flex flex-col shadow-none" />
            </div>
          </div>
        </div>
      )}

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
            <div className="flex flex-col items-center text-center flex-shrink-0 w-[60px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
              <div className="relative mb-2 sm:mb-3 rounded-full">
                <img
                  src={icon1}
                  alt="Step 1 - Let's Connect"
                  className="w-10 h-10 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[8px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                Let's Connect
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="hidden sm:flex items-center justify-center mx-0.5 md:mx-1 flex-shrink-0">
              <svg className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-5 xl:w-10 xl:h-6" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12L35 12M35 12L26 3M35 12L26 21" stroke={THEME_COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-shrink-0 w-[60px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
              <div className="relative mb-2 sm:mb-3 rounded-full">
                <img
                  src={icon2}
                  alt="Step 2 - Explore Catalog"
                  className="w-10 h-10 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[8px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                Explore Catalog
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="hidden sm:flex items-center justify-center mx-0.5 md:mx-1 flex-shrink-0">
              <svg className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-5 xl:w-10 xl:h-6" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12L35 12M35 12L26 3M35 12L26 21" stroke={THEME_COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-shrink-0 w-[60px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
              <div className="relative mb-2 sm:mb-3 rounded-full">
                <img
                  src={icon3}
                  alt="Step 3 - Place Order"
                  className="w-10 h-10 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[8px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                Place Order
              </p>
            </div>

            {/* Arrow 3 */}
            <div className="hidden sm:flex items-center justify-center mx-0.5 md:mx-1 flex-shrink-0">
              <svg className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-5 xl:w-10 xl:h-6" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12L35 12M35 12L26 3M35 12L26 21" stroke={THEME_COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center flex-shrink-0 w-[60px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
              <div className="relative mb-2 sm:mb-3 rounded-full">
                <img
                  src={icon4}
                  alt="Step 4 - Approval"
                  className="w-10 h-10 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[8px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                Approval
              </p>
            </div>

            {/* Arrow 4 */}
            <div className="hidden sm:flex items-center justify-center mx-0.5 md:mx-1 flex-shrink-0">
              <svg className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-5 xl:w-10 xl:h-6" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12L35 12M35 12L26 3M35 12L26 21" stroke={THEME_COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center flex-shrink-0 w-[60px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
              <div className="relative mb-2 sm:mb-3 rounded-full">
                <img
                  src={icon5}
                  alt="Step 5 - Delivery & Install"
                  className="w-10 h-10 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[8px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                Delivery & Install
              </p>
            </div>
          </div>

          {/* Start Your Project Button */}
          <div className="flex justify-center mt-6 md:mt-8 mb-8 md:mb-10">
            <button
              onClick={scrollToForm}
              className="px-6 py-3 md:px-8 md:py-4 text-white text-sm md:text-base font-bold uppercase tracking-wide transition-colors shadow-lg"
              style={{ backgroundColor: THEME_COLORS.primary }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
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
        gifSrc={gif1}
        gifAlt="Let's Connect One on One"
        subtitle="GET STARTED WITH OUR 5 STEP EASY PROCESS"
        title="LETS CONNECT ONE ON ONE"
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
        gifSrc={gif2}
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
            gifSrc={gif3}
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
            gifSrc={gif4}
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
        gifSrc={gif5}
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

      {/* Order Type Table */}
      <div className="w-full bg-white py-8 md:py-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-[#8B7355] italic mb-6 md:mb-8 text-center">
            Understand Your Order Type
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg text-xs md:text-sm">
              <thead>
                <tr style={{ backgroundColor: THEME_COLORS.primary }}>
                  <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-bold text-white uppercase border border-white/20">
                    Order Type
                  </th>
                  <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-bold text-white uppercase border border-white/20">
                    Category
                  </th>
                  <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-bold text-white uppercase border border-white/20">
                    Work Involved
                  </th>
                  <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-bold text-white uppercase border border-white/20">
                    Execution Milestone<br />(Make 100% payment)
                  </th>
                  <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-bold text-white uppercase border border-white/20">
                    Handover
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-800 border border-gray-200 font-medium">
                    Order Type 1
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    Domestic Dream Temples
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    Dream Temple Production, Delivery and Installation
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    Post Production Temple Approval
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    Delivery and Installation
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#f9f9f9' }}>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-800 border border-gray-200 font-medium">
                    Order Type 2
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    Domestic Pooja Rooms
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    Custom Pooja Room Production
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    During Fitting and Installation
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    Delivery, Installation and Handover
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-800 border border-gray-200 font-medium">
                    Order Type 3
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    International Dream Temples
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    Custom Dream Temple
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    Post Production Temple Approval
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    Delivery
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#f9f9f9' }}>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-800 border border-gray-200 font-medium">
                    Order Type 4
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    Catalogue Products
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    NA
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    NA
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-xs text-gray-700 border border-gray-200">
                    Make 100% Payment for Door Delivery & Installation
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic text-center mb-4 md:mb-6 font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Everything you need to know about our process and services.
            </p>
          </div>

          <div className="space-y-3">
            {loadingFAQs ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-[#8B7355] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600 text-base md:text-lg">Loading FAQs...</p>
                </div>
              </div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 text-base md:text-lg">No FAQs available at the moment.</p>
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

      <TrustedBySection />
      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default HowItWorksPage
