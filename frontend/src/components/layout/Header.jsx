// import { Link, useLocation } from "react-router-dom";
// import logoImage from "../../assets/logo/download.png";
// import { useState } from "react";

// const Header = ({
//   variant = "default",
//   onShowSidebar,
//   onShowProjects,
//   onShowCreations,
//   onShowServices,
// }) => {
//   const location = useLocation();
//   const [open, setOpen] = useState(false);

//   const isLocationPage =
//     variant === "location" || location.pathname === "/location";

//   const linkClass = `
//     relative pb-[3px] 
//     text-[12px] md:text-[13px] lg:text-[14px] 
//     tracking-wide uppercase text-black 
//     hover:text-[#8B8B5C] transition group
//   `;

//   return (
//     <header
//       className={`sticky top-0 z-[200] w-full ${
//         isLocationPage ? "bg-[#fffbf0]" : "bg-white"
//       } shadow`}
//     >
//       <div className="w-full flex justify-center px-3 md:px-6">
//         <nav className="w-full max-w-[1500px]">
//           {/* Desktop Navbar */}
//           <ul className="hidden lg:flex items-center justify-between py-3">
//             {/* LEFT LINKS */}
//             <li>
//               <div className="flex items-center gap-6">
//                 <button onClick={onShowSidebar} className={linkClass}>
//                   HOUSE OF TILAK
//                   <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#8B8B5C] transition-all duration-300 group-hover:w-full"></span>
//                 </button>

//                 <button onClick={onShowProjects} className={linkClass}>
//                   PROJECTS
//                   <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#8B8B5C] transition-all duration-300 group-hover:w-full"></span>
//                 </button>

//                 <button onClick={onShowCreations} className={linkClass}>
//                   OUR CREATIONS
//                   <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#8B8B5C] transition-all duration-300 group-hover:w-full"></span>
//                 </button>

//                 <button onClick={onShowServices} className={linkClass}>
//                   OUR SERVICES
//                   <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#8B8B5C] transition-all duration-300 group-hover:w-full"></span>
//                 </button>
//               </div>
//             </li>

//             {/* LOGO */}
//             <li className="flex-shrink-0 px-4">
//               <Link to="/" className="block hover:opacity-80">
//                 <img
//                   src={logoImage}
//                   alt="Logo"
//                   className="h-24 md:h-28 lg:h-32 xl:h-36 object-contain"
//                 />
//               </Link>
//             </li>

//             {/* RIGHT LINKS */}
//             <li>
//               <div className="flex items-center gap-6">
//                 <Link to="/how-it-works" className={linkClass}>
//                   HOW IT WORKS
//                   <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#8B8B5C] transition-all duration-300 group-hover:w-full"></span>
//                 </Link>

//                 <Link to="/location" className={linkClass}>
//                   LOCATION
//                   <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#8B8B5C] transition-all duration-300 group-hover:w-full"></span>
//                 </Link>

//                 <Link to="/blog" className={linkClass}>
//                   BLOG
//                   <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#8B8B5C] transition-all duration-300 group-hover:w-full"></span>
//                 </Link>

//                 <Link to="/book-appointment" className={linkClass}>
//                   BOOK APPOINTMENT
//                   <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#8B8B5C] transition-all duration-300 group-hover:w-full"></span>
//                 </Link>

//                 <Link to="/testimonials" className={linkClass}>
//                   TESTIMONIALS
//                   <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#8B8B5C] transition-all duration-300 group-hover:w-full"></span>
//                 </Link>
//               </div>
//             </li>
//           </ul>

//           {/* Mobile Nav Button */}
//           <div className="flex lg:hidden items-center justify-between py-3">
//             <Link to="/">
//               <img src={logoImage} alt="Logo" className="h-16 object-contain" />
//             </Link>

