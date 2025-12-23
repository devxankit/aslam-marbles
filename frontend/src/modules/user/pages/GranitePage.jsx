import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import graniteHeroImage from '../../../assets/our products/granite.jpg'

const GranitePage = (props) => {
  return (
    <StoneCategoryTemplate
      categoryId="granite"
      title="GRANITE"
      subtitle="Unmatched Strength and Eternal Beauty"
      description="Discover our extensive collection of granite varieties, offering exceptional durability and stunning aesthetics for high-traffic areas and luxury spaces alike."
      defaultHeroImage={graniteHeroImage}
      {...props}
    />
  )
}

export default GranitePage
