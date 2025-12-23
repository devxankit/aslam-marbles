import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // If there's a hash, let the browser or specific page logic handle it
    if (window.location.hash) return

    // Scroll to top immediately when route changes (and no hash)
    // Using both methods for maximum compatibility
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // Also handle any scroll containers
    const scrollContainers = document.querySelectorAll('[data-scroll-container]')
    scrollContainers.forEach(container => {
      container.scrollTop = 0
    })
  }, [pathname])

  return null
}

export default ScrollToTop

