import { useState } from 'react'
import TranslatedText from '../TranslatedText'
import ExpertFormOverlay from './ExpertFormOverlay'
import LazyImage from './LazyImage'

const HeroSectionWithForm = ({
  heroImage,
  title,
  subtitle,
  description,
  onMobileButtonClick,
  disableGradient = false,
  source = "hero-section"
}) => {
  const [showHeroForm, setShowHeroForm] = useState(false)

  return (
    <div
      className="relative w-full overflow-hidden h-[60vh] md:h-[85vh] min-h-[500px] md:min-h-[750px]"
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
      <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 lg:left-8 xl:left-12 z-10 max-w-xl md:max-w-2xl px-4 py-8 rounded-2xl">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight uppercase tracking-wider drop-shadow-2xl">
          <TranslatedText>{title}</TranslatedText>
        </h1>
        <p className="text-sm md:text-lg lg:text-xl text-white font-medium mb-4 drop-shadow-xl opacity-90">
          <TranslatedText>{subtitle}</TranslatedText>
        </p>
        {description && (
          <p className="text-xs md:text-base text-white/80 font-normal leading-relaxed drop-shadow-lg max-w-lg mb-8">
            <TranslatedText>{description}</TranslatedText>
          </p>
        )}

        {/* Talk to Our Expert Button (Always visible now, triggers modal) */}
        <div className="flex gap-4">
          <button
            onClick={onMobileButtonClick || (() => setShowHeroForm(true))}
            className="px-8 py-3.5 text-xs md:text-sm bg-[#8B7355] text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-2xl hover:bg-[#725E45] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3 group"
          >
            <TranslatedText>Talk to Our Expert</TranslatedText>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Form Overlay Modal (Triggers on click) */}
      {showHeroForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setShowHeroForm(false)}
        >
          <div
            className="relative w-full max-w-md animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <ExpertFormOverlay
              source={source}
              onClose={() => setShowHeroForm(false)}
              className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroSectionWithForm

