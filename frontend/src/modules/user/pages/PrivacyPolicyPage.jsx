import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import footerBackgroundImage from '../../../assets/footer page background/Beige Pink Elegant Watercolor Background Notes Planner.png'

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
              Privacy Policy
            </h1>
            <div className="w-24 h-1 rounded-full mx-auto" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Introduction */}
          <div className="mb-8 md:mb-10 text-left">
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              Thank you for choosing to be part of our community at Aslam Marble Suppliers, doing business as AMS ("AMS," "we," "us," or "our"). Protecting your personal information and your right to privacy is extremely important to us. If you have any questions or concerns about this policy or our practices regarding your personal data, please contact us using the information provided at the end of this document.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              This Privacy Policy applies to all information collected through our website, as well as any related services, sales, marketing, or events (collectively referred to in this policy as the "Services").
            </p>
          </div>

          {/* Section 1 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              1. What Information Do We Collect?
            </h2>
            <h3 className="text-lg md:text-xl font-serif text-[#8B7355] italic mb-2 mt-4 font-bold">
              Personal information you disclose to us
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 italic">
              In Short: We collect personal information you provide to us, such as your name, contact details, address, and other relevant data.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              We collect personal information when you:
            </p>
            <ul className="space-y-2 mb-4 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Show interest in our products or Services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Submit inquiries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Participate in activities on our website</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Contact us directly</span>
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
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2">Names and Contact Data</p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  We collect your name, email address, phone number, postal address, and similar contact details.
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800 mb-2">Credentials</p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  If our website provides account access (optional), we may collect passwords or similar authentication data.
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
                <span className="text-sm md:text-base text-gray-700">Browser type & version</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Device information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Operating system</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Language preferences</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Referring URLs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Country & location</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Pages visited and time spent</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Other diagnostic and technical data</span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              This information helps us:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Maintain website security</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Improve user experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Conduct analytics and performance monitoring</span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              2. How Do We Use Your Information?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 italic">
              In Short: We process your data for legitimate business purposes, to fulfill contracts, comply with legal obligations, and with your consent.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              We use your information to:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Create or manage user accounts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Send administrative updates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Improve security and protect Services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Enforce our terms and policies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Respond to legal requests</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Provide requested Services</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              3. Will Your Information Be Shared With Anyone?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 italic">
              In Short: We share information only:
            </p>
            <ul className="space-y-2 mb-4 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">With your consent</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">To comply with laws</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">To deliver requested services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">To protect rights and safety</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">With trusted service providers working on our behalf</span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              We may process your data based on:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Consent</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Legitimate business interests</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Contractual necessity</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Legal compliance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Vital interests (e.g., preventing harm)</span>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              4. Do We Use Cookies and Tracking Technologies?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              Yes.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              We may use cookies, web beacons, or tracking pixels to:
            </p>
            <ul className="space-y-2 mb-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Enhance user experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Analyze traffic</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Improve website performance</span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              You may control cookie preferences through your browser settings.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              5. How Do We Handle Social Logins?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              If our site offers login through social platforms (e.g., Google, Facebook), we may receive:
            </p>
            <ul className="space-y-2 mt-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Name</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Email</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Profile photo</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Public profile info</span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-3">
              This depends on your social account privacy settings.
            </p>
          </div>

          {/* Section 6 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              6. Is Your Information Transferred Internationally?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              Our servers are located in India.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              If you access our Services from outside India, your data may be transferred and processed within India.
            </p>
          </div>

          {/* Section 7 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              7. How Long Do We Keep Your Information?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 italic">
              In Short: Only as long as necessary for the purposes outlined in this policy.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              We may also retain data for legal, tax, or regulatory reasons.
            </p>
          </div>

          {/* Section 8 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              8. How Do We Keep Your Information Safe?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              We implement modern security practices to protect your data.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              However, no online system is 100% secure, and we cannot guarantee absolute protection.
            </p>
          </div>

          {/* Section 9 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              9. Do We Collect Information From Minors?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              No.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              We do not knowingly collect data from children under 18 years of age.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              If we learn we have such data, we will delete it promptly.
            </p>
          </div>

          {/* Section 10 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              10. What Are Your Privacy Rights?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              Depending on your region, you may have rights to:
            </p>
            <ul className="space-y-2 mb-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Access your personal data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Request corrections or deletions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Restrict or object to data processing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Withdraw consent</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Request a copy of your information</span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              You can exercise these rights by contacting us.
            </p>
          </div>

          {/* Section 11 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              11. Do-Not-Track Features
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              We currently do not respond to DNT browser signals due to lack of a universal standard.
            </p>
          </div>

          {/* Section 12 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              12. California Residents' Privacy Rights (If Applicable)
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              If California privacy laws apply to you, you may request:
            </p>
            <ul className="space-y-2 mb-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Disclosure of data collected</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Deletion of your personal data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Information shared with third parties</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B7355] font-bold mt-1">•</span>
                <span className="text-sm md:text-base text-gray-700">Non-discrimination regarding privacy rights</span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              AMS does not sell personal information.
            </p>
          </div>

          {/* Section 13 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              13. Updates to This Policy
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              We may update this privacy policy periodically.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Revisions will be posted on this page with an updated "Revised" date.
            </p>
          </div>

          {/* Section 14 */}
          <div className="mb-8 md:mb-10 bg-gray-50 p-5 md:p-6 rounded-lg border-l-4" style={{ borderColor: '#8B7355' }}>
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-4 font-bold">
              14. How Can You Contact Us?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              If you have questions or comments about this notice, contact us at:
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
                  Borawar Bypass Road, Makrana, Rajasthan
                </p>
              </div>
            </div>
          </div>

          {/* Section 15 */}
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-3 font-bold">
              15. How Can You Access, Update, or Delete Your Data?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              To request access, modifications, or deletion of your personal information, please contact:
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

