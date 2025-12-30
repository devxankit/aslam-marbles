import { useState } from 'react'
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from '../../utils/constants'
import TranslatedText from '../TranslatedText'
import { usePageTranslation } from '../../hooks/usePageTranslation'

const PLACEHOLDERS = [
    'Full Name *',
    'Email *',
    'Phone *',
    'City *',
    'Requirements (Optional)',
    'Select Range'
]

const ExpertFormSection = () => {
    const { getTranslatedText } = usePageTranslation(PLACEHOLDERS)
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
        <section className="w-full py-8 md:py-16" style={{ backgroundColor: 'rgb(255, 250, 240)' }}>
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
                {/* Section Header */}
                <div className="text-center mb-6 md:mb-12">
                    <h2 className="text-xl md:text-5xl font-serif text-[#8B7355] italic mb-3 uppercase tracking-tight md:tracking-wider">
                        <TranslatedText>Talk to Our Expert</TranslatedText>
                    </h2>
                    <p className="text-[10px] md:text-lg text-gray-600 max-w-2xl mx-auto">
                        <TranslatedText>Bring your vision to life with our master craftsmen.</TranslatedText>
                    </p>
                    <div className="w-12 md:w-20 h-0.5 mx-auto mt-4" style={{ backgroundColor: '#8B7355' }}></div>
                </div>

                {/* Form Container */}
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Form Header */}
                    <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-[#8B7355]/5">
                        <h3 className="text-xs md:text-xl font-bold uppercase tracking-wide text-[#8B7355]"><TranslatedText>Consultation Form</TranslatedText></h3>
                        <span className="text-[10px] md:text-sm font-semibold px-2 py-0.5 rounded-full bg-[#8B7355]/10 text-[#8B7355]"><TranslatedText>{`Step ${formStep} of 2`}</TranslatedText></span>
                    </div>

                    <div className="p-4 md:p-8">
                        {formStep === 1 ? (
                            <form className="space-y-4 md:space-y-5" onSubmit={(e) => { e.preventDefault(); setFormStep(2); }}>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" value="DOMESTIC" checked={formData.type === 'DOMESTIC'} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-3 md:w-4 h-3 md:h-4 accent-[#8B7355]" />
                                        <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-700"><TranslatedText>Domestic</TranslatedText></span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" value="INTERNATIONAL" checked={formData.type === 'INTERNATIONAL'} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-3 md:w-4 h-3 md:h-4 accent-[#8B7355]" />
                                        <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-700"><TranslatedText>International</TranslatedText></span>
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                                    <input type="text" placeholder={getTranslatedText('Full Name *')} value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg text-[10px] md:text-sm focus:border-[#8B7355] outline-none" required />
                                    <input type="email" placeholder={getTranslatedText('Email *')} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg text-[10px] md:text-sm focus:border-[#8B7355] outline-none" required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                                    <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="bg-gray-50 px-2 flex items-center border-r border-gray-100 text-[10px] md:text-sm font-bold text-gray-500 text-nowrap">+91</div>
                                        <input type="tel" placeholder={getTranslatedText('Phone *')} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="flex-1 px-3 py-2 md:py-3 text-[10px] md:text-sm focus:border-[#8B7355] outline-none" required />
                                    </div>
                                    <input type="text" placeholder={getTranslatedText('City *')} value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg text-[10px] md:text-sm focus:border-[#8B7355] outline-none" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] md:text-sm font-bold uppercase text-gray-600"><TranslatedText>Your Role</TranslatedText></label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {['homeowner', 'designer'].map((role) => (
                                            <label key={role} className={`p-3 border rounded-lg cursor-pointer flex gap-3 items-center ${formData.aboutYourself === role ? 'border-[#8B7355] bg-[#8B7355]/5' : 'border-gray-100'}`}>
                                                <input type="radio" checked={formData.aboutYourself === role} onChange={() => setFormData({ ...formData, aboutYourself: role })} className="accent-[#8B7355]" />
                                                <span className="text-[10px] md:text-sm capitalize font-medium"><TranslatedText>{role === 'homeowner' ? 'Homeowner' : 'Architect/Designer'}</TranslatedText></span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-[#8B7355] text-white py-3 md:py-4 rounded-lg text-xs md:text-sm font-bold uppercase tracking-widest active:scale-[0.98] transition-all">
                                    <TranslatedText>Continue</TranslatedText>
                                </button>
                            </form>
                        ) : (
                            <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] md:text-sm font-bold uppercase block mb-2 text-gray-600"><TranslatedText>Project Type</TranslatedText></label>
                                        <div className="space-y-2">
                                            {['singular', 'complete'].map((type) => (
                                                <label key={type} className={`p-3 border rounded-lg cursor-pointer flex gap-2 items-center ${formData.lookingFor === type ? 'border-[#8B7355] bg-[#8B7355]/5' : 'border-gray-100'}`}>
                                                    <input type="radio" checked={formData.lookingFor === type} onChange={() => setFormData({ ...formData, lookingFor: type })} className="accent-[#8B7355]" />
                                                    <span className="text-[10px] md:text-sm"><TranslatedText>{type === 'singular' ? 'Single Product' : 'Full Project'}</TranslatedText></span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] md:text-sm font-bold uppercase block mb-2 text-gray-600"><TranslatedText>Budget</TranslatedText></label>
                                        <select value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full p-3 border border-gray-100 rounded-lg text-[10px] md:text-sm outline-none">
                                            <option value="">{getTranslatedText('Select Range')}</option>
                                            {BUDGET_OPTIONS.map(opt => <option key={opt} value={opt}><TranslatedText>{opt}</TranslatedText></option>)}
                                        </select>
                                    </div>
                                </div>

                                <textarea placeholder={getTranslatedText('Requirements (Optional)')} value={formData.additionalInfo} onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })} rows={3} className="w-full p-3 border border-gray-100 rounded-lg text-[10px] md:text-sm outline-none resize-none" />

                                <div className="flex gap-3">
                                    <button type="button" onClick={() => setFormStep(1)} className="flex-1 py-3 border border-gray-200 rounded-lg text-[10px] md:text-sm font-bold uppercase tracking-widest"><TranslatedText>Back</TranslatedText></button>
                                    <button type="submit" className="flex-[2] bg-[#8B7355] text-white py-3 rounded-lg text-[10px] md:text-sm font-bold uppercase tracking-widest"><TranslatedText>Submit Request</TranslatedText></button>
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
