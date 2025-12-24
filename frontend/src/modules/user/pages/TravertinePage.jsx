import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import travertineHeroImage from '../../../assets/our products/travertine.jpg'

const TravertinePage = (props) => {
    return (
        <StoneCategoryTemplate
            categoryId="travertine"
            title="TRAVERTINE"
            subtitle="Classic Elegance from Rome to Your Home"
            description="Characterized by its pitted holes and troughs, Travertine brings an ancient, distinctive look that exudes luxury and history in every slab."
            defaultHeroImage={travertineHeroImage}
            galleryLayout="uniform-5"
            {...props}
        />
    )
}

export default TravertinePage
