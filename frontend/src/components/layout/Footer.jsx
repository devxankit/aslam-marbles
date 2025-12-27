import { Link } from 'react-router-dom'
import { COMPANY_INFO, FOOTER_LINKS, INDIAN_CITIES, INTERNATIONAL_CITIES } from '../../utils/constants'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-black via-gray-900 to-black text-white mt-auto">
      {/* Upper Section */}
      <div className="w-full px-4 md:px-8 lg:px-12 py-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6 lg:gap-12">
            {/* Leftmost Column - Logo and Contact */}
            <div className="col-span-2 lg:col-span-1 flex flex-col items-center justify-center text-center lg:items-start lg:justify-start lg:text-left">
              <div className="mb-0 flex justify-center lg:justify-start w-full lg:-ml-20 -mt-12">
                <Logo />
              </div>
              <h3 className="text-[10px] md:text-sm lg:text-lg font-bold uppercase mb-2 text-[#8B7355] text-center lg:text-left lg:-ml-20 -mt-6">{COMPANY_INFO.name}</h3>
              <div className="space-y-0.5 md:space-y-1 lg:space-y-1 w-full flex flex-col items-center lg:items-start lg:-ml-20">
                <div className="flex items-start gap-1.5 md:gap-2 justify-center lg:justify-start">
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 mt-0.5 text-[#8B7355] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-[9px] md:text-xs lg:text-sm leading-tight text-gray-300 text-center lg:text-left">
                    {COMPANY_INFO.address}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 justify-center lg:justify-start">
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-[#8B7355] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-[9px] md:text-xs lg:text-sm text-gray-300 hover:text-[#8B7355] transition-colors truncate text-center lg:text-left">
                    {COMPANY_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 justify-center lg:justify-start">
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-[#8B7355] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-[9px] md:text-xs lg:text-sm text-gray-300 hover:text-[#8B7355] transition-colors text-center lg:text-left">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* QUICK LINKS Column */}
            <div>
              <h3 className="text-[11px] md:text-base lg:text-xl font-bold uppercase mb-1.5 md:mb-3 lg:mb-4 text-[#8B7355] border-b border-[#8B7355]/30 pb-1 md:pb-2">QUICK LINKS</h3>
              <ul className="space-y-0.5 md:space-y-1 lg:space-y-2">
                {FOOTER_LINKS.quickLinks.slice(0, 5).map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="text-[10px] md:text-xs lg:text-base text-gray-300 hover:text-[#8B7355] transition-all duration-300 flex items-center gap-1.5 md:gap-2 group leading-tight">
                      <span className="w-1 h-1 bg-[#8B7355] rounded-full opacity-0 group-hover:opacity-100"></span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SERVICES Column */}
            <div>
              <h3 className="text-[11px] md:text-base lg:text-xl font-bold uppercase mb-1.5 md:mb-3 lg:mb-4 text-[#8B7355] border-b border-[#8B7355]/30 pb-1 md:pb-2">SERVICES</h3>
              <ul className="space-y-0.5 md:space-y-1 lg:space-y-2">
                {FOOTER_LINKS.houseOfTilak.slice(0, 5).map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="text-[10px] md:text-xs lg:text-base text-gray-300 hover:text-[#8B7355] transition-all duration-300 flex items-center gap-1.5 md:gap-2 group leading-tight">
                      <span className="w-1 h-1 bg-[#8B7355] rounded-full opacity-0 group-hover:opacity-100"></span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LEGAL Column */}
            <div>
              <h3 className="text-[11px] md:text-base lg:text-xl font-bold uppercase mb-1.5 md:mb-3 lg:mb-4 text-[#8B7355] border-b border-[#8B7355]/30 pb-1 md:pb-2">LEGAL</h3>
              <ul className="space-y-0.5 md:space-y-1 lg:space-y-2">
                {FOOTER_LINKS.legal.slice(0, 5).map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="text-[10px] md:text-xs lg:text-base text-gray-300 hover:text-[#8B7355] transition-all duration-300 flex items-center gap-1.5 md:gap-2 group leading-tight">
                      <span className="w-1 h-1 bg-[#8B7355] rounded-full opacity-0 group-hover:opacity-100"></span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SOCIALS Column */}
            <div className="col-span-1 border-t border-gray-800 lg:border-none pt-2 md:pt-4 lg:pt-0">
              <h3 className="text-[11px] md:text-base lg:text-xl font-bold uppercase mb-1.5 md:mb-3 lg:mb-4 text-[#8B7355] border-b border-[#8B7355]/30 pb-1 md:pb-2">CONNECT</h3>
              <div className="flex items-center gap-2 md:gap-2.5 lg:gap-3">
                {/* Social Icons - Very compact */}
                <a href="https://www.facebook.com/share/1BvePFux9x/" target="_blank" rel="noopener noreferrer" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B7355] transition-all">
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://www.instagram.com/aslammarblesuppliers1?igsh=MWRhbmtpZjJleHR5aA==" target="_blank" rel="noopener noreferrer" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B7355] transition-all">
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/aslam-marble-suppliers-180ab4a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B7355] transition-all">
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="https://x.com/mohamme8519925?t=2kQUrmca_0xHJYO3mKPNIg&s=08" target="_blank" rel="noopener noreferrer" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B7355] transition-all">
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section - Ultra Compact Locations */}
      <div className="w-full px-2 md:px-8 lg:px-12 py-4 border-t border-gray-800 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start">
            {/* LOCATIONS Section */}
            <div className="bg-gray-800/20 p-3 rounded-lg border border-gray-700/30 max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-[#8B7355]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-xs md:text-sm font-bold uppercase text-[#8B7355]">LOCATIONS</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] md:text-sm mb-1 font-semibold text-gray-400">Across India:</p>
                  <div className="text-[9px] md:text-sm text-gray-500 flex flex-wrap gap-2 md:gap-3 pb-1 mb-1">
                    {INDIAN_CITIES.map((city, index) => (
                      <Link
                        key={index}
                        to={`/location/${city.toLowerCase().replace(/\s+/g, '-')}`}
                        className="px-2 py-1 bg-gray-900/50 rounded hover:text-[#8B7355] transition-colors whitespace-nowrap border border-white/5"
                      >
                        {city}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full px-4 md:px-8 lg:px-12 py-4 border-t border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs md:text-sm text-center md:text-left text-gray-400">
              All Rights Reserved @2025 <span className="text-[#8B7355] font-semibold">Aslam Marble Suppliers</span>
            </p>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
              <span>Made with</span>
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section - Footer SEO Content */}
      <FooterContent />
    </footer>
  )
}

