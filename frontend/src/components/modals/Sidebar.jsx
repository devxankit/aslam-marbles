import { Link } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const menuItems = [
    { name: 'About Us', path: '#' },
    { name: 'Experience Centre', path: '#' },
    { name: 'The Team', path: '#' },
    { name: 'Careers', path: '/careers' },
    { name: 'Artisans of Tilak', path: '#' },
    { name: 'Our Clients', path: '#' }
  ]

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[100] transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="fixed left-0 top-0 h-full w-72 md:w-80 bg-white z-[104] shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-black">ASLAM MARBLE SUPPLIERS</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl md:text-3xl font-bold transition-colors w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <nav className="p-3 md:p-4">
          <ul className="space-y-0.5">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.path === '#' ? (
                  <a 
                    href="#" 
                    className="block px-4 py-3.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm md:text-base font-medium"
                    onClick={onClose}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link 
                    to={item.path}
                    className="block px-4 py-3.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm md:text-base font-medium"
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Sidebar

