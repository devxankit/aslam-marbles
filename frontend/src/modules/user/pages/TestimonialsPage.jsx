import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { useNavigate } from 'react-router-dom'
import { fetchTestimonials } from '../../../utils/testimonialUtils'

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

      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Testimonials Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-base md:text-lg">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-base md:text-lg">No testimonials available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {memoizedTestimonials.map((testimonial) => (
              <div
                key={testimonial._id || testimonial.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Avatar Section */}
                <div className="relative h-48 md:h-56 bg-gradient-to-br from-[#8B7355] to-[#6B5A42] flex items-center justify-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center text-3xl md:text-4xl font-bold text-[#8B7355] shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white/20 rounded-full"></div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                    "{testimonial.review}"
                  </p>

                  {/* Divider */}
                  <div className="border-t border-gray-200 mb-4"></div>

                  {/* Name and Location */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                      {testimonial.name.toUpperCase()}
                    </h3>
                    {testimonial.designation && (
                      <p className="text-sm text-gray-500 mb-1">{testimonial.designation}</p>
                    )}
                    <p className="text-sm md:text-base text-gray-600 font-medium">
                      {testimonial.location.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <TrustedBySection />
      <Footer />
    </div>
  )
}

export default memo(TestimonialsPage)

