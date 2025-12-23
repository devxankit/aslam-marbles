import { useState, useRef } from 'react'
// Communal imports
import communalImg1 from '../../assets/communal/1733300550903.jpeg'
import communalImg2 from '../../assets/communal/wmremove-transformed.jpeg'
import communalImg3 from '../../assets/communal/wmremove-transformed (3).jpeg'
import communalImg4 from '../../assets/communal/wmremove-transformed (4).jpeg'
import communalImg5 from '../../assets/communal/wmremove-transformed (5).jpeg'
import communalImg6 from '../../assets/communal/wmremove-transformed (6).jpeg'

// Residential imports
import residentialImg1 from '../../assets/residential/1733296958645.jpeg'
import residentialImg2 from '../../assets/residential/1733300646054.jpeg'
import residentialImg3 from '../../assets/residential/2d07e532-fa01-4e30-b638-52b26887f92c-small.jpeg'
import residentialImg4 from '../../assets/residential/99e40aab-0df8-4175-ad0e-a0a94517b611-medium.jpeg'
import residentialImg5 from '../../assets/residential/06fcbe87-a149-445b-912c-6787ef4a4d50.png'
import residentialImg6 from '../../assets/residential/446d311a-f90e-4837-b736-3f8e6a5f4b2c.png'
import residentialImg7 from '../../assets/residential/4d2730d0-5d47-49f4-94b5-a8d151f7b39b.png'
import residentialImg8 from '../../assets/residential/8d836775-b2f6-4c0a-8ab4-5b7c27a36e55.png'

// International imports
import internationalImg1 from '../../assets/international/14d31fa5-cfd7-4b90-a247-9748d279f3c7.png'
import internationalImg2 from '../../assets/international/299a63e6-532b-4b95-960c-1547e879b758.png'
import internationalImg3 from '../../assets/international/81fe6d99-c983-460b-9cfb-586795089d56.png'
import internationalImg4 from '../../assets/international/ca344ef3-3bd3-44dc-adeb-cd70d1b3c573.png'
import internationalImg5 from '../../assets/international/edc914ef-1943-4164-9e46-bc67ee0d0364.png'

const ExploreProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('communal')
  const scrollRef = useRef(null)

  const projectCategories = {
    communal: [
      communalImg1,
      communalImg2,
      communalImg3,
      communalImg4,
      communalImg5,
      communalImg6
    ],
    residential: [
      residentialImg1,
      residentialImg2,
      residentialImg3,
      residentialImg4,
      residentialImg5,
      residentialImg6,
      residentialImg7,
      residentialImg8
    ],
    international: [
      internationalImg1,
      internationalImg2,
      internationalImg3,
      internationalImg4,
      internationalImg5
    ]
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic text-center mb-8 md:mb-12">
          EXPLORE OUR PROJECTS
        </h2>

        {/* Category Buttons */}
        <div className="flex justify-center gap-4 mb-8 md:mb-12 flex-wrap">
          <button
            onClick={() => setActiveCategory('communal')}
            className={`px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold transition-all duration-300 ${
              activeCategory === 'communal'
                ? 'bg-[#8B7355] text-white'
                : 'bg-white text-[#8B7355] border-2 border-[#8B7355] hover:bg-[#8B7355]/10'
            }`}
          >
            Communal
          </button>
          <button
            onClick={() => setActiveCategory('residential')}
            className={`px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold transition-all duration-300 ${
              activeCategory === 'residential'
                ? 'bg-[#8B7355] text-white'
                : 'bg-white text-[#8B7355] border-2 border-[#8B7355] hover:bg-[#8B7355]/10'
            }`}
          >
            Residential
          </button>
          <button
            onClick={() => setActiveCategory('international')}
            className={`px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold transition-all duration-300 ${
              activeCategory === 'international'
                ? 'bg-[#8B7355] text-white'
                : 'bg-white text-[#8B7355] border-2 border-[#8B7355] hover:bg-[#8B7355]/10'
            }`}
          >
            International
          </button>
        </div>

        {/* Images Horizontal Scroll with Arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-[#8B7355] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#A08A6F] transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-[#8B7355] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#A08A6F] transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Horizontal Scrollable Images */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-14 md:px-16 py-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {projectCategories[activeCategory].map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-gray-100 flex-shrink-0 w-64 h-64 md:w-80 md:h-80"
              >
                <img
                  src={image}
                  alt={`${activeCategory} project ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default ExploreProjectsSection
