import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import pebbleStonesHeroImage from '../../../assets/our products/pebble stones.jpg'

const PebbleStonesPage = (props) => {
  return (
    <StoneCategoryTemplate
      categoryId="pebble-stones"
      title="PEBBLE STONES"
      subtitle="Natural Accents for Refined Spaces"
      description="Discover the textural beauty of our pebble collection, ranging from polished river stones to natural sandstone pebbles, perfect for landscaping and accent features."
      defaultHeroImage={pebbleStonesHeroImage}
      {...props}
    />
  )
}

export default PebbleStonesPage
