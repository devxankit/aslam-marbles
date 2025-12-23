
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
import beforeImage from '../../../assets/ourcreation/pooja room/before&after/compare2.jpg'

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
      <div className="w-full bg-white pt-12 pb-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic px-4">
          Welcome to the World aslam marble suppliers
        </h2>
        <div className="w-24 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: '#8B7355' }}></div>
      </div>
      <HomeVideosSection />

      {/* Dream Temple Section & Pricing Drawer */}
      <DreamTempleSection onOpenPricing={() => setShowPricing(true)} />
      <PricingDrawer isOpen={showPricing} onClose={() => setShowPricing(false)} />

      <HomeImagesSection />

      {/* Completed Custom Projects Section */}
      <section className="w-full relative h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src={homePageData?.completedProjectsSection?.backgroundImage?.url || "https://res.cloudinary.com/djuyp9lut/image/upload/v1766129645/artist/hero/yjy4w3bfu9s4fhirpius.webp"}
          alt={homePageData?.completedProjectsSection?.backgroundImage?.alt || "Completed Custom Projects"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
            {homePageData?.completedProjectsSection?.heading || 'COMPLETED CUSTOM PROJECTS'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 max-w-5xl w-full">
            <div className="text-center">
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{homePageData?.completedProjectsSection?.stats?.projects || 950}+</p>
              <p className="text-lg md:text-xl lg:text-2xl">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{homePageData?.completedProjectsSection?.stats?.cities || 350}+</p>
              <p className="text-lg md:text-xl lg:text-2xl">Cities</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{homePageData?.completedProjectsSection?.stats?.yearsExperience || 25}+</p>
              <p className="text-lg md:text-xl lg:text-2xl">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before and After Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Side - Text */}
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic">
                {homePageData?.beforeAfterSection?.heading || 'Before and After'}
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed text-justify">
                {homePageData?.beforeAfterSection?.description || 'Witness the transformation from a blank canvas to a serene sanctuary with Tilak Stone Arts India. Our skilled artisans turn raw spaces into exquisite pooja rooms, reflecting spirituality and elegance. See the remarkable difference quality and craftsmanship can make.'}
              </p>
            </div>

            {/* Right Side - Comparison Slider */}
            <div className="order-1 lg:order-2 w-full">
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

      {/* Instagram Profile Section */}
      <section className="w-full py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Instagram Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Profile Picture */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-white p-1">
                      <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        <svg className="w-10 h-10 md:w-12 md:h-12 text-[#8B7355]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.5 3h-15C3.67 3 3 3.67 3 4.5v15c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zm-7.5 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-1.4c0-2.24 3.58-3.6 7-3.6s7 1.36 7 3.6V19z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Username and Name */}
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">aslammarblesuppliers1</h3>
                    <p className="text-sm text-gray-600">Aslam Marble Suppliers</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 md:gap-8 text-center">
                  <div>
                    <p className="text-base md:text-lg font-bold text-gray-900">6</p>
                    <p className="text-xs text-gray-600">posts</p>
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-bold text-gray-900">56</p>
                    <p className="text-xs text-gray-600">followers</p>
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-bold text-gray-900">12</p>
                    <p className="text-xs text-gray-600">following</p>
                  </div>
                </div>

                {/* Follow Button */}
                <a
                  href="https://www.instagram.com/aslammarblesuppliers1?igsh=MXZyNm83MnVmaG56dQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Follow
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMS Guides Section */}
      <section className="w-full py-12 md:py-16 lg:py-20" style={{ backgroundColor: 'rgb(255, 250, 240)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic text-center mb-8 md:mb-12">
            AMS GUIDES
          </h2>

          {/* Blog Posts Grid */}
          {loadingBlogs ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-base md:text-lg">Loading guides...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-base md:text-lg">No guides available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogs.map((post) => (
                <BlogCard
                  key={post._id || post.id}
                  post={post}
                  onClick={() => handleBlogClick(post._id || post.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <ExploreProjectsSection />
      <ExpertFormSection />
      <TrustedBySection />
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
    <div className="relative w-full h-40 md:h-48 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
    </div>

    {/* Content Section */}
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold text-[#8B7355] uppercase tracking-wide">
          {post.category}
        </span>
        <span className="text-gray-400">•</span>
        <span className="text-xs text-gray-500">{post.date}</span>
      </div>

      <h2 className="text-base md:text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#8B7355] transition-colors">
        {post.title}
      </h2>

      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
        {post.description}
      </p>
    </div>
  </div>
))

BlogCard.displayName = 'BlogCard'

