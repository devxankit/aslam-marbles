import { useState } from 'react'
import TranslatedText from '../TranslatedText'
// Communal imports
import communalImg1 from '../../assets/communal/1733300550903.jpeg'
import communalImg2 from '../../assets/communal/wmremove-transformed.jpeg'
import communalImg3 from '../../assets/communal/wmremove-transformed (3).jpeg'
import communalImg4 from '../../assets/communal/wmremove-transformed (4).jpeg'
import communalImg5 from '../../assets/communal/wmremove-transformed (5).jpeg'
import communalImg6 from '../../assets/communal/wmremove-transformed (6).jpeg'

// Residential imports
import residentialImg1 from '../../assets/residential/1733296958645.jpeg'
import residentialImg2 from '../../assets/residential/1733300646054.jpeg'
import residentialImg3 from '../../assets/residential/2d07e532-fa01-4e30-b638-52b26887f92c-small.jpeg'
import residentialImg4 from '../../assets/residential/99e40aab-0df8-4175-ad0e-a0a94517b611-medium.jpeg'
import residentialImg5 from '../../assets/residential/06fcbe87-a149-445b-912c-6787ef4a4d50.png'
import residentialImg6 from '../../assets/residential/446d311a-f90e-4837-b736-3f8e6a5f4b2c.png'
import residentialImg7 from '../../assets/residential/4d2730d0-5d47-49f4-94b5-a8d151f7b39b.png'
import residentialImg8 from '../../assets/residential/8d836775-b2f6-4c0a-8ab4-5b7c27a36e55.png'

// International imports
import internationalImg1 from '../../assets/international/14d31fa5-cfd7-4b90-a247-9748d279f3c7.png'
import internationalImg2 from '../../assets/international/299a63e6-532b-4b95-960c-1547e879b758.png'
import internationalImg3 from '../../assets/international/81fe6d99-c983-460b-9cfb-586795089d56.png'
import internationalImg4 from '../../assets/international/ca344ef3-3bd3-44dc-adeb-cd70d1b3c573.png'
import internationalImg5 from '../../assets/international/edc914ef-1943-4164-9e46-bc67ee0d0364.png'

const ExploreProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('communal')

  const projectCategories = {
    communal: [communalImg1, communalImg2, communalImg3, communalImg4, communalImg5, communalImg6],
    residential: [residentialImg1, residentialImg2, residentialImg3, residentialImg4, residentialImg5, residentialImg6, residentialImg7, residentialImg8],
    international: [internationalImg1, internationalImg2, internationalImg3, internationalImg4, internationalImg5]
  }

  return (
    <section className="w-full py-8 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 md:px-8">
        {/* Compact Heading */}
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-xl md:text-5xl font-serif text-[#8B7355] italic mb-3 uppercase tracking-tight md:tracking-wider">
            <TranslatedText>Explore Our Projects</TranslatedText>
          </h2>
          <div className="w-12 md:w-20 h-0.5 mx-auto bg-[#8B7355]/30"></div>
        </div>

        {/* Compact Category Buttons */}
        <div className="flex justify-center gap-2 md:gap-4 mb-6 md:mb-12">
          {['communal', 'residential', 'international'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 md:px-8 py-2 md:py-4 text-[10px] md:text-sm font-bold uppercase tracking-widest transition-all rounded-sm border ${activeCategory === cat
                ? 'bg-[#8B7355] text-white border-[#8B7355] shadow-lg'
                : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-[#8B7355]/50'
                }`}
            >
              <TranslatedText>{cat}</TranslatedText>
            </button>
          ))}
        </div>

        {/* Compact 3-Column Grid for All Screens */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-6">
          {projectCategories[activeCategory].slice(0, 6).map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-md md:rounded-2xl bg-white group shadow-sm border border-gray-100"
            >
              <img
                src={image}
                alt={`${activeCategory} project ${index + 1}`}
                className="w-full h-full !h-full !w-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExploreProjectsSection
