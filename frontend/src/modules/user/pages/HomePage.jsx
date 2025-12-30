
import { useState, useEffect, useCallback, memo } from 'react'

import HeroSection from '../../../components/home/HeroSection'
import StepsSection from '../../../components/home/StepsSection'
import HomeImagesSection from '../../../components/home/HomeImagesSection'
import HomeVideosSection from '../../../components/home/HomeVideosSection'
import DreamTempleSection from '../../../components/home/DreamTempleSection'
import StepsVideoCarousel from '../../../components/home/StepsVideoCarousel'
import PricingDrawer from '../../../components/common/PricingDrawer'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import HomePageFormPopup from '../../../components/common/HomePageFormPopup'
import ExpertFormSection from '../../../components/common/ExpertFormSection'
import ExploreProjectsSection from '../../../components/home/ExploreProjectsSection'
import { fetchBlogs } from '../../../utils/blogUtils'
import { fetchHomePageData } from '../../../utils/homePageUtils'
import BeforeAfterSlider from '../../../components/common/BeforeAfterSlider'
import afterImage from '../../../assets/ourcreation/pooja room/before&after/compare1.png'
import completedProjectsFallback from '../../../assets/residential/large.jpeg'
import beforeImage from '../../../assets/ourcreation/pooja room/before&after/compare2.jpg'
import LazyImage from '../../../components/common/LazyImage'
import TranslatedText from '../../../components/TranslatedText'


