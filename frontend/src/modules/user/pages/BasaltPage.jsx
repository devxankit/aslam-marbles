import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import basaltHeroImage from '../../../assets/our products/basalt.jpg'

const BasaltPage = (props) => {
    return (
        <StoneCategoryTemplate
            categoryId="basalt"
            title="BASALT STONES"
            subtitle="Volcanic Elegance for Modern Design"
            description="Known for its durability and rich dark tones, Basalt is a volcanic rock that adds a sophisticated, contemporary touch to any paving or cladding project."
            defaultHeroImage={basaltHeroImage}
            {...props}
        />
    )
}

export default BasaltPage
