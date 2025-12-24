import React from 'react'
import { useParams } from 'react-router-dom'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'

// Fallback Images
import slabImg from '../../../assets/packaging/slab.png'
import tilesImg from '../../../assets/packaging/tiles.png'
import artifactsImg from '../../../assets/packaging/artifacts.png'
import otherImg from '../../../assets/packaging/other.png'

const PackagingCategoryPage = (props) => {
    const { categoryId } = useParams()

    const fallbacks = {
        'packaging-slab': slabImg,
        'packaging-tiles': tilesImg,
        'packaging-artifacts': artifactsImg,
        'packaging-other': otherImg
    }

    // Format title from categoryId (e.g., 'packaging-slab' -> 'SLAB PACKAGING')
    const title = categoryId.replace('packaging-', '').replace('-', ' ').toUpperCase() + ' PACKAGING'

    return (
        <StoneCategoryTemplate
            categoryId={categoryId}
            title={title}
            subtitle="Ensuring Safety Every Step of the Way"
            description="Discover our specialized packaging techniques designed to protect your premium marble and stone products during transit."
            defaultHeroImage={fallbacks[categoryId]}
            galleryLayout="uniform-5"
            {...props}
        />
    )
}

export default PackagingCategoryPage
