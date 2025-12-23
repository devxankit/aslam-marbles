import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { fetchHomePageData, updateHeroSection, uploadHomePageVideo, deleteHomePageVideo, updateBeforeAfterImages, updateCompletedProjects } from '../../../utils/homePageUtils'

const HomePageManagementPage = () => {
  const [activeTab, setActiveTab] = useState('hero')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [homePageData, setHomePageData] = useState(null)

  // Hero Section State
  const [heroData, setHeroData] = useState({
    mainHeading: '',
    subHeading: '',
    supplierText: '',
    videoUrl: '',
    videoFile: null
  })
  const [previewVideo, setPreviewVideo] = useState(null)

  // Videos Section State
  const [videosHeading, setVideosHeading] = useState('Welcome to the World aslam marble suppliers')
  const [videosList, setVideosList] = useState([])
  const [newVideoFile, setNewVideoFile] = useState(null)
  const [newVideoPreview, setNewVideoPreview] = useState(null)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [deletingVideoId, setDeletingVideoId] = useState(null)

  // Before/After State
  const [beforeAfterData, setBeforeAfterData] = useState({
    heading: '',
    description: '',
    beforeImage: null,
    afterImage: null
  })
  const [beforePreview, setBeforePreview] = useState(null)
  const [afterPreview, setAfterPreview] = useState(null)

  // Completed Projects State
  const [completedProjectsData, setCompletedProjectsData] = useState({
    heading: '',
    backgroundImage: null,
    stats: {
      projects: 950,
      cities: 350,
      yearsExperience: 25
    }
  })
  const [bgPreview, setBgPreview] = useState(null)

  useEffect(() => {
    loadHomePageData()
  }, [])

  const loadHomePageData = async () => {
    try {
      setLoading(true)
      const data = await fetchHomePageData()

      if (data) {
        setHomePageData(data)

        // Set Hero Data
        if (data.heroSection) {
          setHeroData({
            mainHeading: data.heroSection.mainHeading || '',
            subHeading: data.heroSection.subHeading || '',
            supplierText: data.heroSection.supplierText || '',
            videoUrl: data.heroSection.video?.url || '',
            videoFile: null
          })
        }

        // Set Videos Data
        if (data.videosSection) {
          setVideosHeading(data.videosSection.heading || '')
          setVideosList(data.videosSection.videos || [])
        }

        // Set Before/After Data
        if (data.beforeAfterSection) {
          setBeforeAfterData({
            heading: data.beforeAfterSection.heading || '',
            description: data.beforeAfterSection.description || '',
            beforeImage: data.beforeAfterSection.beforeImage?.url || null,
            afterImage: data.beforeAfterSection.afterImage?.url || null
          })
        }

        // Set Completed Projects Data
        if (data.completedProjectsSection) {
          setCompletedProjectsData({
            heading: data.completedProjectsSection.heading || '',
            backgroundImage: data.completedProjectsSection.backgroundImage?.url || null,
            stats: data.completedProjectsSection.stats || {
              projects: 950,
              cities: 350,
              yearsExperience: 25
            }
          })
        }
      }
    } catch (error) {
      console.error('Error loading home page data:', error)
      alert('Failed to load home page data')
    } finally {
      setLoading(false)
    }
  }

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  const handleSaveHero = async () => {
    try {
      setSaving(true)
      const token = localStorage.getItem('adminToken')
      if (!token) {
        alert('Please login as admin first')
        return
      }

      const updateData = {
        mainHeading: heroData.mainHeading,
        subHeading: heroData.subHeading,
        supplierText: heroData.supplierText
      }

      if (heroData.videoFile) {
        const videoBase64 = await convertFileToBase64(heroData.videoFile)
        updateData.video = videoBase64
      }

      await updateHeroSection(updateData, token)
      alert('Hero section updated successfully!')
      setPreviewVideo(null)
      await loadHomePageData()
    } catch (error) {
      console.error('Error saving hero section:', error)
      alert('Failed to update hero section: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleSaveBeforeAfter = async () => {
    try {
      setSaving(true)
      const token = localStorage.getItem('adminToken')
      if (!token) {
        alert('Please login as admin first')
        return
      }

      const updateData = {
        heading: beforeAfterData.heading,
        description: beforeAfterData.description
      }

      if (beforeAfterData.beforeImage && typeof beforeAfterData.beforeImage !== 'string') {
        const base64 = await convertFileToBase64(beforeAfterData.beforeImage)
        updateData.beforeImage = base64
      }

      if (beforeAfterData.afterImage && typeof beforeAfterData.afterImage !== 'string') {
        const base64 = await convertFileToBase64(beforeAfterData.afterImage)
        updateData.afterImage = base64
      }

      await updateBeforeAfterImages(updateData, token)
      alert('Before/After section updated successfully!')
      setBeforePreview(null)
      setAfterPreview(null)
      await loadHomePageData()
    } catch (error) {
      console.error('Error saving before/after:', error)
      alert('Failed to update before/after section: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleSaveCompletedProjects = async () => {
    try {
      setSaving(true)
      const token = localStorage.getItem('adminToken')
      if (!token) {
        alert('Please login as admin first')
        return
      }

      const updateData = {
        heading: completedProjectsData.heading,
        stats: completedProjectsData.stats
      }

      if (completedProjectsData.backgroundImage && typeof completedProjectsData.backgroundImage !== 'string') {
        const base64 = await convertFileToBase64(completedProjectsData.backgroundImage)
        updateData.backgroundImage = base64
      }

      await updateCompletedProjects(updateData, token)
      alert('Completed projects section updated successfully!')
      setBgPreview(null)
      await loadHomePageData()
    } catch (error) {
      console.error('Error saving completed projects:', error)
      alert('Failed to update completed projects section: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleUploadVideo = async () => {
    if (!newVideoFile) {
      alert('Please select a video file first')
      return
    }

    try {
      setUploadingVideo(true)
      const token = localStorage.getItem('adminToken')
      if (!token) {
        alert('Please login as admin first')
        return
      }

      const videoBase64 = await convertFileToBase64(newVideoFile)
      await uploadHomePageVideo({ videoFile: videoBase64 }, token)

      alert('Video uploaded successfully!')
      setNewVideoFile(null)
      setNewVideoPreview(null)
      await loadHomePageData()
    } catch (error) {
      console.error('Error uploading video:', error)
      alert('Failed to upload video: ' + error.message)
    } finally {
      setUploadingVideo(false)
    }
  }

  const handleDeleteVideo = async (publicId) => {
    if (!confirm('Are you sure you want to delete this video?')) {
      return
    }

    try {
      setDeletingVideoId(publicId)
      const token = localStorage.getItem('adminToken')
      if (!token) {
        alert('Please login as admin first')
        return
      }

      await deleteHomePageVideo(publicId, token)
      alert('Video deleted successfully!')
      await loadHomePageData()
    } catch (error) {
      console.error('Error deleting video:', error)
      alert('Failed to delete video: ' + error.message)
    } finally {
      setDeletingVideoId(null)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">Loading home page data...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Home Page Management</h1>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('hero')}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${activeTab === 'hero'
                ? 'border-b-2 border-[#8B7355] text-[#8B7355]'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Hero Section
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${activeTab === 'videos'
                ? 'border-b-2 border-[#8B7355] text-[#8B7355]'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Videos (3)
            </button>
            <button
              onClick={() => setActiveTab('beforeAfter')}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${activeTab === 'beforeAfter'
                ? 'border-b-2 border-[#8B7355] text-[#8B7355]'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Before/After
            </button>
            <button
              onClick={() => setActiveTab('completedProjects')}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${activeTab === 'completedProjects'
                ? 'border-b-2 border-[#8B7355] text-[#8B7355]'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Completed Projects
            </button>
          </div>

          <div className="p-6">
            {/* Hero Section Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Hero Section</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Heading
                    </label>
                    <input
                      type="text"
                      value={heroData.mainHeading}
                      onChange={(e) => setHeroData({ ...heroData, mainHeading: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                      placeholder="Crafting Divine Spaces"
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sub Heading
                    </label>
                    <input
                      type="text"
                      value={heroData.subHeading}
                      onChange={(e) => setHeroData({ ...heroData, subHeading: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                      placeholder="Where Faith Meets Fine Marble"
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supplier Text
                    </label>
                    <input
                      type="text"
                      value={heroData.supplierText}
                      onChange={(e) => setHeroData({ ...heroData, supplierText: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                      placeholder="– Aslam Marble Suppliers"
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Video
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                          if (file.size > 50 * 1024 * 1024) {
                            alert('Video size should be less than 50MB')
                            return
                          }
                          setHeroData({ ...heroData, videoFile: file })
                          setPreviewVideo(URL.createObjectURL(file))
                        }
                      }}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                      disabled={saving}
                    />
                    <p className="text-xs text-gray-500 mt-1">Max file size: 50MB</p>

                    {(previewVideo || heroData.videoUrl) && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Current/Preview Video:</p>
                        <video
                          src={previewVideo || heroData.videoUrl}
                          controls
                          className="w-full max-w-md rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSaveHero}
                    disabled={saving}
                    className="px-6 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: '#8B7355' }}
                  >
                    {saving ? 'Saving...' : 'Save Hero Section'}
                  </button>
                </div>
              </div>
            )}

            {/* Videos Section Tab */}
            {activeTab === 'videos' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Videos Section</h2>
                <p className="text-sm text-gray-600">Manage the 3 videos displayed under "Welcome to the World aslam marble suppliers"</p>

                <div className="space-y-6">
                  {/* Upload New Video */}
                  <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Upload New Video</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Video File
                        </label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files[0]
                            if (file) {
                              if (file.size > 50 * 1024 * 1024) {
                                alert('Video size should be less than 50MB')
                                return
                              }
                              setNewVideoFile(file)
                              setNewVideoPreview(URL.createObjectURL(file))
                            }
                          }}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                          disabled={uploadingVideo}
                        />
                        <p className="text-xs text-gray-500 mt-1">Max file size: 50MB. Recommended: Vertical video (9:16 aspect ratio)</p>
                      </div>

                      {newVideoPreview && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Preview:</p>
                          <video
                            src={newVideoPreview}
                            controls
                            className="w-full max-w-xs rounded-lg"
                          />
                        </div>
                      )}

                      <button
                        onClick={handleUploadVideo}
                        disabled={!newVideoFile || uploadingVideo}
                        className="px-6 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#8B7355' }}
                      >
                        {uploadingVideo ? 'Uploading...' : 'Upload Video'}
                      </button>
                    </div>
                  </div>

                  {/* Current Videos */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Current Videos ({videosList.length}/3)</h3>
                    {videosList.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No videos uploaded yet</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {videosList.map((video, index) => (
                          <div key={video.publicId || index} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                            <div className="aspect-[9/16] bg-gray-100">
                              <video
                                src={video.url}
                                controls
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <p className="text-sm text-gray-600 mb-2">Video {index + 1}</p>
                              <button
                                onClick={() => handleDeleteVideo(video.publicId)}
                                disabled={deletingVideoId === video.publicId}
                                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {deletingVideoId === video.publicId ? 'Deleting...' : 'Delete Video'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {videosList.length >= 3 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> You already have 3 videos. To add a new video, please delete one of the existing videos first.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Before/After Tab */}
            {activeTab === 'beforeAfter' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Before & After Section</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={beforeAfterData.heading}
                      onChange={(e) => setBeforeAfterData({ ...beforeAfterData, heading: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                      placeholder="Before and After"
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={beforeAfterData.description}
                      onChange={(e) => setBeforeAfterData({ ...beforeAfterData, description: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                      rows="4"
                      placeholder="Description..."
                      disabled={saving}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Before Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            setBeforeAfterData({ ...beforeAfterData, beforeImage: file })
                            setBeforePreview(URL.createObjectURL(file))
                          }
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                        disabled={saving}
                      />
                      {(beforePreview || (typeof beforeAfterData.beforeImage === 'string')) && (
                        <img
                          src={beforePreview || beforeAfterData.beforeImage}
                          alt="Before"
                          className="mt-2 w-full rounded-lg"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        After Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            setBeforeAfterData({ ...beforeAfterData, afterImage: file })
                            setAfterPreview(URL.createObjectURL(file))
                          }
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                        disabled={saving}
                      />
                      {(afterPreview || (typeof beforeAfterData.afterImage === 'string')) && (
                        <img
                          src={afterPreview || beforeAfterData.afterImage}
                          alt="After"
                          className="mt-2 w-full rounded-lg"
                        />
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleSaveBeforeAfter}
                    disabled={saving}
                    className="px-6 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: '#8B7355' }}
                  >
                    {saving ? 'Saving...' : 'Save Before/After Section'}
                  </button>
                </div>
              </div>
            )}

            {/* Completed Projects Tab */}
            {activeTab === 'completedProjects' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Completed Custom Projects</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={completedProjectsData.heading}
                      onChange={(e) => setCompletedProjectsData({ ...completedProjectsData, heading: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                      placeholder="COMPLETED CUSTOM PROJECTS"
                      disabled={saving}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Projects Count
                      </label>
                      <input
                        type="number"
                        value={completedProjectsData.stats.projects}
                        onChange={(e) => setCompletedProjectsData({
                          ...completedProjectsData,
                          stats: { ...completedProjectsData.stats, projects: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                        disabled={saving}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cities Count
                      </label>
                      <input
                        type="number"
                        value={completedProjectsData.stats.cities}
                        onChange={(e) => setCompletedProjectsData({
                          ...completedProjectsData,
                          stats: { ...completedProjectsData.stats, cities: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                        disabled={saving}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years Experience
                      </label>
                      <input
                        type="number"
                        value={completedProjectsData.stats.yearsExperience}
                        onChange={(e) => setCompletedProjectsData({
                          ...completedProjectsData,
                          stats: { ...completedProjectsData.stats, yearsExperience: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                        disabled={saving}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                          setCompletedProjectsData({ ...completedProjectsData, backgroundImage: file })
                          setBgPreview(URL.createObjectURL(file))
                        }
                      }}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                      disabled={saving}
                    />
                    {(bgPreview || (typeof completedProjectsData.backgroundImage === 'string')) && (
                      <img
                        src={bgPreview || completedProjectsData.backgroundImage}
                        alt="Background"
                        className="mt-2 w-full max-w-2xl rounded-lg"
                      />
                    )}
                  </div>

                  <button
                    onClick={handleSaveCompletedProjects}
                    disabled={saving}
                    className="px-6 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: '#8B7355' }}
                  >
                    {saving ? 'Saving...' : 'Save Completed Projects Section'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default HomePageManagementPage
