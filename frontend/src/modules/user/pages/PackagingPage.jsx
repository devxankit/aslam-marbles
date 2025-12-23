import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import HeroSectionWithForm from '../../../components/common/HeroSectionWithForm'
import ImageGallery from '../../../components/common/ImageGallery'
import heroImg from '../../../assets/ourcreation/Pooja.jpeg'

const PackagingPage = ({
    onShowSidebar,
    onShowProjects,
    onShowCreations,
    onShowProducts,
    onShowServices,
    onShowHowItWorks,
    onShowLocation,
    onShowBooking
}) => {
    // Empty array for now as requested
    const packagingImages = []

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

            <HeroSectionWithForm
                heroImage={heroImg}
                title="PACKAGING"
                subtitle="Secure & Premium Packaging Standards"
                description="We ensure that every masterpiece reaches you safely with our international standard packaging."
            />

            <ImageGallery
                title="Packaging Standards"
                description="See how we carefully pack and ship our products to ensure zero damage."
                images={packagingImages}
                stoneType="packaging"
                origin="Internal"
            />

            <Footer />
            <FloatingButtons />
        </div>
    )
}

export default PackagingPage
