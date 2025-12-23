import { useEffect, useRef, useState } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import visitStoreImg from '../../../assets/home/visit store/poojaroomm.jpeg'

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

const VisitStorePage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowHowItWorks,
}) => {
  // Dummy review data
  const reviews = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Amazing experience! The quality of work is exceptional. Highly recommended for anyone looking for premium pooja room designs.',
      location: 'Mumbai'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rating: 5,
      date: '1 month ago',
      comment: 'Beautiful craftsmanship and professional service. They transformed our space exactly as we envisioned. Thank you!',
      location: 'Delhi'
    },
    {
      id: 3,
      name: 'Amit Patel',
      rating: 5,
      date: '3 weeks ago',
      comment: 'Excellent quality materials and timely delivery. The attention to detail is outstanding. Very satisfied!',
      location: 'Ahmedabad'
    },
    {
      id: 4,
      name: 'Sunita Reddy',
      rating: 5,
      date: '1 week ago',
      comment: 'The team was very helpful and guided us through the entire process. The final result exceeded our expectations.',
      location: 'Bangalore'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      rating: 5,
      date: '2 months ago',
      comment: 'Professional service from start to finish. The pooja room looks divine and adds so much peace to our home.',
      location: 'Jaipur'
    },
    {
      id: 6,
      name: 'Meera Joshi',
      rating: 5,
      date: '3 weeks ago',
      comment: 'Outstanding work! They understood our requirements perfectly and delivered beyond our imagination. Truly grateful!',
      location: 'Pune'
    }
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <Header
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
      />

      {/* Hero Image Section with Button */}
      <section className="w-full relative">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/1', height: '65vh', maxHeight: '700px' }}>
          <img
            src={visitStoreImg}
            alt="Visit Store"
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: 'center center' }}
          />
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#8B7355] text-white px-6 py-3 md:px-8 md:py-4 text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wide rounded hover:bg-[#6B5A42] transition-all duration-300 shadow-lg hover:shadow-xl z-10">
            Visit Store
          </button>
        </div>
      </section>

      {/* Spacer Gap */}
      <div className="w-full h-20 md:h-32 lg:h-40 bg-white"></div>

      {/* Location and Map Section */}
      <section className="w-full py-8 md:py-12 px-4 md:px-6 bg-[#fffbf0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side - Address (Slides in from left) */}
            <ScrollSlideIn direction="left">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#8B7355] italic font-bold mb-6">
                    Visit Our Store
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">Address:</h3>
                      <p className="text-sm md:text-base leading-relaxed">
                        Borawar Byepass Road Makrana
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">Contact:</h3>
                      <p className="text-sm md:text-base leading-relaxed">
                        Phone: +917877639699<br />
                        Email: aslammarble40@gmail.com
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">Timings:</h3>
                      <p className="text-sm md:text-base leading-relaxed">
                        Monday - Saturday: 10:00 AM - 8:00 PM<br />
                        Sunday: 11:00 AM - 7:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollSlideIn>

            {/* Right Side - Map */}
            <div className="w-full h-[300px] md:h-[400px] lg:h-full rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.9533693522367!2d74.72018287194476!3d27.03169232460092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396b9c4a68450ce5%3A0xcce01831ddd48d6d!2sBye%20Pass%20Rd%2C%20Makrana%2C%20Rajasthan%20341505!5e0!3m2!1sen!2sin!4v1765880668785!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Store Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="w-full py-8 md:py-12 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic font-bold mb-3">
              Customer Reviews
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              See what our customers have to say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#8B7355] rounded-full flex items-center justify-center text-white font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{review.name}</h3>
                      <p className="text-xs text-gray-500">{review.location}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(review.rating)}
                </div>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{review.comment}</p>
                <p className="text-xs text-gray-400">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustedBySection />
      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default VisitStorePage

