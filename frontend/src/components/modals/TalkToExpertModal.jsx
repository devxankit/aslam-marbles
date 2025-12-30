import { useState } from 'react'
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from '../../utils/constants'
import howItWorksBg from '../../assets/how it work/voice of devotion.jpeg'
import TranslatedText from '../TranslatedText'
import { usePageTranslation } from '../../hooks/usePageTranslation'

const TalkToExpertModal = ({ isOpen, onClose }) => {
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    type: 'DOMESTIC',
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

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert(getTranslatedText('Thank you! Your form has been submitted.'))
    onClose()
    setFormStep(1)
    setFormData({
      type: 'DOMESTIC',
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
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      onClick={onClose}
    >
      {/* Background Image - Full Screen */}
      <div className="absolute inset-0">
        <img
          src={howItWorksBg}
          alt="How It Works Background"
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />

        {/* HOW IT WORKS Text Overlay - Bottom Left */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide drop-shadow-lg">
            <TranslatedText>HOW IT WORKS</TranslatedText>
          </h2>
        </div>
      </div>

      {/* Form Container - Right Side (Smaller Size) */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] md:w-[450px] overflow-y-auto bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <h3 className="text-lg md:text-xl font-bold" style={{ color: '#8B7355' }}><TranslatedText>Talk to Our Expert</TranslatedText></h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold" style={{ color: '#8B7355' }}>{formStep}/2</span>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-2xl font-bold transition-colors w-7 h-7 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-4 md:p-5">
          {formStep === 1 ? (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setFormStep(2); }}>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="DOMESTIC"
                    checked={formData.type === 'DOMESTIC'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-3.5 h-3.5 accent-amber-600"
                  />
                  <span className="text-xs md:text-sm font-medium" style={{ color: formData.type === 'DOMESTIC' ? '#8B7355' : '#333' }}><TranslatedText>DOMESTIC</TranslatedText></span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="INTERNATIONAL"
                    checked={formData.type === 'INTERNATIONAL'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-3.5 h-3.5 accent-amber-600"
                  />
                  <span className="text-xs md:text-sm font-medium" style={{ color: formData.type === 'INTERNATIONAL' ? '#8B7355' : '#333' }}><TranslatedText>INTERNATIONAL</TranslatedText></span>
                </label>
              </div>

              <input
                type="text"
                placeholder={getTranslatedText("Full Name *")}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />

              <input
                type="email"
                placeholder={getTranslatedText("Email Address *")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />

              <div>
                <label className="block text-xs md:text-sm font-medium mb-1.5"><TranslatedText>Phone number</TranslatedText></label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-1.5 px-2.5 bg-gray-50 border-r">
                    <span className="text-lg">🇮🇳</span>
                    <span className="text-xs">+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder={getTranslatedText("Phone number *")}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder={getTranslatedText("City *")}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />

              <div>
                <label className="block text-xs md:text-sm font-medium mb-2"><TranslatedText>Tell us about yourself *</TranslatedText></label>
                <div className="space-y-2">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="aboutYourself"
                      value="homeowner"
                      checked={formData.aboutYourself === 'homeowner'}
                      onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                      className="mt-0.5 w-3.5 h-3.5 accent-amber-600 flex-shrink-0"
                      required
                    />
                    <span className="text-xs md:text-sm leading-relaxed"><TranslatedText>I am a homeowner looking for a pooja unit or pooja room</TranslatedText></span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="aboutYourself"
                      value="designer"
                      checked={formData.aboutYourself === 'designer'}
                      onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                      className="mt-0.5 w-3.5 h-3.5 accent-amber-600 flex-shrink-0"
                      required
                    />
                    <span className="text-xs md:text-sm leading-relaxed"><TranslatedText>I am an interior designer/consultant seeking solutions for my client</TranslatedText></span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white py-2.5 rounded-lg text-sm font-medium transition-colors shadow-md"
                style={{ backgroundColor: '#8B7355' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
              >
                <TranslatedText>NEXT</TranslatedText>
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs md:text-sm font-bold mb-2"><TranslatedText>What are you looking for? *</TranslatedText></label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="lookingFor"
                      value="singular"
                      checked={formData.lookingFor === 'singular'}
                      onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                      className="w-3.5 h-3.5 accent-amber-600"
                      required
                    />
                    <span className="text-xs md:text-sm"><TranslatedText>Singular Marble Mandir Unit</TranslatedText></span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="lookingFor"
                      value="complete"
                      checked={formData.lookingFor === 'complete'}
                      onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                      className="w-3.5 h-3.5 accent-amber-600"
                      required
                    />
                    <span className="text-xs md:text-sm"><TranslatedText>Complete Pooja Room Solution</TranslatedText></span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-bold mb-2"><TranslatedText>What is your estimated budget? *</TranslatedText></label>
                <div className="space-y-2">
                  {BUDGET_OPTIONS.map((budget) => (
                    <label key={budget} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="budget"
                        value={budget}
                        checked={formData.budget === budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-3.5 h-3.5 accent-amber-600"
                        required
                      />
                      <span className="text-xs md:text-sm"><TranslatedText>{budget}</TranslatedText></span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-bold mb-2"><TranslatedText>What is your timeline for the project? *</TranslatedText></label>
                <div className="space-y-2">
                  {TIMELINE_OPTIONS.map((timeline) => (
                    <label key={timeline} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="timeline"
                        value={timeline}
                        checked={formData.timeline === timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-3.5 h-3.5 accent-amber-600"
                        required
                      />
                      <span className="text-xs md:text-sm"><TranslatedText>{timeline}</TranslatedText></span>
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                placeholder={getTranslatedText("Please share a bit more about your needs")}
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
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
                  className="block w-full text-white py-2.5 rounded-lg text-sm text-center font-medium cursor-pointer transition-colors shadow-md"
                  style={{ backgroundColor: '#8B7355' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
                >
                  <TranslatedText>UPLOAD DESIGN REFERENCES</TranslatedText>
                </label>
                {formData.designReferences && formData.designReferences.length > 0 && (
                  <p className="text-xs text-gray-600 mt-1.5">
                    {formData.designReferences.length} <TranslatedText>file(s) selected</TranslatedText>
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormStep(1)}
                  className="flex-1 bg-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-md border-2"
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
                  className="flex-1 text-white py-2.5 rounded-lg text-sm font-medium transition-colors shadow-md"
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
      </div>
    </div>
  )
}

export default TalkToExpertModal
