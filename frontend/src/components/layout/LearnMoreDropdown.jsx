import { Link } from 'react-router-dom'

const LearnMoreDropdown = () => {
  const menuItems = [
    { name: 'About Us', path: '/about-us' },
    { name: 'Our Creations', path: '/murti' },
    { name: 'Projects', path: '/projects' },
    { name: 'How it Works', path: '/how-it-works' }
  ]

  return (
    <div className="w-full h-full flex items-start py-4">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="text-gray-700 hover:text-[#8B7355] transition-colors text-sm md:text-base font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default LearnMoreDropdown

