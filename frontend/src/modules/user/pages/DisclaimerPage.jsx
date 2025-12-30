import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import footerBackgroundImage from '../../../assets/footer page background/Beige Pink Elegant Watercolor Background Notes Planner.png'
import TranslatedText from '../../../components/TranslatedText'

const DisclaimerPage = ({
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic mb-4 tracking-wide font-bold">
              <TranslatedText>Disclaimer</TranslatedText>
            </h1>
            <div className="w-24 h-1 rounded-full mx-auto" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Website Disclaimer */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>Website Disclaimer</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>The information provided by Aslam Marble Suppliers ("we," "us," or "our") on our website (the "Site") is for general informational purposes only. All information on the Site is provided in good faith; however, we make no representation or warranty, express or implied, regarding:</TranslatedText>
            </p>
            <ul className="space-y-2 mb-4 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Accuracy</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Adequacy</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Validity</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Reliability</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Availability</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Completeness</TranslatedText></span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>Under no circumstances shall we be liable for any loss or damage incurred as a result of using the Site or relying on any information found on the Site. Your use of the Site and your reliance on any information on the Site is strictly at your own risk.</TranslatedText>
            </p>
          </div>

          {/* External Links Disclaimer */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>External Links Disclaimer</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>The Site may contain links to third-party websites, external content, or advertising banners. Such links are not monitored, investigated, or checked by us for accuracy, reliability, or completeness.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>We do not:</TranslatedText>
            </p>
            <ul className="space-y-2 mb-4 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Warrant or endorse third-party websites</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Guarantee the accuracy of external content</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Assume responsibility for any linked website or advertisement</TranslatedText></span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>We are not responsible for any transaction between you and a third-party provider of products or services.</TranslatedText>
            </p>
          </div>

          {/* Testimonials Disclaimer */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>Testimonials Disclaimer</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>The Site may include testimonials from customers who have used our products and/or services. These testimonials reflect:</TranslatedText>
            </p>
            <ul className="space-y-2 mb-4 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Real experiences</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Personal opinions of individual users</TranslatedText></span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>However, these experiences are unique to those users and may not represent the results of all customers. Your own results may vary.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>All testimonials appear on the Site exactly as submitted (minor corrections in grammar or typing may be made). Some testimonials may be shortened for clarity or relevance.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>The opinions expressed in testimonials:</TranslatedText>
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Belong solely to the customers</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Do not reflect the views or opinions of Aslam Marble Suppliers</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Are not influenced by any paid promotion</TranslatedText></span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-3">
              <TranslatedText>We do not pay or compensate users for providing testimonials.</TranslatedText>
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default DisclaimerPage

