import { useState, useEffect } from 'react'
import Header from '../../../components/layout/Header'
import FloatingButtons from '../../../components/common/FloatingButtons'

import { formatLocationName, indianLocations } from '../../../data/locations'
import { fetchFAQs } from '../../../utils/faqUtils'
import { dreamTemples } from '../../../data/dreamTemples'

import templedesignImg from '../../../assets/locationicons/middlecard/templedesign.png'
import marblecuttingImg from '../../../assets/locationicons/middlecard/marblecutting.png'
import settingImg from '../../../assets/locationicons/middlecard/setting.png'

const LocationDetailPage = ({
  location,
  onBack,
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  const [selectedProcessStep, setSelectedProcessStep] = useState(1)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [faqs, setFaqs] = useState([])
  const [loadingFAQs, setLoadingFAQs] = useState(true)

  // Check if location is Indian or International
  const isIndianLocation = indianLocations.some(
    loc => loc.name.toUpperCase() === location.toUpperCase()
  )

  // Fetch FAQs from API
  useEffect(() => {
    if (!isIndianLocation) {
      setLoadingFAQs(false)
      return
    }

    const loadFAQs = async () => {
      try {
        setLoadingFAQs(true)
        const formattedLocation = formatLocationName(location)
        const data = await fetchFAQs('location', formattedLocation)
        setFaqs(data || [])
      } catch (error) {
        console.error('Error loading FAQs:', error)
        setFaqs([])
      } finally {
        setLoadingFAQs(false)
      }
    }
    loadFAQs()
  }, [location, isIndianLocation])

  return (
    <div className="w-full min-h-screen relative bg-white">
      <Header
        variant="locationDetail"
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
      />



      {/* WE TAKE CARE OF EVERYTHING Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-8 bg-[#fffbf0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
              WE TAKE CARE OF EVERYTHING - FROM DESIGN TO INSTALLATION
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Our Pooja Room Experts in {location.toLowerCase()} will make the journey hassle-free
            </p>
          </div>

          <div className="text-center mb-8 md:mb-12">
            <p className="text-lg md:text-xl text-gray-700">
              We turn your vision into reality — premium Pooja Room solutions available in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 md:h-80 overflow-hidden group">
                <img
                  src={templedesignImg}
                  alt="We Design"
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:-translate-y-4"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">WE DESIGN</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Design and visualize your pooja room with our expert designers to bring your dream space to life.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 md:h-80 overflow-hidden group">
                <img
                  src={marblecuttingImg}
                  alt="We Create"
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:-translate-y-4"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">WE CREATE</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Build your Pooja Room with precision craftmanship, using the finest materials for a lasting sacred space.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 md:h-80 overflow-hidden group">
                <img
                  src={settingImg}
                  alt="We Install"
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:-translate-y-4"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">WE INSTALL</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Seamlessly deliver and install your Pooja Room, ensuring a hassle-free and divine experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Steps Process Section */}
      <ProcessStepsSection selectedStep={selectedProcessStep} onStepChange={setSelectedProcessStep} />

      {/* Dream Temples Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
              OUR RANGE OF DREAM TEMPLES IN {location.toUpperCase()}
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Transform your space with our exquisite Dream Temples, thoughtfully designed to suit every style and budget.
            </p>
          </div>

          <div className="text-center mb-8 md:mb-12">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Experience spiritual elegance with Dream Temples in your location.<br />
              We craft spaces that radiate peace and positivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {dreamTemples.map((temple) => (
              <div key={temple.id} className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <img
                    src={temple.image}
                    alt={temple.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded shadow-md z-10">
                    <span className="text-sm font-bold text-gray-800">{temple.price}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-semibold text-base">{temple.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Only show for Indian locations */}
      {isIndianLocation && (
        <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 md:mb-12 uppercase">
              FAQS ABOUT OUR PREMIUM MARBLE TEMPLES AND POOJA ROOMS IN {location.toUpperCase()}
            </h2>

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
                    <div
                      key={faqId}
                      className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-base md:text-lg font-semibold text-gray-800 flex-shrink-0">
                            Q.{index + 1}
                          </span>
                          <span className={`text-sm md:text-base font-medium flex-1 ${isExpanded ? 'text-amber-600' : 'text-gray-800'}`}>
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
      )}

      <FloatingButtons />
    </div>
  )
}

const ProcessStepsSection = ({ selectedStep, onStepChange }) => {
  const steps = [
    {
      id: 1,
      title: "LET'S CONNECTED ONE ON ONE",
      description: "This is the first step where we connect with you one on one to understand your requirements and preferences."
    },
    {
      id: 2,
      title: "START WITH YOUR DESIGN",
      description: "In this step, we collaborate with you to create a design that meets your vision and requirements."
    },
    {
      id: 3,
      title: "PLACE THE ORDER",
      description: "Once the design is finalized, you can place the order for your customized pooja room."
    },
    {
      id: 4,
      title: "APPROVAL",
      description: "Before proceeding, we ensure that everything is approved by you to meet your expectations."
    },
    {
      id: 5,
      title: "DELIVERY & INSTALLATION",
      description: "Finally, we deliver and install your pooja room at your desired location."
    }
  ]

  return (
    <section className="w-full py-8 md:py-12 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic text-center tracking-wide font-bold">
            Our 5-Step Process
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="relative">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`relative mb-5 cursor-pointer group ${selectedStep === step.id ? 'opacity-100' : 'opacity-70'}`}
                onClick={() => onStepChange(step.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-[#8B8B5C] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 z-10`}>
                    <span className="text-white text-sm font-bold">{step.id}</span>
                  </div>

                  <div className={`flex-1 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 ${selectedStep === step.id ? 'ring-2 ring-[#8B8B5C]' : ''}`}>
                    <h3 className="text-sm font-bold text-gray-800 mb-2 uppercase">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase">
                {steps.find(s => s.id === selectedStep)?.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                {steps.find(s => s.id === selectedStep)?.description}
              </p>
              <hr className="border-gray-300 mb-5" />
              <div className="space-y-5">
                <p className="text-sm text-gray-500 leading-relaxed">
                  More details about this step will be shown here. This is a simplified version of the process steps detail view.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationDetailPage

