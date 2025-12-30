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
              <TranslatedText>Privacy Policy</TranslatedText>
            </h1>
            <div className="w-24 h-1 rounded-full mx-auto" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Introduction */}
          <div className="mb-8 md:mb-10 text-left">
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>Thank you for choosing to be part of our community at Aslam Marble Suppliers, doing business as AMS ("AMS," "we," "us," or "our"). Protecting your personal information and your right to privacy is extremely important to us. If you have any questions or concerns about this policy or our practices regarding your personal data, please contact us using the information provided at the end of this document.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>This Privacy Policy applies to all information collected through our website, as well as any related services, sales, marketing, or events (collectively referred to in this policy as the "Services").</TranslatedText>
            </p>
          </div>

          {/* Section 1 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>1. What Information Do We Collect?</TranslatedText>
            </h2>
            <h3 className="text-lg md:text-xl font-serif text-[#8B7355] italic mb-2 mt-4 font-bold">
              Personal information you disclose to us
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 italic">
              <TranslatedText>In Short: We collect personal information you provide to us, such as your name, contact details, address, and other relevant data.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>We collect personal information when you:</TranslatedText>
            </p>
            <ul className="space-y-2 mb-4 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Show interest in our products or Services</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Submit inquiries</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Participate in activities on our website</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Contact us directly</TranslatedText></span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              The type of information we collect depends on how you interact with AMS.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              The personal data we may collect includes:
            </p>
            <div className="ml-4 space-y-3">
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2"><TranslatedText>Names and Contact Data</TranslatedText></p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <TranslatedText>We collect your name, email address, phone number, postal address, and similar contact details.</TranslatedText>
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2"><TranslatedText>Credentials</TranslatedText></p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <TranslatedText>If our website provides account access (optional), we may collect passwords or similar authentication data.</TranslatedText>
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2">Payment Data</p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2">
                  If you make a purchase, payment information necessary to complete the transaction may be collected.
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed italic">
                  Note: AMS does not store or retain payment card details. All payment data is managed by our payment processor.
                </p>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-serif text-[#8B7355] italic mb-2 mt-6 font-bold">
              Information Automatically Collected
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 italic">
              In Short: Certain technical information—like IP address, device details, and browsing behavior—is collected automatically.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              This may include:
            </p>
            <ul className="space-y-2 mb-4 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">IP address</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Browser type & version</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Device information</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Operating system</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Language preferences</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Referring URLs</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Country & location</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Pages visited and time spent</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Other diagnostic and technical data</TranslatedText></span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              This information helps us:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Maintain website security</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Improve user experience</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Conduct analytics and performance monitoring</TranslatedText></span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>2. How Do We Use Your Information?</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 italic">
              <TranslatedText>In Short: We process your data for legitimate business purposes, to fulfill contracts, comply with legal obligations, and with your consent.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>We use your information to:</TranslatedText>
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Create or manage user accounts</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Send administrative updates</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Improve security and protect Services</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Enforce our terms and policies</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Respond to legal requests</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Provide requested Services</TranslatedText></span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>3. Will Your Information Be Shared With Anyone?</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 italic">
              <TranslatedText>In Short: We share information only:</TranslatedText>
            </p>
            <ul className="space-y-2 mb-4 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>With your consent</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>To comply with laws</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>To deliver requested services</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>To protect rights and safety</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>With trusted service providers working on our behalf</TranslatedText></span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>We may process your data based on:</TranslatedText>
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Consent</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Legitimate business interests</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Contractual necessity</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Legal compliance</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Vital interests (e.g., preventing harm)</TranslatedText></span>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>4. Do We Use Cookies and Tracking Technologies?</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>Yes.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>We may use cookies, web beacons, or tracking pixels to:</TranslatedText>
            </p>
            <ul className="space-y-2 mb-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Enhance user experience</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Analyze traffic</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Improve website performance</TranslatedText></span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>You may control cookie preferences through your browser settings.</TranslatedText>
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>5. How Do We Handle Social Logins?</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>If our site offers login through social platforms (e.g., Google, Facebook), we may receive:</TranslatedText>
            </p>
            <ul className="space-y-2 mt-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Name</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Email</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Profile photo</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Public profile info</TranslatedText></span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-3">
              <TranslatedText>This depends on your social account privacy settings.</TranslatedText>
            </p>
          </div>

          {/* Section 6 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>6. Is Your Information Transferred Internationally?</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>Our servers are located in India.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>If you access our Services from outside India, your data may be transferred and processed within India.</TranslatedText>
            </p>
          </div>

          {/* Section 7 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>7. How Long Do We Keep Your Information?</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 italic">
              <TranslatedText>In Short: Only as long as necessary for the purposes outlined in this policy.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>We may also retain data for legal, tax, or regulatory reasons.</TranslatedText>
            </p>
          </div>

          {/* Section 8 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>8. How Do We Keep Your Information Safe?</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>We implement modern security practices to protect your data.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>However, no online system is 100% secure, and we cannot guarantee absolute protection.</TranslatedText>
            </p>
          </div>

          {/* Section 9 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>9. Do We Collect Information From Minors?</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>No.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>We do not knowingly collect data from children under 18 years of age.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>If we learn we have such data, we will delete it promptly.</TranslatedText>
            </p>
          </div>

          {/* Section 10 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>10. What Are Your Privacy Rights?</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>Depending on your region, you may have rights to:</TranslatedText>
            </p>
            <ul className="space-y-2 mb-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Access your personal data</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Request corrections or deletions</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Restrict or object to data processing</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Withdraw consent</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Request a copy of your information</TranslatedText></span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>You can exercise these rights by contacting us.</TranslatedText>
            </p>
          </div>

          {/* Section 11 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>11. Do-Not-Track Features</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>We currently do not respond to DNT browser signals due to lack of a universal standard.</TranslatedText>
            </p>
          </div>

          {/* Section 12 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>12. California Residents' Privacy Rights (If Applicable)</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>If California privacy laws apply to you, you may request:</TranslatedText>
            </p>
            <ul className="space-y-2 mb-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Disclosure of data collected</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Deletion of your personal data</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Information shared with third parties</TranslatedText></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700"><TranslatedText>Non-discrimination regarding privacy rights</TranslatedText></span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>AMS does not sell personal information.</TranslatedText>
            </p>
          </div>

          {/* Section 13 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>13. Updates to This Policy</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>We may update this privacy policy periodically.</TranslatedText>
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <TranslatedText>Revisions will be posted on this page with an updated "Revised" date.</TranslatedText>
            </p>
          </div>

          {/* Section 14 */}
          <div className="mb-8 md:mb-10 bg-gray-50 p-5 md:p-6 rounded-lg border-l-4" style={{ borderColor: '#8B7355' }}>
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-4 font-bold">
              <TranslatedText>14. How Can You Contact Us?</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>If you have questions or comments about this notice, contact us at:</TranslatedText>
            </p>
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
              <div className="flex items-center gap-3">
                <span className="text-lg">📍</span>
                <p className="text-sm md:text-base text-gray-700">
                  <TranslatedText>Borawar Bypass Road, Makrana, Rajasthan</TranslatedText>
                </p>
              </div>
            </div>
          </div>

          {/* Section 15 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              <TranslatedText>15. How Can You Access, Update, or Delete Your Data?</TranslatedText>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <TranslatedText>To request access, modifications, or deletion of your personal information, please contact:</TranslatedText>
            </p>
            <div className="flex items-center gap-3">
              <span className="text-lg">📧</span>
              <a href="mailto:aslammarble40@gmail.com" className="text-sm md:text-base text-gray-700 hover:underline" style={{ color: '#8B7355' }}>
                aslammarble40@gmail.com
              </a>
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

