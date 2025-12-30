import { useState, useEffect } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import JobOpportunities from '../../../components/careers/JobOpportunities'
import JoinTheTeamForm from '../../../components/careers/JoinTheTeamForm'
import { useNavigate, useLocation } from 'react-router-dom'
import TranslatedText from '../../../components/TranslatedText'
import { usePageTranslation } from '../../../contexts/PageTranslationContext'

const CareersPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowHowItWorks
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { getTranslatedText } = usePageTranslation()
  const [careersData, setCareersData] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'

  useEffect(() => {
    const fetchCareersData = async () => {
      try {
        const res = await fetch(`${API_URL}/careers`)
        const result = await res.json()
        if (result.success) {
          setCareersData(result.data)
        }
      } catch (error) {
        console.error('Error fetching careers data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCareersData()
  }, [API_URL])

  useEffect(() => {
    if (location.hash === '#join-the-team') {
      const element = document.getElementById('join-the-team')
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location])

  const handleApplyNow = () => {
    const joinTeamSection = document.getElementById('join-the-team')
    if (joinTeamSection) {
      joinTeamSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355]"></div>
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
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
        onShowLocation={() => navigate('/location')}
        onShowBooking={() => navigate('/book-appointment')}
      />

      {/* Hero Image Section - Horizontal */}
      <section className="w-full relative">
        <div className="relative w-full h-[210px] md:h-[450px] lg:h-[550px] overflow-hidden">
          <img
            src={careersData?.heroImage?.url}
            alt={getTranslatedText("Careers")}
            className="w-full h-full object-cover object-top"
          />

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Captions and Apply Button - Center of Image */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-5xl px-4 md:px-6 lg:px-8">
            <div className="text-center text-white space-y-0.5 md:space-y-6">
              {/* Heading */}
              <h1 className="text-sm md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight drop-shadow-lg">
                <TranslatedText>Craft Timeless Masterpieces at Aslam Marble Suppliers</TranslatedText>
              </h1>
              <p className="text-[10px] md:text-xl lg:text-2xl font-medium text-gray-200">
                <TranslatedText>Where Tradition Meets Excellence</TranslatedText>
              </p>

              {/* Description */}
              <p className="text-[9px] md:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto text-gray-100 drop-shadow-md line-clamp-2 md:line-clamp-none">
                <TranslatedText>Join a team where heritage, artistry, and innovation come together to create extraordinary works of marble. At Aslam Marble Suppliers, we transform raw stone into sacred spaces and stunning masterpieces through passion, precision, and unmatched craftsmanship.</TranslatedText>
              </p>

              {/* Apply Now Button */}
              <div className="pt-1.5 md:pt-4">
                <button
                  onClick={handleApplyNow}
                  className="bg-white text-[#8B7355] font-bold px-3 py-1 md:px-12 lg:px-16 md:py-4 lg:py-5 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 text-[9px] md:text-base lg:text-lg uppercase tracking-wide"
                >
                  <TranslatedText>Apply Now</TranslatedText>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-6">
              <TranslatedText>Why Join Us?</TranslatedText>
            </h2>
            <div className="w-24 h-1 bg-[#8B7355] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              <TranslatedText>At Aslam Marble Suppliers, we offer more than just a job - we offer a career path filled with growth, learning, and meaningful contributions to timeless art.</TranslatedText>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-6 lg:gap-8">
            {careersData?.whyJoinUs?.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl p-2 md:p-8 border border-gray-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden text-center"
              >
                {/* Background Accent from About Us */}
                <div className="absolute top-0 right-0 w-12 h-12 md:w-24 md:h-24 bg-[#8B7355]/5 rounded-bl-full transform translate-x-4 -translate-y-4 transition-transform duration-700 group-hover:scale-150"></div>

                <div className="relative z-10">
                  <div className="text-4xl mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 inline-block">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#8B7355] transition-colors duration-300 uppercase tracking-tight">
                    <TranslatedText>{item.title}</TranslatedText>
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light italic text-sm md:text-base">
                    <TranslatedText>{item.description}</TranslatedText>
                  </p>
                </div>

                {/* Bottom Gradient Border from About Us */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B7355]/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training and Development Section */}
      <section className="w-full py-16 md:py-24 px-4 md:px-8" style={{ backgroundColor: 'rgb(255, 250, 240)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Image */}
            <div className="w-full h-full">
              <div className="relative overflow-hidden shadow-2xl h-full">
                <img
                  src={careersData?.trainingImage?.url}
                  alt={getTranslatedText("Training and Development")}
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="w-full space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-16" style={{ backgroundColor: '#8B7355' }}></div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic">
                  <TranslatedText>Training and Development</TranslatedText>
                </h2>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-base md:text-lg">
                  <TranslatedText>At</TranslatedText> <span className="font-bold text-gray-900"><TranslatedText>Aslam Marble Suppliers</TranslatedText></span><TranslatedText>, we are committed to nurturing the growth and potential of our people. We provide a supportive and dynamic work environment where every team member is encouraged to learn, grow, and excel. Our focused training programs are designed to refine craftsmanship and enhance product knowledge, ensuring that each individual develops to the highest standards of excellence.</TranslatedText>
                </p>
                <p className="text-base md:text-lg">
                  <TranslatedText>New team members are guided by experienced professionals who mentor them throughout their journey, helping them seamlessly adapt to our values, processes, and commitment to quality.</TranslatedText>
                </p>
                <p className="text-base md:text-lg">
                  <TranslatedText>Our approach to training extends beyond skill enhancement—it is about building sustainable careers. Through continuous learning opportunities and a strong emphasis on personal and professional development, we cultivate long-term relationships with our team, allowing them to grow alongside the reputation and success of Aslam Marble Suppliers.</TranslatedText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-6">
              <TranslatedText>Employee Benefits</TranslatedText>
            </h2>
            <div className="w-24 h-1 bg-[#8B7355] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              <TranslatedText>We value our team members and offer comprehensive benefits to support your well-being and success.</TranslatedText>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {careersData?.benefits?.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-50 flex flex-col items-center text-center hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#8B7355]/5 rounded-bl-full transform translate-x-10 -translate-y-10 transition-transform duration-700 group-hover:scale-150"></div>

                <div className="relative z-10">
                  <div className="text-4xl mb-4 transform transition-transform duration-500 group-hover:scale-110">
                    {benefit.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-[#8B7355] transition-colors">
                    <TranslatedText>{benefit.title}</TranslatedText>
                  </h4>
                  <p className="text-sm text-gray-500 italic">
                    <TranslatedText>{benefit.description}</TranslatedText>
                  </p>
                </div>

                {/* Bottom Border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B7355]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Opportunities Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-8 bg-white">
        <JobOpportunities jobs={careersData?.jobs || []} />
      </section>

      {/* Join the Team Section */}
      <section className="w-full py-8 md:py-10 lg:py-12 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <JoinTheTeamForm />
      </section>

      <TrustedBySection />
      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default CareersPage
