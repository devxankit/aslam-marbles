import { useState } from 'react'
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from '../../utils/constants'

const ExpertFormSection = () => {
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
        <section className="w-full py-12 md:py-16 lg:py-20" style={{ backgroundColor: 'rgb(255, 250, 240)' }}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-4 uppercase tracking-wider">
                        Talk to Our Expert
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                        Have a project in mind? Our team of experts is here to help you bring your vision to life. Fill out the form below and we'll get back to you shortly.
                    </p>
                    <div className="w-20 h-1 mx-auto mt-6" style={{ backgroundColor: '#8B7355' }}></div>
                </div>

                {/* Form Container */}
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Form Header with Step Indicator */}
                    <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-gradient-to-r from-[#8B7355]/5 to-transparent">
                        <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide text-[#8B7355]">Consultation Form</h3>
                        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-[#8B7355]/10 text-[#8B7355]">Step {formStep} of 2</span>
                    </div>

                    <div className="p-6 md:p-8">
                        {formStep === 1 ? (
                            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setFormStep(2); }}>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="DOMESTIC"
                                            checked={formData.type === 'DOMESTIC'}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="w-4 h-4 accent-[#8B7355]"
                                        />
                                        <span className={`text-sm font-semibold uppercase tracking-wider transition-colors ${formData.type === 'DOMESTIC' ? 'text-[#8B7355]' : 'text-gray-500 group-hover:text-gray-700'}`}>Domestic</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="INTERNATIONAL"
                                            checked={formData.type === 'INTERNATIONAL'}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="w-4 h-4 accent-[#8B7355]"
                                        />
                                        <span className={`text-sm font-semibold uppercase tracking-wider transition-colors ${formData.type === 'INTERNATIONAL' ? 'text-[#8B7355]' : 'text-gray-500 group-hover:text-gray-700'}`}>International</span>
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input
                                        type="text"
                                        placeholder="Full Name *"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] transition-all"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address *"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] transition-all"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#8B7355]/20 focus-within:border-[#8B7355] transition-all">
                                        <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-r border-gray-200">
                                            <span className="text-lg">🇮🇳</span>
                                            <span className="text-sm font-medium text-gray-600">+91</span>
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="Phone number *"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="flex-1 px-4 py-3 focus:outline-none text-sm"
                                            required
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="City *"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Tell us about yourself *</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.aboutYourself === 'homeowner' ? 'border-[#8B7355] bg-[#8B7355]/5 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input
                                                type="radio"
                                                name="aboutYourself"
                                                value="homeowner"
                                                checked={formData.aboutYourself === 'homeowner'}
                                                onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                                                className="mt-1 w-4 h-4 accent-[#8B7355] flex-shrink-0"
                                                required
                                            />
                                            <span className="text-sm font-medium text-gray-700">I am a homeowner looking for solutions</span>
                                        </label>
                                        <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.aboutYourself === 'designer' ? 'border-[#8B7355] bg-[#8B7355]/5 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input
                                                type="radio"
                                                name="aboutYourself"
                                                value="designer"
                                                checked={formData.aboutYourself === 'designer'}
                                                onChange={(e) => setFormData({ ...formData, aboutYourself: e.target.value })}
                                                className="mt-1 w-4 h-4 accent-[#8B7355] flex-shrink-0"
                                                required
                                            />
                                            <span className="text-sm font-medium text-gray-700">I am an architect or interior designer</span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white py-4 rounded-xl text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    style={{ backgroundColor: '#8B7355' }}
                                >
                                    Continue to next step
                                </button>
                            </form>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Project Type *</label>
                                        <div className="space-y-2">
                                            <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${formData.lookingFor === 'singular' ? 'border-[#8B7355] bg-[#8B7355]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                                                <input
                                                    type="radio"
                                                    name="lookingFor"
                                                    value="singular"
                                                    checked={formData.lookingFor === 'singular'}
                                                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                                                    className="w-4 h-4 accent-[#8B7355]"
                                                    required
                                                />
                                                <span className="text-sm text-gray-700">Individual Sculptures/Products</span>
                                            </label>
                                            <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${formData.lookingFor === 'complete' ? 'border-[#8B7355] bg-[#8B7355]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                                                <input
                                                    type="radio"
                                                    name="lookingFor"
                                                    value="complete"
                                                    checked={formData.lookingFor === 'complete'}
                                                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                                                    className="w-4 h-4 accent-[#8B7355]"
                                                    required
                                                />
                                                <span className="text-sm text-gray-700">Full Interior/Exterior Project</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Estimated Budget *</label>
                                        <select
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] text-sm"
                                            required
                                        >
                                            <option value="">Select Budget Range</option>
                                            {BUDGET_OPTIONS.map((budget) => (
                                                <option key={budget} value={budget}>{budget}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Timeline *</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {TIMELINE_OPTIONS.map((timeline) => (
                                            <label key={timeline} className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all text-center ${formData.timeline === timeline ? 'border-[#8B7355] bg-[#8B7355]/5' : 'border-gray-100'}`}>
                                                <input
                                                    type="radio"
                                                    name="timeline"
                                                    value={timeline}
                                                    checked={formData.timeline === timeline}
                                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                                    className="sr-only"
                                                    required
                                                />
                                                <span className="text-xs font-semibold">{timeline}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <textarea
                                    placeholder="Tell us more about your requirements (optional)"
                                    value={formData.additionalInfo}
                                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] transition-all text-sm resize-none"
                                />

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormStep(1)}
                                        className="flex-1 bg-white border-2 border-[#8B7355] text-[#8B7355] py-4 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-[#8B7355]/5 transition-all"
                                    >
                                        Go Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-2 bg-[#8B7355] text-white py-4 rounded-xl text-sm font-bold uppercase tracking-[0.2em] transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                                    >
                                        Submit Request
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExpertFormSection
