import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import footerBackgroundImage from '../../../assets/footer page background/Beige Pink Elegant Watercolor Background Notes Planner.png'

const TermsAndConditionsPage = ({
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
        className="w-full py-8 md:py-16 lg:py-20 px-4 md:px-12 lg:px-16 xl:px-20 relative"
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
          <div className="text-center mb-6 md:mb-12">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic mb-3 md:mb-4 tracking-wide font-bold">
              Terms and Conditions
            </h1>
            <div className="w-16 md:w-24 h-0.5 md:h-1 rounded-full mx-auto" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Introduction */}
          <div className="mb-6 md:mb-10 text-left">
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              Welcome to Aslam Marble Suppliers (AMS)! These terms and conditions outline the rules and regulations for the use of our website. By accessing or using this website, you agree to these terms and conditions. If you do not agree with any part of these terms, please refrain from using our services.
            </p>
          </div>

          {/* Section 1 */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              1. General Information
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed text-justify">
              Aslam Marble Suppliers specializes in providing marble temples, pooja room setups, marble murtis, stone artifacts, home décor items, and wall art.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              2. Collection of Personal Information
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              When you use our website to inquire about our products or services, we may collect personal information, including but not limited to:
            </p>
            <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-4 ml-3 md:ml-4">
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700">Name</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700">WhatsApp Number</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700">Email Address</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700">City of Delivery</span>
              </li>
            </ul>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              For architects or designers wishing to collaborate with us, we may also collect:
            </p>
            <ul className="space-y-1.5 md:space-y-2 mb-2 md:mb-3 ml-3 md:ml-4">
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700">Name</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700">Phone Number</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700">Company Name</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700">Company Website</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700">Purpose of Collaboration</span>
              </li>
            </ul>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed text-justify">
              By providing this information, you give us permission to use it to respond to your inquiries, provide updates, or explore potential collaborations.
            </p>
          </div>

          {/* Section 3 */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              3. Data Usage and Privacy
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              Your privacy is extremely important to us. The information we collect is used only for:
            </p>
            <ul className="space-y-1.5 md:space-y-2 mb-2 md:mb-3 ml-3 md:ml-4">
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Responding to your inquiries</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Sharing product-related information</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Communicating about potential collaborations</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Improving our services and customer experience</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Personalizing your interaction with our website</span>
              </li>
            </ul>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed text-justify">
              We do not sell or share your personal data with any third party unless required by law or with your explicit consent.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              4. Intellectual Property
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              All content, images, product designs, graphics, and text displayed on our website are the intellectual property of Aslam Marble Suppliers.
            </p>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed text-justify">
              Any unauthorized use, reproduction, or distribution is strictly prohibited.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              5. Product Information and Availability
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              We make every effort to provide accurate product details and availability. However:
            </p>
            <ul className="space-y-1.5 md:space-y-2 ml-3 md:ml-4">
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Some items may not always be in stock</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Prices and availability may change without prior notice</span>
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              6. Orders and Shipping
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              All orders or inquiries made through our website or contact forms are subject to confirmation.
            </p>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              Shipping timelines may vary based on:
            </p>
            <ul className="space-y-1.5 md:space-y-2 mb-2 md:mb-3 ml-3 md:ml-4">
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Product type</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Customization requirements</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Delivery location</span>
              </li>
            </ul>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed text-justify">
              Exact details will be communicated after order confirmation.
            </p>
          </div>

          {/* Section 7 */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              7. Collaboration with Architects / Designers
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              Architects or designers who wish to collaborate with us must submit accurate information.
            </p>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              Please note:
            </p>
            <ul className="space-y-1.5 md:space-y-2 ml-3 md:ml-4">
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Submitting a form does not guarantee collaboration</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">AMS reserves the right to accept or reject any proposal</span>
              </li>
            </ul>
          </div>

          {/* Section 8 */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              8. Limitation of Liability
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              Aslam Marble Suppliers is not responsible for any damages arising from the use of our website, including but not limited to:
            </p>
            <ul className="space-y-1.5 md:space-y-2 ml-3 md:ml-4">
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Direct or indirect damages</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Incidental damages</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Consequential damages</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify">Loss of data or interruptions</span>
              </li>
            </ul>
          </div>

          {/* Section 9 */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              9. Changes to Terms and Conditions
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              We may update or modify these terms at any time.
            </p>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed text-justify">
              Continued use of our website after any changes means you accept the updated terms.
            </p>
          </div>

          {/* Section 10 - Contact Us */}
          <div className="mb-6 md:mb-10 bg-gray-50 p-4 md:p-6 rounded-lg border-l-2 md:border-l-4" style={{ borderColor: '#8B7355' }}>
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-3 md:mb-4 font-bold">
              10. Contact Us
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              For questions or concerns regarding these terms, you may contact us at:
            </p>
            <div className="space-y-1.5 md:space-y-2">
              <p className="text-xs md:text-base font-semibold text-gray-800 mb-2 md:mb-3">
                Aslam Marble Suppliers
              </p>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-base md:text-lg">📧</span>
                <a href="mailto:aslammarble40@gmail.com" className="text-xs md:text-base text-gray-700 hover:underline" style={{ color: '#8B7355' }}>
                  aslammarble40@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-base md:text-lg">📞</span>
                <a href="tel:+917877639699" className="text-xs md:text-base text-gray-700 hover:underline" style={{ color: '#8B7355' }}>
                  +91 78776 39699
                </a>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-base md:text-lg">📍</span>
                <p className="text-xs md:text-base text-gray-700">
                  Borawar Bypass Road, Makrana, Rajasthan
                </p>
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

export default TermsAndConditionsPage

