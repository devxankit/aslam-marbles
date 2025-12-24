import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import marbleHeroImg from '../../../assets/our products/marble .jpg'

const MarblePage = (props) => {
  return (
    <StoneCategoryTemplate
      categoryId="marble"
      title="MARBLE"
      subtitle="Luxury and Elegance in Every Slab"
      description="Explore our premium collection of marble varieties, showcasing timeless beauty and sophistication for your architectural and design needs."
      defaultHeroImage={marbleHeroImg}
      galleryLayout="uniform-5"
      {...props}
    />
  )
}

export default MarblePage
