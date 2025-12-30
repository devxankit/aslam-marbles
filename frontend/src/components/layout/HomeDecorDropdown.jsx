import { Link } from 'react-router-dom'
import TranslatedText from '../TranslatedText'

const HomeDecorDropdown = () => {
  return (
    <div className="w-full h-full flex items-start py-6 md:py-8">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide"><TranslatedText>Furniture</TranslatedText></h3>
            <ul className="space-y-2.5 mb-8">
              <li><Link to="/home-decor/dining-tables" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Dining Tables</TranslatedText></Link></li>
              <li><Link to="/home-decor/center-tables" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Center Tables</TranslatedText></Link></li>
              <li><Link to="/home-decor/side-tables" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Side Tables</TranslatedText></Link></li>
              <li><Link to="/home-decor/marble-chair" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Marble chair</TranslatedText></Link></li>
              <li><Link to="/home-decor/pedestal-columns" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Pedestal Columns</TranslatedText></Link></li>
              <li><Link to="/home-decor/fire-places" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Fire Places</TranslatedText></Link></li>
            </ul>

            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide"><TranslatedText>Games & Leisure</TranslatedText></h3>
            <ul className="space-y-2.5 mb-8">
              <li><Link to="/home-decor/chess-sets" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Chess Sets</TranslatedText></Link></li>
              <li><Link to="/home-decor/ludo" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Ludo</TranslatedText></Link></li>
              <li><Link to="/home-decor/tic-tac-toe" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Tic-Tac-Toe</TranslatedText></Link></li>
            </ul>

            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide"><TranslatedText>Lighting</TranslatedText></h3>
            <ul className="space-y-2.5">
              <li><Link to="/home-decor/lamps" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Lamps</TranslatedText></Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide"><TranslatedText>Pots | Vases</TranslatedText></h3>
            <ul className="space-y-2.5 mb-8">
              <li><Link to="/home-decor/tulsi-gamla" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Tulsi Gamla</TranslatedText></Link></li>
              <li><Link to="/home-decor/pots-vases" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Pots & Vases</TranslatedText></Link></li>
            </ul>

            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide"><TranslatedText>Sculptures</TranslatedText></h3>
            <ul className="space-y-2.5">
              <li><Link to="/home-decor/indoor-sculptures" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Indoor Sculptures</TranslatedText></Link></li>
              <li><Link to="/home-decor/outdoor-sculptures" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Outdoor Sculptures</TranslatedText></Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide"><TranslatedText>Tableware</TranslatedText></h3>
            <ul className="space-y-2.5 mb-8">
              <li><Link to="/home-decor/mortar-pestle" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Mortar & Pestle</TranslatedText></Link></li>
              <li><Link to="/home-decor/bowls" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Bowls</TranslatedText></Link></li>
              <li><Link to="/home-decor/tray" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Tray</TranslatedText></Link></li>
              <li><Link to="/home-decor/coasters" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Coasters</TranslatedText></Link></li>
              <li><Link to="/home-decor/candle-holders" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Candle Holders</TranslatedText></Link></li>
              <li><Link to="/home-decor/kitchen-accessories" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Kitchen Accessories</TranslatedText></Link></li>
            </ul>

            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide"><TranslatedText>Wall Art</TranslatedText></h3>
            <ul className="space-y-2.5">
              <li><Link to="/home-decor/3d-wall-murals" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>3D Wall Murals</TranslatedText></Link></li>
              <li><Link to="/home-decor/inlay-wall-art" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Inlay Wall Art</TranslatedText></Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide"><TranslatedText>Bathroom Sets</TranslatedText></h3>
            <ul className="space-y-2.5 mb-8">
              <li><Link to="/home-decor/bathroom-accessories" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Bathroom Accessories</TranslatedText></Link></li>
              <li><Link to="/home-decor/stone-sinks" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Stone Sinks</TranslatedText></Link></li>
            </ul>

            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide"><TranslatedText>Office & Desk</TranslatedText></h3>
            <ul className="space-y-2.5">
              <li><Link to="/home-decor/bookends" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Bookends</TranslatedText></Link></li>
              <li><Link to="/home-decor/photo-frames" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm"><TranslatedText>Photo Frames</TranslatedText></Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeDecorDropdown

