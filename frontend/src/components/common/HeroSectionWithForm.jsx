import ExpertFormOverlay from './ExpertFormOverlay'

const HeroSectionWithForm = ({
  heroImage,
  title,
  subtitle,
  description
}) => {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '75vh', minHeight: '600px' }}>
      {/* Background Image */}
      <img
        src={heroImage}
        alt={title}
        className="w-full h-full object-cover"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        referrerPolicy="no-referrer"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>

      {/* Hero Text Overlay - Left Side */}
      <div className="absolute top-16 md:top-24 lg:top-32 left-4 md:left-6 lg:left-8 xl:left-12 z-10 max-w-xl md:max-w-2xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight uppercase tracking-wide drop-shadow-lg">
          {title}
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-white font-light mb-2 drop-shadow-md">
          {subtitle}
        </p>
        {description && (
          <p className="text-xs md:text-sm text-white/90 font-light leading-relaxed drop-shadow-md">
            {description}
          </p>
        )}
      </div>

      {/* Form Overlay */}
      <ExpertFormOverlay />
    </div>
  )
}

export default HeroSectionWithForm

