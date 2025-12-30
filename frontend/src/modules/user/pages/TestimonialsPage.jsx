import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import TrustedBySection from '../../../components/common/TrustedBySection'
import FloatingButtons from '../../../components/common/FloatingButtons'
import { useNavigate } from 'react-router-dom'
import { fetchTestimonials } from '../../../utils/testimonialUtils'
import TranslatedText from '../../../components/TranslatedText'

const TestimonialsPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  const navigate = useNavigate()
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTestimonial, setSelectedTestimonial] = useState(null)

  useEffect(() => {
    let isMounted = true
    const loadTestimonials = async () => {
      try {
        setLoading(true)
        const data = await fetchTestimonials()
        if (isMounted) {
          setTestimonials(data || [])
        }
      } catch (error) {
        console.error('Error loading testimonials:', error)
        if (isMounted) {
          setTestimonials([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    loadTestimonials()
    return () => {
      isMounted = false
    }
  }, [])

  const handleLocationClick = useCallback(() => {
    navigate('/location')
  }, [navigate])

  const handleBookingClick = useCallback(() => {
    navigate('/book-appointment')
  }, [navigate])

  const memoizedTestimonials = useMemo(() => testimonials, [testimonials])

  return (
    <div className="w-full min-h-screen bg-white">
      <Header
        variant="default"
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
        onShowLocation={handleLocationClick}
        onShowBooking={handleBookingClick}
      />

      {/* Premium Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        </div>

        {/* Animated Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-white/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="mb-4">
            <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm md:text-base font-medium tracking-wider uppercase">
              <TranslatedText>★ Trusted by 500+ Families ★</TranslatedText>
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif italic font-bold text-white mb-6 tracking-wide drop-shadow-2xl">
            <TranslatedText>Client Testimonials</TranslatedText>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
            <TranslatedText>Real stories from families who trusted us to create their sacred spaces</TranslatedText>
          </p>

        </div>


      </section>

      {/* Testimonials Grid Section */}
      <section className="w-full py-16 md:py-20 lg:py-24 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-[#8B7355] mb-4">
              <TranslatedText>What They Say About Us</TranslatedText>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#8B7355] to-transparent mx-auto"></div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center gap-3">
                <div className="w-3 h-3 bg-[#8B7355] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-[#8B7355] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-[#8B7355] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <p className="text-gray-600 text-base md:text-lg mt-4"><TranslatedText>Loading testimonials...</TranslatedText></p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-base md:text-lg"><TranslatedText>No testimonials available at the moment.</TranslatedText></p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              {memoizedTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial._id || testimonial.id}
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedTestimonial(testimonial)}
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B7355]/20 via-transparent to-[#8B7355]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                  {/* Top Gradient Banner */}
                  <div className="h-12 md:h-16 bg-gradient-to-br from-[#8B7355] via-[#9D8668] to-[#6B5A42] relative overflow-hidden">
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                    {/* Rating Badge */}
                    <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <div className="flex items-center gap-0.5">
                        <svg className="w-3 h-3 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white text-[8px] md:text-xs font-bold">{testimonial.rating}.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Avatar - Overlapping Banner */}
                  <div className="relative px-2 -mt-5">
                    <div className="relative inline-block">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-gradient-to-br from-[#8B7355] to-[#5A4A38] flex items-center justify-center text-sm md:text-base font-bold text-white shadow-md ring-1 ring-white">
                        {testimonial.name.charAt(0)}
                      </div>
                      {/* Verified Badge */}
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center border border-white">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-2 pt-1">
                    {/* Name & Info */}
                    <div className="mb-1">
                      <h3 className="text-[8px] md:text-xs font-bold text-gray-900 mb-0.5 truncate">
                        {testimonial.name}
                      </h3>
                      {testimonial.designation && (
                        <p className="text-[6px] md:text-[10px] text-[#8B7355] font-medium truncate">{testimonial.designation}</p>
                      )}
                      <p className="text-[6px] md:text-[10px] text-gray-500 flex items-center gap-0.5 mt-0.5">
                        <svg className="w-2 h-2 md:w-3 md:h-3 text-[#8B7355]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="truncate">{testimonial.location}</span>
                      </p>
                    </div>

                    {/* Review Text */}
                    <div className="relative mb-1">
                      <p className="text-gray-600 text-[6px] md:text-[10px] leading-snug line-clamp-2">
                        "{testimonial.review}"
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-2 h-2 md:w-3 md:h-3 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[6px] md:text-[8px] text-gray-400 uppercase tracking-wider font-medium"><TranslatedText>Verified</TranslatedText></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 md:py-24 bg-gradient-to-br from-[#8B7355] via-[#7A6349] to-[#5A4A38] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-white mb-6">
            <TranslatedText>Ready to Create Your Sacred Space?</TranslatedText>
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            <TranslatedText>Join hundreds of satisfied families who trusted us with their divine vision.</TranslatedText>
          </p>
          <button
            onClick={handleBookingClick}
            className="group inline-flex items-center gap-3 bg-white text-[#8B7355] px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wider shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300"
          >
            <TranslatedText>Book Your Consultation</TranslatedText>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>


      <TrustedBySection />
      <Footer />
      <FloatingButtons />

      {/* Popup Modal for Full Testimonial */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="h-24 bg-gradient-to-br from-[#8B7355] via-[#9D8668] to-[#6B5A42] relative">
              <div className="absolute top-4 right-12 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white text-sm font-bold">{selectedTestimonial.rating}.0</span>
                </div>
              </div>
            </div>

            {/* Avatar */}
            <div className="relative px-6 -mt-10">
              <div className="relative inline-block">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#8B7355] to-[#5A4A38] flex items-center justify-center text-2xl font-bold text-white shadow-xl ring-4 ring-white">
                  {selectedTestimonial.name.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {selectedTestimonial.name}
              </h3>
              {selectedTestimonial.designation && (
                <p className="text-sm text-[#8B7355] font-medium">{selectedTestimonial.designation}</p>
              )}
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1 mb-4">
                <svg className="w-4 h-4 text-[#8B7355]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {selectedTestimonial.location}
              </p>

              <p className="text-gray-600 text-base leading-relaxed mb-4">
                "{selectedTestimonial.review}"
              </p>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < selectedTestimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-medium"><TranslatedText>Verified Purchase</TranslatedText></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(TestimonialsPage)
