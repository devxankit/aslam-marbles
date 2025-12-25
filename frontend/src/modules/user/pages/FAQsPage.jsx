import { useState, useEffect } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import footerBackgroundImage from '../../../assets/footer page background/Beige Pink Elegant Watercolor Background Notes Planner.png'
import { indianLocations, internationalLocations, formatLocationName } from '../../../data/locations'
import { fetchFAQs, fetchAllFAQs } from '../../../utils/faqUtils'

const FAQsPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowProducts,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  const [selectedPage, setSelectedPage] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('Mumbai')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [displayFAQs, setDisplayFAQs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Get all locations for dropdown
  const allLocations = [
    ...indianLocations.map(loc => formatLocationName(loc.name)),
    ...internationalLocations.map(loc => loc.name)
  ]

  // Get page options for dropdown
  const pageOptions = [
    { key: 'all', name: 'All Pages' },
    { key: 'how-it-works', name: 'How It Works' },
    { key: 'murti', name: 'Murti' },
    { key: 'dream-temple', name: 'Dream Temple' },
    { key: 'ams-international', name: 'AMS International' },
    { key: 'location', name: 'Location' }
  ]

  // Load FAQs from backend when filter changes
  useEffect(() => {
    const loadFAQs = async () => {
      try {
        setLoading(true)
        setError('')
        let faqsData = []

        if (selectedPage === 'all') {
          faqsData = await fetchAllFAQs()
        } else if (selectedPage === 'location') {
          const data = await fetchFAQs('location', selectedLocation)
          faqsData = (data || []).map((faq) => ({
            ...faq,
            pageKey: 'location',
            pageName: `Location (${faq.location || selectedLocation})`
          }))
        } else {
          const data = await fetchFAQs(selectedPage)
          faqsData = (data || []).map((faq) => ({
            ...faq,
            pageKey: selectedPage,
            pageName: pageOptions.find((p) => p.key === selectedPage)?.name || selectedPage
          }))
        }

        setDisplayFAQs(faqsData)
      } catch (err) {
        console.error('Error loading FAQs:', err)
        setError('Failed to load FAQs. Please try again later.')
        setDisplayFAQs([])
      } finally {
        setLoading(false)
      }
    }

    loadFAQs()
  }, [selectedPage, selectedLocation])

  return (
    <div className="w-full min-h-screen bg-white">
      <Header
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowProducts={onShowProducts}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
        onShowLocation={onShowLocation}
        onShowBooking={onShowBooking}
      />

      {/* Main Content with Background Image */}
      <section
        className="w-full py-12 md:py-16 lg:py-20 px-8 md:px-12 lg:px-16 xl:px-20 relative pt-20 md:pt-12"
        style={{
          backgroundImage: `url(${footerBackgroundImage})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: 'calc(100vh - 200px)'
        }}
      >
        <div className="w-full relative z-10 max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-10 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic mb-4 tracking-wide font-bold">
              Frequently Asked Questions
            </h1>
            <div className="w-24 h-1 rounded-full mx-auto" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Filter Dropdown */}
          <div className="mb-8 md:mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-auto">
                <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                  Filter by Page:
                </label>
                <select
                  value={selectedPage}
                  onChange={(e) => {
                    setSelectedPage(e.target.value)
                    setExpandedFaq(null) // Reset expanded FAQ when changing page
                  }}
                  className="w-full md:w-64 px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] text-sm md:text-base bg-white shadow-sm"
                  style={{ color: '#333' }}
                >
                  {pageOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedPage === 'location' && (
                <div className="w-full md:w-auto">
                  <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                    Select Location:
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value)
                      setExpandedFaq(null) // Reset expanded FAQ when changing location
                    }}
                    className="w-full md:w-64 px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] text-sm md:text-base bg-white shadow-sm"
                    style={{ color: '#333' }}
                  >
                    {allLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="text-sm md:text-base text-gray-600">
              {loading
                ? 'Loading FAQs...'
                : `Showing ${displayFAQs.length} question${displayFAQs.length !== 1 ? 's' : ''}`}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* FAQs List */}
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-base md:text-lg">Loading FAQs...</p>
              </div>
            ) : displayFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-base md:text-lg">No FAQs found for the selected page.</p>
              </div>
            ) : (
              displayFAQs.map((faq, index) => {
                const key = `${faq.pageKey}-${faq._id || faq.id || index}`
                return (
                  <div
                    key={key}
                    className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#8B7355]"
                  >
                    <button
                      onClick={() =>
                        setExpandedFaq(expandedFaq === key ? null : key)
                      }
                      className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-base md:text-lg font-semibold text-gray-800 flex-shrink-0">
                          {index + 1}.
                        </span>
                        <div className="flex-1">
                          <span
                            className={`text-sm md:text-base font-medium flex-1 block ${expandedFaq === key ? 'text-[#8B7355]' : 'text-gray-800'
                              }`}
                          >
                            {faq.question}
                          </span>
                          {selectedPage === 'all' && faq.pageName && (
                            <span className="text-xs text-gray-500 mt-1 block">
                              From: {faq.pageName}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {expandedFaq === key ? (
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
                    {expandedFaq === key && faq.answer && (
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

      <TrustedBySection />
      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default FAQsPage

