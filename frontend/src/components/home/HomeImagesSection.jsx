import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { homeImages } from '../../data/homeImages'
import { fetchAslamHouseItems, buildImageUrl } from '../../utils/aslamHouseUtils'
import LazyImage from '../common/LazyImage'

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
    <section className="w-full bg-white py-8 md:py-16">
      <div className="w-full mx-auto">
        {visitStoreImage && (
          <div className="relative w-full">
            <div
              className="relative w-full overflow-hidden shadow-2xl"
              style={{ minHeight: '200px' }}
            >
              <picture>
                <LazyImage
                  src={visitStoreImage.image}
                  alt={visitStoreImage.name}
                  className="w-full h-40 sm:h-[50vh] md:h-[60vh] lg:h-[70vh]"
                  imageClassName="w-full h-full object-cover object-center transform transition-transform duration-[2s] hover:scale-105"
                />
              </picture>

              <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center p-2 text-center">
                {visitStoreImage.hasButton && (
                  <button
                    onClick={handleVisitStoreClick}
                    className="group relative bg-[#8B7355] text-white px-4 md:px-12 py-2.5 md:py-5 text-[10px] md:text-lg font-bold uppercase tracking-[0.15em] rounded-full hover:bg-white hover:text-[#8B7355] transition-all duration-500 shadow-xl z-10 active:scale-95"
                  >
                    <span className="relative z-10">{visitStoreImage.name}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default HomeImagesSection

