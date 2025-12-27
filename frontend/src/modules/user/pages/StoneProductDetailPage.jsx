import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'

const StoneProductDetailPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowProducts,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking
}) => {
  const { productId, stoneType } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [showContactModal, setShowContactModal] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  // Extract stone type from URL path
  const pathParts = location.pathname.split('/')
  const actualStoneType = stoneType || pathParts[2] // /products/{stoneType}/{productId}

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        // 1. Try Session Storage first (fastest)
        const storedProduct = sessionStorage.getItem(`stoneProduct_${actualStoneType}_${productId}`)
        if (storedProduct) {
          try {
            const parsed = JSON.parse(storedProduct)
            const sanitizedImage = (typeof parsed.image === 'string' ? parsed.image : parsed.image?.url) ||
              (typeof parsed.images?.[0] === 'string' ? parsed.images[0] : parsed.images?.[0]?.url) ||
              'https://via.placeholder.com/600'

            // Normalize images array
            let sanitizedImages = [];
            if (parsed.images && Array.isArray(parsed.images) && parsed.images.length > 0) {
              sanitizedImages = parsed.images.map(img => (typeof img === 'string' ? img : img.url));
            } else {
              sanitizedImages = [sanitizedImage];
            }

            setProduct({
              ...parsed,
              image: sanitizedImage,
              images: sanitizedImages,
              specifications: parsed.specifications || {
                'Origin': 'North India',
                'Color': 'Various',
                'Finish': 'Honed, Brushed, Natural, Tumbled',
                'Offered In': 'Tiles, Pavers, Crazy, Mosaic',
                'Tiles Size': '30 X 30, 30 X 60, 60 X 60 CM',
                'Price': '₹45 - ₹65 per sq.ft'
              }
            })
            setLoading(false)
            return // Found in session, stop here
          } catch (e) {
            console.error('Error parsing stored product:', e)
          }
        }

        // 2. Fetch from API if not in session or parsing failed
        const res = await fetch(`${API_URL}/stone-products/${productId}`)
        if (res.ok) {
          const apiProduct = await res.json()

          const mainImage = (typeof apiProduct.image === 'string' ? apiProduct.image : apiProduct.image?.url) ||
            (typeof apiProduct.images?.[0] === 'string' ? apiProduct.images[0] : apiProduct.images?.[0]?.url) ||
            'https://via.placeholder.com/600';

          // Normalize images array
          let productImages = [];
          if (apiProduct.images && Array.isArray(apiProduct.images) && apiProduct.images.length > 0) {
            productImages = apiProduct.images.map(img => (typeof img === 'string' ? img : img.url));
          } else {
            productImages = [mainImage];
          }

          // Map API response to Component format
          setProduct({
            id: apiProduct._id,
            name: apiProduct.name,
            image: mainImage,
            images: productImages,
            specifications: {
              'Origin': apiProduct.specifications?.origin || 'India',
              'Color': apiProduct.specifications?.color || 'Standard',
              'Finish': apiProduct.specifications?.finish || 'Standard Finish',
              'Offered In': apiProduct.specifications?.offeredIn || 'Various Forma',
              'Tiles Size': apiProduct.specifications?.dimensions || 'Custom',
              'Price': apiProduct.specifications?.price ? `₹${apiProduct.specifications.price}` : 'Contact for Price'
            },
            description: apiProduct.description
          })
        } else {
          // If valid ObjectId but not found, or invalid ID (API returns 404/500), let it be null
          console.log("Product not found via API")
        }

      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId, actualStoneType, API_URL])

  // Get stone type display name
  const getStoneTypeName = (type) => {
    const names = {
      'sandstone': 'Sandstone',
      'limestone': 'Limestone',
      'slate': 'Slate',
      'marble': 'Marble',
      'granite': 'Granite',
      'quartzite': 'Quartzite',
      'pebble-stones': 'Pebble Stones',
      'cobble-stones': 'Cobble Stones',
      'stone-chips': 'Stone Chips',
      'natural-indian-stones': 'Natural Indian Stones',
      'basalt': 'Basalt',
      'soap-stone': 'Soap Stone',
      'travertine': 'Travertine',
      'packaging-slab': 'Slab Packaging',
      'packaging-tiles': 'Tiles Packaging',
      'packaging-artifacts': 'Artifacts Packaging',
      'packaging-other': 'Other Packaging'
    }
    return names[actualStoneType] || actualStoneType.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-t-2 border-b-2 border-[#8B7355] rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate(`/products/${actualStoneType}`)}
            className="px-6 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: '#8B7355' }}
          >
            Back to {getStoneTypeName(actualStoneType)}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <Header
        variant="default"
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowProducts={onShowProducts}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
        onShowLocation={onShowLocation}
        onShowBooking={onShowBooking}
      />

      {/* Product Detail Section */}
      <section className="w-full py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => {
              const backPath = actualStoneType.startsWith('packaging-') ? `/art/packaging/${actualStoneType}` : `/products/${actualStoneType}`
              navigate(backPath)
            }}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#8B7355] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to {getStoneTypeName(actualStoneType)}</span>
          </button>

          {/* Product Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 uppercase tracking-wide">
            {product.name}
          </h1>

          {/* Product Content - Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Image & Gallery */}
            <div className="w-full">
              {/* Main Image */}
              <div
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group"
                onClick={() => setLightboxImage(product.image)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Thumbnails Grid (4 images) */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[0, 1, 2, 3].map((index) => {
                  const imgUrl = product.images && product.images[index] ? (typeof product.images[index] === 'string' ? product.images[index] : product.images[index].url) : product.image;
                  return (
                    <div
                      key={index}
                      className="h-20 sm:h-24 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-gray-200"
                      onClick={() => setLightboxImage(imgUrl)}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                })}
              </div>

              {/* Image Caption */}
              <div className="mt-8">
                <h3 className="text-2xl font-serif text-gray-900 mb-4">{product.name}</h3>
                <div className="h-1 w-20 bg-[#8B7355] mb-6"></div>
                <p className="text-gray-600 leading-relaxed font-light text-justify">
                  This premium natural stone is sourced directly from the historic quarries{product.specifications.Origin ? ` of ${product.specifications.Origin}` : ''}.
                  {product.specifications.Color && (
                    <> Renowned for its distinctive <span className="font-medium text-gray-800">{product.specifications.Color.toLowerCase()}</span> hues and remarkable geological strength,</>
                  )}
                  it serves as a centerpiece for architectural excellence. Its timeless appeal and durability make it an ideal choice for both interior and exterior applications, adding a touch of nature's grandeur to any space.
                </p>
              </div>
            </div>

            {/* Right Side - Specifications Table */}
            <div className="w-full">
              <div className="bg-white p-6 md:p-8 border border-gray-200 shadow-sm">
                <div className="mb-8 border-b border-gray-100 pb-4">
                  <h2 className="text-xl font-serif text-gray-900">Technical Specifications</h2>
                </div>

                {/* Stylized Specifications List */}
                <div className="grid grid-cols-1 gap-0 bg-white border border-gray-200">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div
                      key={key}
                      className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0"
                    >
                      <div className="sm:w-1/3 bg-gray-50 p-4 border-r border-gray-200 flex items-center">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                          {key}
                        </span>
                      </div>
                      <div className="sm:w-2/3 p-4 flex items-center">
                        <span className="text-sm font-medium text-gray-800">
                          {value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Aesthetic Brand Touch */}
                <div className="mt-8 flex items-center gap-3 opacity-60">
                  <div className="h-[1px] flex-1 bg-gray-300"></div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">Aslam Marble Suppliers</span>
                  <div className="h-[1px] flex-1 bg-gray-300"></div>
                </div>

                {/* Connect Button */}
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full mt-6 bg-[#8B7355] text-white py-4 rounded-lg text-lg font-bold tracking-wide hover:bg-[#725E45] transition-all shadow-lg hover:shadow-xl uppercase transform hover:-translate-y-1"
                >
                  Connect for more details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-4xl hover:text-[#8B7355] transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            &times;
          </button>
          <img
            src={lightboxImage}
            alt="Full view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl scale-100 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Contact Details Modal */}
      {showContactModal && (
        <div
          className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn"
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#8B7355] px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-serif text-white tracking-wider uppercase">Contact Us</h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h3>
                <p className="text-gray-500">We'd love to hear from you. Reach out to us for any queries.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* Location */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-[#fffbf0] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#8B7355]/20">
                    <svg className="w-8 h-8 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Location</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Borawar Byepass Road<br />Makrana, Rajasthan, India
                  </p>
                </div>

                {/* Email */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-[#fffbf0] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#8B7355]/20">
                    <svg className="w-8 h-8 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Email</h4>
                  <a href="mailto:aslammarble40@gmail.com" className="text-gray-600 hover:text-[#8B7355] transition-colors text-sm font-medium">
                    aslammarble40@gmail.com
                  </a>
                </div>

                {/* Call */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-[#fffbf0] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#8B7355]/20">
                    <svg className="w-8 h-8 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Call Us</h4>
                  <a href="tel:+917877639699" className="text-gray-600 hover:text-[#8B7355] transition-colors text-sm font-medium">
                    +91 7877639699
                  </a>
                </div>
              </div>

              {/* Action Button within Modal */}
              <div className="mt-12 text-center">
                <a
                  href="tel:+917877639699"
                  className="inline-block px-8 py-3 bg-[#8B7355] text-white rounded-full font-bold hover:bg-[#725E45] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default StoneProductDetailPage
