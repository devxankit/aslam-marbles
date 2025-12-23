import { memo, useState, useEffect } from 'react'
import { fetchTrustedByData } from '../../utils/trustedByUtils'
import clientLogo1 from '../../assets/house of marble/our client/icons/download.png'
import clientLogo2 from '../../assets/house of marble/our client/icons/download (1).png'
import clientLogo3 from '../../assets/house of marble/our client/icons/download (2).png'
import clientLogo4 from '../../assets/house of marble/our client/icons/download (3).png'
import clientLogo5 from '../../assets/house of marble/our client/icons/download (4).png'

// Fallback client logos array
const fallbackLogos = [
  { id: 1, image: clientLogo1, name: 'Client 1' },
  { id: 2, image: clientLogo2, name: 'Client 2' },
  { id: 3, image: clientLogo3, name: 'Client 3' },
  { id: 4, image: clientLogo4, name: 'Client 4' },
  { id: 5, image: clientLogo5, name: 'Client 5' }
]

const TrustedBySection = memo(() => {
  const [heading, setHeading] = useState('Trusted By')
  const [clientLogos, setClientLogos] = useState(fallbackLogos)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrustedByData = async () => {
      try {
        const data = await fetchTrustedByData()
        if (data) {
          setHeading(data.heading || 'Trusted By')

          if (data.companies && data.companies.length > 0) {
            // Sort by order and map to required format
            const formattedLogos = data.companies
              .sort((a, b) => a.order - b.order)
              .map((company) => ({
                id: company._id,
                image: company.logo.url,
                name: company.name
              }))
            setClientLogos(formattedLogos)
          }
        }
      } catch (error) {
        console.error('Error loading trusted by data:', error)
        // Keep fallback logos if API fails
      } finally {
        setLoading(false)
      }
    }

    loadTrustedByData()
  }, [])

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-white overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-48 h-48 bg-[#8B7355] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#8B7355] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Section Title */}
        <div className="text-center mb-6 md:mb-8 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic mb-3">
            {heading}
          </h2>
          <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#8B7355' }}></div>
        </div>

        {/* Scrolling Logos Container - Full Width */}
        <div className="relative w-full overflow-hidden">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="flex gap-6 md:gap-8 lg:gap-10 animate-scroll-right-to-left">
              {/* Duplicate logos for seamless loop */}
              {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center group"
                >
                  <div className="relative p-2 transition-all duration-500 hover:scale-110">
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain transition-all duration-500 group-hover:brightness-110 filter grayscale hover:grayscale-0"
                      loading="lazy"
                    />
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-[#8B7355]/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
})

TrustedBySection.displayName = 'TrustedBySection'

export default TrustedBySection

