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
            const sanitizedImage = (typeof parsed.image === 'string' ? parsed.image : parsed.image?.url) ||
              (typeof parsed.images?.[0] === 'string' ? parsed.images[0] : parsed.images?.[0]?.url) ||
              'https://via.placeholder.com/600'

            setProduct({
              ...parsed,
              image: sanitizedImage,
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

          // Map API response to Component format
          setProduct({
            id: apiProduct._id,
            name: apiProduct.name,
            image: (typeof apiProduct.image === 'string' ? apiProduct.image : apiProduct.image?.url) || (typeof apiProduct.images?.[0] === 'string' ? apiProduct.images[0] : apiProduct.images?.[0]?.url) || 'https://via.placeholder.com/600',
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
      'travertine': 'Travertine'
    }
    return names[actualStoneType] || actualStoneType
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
      <section className="w-full py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/products/${actualStoneType}`)}
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

          {/* Product Content - Image Left, Table Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Image */}
            <div className="w-full">
              <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Image Caption */}
              <div className="mt-8 p-8 bg-gray-50 rounded-2xl border-l-4 border-[#8B7355] shadow-sm">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                  <span className="font-serif italic font-bold text-gray-900 text-2xl block mb-3">{product.name}</span>
                  This premium natural stone is sourced directly from the historic quarries{product.specifications.Origin ? ` of ${product.specifications.Origin}` : ''}.
                  {product.specifications.Color && (
                    <> Renowned for its distinctive <span className="font-semibold text-[#8B7355]">{product.specifications.Color.toLowerCase()}</span> hues and remarkable geological strength,</>
                  )}
                  it serves as a centerpiece for architectural excellence.
                </p>
              </div>
            </div>

            {/* Right Side - Specifications Table */}
            <div className="w-full">
              <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="h-[1px] w-12 bg-[#8B7355]"></span>
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#8B7355]">
                      Technical Specifications
                    </h2>
                  </div>

                  {/* Stylized Specifications List */}
                  <div className="space-y-1">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div
                        key={key}
                        className={`group flex flex-col sm:flex-row sm:items-center justify-between p-5 transition-all duration-300 rounded-xl hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                      >
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 sm:mb-0 transition-colors group-hover:text-[#8B7355]">
                          {key}
                        </span>
                        <span className="text-base font-medium text-gray-800 sm:text-right">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Aesthetic Brand Touch */}
                  <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Crafted By</span>
                      <span className="text-xs font-serif italic text-[#8B7355]">Aslam Marble Suppliers</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center opacity-50">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8B7355]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default StoneProductDetailPage
