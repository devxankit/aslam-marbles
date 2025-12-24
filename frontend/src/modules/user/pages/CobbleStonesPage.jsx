import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import cobbleStonesHeroImage from '../../../assets/our products/cobble stones.jpg'

const CobbleStonesPage = (props) => {
  return (
    <StoneCategoryTemplate
      categoryId="cobble-stones"
      title="COBBLE STONES"
      subtitle="Heritage Craftsmanship for Modern Pathways"
      description="Our premium cobbles are hand-finished to provide a rustic yet elegant touch to driveways, pedestrian paths, and historic-style landscaping."
      defaultHeroImage={cobbleStonesHeroImage}
      galleryLayout="uniform-5"
      {...props}
    />
  )
}

export default CobbleStonesPage
