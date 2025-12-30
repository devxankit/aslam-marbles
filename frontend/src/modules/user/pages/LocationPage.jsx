import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import TrustedBySection from '../../../components/common/TrustedBySection'
import { indianLocations, internationalLocations } from '../../../data/locations'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TranslatedText from '../../../components/TranslatedText'

const LocationPage = ({
  onLocationClick,
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowProducts,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  return (
    <div className="w-full min-h-screen bg-[#fffbf0]">
      <Header
        variant="location"
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowProducts={onShowProducts}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
      />

      {/* INDIAN LOCATIONS Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8 md:mb-12 text-left">
            <TranslatedText>INDIAN LOCATIONS</TranslatedText>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {indianLocations.map((location, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => onLocationClick(location.name)}
              >
                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#fffbf0] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNATIONAL LOCATIONS Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-8 bg-[#fffbf0]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8 md:mb-12 text-left">
            <TranslatedText>INTERNATIONAL LOCATIONS</TranslatedText>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {internationalLocations.map((location, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => onLocationClick(location.name)}
              >
                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#fffbf0] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TrustedBySection />
      <FloatingButtons />
      <Footer />
    </div>
  )
}

export default LocationPage

