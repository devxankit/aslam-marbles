import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ImageGallery = ({
  title,
  description,
  images,
  stoneType,
  origin = 'North India',
  layout = 'bento', // 'bento' | 'uniform-5'
  basePath = '/products'
}) => {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  const isUniform = layout === 'uniform-5';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 90%'
        }
      })

      // Cards Animation
      gsap.from('.stone-card', {
        scale: 0.95,
        y: 30,
        duration: 0.8,
        stagger: {
          each: 0.05,
          grid: 'auto',
          from: 'start'
        },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%'
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleImageClick = (item) => {
    let type = stoneType;

    // Safety check for stoneType being an object (which causes routing errors)
    if (typeof type === 'object' && type !== null) {
      console.warn('ImageGallery: stoneType prop is an object, expected string.', type);
      // Try to extract a useful property, or fallback
      type = type.id || type.slug || 'unknown-category';
    }

    if (type && item.id) {
      const productData = {
        id: item.id,
        name: item.name,
        image: item.image,
        specifications: {
          'Origin': item.origin || origin,
          'Color': item.color || 'Various',
          'Finish': 'Honed, Brushed, Natural, Tumbled',
          'Offered In': 'Tiles, Pavers, Crazy, Mosaic',
          'Tiles Size': '30 X 30, 30 X 60, 60 X 60 CM',
          'Price': '₹45 - ₹65 per sq.ft'
        }
      }
      sessionStorage.setItem(`stoneProduct_${type}_${item.id}`, JSON.stringify(productData))
      navigate(`${basePath}/${type}/${item.id}`)
    }
  }

  return (
    <div ref={sectionRef} className="bg-white">
      {/* Dynamic Intro Section */}
      <section className="py-16 md:py-24 px-4 overflow-hidden" ref={headerRef}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-[#8B7355] uppercase bg-[#8B7355]/5 rounded-full">
            Premium Selection
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-gray-900 italic mb-8 tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
              {description}
            </p>
          )}
          <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-[#8B7355] to-transparent mx-auto mt-12 opacity-40"></div>
        </div>
      </section>

      {/* Gallery Grid */}
      <div className="pb-24 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className={isUniform
            ? "grid grid-cols-5 gap-1 md:gap-2 auto-rows-[120px] md:auto-rows-[180px]"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-[280px] md:auto-rows-[340px]"
          }>
            {images.map((item, index) => {
              // Base classes
              let gridClass = isUniform
                ? "stone-card relative group cursor-pointer bg-white rounded-none overflow-hidden transition-all duration-700 hover:shadow-lg ring-1 ring-gray-200"
                : "stone-card relative group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:shadow-[0_20px_50px_rgba(139,115,85,0.15)] ring-1 ring-gray-100 hover:ring-[#8B7355]/30"

              if (!isUniform) {
                // Bento Logic only if not uniform
                if (index === 0) gridClass += " md:col-span-2 md:row-span-2"
                else if (index === 3) gridClass += " lg:col-span-2"
                else if (index === 8) gridClass += " md:row-span-2"
                else if (index === 15) gridClass += " md:col-span-2"
              }

              return (
                <div
                  key={item.id || index}
                  onClick={() => handleImageClick(item)}
                  className={gridClass}
                >
                  {/* Image - Real Color, No Overlay */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                      style={{ minHeight: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Numbering Overlay for Uniform Layout */}
                  {isUniform && (
                    <div className="absolute top-0 left-0 bg-[#8B7355] text-white font-serif italic px-1 py-0.5 text-[8px] md:text-lg md:px-3 md:py-1 z-10 leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  )}

                  {/* Content Overlay */}
                  <div className={`absolute bottom-0 left-0 right-0 p-1 md:p-3 bg-white border-t border-gray-100 transform transition-transform duration-500 ${isUniform ? 'translate-y-0 group-hover:bg-[#fafafa]' : 'translate-y-1 group-hover:translate-y-0'}`}>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-black font-black text-[6px] md:text-[9px] tracking-[0.2em] uppercase leading-none mb-0.5">
                        Origin: {item.origin || origin}
                      </span>
                      <h3 className="text-gray-900 font-serif text-[8px] md:text-base italic leading-tight truncate">
                        {item.name}
                      </h3>
                      {!isUniform && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="h-[1px] w-4 bg-[#8B7355]"></span>
                          <span className="text-[#8B7355] text-[8px] font-bold uppercase tracking-[0.2em]">
                            View Details
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Aesthetic Accent (Only for Bento) */}
                  {!isUniform && (
                    <div className="absolute top-6 right-6 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-full h-full border-t border-r border-[#8B7355]"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Decorative Brand Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <div className="hidden lg:block text-[#8B7355]/10 text-8xl md:text-[12rem] font-serif absolute opacity-10 pointer-events-none select-none -translate-y-12 uppercase tracking-tighter">
            {stoneType}
          </div>
          <div className="relative text-center z-10">
            <h3 className="text-2xl md:text-3xl font-serif italic text-gray-800 mb-6 font-light">
              "Crafting legacies, one stone at a time."
            </h3>
            <p className="text-[#8B7355] font-black tracking-[0.5em] text-[10px] uppercase">
              Aslam Marble Suppliers
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ImageGallery

