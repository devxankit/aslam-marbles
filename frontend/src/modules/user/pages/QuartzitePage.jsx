import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import quartziteHeroImage from '../../../assets/our products/quartzite.jpg'

const QuartzitePage = (props) => {
  return (
    <StoneCategoryTemplate
      categoryId="quartzite"
      title="QUARTZITE"
      subtitle="Durable Beauty for Lasting Impressions"
      description="Discover our exceptional collection of quartzite stones, combining natural elegance with remarkable durability for stunning architectural applications."
      defaultHeroImage={quartziteHeroImage}
      galleryLayout="uniform-5"
      {...props}
    />
  )
}

export default QuartzitePage
