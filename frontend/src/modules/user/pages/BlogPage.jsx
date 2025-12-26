import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import { useNavigate } from 'react-router-dom'
import blogImg from '../../../assets/blog/blog.png'
import { fetchBlogs } from '../../../utils/blogUtils'

const BlogPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  const navigate = useNavigate()
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const loadBlogs = async () => {
      try {
        setLoading(true)
        const data = await fetchBlogs()
        if (isMounted) {
          setBlogPosts(data || [])
        }
      } catch (error) {
        console.error('Error loading blogs:', error)
        if (isMounted) {
          setBlogPosts([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    loadBlogs()
    return () => {
      isMounted = false
    }
  }, [])

  const handleLocationClick = useCallback(() => {
    navigate('/location')
  }, [navigate])

  const handleBookingClick = useCallback(() => {
    navigate('/book-appointment')
  }, [navigate])

  const handleBlogClick = useCallback((id) => {
    navigate(`/blog/${id}`)
  }, [navigate])

  const memoizedBlogPosts = useMemo(() => blogPosts, [blogPosts])

  return (
    <div className="w-full min-h-screen bg-white">
      <Header
        variant="default"
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
        onShowLocation={handleLocationClick}
        onShowBooking={handleBookingClick}
      />

      {/* Horizontal Full Width Image with Heading */}
      <section className="w-full relative">
        <div className="relative w-full">
          <img
            src={blogImg}
            alt="Our Blog"
            className="w-full h-auto object-contain"
            style={{ display: 'block', width: '100%' }}
          />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif italic font-bold text-white uppercase tracking-wide text-center px-4 drop-shadow-2xl">
              OUR BLOG
            </h1>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-base md:text-lg">Loading blogs...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-base md:text-lg">No blogs available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6">
              {memoizedBlogPosts.map((post) => (
                <BlogCard
                  key={post._id || post.id}
                  post={post}
                  onClick={() => handleBlogClick(post._id || post.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <TrustedBySection />
      <Footer />
      <FloatingButtons />
    </div>
  )
}

// Memoized Blog Card Component
const BlogCard = memo(({ post, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
  >
    {/* Image Section */}
    <div className="relative w-full h-20 md:h-32 lg:h-40 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
    </div>

    {/* Content Section */}
    <div className="p-2 md:p-4 lg:p-6">
      <div className="flex items-center gap-1 mb-1 md:mb-2">
        <span className="text-[8px] md:text-xs font-semibold text-[#8B7355] uppercase tracking-wide truncate">
          {post.category}
        </span>
        <span className="text-gray-400 text-[8px]">•</span>
        <span className="text-[8px] md:text-xs text-gray-500 truncate">{post.date}</span>
      </div>

      <h2 className="text-[10px] md:text-sm lg:text-lg font-bold text-gray-800 mb-1 md:mb-2 line-clamp-2 group-hover:text-[#8B7355] transition-colors">
        {post.title}
      </h2>

      <p className="text-[8px] md:text-xs lg:text-sm text-gray-600 leading-snug line-clamp-2 md:line-clamp-3">
        {post.description}
      </p>
    </div>
  </div>
))

BlogCard.displayName = 'BlogCard'

export default memo(BlogPage)

