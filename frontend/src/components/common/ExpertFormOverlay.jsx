import { useState } from 'react'
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from '../../utils/constants'

const ExpertFormOverlay = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you! Your form has been submitted.')
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
    <div id="expert-form-container" className="absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 w-[85%] sm:w-[320px] md:w-[340px] max-w-[calc(100%-32px)] bg-white rounded-xl md:rounded-2xl shadow-2xl z-20 flex flex-col backdrop-blur-sm bg-white/95">
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b-2 border-gray-200 bg-gradient-to-r from-[#8B7355]/10 to-transparent flex-shrink-0 rounded-t-xl md:rounded-t-2xl">
        <h3 className="text-base md:text-lg font-bold uppercase tracking-wide" style={{ color: '#8B7355' }}>Talk to Our Expert</h3>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#8B7355]/10" style={{ color: '#8B7355' }}>{formStep}/2</span>
      </div>

      <div className="px-3 pt-3 pb-4 md:px-4 md:pt-4 md:pb-4 bg-white overflow-y-auto flex-1 rounded-b-xl md:rounded-b-2xl">
        {formStep === 1 ? (
          <form className="space-y-2.5" onSubmit={(e) => { e.preventDefault(); setFormStep(2); }}>
            <div className="flex gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="DOMESTIC"
                  checked={formData.type === 'DOMESTIC'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-3 h-3 accent-amber-600"
                />
                <span className="text-xs font-medium" style={{ color: formData.type === 'DOMESTIC' ? '#8B7355' : '#333' }}>DOMESTIC</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="INTERNATIONAL"
                  checked={formData.type === 'INTERNATIONAL'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-3 h-3 accent-amber-600"
                />
                <span className="text-xs font-medium" style={{ color: formData.type === 'INTERNATIONAL' ? '#8B7355' : '#333' }}>INTERNATIONAL</span>
              </label>
            </div>

            <input
              type="text"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />

            <input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />

            <div>
              <label className="block text-xs font-medium mb-1">Phone number</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <div className="flex items-center gap-1 px-2 bg-gray-50 border-r">
                  <span className="text-sm">🇮🇳</span>
                  <span className="text-xs">+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="Phone number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="City *"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />

            <div>
              <label className="block text-xs font-medium mb-1.5">Tell us about yourself *</label>
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
                  <span className="text-xs leading-relaxed">I am a homeowner looking for a pooja unit or pooja room</span>
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
                  <span className="text-xs leading-relaxed">I am an interior designer/consultant seeking solutions for my client</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              style={{ backgroundColor: '#8B7355' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
            >
              NEXT →
            </button>
          </form>
        ) : (
          <form className="space-y-2.5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold mb-1.5">What are you looking for? *</label>
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
                  <span className="text-xs">Singular Marble Mandir Unit</span>
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
                  <span className="text-xs">Complete Pooja Room Solution</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5">What is your estimated budget? *</label>
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
                    <span className="text-xs">{budget}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5">What is your timeline for the project? *</label>
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
                    <span className="text-xs">{timeline}</span>
                  </label>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Please share a bit more about your needs"
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
                UPLOAD DESIGN REFERENCES
              </label>
              {formData.designReferences && formData.designReferences.length > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  {formData.designReferences.length} file(s) selected
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
                BACK
              </button>
              <button
                type="submit"
                className="flex-1 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                style={{ backgroundColor: '#8B7355' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
              >
                SUBMIT
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ExpertFormOverlay

