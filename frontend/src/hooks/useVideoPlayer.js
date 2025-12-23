import { useEffect, useRef } from 'react'

export const useVideoPlayer = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playVideo = async () => {
      try {
        await video.play()
      } catch (err) {
        // Video will play on user interaction
      }
    }

    const handleUserInteraction = async () => {
      if (video && video.paused) {
        try {
          await video.play()
        } catch (err) {
          // Ignore errors
        }
      }
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
      document.removeEventListener('scroll', handleUserInteraction)
    }

    video.addEventListener('canplay', playVideo)
    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('touchstart', handleUserInteraction)
    document.addEventListener('scroll', handleUserInteraction)

    playVideo()

    return () => {
      video.removeEventListener('canplay', playVideo)
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
      document.removeEventListener('scroll', handleUserInteraction)
    }
  }, [])

  return videoRef
}

