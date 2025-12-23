import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import footerBackgroundImage from '../../../assets/footer page background/Beige Pink Elegant Watercolor Background Notes Planner.png'

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
              Disclaimer
            </h1>
            <div className="w-24 h-1 rounded-full mx-auto" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Website Disclaimer */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              Website Disclaimer
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              The information provided by Aslam Marble Suppliers ("we," "us," or "our") on our website (the "Site") is for general informational purposes only. All information on the Site is provided in good faith; however, we make no representation or warranty, express or implied, regarding:
            </p>
            <ul className="space-y-2 mb-4 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Accuracy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Adequacy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Validity</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Reliability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Availability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Completeness</span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              Under no circumstances shall we be liable for any loss or damage incurred as a result of using the Site or relying on any information found on the Site. Your use of the Site and your reliance on any information on the Site is strictly at your own risk.
            </p>
          </div>

          {/* External Links Disclaimer */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              External Links Disclaimer
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              The Site may contain links to third-party websites, external content, or advertising banners. Such links are not monitored, investigated, or checked by us for accuracy, reliability, or completeness.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              We do not:
            </p>
            <ul className="space-y-2 mb-4 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Warrant or endorse third-party websites</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Guarantee the accuracy of external content</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Assume responsibility for any linked website or advertisement</span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              We are not responsible for any transaction between you and a third-party provider of products or services.
            </p>
          </div>

          {/* Testimonials Disclaimer */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              Testimonials Disclaimer
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              The Site may include testimonials from customers who have used our products and/or services. These testimonials reflect:
            </p>
            <ul className="space-y-2 mb-4 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Real experiences</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Personal opinions of individual users</span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              However, these experiences are unique to those users and may not represent the results of all customers. Your own results may vary.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              All testimonials appear on the Site exactly as submitted (minor corrections in grammar or typing may be made). Some testimonials may be shortened for clarity or relevance.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              The opinions expressed in testimonials:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Belong solely to the customers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Do not reflect the views or opinions of Aslam Marble Suppliers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Are not influenced by any paid promotion</span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-3">
              We do not pay or compensate users for providing testimonials.
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

