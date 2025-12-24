import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import naturalStoneCarving from '../../../assets/our products/Natural Indian Stones/Natural Stone Carving.jpg'

const NaturalIndianStonesPage = (props) => {
  return (
    <StoneCategoryTemplate
      categoryId="natural-indian-stones"
      title="NATURAL INDIAN STONES"
      subtitle="The Soul of Indian Craftsmanship"
      description="Experience the versatile applications of authentic Indian stones, from intricate carvings and mosaics to structural monoliths and architectural wall panels."
      defaultHeroImage={naturalStoneCarving}
      galleryLayout="uniform-5"
      {...props}
    />
  )
}

export default NaturalIndianStonesPage
