import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import HeroSectionWithForm from '../../../components/common/HeroSectionWithForm'
import ExpertFormOverlay from '../../../components/common/ExpertFormOverlay'
import ExpertFormSection from '../../../components/common/ExpertFormSection'
import TrustedBySection from '../../../components/common/TrustedBySection'
import TranslatedText from '../../../components/TranslatedText'

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
  const [showMobileForm, setShowMobileForm] = useState(false)

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
        source="tsa-design-hub-page"
        heroImage={tsaDesignHubHeroImage}
        title="AMS DESIGN HUB"
        subtitle="Innovative Design Solutions for Your Space"
        description="Transform your vision into reality with our expert design services, combining creativity with functionality to create stunning spaces."
        disableGradient={true}
        enableMobileModal={true}
        onMobileButtonClick={() => setShowMobileForm(true)}
      />

      {/* Mobile Form Modal */}
      {showMobileForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setShowMobileForm(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-scaleIn bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <ExpertFormOverlay
              source="tsa-design-hub-page"
              className="w-full flex flex-col max-h-[85vh]"
              onClose={() => setShowMobileForm(false)}
            />
          </div>
        </div>
      )}

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
      <section className="w-full py-12 md:py-24 px-3 md:px-6 lg:px-8 bg-[#fffbf0]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-12 lg:p-16 border border-white/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* Left Side - GIF */}
              <div className="order-1">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white p-4 group">
                  <img
                    src={tsaDesignHubGif}
                    alt="AMS Design Hub Support"
                    className="w-full h-auto object-contain rounded-xl transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Right Side - Support Features Caption */}
              <div className="order-2">
                <span className="text-[#8B7355] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 block">
                  <TranslatedText>Partner Ecosystem</TranslatedText>
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-8 leading-tight">
                  <TranslatedText>We Support You With:</TranslatedText>
                </h2>
                <div className="space-y-4 md:space-y-6">
                  {[
                    { title: "Exclusive Partner Pricing", desc: "crafted to fit your project requirements." },
                    { title: "Personalized Showroom Visits", desc: "for you and your clients, offering a private, curated experience." },
                    { title: "Detailed Product Insights", desc: "to help you choose confidently." },
                    { title: "Real-Time Stock Updates", desc: "for smooth project planning." },
                    { title: "Professional Installation Support", desc: "to ensure flawless execution at your client's site." },
                    { title: "Interactive 2D Design Configurator", desc: "allowing instant customization of temple designs." }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group/item">
                      <div className="w-2 h-2 rounded-full bg-[#8B7355] mt-2.5 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                      <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
                        <span className="font-bold text-[#8B7355]"><TranslatedText>{item.title}</TranslatedText></span> <TranslatedText>{item.desc}</TranslatedText>
                      </p>
                    </div>
                  ))}
                </div>
                <div className="w-24 h-1 bg-[#8B7355] mt-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections Grid */}
      <section className="w-full py-12 md:py-24 px-3 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-24">
          {[
            {
              title: "Integrated pooja room solutions crafted with devotion — design, production, and installation all under one roof.",
              img: tsaCardImg1,
              reverse: false
            },
            {
              title: "Architects & designers enjoy exclusive partner pricing designed to elevate every project.",
              img: tsaCardImg2,
              reverse: true
            },
            {
              title: "Explore our latest pooja room concepts and ongoing projects through exclusive, partner-only lookbook access.",
              img: tsaCardImg3,
              reverse: false
            }
          ].map((section, idx) => (
            <div key={idx} className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-20`}>
              <div className="w-full lg:w-1/2">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                  <img
                    src={section.img}
                    alt="AMS Design Feature"
                    className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl"></div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl">
                  <blockquote className="text-2xl md:text-4xl font-serif text-[#8B7355] italic font-bold leading-snug">
                    <TranslatedText>{section.title}</TranslatedText>
                  </blockquote>
                  <div className="w-20 h-1 bg-[#8B7355] mt-8"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 md:py-24 px-3 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-20">
            <span className="text-[#8B7355] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-3 block">
              <TranslatedText>Getting Started</TranslatedText>
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-6 tracking-tight">
              <TranslatedText>How It Works</TranslatedText>
            </h2>
            <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-[#8B7355] to-transparent mx-auto opacity-40"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {[
              { icon: registerIcon, step: "01", title: "Register with Us", desc: "Join our AMS Soul Connect Platform to access 200+ curated concepts, global projects, and detailed price lists." },
              { icon: bookIcon, step: "02", title: "Discovery Session", desc: "Schedule a one-on-one session to align your client's vision with our expertise and get customized quotations." },
              { icon: orderIcon, step: "03", title: "Place an Order", desc: "We manage the entire process—from design to delivery. We also offer expert on-site installation." },
              { icon: relaxIcon, step: "04", title: "Sit Back & Relax", desc: "Enjoy peace of mind as our team handles everything, ensuring a smooth, effortless experience." }
            ].map((step, idx) => (
              <div key={idx} className="group relative bg-white rounded-3xl p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col items-center text-center hover:-translate-y-3">
                <div className="absolute top-6 right-8 text-4xl font-black text-gray-100 group-hover:text-[#8B7355]/10 Transition-colors duration-500">
                  {step.step}
                </div>
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-8 bg-[#8B7355]/5 rounded-2xl group-hover:bg-[#8B7355]/10 group-hover:scale-110 transition-all duration-500">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-[#8B7355] italic font-bold mb-4">
                  <TranslatedText>{step.title}</TranslatedText>
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed font-medium">
                  <TranslatedText>{step.desc}</TranslatedText>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Image Section Above Footer - Full Screen */}
      < section className="w-full py-0 bg-white" >
        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none"></div>
          <img
            src={tsaDesignHubImg1}
            alt="TSA Design Hub"
            className="w-full h-auto object-cover"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </section >

      {/* Visit Store Section */}
      <section className="w-full py-16 md:py-24 px-3 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group">
            <img
              src={visitStoreImage}
              alt="Visit Store"
              className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
            />
            {/* Removed gradient overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 text-center text-white">
              <span className="text-white/60 font-black tracking-[0.4em] uppercase text-[10px] md:text-sm mb-6 block">
                <TranslatedText>Store Location</TranslatedText>
              </span>
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-serif italic mb-10 leading-tight max-w-4xl">
                <TranslatedText>Experience the Legacy of Craftsmanship in Person</TranslatedText>
              </h3>
              <button
                onClick={() => navigate('/visit-store')}
                className="group/btn relative inline-flex items-center gap-4 bg-white text-[#8B7355] font-black px-8 md:px-14 py-4 md:py-6 rounded-2xl shadow-2xl text-xs md:text-base uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-gray-100 hover:shadow-white/20"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <TranslatedText>Plan Your Visit</TranslatedText>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <ExpertFormSection />
      <TrustedBySection />
      <Footer />
      <FloatingButtons />
    </div >
  )
}

export default TSADesignHubPage
