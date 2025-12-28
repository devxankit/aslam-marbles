import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom'
// User Pages
import HomePage from './modules/user/pages/HomePage'
import LocationPage from './modules/user/pages/LocationPage'
import LocationDetailPage from './modules/user/pages/LocationDetailPage'
import BlogPage from './modules/user/pages/BlogPage'
import BlogDetailPage from './modules/user/pages/BlogDetailPage'
import TestimonialsPage from './modules/user/pages/TestimonialsPage'
import BookAppointmentPage from './modules/user/pages/BookAppointmentPage'
import CareersPage from './modules/user/pages/CareersPage'
import HowItWorksPage from './modules/user/pages/HowItWorksPage'
import VisitStorePage from './modules/user/pages/VisitStorePage'
import MurtiPage from './modules/user/pages/MurtiPage'
import DurgaCategoryPage from './modules/user/pages/DurgaCategoryPage'
import SaraswatiCategoryPage from './modules/user/pages/SaraswatiCategoryPage'
import ShivParvatiCategoryPage from './modules/user/pages/ShivParvatiCategoryPage'
import SaiBabaCategoryPage from './modules/user/pages/SaiBabaCategoryPage'
import VishnuLaxmiCategoryPage from './modules/user/pages/VishnuLaxmiCategoryPage'
import GaneshaCategoryPage from './modules/user/pages/GaneshaCategoryPage'
import HanumanCategoryPage from './modules/user/pages/HanumanCategoryPage'
import RadhaKrishnaCategoryPage from './modules/user/pages/RadhaKrishnaCategoryPage'
import RamDarbarCategoryPage from './modules/user/pages/RamDarbarCategoryPage'
import KrishnaCategoryPage from './modules/user/pages/KrishnaCategoryPage'
import ShivCategoryPage from './modules/user/pages/ShivCategoryPage'
import JainMurtiCategoryPage from './modules/user/pages/JainMurtiCategoryPage'
import NandiCategoryPage from './modules/user/pages/NandiCategoryPage'
import BalajiCategoryPage from './modules/user/pages/BalajiCategoryPage'
import DreamTemplePage from './modules/user/pages/DreamTemplePage'
import PoojaRoomPage from './modules/user/pages/PoojaRoomPage'
import HomeDecorPage from './modules/user/pages/HomeDecorPage'
import OnSalePage from './modules/user/pages/OnSalePage'
import CommunalTemplesPage from './modules/user/pages/CommunalTemplesPage'
import JainTemplesPage from './modules/user/pages/JainTemplesPage'
import ArtisansOfTilakPage from './modules/user/pages/ArtisansOfTilakPage'
import TheTeamPage from './modules/user/pages/TheTeamPage'
import AboutUsPage from './modules/user/pages/AboutUsPage'
import OurClientsPage from './modules/user/pages/OurClientsPage'
import ExperienceCentrePage from './modules/user/pages/ExperienceCentrePage'
import CorporateInfoPage from './modules/user/pages/CorporateInfoPage'
import TermsAndConditionsPage from './modules/user/pages/TermsAndConditionsPage'
import PrivacyPolicyPage from './modules/user/pages/PrivacyPolicyPage'
import CookiesPolicyPage from './modules/user/pages/CookiesPolicyPage'
import DisclaimerPage from './modules/user/pages/DisclaimerPage'
import FAQsPage from './modules/user/pages/FAQsPage'
import ProductDetailPage from './modules/user/pages/ProductDetailPage'
import CategoryListingPage from './modules/user/pages/CategoryListingPage'
import CommunalProjectsPage from './modules/user/pages/CommunalProjectsPage'
import ResidentialProjectsPage from './modules/user/pages/ResidentialProjectsPage'
import InternationalProjectsPage from './modules/user/pages/InternationalProjectsPage'
import SandstonePage from './modules/user/pages/SandstonePage'
import StoneProductDetailPage from './modules/user/pages/StoneProductDetailPage'
import LimestonePage from './modules/user/pages/LimestonePage'
import SlatePage from './modules/user/pages/SlatePage'
import NaturalIndianStonesPage from './modules/user/pages/NaturalIndianStonesPage'
import MarblePage from './modules/user/pages/MarblePage'
import QuartzitePage from './modules/user/pages/QuartzitePage'
import PebbleStonesPage from './modules/user/pages/PebbleStonesPage'
import CobbleStonesPage from './modules/user/pages/CobbleStonesPage'
import StoneChipsPage from './modules/user/pages/StoneChipsPage'
import GranitePage from './modules/user/pages/GranitePage'
import BasaltPage from './modules/user/pages/BasaltPage'
import SoapStonePage from './modules/user/pages/SoapStonePage'
import TravertinePage from './modules/user/pages/TravertinePage'
import TSADesignHubPage from './modules/user/pages/TSADesignHubPage'
import TSAInternationalPage from './modules/user/pages/TSAInternationalPage'
import IndividualProductDetailPage from './modules/user/pages/IndividualProductDetailPage'
import ModernArtPage from './modules/user/pages/ModernArtPage'
import ImportedPage from './modules/user/pages/ImportedPage'
import PackagingPage from './modules/user/pages/PackagingPage'
import PackagingCategoryPage from './modules/user/pages/PackagingCategoryPage'
import MurtiCategoryTemplate from './modules/user/components/MurtiCategoryTemplate'
import LiveInventoryPage from './modules/user/pages/LiveInventoryPage'


