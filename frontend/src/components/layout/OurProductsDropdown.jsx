import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { products as defaultProducts } from '../../data/products'
import { buildImageUrl, fetchNavItems } from '../../utils/aslamHouseUtils'

const GROUP = 'our-products-nav'

const OurProductsDropdown = () => {
  const [items, setItems] = useState(defaultProducts)

  const getRoute = (id, path) => {
    if (path && path !== '#') return path
    if (id === 'sandstone') return '/products/sandstone'
    if (id === 'limestone') return '/products/limestone'
    if (id === 'slate') return '/products/slate'
    if (id === 'marble') return '/products/marble'
    if (id === 'quartzite') return '/products/quartzite'
    if (id === 'pebble-stones') return '/products/pebble-stones'
    if (id === 'cobble-stones') return '/products/cobble-stones'
    if (id === 'stone-chips') return '/products/stone-chips'
    if (id === 'granite') return '/products/granite'
    if (id === 'basalt-stones') return '/products/basalt-stones'
    if (id === 'soap-stones') return '/products/soap-stones'
    if (id === 'travertine-stones') return '/products/travertine-stones'
    if (id === 'natural-indian-stones') return '/products/natural-indian-stones'
    if (id === 'modern-art') return '/art/modern-art'
    if (id === 'imported') return '/art/imported'
    if (id === 'packaging') return '/art/packaging'
    return null
  }

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      const data = await fetchNavItems(GROUP, true)
      if (!isMounted || !Array.isArray(data) || data.length === 0) return
      const normalized = data.map((item) => ({
        ...item,
        id: item.key || item.id,
        name: item.name,
        path: item.path || '#',
        image: buildImageUrl(item.imagePath || item.image),
        displayOrder: item.displayOrder ?? 0
      }))
      setItems(normalized)
    }
    load()
    return () => { isMounted = false }
  }, [])

  const displayItems = useMemo(() => {
    return (items || []).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  }, [items])

  return (
    <div className="w-full h-full flex items-start py-3 px-4 md:px-5 lg:px-6 gap-3 md:gap-4">
      {/* Menu Items - Left Side with Scroll */}
      <div className="flex-shrink-0 w-40 md:w-48 lg:w-56 h-full overflow-y-auto pr-2">
        <nav className="space-y-0.5">
          {displayItems.map((product) => {
            const route = getRoute(product.id, product.path)
            return route ? (
              <Link
                key={product.id}
                to={route}
                className="block w-full text-left px-2 py-1.5 text-xs md:text-sm text-gray-700 hover:text-[#8B7355] hover:bg-gray-50 rounded transition-all duration-200 font-medium uppercase"
              >
                {product.name}
              </Link>
            ) : (
              <button
                key={product.id}
                className="w-full text-left px-2 py-1.5 text-xs md:text-sm text-gray-700 hover:text-[#8B7355] hover:bg-gray-50 rounded transition-all duration-200 font-medium uppercase"
              >
                {product.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Images - Right Side Fixed (Stays in Place) - Hidden on Mobile */}
      <div className="hidden lg:flex flex-1 items-center gap-2 md:gap-3 overflow-x-auto h-full">
        {displayItems.map((product) => {
          const route = getRoute(product.id, product.path)
          const ImageContent = (
            <>
              <div className="relative overflow-hidden rounded-lg bg-gray-100 w-28 h-[260px] md:w-32 md:h-[260px] lg:w-36 lg:h-[260px] shadow-lg hover:shadow-2xl transition-all duration-300 ring-2 ring-gray-200/50 hover:ring-[#8B7355]/40">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
                <img
                  src={product.image}
                  alt={product.name}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-all duration-300 ease-in-out group-hover:scale-110"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeLegibility',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    perspective: '1000px',
                    transform: 'translateZ(0) scale(1)',
                    willChange: 'transform, filter',
                    filter: 'contrast(1.25) saturate(1.1) brightness(1.02)',
                    WebkitFilter: 'contrast(1.25) saturate(1.1) brightness(1.02)',
                    mixBlendMode: 'normal',
                    isolation: 'isolate',
                    opacity: '1',
                    WebkitTransform: 'translateZ(0)',
                    msTransform: 'translateZ(0)',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-lg transition-all duration-300 pointer-events-none"></div>
              </div>
              <h3 className="text-xs font-semibold text-black text-center mt-1.5 group-hover:text-[#8B7355] transition-colors whitespace-nowrap uppercase">
                {product.name}
              </h3>
            </>
          )

          return route ? (
            <Link
              key={product.id}
              to={route}
              className="group cursor-pointer flex-shrink-0 flex flex-col"
            >
              {ImageContent}
            </Link>
          ) : (
            <div key={product.id} className="group cursor-pointer flex-shrink-0 flex flex-col">
              {ImageContent}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OurProductsDropdown

