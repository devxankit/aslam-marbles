import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import slateHeroImage from '../../../assets/our products/slatejpg.jpg'

const SlatePage = (props) => {
  return (
    <StoneCategoryTemplate
      categoryId="slate"
      title="SLATE"
      subtitle="Natural Elegance for Timeless Spaces"
      description="Discover our exquisite collection of slate stones, perfect for creating stunning natural surfaces with unique textures and colors."
      defaultHeroImage={slateHeroImage}
      galleryLayout="uniform-5"
      {...props}
    />
  )
}

export default SlatePage
