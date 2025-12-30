import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'

const MonumentPage = (props) => {
    return (
        <StoneCategoryTemplate
            categoryId="monument"
            title="MONUMENT"
            subtitle="Timeless Tributes in Stone"
            description="Honor and celebrate legacies with our expertly crafted stone monuments, designed with precision and durability to last for generations."
            defaultHeroImage="https://images.unsplash.com/photo-1596422846543-75c6fc183f24?q=80&w=2070&auto=format&fit=crop"
            galleryLayout="uniform-5"
            {...props}
        />
    )
}

export default MonumentPage
