import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { homeImages } from '../../data/homeImages'
import { fetchAslamHouseItems, buildImageUrl } from '../../utils/aslamHouseUtils'
import TranslatedText from '../TranslatedText'

const HouseOfTilakDropdown = () => {
  const defaultMenu = useMemo(() => [
    { nameKey: 'About Us', path: '/about-us', id: 'about-us' },
    { nameKey: 'Experience Centre', path: '/experience-centre', id: 'experience-centre' },
    { nameKey: 'The Team', path: '/the-team', id: 'the-team' },
    { nameKey: 'Careers', path: '/careers', id: 'careers' },
    { nameKey: 'Our Artist', path: '/artist', id: 'artist' },
    { nameKey: 'Our Clients', path: '/our-clients', id: 'our-clients' }
  ], [])

  const [navItems, setNavItems] = useState(homeImages)
  const menuItems = defaultMenu

  useEffect(() => {
    let isMounted = true
    const loadNavItems = async () => {
      const data = await fetchAslamHouseItems()
      if (!isMounted || !Array.isArray(data) || data.length === 0) return
      const normalized = data.map((item) => ({
        ...item,
        id: item.key || item.id,
        image: buildImageUrl(item.imagePath || item.image),
        path: item.path || '#'
      }))
      setNavItems(normalized)
    }
    loadNavItems()
    return () => { isMounted = false }
  }, [])

  const displayImages = useMemo(() => {
    return (navItems || [])
      .filter(item => (item.id || item.key) !== 'visit-store')
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  }, [navItems])

  // Function to get route path for image ID
  const getImageRoute = (imageId) => {
    const navItem = navItems.find(item => item.id === imageId || item.key === imageId)
    if (navItem && navItem.path && navItem.path !== '#') {
      return navItem.path
    }
    const fallback = defaultMenu.find(item => item.id === imageId)
    return fallback && fallback.path !== '#' ? fallback.path : null
  }

  return (
    <div className="w-full h-full flex items-start py-4 px-6 md:px-8 lg:px-12 gap-4 md:gap-6 lg:gap-8">
      {/* Menu Items - Left Side */}
      <div className="flex-shrink-0 w-48 md:w-56 lg:w-64">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.path === '#' ? (
                <button className="w-full text-left px-3 py-2 text-xs md:text-sm text-gray-700 hover:text-[#8B7355] hover:bg-gray-50 rounded transition-all duration-200 font-medium">
                  <TranslatedText>{item.nameKey}</TranslatedText>
                </button>
              ) : (
                <Link
                  to={item.path}
                  className="block w-full text-left px-3 py-2 text-xs md:text-sm text-gray-700 hover:text-[#8B7355] hover:bg-gray-50 rounded transition-all duration-200 font-medium"
                >
                  <TranslatedText>{item.nameKey}</TranslatedText>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Images - Right Side in Horizontal Line - Hidden on Mobile */}
      <div className="hidden lg:flex flex-1 items-center gap-3 md:gap-4 overflow-x-auto h-full">
        {displayImages.map((item) => {
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

          // Get route for this image
          const route = getImageRoute(item.id)

          // If route exists and is not '#', wrap in Link
          if (route) {
            return (
              <Link key={item.id} to={route}>
                {ImageContent}
              </Link>
            )
          }

          // Otherwise, render as div (for items without routes)
          return (
            <div key={item.id}>
              {ImageContent}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HouseOfTilakDropdown

