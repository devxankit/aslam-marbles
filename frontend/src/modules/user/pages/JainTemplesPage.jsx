import React, { useState, useEffect } from 'react'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import ProjectDrawer from '../../../components/common/ProjectDrawer'
import headingImage from '../../../assets/ourcreation/jain temple/heading/SMT01780-Edit_6ebd2fd8-7aa4-4df4-b841-2cb2e362337e_large.jpeg'
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from '../../../utils/constants'
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
  const [formStep, setFormStep] = useState(1)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [artistImages, setArtistImages] = useState([])
  const [pageData, setPageData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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

  const [formData, setFormData] = useState({
    type: 'DOMESTIC',
    fullName: '',
    email: '',
    phone: '',
    city: '',
    aboutYourself: '',
    lookingFor: '',
    budget: '',
    timeline: '',
    additionalInfo: '',
    designReferences: null
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you! Your form has been submitted.')
    setFormStep(1)
    setFormData({
      type: 'DOMESTIC',
      fullName: '',
      email: '',
      phone: '',
      city: '',
      aboutYourself: '',
      lookingFor: '',
      budget: '',
      timeline: '',
      additionalInfo: '',
      designReferences: null
    })
  }

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
      <div className="relative w-full overflow-hidden" style={{ height: '75vh', minHeight: '600px' }}>
        {/* Horizontal Heading Image */}
        <img
          src={pageData?.heroSection?.image?.url || headingImage}
          alt={pageData?.heroSection?.image?.alt || "Jain Temples"}
          className="w-full h-full object-cover object-top"
        />

        {/* Gradient Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>

        {/* Hero Text Overlay */}
        <div className="absolute top-16 md:top-24 lg:top-32 left-4 md:left-6 lg:left-8 xl:left-12 z-10 max-w-xl md:max-w-2xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight uppercase tracking-wide drop-shadow-lg">
            {pageData?.heroSection?.title || 'Jain Temples'}
          </h1>
          <p className="text-white/90 text-sm md:text-base lg:text-lg font-medium drop-shadow-md">
            {pageData?.heroSection?.subtitle || 'Designing Sacred Spaces with Timeless Elegance'}
          </p>
        </div>


        {/* Talk to Expert Box - Fixed Position Over Image */}
        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-[350px] bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden z-20">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#8B7355]/10">
            <h3 className="text-lg font-bold text-[#8B7355] uppercase tracking-wide">Talk to Our Expert</h3>
            <span className="text-xs font-semibold px-2 py-1 bg-[#8B7355] text-white rounded-full">{formStep}/2</span>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {formStep === 1 ? (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setFormStep(2); }}>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.type === 'DOMESTIC' ? 'border-[#8B7355]' : 'border-gray-300'}`}>
                      {formData.type === 'DOMESTIC' && <div className="w-2 h-2 rounded-full bg-[#8B7355]" />}
                    </div>
                    <input
                      type="radio"
                      name="type"
                      value="DOMESTIC"
                      checked={formData.type === 'DOMESTIC'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="hidden"
                    />
                    <span className={`text-xs font-bold tracking-wider ${formData.type === 'DOMESTIC' ? 'text-[#8B7355]' : 'text-gray-500'}`}>DOMESTIC</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.type === 'INTERNATIONAL' ? 'border-[#8B7355]' : 'border-gray-300'}`}>
                      {formData.type === 'INTERNATIONAL' && <div className="w-2 h-2 rounded-full bg-[#8B7355]" />}
                    </div>
                    <input
                      type="radio"
                      name="type"
                      value="INTERNATIONAL"
                      checked={formData.type === 'INTERNATIONAL'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="hidden"
                    />
                    <span className={`text-xs font-bold tracking-wider ${formData.type === 'INTERNATIONAL' ? 'text-[#8B7355]' : 'text-gray-500'}`}>INTERNATIONAL</span>
                  </label>
                </div>

                <input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent transition-all"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent transition-all"
                  required
                />

                <div>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#8B7355] focus-within:border-transparent transition-all">
                    <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-r">
                      <span className="text-base">🇮🇳</span>
                      <span className="text-sm font-medium text-gray-700">+91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 px-4 py-2.5 text-sm focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="City *"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent transition-all"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-[#8B7355] text-white py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:bg-[#725E45] shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  NEXT →
                </button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <select
                  value={formData.lookingFor}
                  onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="">What are you looking for? *</option>
                  {['Small Temple', 'Medium Temple', 'Large Temple', 'Custom Design'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="">What is your estimated budget? *</option>
                  {BUDGET_OPTIONS.map((budget) => (
                    <option key={budget} value={budget}>{budget}</option>
                  ))}
                </select>

                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="">Timeline? *</option>
                  {TIMELINE_OPTIONS && TIMELINE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>

                <textarea
                  placeholder="Tell us more about your project..."
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent transition-all resize-none"
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:bg-gray-200"
                  >
                    ← BACK
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#8B7355] text-white py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:bg-[#725E45] shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>


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
                    <img
                      src={art.image || art.url}
                      alt={art.alt || 'Artisan'}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Images Gallery Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {(pageData?.projectsSection?.projects || [
              { id: 1, image: { url: img1 }, title: 'White Marble Jain Temple', location: 'India', description: 'Exquisite white marble Jain temple.' },
              { id: 2, image: { url: img2 }, title: 'Intricate Temple Carvings', location: 'Rajasthan', description: 'Detailed stone carvings.' },
              { id: 3, image: { url: img3 }, title: 'Traditional Temple Facade', location: 'Gujarat', description: 'Classic architecture.' },
              { id: 4, image: { url: img4 }, title: 'Marble Temple Interior', location: 'India', description: 'Serene interior.' },
              { id: 5, image: { url: img5 }, title: 'Swethamber Jain Temple', location: 'India', description: 'Magnificent temple.' },
            ]).map((project, index) => (
              <div
                key={project._id || index}
                onClick={() => handleImageClick({ ...project, url: project.image?.url })}
                className="group cursor-pointer bg-white border border-gray-200 overflow-hidden hover:border-[#8B7355] transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative w-full h-80 md:h-96 overflow-hidden bg-gray-100">
                  <img
                    src={project.image?.url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white text-left">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <h3 className="text-xl font-serif leading-tight mb-1">
                        {project.title}, <br />
                        <span className="text-lg">{project.location}</span>
                      </h3>
                      <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
                        {project.description}
                      </p>
                      <div className="w-full h-[1px] bg-white/30 my-3"></div>
                      <p className="text-sm font-medium tracking-wide">
                        {project.client || 'Private Client'}
                      </p>
                      <div className="w-full h-[1px] bg-white/30 my-3"></div>
                      <p className="text-sm font-light">
                        {project.status || 'Completed'}
                      </p>
                    </div>
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
