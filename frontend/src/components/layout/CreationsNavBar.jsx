import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import DreamMurtisDropdown from './DreamMurtisDropdown'
import HomeDecorDropdown from './HomeDecorDropdown'
import ShopByDropdown from './ShopByDropdown'

import { useCartAndLikes } from '../../contexts/CartAndLikesContext'
import logoImage from '../../assets/logo/download.png'
import TranslatedText from '../TranslatedText'

const CreationsNavBar = ({ onShowCart, onShowLikes }) => {
  const { getCartCount, likes } = useCartAndLikes()
  const cartCount = getCartCount()
  const likesCount = likes.length
  const location = useLocation()
  const navigate = useNavigate()
  const [hoveredDropdown, setHoveredDropdown] = useState(null)
  const [isFading, setIsFading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const timeoutRef = useRef(null)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearch(false)
      setSearchQuery("")
      setMobileMenuOpen(false) // Close mobile menu if open
    }
  }

  const navItems = [
    { name: 'DREAM TEMPLE', path: '/dream-temple', hasDropdown: false },
    { name: 'DREAM MURTIS', path: '/murti', hasDropdown: true, dropdownKey: 'dream-murtis' },
    { name: 'HOME DECOR', path: '/murti#shop-home-decor', hasDropdown: true, dropdownKey: 'home-decor' },
    { name: 'SHOP BY', path: '/shop-by', hasDropdown: true, dropdownKey: 'shop-by' },
    { name: 'LIMITED EDITION', path: '/limited-edition', hasDropdown: false },
    { name: 'ON SALE', path: '/on-sale', hasDropdown: false }
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

  /* Fetched Murti Hierarchy for Mobile Menu */
  const [murtiHierarchy, setMurtiHierarchy] = useState([])
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    const fetchHierarchy = async () => {
      try {
        const res = await fetch(`${API_URL}/murtis/hierarchy`)
        const result = await res.json()
        if (result.success) {
          setMurtiHierarchy(result.data)
        }
      } catch (error) {
        console.error('Error fetching murti hierarchy:', error)
      }
    }
    fetchHierarchy()
  }, [])

  /* Home Decor Categories for Mobile Menu */
  const homeDecorCategories = [
    {
      title: 'Furniture',
      items: [
        { name: 'Dining Tables', path: '/home-decor/dining-tables' },
        { name: 'Center Tables', path: '/home-decor/center-tables' },
        { name: 'Side Tables', path: '/home-decor/side-tables' },
        { name: 'Marble chair', path: '/home-decor/marble-chair' },
        { name: 'Pedestal Columns', path: '/home-decor/pedestal-columns' },
        { name: 'Fire Places', path: '/home-decor/fire-places' },
      ]
    },
    {
      title: 'Games & Leisure',
      items: [
        { name: 'Chess Sets', path: '/home-decor/chess-sets' },
        { name: 'Ludo', path: '/home-decor/ludo' },
        { name: 'Tic-Tac-Toe', path: '/home-decor/tic-tac-toe' },
      ]
    },
    {
      title: 'Lighting',
      items: [
        { name: 'Lamps', path: '/home-decor/lamps' },
      ]
    },
    {
      title: 'Pots | Vases',
      items: [
        { name: 'Tulsi Gamla', path: '/home-decor/tulsi-gamla' },
        { name: 'Pots & Vases', path: '/home-decor/pots-vases' },
      ]
    },
    {
      title: 'Sculptures',
      items: [
        { name: 'Indoor Sculptures', path: '/home-decor/indoor-sculptures' },
        { name: 'Outdoor Sculptures', path: '/home-decor/outdoor-sculptures' },
      ]
    },
    {
      title: 'Tableware',
      items: [
        { name: 'Mortar & Pestle', path: '/home-decor/mortar-pestle' },
        { name: 'Bowls', path: '/home-decor/bowls' },
        { name: 'Tray', path: '/home-decor/tray' },
        { name: 'Coasters', path: '/home-decor/coasters' },
        { name: 'Candle Holders', path: '/home-decor/candle-holders' },
        { name: 'Kitchen Accessories', path: '/home-decor/kitchen-accessories' },
      ]
    },
    {
      title: 'Wall Art',
      items: [
        { name: '3D Wall Murals', path: '/home-decor/3d-wall-murals' },
        { name: 'Inlay Wall Art', path: '/home-decor/inlay-wall-art' },
      ]
    },
    {
      title: 'Bathroom Sets',
      items: [
        { name: 'Bathroom Accessories', path: '/home-decor/bathroom-accessories' },
        { name: 'Stone Sinks', path: '/home-decor/stone-sinks' },
      ]
    },
    {
      title: 'Office & Desk',
      items: [
        { name: 'Bookends', path: '/home-decor/bookends' },
        { name: 'Photo Frames', path: '/home-decor/photo-frames' },
      ]
    }
  ]

  /* Shop By Categories for Mobile Menu */
  const shopByCategories = {
    rooms: [
      'Pooja Room', 'Living Room', 'Dinning Room', 'Powder Room', 'Foyer'
    ],
    occasions: [
      'Housewarming', 'Festivals', 'Wedding', 'Religious Ceremonies', 'Memorials', 'Corporate Gifting'
    ]
  }

  return (
    <nav className="w-full bg-white border-b border-gray-200 relative z-50 shadow-sm">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1500px] px-4 md:px-6 lg:px-8">
          {/* Hover Wrapper - Wraps buttons and dropdown */}
          <div
            className=""
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
                        {item.name === 'SHOP BY' ? (
                          <span
                            className={`
                          relative group pb-1
                          text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]
                          font-medium tracking-[0.05em] uppercase
                          whitespace-nowrap
                          transition-all duration-300 ease-in-out
                          select-none
                          cursor-pointer
                          text-gray-700 hover:text-[#8B7355]
                        `}
                          >
                            <TranslatedText>{item.name}</TranslatedText>
                            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#8B7355] transition-all duration-300 group-hover:w-full"></span>
                          </span>
                        ) : (
                          <Link
                            to={item.path}
                            className={`
                          relative group pb-1
                          text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]
                          font-medium tracking-[0.05em] uppercase
                          whitespace-nowrap
                          transition-all duration-300 ease-in-out
                          select-none focus:outline-none caret-transparent
                          ${isActive
                                ? 'text-black font-semibold'
                                : 'text-gray-700 hover:text-[#8B7355]'
                              }
                        `}
                          >
                            <TranslatedText>{item.name}</TranslatedText>
                            {isActive && (
                              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#8B7355] transition-all duration-300"></span>
                            )}
                            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#8B7355] transition-all duration-300 group-hover:w-full"></span>
                          </Link>
                        )}
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
                        select-none focus:outline-none caret-transparent
                        ${isActive
                            ? 'text-black font-semibold'
                            : 'text-gray-700 hover:text-[#8B7355]'
                          }
                      `}
                      >
                        <TranslatedText>{item.name}</TranslatedText>
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
                {/* Search Icon & Toggle */}
                <div className="relative flex items-center">
                  {showSearch ? (
                    <form onSubmit={handleSearch} className="flex items-center absolute right-0 bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm w-40 z-10 transition-all duration-300">
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search products..."
                        className="bg-transparent border-none outline-none text-xs w-full text-black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => !searchQuery && setShowSearch(false)}
                      />
                      <button type="submit" className="text-gray-400 hover:text-[#8B7355]">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => setShowSearch(true)}
                      className="p-2 text-black hover:text-[#8B7355] transition-colors duration-300"
                      aria-label="Search"
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  )}
                </div>
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

                {/* User Profile Icon */}
                <button
                  onClick={() => {
                    const token = localStorage.getItem('authToken')
                    navigate(token ? '/profile' : '/login')
                  }}
                  className="relative p-2 text-black hover:text-[#8B7355] transition-colors duration-300"
                  aria-label="User Profile"
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
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
              {/* Logo Removed as per request */}
              <div className="flex-1"></div>

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
                {/* User Profile Icon */}
                <button
                  onClick={() => {
                    const token = localStorage.getItem('authToken')
                    navigate(token ? '/profile' : '/login')
                  }}
                  className="relative p-2 text-black hover:text-[#8B7355] transition-colors"
                  aria-label="User Profile"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>


            {/* Mobile Search Bar */}
            <div className="lg:hidden px-4 pb-2">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-gray-100 border-none rounded-full px-4 py-2 text-sm text-black focus:ring-1 focus:ring-[#8B7355] outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto">
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
                            <span><TranslatedText>{item.name}</TranslatedText></span>
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
                            <div className="bg-gray-50 px-4 py-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                              {item.dropdownKey === 'dream-murtis' && (
                                <div className="flex flex-col gap-4 py-2">
                                  {murtiHierarchy.length > 0 ? (
                                    murtiHierarchy.map((group) => (
                                      <div key={group._id}>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"><TranslatedText>{group.name}</TranslatedText></h4>
                                        <div className="flex flex-col gap-2 pl-2">
                                          {group.categories.map((category) => (
                                            <Link
                                              key={category._id}
                                              to={`/murti/${category.id}`}
                                              onClick={() => setMobileMenuOpen(false)}
                                              className="text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded px-2 py-1"
                                            >
                                              <TranslatedText>{category.name}</TranslatedText>
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="text-sm text-gray-400 p-2"><TranslatedText>Loading categories...</TranslatedText></div>
                                  )}
                                </div>
                              )}
                              {item.dropdownKey === 'home-decor' && (
                                <div className="flex flex-col gap-4 py-2">
                                  <Link to="/murti#shop-home-decor" onClick={() => setMobileMenuOpen(false)} className="font-bold text-sm text-[#8B7355] hover:underline mb-2 block">
                                    <TranslatedText>View All Home Decor</TranslatedText>
                                  </Link>
                                  {homeDecorCategories.map((group, idx) => (
                                    <div key={idx}>
                                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"><TranslatedText>{group.title}</TranslatedText></h4>
                                      <div className="flex flex-col gap-2 pl-2">
                                        {group.items.map((subItem) => (
                                          <Link
                                            key={subItem.path}
                                            to={subItem.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded px-2 py-1"
                                          >
                                            <TranslatedText>{subItem.name}</TranslatedText>
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {item.dropdownKey === 'shop-by' && (
                                <div className="flex flex-col gap-4 py-2">
                                  <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"><TranslatedText>Rooms</TranslatedText></h4>
                                    <div className="flex flex-col gap-2 pl-2">
                                      {shopByCategories.rooms.map((room) => (
                                        <Link
                                          key={room}
                                          to={`/shop-by/rooms/${room.toLowerCase().replace(/\s+/g, '-')}`}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded px-2 py-1"
                                        >
                                          <TranslatedText>{room}</TranslatedText>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"><TranslatedText>Occasions</TranslatedText></h4>
                                    <div className="flex flex-col gap-2 pl-2">
                                      {shopByCategories.occasions.map((occasion) => (
                                        <Link
                                          key={occasion}
                                          to={`/shop-by/occasions/${occasion.toLowerCase().replace(/\s+/g, '-')}`}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded px-2 py-1"
                                        >
                                          <TranslatedText>{occasion}</TranslatedText>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
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
                        <TranslatedText>{item.name}</TranslatedText>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Shared Dropdown Container - Absolute - Desktop Only */}
            <div
              className={`hidden lg:block absolute left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in-out overflow-hidden z-50 ${hoveredDropdown
                ? (hoveredDropdown === 'home-decor'
                  ? 'h-[450px] pointer-events-auto'
                  : hoveredDropdown === 'dream-murtis'
                    ? 'h-[500px] pointer-events-auto'
                    : 'h-[220px] pointer-events-auto')
                : 'h-0 pointer-events-none'
                }`}
              style={{
                top: '100%',
                opacity: isFading ? 0 : (hoveredDropdown ? 1 : 0),
                transition: hoveredDropdown === 'dream-murtis'
                  ? 'opacity 0.5s ease-in-out, height 0.9s ease-in-out'
                  : 'opacity 0.3s ease-in-out, height 0.5s ease-in-out'
              }}
            >
              {/* Dropdown Content */}
              {hoveredDropdown && (
                <>
                  {hoveredDropdown === 'dream-murtis' && <DreamMurtisDropdown />}
                  {hoveredDropdown === 'home-decor' && <HomeDecorDropdown />}
                  {hoveredDropdown === 'shop-by' && <ShopByDropdown />}

                </>
              )}
            </div>
          </div>
        </div>
      </div >
    </nav >
  )
}

export default CreationsNavBar

