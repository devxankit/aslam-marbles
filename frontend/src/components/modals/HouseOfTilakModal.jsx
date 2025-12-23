import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { homeImages } from '../../data/homeImages'
import { fetchAslamHouseItems, buildImageUrl } from '../../utils/aslamHouseUtils'

const HouseOfTilakModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const defaultMenu = useMemo(() => [
    { name: 'About Us', path: '/about-us', id: 'about-us' },
    { name: 'Experience Centre', path: '/experience-centre', id: 'experience-centre' },
    { name: 'The Team', path: '/the-team', id: 'the-team' },
    { name: 'Careers', path: '/careers', id: 'careers' },
    { name: 'Artisans of Tilak', path: '/artisans-of-tilak', id: 'artisans-of-tilak' },
    { name: 'Our Clients', path: '/our-clients', id: 'our-clients' }
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

  // Filter out visit store image
  const displayImages = useMemo(() => {
    return (navItems || [])
      .filter(item => (item.id || item.key) !== 'visit-store')
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  }, [navItems])

  const handleImageClick = (imageItem) => {
    if (imageItem.id === 'careers') {
      // Careers is handled via Link
      return
    }
    // Other images can have actions or just show/highlight
    console.log('Clicked:', imageItem.name)
  }

  const handleMenuItemClick = (item) => {
    if (item.path !== '#') {
      onClose()
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[110] transition-opacity"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-lg shadow-2xl max-w-[95vw] w-full max-h-[90vh] overflow-hidden pointer-events-auto transform transition-all duration-500 ease-out"
          style={{ animation: 'slideUp 0.5s ease-out' }}
        >
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black">ASLAM MARBLE SUPPLIERS</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-3xl font-bold transition-colors w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col h-auto max-h-[70vh] overflow-y-auto py-8">
            {/* Centered Menu Links */}
            <div className="w-full max-w-md mx-auto px-6">
              <nav className="flex flex-col gap-2">
                {menuItems.map((item, index) => (
                  <div key={index} className="w-full">
                    {item.path === '#' ? (
                      <button
                        onClick={() => handleMenuItemClick(item)}
                        className="w-full text-center px-6 py-4 rounded-xl transition-all duration-300 text-gray-700 hover:bg-[#8B7355]/5 hover:text-[#8B7355] font-serif italic text-xl md:text-2xl border border-transparent hover:border-[#8B7355]/20"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className="block w-full text-center px-6 py-4 rounded-xl transition-all duration-300 text-gray-700 hover:bg-[#8B7355]/5 hover:text-[#8B7355] font-serif italic text-xl md:text-2xl border border-transparent hover:border-[#8B7355]/20"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HouseOfTilakModal

