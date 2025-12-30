import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import footerBackgroundImage from '../../../assets/footer page background/Beige Pink Elegant Watercolor Background Notes Planner.png'
import TranslatedText from '../../../components/TranslatedText'

const CookiesPolicyPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowProducts,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 uppercase tracking-wide" style={{ color: '#8B7355' }}>
              <TranslatedText>Cookies Policy</TranslatedText>
            </h1>
            <div className="w-24 h-1 rounded-full mx-auto" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Introduction */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3" style={{ color: '#8B7355' }}>
              <TranslatedText>Introduction</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>At Aslam Marble Suppliers (AMS), we value your privacy and are committed to being transparent about how we collect, use, and protect your information. This Cookies Policy explains what cookies are, how we use them, and the choices you have regarding their use on our website.</TranslatedText>
            </p>
          </div>

          {/* What Are Cookies */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3" style={{ color: '#8B7355' }}>
              <TranslatedText>What Are Cookies?</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              Cookies are small text files stored on your device (computer, tablet, or smartphone) when you visit a website. Cookies help:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Improve your browsing experience</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Remember your preferences</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Understand how users interact with the website</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Enhance website performance and personalization</TranslatedText></span>
              </li>
            </ul>
          </div>

          {/* How We Use Cookies */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3" style={{ color: '#8B7355' }}>
              <TranslatedText>How We Use Cookies</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              We use cookies for the following purposes:
            </p>
            <div className="space-y-4 ml-4">
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2"><TranslatedText>1. Essential Cookies</TranslatedText></p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <TranslatedText>Required for the website to function properly. Without them, some features may not work.</TranslatedText>
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2"><TranslatedText>2. Performance & Analytics Cookies</TranslatedText></p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <TranslatedText>These cookies help us understand how visitors interact with our website by collecting anonymous usage data. This helps us improve performance and user experience.</TranslatedText>
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2"><TranslatedText>3. Functionality Cookies</TranslatedText></p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <TranslatedText>These allow the website to remember your preferences (such as location or language) and provide a more personalized experience.</TranslatedText>
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2"><TranslatedText>4. Advertising & Targeting Cookies</TranslatedText></p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <TranslatedText>These cookies may be used to deliver relevant advertisements and measure marketing campaign performance.</TranslatedText>
                </p>
              </div>
            </div>
          </div>

          {/* Types of Cookies We Use */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3" style={{ color: '#8B7355' }}>
              <TranslatedText>Types of Cookies We Use</TranslatedText>
            </h2>
            <div className="space-y-4 ml-4">
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2"><TranslatedText>1. Session Cookies</TranslatedText></p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <TranslatedText>Temporary cookies that are deleted when you close your browser. They help the website function during your visit.</TranslatedText>
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2"><TranslatedText>2. Persistent Cookies</TranslatedText></p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <TranslatedText>Stored on your device for a set period or until you delete them manually. They help remember your preferences for future visits.</TranslatedText>
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2"><TranslatedText>3. Third-Party Cookies</TranslatedText></p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <TranslatedText>We may use third-party services like Google Analytics to collect insights about website usage and to show relevant ads.</TranslatedText>
                </p>
              </div>
            </div>
          </div>

          {/* Managing Cookies */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3" style={{ color: '#8B7355' }}>
              <TranslatedText>Managing Cookies</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              You can control and manage cookies in the following ways:
            </p>
            <div className="space-y-4 ml-4">
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2"><TranslatedText>Browser Settings</TranslatedText></p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <TranslatedText>Most browsers allow you to block or delete cookies. However, disabling cookies may affect the functionality of our website.</TranslatedText>
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2"><TranslatedText>Opt-Out Tools</TranslatedText></p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2">
                  <TranslatedText>Some third-party services offer opt-out tools, such as:</TranslatedText>
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-[#8B7355] font-bold mt-1">•</span>
                    <span className="text-sm md:text-base text-gray-700"><TranslatedText>Google Analytics Opt-Out Browser Add-on</TranslatedText></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Your Consent */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3" style={{ color: '#8B7355' }}>
              <TranslatedText>Your Consent</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>By using our website, you consent to the use of cookies as described in this policy.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>If you do not agree, you may disable cookies through your browser settings, but this may impact your browsing experience.</TranslatedText>
            </p>
          </div>

          {/* Changes to This Policy */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3" style={{ color: '#8B7355' }}>
              <TranslatedText>Changes to This Policy</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>We may update this Cookies Policy occasionally to reflect changes in technology, legal requirements, or our practices. Updated versions will be posted on this page, and we encourage you to review it periodically.</TranslatedText>
            </p>
          </div>

          {/* Contact Us */}
          <div className="mb-8 md:mb-10 bg-gray-50 p-5 md:p-6 rounded-lg border-l-4" style={{ borderColor: '#8B7355' }}>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4" style={{ color: '#8B7355' }}>
              <TranslatedText>Contact Us</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>If you have questions or concerns about our use of cookies, please contact us at:</TranslatedText>
            </p>
            <div className="space-y-2">
              <p className="text-sm md:text-base font-semibold text-gray-800 mb-3">
                Aslam Marble Suppliers (AMS)
              </p>
              <div className="flex items-center gap-3">
                <span className="text-lg">📍</span>
                <p className="text-sm md:text-base text-gray-700">
                  <TranslatedText>Borawar Bypass Road, Makrana, Rajasthan</TranslatedText>
                </p>
              </div>
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

export default CookiesPolicyPage

