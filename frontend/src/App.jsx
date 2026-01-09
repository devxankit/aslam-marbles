import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import SmoothScroll from './components/common/SmoothScroll'
import LoadingSpinner from './components/common/LoadingSpinner'

// User Pages - Lazy Loaded
const HomePage = lazy(() => import('./modules/user/pages/HomePage'))
const LocationPage = lazy(() => import('./modules/user/pages/LocationPage'))
const LocationDetailPage = lazy(() => import('./modules/user/pages/LocationDetailPage'))
const BlogPage = lazy(() => import('./modules/user/pages/BlogPage'))
const BlogDetailPage = lazy(() => import('./modules/user/pages/BlogDetailPage'))
const TestimonialsPage = lazy(() => import('./modules/user/pages/TestimonialsPage'))
const BookAppointmentPage = lazy(() => import('./modules/user/pages/BookAppointmentPage'))
const CareersPage = lazy(() => import('./modules/user/pages/CareersPage'))
const HowItWorksPage = lazy(() => import('./modules/user/pages/HowItWorksPage'))
const VisitStorePage = lazy(() => import('./modules/user/pages/VisitStorePage'))
const MurtiPage = lazy(() => import('./modules/user/pages/MurtiPage'))
const DurgaCategoryPage = lazy(() => import('./modules/user/pages/DurgaCategoryPage'))
const SaraswatiCategoryPage = lazy(() => import('./modules/user/pages/SaraswatiCategoryPage'))
const ShivParvatiCategoryPage = lazy(() => import('./modules/user/pages/ShivParvatiCategoryPage'))
const SaiBabaCategoryPage = lazy(() => import('./modules/user/pages/SaiBabaCategoryPage'))
const VishnuLaxmiCategoryPage = lazy(() => import('./modules/user/pages/VishnuLaxmiCategoryPage'))
const GaneshaCategoryPage = lazy(() => import('./modules/user/pages/GaneshaCategoryPage'))
const HanumanCategoryPage = lazy(() => import('./modules/user/pages/HanumanCategoryPage'))
const RadhaKrishnaCategoryPage = lazy(() => import('./modules/user/pages/RadhaKrishnaCategoryPage'))
const RamDarbarCategoryPage = lazy(() => import('./modules/user/pages/RamDarbarCategoryPage'))
const KrishnaCategoryPage = lazy(() => import('./modules/user/pages/KrishnaCategoryPage'))
const ShivCategoryPage = lazy(() => import('./modules/user/pages/ShivCategoryPage'))
const JainMurtiCategoryPage = lazy(() => import('./modules/user/pages/JainMurtiCategoryPage'))
const NandiCategoryPage = lazy(() => import('./modules/user/pages/NandiCategoryPage'))
const BalajiCategoryPage = lazy(() => import('./modules/user/pages/BalajiCategoryPage'))
const DreamTemplePage = lazy(() => import('./modules/user/pages/DreamTemplePage'))
const PoojaRoomPage = lazy(() => import('./modules/user/pages/PoojaRoomPage'))
const HomeDecorPage = lazy(() => import('./modules/user/pages/HomeDecorPage'))
const OnSalePage = lazy(() => import('./modules/user/pages/OnSalePage'))
const ShopByCategoryPage = lazy(() => import('./modules/user/pages/ShopByCategoryPage'))
const ShopByPage = lazy(() => import('./modules/user/pages/ShopByPage'))
const ShopByProductDetailPage = lazy(() => import('./modules/user/pages/ShopByProductDetailPage'))
const CommunalTemplesPage = lazy(() => import('./modules/user/pages/CommunalTemplesPage'))
const JainTemplesPage = lazy(() => import('./modules/user/pages/JainTemplesPage'))
const ArtisansOfTilakPage = lazy(() => import('./modules/user/pages/ArtisansOfTilakPage'))
const TheTeamPage = lazy(() => import('./modules/user/pages/TheTeamPage'))
const AboutUsPage = lazy(() => import('./modules/user/pages/AboutUsPage'))
const OurClientsPage = lazy(() => import('./modules/user/pages/OurClientsPage'))
const ExperienceCentrePage = lazy(() => import('./modules/user/pages/ExperienceCentrePage'))
const CorporateInfoPage = lazy(() => import('./modules/user/pages/CorporateInfoPage'))
const TermsAndConditionsPage = lazy(() => import('./modules/user/pages/TermsAndConditionsPage'))
const PrivacyPolicyPage = lazy(() => import('./modules/user/pages/PrivacyPolicyPage'))
const CookiesPolicyPage = lazy(() => import('./modules/user/pages/CookiesPolicyPage'))
const DisclaimerPage = lazy(() => import('./modules/user/pages/DisclaimerPage'))
const FAQsPage = lazy(() => import('./modules/user/pages/FAQsPage'))
const ProductDetailPage = lazy(() => import('./modules/user/pages/ProductDetailPage'))
const CategoryListingPage = lazy(() => import('./modules/user/pages/CategoryListingPage'))
const CommunalProjectsPage = lazy(() => import('./modules/user/pages/CommunalProjectsPage'))
const ResidentialProjectsPage = lazy(() => import('./modules/user/pages/ResidentialProjectsPage'))
const InternationalProjectsPage = lazy(() => import('./modules/user/pages/InternationalProjectsPage'))
const SandstonePage = lazy(() => import('./modules/user/pages/SandstonePage'))
const StoneProductDetailPage = lazy(() => import('./modules/user/pages/StoneProductDetailPage'))
const LimestonePage = lazy(() => import('./modules/user/pages/LimestonePage'))
const SlatePage = lazy(() => import('./modules/user/pages/SlatePage'))
const NaturalIndianStonesPage = lazy(() => import('./modules/user/pages/NaturalIndianStonesPage'))
const MarblePage = lazy(() => import('./modules/user/pages/MarblePage'))
const QuartzitePage = lazy(() => import('./modules/user/pages/QuartzitePage'))
const PebbleStonesPage = lazy(() => import('./modules/user/pages/PebbleStonesPage'))
const CobbleStonesPage = lazy(() => import('./modules/user/pages/CobbleStonesPage'))
const StoneChipsPage = lazy(() => import('./modules/user/pages/StoneChipsPage'))
const GranitePage = lazy(() => import('./modules/user/pages/GranitePage'))
const BasaltPage = lazy(() => import('./modules/user/pages/BasaltPage'))
const SoapStonePage = lazy(() => import('./modules/user/pages/SoapStonePage'))
const TravertinePage = lazy(() => import('./modules/user/pages/TravertinePage'))
const TSADesignHubPage = lazy(() => import('./modules/user/pages/TSADesignHubPage'))
const TSAInternationalPage = lazy(() => import('./modules/user/pages/TSAInternationalPage'))
const MonumentPage = lazy(() => import('./modules/user/pages/MonumentPage'))
const AgatePage = lazy(() => import('./modules/user/pages/AgatePage'))
const IndividualProductDetailPage = lazy(() => import('./modules/user/pages/IndividualProductDetailPage'))
const ModernArtPage = lazy(() => import('./modules/user/pages/ModernArtPage'))
const ImportedPage = lazy(() => import('./modules/user/pages/ImportedPage'))
const PackagingPage = lazy(() => import('./modules/user/pages/PackagingPage'))
const PackagingCategoryPage = lazy(() => import('./modules/user/pages/PackagingCategoryPage'))
const MurtiCategoryTemplate = lazy(() => import('./modules/user/components/MurtiCategoryTemplate'))
const LiveInventoryPage = lazy(() => import('./modules/user/pages/LiveInventoryPage'))
const SearchResultsPage = lazy(() => import('./modules/user/pages/SearchResultsPage'))

