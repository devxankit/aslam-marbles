import { useState, useEffect } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import footerBackgroundImage from '../../../assets/footer page background/Beige Pink Elegant Watercolor Background Notes Planner.png'
import TranslatedText from '../../../components/TranslatedText'

const PrivacyPolicyPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowProducts,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API_URL}/page-content/privacy-policy`)
        if (res.ok) {
          const data = await res.json()
          setPageData(data)
        }
      } catch (err) {
        console.error('Error fetching privacy policy:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPage()
  }, [API_URL])

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355]"></div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <Header
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowProducts={onShowProducts}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
        onShowLocation={onShowLocation}
        onShowBooking={onShowBooking}
      />

      {/* Main Content with Background Image */}
      <section
        className="w-full py-12 md:py-16 lg:py-20 px-8 md:px-12 lg:px-16 xl:px-20 relative"
        style={{
          backgroundImage: `url(${footerBackgroundImage})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: 'calc(100vh - 200px)'
        }}
      >
        <div className="w-full relative z-10 max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-10 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic mb-4 tracking-wide font-bold">
              <TranslatedText>{pageData?.heroSection?.title || 'Privacy Policy'}</TranslatedText>
            </h1>
            <div className="w-24 h-1 rounded-full mx-auto" style={{ backgroundColor: '#8B7355' }}></div>
            {pageData?.heroSection?.subtitle && (
              <p className="mt-4 text-gray-600 italic font-medium"><TranslatedText>{pageData.heroSection.subtitle}</TranslatedText></p>
            )}
          </div>

          {/* Intro description from Hero Section */}
          {pageData?.heroSection?.description && (
            <div className="mb-8 md:mb-10 text-left">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed italic">
                <TranslatedText>{pageData.heroSection.description}</TranslatedText>
              </p>
            </div>
          )}

          {/* Dynamic Sections */}
          {pageData?.sections?.map((section, idx) => (
            <div key={idx} className="mb-8 md:mb-10 text-left">
              <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
                <TranslatedText>{idx + 1}. {section.title}</TranslatedText>
              </h2>
              <div className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                <TranslatedText>{section.content}</TranslatedText>
              </div>
            </div>
          ))}

          {/* Fallback if no sections in DB */}
          {(!pageData?.sections || pageData.sections.length === 0) && (
            <div className="mb-8 md:mb-10 text-left">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                <TranslatedText>Thank you for choosing to be part of our community at Aslam Marble Suppliers. Protecting your personal information and your right to privacy is extremely important to us.</TranslatedText>
              </p>
            </div>
          )}

          {/* Contact Section (Often static but could be included in sections) */}
          <div className="mb-8 md:mb-10 bg-gray-50 p-5 md:p-6 rounded-lg border-l-4" style={{ borderColor: '#8B7355' }}>
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-4 font-bold">
              <TranslatedText>Contact Us</TranslatedText>
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-lg">📧</span>
                <a href="mailto:aslammarble40@gmail.com" className="text-sm md:text-base text-gray-700 hover:underline" style={{ color: '#8B7355' }}>
                  aslammarble40@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">📞</span>
                <a href="tel:+917877639699" className="text-sm md:text-base text-gray-700 hover:underline" style={{ color: '#8B7355' }}>
                  +91 78776 39699
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default PrivacyPolicyPage

