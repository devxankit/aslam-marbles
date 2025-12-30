import TranslatedText from '../TranslatedText'
import ExpertFormOverlay from './ExpertFormOverlay'
import LazyImage from './LazyImage'

const HeroSectionWithForm = ({
  heroImage,
  title,
  subtitle,
  description,
  enableMobileModal = false,
  onMobileButtonClick,
  disableGradient = false,
  source = "hero-section"
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden ${enableMobileModal ? 'h-[40vh] min-h-[300px] md:h-[75vh] md:min-h-[600px]' : ''}`}
      style={!enableMobileModal ? { height: '75vh', minHeight: '600px' } : {}}
    >
      {/* Background Image */}
      <LazyImage
        src={heroImage}
        alt={title}
        className="w-full h-full"
        imageClassName="w-full h-full object-cover"
        priority={true}
      />

      {/* Gradient Overlay */}
      {!disableGradient && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
      )}

      {/* Hero Text Overlay - Left Side */}
      <div className="absolute top-16 md:top-24 lg:top-32 left-4 md:left-6 lg:left-8 xl:left-12 z-10 max-w-xl md:max-w-2xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight uppercase tracking-wide drop-shadow-lg">
          <TranslatedText>{title}</TranslatedText>
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-white font-light mb-2 drop-shadow-md">
          <TranslatedText>{subtitle}</TranslatedText>
        </p>
        {description && (
          <p className="text-xs md:text-sm text-white/90 font-light leading-relaxed drop-shadow-md">
            <TranslatedText>{description}</TranslatedText>
          </p>
        )}

        {/* Mobile "Talk to Our Expert" Button */}
        {enableMobileModal && (
          <button
            onClick={onMobileButtonClick}
            className="md:hidden mt-4 px-5 py-2 text-xs bg-[#8B7355] text-white font-bold uppercase tracking-wider rounded shadow-lg hover:bg-[#725E45] transition-colors"
          >
            <TranslatedText>Talk to Our Expert</TranslatedText>
          </button>
        )}
      </div>

      {/* Form Overlay */}
      <div className={enableMobileModal ? "hidden md:block" : ""}>
        <ExpertFormOverlay source={source} />
      </div>
    </div>
  )
}

export default HeroSectionWithForm

