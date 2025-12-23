import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { homeImages } from '../../data/homeImages'
import { fetchAslamHouseItems, buildImageUrl } from '../../utils/aslamHouseUtils'

const HomeImagesSection = () => {
  const navigate = useNavigate()
  const [navItems, setNavItems] = useState(homeImages)

  const handleVisitStoreClick = () => {
    navigate('/visit-store')
  }

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

  // Find only the visit store image
  const visitStoreImage = navItems.find(item => (item.id || item.key) === 'visit-store')

  return (
    <section className="w-full bg-white py-8 md:py-12">
      <div className="w-full mx-auto">
        {visitStoreImage && (
          <div className="relative w-full">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/1', height: '60vh', maxHeight: '650px' }}>
              <img
                src={visitStoreImage.image}
                alt={visitStoreImage.name}
                className="w-full h-full object-cover object-center"
                style={{ objectPosition: 'center center' }}
              />
              {visitStoreImage.hasButton && (
                <button
                  onClick={handleVisitStoreClick}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#8B7355] text-white px-6 py-3 md:px-8 md:py-4 text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wide rounded hover:bg-[#6B5A42] transition-all duration-300 shadow-lg hover:shadow-xl z-10"
                >
                  {visitStoreImage.name}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default HomeImagesSection

