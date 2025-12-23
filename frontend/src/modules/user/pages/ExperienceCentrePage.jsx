import { useEffect, useRef, useState } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import ExpertFormSection from '../../../components/common/ExpertFormSection'
import BookingForm from '../../../components/common/BookingForm'
import { murtiCollections } from '../../../data/murtiCollections'
import headingImage from '../../../assets/house of marble/exprience/heading/Artisan.jpeg'
import horizontalImage1 from '../../../assets/house of marble/exprience/horizontal/446d311a-f90e-4837-b736-3f8e6a5f4b2c.png'
import horizontalImage2 from '../../../assets/house of marble/exprience/horizontal/SMT01780-Edit_6ebd2fd8-7aa4-4df4-b841-2cb2e362337e_large.jpeg'
import horizontalImage3 from '../../../assets/house of marble/exprience/horizontal/voice of devotion.jpg'
import image1 from '../../../assets/house of marble/exprience/06fcbe87-a149-445b-912c-6787ef4a4d50.png'
import image2 from '../../../assets/house of marble/exprience/1708509016923_large.jpeg'
import image3 from '../../../assets/house of marble/exprience/1733296958645.jpeg'
import image4 from '../../../assets/house of marble/exprience/1733300646054.jpeg'
import image5 from '../../../assets/house of marble/exprience/2d07e532-fa01-4e30-b638-52b26887f92c-small.jpeg'
import image6 from '../../../assets/house of marble/exprience/4d2730d0-5d47-49f4-94b5-a8d151f7b39b.png'
import image7 from '../../../assets/house of marble/exprience/8d836775-b2f6-4c0a-8ab4-5b7c27a36e55.png'
import image8 from '../../../assets/house of marble/exprience/99e40aab-0df8-4175-ad0e-a0a94517b611-medium.jpeg'
import image9 from '../../../assets/house of marble/exprience/large.jpeg'
import image10 from '../../../assets/house of marble/exprience/result_0 (1).jpeg'
import image11 from '../../../assets/house of marble/exprience/SMT01426-Edit_cc5ea55a-3771-4aa1-b484-c73f1cf8103e_large.jpeg'
import image12 from '../../../assets/house of marble/exprience/SMT01696-Edit_46274549-fd77-4997-8cd6-0067340d0636_large.jpeg'

const FadeInCaption = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`mt-4 text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      <p className="text-xl md:text-2xl font-serif text-[#8B7355] italic tracking-wide">
        {children}
      </p>
    </div>
  )
}

const ScrollSlideIn = ({ children, direction = 'left', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const initialTransform = direction === 'left' ? '-translate-x-20 md:-translate-x-32' : 'translate-x-20 md:translate-x-32'

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${initialTransform}`
        }`}
    >
      {children}
    </div>
  )
}

const ExperienceCentrePage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowProducts,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  const [dynamicContent, setDynamicContent] = useState(null)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_URL}/experience-centre`)
        const result = await res.json()
        if (result.success && result.data) {
          setDynamicContent(result.data)
        }
      } catch (error) {
        console.error('Error fetching experience centre dynamic content:', error)
      }
    }
    fetchContent()
  }, [])

  // Regular images array (4 images per row)
  const regularImages = [
    { id: 1, image: image1 },
    { id: 2, image: image2 },
    { id: 3, image: image3 },
    { id: 4, image: image4 },
    { id: 5, image: image5 },
    { id: 6, image: image6 },
    { id: 7, image: image7 },
    { id: 8, image: image8 },
    { id: 9, image: image9 },
    { id: 10, image: image10 },
    { id: 11, image: image11 },
    { id: 12, image: image12 }
  ]

  // Horizontal images array
  const horizontalImages = [
    { id: 1, image: horizontalImage1 },
    { id: 2, image: horizontalImage2 },
    { id: 3, image: horizontalImage3 }
  ]

  const [scrollIndex, setScrollIndex] = useState(0)
  const totalItems = murtiCollections.length

  const displayRegularImages = dynamicContent?.regularImages?.length > 0
    ? dynamicContent.regularImages.map((img, i) => ({ id: i, image: img.url }))
    : regularImages

  const displayHorizontalImages = dynamicContent?.horizontalImages?.length > 0
    ? dynamicContent.horizontalImages.map((img, i) => ({ id: i, image: img.url, caption: img.caption }))
    : horizontalImages

  const displayHeroImage = dynamicContent?.heroImage?.url || headingImage
  const displayMainCaption = dynamicContent?.mainCaption || "Step into our Experience Centre, where tradition meets innovation and craftsmanship comes to life. Our showroom is a sanctuary of marble artistry, showcasing the finest collection of handcrafted pieces that reflect decades of expertise and passion. Here, you can witness the intricate details, feel the premium quality, and experience the timeless beauty of our creations firsthand."
  const displaySubCaption = dynamicContent?.subCaption || "From elegant temple designs to exquisite home decor, our Experience Centre offers a curated journey through our portfolio. Each piece tells a story of devotion, precision, and artistic excellence. Visit us to explore our collections, consult with our experts, and discover how we can transform your vision into reality."
  const displayJourneyText = dynamicContent?.journeyText || "The journey began with a simple idea to craft a space that would not only showcase our marble temples and stone art, but also immerse our visitors in the magic of creation. What was initially planned as a six-month project grew into a year-long labor of love — a journey filled with dedication, passion, and an unwavering commitment to excellence. Our Experience Center stands as a tribute to the artistic legacy of India, built on the foundation of respect for tradition and the marvels that nature’s canvas, stone, provides."

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1))
    }, 3000) // Increased to 3s for a more relaxed feel

    return () => clearInterval(interval)
  }, [])

  // Seamless loop handling
  useEffect(() => {
    if (scrollIndex >= totalItems) {
      const timer = setTimeout(() => {
        setScrollIndex(0)
      }, 1500) // Reset after the transition completes
      return () => clearTimeout(timer)
    }
  }, [scrollIndex, totalItems])

  return (
    <div className="w-full min-h-screen bg-white">
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

      {/* Hero Image Section - Full Width Horizontal */}
      <section className="relative w-full overflow-hidden">
        <img
          src={displayHeroImage}
          alt="Experience Centre"
          className="w-full h-auto object-cover"
          style={{ display: 'block', width: '100%' }}
        />
      </section>

      {/* Caption Section - About Our Experience */}
      <section className="w-full py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed italic" style={{ fontWeight: 400 }}>
            {displayMainCaption}
          </p>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mt-6 italic" style={{ fontWeight: 400 }}>
            {displaySubCaption}
          </p>
        </div>
      </section>

      {/* Images Grid Section - Pattern: 4 images, horizontal, 4 images, horizontal, 4 images, horizontal, 4 images */}
      <section className="w-full py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          {/* First Row - 4 Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 overflow-hidden p-2">
            {displayRegularImages.slice(0, 4).map((item, index) => (
              <ScrollSlideIn
                key={item.id}
                direction={index < 2 ? 'left' : 'right'}
                delay={index % 2 * 100}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <img
                    src={item.image}
                    alt={`Experience ${item.id}`}
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </ScrollSlideIn>
            ))}
          </div>

          <div className="max-w-5xl mx-auto py-8 text-center border-y border-[#8B7355]/20">
            <p className="text-lg md:text-xl lg:text-2xl text-[#8B7355] font-serif italic leading-relaxed">
              {displayJourneyText}
            </p>
          </div>

          {/* First Horizontal Image */}
          {displayHorizontalImages[0] && (
            <div className="space-y-4">
              <div className="w-full relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={displayHorizontalImages[0].image}
                  alt="Experience Centre"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '500px' }}
                />
              </div>
              <FadeInCaption>
                "{displayHorizontalImages[0].caption || 'Where the legacy of marble meets the soul of craftsmanship.'}"
              </FadeInCaption>
            </div>
          )}

          {/* Second Row - 4 Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 overflow-hidden p-2">
            {displayRegularImages.slice(4, 8).map((item, index) => (
              <ScrollSlideIn
                key={item.id}
                direction={index < 2 ? 'left' : 'right'}
                delay={index % 2 * 100}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <img
                    src={item.image}
                    alt={`Experience ${item.id}`}
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </ScrollSlideIn>
            ))}
          </div>

          {/* Second Horizontal Image */}
          {displayHorizontalImages[1] && (
            <div className="space-y-4">
              <div className="w-full relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={displayHorizontalImages[1].image}
                  alt="Experience Centre"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '500px' }}
                />
              </div>
              <FadeInCaption>
                "{displayHorizontalImages[1].caption || 'Witness the intricate journey of stone transforming into spiritual art.'}"
              </FadeInCaption>
            </div>
          )}

          {/* Third Row - 4 Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 overflow-hidden p-2">
            {displayRegularImages.slice(8, 12).map((item, index) => (
              <ScrollSlideIn
                key={item.id}
                direction={index < 2 ? 'left' : 'right'}
                delay={index % 2 * 100}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <img
                    src={item.image}
                    alt={`Experience ${item.id}`}
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </ScrollSlideIn>
            ))}
          </div>

          {/* The Journey of Creation - Text Section */}
          <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-4">
              The Journey of Creation
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-10 uppercase tracking-[0.2em]">
              Welcome to Our Experience Center
            </h3>

            <div className="space-y-8 text-gray-700 leading-relaxed text-lg md:text-xl font-light whitespace-pre-line">
              <p className="max-w-4xl mx-auto">
                {displayJourneyText}
              </p>
            </div>

            {/* Elegant Divider */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <div className="h-[1px] w-12 bg-[#8B7355]/30"></div>
              <div className="w-2 h-2 rounded-full bg-[#8B7355]"></div>
              <div className="h-[1px] w-12 bg-[#8B7355]/30"></div>
            </div>
          </div>

          {/* Auto Stepping Circular Images - Soft & Smooth Version */}
          <div className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="relative w-full overflow-hidden">
                <div
                  className="flex gap-6 md:gap-8 lg:gap-10"
                  style={{
                    transform: `translateX(-${scrollIndex * (window.innerWidth < 768 ? 152 : 224)}px)`,
                    transition: scrollIndex === 0 ? 'none' : 'transform 1.5s cubic-bezier(0.45, 0, 0.05, 1)',
                    display: 'flex',
                    width: 'max-content'
                  }}
                >
                  {/* Triple images for flawless infinite look */}
                  {[...murtiCollections, ...murtiCollections, ...murtiCollections].map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="flex-shrink-0 group cursor-pointer"
                    >
                      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-4 border-white ring-2 ring-[#8B7355]/20">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Form fitted before last horizontal image */}
          <div className="max-w-4xl mx-auto py-8 md:py-12">
            <BookingForm />
          </div>

          {/* Third Horizontal Image */}
          {displayHorizontalImages[2] && (
            <div className="space-y-4">
              <div className="w-full relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={displayHorizontalImages[2].image}
                  alt="Experience Centre"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '500px' }}
                />
              </div>
              <FadeInCaption>
                "{displayHorizontalImages[2].caption || 'Experience the grandeur of timeless designs and unparalleled quality.'}"
              </FadeInCaption>
            </div>
          )}

          {/* Fourth Row - Additional Images */}
          {displayRegularImages.length > 12 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {displayRegularImages.slice(12, 16).map((item) => (
                <div key={item.id} className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <img
                    src={item.image}
                    alt={`Experience ${item.id}`}
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ExpertFormSection />
      <TrustedBySection />
      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default ExperienceCentrePage

