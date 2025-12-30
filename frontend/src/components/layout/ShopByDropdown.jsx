import { Link } from 'react-router-dom'
import TranslatedText from '../TranslatedText'

const ShopByDropdown = () => {
  const rooms = [
    'Pooja Room',
    'Living Room',
    'Dinning Room',
    'Powder Room',
    'Foyer'
  ]

  const occasions = [
    'Housewarming',
    'Festivals',
    'Wedding',
    'Religious Ceremonies',
    'Memorials',
    'Corporate Gifting'
  ]

  return (
    <div className="w-full h-full flex items-start py-4">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {/* Rooms Column */}
          <div>
            <h3 className="font-semibold text-black mb-3 text-sm md:text-base uppercase tracking-wide"><TranslatedText>Rooms</TranslatedText></h3>
            <ul className="space-y-2">
              {rooms.map((room, index) => (
                <li key={index}>
                  <Link
                    to={`/shop-by/rooms/${room.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"
                  >
                    <TranslatedText>{room}</TranslatedText>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Occasions Column */}
          <div>
            <h3 className="font-semibold text-black mb-3 text-sm md:text-base uppercase tracking-wide"><TranslatedText>Occasions</TranslatedText></h3>
            <ul className="space-y-2">
              {occasions.map((occasion, index) => (
                <li key={index}>
                  <Link
                    to={`/shop-by/occasions/${occasion.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"
                  >
                    <TranslatedText>{occasion}</TranslatedText>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopByDropdown

