import { useState, useEffect } from 'react'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import { fetchFAQs } from '../../../utils/faqUtils'
import dreamTemple1 from '../../../assets/locationicons/templecardimages/dreams1.jpeg'
import dreamTemple2 from '../../../assets/locationicons/templecardimages/dreams2.jpeg'
import dreamTemple3 from '../../../assets/locationicons/templecardimages/dreams3.jpeg'
import dreamTemple4 from '../../../assets/locationicons/templecardimages/dreams4.jpeg'
import templeHeroImage from '../../../assets/house of marble/temple/1733300646054.jpeg'
import step1Gif from '../../../assets/how it work/5stepvideo/image1.gif'
import step2Gif from '../../../assets/how it work/5stepvideo/image2.gif'
import step3Gif from '../../../assets/how it work/5stepvideo/image3.gif'
import step4Gif from '../../../assets/how it work/5stepvideo/image4.gif'
import step5Gif from '../../../assets/how it work/5stepvideo/image5.gif'

import ExpertFormOverlay from '../../../components/common/ExpertFormOverlay'

const DreamTemplePage = ({ onShowCart, onShowLikes }) => {
  const [selectedProcessStep, setSelectedProcessStep] = useState(1)
  const [showMobileForm, setShowMobileForm] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [faqs, setFaqs] = useState([])
  const [loadingFAQs, setLoadingFAQs] = useState(true)
  const [pageData, setPageData] = useState(null)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  // Fetch FAQs from API
  useEffect(() => {
    const loadFAQs = async () => {
      try {
        setLoadingFAQs(true)
        const data = await fetchFAQs('dream-temple')
        setFaqs(data || [])
      } catch (error) {
        console.error('Error loading FAQs:', error)
        setFaqs([])
      } finally {
        setLoadingFAQs(false)
      }
    }
    const fetchPageData = async () => {
      try {
        const res = await fetch(`${API_URL}/dream-temple`)
        if (res.ok) {
          const data = await res.json()
          setPageData(data)
        }
      } catch (error) {
        console.error('Error fetching dream temple data:', error)
      }
    }
    loadFAQs()
    fetchPageData()
  }, [API_URL])

  const temples = pageData?.collection?.length > 0 ? pageData.collection.map((item, index) => ({
    id: index + 1,
    image: item.image?.url || [dreamTemple1, dreamTemple2, dreamTemple3, dreamTemple4][index],
    size: item.size,
    price: item.price,
    fullPrice: item.fullPrice,
    description: item.description
  })) : [
    {
      id: 1,
      image: dreamTemple1,
      size: '3ft Wide',
      price: '2.85L',
      fullPrice: 285000,
      description: '3ft Wide Temples'
    },
    {
      id: 2,
      image: dreamTemple2,
      size: '4ft Wide',
      price: '4.95L',
      fullPrice: 495000,
      description: '4ft Wide Temples'
    },
    {
      id: 3,
      image: dreamTemple3,
      size: '5ft Wide',
      price: '6.95L',
      fullPrice: 695000,
      description: '5ft Wide Temples'
    },
    {
      id: 4,
      image: dreamTemple4,
      size: '6ft Wide &',
      price: '8.95L',
      fullPrice: 895000,
      description: '6ft Wide & Above Temples'
    }
  ]

  return (
    <div className="w-full min-h-screen bg-white">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

      {/* Hero Image Container with Form Overlay */}
      <div className="relative w-full overflow-hidden h-[40vh] min-h-[300px] md:h-[75vh] md:min-h-[600px]">
        {/* Background Image */}
        <img
          src={pageData?.heroSection?.image?.url || templeHeroImage}
          alt={pageData?.heroSection?.image?.alt || "Dream Temple Background"}
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>

        {/* Hero Text Overlay - Left Side */}
        <div className="absolute top-10 md:top-24 lg:top-32 left-4 md:left-6 lg:left-8 xl:left-12 z-10 max-w-[60%] md:max-w-2xl">
          <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight uppercase tracking-wide drop-shadow-lg">
            {pageData?.heroSection?.title || 'DREAM TEMPLES'}
          </h1>
          <p className="text-xs md:text-base lg:text-lg text-white font-light mb-1.5 md:mb-2 drop-shadow-md">
            {pageData?.heroSection?.subtitle || 'Where Divine Aspirations Meet Artisanal Reality'}
          </p>
          <div className="w-12 md:w-20 h-0.5 md:h-1 bg-white/80 mb-2 md:mb-6 rounded-full hidden sm:block"></div>
          <p className="text-[10px] md:text-sm text-white/90 font-light leading-relaxed drop-shadow-md hidden sm:block">
            {pageData?.heroSection?.description || 'Your vision of a perfect sanctuary, brought to life with precision, passion, and premium marble craftsmanship.'}
          </p>

          <button
            onClick={() => setShowMobileForm(true)}
            className="md:hidden mt-4 bg-[#8B7355] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg border border-[#8B7355]/50 animate-pulse hover:animate-none"
          >
            Talk to Our Expert
          </button>
        </div>

        {/* Form Container - Overlay on Right Side, Fits Image Height */}
        <ExpertFormOverlay className="hidden md:flex absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 w-[85%] sm:w-[320px] md:w-[340px] max-w-[calc(100%-32px)] bg-white rounded-xl md:rounded-2xl shadow-2xl z-20 flex-col backdrop-blur-sm bg-white/95 scale-90 md:scale-100 origin-right" />
      </div>

      {/* Temples Grid Section */}
      <section className="w-full py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-[#fdfaf5]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-20">
            <span className="text-[#8B7355] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              {pageData?.collectionSection?.subtitle || 'Artisanal Excellence'}
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-6 tracking-tight">
              {pageData?.collectionSection?.title || 'Our Dream Temple Collection'}
            </h2>
            <div className="w-20 h-1 bg-[#8B7355]/30 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              {pageData?.collectionSection?.description || 'Transform your sacred space with our meticulously crafted marble temples, designed to bring peace and divinity into your home.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
            {temples.map((temple) => (
              <div
                key={temple.id}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(139,115,85,0.15)] transform hover:-translate-y-3"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <img
                    src={temple.image}
                    alt={temple.description}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />

                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

                  {/* Subtle Top Gradient */}
                  <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/40 to-transparent"></div>

                  {/* Elegant Price Badge - Slides in from left on hover */}
                  <div className="absolute top-10 left-0 overflow-hidden pointer-events-none">
                    <div className="bg-[#8B7355] text-white px-6 py-2 shadow-2xl transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out">
                      <span className="text-xs font-bold tracking-widest uppercase">INR {temple.price}</span>
                    </div>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-4 md:p-6 bg-white text-center border-t border-gray-50 flex flex-col h-full">
                  <p className="text-[#8B7355] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Starting at {temple.price}</p>
                  <h3 className="text-lg md:text-xl font-serif text-gray-800 italic mb-4 group-hover:text-[#8B7355] transition-colors duration-300">
                    {temple.description}
                  </h3>
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Navigate to a dynamic product page or checkout
                        navigate('/checkout', {
                          state: {
                            items: [{
                              id: `temple-${temple.id}`,
                              name: temple.description,
                              image: temple.image,
                              price: temple.fullPrice || 250000,
                              quantity: 1,
                              size: temple.size
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
                        // For temples we might just show expert form or a detail page
                        setShowMobileForm(true);
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

      {/* THE AMS DIFFERENCE Comparison Table Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-4 md:mb-5 tracking-wide">
              The AMS Difference
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover why thousands choose us for their sacred space design
            </p>
            <div className="w-24 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-transform duration-300 min-w-full">
              <thead>
                <tr>
                  <th className="px-2 py-3 md:px-3 md:py-3 text-left text-xs md:text-sm font-bold text-gray-800 uppercase border border-gray-200 bg-gray-50">
                    Feature
                  </th>
                  <th
                    className="px-2 py-3 md:px-3 md:py-3 text-center text-xs md:text-sm font-bold text-white uppercase border border-gray-200"
                    style={{ backgroundColor: '#8B7355' }}
                  >
                    Aslam Marble Suppliers
                  </th>
                  <th className="px-2 py-3 md:px-3 md:py-3 text-center text-xs md:text-sm font-bold text-gray-800 uppercase border border-gray-200 bg-gray-50">
                    Local Vendors
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1: Artisanal Expertise */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    Artisanal Expertise
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#8B7355' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>25+ Years Experience</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>May Vary</span>
                    </div>
                  </td>
                </tr>

                {/* Row 2: Customized Design */}
                <tr className="hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#f9f9f9' }}>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    Customized Design
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#8B7355' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Tradition & Modernity</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Limited Options</span>
                    </div>
                  </td>
                </tr>

                {/* Row 3: Durability and Quality */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    Durability and Quality
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#8B7355' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Assured</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Questionable</span>
                    </div>
                  </td>
                </tr>

                {/* Row 4: Established Trust */}
                <tr className="hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#f9f9f9' }}>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    Established Trust
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#8B7355' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Proven Reliability</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Uncertain</span>
                    </div>
                  </td>
                </tr>

                {/* Row 5: End to End Support */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    End to End Support
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#8B7355' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>From Design to Installation</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Limited</span>
                    </div>
                  </td>
                </tr>

                {/* Row 6: Marble Expertise */}
                <tr className="hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#f9f9f9' }}>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    Marble Expertise
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#8B7355' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Specialized Knowledge</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>General Know-how</span>
                    </div>
                  </td>
                </tr>

                {/* Row 7: Global Standards Compliance */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-800 border border-gray-200 font-medium">
                    Global Standards Compliance
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#8B7355' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>International Quality</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm text-gray-700 border border-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Unverified</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Design Your Pooja Room in 5 Steps Section */}
      <ProcessStepsSection selectedStep={selectedProcessStep} onStepChange={setSelectedProcessStep} dynamicSteps={pageData?.processSteps} />

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic text-center mb-8 md:mb-12 font-bold">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {loadingFAQs ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-[#8B7355] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600 text-base md:text-lg">Loading FAQs...</p>
                </div>
              </div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 text-base md:text-lg">No FAQs available at the moment.</p>
              </div>
            ) : (
              faqs.map((faq, index) => {
                const faqId = faq._id || faq.id || index
                const isExpanded = expandedFaq === faqId
                return (
                  <div
                    key={faqId}
                    className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-300 ${isExpanded ? 'border-[#8B7355] shadow-md ring-1 ring-[#8B7355]/20' : 'border-gray-100 hover:shadow-md hover:border-gray-200'}`}
                  >
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                      className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 md:gap-4 flex-1">
                        <span className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-sm md:text-base font-bold flex-shrink-0 transition-colors ${isExpanded ? 'bg-[#8B7355] text-white' : 'bg-[#8B7355]/10 text-[#8B7355] group-hover:bg-[#8B7355]/20'}`}>
                          {index + 1}
                        </span>
                        <span className={`text-sm md:text-base font-medium flex-1 transition-colors ${isExpanded ? 'text-[#8B7355]' : 'text-gray-800 group-hover:text-[#8B7355]'}`}>
                          {faq.question}
                        </span>
                      </div>
                      <div className={`flex-shrink-0 ml-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isExpanded ? 'bg-[#8B7355] rotate-180' : 'bg-gray-100 group-hover:bg-[#8B7355]/10'}`}>
                        <svg className={`w-4 h-4 transition-colors ${isExpanded ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      {faq.answer && (
                        <div className="px-5 md:px-6 pb-5 md:pb-6">
                          <div className="pl-11 md:pl-14 border-l-2 border-[#8B7355]/30">
                            <div
                              className="text-sm md:text-base text-gray-600 leading-relaxed prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
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
            <ExpertFormOverlay className="w-full flex flex-col max-h-[85vh]" />
          </div>
        </div>
      )}

      <Footer />
      <FloatingButtons />
    </div>
  )
}

const ProcessStepsSection = ({ selectedStep, onStepChange, dynamicSteps }) => {
  const defaultSteps = [
    {
      id: 1,
      title: "LET'S CONNECTED ONE ON ONE",
      description: "This is the first step where we connect with you one on one to understand your requirements and preferences.",
      gif: step1Gif
    },
    {
      id: 2,
      title: "START WITH YOUR DESIGN",
      description: "In this step, we collaborate with you to create a design that meets your vision and requirements.",
      gif: step2Gif
    },
    {
      id: 3,
      title: "PLACE THE ORDER",
      description: "Once the design is finalized, you can place the order for your customized pooja room.",
      gif: step3Gif
    },
    {
      id: 4,
      title: "APPROVAL",
      description: "Before proceeding, we ensure that everything is approved by you to meet your expectations.",
      gif: step4Gif
    },
    {
      id: 5,
      title: "DELIVERY & INSTALLATION",
      description: "Finally, we deliver and install your pooja room at your desired location.",
      gif: step5Gif
    }
  ]

  const steps = dynamicSteps?.length >= 5 ? dynamicSteps.map(s => ({
    id: s.id,
    title: s.title,
    description: s.description,
    gif: s.gif?.url || [step1Gif, step2Gif, step3Gif, step4Gif, step5Gif][s.id - 1]
  })) : defaultSteps

  return (
    <section className="w-full py-8 md:py-16 lg:py-32 px-4 md:px-8 bg-white relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-10 left-10 text-[10rem] font-serif font-black text-gray-50 opacity-40 select-none pointer-events-none hidden lg:block uppercase tracking-tighter">
        Process
      </div>
      <div className="absolute bottom-10 right-10 text-[10rem] font-serif font-black text-gray-50 opacity-40 select-none pointer-events-none hidden lg:block uppercase tracking-tighter">
        Journey
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[#8B7355] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Method</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 relative inline-block">
            Design Your Pooja Room <span className="italic text-[#8B7355]">In 5 Steps</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A masterfully curated journey from initial configuration to final installation, ensuring every detail reflects your spiritual essence.
          </p>
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-12 h-[1px] bg-[#8B7355]/40 mt-3"></div>
            <div className="w-3 h-3 rounded-full border border-[#8B7355] animate-pulse"></div>
            <div className="w-12 h-[1px] bg-[#8B7355]/40 mt-3"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 lg:gap-20 items-stretch">
          {/* Step Navigation Sidebar */}
          <div className="lg:col-span-12 xl:col-span-5 relative space-y-4">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={`relative cursor-pointer group transition-all duration-500 rounded-2xl p-4 md:p-6 ${selectedStep === step.id
                  ? 'bg-[#8B7355]/5 border border-[#8B7355]/10 shadow-[0_20px_40px_rgba(139,115,85,0.05)]'
                  : 'bg-transparent border border-transparent hover:bg-gray-50'
                  }`}
                onClick={() => onStepChange(step.id)}
              >
                <div className="flex items-center gap-6">
                  {/* Step Number with Animated Ring */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-serif text-lg md:text-xl font-bold transition-all duration-500 ${selectedStep === step.id
                      ? 'bg-[#8B7355] text-white shadow-xl scale-110'
                      : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
                      }`}>
                      {step.id}
                    </div>
                    {selectedStep === step.id && (
                      <div className="absolute -inset-2 border border-[#8B7355]/30 rounded-full animate-ping pointer-events-none"></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className={`text-sm md:text-base font-bold tracking-widest uppercase transition-colors duration-300 ${selectedStep === step.id ? 'text-[#8B7355]' : 'text-gray-400 font-medium'
                      }`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs mt-1 transition-opacity duration-500 overflow-hidden ${selectedStep === step.id ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
                      } text-gray-500 leading-relaxed italic`}>
                      Click to visualize the design transformation

                    </p>
                  </div>
                </div>

                {/* Connector Path (Hidden on last step) */}
                {
                  idx < steps.length - 1 && (
                    <div className="absolute left-9 md:left-[3.25rem] -bottom-3 w-px h-6 border-l border-dashed border-[#8B7355]/30 hidden md:block xl:block"></div>
                  )
                }
              </div>
            ))}
          </div>

          {/* Interactive Showcase Card */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="bg-white rounded-[2rem] p-1 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-100 h-full overflow-hidden flex flex-col">
              <div className="p-4 md:p-8 lg:p-12 flex-1 flex flex-col space-y-4 md:space-y-8 bg-gradient-to-br from-white to-gray-50/50">
                {/* Header Information */}
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <span className="text-[#8B7355] font-serif text-3xl italic">0{selectedStep}</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#8B7355]/40 to-transparent"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-gray-900 italic font-bold leading-tight">
                    {steps.find(s => s.id === selectedStep)?.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">
                    {steps.find(s => s.id === selectedStep)?.description}
                  </p>
                </div>

                {/* Glassmorphism Guidance Box */}
                <div className="bg-[#8B7355]/5 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-[#8B7355]/10 animate-fadeInUp">
                  <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      "Our team of master artisans ensures this stage is executed with absolute precision, honoring both traditional Vastu and modern ergonomics."
                    </p>
                  </div>
                </div>

                {/* Enhanced Visual Compartment */}
                <div className="flex-1 flex flex-col justify-end pt-4">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#1a1a1a] border-4 md:border-[12px] border-white group/canvas h-[220px] sm:h-[280px] md:h-[350px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-700"></div>
                    <img
                      key={selectedStep}
                      src={steps.find(s => s.id === selectedStep)?.gif}
                      alt={steps.find(s => s.id === selectedStep)?.title}
                      className="w-full h-full object-contain transform transition-all duration-1000 group-hover/canvas:scale-110 animate-fadeIn"
                    />

                    {/* Control Overlay */}
                    <div className="absolute bottom-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none opacity-0 group-hover/canvas:opacity-100 translate-y-4 group-hover/canvas:translate-y-0 transition-all duration-500">
                      <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-lg shadow-lg">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#8B7355]">Step {selectedStep} Interactive Walkthrough</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/50"></div>
                        <div className="w-2 h-2 rounded-full bg-[#8B7355]"></div>
                        <div className="w-2 h-2 rounded-full bg-white/50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default DreamTemplePage