const LimitedEditionPage = lazy(() => import('./modules/user/pages/LimitedEditionPage'))
const CheckoutPage = lazy(() => import('./modules/user/pages/CheckoutPage'))
const ShippingPage = lazy(() => import('./modules/user/pages/ShippingPage'))
const OrderSuccessPage = lazy(() => import('./modules/user/pages/OrderSuccessPage'))
const LoginPage = lazy(() => import('./modules/user/pages/LoginPage'))
const ForgotPasswordPage = lazy(() => import('./modules/user/pages/ForgotPasswordPage'))
const ProfilePage = lazy(() => import('./modules/user/pages/ProfilePage'))

// Admin Pages - Lazy Loaded
const AdminLoginPage = lazy(() => import('./modules/admin/pages/AdminLoginPage'))
const AdminForgotPasswordPage = lazy(() => import('./modules/admin/pages/AdminForgotPasswordPage'))
const AdminDashboard = lazy(() => import('./modules/admin/pages/AdminDashboard'))
const LeadsManagementPage = lazy(() => import('./modules/admin/pages/LeadsManagementPage'))
const OrdersPage = lazy(() => import('./modules/admin/pages/OrdersPage'))
const ProductsManagementPage = lazy(() => import('./modules/admin/pages/ProductsManagementPage'))
const BlogManagementPage = lazy(() => import('./modules/admin/pages/BlogManagementPage'))
const TestimonialsManagementPage = lazy(() => import('./modules/admin/pages/TestimonialsManagementPage'))
const ProjectsManagementPage = lazy(() => import('./modules/admin/pages/ProjectsManagementPage'))
const FAQsManagementPage = lazy(() => import('./modules/admin/pages/FAQsManagementPage'))
const ContentPagesManagementPage = lazy(() => import('./modules/admin/pages/ContentPagesManagementPage'))
const SettingsPage = lazy(() => import('./modules/admin/pages/SettingsPage'))
const CategoryManagementPage = lazy(() => import('./modules/admin/pages/CategoryManagementPage'))
const HeroSectionManagementPage = lazy(() => import('./modules/admin/pages/HeroSectionManagementPage'))
const AboutUsManagementPage = lazy(() => import('./modules/admin/pages/AboutUsManagementPage'))
const ExperienceCentreManagementPage = lazy(() => import('./modules/admin/pages/ExperienceCentreManagementPage'))
const TheTeamManagementPage = lazy(() => import('./modules/admin/pages/TheTeamManagementPage'))
const CareersManagementPage = lazy(() => import('./modules/admin/pages/CareersManagementPage'))
const ArtistManagementPage = lazy(() => import('./modules/admin/pages/ArtistManagementPage'))
const OurArtistManagementPage = lazy(() => import('./modules/admin/pages/OurArtistManagementPage'))
const OurClientsManagementPage = lazy(() => import('./modules/admin/pages/OurClientsManagementPage'))
const CommunalProjectsManagementPage = lazy(() => import('./modules/admin/pages/CommunalProjectsManagementPage'))
const ResidentialProjectsManagementPage = lazy(() => import('./modules/admin/pages/ResidentialProjectsManagementPage'))
const InternationalProjectsManagementPage = lazy(() => import('./modules/admin/pages/InternationalProjectsManagementPage'))
const PoojaRoomManagementPage = lazy(() => import('./modules/admin/pages/PoojaRoomManagementPage'))
const DreamTempleManagementPage = lazy(() => import('./modules/admin/pages/DreamTempleManagementPage'))
const CommunalTemplesManagementPage = lazy(() => import('./modules/admin/pages/CommunalTemplesManagementPage'))
const JainTemplesManagementPage = lazy(() => import('./modules/admin/pages/JainTemplesManagementPage'))
const MurtiManagementPage = lazy(() => import('./modules/admin/pages/MurtiManagementPage'))
const HomeDecorManagementPage = lazy(() => import('./modules/admin/pages/HomeDecorManagementPage'))
const SpecialCollectionManagementPage = lazy(() => import('./modules/admin/pages/SpecialCollectionManagementPage'))
const ShopByManagementPage = lazy(() => import('./modules/admin/pages/ShopByManagementPage'))
const LiveInventoryManagementPage = lazy(() => import('./modules/admin/pages/LiveInventoryManagementPage'))
const WalletPage = lazy(() => import('./modules/admin/pages/WalletPage'))
const OurServicesManagementPage = lazy(() => import('./modules/admin/pages/OurServicesManagementPage'))
const TSADesignHubManagementPage = lazy(() => import('./modules/admin/pages/TSADesignHubManagementPage'))
const TSAInternationalManagementPage = lazy(() => import('./modules/admin/pages/TSAInternationalManagementPage'))
const TalkToExpertPage = lazy(() => import('./modules/admin/pages/TalkToExpertPage'))
const AslamHousePage = lazy(() => import('./modules/admin/pages/AslamHousePage'))
const ProjectsNavPage = lazy(() => import('./modules/admin/pages/ProjectsNavPage'))
const OurCreationsNavPage = lazy(() => import('./modules/admin/pages/OurCreationsNavPage'))
const OurServicesNavPage = lazy(() => import('./modules/admin/pages/OurServicesNavPage'))
const OurProductsNavPage = lazy(() => import('./modules/admin/pages/OurProductsNavPage'))
const StoneProductsManagementPage = lazy(() => import('./modules/admin/pages/StoneProductsManagementPage'))
const CompaniesManagementPage = lazy(() => import('./modules/admin/pages/CompaniesManagementPage'))

