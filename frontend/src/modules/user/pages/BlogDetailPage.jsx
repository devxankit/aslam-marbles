import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import { fetchBlogs, fetchBlogById } from '../../../utils/blogUtils'
import TranslatedText from '../../../components/TranslatedText'
import { usePageTranslation } from '../../../contexts/PageTranslationContext'

const BlogDetailPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTranslatedText } = usePageTranslation()
  const [currentPost, setCurrentPost] = useState(null)
  const [allBlogs, setAllBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true)
        const blog = await fetchBlogById(id)
        if (blog) {
          setCurrentPost(blog)
          // Also fetch all blogs for navigation
          const blogs = await fetchBlogs()
          setAllBlogs(blogs || [])
        }
      } catch (error) {
        console.error('Error loading blog:', error)
        setCurrentPost(null)
      } finally {
        setLoading(false)
      }
    }
    loadBlog()
  }, [id])

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <p className="text-xl text-gray-600"><TranslatedText>Loading blog...</TranslatedText></p>
      </div>
    )
  }

  if (!currentPost) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <p className="text-xl text-gray-600"><TranslatedText>Blog post not found</TranslatedText></p>
      </div>
    )
  }

  const currentIndex = allBlogs.findIndex(post => (post._id || post.id) === id)
  const previousPost = currentIndex > 0 ? allBlogs[currentIndex - 1] : null
  const nextPost = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null

  const handlePrevious = () => {
    if (previousPost) {
      navigate(`/blog/${previousPost._id || previousPost.id}`)
    }
  }

  const handleNext = () => {
    if (nextPost) {
      navigate(`/blog/${nextPost._id || nextPost.id}`)
    }
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <Header
        variant="default"
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
        onShowLocation={() => navigate('/location')}
        onShowBooking={() => navigate('/book-appointment')}
      />

      {/* Blog Detail Section */}
      <section className="w-full py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Horizontal Full Width Image with Navigation Buttons */}
          <div className="relative w-full mb-8 md:mb-12">
            <div className="relative w-full">
              <img
                src={currentPost.image}
                alt={getTranslatedText(currentPost.title)}
                className="w-full h-auto object-contain"
                style={{ display: 'block', width: '100%' }}
              />

              {/* Previous Blog Button - Left Side */}
              {previousPost && (
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#8B7355] p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-20 flex items-center justify-center"
                  aria-label={getTranslatedText("Previous Blog")}
                  title={getTranslatedText("Previous Blog")}
                >
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Next Blog Button - Right Side */}
              {nextPost && (
                <button
                  onClick={handleNext}
                  className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#8B7355] p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-20 flex items-center justify-center"
                  aria-label={getTranslatedText("Next Blog")}
                  title={getTranslatedText("Next Blog")}
                >
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Blog Details Section */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm md:text-base font-semibold text-[#8B7355] uppercase tracking-wide">
                <TranslatedText>{currentPost.category}</TranslatedText>
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500"><TranslatedText>{currentPost.date}</TranslatedText></span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              <TranslatedText>{currentPost.title}</TranslatedText>
            </h1>

            <div className="prose max-w-none">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                <TranslatedText>{currentPost.description}</TranslatedText>
              </p>

              {currentPost.content ? (
                <div
                  className="text-base md:text-lg text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: currentPost.content }}
                />
              ) : (
                <>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                    <TranslatedText>Vietnam White Marble has long been revered for its pristine beauty and spiritual significance.
                      In contemporary home design, incorporating marble temples and pooja rooms brings together
                      traditional craftsmanship with modern aesthetics, creating spaces that honor both heritage and innovation.</TranslatedText>
                  </p>

                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                    <TranslatedText>The intricate carvings and meticulous attention to detail in marble temple design reflect not just
                      artistic excellence but also a deep understanding of spiritual architecture. Each element, from the
                      placement of the mandir to the selection of materials, plays a crucial role in creating an environment
                      that promotes peace, devotion, and positive energy flow throughout your home.</TranslatedText>
                  </p>

                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    <TranslatedText>Whether you're designing a compact mandir for an apartment or a spacious pooja room for a traditional
                      home, the versatility of Vietnam White Marble ensures that your sacred space will be both functional
                      and beautiful, standing as a testament to timeless design and spiritual devotion for generations to come.</TranslatedText>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <TrustedBySection />
      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default BlogDetailPage

