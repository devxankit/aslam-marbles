import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import stoneChipsHeroImage from '../../../assets/our products/soap stone .jpg'

const StoneChipsPage = (props) => {
  return (
    <StoneCategoryTemplate
      categoryId="stone-chips"
      title="STONE CHIPS"
      subtitle="Versatile Textures for Landscape Design"
      description="Our premium selection of crushed stone chips offers a variety of colors and sizes for garden paths, decorative mulch, and architectural surface treatments."
      defaultHeroImage={stoneChipsHeroImage}
      galleryLayout="uniform-5"
      {...props}
    />
  )
}

export default StoneChipsPage
