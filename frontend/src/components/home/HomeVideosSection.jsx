import React, { useState, useEffect } from 'react'
import { fetchHomePageData } from '../../utils/homePageUtils'

// Import videos as fallback
import video1 from '../../assets/video/videos/352260c8-6984-4232-6ad7-61a7d5b47380.mp4'
import video2 from '../../assets/video/videos/dfde720e-a063-4380-4022-245d7dd9ab30.mp4'
import video3 from '../../assets/video/videos/ef556fd0-b8ee-475e-7616-2e2ca5640bb0 (1).mp4'

const HomeVideosSection = () => {
  const [videos, setVideos] = useState([
    { id: 1, src: video1 },
    { id: 2, src: video2 },
    { id: 3, src: video3 }
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchHomePageData()
        if (data?.videosSection?.videos && data.videosSection.videos.length > 0) {
          const formattedVideos = data.videosSection.videos.map((video, index) => ({
            id: index + 1,
            src: video.url,
            publicId: video.publicId
          }))
          setVideos(formattedVideos)
        }
      } catch (error) {
        console.error('Error loading videos:', error)
        // Keep fallback videos if API fails
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [])

  if (loading) {
    return (
      <section className="w-full bg-white py-12 px-4 md:px-8">
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center py-8">
            <p className="text-gray-600">Loading videos...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-white py-12 px-4 md:px-8">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {videos.map((video) => (
            <div key={video.id} className="relative w-full aspect-[9/16] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeVideosSection

