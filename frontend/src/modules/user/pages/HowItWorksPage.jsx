import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import StepSection from '../../../components/common/StepSection'
import StepInfoItem from '../../../components/common/StepInfoItem'
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

      {/* Background Image Container - Reduced Bottom Height */}
      <div className="relative w-full overflow-hidden" style={{ height: '75vh', minHeight: '600px' }}>
        {/* Background Image */}
        <img
          src={howItWorksBg}
          alt="How It Works Background"
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />

        {/* Form Container - Overlay on Right Side, Fits Image Height */}
        <div id="expert-form-container" className="absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 w-[85%] sm:w-[320px] md:w-[340px] max-w-[calc(100%-32px)] bg-white rounded-xl md:rounded-2xl shadow-2xl z-20 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b-2 border-gray-200 bg-gradient-to-r flex-shrink-0 rounded-t-xl md:rounded-t-2xl" style={{ background: `linear-gradient(to right, ${THEME_COLORS.primary}1A, transparent)` }}>
            <h3 className="text-base md:text-lg font-bold uppercase tracking-wide" style={{ color: THEME_COLORS.primary }}>Talk to Our Expert</h3>
            <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: `${THEME_COLORS.primary}1A`, color: THEME_COLORS.primary }}>{formStep}/2</span>
          </div>

          <div className="px-3 pt-3 pb-4 md:px-4 md:pt-4 md:pb-4 bg-white overflow-y-auto flex-1 rounded-b-xl md:rounded-b-2xl">
            {formStep === 1 ? (
              <form className="space-y-2.5" onSubmit={(e) => { e.preventDefault(); setFormStep(2); }}>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="DOMESTIC"
                      checked={formData.type === 'DOMESTIC'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-3 h-3 accent-amber-600"
                    />
                    <span className="text-xs font-medium" style={{ color: formData.type === 'DOMESTIC' ? THEME_COLORS.primary : '#333' }}>DOMESTIC</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="INTERNATIONAL"
                      checked={formData.type === 'INTERNATIONAL'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-3 h-3 accent-amber-600"
                    />
                    <span className="text-xs font-medium" style={{ color: formData.type === 'INTERNATIONAL' ? THEME_COLORS.primary : '#333' }}>INTERNATIONAL</span>
                  </label>
                </div>

                <input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />

                <div>
                  <label className="block text-xs font-medium mb-1">Phone number</label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-1 px-2 bg-gray-50 border-r">
                      <span className="text-sm">🇮🇳</span>
                      <span className="text-xs">+91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="City *"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />

                <div>
                  <label className="block text-xs font-medium mb-1.5">Tell us about yourself *</label>
                  <div className="space-y-1.5">
                    <label className="flex items-start gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="aboutYourself"
                        value="homeowner"
                        checked={formData.aboutYourself === 'homeowner'}
                        onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                        className="mt-0.5 w-3 h-3 accent-amber-600 flex-shrink-0"
                        required
                      />
                      <span className="text-xs leading-relaxed">I am a homeowner looking for a pooja unit or pooja room</span>
                    </label>
                    <label className="flex items-start gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="aboutYourself"
                        value="designer"
                        checked={formData.aboutYourself === 'designer'}
                        onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                        className="mt-0.5 w-3 h-3 accent-amber-600 flex-shrink-0"
                        required
                      />
                      <span className="text-xs leading-relaxed">I am an interior designer/consultant seeking solutions for my client</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-2.5 rounded-lg text-xs font-medium transition-colors shadow-md hover:opacity-90"
                  style={{ backgroundColor: THEME_COLORS.primary }}
                >
                  NEXT
                </button>
              </form>
            ) : (
              <form className="space-y-2.5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-bold mb-1.5">What are you looking for? *</label>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="lookingFor"
                        value="singular"
                        checked={formData.lookingFor === 'singular'}
                        onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                        className="w-3 h-3 accent-amber-600"
                        required
                      />
                      <span className="text-xs">Singular Marble Mandir Unit</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="lookingFor"
                        value="complete"
                        checked={formData.lookingFor === 'complete'}
                        onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                        className="w-3 h-3 accent-amber-600"
                        required
                      />
                      <span className="text-xs">Complete Pooja Room Solution</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">What is your estimated budget? *</label>
                  <div className="space-y-1.5">
                    {BUDGET_OPTIONS.map((budget) => (
                      <label key={budget} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="budget"
                          value={budget}
                          checked={formData.budget === budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-3 h-3 accent-amber-600"
                          required
                        />
                        <span className="text-xs">{budget}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">What is your timeline for the project? *</label>
                  <div className="space-y-1.5">
                    {TIMELINE_OPTIONS.map((timeline) => (
                      <label key={timeline} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="timeline"
                          value={timeline}
                          checked={formData.timeline === timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-3 h-3 accent-amber-600"
                          required
                        />
                        <span className="text-xs">{timeline}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Please share a bit more about your needs"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
                />

                <div>
                  <input
                    type="file"
                    id="designReferences"
                    accept="image/*,.pdf"
                    multiple
                    onChange={(e) => setFormData({ ...formData, designReferences: e.target.files })}
                    className="hidden"
                  />
                  <label
                    htmlFor="designReferences"
                    className="block w-full text-white py-2 rounded-lg text-xs text-center font-medium cursor-pointer transition-colors shadow-md hover:opacity-90"
                    style={{ backgroundColor: THEME_COLORS.primary }}
                  >
                    UPLOAD DESIGN REFERENCES
                  </label>
                  {formData.designReferences && formData.designReferences.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      {formData.designReferences.length} file(s) selected
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="flex-1 bg-white py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors shadow-md border-2"
                    style={{ color: THEME_COLORS.primary, borderColor: THEME_COLORS.primary }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#f9f9f9'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'white'
                    }}
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="flex-1 text-white py-2 rounded-lg text-xs font-medium transition-colors shadow-md hover:opacity-90"
                    style={{ backgroundColor: THEME_COLORS.primary }}
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

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
                  src={icon1}
                  alt="Step 1 - Let's Connect"
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                Let's Connect One on One
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
                  src={icon2}
                  alt="Step 2 - Explore Catalog"
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                Explore our Catalog
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
                  src={icon3}
                  alt="Step 3 - Place Order"
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                Place The Order
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
                  src={icon4}
                  alt="Step 4 - Approval"
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
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
            <div className="flex flex-col items-center text-center flex-shrink-0 w-[100px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
              <div className="relative mb-3 rounded-full">
                <img
                  src={icon5}
                  alt="Step 5 - Delivery and Installation"
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
                />
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                Delivery and Installation
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

      {/* FAQ Section */}
      <section className="w-full py-8 md:py-10 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic mb-6 md:mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {loadingFAQs ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-base md:text-lg">Loading FAQs...</p>
                </div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-base md:text-lg">No FAQs available at the moment.</p>
                </div>
            ) : (
              faqs.map((faq, index) => {
                const faqId = faq._id || faq.id || index
                const isExpanded = expandedFaq === faqId
                return (
                  <div key={faqId} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#8B7355]">
              <button
                      onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3 flex-1">
                        <span className="text-base md:text-lg font-semibold text-gray-800 flex-shrink-0">{index + 1}.</span>
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

export default HowItWorksPage