const HomePage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowHowItWorks
}) => {
  const [showPricing, setShowPricing] = useState(false)
  const [showFormPopup, setShowFormPopup] = useState(true)
  const [blogs, setBlogs] = useState([])
  const [loadingBlogs, setLoadingBlogs] = useState(true)
  const [homePageData, setHomePageData] = useState(null)
  const [loadingHomePage, setLoadingHomePage] = useState(true)

  useEffect(() => {
    let isMounted = true
    const loadBlogs = async () => {
      try {
        setLoadingBlogs(true)
        const data = await fetchBlogs()
        if (isMounted) {
          setBlogs(data?.slice(0, 3) || [])
        }
      } catch (error) {
        console.error('Error loading blogs:', error)
        if (isMounted) {
          setBlogs([])
        }
      } finally {
        if (isMounted) {
          setLoadingBlogs(false)
        }
      }
    }
    loadBlogs()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    const loadHomePageData = async () => {
      try {
        setLoadingHomePage(true)
        const data = await fetchHomePageData()
        if (isMounted) {
          setHomePageData(data)
        }
      } catch (error) {
        console.error('Error loading home page data:', error)
        if (isMounted) {
          setHomePageData(null)
        }
      } finally {
        if (isMounted) {
          setLoadingHomePage(false)
        }
      }
    }
    loadHomePageData()
    return () => {
      isMounted = false
    }
  }, [])

  const handleBlogClick = useCallback((id) => {
    window.location.href = `/blog/${id}`
  }, [])

  return (
    <>
      {/* Form Popup Modal - Shows 2 seconds after page load */}
      {showFormPopup && <HomePageFormPopup onClose={() => setShowFormPopup(false)} />}

      <HeroSection
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
      />
      <StepsSection />

      {/* Video Section with Heading */}
      <div className="w-full bg-white pt-16 pb-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif italic text-gray-900 px-6 leading-tight">
          <TranslatedText>Welcome to</TranslatedText> <span className="text-[#8B7355] relative inline-block px-2 before:content-[''] before:absolute before:inset-0 before:bg-[#8B7355]/5 before:rounded-lg before:-z-10 before:-skew-x-2 transition-all duration-300"><TranslatedText>Aslam Marble Suppliers</TranslatedText></span>
        </h2>
        <div className="w-16 md:w-24 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: '#8B7355' }}></div>
      </div>
      <HomeVideosSection />

      {/* Dream Temple Section & Pricing Drawer */}
      <DreamTempleSection onOpenPricing={() => setShowPricing(true)} />
      <PricingDrawer isOpen={showPricing} onClose={() => setShowPricing(false)} />


      {/* Completed Custom Projects Section */}
      <section className="w-full relative h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <LazyImage
          src={homePageData?.completedProjectsSection?.backgroundImage?.url || completedProjectsFallback}
          alt={homePageData?.completedProjectsSection?.backgroundImage?.alt || "Completed Custom Projects"}
          className="w-full h-full"
          imageClassName="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
            <TranslatedText>{homePageData?.completedProjectsSection?.heading || 'COMPLETED CUSTOM PROJECTS'}</TranslatedText>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-16 max-w-5xl w-full">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-1">{homePageData?.completedProjectsSection?.stats?.projects || 950}+</p>
              <p className="text-xs sm:text-sm md:text-xl lg:text-2xl uppercase tracking-wider"><TranslatedText>Projects</TranslatedText></p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-1">{homePageData?.completedProjectsSection?.stats?.cities || 350}+</p>
              <p className="text-xs sm:text-sm md:text-xl lg:text-2xl uppercase tracking-wider"><TranslatedText>Cities</TranslatedText></p>
            </div>
            <div className="text-center col-span-2 md:col-span-1 mt-4 md:mt-0">
              <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-1">{homePageData?.completedProjectsSection?.stats?.yearsExperience || 25}+</p>
              <p className="text-xs sm:text-sm md:text-xl lg:text-2xl uppercase tracking-wider"><TranslatedText>Years Experience</TranslatedText></p>
            </div>
          </div>
        </div>
      </section>

      {/* Before and After Section - Ultra Compact */}
      <section className="w-full py-8 md:py-20 px-2 md:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
            {/* Text Side - Very compact and centered on mobile */}
            <div className="text-center lg:text-left space-y-3 px-2">
              <h2 className="text-xl sm:text-2xl md:text-5xl font-serif text-[#8B7355] italic leading-tight uppercase tracking-tight">
                <TranslatedText>{homePageData?.beforeAfterSection?.heading || 'The Transformation'}</TranslatedText>
              </h2>
              <p className="text-[10px] sm:text-xs md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                <TranslatedText>{homePageData?.beforeAfterSection?.description || 'Witness raw spaces evolve into spiritual sanctuaries through our master craftsmanship.'}</TranslatedText>
              </p>
            </div>

            {/* Slider Side - Full width on mobile */}
            <div className="w-full max-w-sm sm:max-w-md md:max-w-none mx-auto shadow-xl rounded-xl overflow-hidden border border-gray-100">
              <BeforeAfterSlider
                beforeImage={homePageData?.beforeAfterSection?.afterImage?.url || afterImage}
                afterImage={homePageData?.beforeAfterSection?.beforeImage?.url || beforeImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5 Steps Video Carousel - Above Footer */}
      <StepsVideoCarousel />

      {/* Instagram Profile Section - Ultra Compact */}
      <section className="w-full py-6 md:py-12 bg-white">
        <div className="max-w-4xl mx-auto px-2 md:px-8">
          <div className="bg-gray-50/50 rounded-xl md:rounded-2xl p-3 md:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Profile Wrapper */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[1.5px] flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-[#8B7355]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.5 3h-15C3.67 3 3 3.67 3 4.5v15c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zm-7.5 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-1.4c0-2.24 3.58-3.6 7-3.6s7 1.36 7 3.6V19z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs md:text-base font-bold text-gray-900 leading-tight"><TranslatedText>aslammarblesuppliers1</TranslatedText></h3>
                  <p className="text-[10px] md:text-sm text-gray-500"><TranslatedText>Aslam Marble Suppliers</TranslatedText></p>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="https://www.instagram.com/aslammarblesuppliers1?igsh=MXZyNm83MnVmaG56dQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#8B7355] text-white text-[10px] md:text-sm px-4 py-2 rounded-full font-bold uppercase tracking-wider hover:bg-black transition-all shadow-md active:scale-95"
              >
                <TranslatedText>Follow on Instagram</TranslatedText>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AMS Guides Section */}
      <section className="w-full py-12 md:py-16 lg:py-20" style={{ backgroundColor: 'rgb(255, 250, 240)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic text-center mb-8 md:mb-12">
            <TranslatedText>AMS GUIDES</TranslatedText>
          </h2>

          {/* Blog Posts Grid */}
          {loadingBlogs ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-base md:text-lg"><TranslatedText>Loading guides...</TranslatedText></p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-base md:text-lg"><TranslatedText>No guides available at the moment.</TranslatedText></p>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
              {blogs.map((post) => (
                <div key={post._id || post.id} className="w-full">
                  <BlogCard
                    post={post}
                    onClick={() => handleBlogClick(post._id || post.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ExploreProjectsSection />
      <ExpertFormSection />
      <TrustedBySection />
      <HomeImagesSection />
      <Footer />
      <FloatingButtons />
    </>
  )
}

export default HomePage

// Memoized Blog Card Component
const BlogCard = memo(({ post, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
  >
    {/* Image Section */}
    <div className="relative w-full h-20 sm:h-32 md:h-48 overflow-hidden">
      <LazyImage
        src={post.image}
        alt={post.title}
        className="w-full h-full"
        imageClassName="transition-transform duration-500 ease-in-out group-hover:scale-110"
        width={400} // Approximate width for blog cards
      />
    </div>

    {/* Content Section */}
    <div className="p-2 md:p-4">
      <div className="flex items-center gap-1 mb-1 md:mb-2">
        <span className="text-[8px] md:text-xs font-semibold text-[#8B7355] uppercase tracking-tighter md:tracking-wide">
          <TranslatedText>{post.category}</TranslatedText>
        </span>
      </div>

      <h2 className="text-[10px] sm:text-sm md:text-lg font-bold text-gray-800 mb-1 line-clamp-2 md:line-clamp-2 group-hover:text-[#8B7355] transition-colors leading-tight">
        <TranslatedText>{post.title}</TranslatedText>
      </h2>

      <p className="hidden md:block text-sm text-gray-600 leading-relaxed line-clamp-2">
        <TranslatedText>{post.description}</TranslatedText>
      </p>
    </div>
  </div>
))

BlogCard.displayName = 'BlogCard'

