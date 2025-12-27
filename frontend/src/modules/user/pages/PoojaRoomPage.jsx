import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import headingImage from '../../../assets/ourcreation/pooja room/headiing/06fcbe87-a149-445b-912c-6787ef4a4d50.png'
import wallIcon from '../../../assets/ourcreation/pooja room/icons/1wall.png'
import floorIcon from '../../../assets/ourcreation/pooja room/icons/2floor.png'
import virtualIcon from '../../../assets/ourcreation/pooja room/icons/3virtual.png'
import customDesignIcon from '../../../assets/ourcreation/pooja room/icons/4custom design.png'
import visualisationIcon from '../../../assets/ourcreation/pooja room/icons/5visualisation.png'
import projectTrackingIcon from '../../../assets/ourcreation/pooja room/icons/6project tracking.png'
import consultationImage1 from '../../../assets/ourcreation/pooja room/consultation lcons/Gemini_Generated_Image_h2oaaqh2oaaqh2oa.png'
import consultationImage2 from '../../../assets/ourcreation/pooja room/consultation lcons/Gemini_Generated_Image_xtcirextcirextci.png'
import poojaRoom1 from '../../../assets/ourcreation/pooja room/images/06fcbe87-a149-445b-912c-6787ef4a4d50.png'
import poojaRoom2 from '../../../assets/ourcreation/pooja room/images/14d31fa5-cfd7-4b90-a247-9748d279f3c7.png'
import poojaRoom3 from '../../../assets/ourcreation/pooja room/images/299a63e6-532b-4b95-960c-1547e879b758.png'
import poojaRoom4 from '../../../assets/ourcreation/pooja room/images/446d311a-f90e-4837-b736-3f8e6a5f4b2c.png'
import galleryImg1 from '../../../assets/ourcreation/pooja room/images/1733296958645.jpeg'
import galleryImg2 from '../../../assets/ourcreation/pooja room/images/1733300646054.jpeg'
import galleryImg3 from '../../../assets/ourcreation/pooja room/images/4d2730d0-5d47-49f4-94b5-a8d151f7b39b.png'
import galleryImg4 from '../../../assets/ourcreation/pooja room/images/81fe6d99-c983-460b-9cfb-586795089d56.png'
import galleryImg5 from '../../../assets/ourcreation/pooja room/images/8d836775-b2f6-4c0a-8ab4-5b7c27a36e55.png'
import galleryImg6 from '../../../assets/ourcreation/pooja room/images/ca344ef3-3bd3-44dc-adeb-cd70d1b3c573.png'
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from '../../../utils/constants'
import { indianLocations, internationalLocations } from '../../../data/locations'
import TrustedBySection from '../../../components/common/TrustedBySection'
import BeforeAfterSlider from '../../../components/common/BeforeAfterSlider'
import afterImage from '../../../assets/ourcreation/pooja room/before&after/compare1.png'
import beforeImage from '../../../assets/ourcreation/pooja room/before&after/compare2.jpg'


