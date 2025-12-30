import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import cobbleStonesHeroImage from '../../../assets/our products/cobble stones.jpg'
import { usePageTranslation } from '../../../contexts/PageTranslationContext'

const CobbleStonesPage = (props) => {
  const { getTranslatedText } = usePageTranslation()

  return (
    <StoneCategoryTemplate
      categoryId="cobble-stones"
      title={getTranslatedText("COBBLE STONES")}
      subtitle={getTranslatedText("Heritage Craftsmanship for Modern Pathways")}
      description={getTranslatedText("Our premium cobbles are hand-finished to provide a rustic yet elegant touch to driveways, pedestrian paths, and historic-style landscaping.")}
      defaultHeroImage={cobbleStonesHeroImage}
      galleryLayout="uniform-5"
      {...props}
    />
  )
}

export default CobbleStonesPage
