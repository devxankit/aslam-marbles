import { Link } from 'react-router-dom'

const HomeDecorDropdown = () => {
  return (
    <div className="w-full h-full flex items-start py-6 md:py-8">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide">Furniture</h3>
            <ul className="space-y-2.5 mb-8">
              <li><Link to="/home-decor/dining-tables" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Dining Tables</Link></li>
              <li><Link to="/home-decor/center-tables" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Center Tables</Link></li>
              <li><Link to="/home-decor/side-tables" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Side Tables</Link></li>
              <li><Link to="/home-decor/marble-chair" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Marble chair</Link></li>
              <li><Link to="/home-decor/pedestal-columns" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Pedestal Columns</Link></li>
              <li><Link to="/home-decor/fire-places" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Fire Places</Link></li>
            </ul>

            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide">Games & Leisure</h3>
            <ul className="space-y-2.5 mb-8">
              <li><Link to="/home-decor/chess-sets" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Chess Sets</Link></li>
              <li><Link to="/home-decor/ludo" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Ludo</Link></li>
              <li><Link to="/home-decor/tic-tac-toe" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Tic-Tac-Toe</Link></li>
            </ul>

            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide">Lighting</h3>
            <ul className="space-y-2.5">
              <li><Link to="/home-decor/lamps" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Lamps</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide">Pots | Vases</h3>
            <ul className="space-y-2.5 mb-8">
              <li><Link to="/home-decor/tulsi-gamla" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Tulsi Gamla</Link></li>
              <li><Link to="/home-decor/pots-vases" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Pots & Vases</Link></li>
            </ul>

            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide">Sculptures</h3>
            <ul className="space-y-2.5">
              <li><Link to="/home-decor/indoor-sculptures" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Indoor Sculptures</Link></li>
              <li><Link to="/home-decor/outdoor-sculptures" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Outdoor Sculptures</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide">Tableware</h3>
            <ul className="space-y-2.5 mb-8">
              <li><Link to="/home-decor/mortar-pestle" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Mortar & Pestle</Link></li>
              <li><Link to="/home-decor/bowls" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Bowls</Link></li>
              <li><Link to="/home-decor/tray" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Tray</Link></li>
              <li><Link to="/home-decor/coasters" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Coasters</Link></li>
              <li><Link to="/home-decor/candle-holders" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Candle Holders</Link></li>
              <li><Link to="/home-decor/kitchen-accessories" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Kitchen Accessories</Link></li>
            </ul>

            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide">Wall Art</h3>
            <ul className="space-y-2.5">
              <li><Link to="/home-decor/3d-wall-murals" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">3D Wall Murals</Link></li>
              <li><Link to="/home-decor/inlay-wall-art" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Inlay Wall Art</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide">Bathroom Sets</h3>
            <ul className="space-y-2.5 mb-8">
              <li><Link to="/home-decor/bathroom-accessories" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Bathroom Accessories</Link></li>
              <li><Link to="/home-decor/stone-sinks" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Stone Sinks</Link></li>
            </ul>

            <h3 className="font-semibold text-black mb-4 text-sm md:text-base uppercase tracking-wide">Office & Desk</h3>
            <ul className="space-y-2.5">
              <li><Link to="/home-decor/bookends" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Bookends</Link></li>
              <li><Link to="/home-decor/photo-frames" className="text-gray-700 hover:text-[#8B7355] transition-colors text-xs md:text-sm">Photo Frames</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeDecorDropdown

