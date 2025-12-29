import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import homeDecorImg from '../../../assets/ourcreation/homedecor.jpeg'

const HomeDecorPage = ({ onShowCart, onShowLikes }) => {
  const navigate = useNavigate()
  const [furnitureCategories, setFurnitureCategories] = useState([])
  const [decorCategories, setDecorCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/home-decor/hierarchy`)
        const result = await res.json()
        if (result.success) {
          const groups = result.data
          const furniture = groups.find(g => g.name === 'Furniture')?.categories || []
          const accents = groups.find(g => g.name === 'Home Accents')?.categories || []

          setFurnitureCategories(furniture)
          setDecorCategories(accents)
        }
      } catch (error) {
        console.error('Error fetching home decor data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleCategoryClick = (category, type) => {
    // Navigate using ID or generated slug
    const path = category.id || category.name.toLowerCase().replace(/\s+/g, '-')
    const basePath = type === 'decor' ? 'home-decor' : type
    // Note: The original code distinguished 'furniture' vs 'home-decor' in URL
    // We can keep that if we want, or unify. 
    // Existing routes: /furniture/:categoryId and /home-decor/:categoryId
    navigate(`/${basePath}/${path}`)
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

      {/* Hero Banner */}
      <div className="relative w-full overflow-hidden" style={{ height: '450px' }}>
        <img
          src={homeDecorImg}
          alt="Home Decor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif text-white italic mb-4 font-bold drop-shadow-lg">
            Home Decor & Furniture
          </h1>
          <div className="w-24 h-1 bg-white mx-auto rounded-full mb-6"></div>
          <p className="text-white text-lg md:text-xl max-w-2xl drop-shadow-md">
            Elevate your living space with our handcrafted collection of premium marble furniture and decorative accents.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#8B7355]"></div>
        </div>
      ) : (
        <>
          {/* Shop Furniture Section */}
          {furnitureCategories.length > 0 && (
            <div className="w-full py-16 px-4 md:px-6 lg:px-8 bg-white">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif text-[#8B7355] italic mb-4 font-bold">Shop Furniture</h2>
                  <div className="w-20 h-1 bg-[#8B7355]/20 mx-auto"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {furnitureCategories.map((category) => (
                    <div
                      key={category._id}
                      onClick={() => handleCategoryClick(category, 'furniture')}
                      className="group cursor-pointer relative aspect-[3/4] overflow-hidden rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <img
                        src={category.heroSection?.image?.url || 'https://via.placeholder.com/400?text=No+Image'}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                        <h3 className="text-white text-lg font-bold uppercase tracking-wider">{category.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Shop Decor Section */}
          {decorCategories.length > 0 && (
            <div className="w-full py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif text-[#8B7355] italic mb-4 font-bold">Home Accents</h2>
                  <div className="w-20 h-1 bg-[#8B7355]/20 mx-auto"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {decorCategories.map((category) => (
                    <div
                      key={category._id}
                      onClick={() => handleCategoryClick(category, 'decor')}
                      className="group cursor-pointer relative aspect-[3/4] overflow-hidden rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <img
                        src={category.heroSection?.image?.url || 'https://via.placeholder.com/400?text=No+Image'}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                        <h3 className="text-white text-lg font-bold uppercase tracking-wider">{category.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default HomeDecorPage