import LimitedEditionPage from './modules/user/pages/LimitedEditionPage'
import CheckoutPage from './modules/user/pages/CheckoutPage'
import ShippingPage from './modules/user/pages/ShippingPage'
import OrderSuccessPage from './modules/user/pages/OrderSuccessPage'
import LoginPage from './modules/user/pages/LoginPage'
import ForgotPasswordPage from './modules/user/pages/ForgotPasswordPage'
import ProfilePage from './modules/user/pages/ProfilePage'
// Admin Pages
import AdminLoginPage from './modules/admin/pages/AdminLoginPage'
import AdminDashboard from './modules/admin/pages/AdminDashboard'
import LeadsManagementPage from './modules/admin/pages/LeadsManagementPage'
import OrdersPage from './modules/admin/pages/OrdersPage'
import ProductsManagementPage from './modules/admin/pages/ProductsManagementPage'
import BlogManagementPage from './modules/admin/pages/BlogManagementPage'
import TestimonialsManagementPage from './modules/admin/pages/TestimonialsManagementPage'
import ProjectsManagementPage from './modules/admin/pages/ProjectsManagementPage'
import FAQsManagementPage from './modules/admin/pages/FAQsManagementPage'
import ContentPagesManagementPage from './modules/admin/pages/ContentPagesManagementPage'
import SettingsPage from './modules/admin/pages/SettingsPage'
import CategoryManagementPage from './modules/admin/pages/CategoryManagementPage'
import HeroSectionManagementPage from './modules/admin/pages/HeroSectionManagementPage'
import AboutUsManagementPage from './modules/admin/pages/AboutUsManagementPage'
import ExperienceCentreManagementPage from './modules/admin/pages/ExperienceCentreManagementPage'
import TheTeamManagementPage from './modules/admin/pages/TheTeamManagementPage'
import CareersManagementPage from './modules/admin/pages/CareersManagementPage'
import ArtistManagementPage from './modules/admin/pages/ArtistManagementPage'
import OurArtistManagementPage from './modules/admin/pages/OurArtistManagementPage'
import OurClientsManagementPage from './modules/admin/pages/OurClientsManagementPage'
import CommunalProjectsManagementPage from './modules/admin/pages/CommunalProjectsManagementPage'
import ResidentialProjectsManagementPage from './modules/admin/pages/ResidentialProjectsManagementPage'
import InternationalProjectsManagementPage from './modules/admin/pages/InternationalProjectsManagementPage'
import PoojaRoomManagementPage from './modules/admin/pages/PoojaRoomManagementPage'
import DreamTempleManagementPage from './modules/admin/pages/DreamTempleManagementPage'
import CommunalTemplesManagementPage from './modules/admin/pages/CommunalTemplesManagementPage'
import JainTemplesManagementPage from './modules/admin/pages/JainTemplesManagementPage'
import MurtiManagementPage from './modules/admin/pages/MurtiManagementPage'
import HomeDecorManagementPage from './modules/admin/pages/HomeDecorManagementPage'
import LiveInventoryManagementPage from './modules/admin/pages/LiveInventoryManagementPage'

import OurServicesManagementPage from './modules/admin/pages/OurServicesManagementPage'
import TSADesignHubManagementPage from './modules/admin/pages/TSADesignHubManagementPage'
import TSAInternationalManagementPage from './modules/admin/pages/TSAInternationalManagementPage'
import TalkToExpertPage from './modules/admin/pages/TalkToExpertPage'
import ProtectedRoute from './modules/admin/components/ProtectedRoute'
import AslamHousePage from './modules/admin/pages/AslamHousePage'
import ProjectsNavPage from './modules/admin/pages/ProjectsNavPage'
import OurCreationsNavPage from './modules/admin/pages/OurCreationsNavPage'
import OurServicesNavPage from './modules/admin/pages/OurServicesNavPage'
import OurProductsNavPage from './modules/admin/pages/OurProductsNavPage'
import StoneProductsManagementPage from './modules/admin/pages/StoneProductsManagementPage'
import CompaniesManagementPage from './modules/admin/pages/CompaniesManagementPage'
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
    <CartAndLikesProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
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

          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />

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
    </CartAndLikesProvider>
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
