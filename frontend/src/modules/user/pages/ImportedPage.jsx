import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import heroImg from '../../../assets/ourcreation/homedecor.jpeg'

const ImportedPage = (props) => {
    return (
        <StoneCategoryTemplate
            categoryId="imported"
            title="IMPORTED"
            subtitle="Exquisite Stones from Around the World"
            description="Discover our premium selection of imported stones, sourced from the finest quarries globally."
            defaultHeroImage={heroImg}
            galleryLayout="uniform-5"
            {...props}
        />
    )
}

export default ImportedPage
