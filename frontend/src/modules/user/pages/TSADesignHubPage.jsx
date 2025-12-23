import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import HeroSectionWithForm from '../../../components/common/HeroSectionWithForm'
import ExpertFormOverlay from '../../../components/common/ExpertFormOverlay'

// Import hero image
import tsaDesignHubHeroImage from '../../../assets/services/TSA design hub/heading/edc914ef-1943-4164-9e46-bc67ee0d0364.png'

// Import images
import tsaDesignHubImg1 from '../../../assets/services/TSA design hub/Screenshot 2025-12-08 122520.png'
import tsaDesignHubImg2 from '../../../assets/services/TSA design hub/unnamed.jpg'
import tsaDesignHubGif from '../../../assets/services/TSA design hub/gif/image1.gif'
import tsaCardImg1 from '../../../assets/services/TSA design hub/images card/bottom_img.jpeg'
import tsaCardImg2 from '../../../assets/services/TSA design hub/images card/centerimg2.jpeg'
import tsaCardImg3 from '../../../assets/services/TSA design hub/images card/howitwork_bannerimg.jpeg'

// Import How It Works icons
import registerIcon from '../../../assets/services/TSA design hub/how it work/1registered.png'
import bookIcon from '../../../assets/services/TSA design hub/how it work/2book.png'
import orderIcon from '../../../assets/services/TSA design hub/how it work/3order.png'
import relaxIcon from '../../../assets/services/TSA design hub/how it work/4relax.png'

// Import Visit Store image
import visitStoreImage from '../../../assets/home/visit store/poojaroomm.jpeg'

// Register ScrollTrigger


const TSADesignHubPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowProducts,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      <Header
        variant="default"
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowProducts={onShowProducts}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
        onShowLocation={onShowLocation}
        onShowBooking={onShowBooking}
      />

      {/* Hero Section with Form */}
      <HeroSectionWithForm
        heroImage={tsaDesignHubHeroImage}
        title="AMS DESIGN HUB"
        subtitle="Innovative Design Solutions for Your Space"
        description="Transform your vision into reality with our expert design services, combining creativity with functionality to create stunning spaces."
      />

      {/* Image with Caption Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Caption */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-4 md:mb-6 leading-tight font-bold">
                Join the AMS Design Hub — Where Businesses Build Better Together.
              </h2>
              <div className="w-24 h-1 rounded-full mt-6" style={{ backgroundColor: '#8B7355' }}></div>
            </div>

            {/* Right Side - Image */}
            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={tsaDesignHubImg2}
                  alt="AMS Design Hub"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GIF with Support Features Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8" style={{ backgroundColor: 'rgb(255, 250, 240)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - GIF */}
            <div className="order-1 md:order-1">
              <div className="relative overflow-hidden rounded-xl shadow-2xl bg-white p-4">
                <img
                  src={tsaDesignHubGif}
                  alt="TSA Design Hub Support"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Right Side - Support Features Caption */}
            <div className="order-2 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-6 md:mb-8 leading-tight font-bold">
                We Support You With:
              </h2>
              <div className="space-y-4 md:space-y-5">
                {[
                  { title: "Exclusive Partner Pricing", desc: "crafted to fit your project requirements." },
                  { title: "Personalized Showroom Visits", desc: "for you and your clients, offering a private, curated experience." },
                  { title: "Detailed Product Insights & Sample Assistance", desc: "to help you choose confidently." },
                  { title: "Real-Time Stock Updates & Easy Order Management", desc: "for smooth project planning." },
                  { title: "Professional Installation Support", desc: "to ensure flawless execution at your client's site." },
                  { title: "Interactive 2D Design Configurator", desc: "allowing instant customization of temple designs." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group/item">
                    <div className="w-2 h-2 rounded-full bg-[#8B7355] mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      <span className="font-semibold text-[#8B7355]">{item.title}</span> {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="w-24 h-1 rounded-full mt-6" style={{ backgroundColor: '#8B7355' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* First Image Section - Right Image, Left Caption */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Caption */}
            <div className="order-2 md:order-1">
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic leading-tight font-bold">
                Integrated pooja room solutions crafted with devotion — design, production, and installation all under one roof.
              </p>
              <div className="w-24 h-1 rounded-full mt-6" style={{ backgroundColor: '#8B7355' }}></div>
            </div>

            {/* Right Side - Image */}
            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={tsaCardImg1}
                  alt="Integrated Pooja Room Solutions"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Image Section - Left Image, Right Caption */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Image */}
            <div className="order-1 md:order-1">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={tsaCardImg2}
                  alt="Exclusive Partner Pricing"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Side - Caption */}
            <div className="order-2 md:order-2">
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic leading-tight font-bold">
                Architects & designers enjoy exclusive partner pricing designed to elevate every project.
              </p>
              <div className="w-24 h-1 rounded-full mt-6" style={{ backgroundColor: '#8B7355' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Third Image Section - Right Image, Left Caption */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Caption */}
            <div className="order-2 md:order-1">
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic leading-tight font-bold">
                Explore our latest pooja room concepts and ongoing projects through exclusive, partner-only lookbook access.
              </p>
              <div className="w-24 h-1 rounded-full mt-6" style={{ backgroundColor: '#8B7355' }}></div>
            </div>

            {/* Right Side - Image */}
            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={tsaCardImg3}
                  alt="Partner Lookbook Access"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-14 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic text-center mb-4 md:mb-5 tracking-wide font-bold">
              How It Works
            </h2>
            <div className="w-24 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Steps Grid - 4 Columns for 'Small' cards */}
          <div className="how-it-works-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            {/* Step 1: Register with Us */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center h-full border border-gray-100">
              <div className="mb-4 md:mb-6">
                <img
                  src={registerIcon}
                  alt="Register"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
              </div>
              <h3 className="text-xl font-serif text-[#8B7355] italic mb-3 font-bold">
                Register with Us
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Join our AMS Soul Connect Platform to access 200+ curated concepts, global projects, and detailed price lists.
              </p>
            </div>

            {/* Step 2: Book a Concept Discovery Session */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center h-full border border-gray-100">
              <div className="mb-4 md:mb-6">
                <img
                  src={bookIcon}
                  alt="Book Session"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
              </div>
              <h3 className="text-xl font-serif text-[#8B7355] italic mb-3 font-bold">
                Discovery Session
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Schedule a one-on-one session to align your client's vision with our expertise and get customized quotations.
              </p>
            </div>

            {/* Step 3: Place an Order */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center h-full border border-gray-100">
              <div className="mb-4 md:mb-6">
                <img
                  src={orderIcon}
                  alt="Place Order"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
              </div>
              <h3 className="text-xl font-serif text-[#8B7355] italic mb-3 font-bold">
                Place an Order
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We manage the entire process—from design to delivery. We also offer expert on-site installation.
              </p>
            </div>

            {/* Step 4: Sit Back and Relax */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center h-full border border-gray-100">
              <div className="mb-4 md:mb-6">
                <img
                  src={relaxIcon}
                  alt="Relax"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
              </div>
              <h3 className="text-xl font-serif text-[#8B7355] italic mb-3 font-bold">
                Sit Back & Relax
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Enjoy peace of mind as our team handles everything, ensuring a smooth, effortless experience.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Horizontal Image Section Above Footer - Full Screen */}
      <section className="w-full py-0 bg-white">
        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none"></div>
          <img
            src={tsaDesignHubImg1}
            alt="TSA Design Hub"
            className="w-full h-auto object-cover"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </section>

      {/* Visit Store Section - Full Width Horizontal Image with Button */}
      <section className="w-full py-8 md:py-12">
        <div className="relative w-full h-[220px] md:h-[280px] lg:h-[350px] overflow-hidden">
          <img
            src={visitStoreImage}
            alt="Visit Store"
            className="w-full h-full object-cover"
          />
          {/* Visit Store Button - Center of Image */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => navigate('/visit-store')}
              className="bg-white text-black font-semibold px-6 md:px-10 lg:px-12 py-2 md:py-3 lg:py-4 rounded-lg shadow-lg text-sm md:text-base lg:text-lg uppercase tracking-wide"
            >
              Visit Store
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default TSADesignHubPage