const PoojaRoomPage = ({ onShowCart, onShowLikes }) => {
  const navigate = useNavigate()
  const [formStep, setFormStep] = useState(1)
  const [showAllLocations, setShowAllLocations] = useState(false)
  const [showConsultationModal, setShowConsultationModal] = useState(false)
  const [selectedProjectType, setSelectedProjectType] = useState('Communal')
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [showExpertForm, setShowExpertForm] = useState(true)
  const [showMobileForm, setShowMobileForm] = useState(false)
  const [pageData, setPageData] = useState(null)

  const renderFormContent = () => {
    return (
      <>
        {formStep === 1 ? (
          <form className="space-y-2.5" onSubmit={(e) => { e.preventDefault(); setFormStep(2); }}>
            <div className="flex gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="DOMESTIC"
                  checked={formData.type === 'DOMESTIC'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-3 h-3 accent-amber-600"
                />
                <span className="text-xs font-medium" style={{ color: formData.type === 'DOMESTIC' ? '#8B7355' : '#333' }}>DOMESTIC</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="INTERNATIONAL"
                  checked={formData.type === 'INTERNATIONAL'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-3 h-3 accent-amber-600"
                />
                <span className="text-xs font-medium" style={{ color: formData.type === 'INTERNATIONAL' ? '#8B7355' : '#333' }}>INTERNATIONAL</span>
              </label>
            </div>

            <input
              type="text"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />

            <input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />

            <div>
              <label className="block text-xs font-medium mb-1">Phone number</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <div className="flex items-center gap-1 px-2 bg-gray-50 border-r">
                  <span className="text-sm">🇮🇳</span>
                  <span className="text-xs">+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="Phone number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="City *"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />

            <div>
              <label className="block text-xs font-medium mb-1.5">Tell us about yourself *</label>
              <div className="space-y-1.5">
                <label className="flex items-start gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="aboutYourself"
                    value="homeowner"
                    checked={formData.aboutYourself === 'homeowner'}
                    onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                    className="mt-0.5 w-3 h-3 accent-amber-600 flex-shrink-0"
                    required
                  />
                  <span className="text-xs leading-relaxed">I am a homeowner looking for a pooja unit or pooja room</span>
                </label>
                <label className="flex items-start gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="aboutYourself"
                    value="designer"
                    checked={formData.aboutYourself === 'designer'}
                    onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                    className="mt-0.5 w-3 h-3 accent-amber-600 flex-shrink-0"
                    required
                  />
                  <span className="text-xs leading-relaxed">I am an interior designer/consultant seeking solutions for my client</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              style={{ backgroundColor: '#8B7355' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
            >
              NEXT →
            </button>
          </form>
        ) : (
          <form className="space-y-2.5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold mb-1.5">What are you looking for? *</label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="lookingFor"
                    value="singular"
                    checked={formData.lookingFor === 'singular'}
                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                    className="w-3 h-3 accent-amber-600"
                    required
                  />
                  <span className="text-xs">Singular Marble Mandir Unit</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="lookingFor"
                    value="complete"
                    checked={formData.lookingFor === 'complete'}
                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                    className="w-3 h-3 accent-amber-600"
                    required
                  />
                  <span className="text-xs">Complete Pooja Room Solution</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5">What is your estimated budget? *</label>
              <div className="space-y-1.5">
                {BUDGET_OPTIONS.map((budget) => (
                  <label key={budget} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="budget"
                      value={budget}
                      checked={formData.budget === budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-3 h-3 accent-amber-600"
                      required
                    />
                    <span className="text-xs">{budget}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5">What is your timeline for the project? *</label>
              <div className="space-y-1.5">
                {TIMELINE_OPTIONS.map((timeline) => (
                  <label key={timeline} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="timeline"
                      value={timeline}
                      checked={formData.timeline === timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-3 h-3 accent-amber-600"
                      required
                    />
                    <span className="text-xs">{timeline}</span>
                  </label>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Please share a bit more about your needs"
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
            />

            <div>
              <input
                type="file"
                id="designReferences"
                accept="image/*,.pdf"
                multiple
                onChange={(e) => setFormData({ ...formData, designReferences: e.target.files })}
                className="hidden"
              />
              <label
                htmlFor="designReferences"
                className="block w-full text-white py-2 rounded-lg text-xs text-center font-medium cursor-pointer transition-colors shadow-md"
                style={{ backgroundColor: '#8B7355' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
              >
                UPLOAD DESIGN REFERENCES
              </label>
              {formData.designReferences && formData.designReferences.length > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  {formData.designReferences.length} file(s) selected
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFormStep(1)}
                className="flex-1 bg-white py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors shadow-md border-2"
                style={{ color: '#8B7355', borderColor: '#8B7355' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f9f9f9'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'white'
                }}
              >
                BACK
              </button>
              <button
                type="submit"
                className="flex-1 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                style={{ backgroundColor: '#8B7355' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
              >
                SUBMIT
              </button>
            </div>
          </form>
        )}
      </>
    )
  }
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

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

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(`${API_URL}/pooja-room`)
        const data = await res.json()
        if (res.ok) {
          setPageData(data)
        }
      } catch (error) {
        console.error('Error fetching pooja room data:', error)
      }
    }
    fetchPageData()
  }, [API_URL])

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

  const poojaRooms = pageData?.collection?.length > 0 ? pageData.collection.map(item => ({
    ...item,
    image: item.image?.url || poojaRoom1 // Fallback image if needed
  })) : [
    {
      id: 1,
      name: 'Small Pooja Room',
      size: 'upto 50 Sqft',
      price: '12L',
      fullPrice: 1200000,
      image: poojaRoom1
    },
    {
      id: 2,
      name: 'Medium Pooja Room',
      size: 'upto 80 Sqft',
      price: '20L',
      fullPrice: 2000000,
      image: poojaRoom2
    },
    {
      id: 3,
      name: 'Large Pooja Room',
      size: 'Above 80 Sqft',
      price: '25.75L',
      fullPrice: 2575000,
      image: poojaRoom3
    },
    {
      id: 4,
      name: 'Grand Pooja Room',
      size: 'Custom Size',
      price: '35L',
      fullPrice: 3500000,
      image: poojaRoom4
    }
  ]

  const galleryImages = pageData?.gallery?.length > 0
    ? pageData.gallery.map(img => img.url)
    : [
      poojaRoom1,
      poojaRoom2,
      poojaRoom3,
      poojaRoom4,
      galleryImg1,
      galleryImg2,
      galleryImg3,
      galleryImg4,
      galleryImg5,
      galleryImg6
    ]

  const handleGalleryPrev = () => {
    setGalleryIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const handleGalleryNext = () => {
    setGalleryIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const services = [
    {
      id: 1,
      name: 'Wall Cladding',
      icon: wallIcon
    },
    {
      id: 2,
      name: 'Floor Inlay',
      icon: floorIcon
    },
    {
      id: 3,
      name: 'Virtual Tour',
      icon: virtualIcon
    },
    {
      id: 4,
      name: 'Custom Design',
      icon: customDesignIcon
    },
    {
      id: 5,
      name: '3D visualisation',
      icon: visualisationIcon
    },
    {
      id: 6,
      name: 'Project Tracking',
      icon: projectTrackingIcon
    }
  ]

  return (
    <div className="w-full min-h-screen bg-white">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

      {/* Hero Image Container with Form Overlay */}
      <div className="relative w-full overflow-hidden h-[35vh] min-h-[220px] md:h-[75vh] md:min-h-[600px]">
        {/* Horizontal Heading Image */}
        <img
          src={pageData?.heroSection?.image?.url || headingImage}
          alt={pageData?.heroSection?.image?.alt || "Pooja Room"}
          className="w-full h-full object-cover relative z-0"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />

        {/* Overlay Text */}
        <div className="absolute top-20 md:top-1/2 md:-translate-y-1/2 left-4 md:left-12 lg:left-20 w-[90%] max-w-lg lg:max-w-2xl z-10 flex flex-col items-start text-left animate-fadeInUp">
          <h1 className="text-xl md:text-5xl lg:text-6xl font-serif text-white italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-1 leading-tight">
            {pageData?.heroSection?.title || 'Welcome to Our Pooja Room Collection'}
          </h1>
          <p className="text-[10px] md:text-2xl text-white/95 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide mb-3">
            <span className="border-b border-[#8B7355] pb-0.5">{pageData?.heroSection?.subtitle || 'Aslam Marble Suppliers'}</span>
          </p>

          {/* Mobile Button */}
          <button
            onClick={() => setShowMobileForm(true)}
            className="md:hidden px-3 py-1.5 bg-[#8B7355] text-white font-bold text-[10px] uppercase tracking-wider rounded shadow-xl hover:bg-[#725E45] transition-colors"
          >
            Talk to Our Expert
          </button>
        </div>

        {/* Desktop Form Container - Hidden on Mobile */}
        <div id="expert-form-container-desktop" className="hidden md:flex absolute lg:left-auto lg:translate-x-0 lg:right-4 md:lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 w-[340px] lg:w-[340px] bg-white rounded-xl md:rounded-2xl shadow-2xl z-20 flex-col backdrop-blur-sm bg-white/95 max-h-[90%]">
          {/* Desktop Form Content */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b-2 border-gray-200 bg-gradient-to-r from-[#8B7355]/10 to-transparent flex-shrink-0 rounded-t-xl md:rounded-t-2xl">
            <h3 className="text-base md:text-lg font-bold uppercase tracking-wide" style={{ color: '#8B7355' }}>Talk to Our Expert</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#8B7355]/10" style={{ color: '#8B7355' }}>{formStep}/2</span>
            </div>
          </div>

          <div className="px-3 pt-3 pb-4 md:px-4 md:pt-4 md:pb-4 bg-white overflow-y-auto flex-1 rounded-b-xl md:rounded-b-2xl scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {renderFormContent()}
          </div>
        </div>
      </div>

      {/* Mobile Form Modal */}
      {showMobileForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn md:hidden">
          <div
            className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b-2 border-gray-200 bg-gradient-to-r from-[#8B7355]/10 to-transparent flex-shrink-0">
              <h3 className="text-base font-bold uppercase tracking-wide" style={{ color: '#8B7355' }}>Talk to Our Expert</h3>
              <button
                onClick={() => setShowMobileForm(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              {renderFormContent()}
            </div>
          </div>
        </div>
      )}

      {/* Pooja Rooms Collection Section */}
      <section className="relative z-10 w-full -mt-6 pt-0 pb-16 md:mt-0 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-6 md:mb-20 pt-0 md:pt-0">
            <span className="text-[#8B7355] font-bold tracking-[0.3em] uppercase text-xs mb-2 md:mb-4 block">Exquisite Craftsmanship</span>
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-4 md:mb-6 tracking-tight">
              Our Pooja Room Collection
            </h2>
            <div className="w-16 md:w-20 h-1 bg-[#8B7355]/30 mx-auto mb-6 md:mb-8"></div>
            <p className="text-sm md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Transform your sacred space with our meticulously crafted pooja rooms, designed to bring peace and divinity into your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {poojaRooms.map((room) => (
              <div
                key={room.id}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(139,115,85,0.15)] transform hover:-translate-y-3"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />

                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

                  {/* Subtle Top Gradient */}
                  <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/40 to-transparent"></div>

                  {/* Elegant Price Badge - Slides in from left on hover */}
                  <div className="absolute top-10 left-0 overflow-hidden pointer-events-none">
                    <div className="bg-[#8B7355] text-white px-6 py-2 shadow-2xl transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out">
                      <span className="text-xs font-bold tracking-widest uppercase">INR {room.price}</span>
                    </div>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6 bg-white text-center border-t border-gray-50 flex flex-col h-full">
                  <p className="text-[#8B7355] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Starting at {room.price}</p>
                  <h3 className="text-xl font-serif text-gray-800 italic mb-2 group-hover:text-[#8B7355] transition-colors duration-300">
                    {room.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
                    <div className="w-8 h-[1px] bg-gray-200"></div>
                    <span className="text-xs font-medium tracking-wide italic">{room.size}</span>
                    <div className="w-8 h-[1px] bg-gray-200"></div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/checkout', {
                          state: {
                            items: [{
                              id: `pooja-${room.id}`,
                              name: room.name,
                              image: room.image,
                              price: room.fullPrice || 1200000,
                              quantity: 1,
                              size: room.size
                            }]
                          }
                        })
                      }}
                      className="flex-1 bg-[#8B7355] text-white text-xs font-bold py-2 rounded hover:opacity-90 transition-opacity"
                    >
                      BUY NOW
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowConsultationModal(true);
                      }}
                      className="flex-1 border border-[#8B7355] text-[#8B7355] text-xs font-bold py-2 rounded hover:bg-[#8B7355] hover:text-white transition-all"
                    >
                      DETAILS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Section 1 */}
      <section className="w-full py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-[#fffbf0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            {/* Left Side - Text Content */}
            <div className="w-full md:w-3/5 order-2 md:order-1">
              <div className="max-w-xl">
                <p className="text-[#8B7355] font-bold tracking-[0.2em] uppercase text-sm mb-4">Consultation</p>
                <h2 className="text-3xl md:text-5xl font-serif text-gray-800 italic mb-6 leading-[1.2]">
                  {pageData?.consultation?.section1?.title || 'All We Need Is Your Space Dimensions And Pictures'}
                </h2>
                <div className="w-16 h-1 bg-[#8B7355]/40 mb-8"></div>
                <p className="text-lg text-gray-600 leading-relaxed mb-10">
                  {pageData?.consultation?.section1?.description || "We understand that every space is unique. Share your space's dimensions and pictures, and let our experts help you visualize the perfect marble solution tailored to your environment."}
                </p>
                <button
                  onClick={() => setShowConsultationModal(true)}
                  className="group relative px-8 py-4 bg-[#8B7355] text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_10px_20px_rgba(139,115,85,0.3)] hover:-translate-y-1 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Free Consultation
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="w-full md:w-2/5 order-1 md:order-2">
              <div className="flex justify-center md:justify-end">
                <img
                  src={pageData?.consultation?.section1?.image?.url || consultationImage1}
                  alt={pageData?.consultation?.section1?.image?.alt || "Consultation"}
                  className="w-full h-auto object-contain pointer-events-none max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-14 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic mb-4 md:mb-5 tracking-wide">
              We Offer Unparalleled Services
            </h2>
            <div className="w-24 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Services Grid - 2x3 Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group cursor-pointer bg-white border-2 border-gray-200 rounded-xl p-6 md:p-8 hover:border-[#8B7355] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                    <img
                      src={service.icon}
                      alt={service.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-[#8B7355] transition-colors duration-300">
                    {service.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium 3D Cinematic Gallery Section */}
      <section className="w-full pt-12 md:pt-16 pb-12 md:pb-20 bg-white overflow-hidden" style={{ perspective: '2000px' }}>
        <div className="max-w-7xl mx-auto text-center mb-12 md:mb-20">
          <span className="text-[#8B7355] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">New Arrivals</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-2 tracking-tight">
            Recent Collection
          </h2>
          <div className="w-20 h-1 bg-[#8B7355]/30 mx-auto"></div>
        </div>

        <div className="max-w-[1920px] mx-auto relative px-4 md:px-0">
          <div className="flex items-center justify-center relative">
            {/* Left Arrow - Floating */}
            <button
              onClick={handleGalleryPrev}
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-20 md:h-20 bg-white/90 backdrop-blur-md shadow-2xl rounded-full flex items-center justify-center text-[#8B7355] hover:bg-[#8B7355] hover:text-white transition-all duration-500 transform hover:scale-110 group border border-white/20"
            >
              <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* 3D Gallery Container */}
            <div className="w-full relative overflow-visible h-full flex items-center justify-center">
              <div
                className="flex transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) items-center"
                style={{
                  transform: `translateX(calc(${(galleryImages.length / 2 - 0.5 - galleryIndex) * 33.33}vw))`,
                  width: `${galleryImages.length * 33.33}vw`
                }}
              >
                {galleryImages.map((image, index) => {
                  const isActive = index === galleryIndex;
                  const isPrev = index < galleryIndex;
                  const isNext = index > galleryIndex;

                  return (
                    <div
                      key={index}
                      className={`relative transition-all duration-1000 ease-out flex-shrink-0 flex items-center justify-center
                        ${isActive ? 'w-[33.33vw] z-30 scale-125 md:scale-150' : 'w-[33.33vw] z-10 opacity-40 scale-75 md:scale-90'}
                      `}
                      style={{
                        perspective: '1200px',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <div
                        className={`w-[90%] md:w-[85%] aspect-[16/9] overflow-hidden shadow-2xl transition-all duration-1000
                          ${isActive ? 'shadow-[0_40px_80px_-15px_rgba(139,115,85,0.4)]' : 'grayscale blur-[2px]'}
                          ${isActive ? 'hover:scale-105 cursor-zoom-in' : ''}
                        `}
                        style={{
                          transform: isActive ? 'rotateY(0deg)' : (isPrev ? 'rotateY(25deg)' : 'rotateY(-25deg)'),
                        }}
                      >
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'hover:scale-110' : ''}`}
                        />
                        {/* Dramatic Overlay for Depth */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-black/20"></div>
                        )}

                        {/* Premium Glow effect for active image */}
                        {isActive && (
                          <div className="absolute inset-0 border-[1px] border-white/30 pointer-events-none"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow - Floating */}
            <button
              onClick={handleGalleryNext}
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-20 md:h-20 bg-white/90 backdrop-blur-md shadow-2xl rounded-full flex items-center justify-center text-[#8B7355] hover:bg-[#8B7355] hover:text-white transition-all duration-500 transform hover:scale-110 group border border-white/20"
            >
              <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Luxury Navigation Indicators */}
          <div className="mt-20 md:mt-32 flex flex-col items-center gap-6">
            <div className="flex gap-2 items-center">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setGalleryIndex(index)}
                  className={`transition-all duration-500 rounded-full ${index === galleryIndex ? 'w-12 h-1.5 bg-[#8B7355]' : 'w-2 h-1.5 bg-gray-200 hover:bg-gray-300'
                    }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-4 text-[#8B7355] font-serif italic text-sm md:text-base">
              <span className="opacity-40">Previous Exhibit</span>
              <div className="w-12 h-[1px] bg-[#8B7355]/30"></div>
              <span className="font-bold tracking-widest">{String(galleryIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}</span>
              <div className="w-12 h-[1px] bg-[#8B7355]/30"></div>
              <span className="opacity-40">Next Masterpiece</span>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section 2 - Customised Solutions */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-[#fffbf0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic leading-tight">
                {pageData?.consultation?.section2?.title || 'Customised Solutions'}
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {pageData?.consultation?.section2?.description || "Let us bring your vision to life with a custom-designed space that reflects your unique taste and lifestyle. Whether it's a traditional pooja room or a modern sanctuary, we'll work with you to create the perfect fit. Ready to make your dream a reality?"}
              </p>
              <button
                onClick={() => setShowConsultationModal(true)}
                className="group relative px-8 py-4 bg-[#8B7355] text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_10px_20px_rgba(139,115,85,0.3)] hover:-translate-y-1 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Free Consultation
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Right Side - Illustration */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-md">
                <img
                  src={pageData?.consultation?.section2?.image?.url || consultationImage2}
                  alt={pageData?.consultation?.section2?.image?.alt || "Customised Solutions"}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Projects Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic mb-8 md:mb-10 tracking-wide">
              Explore Our Projects
            </h2>

            {/* Three Option Buttons */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <button
                onClick={() => {
                  setSelectedProjectType('Communal')
                  navigate('/communal-projects')
                }}
                className={`px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 ${selectedProjectType === 'Communal'
                  ? 'text-white'
                  : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-gray-400'
                  }`}
                style={selectedProjectType === 'Communal' ? { backgroundColor: '#8B7355' } : {}}
              >
                Communal
              </button>
              <button
                onClick={() => {
                  setSelectedProjectType('Residential')
                  navigate('/residential-projects')
                }}
                className={`px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 ${selectedProjectType === 'Residential'
                  ? 'text-white'
                  : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-gray-400'
                  }`}
                style={selectedProjectType === 'Residential' ? { backgroundColor: '#8B7355' } : {}}
              >
                Residential
              </button>
              <button
                onClick={() => {
                  setSelectedProjectType('International')
                  navigate('/international-projects')
                }}
                className={`px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 ${selectedProjectType === 'International'
                  ? 'text-white'
                  : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-gray-400'
                  }`}
                style={selectedProjectType === 'International' ? { backgroundColor: '#8B7355' } : {}}
              >
                International
              </button>
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
                Before and After
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed text-justify">
                Witness the transformation from a blank canvas to a serene sanctuary with Tilak Stone Arts India. Our skilled artisans turn raw spaces into exquisite pooja rooms, reflecting spirituality and elegance. See the remarkable difference quality and craftsmanship can make.
              </p>
            </div>

            {/* Right Side - Comparison Slider */}
            <div className="order-1 lg:order-2 w-full">
              <BeforeAfterSlider
                beforeImage={pageData?.beforeAfter?.beforeImage?.url || afterImage}
                afterImage={pageData?.beforeAfter?.afterImage?.url || beforeImage}
                beforeLabel="Before"
                afterLabel="After"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-8 bg-[#fffbf0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black text-left">
                {showAllLocations ? 'OUR GLOBAL PRESENCE' : 'INTERNATIONAL LOCATIONS'}
              </h2>
            </div>
            <button
              onClick={() => setShowAllLocations(!showAllLocations)}
              className="text-[#8B7355] font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300 mt-4 md:mt-0"
            >
              {showAllLocations ? 'View Less' : 'View More'}
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${showAllLocations ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 transition-all duration-700 ease-in-out ${showAllLocations ? 'opacity-100 max-h-[2000px]' : 'max-h-[500px]'}`}>
            {(showAllLocations ? [...internationalLocations, ...indianLocations] : internationalLocations.slice(0, 5)).map((location, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group animate-fadeIn"
                onClick={() => navigate(`/location/${location.name.toLowerCase()}`)}
              >
                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#fffbf0] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustedBySection />

      <Footer />
      <FloatingButtons />

      {/* Consultation Modal */}
      {
        showConsultationModal && (
          <ConsultationModal
            formStep={formStep}
            setFormStep={setFormStep}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            onClose={() => {
              setShowConsultationModal(false)
              setFormStep(1)
            }}
          />
        )
      }
    </div >
  )
}

// Consultation Modal Component
const ConsultationModal = ({ formStep, setFormStep, formData, setFormData, handleSubmit, onClose }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] transition-all duration-500"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl shadow-2xl max-w-sm w-full max-h-[90vh] overflow-hidden pointer-events-auto transform transition-all duration-300 animate-fadeInUp border border-white/20"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b-2 border-gray-200 bg-gradient-to-r from-[#8B7355]/10 to-transparent">
            <h3 className="text-base md:text-lg font-bold uppercase tracking-wide" style={{ color: '#8B7355' }}>Talk to Our Expert</h3>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#8B7355]/10" style={{ color: '#8B7355' }}>{formStep}/2</span>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold transition-colors w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          </div>

          <div className="px-4 pt-4 pb-5 md:px-5 md:pt-5 md:pb-6 bg-white overflow-y-auto max-h-[calc(90vh-80px)]">
            {formStep === 1 ? (
              <form className="space-y-2.5" onSubmit={(e) => { e.preventDefault(); setFormStep(2); }}>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="DOMESTIC"
                      checked={formData.type === 'DOMESTIC'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-3 h-3 accent-amber-600"
                    />
                    <span className="text-xs font-medium" style={{ color: formData.type === 'DOMESTIC' ? '#8B7355' : '#333' }}>DOMESTIC</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="INTERNATIONAL"
                      checked={formData.type === 'INTERNATIONAL'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-3 h-3 accent-amber-600"
                    />
                    <span className="text-xs font-medium" style={{ color: formData.type === 'INTERNATIONAL' ? '#8B7355' : '#333' }}>INTERNATIONAL</span>
                  </label>
                </div>

                <input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />

                <div>
                  <label className="block text-xs font-medium mb-1">Phone number</label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-1 px-2 bg-gray-50 border-r">
                      <span className="text-sm">🇮🇳</span>
                      <span className="text-xs">+91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="City *"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />

                <div>
                  <label className="block text-xs font-medium mb-1.5">Tell us about yourself *</label>
                  <div className="space-y-1.5">
                    <label className="flex items-start gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="aboutYourself"
                        value="homeowner"
                        checked={formData.aboutYourself === 'homeowner'}
                        onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                        className="mt-0.5 w-3 h-3 accent-amber-600 flex-shrink-0"
                        required
                      />
                      <span className="text-xs leading-relaxed">I am a homeowner looking for a pooja unit or pooja room</span>
                    </label>
                    <label className="flex items-start gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="aboutYourself"
                        value="designer"
                        checked={formData.aboutYourself === 'designer'}
                        onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                        className="mt-0.5 w-3 h-3 accent-amber-600 flex-shrink-0"
                        required
                      />
                      <span className="text-xs leading-relaxed">I am an interior designer/consultant seeking solutions for my client</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  style={{ backgroundColor: '#8B7355' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
                >
                  NEXT →
                </button>
              </form>
            ) : (
              <form className="space-y-2.5" onSubmit={(e) => { e.preventDefault(); handleSubmit(e); onClose(); }}>
                <div>
                  <label className="block text-xs font-bold mb-1.5">What are you looking for? *</label>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="lookingFor"
                        value="singular"
                        checked={formData.lookingFor === 'singular'}
                        onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                        className="w-3 h-3 accent-amber-600"
                        required
                      />
                      <span className="text-xs">Singular Marble Mandir Unit</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="lookingFor"
                        value="complete"
                        checked={formData.lookingFor === 'complete'}
                        onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                        className="w-3 h-3 accent-amber-600"
                        required
                      />
                      <span className="text-xs">Complete Pooja Room Solution</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">What is your estimated budget? *</label>
                  <div className="space-y-1.5">
                    {BUDGET_OPTIONS.map((budget) => (
                      <label key={budget} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="budget"
                          value={budget}
                          checked={formData.budget === budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-3 h-3 accent-amber-600"
                          required
                        />
                        <span className="text-xs">{budget}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">What is your timeline for the project? *</label>
                  <div className="space-y-1.5">
                    {TIMELINE_OPTIONS.map((timeline) => (
                      <label key={timeline} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="timeline"
                          value={timeline}
                          checked={formData.timeline === timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-3 h-3 accent-amber-600"
                          required
                        />
                        <span className="text-xs">{timeline}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Please share a bit more about your needs"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
                />

                <div>
                  <input
                    type="file"
                    id="modalDesignReferences"
                    accept="image/*,.pdf"
                    multiple
                    onChange={(e) => setFormData({ ...formData, designReferences: e.target.files })}
                    className="hidden"
                  />
                  <label
                    htmlFor="modalDesignReferences"
                    className="block w-full text-white py-2 rounded-lg text-xs text-center font-medium cursor-pointer transition-colors shadow-md"
                    style={{ backgroundColor: '#8B7355' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
                  >
                    UPLOAD DESIGN REFERENCES
                  </label>
                  {formData.designReferences && formData.designReferences.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      {formData.designReferences.length} file(s) selected
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="flex-1 bg-white py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors shadow-md border-2"
                    style={{ color: '#8B7355', borderColor: '#8B7355' }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#f9f9f9'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'white'
                    }}
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="flex-1 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    style={{ backgroundColor: '#8B7355' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PoojaRoomPage
