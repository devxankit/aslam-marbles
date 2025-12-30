import { useState, useEffect } from 'react'
import TranslatedText from '../TranslatedText'
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from '../../utils/constants'
import { usePageTranslation } from '../../hooks/usePageTranslation'

const HomePageFormPopup = ({ onClose }) => {
  const [formStep, setFormStep] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
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

  const STATIC_TEXTS = [
    'Talk to Our Expert',
    'DOMESTIC',
    'INTERNATIONAL',
    'Full Name *',
    'Email Address *',
    'Phone number',
    'Phone number *',
    'City *',
    'Tell us about yourself *',
    'I am a homeowner looking for a pooja unit or pooja room',
    'I am an interior designer/consultant seeking solutions for my client',
    'NEXT →',
    'What are you looking for? *',
    'Singular Marble Mandir Unit',
    'Complete Pooja Room Solution',
    'What is your estimated budget? *',
    'What is your timeline for the project? *',
    'Please share a bit more about your needs',
    'UPLOAD DESIGN REFERENCES',
    'Selected files:',
    'SUBMIT',
    'BACK',
    'Budget',
    'Timeline',
    'Additional Information (Optional)',
    'Submit',
    'Back',
    'Thank you! Your consultation request has been submitted successfully. We will contact you soon.',
    'Something went wrong. Please try again.',
    'Failed to submit consultation request'
  ]

  const { getTranslatedText } = usePageTranslation(STATIC_TEXTS, 'en')

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

      const payload = {
        type: formData.type,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        aboutYourself: formData.aboutYourself,
        lookingFor: formData.lookingFor,
        budget: formData.budget,
        timeline: formData.timeline,
        additionalInfo: formData.additionalInfo,
        designReferences: formData.designReferences ? Array.from(formData.designReferences).map(f => f.name) : []
      }

      const res = await fetch(`${API_URL}/expert-consultations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok || data.success === false) {
        throw new Error(data.message || getTranslatedText('Failed to submit consultation request'))
      }

      alert(getTranslatedText('Thank you! Your consultation request has been submitted successfully. We will contact you soon.'))

      // Reset form
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
      handleClose()
    } catch (error) {
      console.error('Error submitting consultation:', error)
      alert(error.message || getTranslatedText('Something went wrong. Please try again.'))
    }
  }

  if (!isVisible) return null

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slideDown 0.5s ease-out forwards;
        }
      `}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center pt-8 md:pt-12">
        {/* Backdrop/Overlay - Click anywhere to close */}
        <div
          className="absolute inset-0 bg-black/0 cursor-pointer"
          onClick={handleClose}
        ></div>

        {/* Popup Content */}
        <div
          className="relative w-[85%] sm:w-[420px] md:w-[460px] lg:w-[480px] max-w-[calc(100%-32px)] bg-white rounded-xl md:rounded-2xl shadow-2xl flex flex-col animate-slide-down z-10"
          style={{ maxHeight: '90vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b-2 border-gray-200 bg-gradient-to-r from-[#8B7355]/10 to-transparent flex-shrink-0 rounded-t-xl md:rounded-t-2xl">
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide" style={{ color: '#8B7355' }}>{getTranslatedText('Talk to Our Expert')}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm font-semibold px-2.5 py-1.5 rounded-full bg-[#8B7355]/10" style={{ color: '#8B7355' }}>{formStep}/2</span>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none w-6 h-6 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>

          <div className="px-4 pt-4 pb-5 md:px-6 md:pt-5 md:pb-6 bg-white overflow-y-auto flex-1 rounded-b-xl md:rounded-b-2xl" style={{ maxHeight: 'calc(90vh - 80px)' }}>
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
                      className="w-4 h-4 accent-amber-600"
                    />
                    <span className="text-sm font-medium" style={{ color: formData.type === 'DOMESTIC' ? '#8B7355' : '#333' }}>{getTranslatedText('DOMESTIC')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="INTERNATIONAL"
                      checked={formData.type === 'INTERNATIONAL'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-4 h-4 accent-amber-600"
                    />
                    <span className="text-sm font-medium" style={{ color: formData.type === 'INTERNATIONAL' ? '#8B7355' : '#333' }}>{getTranslatedText('INTERNATIONAL')}</span>
                  </label>
                </div>

                <input
                  type="text"
                  placeholder={getTranslatedText('Full Name *')}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />

                <input
                  type="email"
                  placeholder={getTranslatedText('Email Address *')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />

                <div>
                  <label className="block text-sm font-medium mb-2">{getTranslatedText('Phone number')}</label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-1.5 px-3 py-3 bg-gray-50 border-r">
                      <span className="text-base">🇮🇳</span>
                      <span className="text-sm">+91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder={getTranslatedText('Phone number *')}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                      required
                    />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder={getTranslatedText('City *')}
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />

                <div>
                  <label className="block text-sm font-medium mb-2.5">{getTranslatedText('Tell us about yourself *')}</label>
                  <div className="space-y-2.5">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="aboutYourself"
                        value="homeowner"
                        checked={formData.aboutYourself === 'homeowner'}
                        onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                        className="mt-1 w-4 h-4 accent-amber-600 flex-shrink-0"
                        required
                      />
                      <span className="text-sm leading-relaxed">{getTranslatedText('I am a homeowner looking for a pooja unit or pooja room')}</span>
                    </label>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="aboutYourself"
                        value="designer"
                        checked={formData.aboutYourself === 'designer'}
                        onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                        className="mt-1 w-4 h-4 accent-amber-600 flex-shrink-0"
                        required
                      />
                      <span className="text-sm leading-relaxed">{getTranslatedText('I am an interior designer/consultant seeking solutions for my client')}</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] mt-2"
                  style={{ backgroundColor: '#8B7355' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
                >
                  {getTranslatedText('NEXT →')}
                </button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-bold mb-2.5">{getTranslatedText('What are you looking for? *')}</label>
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="lookingFor"
                        value="singular"
                        checked={formData.lookingFor === 'singular'}
                        onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                        className="w-4 h-4 accent-amber-600"
                        required
                      />
                      <span className="text-sm">{getTranslatedText('Singular Marble Mandir Unit')}</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="lookingFor"
                        value="complete"
                        checked={formData.lookingFor === 'complete'}
                        onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                        className="w-4 h-4 accent-amber-600"
                        required
                      />
                      <span className="text-sm">{getTranslatedText('Complete Pooja Room Solution')}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2.5">{getTranslatedText('What is your estimated budget? *')}</label>
                  <div className="space-y-2.5">
                    {BUDGET_OPTIONS.map((budget) => (
                      <label key={budget} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          name="budget"
                          value={budget}
                          checked={formData.budget === budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-4 h-4 accent-amber-600"
                          required
                        />
                        <span className="text-sm"><TranslatedText>{budget}</TranslatedText></span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2.5">{getTranslatedText('What is your timeline for the project? *')}</label>
                  <div className="space-y-2.5">
                    {TIMELINE_OPTIONS.map((timeline) => (
                      <label key={timeline} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          name="timeline"
                          value={timeline}
                          checked={formData.timeline === timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-4 h-4 accent-amber-600"
                          required
                        />
                        <span className="text-sm"><TranslatedText>{timeline}</TranslatedText></span>
                      </label>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder={getTranslatedText('Please share a bit more about your needs')}
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
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
                    className="block w-full text-white py-3 rounded-lg text-sm text-center font-medium cursor-pointer transition-colors shadow-md"
                    style={{ backgroundColor: '#8B7355' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
                  >
                    {getTranslatedText('UPLOAD DESIGN REFERENCES')}
                  </label>
                  {formData.designReferences && formData.designReferences.length > 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      {formData.designReferences.length} {getTranslatedText('Selected files:')}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="flex-1 bg-white py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-md border-2"
                    style={{ color: '#8B7355', borderColor: '#8B7355' }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#f9f9f9'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'white'
                    }}
                  >
                    {getTranslatedText('BACK')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 text-white py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    style={{ backgroundColor: '#8B7355' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
                  >
                    {getTranslatedText('SUBMIT')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePageFormPopup

