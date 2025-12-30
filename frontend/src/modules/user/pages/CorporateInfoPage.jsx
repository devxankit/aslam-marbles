import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import footerBackgroundImage from '../../../assets/footer page background/Beige Pink Elegant Watercolor Background Notes Planner.png'
import TranslatedText from '../../../components/TranslatedText'

const CorporateInfoPage = ({
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
              <TranslatedText>About Us</TranslatedText>
            </h1>
            <div className="w-16 md:w-24 h-0.5 md:h-1 rounded-full mx-auto" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Welcome Section */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              <TranslatedText>Welcome to Aslam Marble Suppliers</TranslatedText>
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              <TranslatedText>At Aslam Marble Suppliers (AMS), we take pride in being one of Makrana's trusted names in marble craftsmanship. Specializing in premium marble temples, pooja room setups, marble murtis, and a wide range of stone and marble artifacts, we bring timeless artistry to your spaces.</TranslatedText>
            </p>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed text-justify">
              <TranslatedText>Founded with a passion for heritage and quality, our mission is to offer beautifully crafted products that transform homes and commercial spaces into places of elegance, devotion, and serenity. Every creation reflects the mastery of our skilled artisans who blend traditional craftsmanship with modern design sensibilities.</TranslatedText>
            </p>
          </div>

          {/* Our Expertise Section */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-3 md:mb-4 font-bold">
              <TranslatedText>Our Expertise</TranslatedText>
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              <TranslatedText>Our expertise covers a wide spectrum of marble and stone artistry, including:</TranslatedText>
            </p>
            <ul className="space-y-1.5 md:space-y-2 mb-2 md:mb-3">
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify"><strong><TranslatedText>Marble Temples:</TranslatedText></strong> <TranslatedText>Gracefully designed and architecturally stunning.</TranslatedText></span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify"><strong><TranslatedText>Pooja Rooms:</TranslatedText></strong> <TranslatedText>Custom-built to bring a divine atmosphere into your home.</TranslatedText></span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify"><strong><TranslatedText>Marble Murtis:</TranslatedText></strong> <TranslatedText>Handcrafted with precision and devotion.</TranslatedText></span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify"><strong><TranslatedText>Stone & Marble Artifacts / Home Décor:</TranslatedText></strong> <TranslatedText>From traditional to contemporary styles.</TranslatedText></span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="text-[#8B7355] font-bold mt-0.5 md:mt-1">•</span>
                <span className="text-xs md:text-base text-gray-700 text-justify"><strong><TranslatedText>Wall Art:</TranslatedText></strong> <TranslatedText>Premium stone wall art to elevate any interior.</TranslatedText></span>
              </li>
            </ul>
          </div>

          {/* Personalized Services Section */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              <TranslatedText>Personalized Services</TranslatedText>
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed text-justify">
              <TranslatedText>We know every customer and every space is different. That's why we offer personalized consultations to ensure our designs match your vision perfectly. From size and style to finishing details, our team works closely with you to deliver custom-made solutions that fit your space and preferences seamlessly.</TranslatedText>
            </p>
          </div>

          {/* Corporate Responsibility Section */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              <TranslatedText>Corporate Responsibility</TranslatedText>
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed text-justify">
              <TranslatedText>At AMS, we believe responsibility is part of good business. We follow sustainable and ethical practices that reduce environmental impact while maintaining the highest quality standards. Our approach—from material sourcing to final delivery—reflects our commitment to durability, efficiency, and craftsmanship.</TranslatedText>
            </p>
          </div>

          {/* Data Usage & Privacy Section */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              <TranslatedText>Data Usage & Privacy</TranslatedText>
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed text-justify">
              <TranslatedText>Your trust matters to us. Any personal information you share is used only to improve your experience and enhance our services. We follow strict privacy and security practices to protect your data at all times. For more details, you may refer to our</TranslatedText> <a href="/privacy-policy" className="underline hover:no-underline" style={{ color: '#8B7355' }}><TranslatedText>Privacy Policy</TranslatedText></a>.
            </p>
          </div>

          {/* Intellectual Property Section */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              <TranslatedText>Intellectual Property</TranslatedText>
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed text-justify">
              <TranslatedText>All text, images, graphics, and content on our website belong exclusively to Aslam Marble Suppliers. Unauthorized copying or use of our content is strictly prohibited and may lead to legal action. We take pride in originality, creativity, and protecting the work we create.</TranslatedText>
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="mb-6 md:mb-10 bg-gray-50 p-4 md:p-6 rounded-lg border-l-2 md:border-l-4" style={{ borderColor: '#8B7355' }}>
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-3 md:mb-4 font-bold">
              <TranslatedText>Contact Us</TranslatedText>
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3 text-justify">
              <TranslatedText>For inquiries, custom orders, or consultations, feel free to reach out:</TranslatedText>
            </p>
            <div className="space-y-1.5 md:space-y-2">
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
                  <TranslatedText>Borawar Bypass Road, Makrana, Rajasthan</TranslatedText>
                </p>
              </div>
            </div>
            <p className="text-xs md:text-base text-gray-700 mt-2 md:mt-3">
              <TranslatedText>We're available to assist you</TranslatedText> <strong><TranslatedText>Monday to Saturday, 9:00 AM to 6:00 PM</TranslatedText></strong>.
            </p>
          </div>

          {/* Join Our Journey Section */}
          <div className="mb-6 md:mb-10 text-left">
            <h2 className="text-lg md:text-2xl font-serif text-[#8B7355] italic mb-2 md:mb-3 font-bold">
              <TranslatedText>Join Our Journey</TranslatedText>
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed text-justify">
              <TranslatedText>Stay connected with us to explore new designs, product launches, special offers, and updates. Follow us on social media and subscribe to our newsletter to be part of the AMS family, where every piece of marble tells a story of beauty and craftsmanship.</TranslatedText>
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default CorporateInfoPage

