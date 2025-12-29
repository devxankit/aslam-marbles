import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoImage from '../../../assets/logo/download.png'

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState({
    leads: location.pathname.startsWith('/admin/leads'),
    products: location.pathname.startsWith('/admin/products'),
    content: location.pathname.startsWith('/admin/content'),
    pages: location.pathname.startsWith('/admin/pages') || location.pathname.startsWith('/admin/products/stone') || location.pathname.startsWith('/admin/products/stone-pages'),
    aslamHouse: location.pathname.includes('slug=about-us') ||
      location.pathname.includes('slug=experience-centre') ||
      location.pathname.includes('slug=the-team') ||
      location.pathname.includes('slug=careers') ||
      location.pathname.includes('slug=artist') ||
      location.pathname.includes('slug=our-clients') ||
      location.pathname.startsWith('/admin/pages/aslam-house') ||
      location.pathname.startsWith('/admin/aslam-house'),
    projectsNav: location.pathname.startsWith('/admin/aslam-house/communal-projects') ||
      location.pathname.startsWith('/admin/projects/residential') ||
      location.pathname.startsWith('/admin/projects/international') ||
      location.pathname.startsWith('/admin/projects/international') ||
      location.pathname.startsWith('/admin/pages/projects-nav'),
    ourCreationsNav: location.pathname.startsWith('/admin/category/pooja-room') ||
      location.pathname.startsWith('/admin/category/dream-temple') ||
      location.pathname.startsWith('/admin/category/murti') ||
      location.pathname.startsWith('/admin/content/murtis') ||
      location.pathname.startsWith('/admin/content/home-decor') ||
      location.pathname.startsWith('/admin/category/home-decor') ||
      location.pathname.startsWith('/admin/category/communal-temples') ||
      location.pathname.startsWith('/admin/category/jain-temples') ||
      location.pathname.startsWith('/admin/content/special-collections') ||
      location.pathname.startsWith('/admin/pages/our-creations-nav'),
    ourServicesNav: location.pathname.startsWith('/admin/our-services') ||
      location.pathname.startsWith('/admin/pages/our-services-nav'),
    ourProductsNav: location.pathname.startsWith('/admin/products/stone') ||
      location.pathname.startsWith('/admin/products/stone-pages') ||
      location.pathname.startsWith('/admin/pages/our-products-nav')
  })

  const menuItems = [
    {
      title: 'Dashboard',
      key: 'dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/admin/dashboard'
    },
    {
      title: 'Leads',
      key: 'leads',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      submenu: [
        { title: 'Job Openings', path: '/admin/leads/job-openings' },
        { title: 'Appointments', path: '/admin/leads/appointments' },
        { title: 'Talk to Expert', path: '/admin/leads/talk-to-expert' },
        { title: 'Orders', path: '/admin/leads/orders' }
      ]
    },
    {
      title: 'Products',
      key: 'products',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      submenu: [
        { title: 'Companies', path: '/admin/products/companies' }
      ]
    },
    {
      title: 'Content',
      key: 'content',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      submenu: [
        { title: 'Blog Posts', path: '/admin/content/blog' },
        { title: 'Testimonials', path: '/admin/content/testimonials' },
        { title: 'FAQs', path: '/admin/content/faqs' },
        { title: 'Hero Section', path: '/admin/content/hero-section' }
      ]
    },
    {
      title: 'Pages',
      key: 'pages',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h8l4 4v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
        </svg>
      ),
      submenu: [
        {
          title: 'Aslam House',
          key: 'aslamHouse',
          isNested: true,
          submenu: [
            { title: 'About Us', path: '/admin/aslam-house/about-us' },
            { title: 'Experience Centre', path: '/admin/aslam-house/experience-centre' },
            { title: 'The Team', path: '/admin/aslam-house/the-team' },
            { title: 'Careers', path: '/admin/aslam-house/careers' },
            { title: 'Our Artist', path: '/admin/aslam-house/our-artist' },
            { title: 'Our Clients', path: '/admin/aslam-house/our-clients' },

            { title: 'Manage Hover', path: '/admin/pages/aslam-house' },
          ]
        },
        {
          title: 'Projects Nav',
          key: 'projectsNav',
          isNested: true,
          submenu: [
            { title: 'Communal', path: '/admin/aslam-house/communal-projects' },
            { title: 'Residential', path: '/admin/projects/residential' },
            { title: 'International', path: '/admin/projects/international' },
            { title: 'Manage Hover', path: '/admin/pages/projects-nav' },
          ]
        },
        {
          title: 'Our Creations Nav',
          key: 'ourCreationsNav',
          isNested: true,
          submenu: [
            { title: 'Pooja Rooms', path: '/admin/content/pooja-room' },
            { title: 'Dream Temples', path: '/admin/content/dream-temple' },
            { title: 'Murti', path: '/admin/content/murtis' },
            { title: 'Home Decor', path: '/admin/content/home-decor' },
            { title: 'Communal Temples', path: '/admin/category/communal-temples' },
            { title: 'Jain Temples', path: '/admin/category/jain-temples' },
            { title: 'On Sale', path: '/admin/content/special-collections?tab=on-sale' },
            { title: 'Limited Edition', path: '/admin/content/special-collections?tab=limited-edition' },
            { title: 'Manage Hover', path: '/admin/pages/our-creations-nav' }
          ]
        },
        {
          title: 'Our Services Nav',
          key: 'ourServicesNav',
          isNested: true,
          submenu: [
            { title: 'Design Hub', path: '/admin/our-services/design-hub' },
            { title: 'International', path: '/admin/our-services/international' },
            { title: 'Manage Hover', path: '/admin/pages/our-services-nav' }
          ]
        },
        {
          title: 'Our Products Nav',
          key: 'ourProductsNav',
          isNested: true,
          submenu: [
            { title: 'Our Products', path: '/admin/products/stone-pages' },
            { title: 'Manage Hover', path: '/admin/pages/our-products-nav' }
          ]
        }
      ]
    },
    {
      title: 'Settings',
      key: 'settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      path: '/admin/settings'
    }
  ]

  const isActive = (path) => {
    return location.pathname + location.search === path || (location.pathname === path.split('?')[0] && !path.includes('?')) || (path.includes('?') && (location.pathname + location.search).includes(path))
  }

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }))
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 h-full flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `} style={{ backgroundColor: '#8B7355', borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}>
        {/* Header */}
        <div className="p-2 lg:p-3 border-b flex-shrink-0 flex items-center justify-center relative" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-center w-full">
            <img
              src={logoImage}
              alt="Logo"
              className="h-24 lg:h-28 w-auto object-contain max-w-full"
            />
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-2 right-2 text-white hover:opacity-80 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-2 lg:p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.key)}
                      className="w-full flex items-center justify-between gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm font-semibold text-white uppercase tracking-wider rounded-lg transition-colors"
                      style={{
                        backgroundColor: expandedMenus[item.key] ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                        ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                      }}
                      onMouseEnter={(e) => {
                        if (!expandedMenus[item.key]) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!expandedMenus[item.key]) {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${expandedMenus[item.key] ? 'rotate-180' : ''
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedMenus[item.key] && (
                      <ul className="ml-2 lg:ml-4 mt-1 space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            {subItem.submenu ? (
                              <div>
                                <button
                                  onClick={() => toggleMenu(subItem.key)}
                                  className="w-full flex items-center justify-between gap-2 lg:gap-3 px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm rounded-lg transition-colors text-white hover:bg-white/10"
                                  style={{
                                    backgroundColor: expandedMenus[subItem.key] ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                  }}
                                >
                                  <span>{subItem.title}</span>
                                  <svg
                                    className={`w-3 h-3 transition-transform duration-200 ${expandedMenus[subItem.key] ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {expandedMenus[subItem.key] && (
                                  <ul className="ml-4 mt-1 space-y-1 border-l border-white/10">
                                    {subItem.submenu.map((nestedItem, nestedIndex) => (
                                      <li key={nestedIndex}>
                                        <Link
                                          to={nestedItem.path}
                                          onClick={onClose}
                                          className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-1 lg:py-1.5 text-xs lg:text-[13px] rounded-lg transition-colors ${isActive(nestedItem.path)
                                            ? 'text-white font-medium bg-white/20'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                            }`}
                                        >
                                          {nestedItem.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ) : (
                              <Link
                                to={subItem.path}
                                onClick={onClose}
                                className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm rounded-lg transition-colors ${isActive(subItem.path)
                                  ? 'text-white font-medium bg-white/20'
                                  : 'text-white hover:bg-white/10'
                                  }`}
                              >
                                {subItem.title}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm font-medium rounded-lg transition-colors ${isActive(item.path)
                      ? 'text-white'
                      : 'text-white hover:bg-white/10'
                      }`}
                    style={isActive(item.path) ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : { opacity: 0.9 }}
                    onMouseEnter={(e) => {
                      if (!isActive(item.path)) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.path)) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 lg:p-4 border-t flex-shrink-0" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2 text-xs lg:text-sm text-white hover:opacity-80 transition-opacity"
            style={{ opacity: 0.9 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back to Website</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar

