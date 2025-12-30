import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TrustedBySection from '../../../components/common/TrustedBySection'
import LazyImage from '../../../components/common/LazyImage'
import { fetchFAQs } from '../../../utils/faqUtils'
import TranslatedText from '../../../components/TranslatedText'

const ShopByPage = ({
    onShowCart,
    onShowLikes,
    onShowBooking
}) => {
    const navigate = useNavigate()
    const [expandedFaq, setExpandedFaq] = useState(null)
    const [faqs, setFaqs] = useState([])
    const [loadingFAQs, setLoadingFAQs] = useState(true)

    // Room categories
    const roomCategories = [
        { name: 'Pooja Room', slug: 'pooja-room', image: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1b?auto=format&fit=crop&q=80&w=800' },
        { name: 'Living Room', slug: 'living-room', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800' },
        { name: 'Dinning Room', slug: 'dinning-room', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800' },
        { name: 'Powder Room', slug: 'powder-room', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800' },
        { name: 'Foyer', slug: 'foyer', image: 'https://images.unsplash.com/photo-1600566753229-21a1b5d7c321?auto=format&fit=crop&q=80&w=800' }
    ]

    // Occasion categories
    const occasionCategories = [
        { name: 'Housewarming', slug: 'housewarming', image: 'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?auto=format&fit=crop&q=80&w=800' },
        { name: 'Festivals', slug: 'festivals', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800' },
        { name: 'Wedding', slug: 'wedding', image: 'https://images.unsplash.com/photo-1519167758481-83f29da8484d?auto=format&fit=crop&q=80&w=800' },
        { name: 'Religious Ceremonies', slug: 'religious-ceremonies', image: 'https://images.unsplash.com/photo-1609157522720-28b21bb10941?auto=format&fit=crop&q=80&w=800' },
        { name: 'Memorials', slug: 'memorials', image: 'https://images.unsplash.com/photo-1562207808-c982f08ec615?auto=format&fit=crop&q=80&w=800' }
    ]

    // Fetch FAQs
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoadingFAQs(true)
                const data = await fetchFAQs('shop-by')
                setFaqs(data || [])
            } catch (error) {
                console.error('Error loading FAQs:', error)
                setFaqs([])
            } finally {
                setLoadingFAQs(false)
            }
        }
        loadFAQs()
    }, [])

    const handleCategoryClick = (section, slug) => {
        navigate(`/shop-by/${section}/${slug}`)
    }

    return (
        <div className="w-full min-h-screen bg-white">
            <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

            {/* Hero Section */}
            <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden bg-white">
                <LazyImage
                    src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=2000"
                    alt="Shop By Collection"
                    className="w-full h-full"
                    imageClassName="w-full h-full object-cover opacity-80"
                    priority={true}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 bg-white/10">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">
                            <TranslatedText>Shop By Collection</TranslatedText>
                        </h1>
                        <p className="text-gray-600 text-sm md:text-lg font-light tracking-widest uppercase">
                            <TranslatedText>Find Perfect Pieces for Your Space & Occasion</TranslatedText>
                        </p>
                        <div className="w-12 h-[1px] bg-gray-300 mx-auto mt-8"></div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full py-20 px-4 md:px-8 bg-white">
                <div className="max-w-7xl mx-auto space-y-24">

                    {/* Rooms Section */}
                    <div className="scroll-mt-28">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 italic font-normal mb-2">
                                <TranslatedText>Shop by Room</TranslatedText>
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base font-light mt-4 max-w-2xl mx-auto">
                                <TranslatedText>Discover curated collections for every space in your home</TranslatedText>
                            </p>
                            <div className="w-8 h-[1px] bg-[#8B7355] mx-auto opacity-30 mt-6"></div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
                            {roomCategories.map((category) => (
                                <div
                                    key={category.slug}
                                    onClick={() => handleCategoryClick('rooms', category.slug)}
                                    className="cursor-pointer group"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-gray-50 mb-3 rounded-lg border border-gray-100">
                                        <LazyImage
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full"
                                            imageClassName="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                            width={300}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <h4 className="text-gray-900 text-xs md:text-sm font-medium uppercase tracking-widest text-center group-hover:text-[#8B7355] transition-colors">
                                        {category.name}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Occasions Section */}
                    <div className="scroll-mt-28">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 italic font-normal mb-2">
                                <TranslatedText>Shop by Occasion</TranslatedText>
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base font-light mt-4 max-w-2xl mx-auto">
                                <TranslatedText>Perfect gifts and decor for life's special moments</TranslatedText>
                            </p>
                            <div className="w-8 h-[1px] bg-[#8B7355] mx-auto opacity-30 mt-6"></div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
                            {occasionCategories.map((category) => (
                                <div
                                    key={category.slug}
                                    onClick={() => handleCategoryClick('occasions', category.slug)}
                                    className="cursor-pointer group"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-gray-50 mb-3 rounded-lg border border-gray-100">
                                        <LazyImage
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full"
                                            imageClassName="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                            width={300}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <h4 className="text-gray-900 text-xs md:text-sm font-medium uppercase tracking-widest text-center group-hover:text-[#8B7355] transition-colors">
                                        {category.name}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <section className="w-full py-20 md:py-24 px-4 md:px-8 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4"><TranslatedText>Frequently Asked Questions</TranslatedText></h2>
                        <div className="w-12 h-[1px] bg-[#8B7355] mx-auto opacity-30"></div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {loadingFAQs ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center gap-3">
                                    <div className="w-5 h-5 border-2 border-[#8B7355] border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-gray- text-sm md:text-base"><TranslatedText>Loading FAQs...</TranslatedText></p>
                                </div>
                            </div>
                        ) : faqs.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-sm md:text-base"><TranslatedText>No FAQs available at the moment.</TranslatedText></p>
                            </div>
                        ) : (
                            faqs.map((faq, index) => {
                                const faqId = faq._id || faq.id || index
                                const isExpanded = expandedFaq === faqId
                                return (
                                    <div
                                        key={faqId}
                                        className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-300 ${isExpanded ? 'border-[#8B7355] shadow-md ring-1 ring-[#8B7355]/20' : 'border-gray-100 hover:shadow-md hover:border-gray-200'}`}
                                    >
                                        <button
                                            onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                                            className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between text-left cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-3 md:gap-4 flex-1">
                                                <span className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-sm md:text-base font-bold flex-shrink-0 transition-colors ${isExpanded ? 'bg-[#8B7355] text-white' : 'bg-[#8B7355]/10 text-[#8B7355] group-hover:bg-[#8B7355]/20'}`}>
                                                    {index + 1}
                                                </span>
                                                <span className={`text-sm md:text-base font-medium flex-1 transition-colors ${isExpanded ? 'text-[#8B7355]' : 'text-gray-800 group-hover:text-[#8B7355]'}`}>
                                                    {faq.question}
                                                </span>
                                            </div>
                                            <div className={`flex-shrink-0 ml-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isExpanded ? 'bg-[#8B7355] rotate-180' : 'bg-gray-100 group-hover:bg-[#8B7355]/10'}`}>
                                                <svg className={`w-4 h-4 transition-colors ${isExpanded ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            {faq.answer && (
                                                <div className="px-5 md:px-6 pb-5 md:pb-6">
                                                    <div className="pl-11 md:pl-14 border-l-2 border-[#8B7355]/30">
                                                        <div
                                                            className="text-sm md:text-base text-gray-600 leading-relaxed max-w-none italic"
                                                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </section>

            <TrustedBySection />
            <Footer />
            <FloatingButtons onChatClick={onShowBooking} />
        </div>
    )
}

export default ShopByPage
