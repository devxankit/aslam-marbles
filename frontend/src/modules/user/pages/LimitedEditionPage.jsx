import { useState } from 'react'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'

const LimitedEditionPage = ({ onShowCart, onShowLikes }) => {
  return (
    <div className="w-full min-h-screen bg-white">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-4 md:mb-5 tracking-wide">
            Limited Edition
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our exclusive limited edition collection of premium marble products
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: '#8B7355' }}></div>
        </div>

        <div className="text-center py-20">
          <p className="text-lg text-gray-600">Limited Edition collection coming soon...</p>
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default LimitedEditionPage

