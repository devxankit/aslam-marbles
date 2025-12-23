import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import floweryGoldMarble from '../../../assets/our products/limestone/flowery-gold-marble.jpg'

const LimestonePage = (props) => {
  return (
    <StoneCategoryTemplate
      categoryId="limestone"
      title="LIMESTONE"
      subtitle="Elegant Natural Stone for Timeless Beauty"
      description="Discover our stunning range of limestone varieties, perfect for creating elegant and sophisticated spaces with natural elegance and durability."
      defaultHeroImage={floweryGoldMarble}
      {...props}
    />
  )
}

export default LimestonePage
