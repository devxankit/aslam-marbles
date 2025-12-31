import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import agateHero from '../../../assets/our products/agate/agate_hero.jpg'

const AgatePage = (props) => {
    return (
        <StoneCategoryTemplate
            categoryId="agate"
            title="AGATE"
            subtitle="Exotic Elegance and Natural patterns"
            description="Discover the mesmerizing beauty of agate, featuring unique colors and patterns that bring a touch of exotic luxury to any space."
            defaultHeroImage={agateHero}
            galleryLayout="uniform-5"
            {...props}
        />
    )
}

export default AgatePage
