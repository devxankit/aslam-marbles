import React from 'react'
import StoneCategoryTemplate from '../components/StoneCategoryTemplate'
import soapStoneHeroImage from '../../../assets/our products/soap stone .jpg'

const SoapStonePage = (props) => {
    return (
        <StoneCategoryTemplate
            categoryId="soap-stone"
            title="SOAP STONE"
            subtitle="Smooth Texture, Timeless Appeal"
            description="Renowned for its soft feel and heat resistance, Soap Stone allows for intricate carving and is a favorite for sculptures, countertops, and woodstoves."
            defaultHeroImage={soapStoneHeroImage}
            {...props}
        />
    )
}

export default SoapStonePage
