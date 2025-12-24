import { useState, useEffect } from 'react'
import Header from '../layout/Header'
import heroVideo from '../../assets/video/WhatsApp Video 2025-12-06 at 10.52.27 AM.mp4'
import { fetchHomePageData } from '../../utils/homePageUtils'

const HeroSection = ({ onShowSidebar, onShowProjects, onShowCreations, onShowServices, onShowHowItWorks }) => {
  const [heroData, setHeroData] = useState({
    video: { url: heroVideo },
    mainHeading: 'Crafting Divine Spaces',
    subHeading: 'Where Faith Meets Fine Marble',
    supplierText: '– Aslam Marble Suppliers'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const data = await fetchHomePageData()
        if (data?.heroSection) {
          setHeroData({
            video: data.heroSection.video || { url: heroVideo },
            mainHeading: data.heroSection.mainHeading || 'Crafting Divine Spaces',
            subHeading: data.heroSection.subHeading || 'Where Faith Meets Fine Marble',
            supplierText: data.heroSection.supplierText || '– Aslam Marble Suppliers'
          })
        }
      } catch (error) {
        console.error('Error loading hero data:', error)
        // Keep default values if API fails
      } finally {
        setLoading(false)
      }
    }

    loadHeroData()
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Full Screen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src={heroData.video.url} type="video/mp4" />
      </video>

      {/* Navbar Overlay */}
      <Header
        variant="video-overlay"
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
      />

      {/* Caption Overlay - Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center px-6 max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 md:mb-6 leading-[1.1] md:leading-tight">
            {heroData.mainHeading}
          </h1>
          <p className="text-white text-sm sm:text-base md:text-xl lg:text-2xl mb-2 md:mb-4 font-light tracking-wide uppercase">
            {heroData.subHeading}
          </p>
          <p className="text-[#D4AF37] text-xs sm:text-sm md:text-lg lg:text-xl font-medium tracking-widest uppercase">
            {heroData.supplierText}
          </p>
        </div>
      </div>

    </section>
  )
}

export default HeroSection