import ProtectedRoute from './modules/admin/components/ProtectedRoute'

// Modals
import ProjectsModal from './components/modals/ProjectsModal'
import OurCreationsModal from './components/modals/OurCreationsModal'
import OurProductsModal from './components/modals/OurProductsModal'
import OurServicesModal from './components/modals/OurServicesModal'
import Sidebar from './components/modals/Sidebar'
import HouseOfTilakModal from './components/modals/HouseOfTilakModal'
import CartModal from './components/modals/CartModal'
import LikesModal from './components/modals/LikesModal'
import TalkToExpertModal from './components/modals/TalkToExpertModal'
import BookingModal from './components/modals/BookingModal'
import ScrollToTop from './components/common/ScrollToTop'
import { CartAndLikesProvider } from './contexts/CartAndLikesContext'

const MurtiCategoryTemplateWrapper = (props) => {
  const { categoryId } = useParams()
  return <MurtiCategoryTemplate categoryId={categoryId} {...props} />
}

function App() {
  // Modal states (shared across all routes)
  const [showModal, setShowModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showLikes, setShowLikes] = useState(false)
  const [showProjectsModal, setShowProjectsModal] = useState(false)
  const [showOurCreations, setShowOurCreations] = useState(false)
  const [showOurProducts, setShowOurProducts] = useState(false)
  const [showOurServices, setShowOurServices] = useState(false)

  const location = useLocation()

  // Close all modals when route changes to prevent state leaks
  useEffect(() => {
    setShowModal(false)
    setShowBookingModal(false)
    setShowSidebar(false)
    setShowProjectsModal(false)
    setShowOurCreations(false)
    setShowOurProducts(false)
    setShowOurServices(false)
    setShowCart(false)
    setShowLikes(false)
  }, [location.pathname])

  // Prevent body scroll when any modal is open
  useEffect(() => {
    const isAnyModalOpen = showModal || showSidebar || showProjectsModal || showOurCreations || showOurProducts || showOurServices || showBookingModal || showCart || showLikes
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showModal, showSidebar, showProjectsModal, showOurCreations, showOurProducts, showOurServices, showBookingModal, showCart, showLikes])

  return (
    <SmoothScroll>
      <CartAndLikesProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={
                <HomePage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/location" element={
                <LocationPageWrapper
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/location/:locationName" element={
                <LocationDetailPageWrapper
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/blog" element={
                <BlogPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/blog/:id" element={
                <BlogDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/testimonials" element={
                <TestimonialsPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/book-appointment" element={
                <BookAppointmentPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                />
              } />

              <Route path="/checkout" element={
                <CheckoutPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />
              <Route path="/checkout/shipping" element={
                <ShippingPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />
              <Route path="/order-success" element={
                <OrderSuccessPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />
              <Route path="leads/orders" element={<OrdersPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/search" element={<SearchResultsPage />} />

              <Route path="/careers" element={
                <CareersPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                />
              } />

              <Route path="/artist" element={
                <ArtisansOfTilakPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                />
              } />

              <Route path="/the-team" element={
                <TheTeamPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/about-us" element={
                <AboutUsPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/our-clients" element={
                <OurClientsPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/experience-centre" element={
                <ExperienceCentrePage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/corporate-info" element={
                <CorporateInfoPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/terms-and-conditions" element={
                <TermsAndConditionsPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/privacy-policy" element={
                <PrivacyPolicyPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/faqs" element={
                <FAQsPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/cookies-policy" element={
                <CookiesPolicyPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/disclaimer" element={
                <DisclaimerPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/how-it-works" element={
                <HowItWorksPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/visit-store" element={
                <VisitStorePage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                />
              } />

              <Route path="/services/live-inventory" element={
                <LiveInventoryPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/dream-temple" element={
                <DreamTemplePage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/pooja-room" element={
                <PoojaRoomPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />


              <Route path="/home-decor" element={
                <HomeDecorPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/limited-edition" element={
                <LimitedEditionPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />
              <Route path="/limited-edition/:categoryId" element={
                <CategoryListingPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />
              <Route path="/limited-edition/:categoryId/:productId" element={
                <ProductDetailPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/on-sale" element={
                <OnSalePage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />
              <Route path="/on-sale/:categoryId" element={
                <CategoryListingPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />
              <Route path="/on-sale/:categoryId/:productId" element={
                <ProductDetailPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/shop-by" element={
                <ShopByPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                  onShowBooking={() => setShowBookingModal(true)}
                />
              } />

              <Route path="/shop-by/:section/:category" element={
                <ShopByCategoryPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowBooking={() => setShowBookingModal(true)}
                />
              } />

              <Route path="/shop-by/:section/:category/:productId" element={
                <ShopByProductDetailPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                  onShowBooking={() => setShowBookingModal(true)}
                />
              } />

              {/* Furniture Routes */}
              <Route path="/furniture/:categoryId" element={
                <CategoryListingPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />
              <Route path="/furniture/:categoryId/:productId" element={
                <ProductDetailPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              {/* Home Decor Routes */}
              <Route path="/home-decor/:categoryId" element={
                <CategoryListingPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />
              <Route path="/home-decor/:categoryId/:productId" element={
                <ProductDetailPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />
              <Route path="/communal-temples" element={
                <CommunalTemplesPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/jain-temples" element={
                <JainTemplesPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/communal-projects" element={
                <CommunalProjectsPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/residential-projects" element={
                <ResidentialProjectsPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/international-projects" element={
                <InternationalProjectsPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/sandstone" element={
                <SandstonePage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/sandstone/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/limestone/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/limestone" element={
                <LimestonePage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/slate/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/slate" element={
                <SlatePage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/natural-indian-stones/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/natural-indian-stones" element={
                <NaturalIndianStonesPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/marble/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/marble" element={
                <MarblePage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/quartzite/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/quartzite" element={
                <QuartzitePage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/pebble-stones" element={
                <PebbleStonesPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/pebble-stones/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/cobble-stones/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/cobble-stones" element={
                <CobbleStonesPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/stone-chips/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/stone-chips" element={
                <StoneChipsPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/granite/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/granite" element={
                <GranitePage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/basalt-stones/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/basalt-stones" element={
                <BasaltPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/soap-stones/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/soap-stones" element={
                <SoapStonePage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/travertine-stones/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/travertine-stones" element={
                <TravertinePage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              {/* Monument Routes */}
              <Route path="/products/monument" element={
                <MonumentPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/monument/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              {/* Agate Routes */}
              <Route path="/products/agate" element={
                <AgatePage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/products/agate/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/art/modern-art/:productId" element={
                <ProductDetailPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/art/modern-art" element={
                <ModernArtPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/art/imported/:productId" element={
                <ProductDetailPage
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/art/imported" element={
                <ImportedPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/art/packaging" element={
                <PackagingPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/art/packaging/:categoryId" element={
                <PackagingCategoryPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/art/packaging/:categoryId/:productId" element={
                <StoneProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />





              <Route path="/services/ams-design-hub" element={
                <TSADesignHubPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/services/ams-international" element={
                <TSAInternationalPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />


              <Route path="/murti" element={
                <MurtiPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/murti/ganesha" element={
                <GaneshaCategoryPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/murti/ganesha/:productId" element={
                <ProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/murti/hanuman" element={
                <HanumanCategoryPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/murti/hanuman/:productId" element={
                <ProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/murti/radha-krishna" element={
                <RadhaKrishnaCategoryPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/murti/radha-krishna/:productId" element={
                <ProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/murti/ram-darbar" element={
                <RamDarbarCategoryPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              <Route path="/murti/ram-darbar/:productId" element={
                <ProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              {/* Dynamic Murti Routes */}
              <Route path="/murti/:categoryId" element={
                <MurtiCategoryTemplateWrapper
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                  onShowCart={() => setShowCart(true)}
                  onShowLikes={() => setShowLikes(true)}
                />
              } />

              <Route path="/murti/:categoryId/:productId" element={
                <ProductDetailPage
                  onShowSidebar={() => setShowSidebar(true)}
                  onShowProjects={() => setShowProjectsModal(true)}
                  onShowCreations={() => setShowOurCreations(true)}
                  onShowProducts={() => setShowOurProducts(true)}
                  onShowServices={() => setShowOurServices(true)}
                  onShowHowItWorks={() => setShowModal(true)}
                  onShowLocation={() => { }}
                  onShowBooking={() => { }}
                />
              } />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />

              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/leads/orders" element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/leads/talk-to-expert" element={
                <ProtectedRoute>
                  <TalkToExpertPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/leads/:type" element={
                <ProtectedRoute>
                  <LeadsManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/products/:category" element={
                <ProtectedRoute>
                  <ProductsManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/content/murtis" element={
                <ProtectedRoute>
                  <MurtiManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/content/home-decor" element={
                <ProtectedRoute>
                  <HomeDecorManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/content/blog" element={
                <ProtectedRoute>
                  <BlogManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/content/testimonials" element={
                <ProtectedRoute>
                  <TestimonialsManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/content/projects" element={
                <ProtectedRoute>
                  <ProjectsManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/content/faqs" element={
                <ProtectedRoute>
                  <FAQsManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/content/pages" element={
                <ProtectedRoute>
                  <ContentPagesManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/content/hero-section" element={
                <ProtectedRoute>
                  <HeroSectionManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/aslam-house/about-us" element={
                <ProtectedRoute>
                  <AboutUsManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/aslam-house/experience-centre" element={
                <ProtectedRoute>
                  <ExperienceCentreManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/aslam-house/the-team" element={
                <ProtectedRoute>
                  <TheTeamManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/aslam-house/careers" element={
                <ProtectedRoute>
                  <CareersManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/aslam-house/our-artist" element={
                <ProtectedRoute>
                  <OurArtistManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/aslam-house/our-clients" element={
                <ProtectedRoute>
                  <OurClientsManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/aslam-house/communal-projects" element={
                <ProtectedRoute>
                  <CommunalProjectsManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/projects/residential" element={
                <ProtectedRoute>
                  <ResidentialProjectsManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/projects/international" element={
                <ProtectedRoute>
                  <InternationalProjectsManagementPage />
                </ProtectedRoute>
              } />

              <Route path="/admin/pages/aslam-house" element={
                <ProtectedRoute>
                  <AslamHousePage />
                </ProtectedRoute>
              } />
              <Route path="/admin/pages/projects-nav" element={
                <ProtectedRoute>
                  <ProjectsNavPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/pages/our-creations-nav" element={
                <ProtectedRoute>
                  <OurCreationsNavPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/pages/our-services-nav" element={
                <ProtectedRoute>
                  <OurServicesNavPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/pages/our-products-nav" element={
                <ProtectedRoute>
                  <OurProductsNavPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/products/stone-pages" element={
                <ProtectedRoute>
                  <StoneProductsManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/products/companies" element={
                <ProtectedRoute>
                  <CompaniesManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/content/pooja-room" element={
                <ProtectedRoute>
                  <PoojaRoomManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/content/dream-temple" element={
                <ProtectedRoute>
                  <DreamTempleManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/content/special-collections" element={
                <ProtectedRoute>
                  <SpecialCollectionManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/content/shop-by" element={
                <ProtectedRoute>
                  <ShopByManagementPage />
                </ProtectedRoute>
              } />

              <Route path="/admin/content/our-services" element={
                <ProtectedRoute>
                  <OurServicesManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/services/live-inventory" element={
                <ProtectedRoute>
                  <LiveInventoryManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/our-services/design-hub" element={
                <ProtectedRoute>
                  <TSADesignHubManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/our-services/international" element={
                <ProtectedRoute>
                  <TSAInternationalManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/wallet" element={
                <ProtectedRoute>
                  <WalletPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/category/communal-temples" element={
                <ProtectedRoute>
                  <CommunalTemplesManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/category/jain-temples" element={
                <ProtectedRoute>
                  <JainTemplesManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/category/:type" element={
                <ProtectedRoute>
                  <CategoryManagementPage />
                </ProtectedRoute>
              } />
            </Routes>
          </Suspense>

          {/* Global Modals */}
          <TalkToExpertModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
          <HouseOfTilakModal
            isOpen={showSidebar}
            onClose={() => setShowSidebar(false)}
          />
          <CartModal
            isOpen={showCart}
            onClose={() => setShowCart(false)}
          />
          <LikesModal
            isOpen={showLikes}
            onClose={() => setShowLikes(false)}
          />
          <ProjectsModal
            isOpen={showProjectsModal}
            onClose={() => setShowProjectsModal(false)}
          />
          <OurCreationsModal
            isOpen={showOurCreations}
            onClose={() => setShowOurCreations(false)}
          />
          <OurServicesModal
            isOpen={showOurServices}
            onClose={() => setShowOurServices(false)}
          />
          <OurProductsModal
            isOpen={showOurProducts}
            onClose={() => setShowOurProducts(false)}
          />
        </div>
        <Toaster position="top-right" />
      </CartAndLikesProvider>
    </SmoothScroll>
  )
}

// Wrapper components for routes that need navigation
const LocationPageWrapper = (props) => {
  const navigate = useNavigate()

  const handleLocationClick = (locationName) => {
    navigate(`/location/${locationName.toLowerCase()}`)
  }

  return (
    <LocationPage
      {...props}
      onLocationClick={handleLocationClick}
    />
  )
}

const LocationDetailPageWrapper = (props) => {
  const { locationName } = useParams()
  const navigate = useNavigate()

  const location = locationName ? locationName.toUpperCase() : ''

  return (
    <LocationDetailPage
      {...props}
      location={location}
      onBack={() => navigate('/location')}
    />
  )
}

export default App
