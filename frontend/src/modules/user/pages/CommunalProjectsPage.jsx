import { useState, useEffect } from 'react'
import ProjectDrawer from '../../../components/common/ProjectDrawer'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import { fetchCommunalProjectsData } from '../../../utils/communalProjectsUtils'
import ExpertFormOverlay from '../../../components/common/ExpertFormOverlay'

const CommunalProjectsPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  const [showMobileForm, setShowMobileForm] = useState(false)
  const [communalData, setCommunalData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchCommunalProjectsData()
        if (data) {
          setCommunalData(data)
        }
      } catch (error) {
        console.error('Error loading communal projects data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const communalImages = communalData?.galleryImages || []

  const [selectedProject, setSelectedProject] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleImageClick = (image, index) => {
    setSelectedProject({
      image: image.url,
      title: image.title,
      description: image.description,
      location: image.location,
      address: image.address,
      client: image.client,
      duration: image.duration
    })
    setIsDrawerOpen(true)
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <Header
        variant="default"
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
        onShowLocation={onShowLocation}
        onShowBooking={onShowBooking}
      />

      {/* Hero Image Container with Form Overlay */}
      <div className="relative w-full overflow-hidden h-[40vh] min-h-[300px] md:h-[60vh] md:min-h-[500px] lg:h-[75vh] lg:min-h-[600px]">
        {/* Background Image */}
        {loading ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : communalData?.heroImage?.url ? (
          <img
            src={communalData.heroImage.url}
            alt={communalData.heroImage.alt || 'Communal Projects'}
            className="w-full h-full object-cover"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <p className="text-gray-600">No hero image available</p>
          </div>
        )}

        {/* Gradient Overlay Removed */}

        {/* Hero Text Overlay - Left Side */}
        <div className="absolute top-10 md:top-24 lg:top-32 left-4 md:left-6 lg:left-8 xl:left-12 z-10 max-w-[60%] md:max-w-2xl">
          <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight uppercase tracking-wide drop-shadow-lg">
            {communalData?.title || 'COMMUNAL PROJECTS'}
          </h1>
          <p className="text-xs md:text-base lg:text-lg text-white font-light mb-1.5 md:mb-2 drop-shadow-md">
            {communalData?.subtitle || 'Building Sacred Spaces for Communities'}
          </p>
          <p className="text-[10px] md:text-sm text-white/90 font-light leading-relaxed drop-shadow-md hidden sm:block">
            {communalData?.description || 'Crafting magnificent communal temples and spiritual spaces that bring communities together through timeless architecture and exquisite craftsmanship.'}
          </p>

          <button
            onClick={() => setShowMobileForm(true)}
            className="md:hidden mt-4 bg-[#8B7355] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg border border-[#8B7355]/50 animate-pulse hover:animate-none"
          >
            Talk to Our Expert
          </button>
        </div>

        {/* Form Container - Overlay on Right Side, Fits Image Height */}
        {/* Form Container - Overlay on Right Side, Fits Image Height */}
        <ExpertFormOverlay source="communal-projects-page" className="hidden md:flex absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 w-[85%] sm:w-[320px] md:w-[340px] max-w-[calc(100%-32px)] bg-white rounded-xl md:rounded-2xl shadow-2xl z-20 flex-col backdrop-blur-sm bg-white/95 scale-90 md:scale-100 origin-right" />
      </div>

      {/* Images Gallery Section */}
      <section className="w-full -mt-12 pt-0 pb-6 md:mt-0 md:py-16 lg:py-20 px-2 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-0 md:mb-14 lg:mb-16">
            <h2 className="text-xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-2 md:mb-5 tracking-wide">
              {communalData?.sectionTitle || 'Our Communal Projects'}
            </h2>
            <p className="text-[10px] md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              {communalData?.sectionDescription || 'Showcasing our magnificent communal temple projects that bring communities together through divine architecture.'}
            </p>
            <div className="w-12 md:w-24 h-0.5 md:h-1 mx-auto mt-3 md:mt-6 rounded-full" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Images Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading gallery...</p>
            </div>
          ) : communalImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No projects available at the moment.</p>
            </div>
          ) : (

            <div className="grid grid-cols-3 gap-2 md:gap-8">
              {communalImages.map((image, index) => (
                <div
                  key={image._id || index}
                  onClick={() => handleImageClick(image, index)}
                  className="group cursor-pointer bg-white border border-gray-200 overflow-hidden hover:border-[#8B7355] transition-all duration-500 hover:shadow-2xl rounded-sm md:rounded-none"
                >
                  <div className="relative w-full h-36 md:h-96 overflow-hidden bg-gray-100">
                    <img
                      src={image.url}
                      alt={image.alt || `Communal Project ${index + 1}`}
                      className="w-full h-full !h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 md:p-6 text-white">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <h3 className="text-[10px] md:text-xl font-serif leading-none md:leading-tight mb-0.5 md:mb-1 truncate">
                          {image.title || 'Jain Temple Complex'},
                        </h3>
                        <p className="text-[8px] md:text-lg mb-1 md:mb-0 truncate">{image.location || 'Ahmedabad, Gujarat'}</p>

                        <p className="text-[8px] md:text-xs text-gray-300 mb-1 md:mb-3 font-light leading-relaxed line-clamp-1 hidden sm:block">
                          {image.address || '5, Pandurang Shastri Athavale Marg, Satellite, Ahmedabad, Gujarat 380015'}
                        </p>

                        <div className="w-full h-[1px] bg-white/30 my-1 md:my-3 hidden sm:block"></div>

                        <p className="text-[8px] md:text-sm font-medium tracking-wide truncate hidden sm:block">
                          {image.client || 'Community Trust'}
                        </p>

                        <div className="w-full h-[1px] bg-white/30 my-1 md:my-3 hidden sm:block"></div>

                        <p className="text-[8px] md:text-sm font-light hidden sm:block">
                          {image.duration || 'Running Project'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mobile Form Modal */}
      {showMobileForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div
            className="relative w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-scaleIn bg-white"
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
            <ExpertFormOverlay source="communal-projects-page" className="w-full flex flex-col max-h-[85vh]" />
          </div>
        </div>
      )}

      <ProjectDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        project={selectedProject}
      />


      <Footer />
      <FloatingButtons />
    </div >
  )
}

export default CommunalProjectsPage

