// Theme constants
export const THEME_COLORS = {
  primary: '#8B7355',
  primaryHover: '#7a6349',
  secondary: '#F5E6D3',
  accent: '#B2E0E0',
}

export const BUTTON_STYLES = {
  primary: {
    backgroundColor: THEME_COLORS.primary,
    color: 'white',
    hover: THEME_COLORS.primaryHover,
  },
  secondary: {
    backgroundColor: 'white',
    color: THEME_COLORS.primary,
    borderColor: THEME_COLORS.primary,
  },
}

// Common transition classes
export const TRANSITIONS = {
  default: 'transition-all duration-300',
  slow: 'transition-all duration-700 ease-out',
  hover: 'hover:opacity-90',
}

