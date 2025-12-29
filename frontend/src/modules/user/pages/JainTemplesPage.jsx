import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import ProjectDrawer from '../../../components/common/ProjectDrawer'
import LazyImage from '../../../components/common/LazyImage'
import ExpertFormOverlay from '../../../components/common/ExpertFormOverlay'
import headingImage from '../../../assets/ourcreation/jain temple/heading/SMT01780-Edit_6ebd2fd8-7aa4-4df4-b841-2cb2e362337e_large.jpeg'
import { fetchArtistData } from '../../../utils/artistUtils'
import { fetchJainTemplesData } from '../../../utils/jainTemplesUtils'

// Artisan Fallback Images
import artisan1 from '../../../assets/house of marble/our artist/slide1.jpeg'
import artisan2 from '../../../assets/house of marble/our artist/slide2.jpeg'
import artisan3 from '../../../assets/house of marble/our artist/slide3.jpeg'
import artisan4 from '../../../assets/house of marble/our artist/slide4.webp'

// Gallery Images Fallbacks
import img1 from '../../../assets/ourcreation/jain temple/IMAGES/White-Marble-Jain-Temple..jpg'
import img2 from '../../../assets/ourcreation/jain temple/IMAGES/download.jpeg'
import img3 from '../../../assets/ourcreation/jain temple/IMAGES/images.jpeg'
import img4 from '../../../assets/ourcreation/jain temple/IMAGES/jain-marble-temple-1669892609-6651478.jpeg'
import img5 from '../../../assets/ourcreation/jain temple/IMAGES/marble-swethamber-jain-temple-in-india.jpg'

