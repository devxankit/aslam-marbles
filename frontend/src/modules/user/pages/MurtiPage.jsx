import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../../../components/layout/Header'
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
import { krishnaProducts } from '../../../data/krishnaProducts'
import { furnitureData, homeDecorData, allFurnitureCategories, allHomeDecorCategories } from '../../../data/categoryImages'
import { Link } from 'react-router-dom'
import homeDecorHeading from '../../../assets/ourcreation/home decore/heading.png'

const MurtiPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowProducts,
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

        const fetchedHierarchy = hierarchyResult.success ? hierarchyResult.data : []

        if (fetchedHierarchy.length === 0) {
          // Comprehensive Fallback Hierarchy
          const fallbackHierarchy = [
            {
              name: 'Sacred Gods',
              categories: [
                { id: 'ganesha', _id: 'ganesha', name: 'Ganesha' },
                { id: 'hanuman', _id: 'hanuman', name: 'Hanuman ji' },
                { id: 'krishna-ji', _id: 'krishna-ji', name: 'Krishna ji' },
                { id: 'shiva', _id: 'shiva', name: 'Shiva' },
                { id: 'buddha', _id: 'buddha', name: 'Buddha' },
                { id: 'sai-baba', _id: 'sai-baba', name: 'Sai Baba' },
                { id: 'balaji', _id: 'balaji', name: 'Balaji' },
                { id: 'nandi', _id: 'nandi', name: 'Nandi' },
                { id: 'jain-gods', _id: 'jain-gods', name: 'Jain Gods' }
              ]
            },
            {
              name: 'Divine Goddesses',
              categories: [
                { id: 'durga', _id: 'durga', name: 'Durga' },
                { id: 'laxmi', _id: 'laxmi', name: 'Laxmi' },
                { id: 'saraswati', _id: 'saraswati', name: 'Saraswati' },
                { id: 'radha', _id: 'radha', name: 'Radha' }
              ]
            },
            {
              name: 'Ethereal Pairs',
              categories: [
                { id: 'ram-darbar', _id: 'ram-darbar', name: 'Ram Darbar' },
                { id: 'shiv-parivar', _id: 'shiv-parivar', name: 'Shiv Parivar' },
                { id: 'radha-krishna', _id: 'radha-krishna', name: 'Radha Krishna' },
                { id: 'vishnu-laxmi', _id: 'vishnu-laxmi', name: 'Vishnu Laxmi' }
              ]
            }
          ]
          setHierarchy(fallbackHierarchy)
        } else {
          setHierarchy(fetchedHierarchy)
        }
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
    'Krishna ji': krishnaProducts[0]?.images[0] || '',
    'Krishna': krishnaProducts[0]?.images[0] || '',
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

      {/* Hero Section - Simple & Elegant */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden bg-white">
        <img
          src={pageData?.heroSection?.image?.url || 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1b?auto=format&fit=crop&q=80&w=2000'}
          alt="Divine Collection"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 bg-white/10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">
              {pageData?.heroSection?.title || 'Heritage Murti Collection'}
            </h1>
            <p className="text-gray-600 text-sm md:text-lg font-light tracking-widest uppercase">
              {pageData?.heroSection?.subtitle || 'Sacred Marble Artistry'}
            </p>
            <div className="w-12 h-[1px] bg-gray-300 mx-auto mt-8"></div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div id="shop-murtis-section" className="w-full py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Sequential 'Shop' Sections */}
          {[
            {
              title: 'Sacred Gods',
              id: 'section-GODS',
              items: ['Krishna ji', 'Natraja', 'Shiva', 'Ganesha', 'Buddha', 'Sai Baba', 'Balaji', 'Hanuman ji', 'Vishnu ji', 'Jain Gods', 'Laddu Gopal']
            },
            {
              title: 'Divine Goddesses',
              id: 'section-GODDESSES',
              items: ['Durga', 'Kali', 'Laxmi', 'Saraswati', 'Radha']
            },
            {
              title: 'Ethereal Pairs',
              id: 'section-PAIRS',
              items: ['Ram Darbar', 'Shiv Parivar', 'Ganesh Laxmi', 'Ganesh Laxmi Saraswati', 'Radha Krishna', 'Vishnu Laxmi', 'Jugal Jodi']
            },
            {
              title: 'Sacred & Holy Elements',
              id: 'section-HOLY-COW',
              items: ['NANDI', 'Tulsi Gamla', 'Ghamla']
            }
          ].map((group) => (
            <div key={group.title} id={group.id} className="mb-24 scroll-mt-28">
              {/* Simple Heading */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 italic font-normal mb-2">
                  {group.title}
                </h2>
                <div className="w-8 h-[1px] bg-[#8B7355] mx-auto opacity-30"></div>
              </div>

              {/* Minimal Category Grid/Links */}
              <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-12">
                {group.items.map((itemName) => {
                  const matchingCategory = hierarchy
                    .flatMap(g => g.categories)
                    .find(cat => cat.name.toLowerCase() === itemName.toLowerCase());

                  return (
                    <button
                      key={itemName}
                      onClick={() => matchingCategory && handleCategoryClick(matchingCategory)}
                      className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest"
                    >
                      {itemName}
                    </button>
                  );
                })}
              </div>

              {/* Simple Horizontal Card Scroll */}
              <div className="w-full relative">
                <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory px-4">
                  {hierarchy.flatMap(g => g.categories)
                    .filter(cat => group.items.map(name => name.toLowerCase()).includes(cat.name.toLowerCase()))
                    .map((category) => (
                      <div
                        key={category._id}
                        onClick={() => handleCategoryClick(category)}
                        className="flex-shrink-0 cursor-pointer snap-center"
                      >
                        <div className="relative w-48 h-64 md:w-64 md:h-80 overflow-hidden bg-gray-50 border border-gray-100 group transition-all duration-300">
                          <img
                            src={category.heroSection?.image?.url || 'https://via.placeholder.com/300x500'}
                            alt={category.name}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                        <p className="mt-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center group-hover:text-gray-900 transition-colors">
                          {category.name}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Transition Banner */}
      <div id="shop-home-decor-banner" className="w-full h-[300px] flex items-center justify-center bg-gray-50 border-y border-gray-100">
        <div className="text-center px-6">
          <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">Home Decor & Accents</h3>
          <button
            onClick={() => {
              const decorSection = document.getElementById('shop-home-decor-section')
              if (decorSection) {
                decorSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="px-10 py-3 border border-gray-900 text-gray-900 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            Explore Decor
          </button>
        </div>
      </div>

      {/* Simplified Sections for Furniture and Home Decor */}
      <div className="w-full bg-white space-y-32 py-24">
        {/* Furniture Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Furniture</h2>
            <div className="w-8 h-[1px] bg-gray-300 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {allFurnitureCategories.map((category) => {
              const coverImage = furnitureData[category]?.[0] || murtiCollections[0]?.image;
              return (
                <div key={category} onClick={() => navigate(`/furniture/${category.toLowerCase().replace(/\s+/g, '-')}`)} className="cursor-pointer group">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-50 mb-4">
                    <img src={coverImage} alt={category} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h4 className="text-gray-900 text-sm font-medium uppercase tracking-widest text-center">{category}</h4>
                </div>
              )
            })}
          </div>
        </div>

        {/* Home Decor Section */}
        <div id="shop-home-decor-section" className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Home Decor</h2>
            <div className="w-8 h-[1px] bg-gray-300 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {allHomeDecorCategories.map((category) => {
              const coverImage = homeDecorData[category]?.[0] || murtiCollections[0]?.image;
              return (
                <div key={category} onClick={() => navigate(`/home-decor/${category.toLowerCase().replace(/\s+/g, '-')}`)} className="cursor-pointer group">
                  <div className="aspect-square overflow-hidden bg-gray-50 mb-4 rounded-full border border-gray-100 p-1">
                    <img src={coverImage} alt={category} className="w-full h-full object-cover rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h4 className="text-gray-900 text-[10px] font-bold uppercase tracking-widest text-center">{category}</h4>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* FAQ Section - Matched to Location Page style */}
      <section className="w-full py-20 md:py-24 px-4 md:px-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="w-12 h-[1px] bg-[#8B7355] mx-auto opacity-30"></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {loadingFAQs ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-[#8B7355] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600 text-sm md:text-base">Loading FAQs...</p>
                </div>
              </div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm md:text-base">No FAQs available at the moment.</p>
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
                              className="text-sm md:text-base text-gray-600 leading-relaxed max-w-none italic"
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

      <TrustedBySection />
      <Footer />
      <FloatingButtons />
    </div >
  )
}

export default MurtiPage