//             <button onClick={() => setOpen(!open)} className="text-3xl">
//               ☰
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {open && (
//             <div className="lg:hidden flex flex-col gap-4 pb-4">
//               <button onClick={onShowSidebar} className={linkClass}>
//                 HOUSE OF TILAK
//               </button>
//               <button onClick={onShowProjects} className={linkClass}>
//                 PROJECTS
//               </button>
//               <button onClick={onShowCreations} className={linkClass}>
//                 OUR CREATIONS
//               </button>
//               <button onClick={onShowServices} className={linkClass}>
//                 OUR SERVICES
//               </button>

//               <Link to="/how-it-works" className={linkClass}>
//                 HOW IT WORKS
//               </Link>
//               <Link to="/location" className={linkClass}>
//                 LOCATION
//               </Link>
//               <Link to="/blog" className={linkClass}>
//                 BLOG
//               </Link>
//               <Link to="/book-appointment" className={linkClass}>
//                 BOOK APPOINTMENT
//               </Link>
//               <Link to="/testimonials" className={linkClass}>
//                 TESTIMONIALS
//               </Link>
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;


import { Link } from "react-router-dom";
import logoImage from "../../assets/logo/download.png";
import { useState, useRef, useEffect } from "react";
import HouseOfTilakDropdown from "./HouseOfTilakDropdown";
import ProjectsDropdown from "./ProjectsDropdown";
import OurCreationsDropdown from "./OurCreationsDropdown";
import OurProductsDropdown from "./OurProductsDropdown";
import OurServicesDropdown from "./OurServicesDropdown";
import { useLanguage } from "../../contexts/LanguageContext";

const Header = ({
  variant = "default",
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowProducts,
}) => {
  const [open, setOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const [pendingDropdown, setPendingDropdown] = useState(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState(null);
  const timeoutRef = useRef(null);
  const { language, languages, changeLanguage, isChangingLanguage } = useLanguage();

  // Handle dropdown change with fade animation
  const handleDropdownChange = (newDropdown) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // If switching from one dropdown to another (different button)
    if (hoveredDropdown && hoveredDropdown !== newDropdown) {
      // First fade out the entire dropdown div
      setIsFading(true);

      // After fade out, change content and fade in
      timeoutRef.current = setTimeout(() => {
        setHoveredDropdown(newDropdown);

        // Small delay before fade in to ensure content is rendered
        setTimeout(() => {
          setIsFading(false);
          timeoutRef.current = null;
        }, 50);
      }, 300); // Wait for fade out animation (0.3s)
    } else if (!hoveredDropdown) {
      // Opening from closed state - direct open
      setIsFading(false);
      setHoveredDropdown(newDropdown);
    }
    // If same dropdown, do nothing
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isVideoOverlay = variant === "video-overlay";
  const isDropdownActive = hoveredDropdown !== null;

  // For video overlay: transparent initially, white when dropdown active
  const headerBg = isVideoOverlay
    ? (isDropdownActive ? 'bg-white shadow' : 'bg-transparent shadow-none')
    : 'bg-white shadow';

  // Text color: white initially on video overlay, black when dropdown active or normal
  const textColor = isVideoOverlay && !isDropdownActive
    ? 'text-white hover:text-gray-300'
    : 'text-black hover:text-[#8B8B5C]';

  const underlineColor = isVideoOverlay && !isDropdownActive
    ? 'bg-white'
    : 'bg-[#8B8B5C]';

  const linkClass = `
    relative 
    text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px]
    tracking-wide uppercase transition group whitespace-nowrap
    ${textColor}
  `;

  return (
    <header
      className={`sticky top-0 z-[200] w-full transition-all duration-300 ${headerBg}`}
    >
      {/* slightly tight vertical padding */}
      <div className="w-full flex justify-center px-3 md:px-6 py-[2px] relative">
        <nav className="w-full max-w-[1500px] relative">
          {/* Hover Wrapper - Wraps buttons and dropdown */}
          <div
            className="relative"
            onMouseLeave={() => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
              }
              setHoveredDropdown(null);
              setIsFading(false);
            }}
          >
            {/* Desktop Navbar (>= lg) */}
            <div className="hidden lg:grid lg:grid-cols-3 items-center w-full">
              {/* LEFT LINKS */}
              <div className="flex items-center gap-3 md:gap-4 lg:gap-5 justify-start">
                {/* ASLAM MARBLE SUPPLIERS */}
                <div
                  onMouseEnter={() => handleDropdownChange('house-of-tilak')}
                >
                  <button className={`${linkClass} py-2`}>
                    ASLAM MARBLE SUPPLIERS
                    <span className={`absolute left-0 bottom-0 h-[2px] w-0 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                  </button>
                </div>

                {/* PROJECTS */}
                <div
                  onMouseEnter={() => handleDropdownChange('projects')}
                >
                  <button className={`${linkClass} py-2`}>
                    PROJECTS
                    <span className={`absolute left-0 bottom-0 h-[2px] w-0 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                  </button>
                </div>

                {/* OUR CREATIONS */}
                <div
                  onMouseEnter={() => handleDropdownChange('our-creations')}
                >
                  <button className={`${linkClass} py-2`}>
                    OUR CREATIONS
                    <span className={`absolute left-0 bottom-0 h-[2px] w-0 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                  </button>
                </div>

                {/* OUR PRODUCTS */}
                <div
                  onMouseEnter={() => handleDropdownChange('our-products')}
                >
                  <button className={`${linkClass} py-2`}>
                    OUR PRODUCTS
                    <span className={`absolute left-0 bottom-0 h-[2px] w-0 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                  </button>
                </div>

                {/* OUR SERVICES */}
                <div
                  onMouseEnter={() => handleDropdownChange('our-services')}
                >
                  <button className={`${linkClass} py-2`}>
                    OUR SERVICES
                    <span className={`absolute left-0 bottom-0 h-[2px] w-0 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                  </button>
                </div>
              </div>

              {/* LOGO - Centered */}
              <div className="flex-shrink-0 flex justify-center px-4 xl:px-6">
                <Link to="/" className="block hover:opacity-80">
                  <img
                    src={logoImage}
                    alt="Logo"
                    className="h-20 md:h-24 lg:h-28 xl:h-32 object-contain mx-auto"
                  />
                </Link>
              </div>

              {/* RIGHT LINKS */}
              <div className="flex items-center gap-4 md:gap-5 lg:gap-6 xl:gap-7 justify-end pl-4 xl:pl-6">
                <Link to="/how-it-works" className={`${linkClass} py-2`}>
                  HOW IT WORKS
                  <span className={`absolute left-0 bottom-0 h-[2px] w-0 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                </Link>

                <Link to="/location" className={`${linkClass} py-2`}>
                  LOCATION
                  <span className={`absolute left-0 bottom-0 h-[2px] w-0 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                </Link>

                <Link to="/blog" className={`${linkClass} py-2`}>
                  BLOG
                  <span className={`absolute left-0 bottom-0 h-[2px] w-0 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                </Link>

                <Link to="/book-appointment" className={`${linkClass} py-2`}>
                  BOOK APPOINTMENT
                  <span className={`absolute left-0 bottom-0 h-[2px] w-0 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                </Link>

                <Link to="/testimonials" className={`${linkClass} py-2`}>
                  TESTIMONIALS
                  <span className={`absolute left-0 bottom-0 h-[2px] w-0 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                </Link>

                {/* Language Selector */}
                <div className="relative group ml-2">
                  <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    disabled={isChangingLanguage}
                    className={`
                      appearance-none bg-transparent border border-gray-300 rounded-full px-3 py-1 pr-8
                      text-[10px] uppercase font-medium focus:outline-none focus:border-[#8B8B5C]
                      ${textColor} cursor-pointer
                    `}
                    style={{ minWidth: '100px' }}
                  >
                    {Object.entries(languages).map(([code, { label, flag }]) => (
                      <option key={code} value={code} className="text-black bg-white">
                        {flag} {label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                  </div>
                  {isChangingLanguage && (
                    <div className="absolute top-full text-[9px] text-[#8B8B5C] w-full text-center mt-1">
                      Translating...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Shared Dropdown Container - Full Screen Width - Inside Hover Wrapper */}
            <div
              className={`absolute bg-white shadow-2xl transition-all duration-300 ease-in-out z-50 ${hoveredDropdown
                ? 'h-[350px] translate-y-0 pointer-events-auto overflow-hidden'
                : 'h-0 -translate-y-4 pointer-events-none overflow-hidden'
                }`}
              style={{
                left: '50%',
                transform: hoveredDropdown
                  ? 'translateX(-50%) translateY(0)'
                  : 'translateX(-50%) translateY(-16px)',
                width: '100vw',
                top: 'calc(100% - 2px)',
                opacity: isFading ? 0 : (hoveredDropdown ? 1 : 0),
                transition: 'opacity 0.3s ease-in-out, transform 0.5s ease-in-out, height 0.5s ease-in-out'
              }}
            >
              {/* Dropdown Content */}
              {hoveredDropdown && (
                <>
                  {hoveredDropdown === 'house-of-tilak' && <HouseOfTilakDropdown />}
                  {hoveredDropdown === 'projects' && <ProjectsDropdown />}
                  {hoveredDropdown === 'our-creations' && <OurCreationsDropdown />}
                  {hoveredDropdown === 'our-products' && <OurProductsDropdown />}
                  {hoveredDropdown === 'our-services' && <OurServicesDropdown />}
                </>
              )}
            </div>
          </div>

          {/* Mobile / Tablet Navbar (< lg) */}
          <div className="flex lg:hidden flex-col">
            {/* Top row: Logo + Hamburger Menu */}
            <div className="flex items-center justify-between py-2">
              <div className="flex-1 flex justify-center">
                <Link to="/" className="block">
                  <img
                    src={logoImage}
                    alt="Logo"
                    className="h-16 sm:h-20 md:h-24 object-contain"
                  />
                </Link>
              </div>

              <button
                onClick={() => setOpen(!open)}
                className={`ml-2 flex-shrink-0 transition-colors duration-300 p-2 ${isVideoOverlay && !isDropdownActive ? 'text-white' : 'text-black'}`}
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Sidebar Menu */}
            {open && (
              <>
                {/* Overlay */}
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-[199] lg:hidden"
                  onClick={() => setOpen(false)}
                ></div>

                {/* Sidebar */}
                <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[201] transform transition-transform duration-300 ease-in-out overflow-y-auto">
                  <div className="p-4">
                    {/* Close Button */}
                    <div className="flex justify-between items-center mb-6 pb-4 border-b">
                      <img
                        src={logoImage}
                        alt="Logo"
                        className="h-12 object-contain"
                      />
                      <button
                        onClick={() => setOpen(false)}
                        className="text-2xl text-gray-600 hover:text-black"
                        aria-label="Close Menu"
                      >
                        ×
                      </button>
                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col gap-2">
                      {/* ASLAM MARBLE SUPPLIERS - With Dropdown */}
                      <div className="border-b border-gray-100">
                        <button
                          onClick={() => setMobileExpandedMenu(mobileExpandedMenu === 'house-of-tilak' ? null : 'house-of-tilak')}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-wide text-gray-700 hover:bg-gray-100 hover:text-[#8B7355] rounded transition-colors"
                        >
                          <span>ASLAM MARBLE SUPPLIERS</span>
                          <svg
                            className={`w-5 h-5 transition-transform ${mobileExpandedMenu === 'house-of-tilak' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {mobileExpandedMenu === 'house-of-tilak' && (
                          <div className="bg-gray-50 px-4 py-2">
                            <Link to="/about-us" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">About Us</Link>
                            <Link to="/experience-centre" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Experience Centre</Link>
                            <Link to="/the-team" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">The Team</Link>
                            <Link to="/careers" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Careers</Link>
                            <Link to="/artist" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Our Artist</Link>
                            <Link to="/our-clients" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Our Clients</Link>
                          </div>
                        )}
                      </div>

                      {/* PROJECTS - With Dropdown */}
                      <div className="border-b border-gray-100">
                        <button
                          onClick={() => setMobileExpandedMenu(mobileExpandedMenu === 'projects' ? null : 'projects')}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-wide text-gray-700 hover:bg-gray-100 hover:text-[#8B7355] rounded transition-colors"
                        >
                          <span>PROJECTS</span>
                          <svg
                            className={`w-5 h-5 transition-transform ${mobileExpandedMenu === 'projects' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {mobileExpandedMenu === 'projects' && (
                          <div className="bg-gray-50 px-4 py-2">
                            <Link to="/communal-projects" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Communal</Link>
                            <Link to="/residential-projects" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Residential</Link>
                            <Link to="/international-projects" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">International</Link>
                          </div>
                        )}
                      </div>

                      {/* OUR CREATIONS - With Dropdown */}
                      <div className="border-b border-gray-100">
                        <button
                          onClick={() => setMobileExpandedMenu(mobileExpandedMenu === 'our-creations' ? null : 'our-creations')}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-wide text-gray-700 hover:bg-gray-100 hover:text-[#8B7355] rounded transition-colors"
                        >
                          <span>OUR CREATIONS</span>
                          <svg
                            className={`w-5 h-5 transition-transform ${mobileExpandedMenu === 'our-creations' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {mobileExpandedMenu === 'our-creations' && (
                          <div className="bg-gray-50 px-4 py-2">
                            <Link to="/pooja-room" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Pooja Rooms</Link>
                            <Link to="/dream-temple" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Dream Temples</Link>
                            <Link to="/murti" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Murti</Link>
                            <Link to="/murti#shop-home-decor" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Home Decor</Link>
                            <Link to="/communal-temples" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Communal Temples</Link>
                            <Link to="/jain-temples" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Jain Temples</Link>
                          </div>
                        )}
                      </div>

                      {/* OUR PRODUCTS - With Dropdown */}
                      <div className="border-b border-gray-100">
                        <button
                          onClick={() => setMobileExpandedMenu(mobileExpandedMenu === 'our-products' ? null : 'our-products')}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-wide text-gray-700 hover:bg-gray-100 hover:text-[#8B7355] rounded transition-colors"
                        >
                          <span>OUR PRODUCTS</span>
                          <svg
                            className={`w-5 h-5 transition-transform ${mobileExpandedMenu === 'our-products' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {mobileExpandedMenu === 'our-products' && (
                          <div className="bg-gray-50 px-4 py-2 max-h-64 overflow-y-auto">
                            <Link to="/products/sandstone" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Sandstone</Link>
                            <Link to="/products/limestone" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Limestone</Link>
                            <Link to="/products/marble" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Marble</Link>
                            <Link to="/products/granite" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Granite</Link>
                            <Link to="/products/slate" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Slate</Link>
                            <Link to="/products/quartzite" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Quartzite</Link>
                            <Link to="/products/pebble-stones" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Pebble Stones</Link>
                            <Link to="/products/cobble-stones" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Cobble Stones</Link>
                            <Link to="/products/stone-chips" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Stone Chips</Link>
                            <Link to="/products/natural-indian-stones" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">Natural Indian Stone</Link>
                          </div>
                        )}
                      </div>

                      {/* OUR SERVICES - With Dropdown */}
                      <div className="border-b border-gray-100">
                        <button
                          onClick={() => setMobileExpandedMenu(mobileExpandedMenu === 'our-services' ? null : 'our-services')}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-wide text-gray-700 hover:bg-gray-100 hover:text-[#8B7355] rounded transition-colors"
                        >
                          <span>OUR SERVICES</span>
                          <svg
                            className={`w-5 h-5 transition-transform ${mobileExpandedMenu === 'our-services' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {mobileExpandedMenu === 'our-services' && (
                          <div className="bg-gray-50 px-4 py-2">
                            <Link to="/services/ams-international" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">AMS International</Link>
                            <Link to="/services/ams-design-hub" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-white rounded">AMS Design Hub</Link>
                          </div>
                        )}
                      </div>

                      <Link
                        to="/how-it-works"
                        onClick={() => setOpen(false)}
                        className="text-left px-4 py-3 text-sm font-medium uppercase tracking-wide text-gray-700 hover:bg-gray-100 hover:text-[#8B7355] rounded transition-colors"
                      >
                        HOW IT WORKS
                      </Link>
                      <Link
                        to="/location"
                        onClick={() => setOpen(false)}
                        className="text-left px-4 py-3 text-sm font-medium uppercase tracking-wide text-gray-700 hover:bg-gray-100 hover:text-[#8B7355] rounded transition-colors"
                      >
                        LOCATION
                      </Link>
                      <Link
                        to="/blog"
                        onClick={() => setOpen(false)}
                        className="text-left px-4 py-3 text-sm font-medium uppercase tracking-wide text-gray-700 hover:bg-gray-100 hover:text-[#8B7355] rounded transition-colors"
                      >
                        BLOG
                      </Link>
                      <Link
                        to="/book-appointment"
                        onClick={() => setOpen(false)}
                        className="text-left px-4 py-3 text-sm font-medium uppercase tracking-wide text-gray-700 hover:bg-gray-100 hover:text-[#8B7355] rounded transition-colors"
                      >
                        BOOK APPOINTMENT
                      </Link>
                      <Link
                        to="/testimonials"
                        onClick={() => setOpen(false)}
                        className="text-left px-4 py-3 text-sm font-medium uppercase tracking-wide text-gray-700 hover:bg-gray-100 hover:text-[#8B7355] rounded transition-colors"
                      >
                        TESTIMONIALS
                      </Link>

                      {/* Mobile Language Selector */}
                      <div className="px-4 py-3 border-t border-gray-100 mt-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Language</label>
                        <select
                          value={language}
                          onChange={(e) => {
                            changeLanguage(e.target.value);
                            setOpen(false);
                          }}
                          className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#8B8B5C]"
                        >
                          {Object.entries(languages).map(([code, { label, flag }]) => (
                            <option key={code} value={code}>
                              {flag} {label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>
      </div >
    </header >
  );
};

export default Header;