const JainTemplesPage = ({ onShowCart, onShowLikes }) => {
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [artistImages, setArtistImages] = useState([])
  const [pageData, setPageData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileForm, setShowMobileForm] = useState(false)

  // Static Artisans for fallback
  const fallbackArtisans = [
    { id: 1, image: artisan1, alt: 'Artisan 1' },
    { id: 2, image: artisan2, alt: 'Artisan 2' },
    { id: 3, image: artisan3, alt: 'Artisan 3' },
    { id: 4, image: artisan4, alt: 'Artisan 4' }
  ]

  // Fetch Artist Images & Page Data
  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true)
      try {
        const [artistData, jainData] = await Promise.all([
          fetchArtistData(),
          fetchJainTemplesData()
        ])

        if (artistData && artistData.galleryImages && artistData.galleryImages.length > 0) {
          setArtistImages(artistData.galleryImages.map(img => ({ ...img, image: img.url })))
        } else {
          setArtistImages(fallbackArtisans)
        }

        if (jainData) {
          setPageData(jainData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setArtistImages(fallbackArtisans)
      } finally {
        setIsLoading(false)
      }
    }
    loadAllData()
  }, [])

  const handleImageClick = (project) => {
    setSelectedProject({
      image: project.image?.url || project.url,
      title: project.title,
      description: project.description,
      location: project.location,
      address: project.location,
      client: project.client || 'Private Client',
      duration: project.status || 'Completed'
    })
    setIsDrawerOpen(true)
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355]"></div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

      {/* Hero Image Container with Form Overlay */}
      <div className={`relative w-full overflow-hidden h-[40vh] min-h-[300px] md:h-[75vh] md:min-h-[600px]`}>
        {/* Horizontal Heading Image */}
        <LazyImage
          src={pageData?.heroSection?.image?.url || headingImage}
          alt={pageData?.heroSection?.image?.alt || "Jain Temples"}
          className="w-full h-full"
          imageClassName="w-full h-full object-cover object-top"
          priority={true}
        />

        {/* Gradient Overlay for Text Visibility - REMOVED per user request */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div> */}

        {/* Hero Text Overlay */}
        <div className="absolute top-16 md:top-24 lg:top-32 left-4 md:left-6 lg:left-8 xl:left-12 z-10 max-w-xl md:max-w-2xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight uppercase tracking-wide drop-shadow-lg">
            {pageData?.heroSection?.title || 'Jain Temples'}
          </h1>
          <p className="text-white/95 text-sm md:text-base lg:text-lg font-medium drop-shadow-md">
            {pageData?.heroSection?.subtitle || 'Designing Sacred Spaces with Timeless Elegance'}
          </p>

          {/* Mobile "Talk to Our Expert" Button */}
          <button
            onClick={() => setShowMobileForm(true)}
            className="lg:hidden mt-6 px-6 py-2.5 text-xs sm:text-sm bg-[#8B7355] text-white font-bold uppercase tracking-wider rounded shadow-lg hover:bg-[#725E45] transition-transform hover:scale-105"
          >
            Talk to Our Expert
          </button>
        </div>

        {/* Desktop Form - Fixed Position Over Image */}
        {/* Desktop Form - Using the ExpertFormOverlay component for exact UI match */}
        <ExpertFormOverlay
          className="hidden lg:flex absolute top-1/2 right-4 md:right-10 transform -translate-y-1/2 w-[350px] z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl flex-col overflow-hidden"
        />      </div>

      {/* Mobile Form Modal */}
      {showMobileForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn lg:hidden">
          <div
            className="relative w-full max-w-sm h-auto max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMobileForm(false)}
              className="absolute top-3 right-3 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/80 text-gray-500 hover:bg-gray-200 transition-colors backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ExpertFormOverlay className="w-full h-full bg-white flex flex-col" />
          </div>
        </div>
      )}

      {/* Creative Our Artist Section */}
      <section className="w-full py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#8B7355] italic mb-4">
              Our Artist
            </h2>
            <div className="w-20 h-0.5 bg-[#8B7355] mx-auto opacity-30"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {artistImages.map((art, i) => (
              <div key={art.id || i} className="group relative flex flex-col items-center">
                <div className="relative w-32 h-32 md:w-44 md:h-44">
                  <div className="absolute inset-0 bg-[#8B7355]/10 rounded-2xl rotate-6 transition-transform duration-500 group-hover:rotate-0 group-hover:bg-[#8B7355]/20"></div>
                  <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-white shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[#8B7355]/20">
                    <LazyImage
                      src={art.image || art.url}
                      alt={art.alt || 'Artisan'}
                      className="w-full h-full"
                      imageClassName="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Images Gallery Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-14 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-4 md:mb-5 tracking-wide">
              {pageData?.projectsSection?.title || 'Our Jain Temple Projects'}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {pageData?.projectsSection?.description || 'Showcasing our beautiful Jain temples that bring divine energy into refined spaces.'}
            </p>
            <div className="w-24 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {(pageData?.projectsSection?.projects || [
              { id: 1, image: { url: img1 }, title: 'White Marble Jain Temple', location: 'India', description: 'Exquisite white marble Jain temple.' },
              { id: 2, image: { url: img2 }, title: 'Intricate Temple Carvings', location: 'Rajasthan', description: 'Detailed stone carvings.' },
              { id: 3, image: { url: img3 }, title: 'Traditional Temple Facade', location: 'Gujarat', description: 'Classic architecture.' },
              { id: 4, image: { url: img4 }, title: 'Marble Temple Interior', location: 'India', description: 'Serene interior.' },
              { id: 5, image: { url: img5 }, title: 'Swethamber Jain Temple', location: 'India', description: 'Magnificent temple.' },
            ]).map((project, index) => (
              <div
                key={project._id || index}
                className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image Area - Compact Horizontal Aspect Ratio */}
                <div
                  className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 cursor-pointer"
                  onClick={() => handleImageClick({ ...project, url: project.image?.url })}
                >
                  <LazyImage
                    src={project.image?.url}
                    alt={project.title}
                    className="w-full h-full"
                    imageClassName="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  {/* Overlay on hover (Desktop) or always (Mobile) - reduced opacity */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                  {/* Location Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#8B7355] uppercase tracking-wide shadow-sm">
                    {project.location}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-serif font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#8B7355] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                    {project.description}
                  </p>

                  <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleImageClick({ ...project, url: project.image?.url })}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#8B7355] border border-[#8B7355] rounded hover:bg-[#8B7355] hover:text-white transition-colors text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => setShowMobileForm(true)}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#8B7355] rounded hover:bg-[#725E45] transition-colors shadow-sm text-center"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        project={selectedProject}
      />

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default JainTemplesPage
