import { memo } from 'react'
import { THEME_COLORS } from '../../utils/theme'

const StepSection = memo(({
  stepRef,
  isVisible,
  gifSrc,
  gifAlt,
  bgColor,
  title,
  subtitle,
  children
}) => {
  return (
    <div ref={stepRef} className="w-full bg-white py-8 md:py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {subtitle && (
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              {subtitle}
            </h2>
            {title && (
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                {title}
              </h3>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Left - GIF Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div
              className="relative w-full max-w-[280px] md:max-w-md rounded-xl md:rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl overflow-hidden"
              style={{
                backgroundColor: bgColor || 'transparent',
                borderColor: isVisible ? THEME_COLORS.primary : '#e5e7eb'
              }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" style={{ background: `linear-gradient(to bottom right, ${THEME_COLORS.primary}15, transparent)` }}></div>
              <img
                src={gifSrc}
                alt={gifAlt}
                className="w-full h-auto rounded-lg relative"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right - Info Box */}
          <div className={`w-full lg:w-1/2 bg-white p-5 md:p-6 rounded-xl md:rounded-2xl shadow-xl border border-gray-100 lg:sticky lg:top-24 lg:self-start transition-all duration-700 ease-out ${isVisible
              ? 'opacity-100 lg:translate-x-0'
              : 'opacity-100 lg:opacity-0 lg:translate-x-full'
            }`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
})

StepSection.displayName = 'StepSection'

export default StepSection

