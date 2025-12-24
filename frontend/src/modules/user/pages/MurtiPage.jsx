import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import { fetchFAQs } from '../../../utils/faqUtils'
import { murtiCollections } from '../../../data/murtiCollections'
import { ganeshaProducts } from '../../../data/ganeshaProducts'
import { hanumanProducts } from '../../../data/hanumanProducts'
import { radhaKrishnaProducts } from '../../../data/radhaKrishnaProducts'
import { ramDarbarProducts } from '../../../data/ramDarbarProducts'
import { saiBabaProducts } from '../../../data/saiBabaProducts'
import { vishnuLaxmiProducts } from '../../../data/vishnuLaxmiProducts'
import { durgaProducts } from '../../../data/durgaProducts'
import { saraswatiProducts } from '../../../data/saraswatiProducts'
import { shivParvatiProducts } from '../../../data/shivParvatiProducts'
import { furnitureData, homeDecorData, allFurnitureCategories, allHomeDecorCategories } from '../../../data/categoryImages'
import { Link } from 'react-router-dom'
import homeDecorHeading from '../../../assets/ourcreation/home decore/heading.png'

const MurtiPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking,
  onShowCart,
  onShowLikes
}) => {
  // Category state
  const [selectedCategory, setSelectedCategory] = useState('Ganesha')
  // const [selectedFurnitureCategory, setSelectedFurnitureCategory] = useState('Center Tables') // Removed local state
  // const [selectedHomeDecorCategory, setSelectedHomeDecorCategory] = useState('Lamps') // Removed local state
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [faqs, setFaqs] = useState([])
  const [loadingFAQs, setLoadingFAQs] = useState(true)
  const [categoryImagesFromBackend, setCategoryImagesFromBackend] = useState({})
  const [loading, setLoading] = useState(true)
  const [pageData, setPageData] = useState(null)
  const [hierarchy, setHierarchy] = useState([])

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  // Fetch Category Images from Backend
  useEffect(() => {
    const fetchCategoryImages = async () => {
      try {
        const res = await fetch(`${API_URL}/stone-products/categories`)
        if (res.ok) {
          const data = await res.json()
          const imageMap = {}
          data.forEach(cat => {
            if (cat.heroSection?.image?.url) {
              imageMap[cat.id] = cat.heroSection.image.url
            }
          })
          setCategoryImagesFromBackend(imageMap)
        }
      } catch (error) {
        console.error('Error fetching category images:', error)
      }
    }
    fetchCategoryImages()
  }, [])

  // Fetch all Murti data
  useEffect(() => {
    const fetchMurtiData = async () => {
      try {
        setLoading(true)
        const [pageRes, hierarchyRes] = await Promise.all([
          fetch(`${API_URL}/murtis/page`),
          fetch(`${API_URL}/murtis/hierarchy`)
        ])

        const pageResult = await pageRes.json()
        const hierarchyResult = await hierarchyRes.json()

        if (pageResult.success) setPageData(pageResult.data)
        if (hierarchyResult.success) setHierarchy(hierarchyResult.data)
      } catch (error) {
        console.error('Error fetching murti data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMurtiData()
  }, [])

  // Fetch FAQs from API
  useEffect(() => {
    const loadFAQs = async () => {
      try {
        setLoadingFAQs(true)
        const data = await fetchFAQs('murti')
        setFaqs(data || [])
      } catch (error) {
        console.error('Error loading FAQs:', error)
        setFaqs([])
      } finally {
        setLoadingFAQs(false)
      }
    }
    loadFAQs()
  }, [])

  const navigate = useNavigate()
  const location = useLocation()

  // Handle scroll to hash on load
  useEffect(() => {
    if (location.hash === '#shop-home-decor') {
      const element = document.getElementById('shop-home-decor-banner')
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location])

  // All categories combined
  const allCategories = ['Ganesha', 'Hanuman Ji', 'Radha Krishna', 'Ram Darbar', 'Sai Baba', 'Vishnu Laxmi', 'Durga', 'Saraswati', 'Shiv Parivar']

  // Category images mapping - get first product image from each category
  const categoryImages = {
    'Ganesha': ganeshaProducts[0]?.images[0] || '',
    'Hanuman Ji': hanumanProducts[0]?.images[0] || '',
    'Radha Krishna': radhaKrishnaProducts[0]?.images[0] || '',
    'Ram Darbar': ramDarbarProducts[0]?.images[0] || '',
    'Sai Baba': saiBabaProducts[0]?.images[0] || '',
    'Vishnu Laxmi': vishnuLaxmiProducts[0]?.images[0] || '',
    'Durga': durgaProducts[0]?.images[0] || '',
    'Saraswati': saraswatiProducts[0]?.images[0] || '',
    'Shiv Parivar': shivParvatiProducts[0]?.images[0] || ''
  }

  const handleCategoryClick = (category) => {
    navigate(`/murti/${category.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355]"></div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

      {/* Heading Image - Horizontal at Top */}
      <div className="relative w-full overflow-hidden" style={{ height: '350px' }}>
        <img
          src={pageData?.heroSection?.image?.url || 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1b?auto=format&fit=crop&q=80&w=2000'}
          alt="Murtis Heading"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-10 px-4">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white text-center mb-6 leading-tight drop-shadow-2xl max-w-5xl">
            {pageData?.heroSection?.title || 'Welcome to Aslam Marble Suppliers'}
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium mb-8 text-center drop-shadow-lg">
            {pageData?.heroSection?.subtitle}
          </p>
          <button
            onClick={() => {
              const shopSection = document.getElementById('shop-murtis-section')
              if (shopSection) {
                shopSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="px-8 md:px-12 py-4 text-lg font-bold text-white rounded-full transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-2xl backdrop-blur-sm border border-white/30"
            style={{ backgroundColor: '#8B7355' }}
          >
            Explore Collection
          </button>
        </div>
      </div>

      {/* Shop Murtis Section - Buttons & Cards style */}
      <div id="shop-murtis-section" className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic text-center mb-6 md:mb-8 font-bold">
            Shop Murtis
          </h1>

          {/* Category Navigation Buttons */}
          <div className="flex flex-nowrap items-center gap-4 md:gap-6 lg:gap-8 mb-4 overflow-x-auto scrollbar-hide px-4 md:justify-center">
            {hierarchy.flatMap(g => g.categories).map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={() => {
                  const element = document.getElementById(`murti-card-${category._id}`)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
                  }
                }}
                className="relative text-base md:text-lg lg:text-xl font-semibold transition-all duration-300 pb-3 px-2 text-black hover:text-[#8B7355] whitespace-nowrap flex-shrink-0"
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Divider Line */}
          <div className="w-full h-[1px] bg-gray-300 mt-0 mb-8"></div>

          {/* Category Cards (Horizontal Scroll) */}
          <div className="w-full py-6 md:py-8">
            <div className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {hierarchy.flatMap(g => g.categories).map((category) => (
                <div
                  key={category._id}
                  id={`murti-card-${category._id}`}
                  onClick={() => handleCategoryClick(category)}
                  className="flex-shrink-0 group cursor-pointer relative snap-center"
                >
                  <div className="relative w-32 h-48 md:w-40 md:h-60 lg:w-48 lg:h-72 overflow-hidden border border-gray-300 hover:border-[#8B7355] transition-all duration-300 rounded-lg">
                    <img
                      src={category.heroSection?.image?.url || 'https://via.placeholder.com/300x500'}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Category Name Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="text-white text-xs md:text-sm font-semibold p-2 w-full text-center uppercase tracking-wider">
                        {category.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shop Home Decor Banner Section */}
      <div id="shop-home-decor-banner" className="relative w-full overflow-hidden mb-8" style={{ height: '250px' }}>
        <img
          src={homeDecorHeading}
          alt="Home Decor Heading"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        {/* Text and Button Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <button
            onClick={() => {
              const decorSection = document.getElementById('shop-home-decor-section')
              if (decorSection) {
                decorSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="px-6 md:px-8 lg:px-10 py-3 md:py-4 text-base md:text-lg lg:text-xl font-semibold text-white rounded-lg transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#8B7355' }}
          >
            Shop Home Decor
          </button>
        </div>
      </div>

      {/* Shop Furniture Section */}
      <div className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic text-center mb-6 md:mb-8 font-bold">
            Shop Furniture
          </h1>

          {/* Category Navigation Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 mb-4">
            {allFurnitureCategories.map((category) => (
              <button
                key={category}
                onClick={() => navigate(`/furniture/${category.toLowerCase().replace(/\s+/g, '-')}`)}
                className="relative text-base md:text-lg lg:text-xl font-semibold transition-all duration-300 pb-3 px-2 text-black hover:text-[#8B7355]"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Divider Line */}
          <div className="w-full h-[1px] bg-gray-300 mt-0 mb-8"></div>

          {/* Category Cards (Horizontal Scroll) */}
          <div className="w-full py-6 md:py-8">
            <div className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 scrollbar-hide">
              {allFurnitureCategories.map((category) => {
                const coverImage = furnitureData[category]?.[0] || murtiCollections[0]?.image; // Fallback
                return (
                  <div
                    key={category}
                    onClick={() => navigate(`/furniture/${category.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="flex-shrink-0 group cursor-pointer relative"
                  >
                    <div className="relative w-32 h-48 md:w-40 md:h-60 lg:w-48 lg:h-72 overflow-hidden border border-gray-300 hover:border-[#8B7355] transition-all duration-300">
                      <img
                        src={coverImage}
                        alt={category}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Category Name Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white text-xs md:text-sm font-semibold p-2 w-full text-center uppercase">
                          {category}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Shop Home Decor Section */}
      <div id="shop-home-decor-section" className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic text-center mb-6 md:mb-8 font-bold">
            Shop Home Decor
          </h1>

          {/* Category Navigation Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 mb-4">
            {allHomeDecorCategories.map((category) => (
              <button
                key={category}
                onClick={() => navigate(`/home-decor/${category.toLowerCase().replace(/\s+/g, '-')}`)}
                className="relative text-base md:text-lg lg:text-xl font-semibold transition-all duration-300 pb-3 px-2 text-black hover:text-[#8B7355]"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Divider Line */}
          <div className="w-full h-[1px] bg-gray-300 mt-0 mb-8"></div>

          {/* Category Cards (Horizontal Scroll) */}
          <div className="w-full py-6 md:py-8">
            <div className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 scrollbar-hide">
              {allHomeDecorCategories.map((category) => {
                const coverImage = homeDecorData[category]?.[0] || murtiCollections[0]?.image; // Fallback
                return (
                  <div
                    key={category}
                    onClick={() => navigate(`/home-decor/${category.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="flex-shrink-0 group cursor-pointer relative"
                  >
                    <div className="relative w-32 h-48 md:w-40 md:h-60 lg:w-48 lg:h-72 overflow-hidden border border-gray-300 hover:border-[#8B7355] transition-all duration-300">
                      <img
                        src={coverImage}
                        alt={category}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Category Name Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white text-xs md:text-sm font-semibold p-2 w-full text-center uppercase">
                          {category}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic text-center mb-4 md:mb-6 font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 text-sm md:text-base">
            Here are some of the most common questions we get asked.
          </p>

          <div className="space-y-4">
            {loadingFAQs ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-base md:text-lg">Loading FAQs...</p>
              </div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-base md:text-lg">No FAQs available at the moment.</p>
              </div>
            ) : (
              faqs.map((faq, index) => {
                const faqId = faq._id || faq.id || index
                const isExpanded = expandedFaq === faqId
                return (
                  <div key={faqId} className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-base md:text-lg font-semibold text-gray-800 flex-shrink-0">
                          Q.{index + 1}
                        </span>
                        <span className={`text-sm md:text-base font-medium flex-1 ${isExpanded ? 'text-[#8B7355]' : 'text-gray-800'}`}>
                          {faq.question}
                        </span>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {isExpanded ? (
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </div>
                    </button>
                    {isExpanded && faq.answer && (
                      <div className="px-5 pb-4 pt-0">
                        <div className="pl-8 border-l-2 border-gray-300">
                          <div
                            className="text-sm md:text-base text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Circular Image Cards - Auto Scrolling */}
      < section className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8 bg-white" >
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-6 md:gap-8 lg:gap-10 animate-scroll-right-to-left">
              {/* Duplicate items for seamless loop */}
              {[...murtiCollections, ...murtiCollections].map((collection, index) => (
                <div
                  key={`${collection.id}-${index}`}
                  onClick={() => handleCollectionClick(collection.id)}
                  className="flex-shrink-0 group cursor-pointer"
                >
                  {/* Circular Image Card */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section >

      <TrustedBySection />
      <Footer />
      <FloatingButtons />
    </div >
  )
}

export default MurtiPage

