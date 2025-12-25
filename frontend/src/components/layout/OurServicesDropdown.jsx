import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { services as defaultServices } from '../../data/services'
import { buildImageUrl, fetchNavItems } from '../../utils/aslamHouseUtils'

const GROUP = 'our-services-nav'

const OurServicesDropdown = () => {
  const [items, setItems] = useState(defaultServices)

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      const data = await fetchNavItems(GROUP, true)
      if (!isMounted || !Array.isArray(data) || data.length === 0) return
      const normalized = data.map((item) => ({
        ...item,
        id: item.key || item.id,
        name: item.name,
        path: (item.name === 'AMS International' ? '/services/ams-international' :
          item.name === 'AMS Design Hub' ? '/services/ams-design-hub' :
            item.path) || '#',
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

  const getRoute = (item) => {
    if (item.path && item.path !== '#') return item.path
    return null
  }

  return (
    <div className="w-full h-full flex items-start py-4 px-6 md:px-8 lg:px-12 gap-4 md:gap-6 lg:gap-8">
      {/* Menu Items - Left Side */}
      <div className="flex-shrink-0 w-48 md:w-56 lg:w-64">
        <nav className="space-y-1">
          {displayItems.map((service) => {
            const route = getRoute(service)
            return route ? (
              <Link
                key={service.id}
                to={route}
                className="block w-full text-left px-3 py-2 text-xs md:text-sm text-gray-700 hover:text-[#8B7355] hover:bg-gray-50 rounded transition-all duration-200 font-medium"
              >
                {service.name}
              </Link>
            ) : (
              <button
                key={service.id}
                className="w-full text-left px-3 py-2 text-xs md:text-sm text-gray-700 hover:text-[#8B7355] hover:bg-gray-50 rounded transition-all duration-200 font-medium"
              >
                {service.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Images - Right Side in Horizontal Line - Hidden on Mobile */}
      <div className="hidden lg:flex flex-1 items-center gap-3 md:gap-4 overflow-x-auto h-full">
        {displayItems.map((service) => {
          const route = getRoute(service)
          const ImageContent = (
            <>
              <div className="relative overflow-hidden rounded-lg bg-gray-100 w-28 h-[260px] md:w-32 md:h-[260px] lg:w-36 lg:h-[260px] shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-black text-center mt-1.5 group-hover:text-[#8B7355] transition-colors whitespace-nowrap">
                {service.name}
              </h3>
            </>
          )

          return route ? (
            <Link
              key={service.id}
              to={route}
              className="group cursor-pointer flex-shrink-0 flex flex-col"
            >
              {ImageContent}
            </Link>
          ) : (
            <div key={service.id} className="group cursor-pointer flex-shrink-0 flex flex-col">
              {ImageContent}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OurServicesDropdown

