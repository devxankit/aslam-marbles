import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { ourCreations as defaultCreations } from '../../data/creations'
import { buildImageUrl, fetchNavItems } from '../../utils/aslamHouseUtils'
import TranslatedText from '../TranslatedText'

const GROUP = 'our-creations-nav'

const OurCreationsDropdown = () => {
  const [items, setItems] = useState(defaultCreations)

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

  const getFallbackRoute = (id) => {
    if (id === 'murti') return '/murti'
    if (id === 'dream-temples') return '/dream-temple'
    if (id === 'pooja-rooms') return '/pooja-room'
    if (id === 'home-decor') return '/murti#shop-home-decor'
    if (id === 'communal-temples') return '/communal-temples'
    if (id === 'jain-temples') return '/jain-temples'
    return null
  }

  const resolveRoute = (item) => {
    if (item.path && item.path !== '#') return item.path
    return getFallbackRoute(item.id)
  }

  return (
    <div className="w-full h-full flex items-start py-4 px-6 md:px-8 lg:px-12 gap-4 md:gap-6 lg:gap-8">
      {/* Menu Items - Left Side */}
      <div className="flex-shrink-0 w-48 md:w-56 lg:w-64">
        <nav className="space-y-1">
          {displayItems.map((item) => {
            const route = resolveRoute(item)
            return route ? (
              <Link
                key={item.id}
                to={route}
                className="block w-full text-left px-3 py-2 text-xs md:text-sm text-gray-700 hover:text-[#8B7355] hover:bg-gray-50 rounded transition-all duration-200 font-medium"
              >
                <TranslatedText>{item.name}</TranslatedText>
              </Link>
            ) : (
              <button
                key={item.id}
                className="w-full text-left px-3 py-2 text-xs md:text-sm text-gray-700 hover:text-[#8B7355] hover:bg-gray-50 rounded transition-all duration-200 font-medium"
              >
                <TranslatedText>{item.name}</TranslatedText>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Images - Right Side in Horizontal Line - Hidden on Mobile */}
      <div className="hidden lg:flex flex-1 items-center gap-3 md:gap-4 overflow-x-auto h-full">
        {displayItems.map((item) => {
          const route = resolveRoute(item)
          const ImageContent = (
            <div className="group cursor-pointer flex-shrink-0 flex flex-col">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 w-28 h-[260px] md:w-32 md:h-[260px] lg:w-36 lg:h-[260px] shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-black text-center mt-1.5 group-hover:text-[#8B7355] transition-colors whitespace-nowrap">
                <TranslatedText>{item.name}</TranslatedText>
              </h3>
            </div>
          )

          return route ? (
            <Link key={item.id} to={route}>
              {ImageContent}
            </Link>
          ) : (
            <div key={item.id}>
              {ImageContent}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OurCreationsDropdown

