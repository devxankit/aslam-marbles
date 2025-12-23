import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ourCreations, categories } from '../../data/creations'

const OurCreationsModal = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('Pooja Rooms')

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[110] transition-opacity"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-lg shadow-2xl max-w-[95vw] w-full max-h-[90vh] overflow-hidden pointer-events-auto transform transition-all duration-500 ease-out"
          style={{ animation: 'slideUp 0.5s ease-out' }}
        >
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black">OUR CREATIONS</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-3xl font-bold transition-colors w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col h-auto max-h-[70vh] overflow-y-auto py-8">
            {/* Centered Menu Links */}
            <div className="w-full max-w-md mx-auto px-6">
              <nav className="flex flex-col gap-2">
                {categories.map((category, index) => {
                  let path = '#'
                  if (category === 'Murti') path = '/murti'
                  else if (category === 'Dream Temples') path = '/dream-temple'
                  else if (category === 'Pooja Rooms') path = '/pooja-room'
                  else if (category === 'Home Decor') path = '/murti#shop-home-decor'
                  else if (category === 'Communal Temples') path = '/communal-temples'
                  else if (category === 'Jain Temples') path = '/jain-temples'

                  return (
                    <div key={index} className="w-full">
                      <Link
                        to={path}
                        onClick={onClose}
                        className="block w-full text-center px-6 py-4 rounded-xl transition-all duration-300 text-gray-700 hover:bg-[#8B7355]/5 hover:text-[#8B7355] font-serif italic text-xl md:text-2xl border border-transparent hover:border-[#8B7355]/20"
                      >
                        {category}
                      </Link>
                    </div>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurCreationsModal

