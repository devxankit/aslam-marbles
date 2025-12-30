import { useState } from 'react'
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from '../../utils/constants'
import TranslatedText from '../TranslatedText'
import { usePageTranslation } from '../../hooks/usePageTranslation'

const LocationForm = () => {
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    aboutYourself: '',
    lookingFor: '',
    budget: '',
    timeline: '',
    additionalInfo: '',
    designReferences: null
  })

  // Define dynamic texts (placeholders, alerts)
  const DYNAMIC_TEXTS = [
    'Full Name *',
    'Email Address *',
    'Phone number *',
    'City *',
    'Please share a bit more about your needs',
    'Thank you! Your form has been submitted.'
  ]

  const { getTranslatedText } = usePageTranslation(DYNAMIC_TEXTS, 'en')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert(getTranslatedText('Thank you! Your form has been submitted.'))
    setFormStep(1)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      aboutYourself: '',
      lookingFor: '',
      budget: '',
      timeline: '',
      additionalInfo: '',
      designReferences: null
    })
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b-2 border-gray-200 bg-gradient-to-r from-[#8B7355]/10 to-transparent flex-shrink-0 rounded-t-xl md:rounded-t-2xl">
        <h3 className="text-base md:text-lg font-bold uppercase tracking-wide" style={{ color: '#8B7355' }}><TranslatedText>Talk to Our Expert</TranslatedText></h3>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#8B7355]/10" style={{ color: '#8B7355' }}>{formStep}/2</span>
      </div>

      <div className="px-3 pt-3 pb-4 md:px-4 md:pt-4 md:pb-4 bg-white overflow-y-auto flex-1 rounded-b-xl md:rounded-b-2xl">

        {formStep === 1 ? (
          <form className="space-y-2.5" onSubmit={(e) => { e.preventDefault(); setFormStep(2); }}>
            <input
              type="text"
              placeholder={getTranslatedText("Full Name *")}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />

            <input
              type="email"
              placeholder={getTranslatedText("Email Address *")}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />

            <div>
              <label className="block text-xs font-medium mb-1"><TranslatedText>Phone number</TranslatedText></label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <div className="flex items-center gap-1 px-2 bg-gray-50 border-r">
                  <span className="text-sm">🇮🇳</span>
                  <span className="text-xs">+91</span>
                </div>
                <input
                  type="tel"
                  placeholder={getTranslatedText("Phone number *")}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder={getTranslatedText("City *")}
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />

            <div>
              <label className="block text-xs font-medium mb-1.5"><TranslatedText>Tell us about yourself *</TranslatedText></label>
              <div className="space-y-1.5">
                <label className="flex items-start gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="aboutYourself"
                    value="homeowner"
                    checked={formData.aboutYourself === 'homeowner'}
                    onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                    className="mt-0.5 w-3 h-3 accent-amber-600 flex-shrink-0"
                    required
                  />
                  <span className="text-xs leading-relaxed"><TranslatedText>I am a homeowner looking for a pooja unit or pooja room</TranslatedText></span>
                </label>
                <label className="flex items-start gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="aboutYourself"
                    value="designer"
                    checked={formData.aboutYourself === 'designer'}
                    onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                    className="mt-0.5 w-3 h-3 accent-amber-600 flex-shrink-0"
                    required
                  />
                  <span className="text-xs leading-relaxed"><TranslatedText>I am an interior designer/consultant seeking solutions for my client</TranslatedText></span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white py-2.5 rounded-lg text-xs font-medium transition-colors shadow-md"
              style={{ backgroundColor: '#8B7355' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
            >
              <TranslatedText>NEXT</TranslatedText>
            </button>
          </form>
        ) : (
          <form className="space-y-2.5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold mb-1.5"><TranslatedText>What are you looking for? *</TranslatedText></label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="lookingFor"
                    value="singular"
                    checked={formData.lookingFor === 'singular'}
                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                    className="w-3 h-3 accent-amber-600"
                    required
                  />
                  <span className="text-xs"><TranslatedText>Singular Marble Mandir Unit</TranslatedText></span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="lookingFor"
                    value="complete"
                    checked={formData.lookingFor === 'complete'}
                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                    className="w-3 h-3 accent-amber-600"
                    required
                  />
                  <span className="text-xs"><TranslatedText>Complete Pooja Room Solution</TranslatedText></span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5"><TranslatedText>What is your estimated budget? *</TranslatedText></label>
              <div className="space-y-1.5">
                {BUDGET_OPTIONS.map((budget) => (
                  <label key={budget} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="budget"
                      value={budget}
                      checked={formData.budget === budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-3 h-3 accent-amber-600"
                      required
                    />
                    <span className="text-xs"><TranslatedText>{budget}</TranslatedText></span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5"><TranslatedText>What is your timeline for the project? *</TranslatedText></label>
              <div className="space-y-1.5">
                {TIMELINE_OPTIONS.map((timeline) => (
                  <label key={timeline} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="timeline"
                      value={timeline}
                      checked={formData.timeline === timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-3 h-3 accent-amber-600"
                      required
                    />
                    <span className="text-xs"><TranslatedText>{timeline}</TranslatedText></span>
                  </label>
                ))}
              </div>
            </div>

            <textarea
              placeholder={getTranslatedText("Please share a bit more about your needs")}
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
            />

            <div>
              <input
                type="file"
                id="designReferences"
                accept="image/*,.pdf"
                multiple
                onChange={(e) => setFormData({ ...formData, designReferences: e.target.files })}
                className="hidden"
              />
              <label
                htmlFor="designReferences"
                className="block w-full text-white py-2 rounded-lg text-xs text-center font-medium cursor-pointer transition-colors shadow-md"
                style={{ backgroundColor: '#8B7355' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
              >
                <TranslatedText>UPLOAD DESIGN REFERENCES</TranslatedText>
              </label>
              {formData.designReferences && formData.designReferences.length > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  {formData.designReferences.length} <TranslatedText>file(s) selected</TranslatedText>
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFormStep(1)}
                className="flex-1 bg-white py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors shadow-md border-2"
                style={{ color: '#8B7355', borderColor: '#8B7355' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f9f9f9'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'white'
                }}
              >
                <TranslatedText>BACK</TranslatedText>
              </button>
              <button
                type="submit"
                className="flex-1 text-white py-2 rounded-lg text-xs font-medium transition-colors shadow-md"
                style={{ backgroundColor: '#8B7355' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
              >
                <TranslatedText>SUBMIT</TranslatedText>
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

export default LocationForm

