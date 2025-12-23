import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DreamMurtisDropdown from './DreamMurtisDropdown'
import HomeDecorDropdown from './HomeDecorDropdown'
import ShopByDropdown from './ShopByDropdown'
import LearnMoreDropdown from './LearnMoreDropdown'
import { useCartAndLikes } from '../../contexts/CartAndLikesContext'
import logoImage from '../../assets/logo/download.png'

const CreationsNavBar = ({ onShowCart, onShowLikes }) => {
  const { getCartCount, likes } = useCartAndLikes()
  const cartCount = getCartCount()
  const likesCount = likes.length
  const location = useLocation()
  const [hoveredDropdown, setHoveredDropdown] = useState(null)
  const [isFading, setIsFading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState(null)
  const timeoutRef = useRef(null)

  const navItems = [
    { name: 'DREAM TEMPLE', path: '/dream-temple', hasDropdown: false },
    { name: 'DREAM MURTIS', path: '/murti', hasDropdown: true, dropdownKey: 'dream-murtis' },
    { name: 'HOME DECOR', path: '/murti#shop-home-decor', hasDropdown: true, dropdownKey: 'home-decor' },
    { name: 'SHOP BY', path: '/shop-by', hasDropdown: true, dropdownKey: 'shop-by' },
    { name: 'LIMITED EDITION', path: '/limited-edition', hasDropdown: false },
    { name: 'ON SALE', path: '/on-sale', hasDropdown: false },
    { name: 'GUIDES', path: '/guides', hasDropdown: false },
    { name: 'LEARN MORE', path: '/learn-more', hasDropdown: true, dropdownKey: 'learn-more' }
  ]

  // Handle dropdown change with fade animation
  const handleDropdownChange = (newDropdown) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (hoveredDropdown && hoveredDropdown !== newDropdown) {
      setIsFading(true)

      timeoutRef.current = setTimeout(() => {
        setHoveredDropdown(newDropdown)

        setTimeout(() => {
          setIsFading(false)
          timeoutRef.current = null
        }, 50)
      }, 300)
    } else if (!hoveredDropdown) {
      setIsFading(false)
      setHoveredDropdown(newDropdown)
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm relative">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1500px] px-4 md:px-6 lg:px-8">
          {/* Hover Wrapper - Wraps buttons and dropdown */}
          <div
            className="relative"
            onMouseLeave={() => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
              }
              setHoveredDropdown(null)
              setIsFading(false)
            }}
          >
            {/* Desktop Nav Items - Hidden on mobile */}
            <div className="hidden lg:flex items-center justify-between gap-4 md:gap-6 lg:gap-8 xl:gap-12 py-4 md:py-5 overflow-x-auto scrollbar-hide">
              {/* Left/Center Nav Items */}
              <div className="flex items-center gap-4 md:gap-6 lg:gap-8 xl:gap-12 flex-1 justify-center">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')

                  if (item.hasDropdown) {
                    return (
                      <div
                        key={item.name}
                        onMouseEnter={() => handleDropdownChange(item.dropdownKey)}
                      >
                        <Link
                          to={item.path}
                          className={`
                          relative group pb-1
                          text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]
                          font-medium tracking-[0.05em] uppercase
                          whitespace-nowrap
                          transition-all duration-300 ease-in-out
                          ${isActive
                              ? 'text-black font-semibold'
                              : 'text-gray-700 hover:text-[#8B7355]'
                            }
                        `}
                        >
                          {item.name}
                          {isActive && (
                            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#8B7355] transition-all duration-300"></span>
                          )}
                          <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#8B7355] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                      </div>
                    )
                  }

                  return (
                    <div
                      key={item.name}
                      onMouseEnter={() => {
                        if (hoveredDropdown) {
                          if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current)
                            timeoutRef.current = null
                          }
                          setHoveredDropdown(null)
                          setIsFading(false)
                        }
                      }}
                    >
                      <Link
                        to={item.path}
                        className={`
                        relative group pb-1
                        text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]
                        font-medium tracking-[0.05em] uppercase
                        whitespace-nowrap
                        transition-all duration-300 ease-in-out
                        ${isActive
                            ? 'text-black font-semibold'
                            : 'text-gray-700 hover:text-[#8B7355]'
                          }
                      `}
                      >
                        {item.name}
                        {isActive && (
                          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#8B7355] transition-all duration-300"></span>
                        )}
                        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#8B7355] transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </div>
                  )
                })}
              </div>

              {/* Right Side Icons */}
              <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
                {/* Like Icon */}
                <button
                  onClick={() => onShowLikes && onShowLikes()}
                  className="relative p-2 text-black hover:text-[#8B7355] transition-colors duration-300"
                  aria-label="View Liked Items"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill={likesCount > 0 ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {likesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#8B7355] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {likesCount > 9 ? '9+' : likesCount}
                    </span>
                  )}
                </button>

                {/* Add to Cart Icon */}
                <button
                  onClick={() => onShowCart && onShowCart()}
                  className="relative p-2 text-black hover:text-[#8B7355] transition-colors duration-300"
                  aria-label="View Cart"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#8B7355] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navbar - Visible on mobile/tablet */}
            <div className="lg:hidden flex items-center justify-between py-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-black hover:text-[#8B7355] transition-colors"
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Logo - Center */}
              <Link to="/" className="flex-1 flex justify-center">
                <img
                  src={logoImage || '/logo.png'}
                  alt="Logo"
                  className="h-12 object-contain"
                />
              </Link>

              {/* Cart and Likes Icons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onShowLikes && onShowLikes()}
                  className="relative p-2 text-black hover:text-[#8B7355] transition-colors"
                >
                  <svg className="w-5 h-5" fill={likesCount > 0 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {likesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#8B7355] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {likesCount > 9 ? '9+' : likesCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => onShowCart && onShowCart()}
                  className="relative p-2 text-black hover:text-[#8B7355] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#8B7355] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
                <div className="flex flex-col">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                    const isExpanded = mobileExpandedMenu === item.name

                    if (item.hasDropdown) {
                      return (
                        <div key={item.name} className="border-b border-gray-100">
                          <button
                            onClick={() => setMobileExpandedMenu(isExpanded ? null : item.name)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${isActive ? 'text-[#8B7355] bg-gray-50' : 'text-gray-700 hover:bg-gray-50'
                              }`}
                          >
                            <span>{item.name}</span>
                            <svg
                              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {isExpanded && (
                            <div className="bg-gray-50 px-4 py-2">
                              {item.dropdownKey === 'dream-murtis' && (
                                <div className="flex flex-col gap-2">
                                  <Link to="/murti/ganesha" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Ganesha</Link>
                                  <Link to="/murti/hanuman" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Hanuman Ji</Link>
                                  <Link to="/murti/radha-krishna" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Radha Krishna</Link>
                                  <Link to="/murti/ram-darbar" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Ram Darbar</Link>
                                </div>
                              )}
                              {item.dropdownKey === 'home-decor' && (
                                <div className="flex flex-col gap-2">
                                  <Link to="/murti#shop-home-decor" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Home Decor Items</Link>
                                </div>
                              )}
                              {item.dropdownKey === 'shop-by' && (
                                <div className="flex flex-col gap-2">
                                  <Link to="/products/sandstone" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Sandstone</Link>
                                  <Link to="/products/marble" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Marble</Link>
                                  <Link to="/products/granite" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Granite</Link>
                                </div>
                              )}
                              {item.dropdownKey === 'learn-more' && (
                                <div className="flex flex-col gap-2">
                                  <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">How It Works</Link>
                                  <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Blog</Link>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    }

                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors border-b border-gray-100 ${isActive ? 'text-[#8B7355] bg-gray-50' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Shared Dropdown Container - Full Screen Width - Desktop Only */}
            <div
              className={`hidden lg:block absolute bg-white shadow-2xl transition-all duration-300 ease-in-out overflow-hidden z-50 ${hoveredDropdown
                ? (hoveredDropdown === 'home-decor'
                  ? 'h-[450px] translate-y-0 pointer-events-auto'
                  : hoveredDropdown === 'learn-more'
                    ? 'h-[150px] translate-y-0 pointer-events-auto'
                    : hoveredDropdown === 'dream-murtis'
                      ? 'h-[500px] translate-y-0 pointer-events-auto'
                      : 'h-[220px] translate-y-0 pointer-events-auto')
                : 'h-0 -translate-y-4 pointer-events-none'
                }`}
              style={{
                left: '50%',
                transform: hoveredDropdown
                  ? 'translateX(-50%) translateY(0)'
                  : 'translateX(-50%) translateY(-16px)',
                width: '100vw',
                top: 'calc(100% - 2px)',
                opacity: isFading ? 0 : (hoveredDropdown ? 1 : 0),
                transition: hoveredDropdown === 'dream-murtis'
                  ? 'opacity 0.5s ease-in-out, transform 0.9s ease-in-out, height 0.9s ease-in-out'
                  : 'opacity 0.3s ease-in-out, transform 0.5s ease-in-out, height 0.5s ease-in-out'
              }}
            >
              {/* Dropdown Content */}
              {hoveredDropdown && (
                <>
                  {hoveredDropdown === 'dream-murtis' && <DreamMurtisDropdown />}
                  {hoveredDropdown === 'home-decor' && <HomeDecorDropdown />}
                  {hoveredDropdown === 'shop-by' && <ShopByDropdown />}
                  {hoveredDropdown === 'learn-more' && <LearnMoreDropdown />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default CreationsNavBar

