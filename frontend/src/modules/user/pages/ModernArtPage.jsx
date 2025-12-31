import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import heroImg from '../../../assets/ourcreation/Murti.jpeg'

const ModernArtPage = (props) => {
    return (
        <StoneCategoryTemplate
            categoryId="modern-art"
            title="MODERN ART"
            subtitle="Contemporary Expressions in Stone"
            description="Explore our collection of modern abstract art and contemporary stone sculptures."
            defaultHeroImage={heroImg}
            galleryLayout="uniform-5"
            basePath="/art"
            navVariant="creations"
            {...props}
        />
    )
}

export default ModernArtPage
