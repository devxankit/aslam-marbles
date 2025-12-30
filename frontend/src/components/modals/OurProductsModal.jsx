import { useState } from 'react'
import { Link } from 'react-router-dom'
import TranslatedText from '../TranslatedText'

const OurProductsModal = ({ isOpen, onClose }) => {
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
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black"><TranslatedText>OUR PRODUCTS</TranslatedText></h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-3xl font-bold transition-colors w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: 'Sandstone', path: '/products/sandstone' },
                { name: 'Limestone', path: '/products/limestone' },
                { name: 'Marble', path: '/products/marble' },
                { name: 'Granite', path: '/products/granite' },
                { name: 'Slate', path: '/products/slate' },
                { name: 'Quartzite', path: '/products/quartzite' },
                { name: 'Pebble Stones', path: '/products/pebble-stones' },
                { name: 'Cobble Stones', path: '/products/cobble-stones' },
                { name: 'Stone Chips', path: '/products/stone-chips' },
                { name: 'Basalt', path: '/products/basalt-stones' },
                { name: 'Soap Stone', path: '/products/soap-stones' },
                { name: 'Travertine', path: '/products/travertine-stones' },
                { name: 'Natural Indian Stones', path: '/products/natural-indian-stones' },
                { name: 'Modern Art', path: '/art/modern-art' },
                { name: 'Imported', path: '/art/imported' },
                { name: 'Packaging', path: '/art/packaging' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center justify-center p-4 bg-gray-50 hover:bg-[#8B7355] hover:text-white rounded-lg transition-all duration-300 border border-gray-100 shadow-sm group"
                >
                  <span className="font-semibold text-center"><TranslatedText>{item.name}</TranslatedText></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurProductsModal

