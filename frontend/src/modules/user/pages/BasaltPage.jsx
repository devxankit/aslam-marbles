import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import basaltHeroImage from '../../../assets/our products/basalt.jpg'
import { usePageTranslation } from '../../../contexts/PageTranslationContext'

const BasaltPage = (props) => {
    const { getTranslatedText } = usePageTranslation()

    return (
        <StoneCategoryTemplate
            categoryId="basalt"
            title={getTranslatedText("BASALT STONES")}
            subtitle={getTranslatedText("Volcanic Elegance for Modern Design")}
            description={getTranslatedText("Known for its durability and rich dark tones, Basalt is a volcanic rock that adds a sophisticated, contemporary touch to any paving or cladding project.")}
            defaultHeroImage={basaltHeroImage}
            galleryLayout="uniform-5"
            {...props}
        />
    )
}

export default BasaltPage
