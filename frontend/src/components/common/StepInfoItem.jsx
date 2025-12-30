import { memo } from 'react'
import TranslatedText from '../TranslatedText'
import { THEME_COLORS } from '../../utils/theme'

const StepInfoItem = memo(({ title, description, buttonText, buttonLink, onButtonClick }) => {
  const handleClick = () => {
    if (buttonLink) {
      window.location.href = buttonLink
    } else if (onButtonClick) {
      onButtonClick()
    }
  }

  return (
    <div className="relative pl-5 border-l-2 border-dashed border-gray-300">
      <h4 className="text-base md:text-lg font-bold text-gray-800 mb-1.5">
        <TranslatedText>{title}</TranslatedText>
      </h4>
      {description && (
        <p className="text-xs md:text-sm text-gray-600 mb-3">
          <TranslatedText>{description}</TranslatedText>
        </p>
      )}
      {buttonText && (
        <button
          onClick={handleClick}
          className="px-4 py-2 text-white text-xs md:text-sm font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: THEME_COLORS.primary }}
        >
          <TranslatedText>{buttonText}</TranslatedText>
        </button>
      )}
    </div>
  )
})

StepInfoItem.displayName = 'StepInfoItem'

export default StepInfoItem

