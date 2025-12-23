import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DreamMurtisDropdown = () => {
  const [hierarchy, setHierarchy] = useState([])
  const [loading, setLoading] = useState(true)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    const fetchHierarchy = async () => {
      try {
        const res = await fetch(`${API_URL}/murtis/hierarchy`)
        const result = await res.json()
        if (result.success) {
          setHierarchy(result.data)
        }
      } catch (error) {
        console.error('Error fetching murti hierarchy:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchHierarchy()
  }, [])

  if (loading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8B7355]"></div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex items-start py-6">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(hierarchy.length, 4)} gap-8 md:gap-12`}>
          {hierarchy.map((group) => (
            <div key={group._id} className="animate-fadeIn">
              <h3 className="font-bold text-gray-900 mb-5 text-sm md:text-base uppercase tracking-widest border-b border-gray-100 pb-2">
                {group.name}
              </h3>
              <ul className="space-y-2.5">
                {group.categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      to={`/murti/${category.id}`}
                      className="text-gray-600 hover:text-[#8B7355] transition-all duration-300 text-xs md:text-sm font-medium hover:pl-1 block"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DreamMurtisDropdown

