import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import sandstoneHeroImg from '../../../assets/our products/sandstone.jpg'

const SandstonePage = (props) => {
  return (
    <StoneCategoryTemplate
      categoryId="sandstone"
      title="SANDSTONE"
      subtitle="Timeless Elegance Carved in Earth"
      description="Experience the raw beauty and unparalleled durability of our premium Sandstone collection. Perfect for architectural masterpieces that stand the test of time."
      defaultHeroImage={sandstoneHeroImg}
      {...props}
    />
  )
}

export default SandstonePage