const FooterContent = () => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8 border-t border-gray-800 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-5xl mx-auto text-white">
        {/* Welcome Section */}
        <div className="mb-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 text-center md:text-left">
            Marble Temples for Home – Welcome to Aslam Marble Suppliers
          </h1>
          <p className="text-xs md:text-sm leading-relaxed text-gray-300">
            At Aslam Marble Suppliers, we offer a remarkable variety of marble temples for home, created with contemporary craftsmanship that beautifully enhances the charm of traditional home décor.
          </p>
        </div>

        {/* Temple Types */}
        <div className="space-y-3 mb-4">
          <div className="bg-gray-800/50 p-3 rounded-lg border-l-4 border-[#8B7355]">
            <h2 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">Large Marble Temple for Home</h2>
            <p className="text-xs md:text-sm leading-relaxed text-gray-300">
              Our large marble temple collection is designed to be a magnificent spiritual focal point for spacious homes. These temples act as impressive shrines that elevate the devotion and elegance of any space.
            </p>
          </div>

          <div className="bg-gray-800/50 p-3 rounded-lg border-l-4 border-[#8B7355]">
            <h2 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">Stone Temple for Home</h2>
            <p className="text-xs md:text-sm leading-relaxed text-gray-300">
              This thoughtfully handcrafted stone temple blends durability with aesthetic appeal, bringing a classic touch of traditional artistry into your living environment.
            </p>
          </div>

          <div className="bg-gray-800/50 p-3 rounded-lg border-l-4 border-[#8B7355]">
            <h2 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">Custom Marble Temple for Home</h2>
            <p className="text-xs md:text-sm leading-relaxed text-gray-300">
              Our customized Hindu temple designs for home allow you to tailor your puja area based on your unique space and personal preferences, creating a truly personalized and meaningful worship experience.
            </p>
          </div>

          <div className="bg-gray-800/50 p-3 rounded-lg border-l-4 border-[#8B7355]">
            <h2 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">Jain Marble Temple for Home</h2>
            <p className="text-xs md:text-sm leading-relaxed text-gray-300">
              A seamless fusion of grace and devotion, our Jain Marble Temples reflect traditional Jain architectural elements while fulfilling essential spiritual needs within your home.
            </p>
          </div>

          <div className="bg-gray-800/50 p-3 rounded-lg border-l-4 border-[#8B7355]">
            <h2 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">Readymade Temple for Home</h2>
            <p className="text-xs md:text-sm leading-relaxed text-gray-300">
              Our ready-to-install marble temples provide both beauty and convenience, allowing you to effortlessly set up a serene and sacred corner in your home.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-4">
          <h2 className="text-base md:text-lg font-bold mb-2 text-center md:text-left">Key Features of Our Temples</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-gray-800/30 p-3 rounded-lg">
              <h3 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">Spiritual Ambience</h3>
              <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                We take exceptional care to ensure that each temple radiates a peaceful and uplifting atmosphere, ideal for prayer and meditation — especially in our big-size marble temples for home.
              </p>
            </div>
            <div className="bg-gray-800/30 p-3 rounded-lg">
              <h3 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">Customization Options</h3>
              <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                From simple and minimal designs to intricate and grand Hindu temple layouts, we provide complete customization based on your specific requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Popular Choices */}
        <div className="mb-4">
          <h2 className="text-base md:text-lg font-bold mb-2 text-center md:text-left">Popular Choices</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-gray-800/30 p-3 rounded-lg">
              <h3 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">White Marble Mandir for Home</h3>
              <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                The pure white design exudes simplicity, calmness, and elegance, making it a perfect match for any modern or traditional home.
              </p>
            </div>
            <div className="bg-gray-800/30 p-3 rounded-lg">
              <h3 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">Big Mandir for Home</h3>
              <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                A bold and striking option, our large marble mandirs add an element of grandeur and joyful charm to more open and expressive spaces.
              </p>
            </div>
            <div className="bg-gray-800/30 p-3 rounded-lg">
              <h3 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">Marble Mandir for Home</h3>
              <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                A seamless blend of traditional and contemporary aesthetics, our marble mandirs are ideal for daily worship and effortless home décor integration.
              </p>
            </div>
            <div className="bg-gray-800/30 p-3 rounded-lg">
              <h3 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">Luxury Marble Mandir for Home</h3>
              <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                For those seeking true magnificence, our premium marble temples create a stunning and deeply meditative environment within the home.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Aslam Marble Suppliers */}
        <div className="mb-4">
          <h2 className="text-base md:text-lg font-bold mb-2 text-center md:text-left">Why Choose Aslam Marble Suppliers?</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-gray-800/30 p-3 rounded-lg text-center">
              <h3 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">Exceptional Craftsmanship</h3>
              <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                Every temple is crafted with precision and dedication, ensuring premium quality and exquisite detailing that consistently exceeds expectations.
              </p>
            </div>
            <div className="bg-gray-800/30 p-3 rounded-lg text-center">
              <h3 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">Extensive Collection</h3>
              <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                Whether you're looking for a simple home temple, a stone mandir, or a luxury marble shrine, we offer a complete range to match every style and need.
              </p>
            </div>
            <div className="bg-gray-800/30 p-3 rounded-lg text-center">
              <h3 className="text-sm md:text-base font-bold mb-1 text-[#8B7355]">Traditional Meets Modern</h3>
              <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                Our designs strike the perfect balance between timeless spirituality and modern elegance, making each temple an artistic and meaningful addition to your home.
              </p>
            </div>
          </div>
        </div>

        {/* Find Your Perfect Temple */}
        <div className="mb-4 bg-gradient-to-r from-[#8B7355]/20 to-transparent p-3 rounded-lg border border-[#8B7355]/30">
          <h2 className="text-base md:text-lg font-bold mb-2 text-center md:text-left">Find Your Perfect Temple</h2>
          <p className="text-xs md:text-sm leading-relaxed text-gray-300">
            Aslam Marble Suppliers offers one of the widest selections of marble pooja mandirs, from compact designs to grand home temple masterpieces. Whether you prefer a minimalistic home mandir or an elaborate marble structure, we have the ideal temple to elevate your sacred space. Explore our collection today and transform your home into a haven of serenity and devotion.
          </p>
        </div>

        {/* Discover Timeless Elegance */}
        <div className="mb-4">
          <h2 className="text-base md:text-lg font-bold mb-2 text-center md:text-left">
            Discover Timeless Elegance: Handcrafted Marble Temples for Your Sacred Space
          </h2>
        </div>

        {/* Finding the Perfect Marble Mandir Online */}
        <div className="mb-4 bg-gray-800/30 p-3 rounded-lg">
          <h2 className="text-sm md:text-base font-bold mb-2 text-[#8B7355]">Finding the Perfect Marble Mandir Online</h2>
          <p className="text-xs md:text-sm leading-relaxed text-gray-300 mb-2">
            Searching for the ideal marble mandir online can be overwhelming, with so many options that don't always deliver the quality your sacred corner deserves.
          </p>
          <p className="text-xs md:text-sm leading-relaxed text-gray-300">
            When choosing a luxury marble temple, details matter — from carving precision and stone purity to the overall thoughtful craftsmanship — all of which help create a truly divine atmosphere at home.
          </p>
        </div>

        {/* Why Choose the Best Marble Temple Manufacturer */}
        <div className="mb-4 bg-gray-800/30 p-3 rounded-lg">
          <h2 className="text-sm md:text-base font-bold mb-2 text-[#8B7355]">Why Choose the Best Marble Temple Manufacturer</h2>
          <p className="text-xs md:text-sm leading-relaxed text-gray-300 mb-2">
            Not all manufacturers maintain the same commitment to excellence. The difference is seen in craftsmanship, material selection, and the balance between traditional carving and modern design.
          </p>
          <p className="text-xs md:text-sm leading-relaxed text-gray-300 mb-2">
            A top marble temple manufacturer combines age-old artisan techniques with advanced methods, ensuring each piece honors spiritual heritage while complementing contemporary interiors.
          </p>
          <p className="text-xs md:text-sm leading-relaxed text-gray-300">
            Every temple is shaped by skilled artisans with years of experience, ensuring flawless detailing and exceptional quality.
          </p>
        </div>

        {/* Convenient Pooja Mandir Online Shopping */}
        <div className="mb-4 bg-gray-800/30 p-3 rounded-lg">
          <h2 className="text-sm md:text-base font-bold mb-2 text-[#8B7355]">Convenient Pooja Mandir Online Shopping</h2>
          <p className="text-xs md:text-sm leading-relaxed text-gray-300 mb-2">
            Choosing your marble temple should be a meaningful experience. Shopping online allows you to explore numerous designs at your comfort.
          </p>
          <p className="text-xs md:text-sm leading-relaxed text-gray-300 mb-2">
            With clear images and detailed descriptions, you can confidently select a temple that suits your space, taste, and spiritual needs.
          </p>
          <p className="text-xs md:text-sm leading-relaxed text-gray-300">
            Online shopping makes it easy to bring home handcrafted masterpieces — whether you are in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, or anywhere in India or abroad.
          </p>
        </div>

        {/* Sacred Artistry Delivered to Your Doorstep */}
        <div className="mb-4 bg-gradient-to-r from-[#8B7355]/20 to-transparent p-3 rounded-lg border border-[#8B7355]/30">
          <h2 className="text-sm md:text-base font-bold mb-2 text-[#8B7355]">Sacred Artistry Delivered to Your Doorstep</h2>
          <p className="text-xs md:text-sm leading-relaxed text-gray-300 mb-2">
            Each marble mandir is more than a beautifully carved product — it's a symbol of devotion transformed into art. India's marble temple-making heritage spans generations, carried forward by artisans who dedicate their lives to this sacred craft.
          </p>
          <p className="text-xs md:text-sm leading-relaxed text-gray-300">
            From compact apartments to large villas, there's a perfect temple for every home — designed to create a peaceful, devotional atmosphere for your daily worship.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer

