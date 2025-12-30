import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'

const AgatePage = (props) => {
    return (
        <StoneCategoryTemplate
            categoryId="agate"
            title="AGATE"
            subtitle="Exotic Elegance and Natural patterns"
            description="Discover the mesmerizing beauty of agate, featuring unique colors and patterns that bring a touch of exotic luxury to any space."
            defaultHeroImage="https://images.unsplash.com/photo-1596422846543-75c6fc183f24?q=80&w=2070&auto=format&fit=crop"
            galleryLayout="uniform-5"
            {...props}
        />
    )
}

export default AgatePage
