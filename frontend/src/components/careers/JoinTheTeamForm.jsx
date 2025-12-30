import { useState } from 'react'
import TranslatedText from '../TranslatedText'
import { usePageTranslation } from '../../hooks/usePageTranslation'

const JoinTheTeamForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    currentCity: '',
    currentPosition: '',
    email: '',
    department: '',
    applyingFor: '',
    phoneNo: '',
    resume: null
  })

  // Define dynamic texts (placeholders, alerts)
  const DYNAMIC_TEXTS = [
    'Full Name',
    'Current City',
    'Current Position',
    'Email',
    'Phone No.',
    'Thank you! Your application has been submitted successfully.',
    'Failed to submit application',
    'Something went wrong. Please try again.'
  ]

  const { getTranslatedText } = usePageTranslation(DYNAMIC_TEXTS, 'en')

  const departments = [
    'Architecture',
    'Creative',
    'Sales',
    'Design',
    'Marketing',
    'Operations',
    'HR'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

      const formDataToSend = new FormData()
      formDataToSend.append('fullName', formData.fullName)
      formDataToSend.append('currentCity', formData.currentCity)
      formDataToSend.append('currentPosition', formData.currentPosition)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('department', formData.department)
      formDataToSend.append('applyingFor', formData.applyingFor)
      formDataToSend.append('phoneNo', formData.phoneNo)

      if (formData.resume) {
        formDataToSend.append('resume', formData.resume)
      }

      const res = await fetch(`${API_URL}/jobs/apply`, {
        method: 'POST',
        // Content-Type header must NOT be set manually for FormData; browser sets it with boundary
        body: formDataToSend
      })

      const data = await res.json()
      if (!res.ok || data.success === false) {
        throw new Error(data.message || getTranslatedText('Failed to submit application'))
      }

      alert(getTranslatedText('Thank you! Your application has been submitted successfully.'))
      setFormData({
        fullName: '',
        currentCity: '',
        currentPosition: '',
        email: '',
        department: '',
        applyingFor: '',
        phoneNo: '',
        resume: null
      })
      // Reset file input manually if needed, but react state should handle basic
    } catch (error) {
      console.error('Submission error:', error)
      alert(error.message || getTranslatedText('Something went wrong. Please try again.'))
    }
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    })
  }

  return (
    <div id="join-the-team" className="max-w-4xl mx-auto scroll-mt-20">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic text-center mb-3">
        <TranslatedText>Join The Team</TranslatedText>
      </h2>

      {/* Subtitle */}
      <p className="text-center text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
        <TranslatedText>Join the Tilak Stone Arts team and help shape the future of craftsmanship and sacred art.</TranslatedText>
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5"><TranslatedText>Full Name *</TranslatedText></label>
              <input
                type="text"
                placeholder={getTranslatedText("Full Name")}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                required
              />
            </div>

            {/* Current City */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5"><TranslatedText>Current City *</TranslatedText></label>
              <input
                type="text"
                placeholder={getTranslatedText("Current City")}
                value={formData.currentCity}
                onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                required
              />
            </div>

            {/* Current Position */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5"><TranslatedText>Current Position</TranslatedText></label>
              <input
                type="text"
                placeholder={getTranslatedText("Current Position")}
                value={formData.currentPosition}
                onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5"><TranslatedText>Email *</TranslatedText></label>
              <input
                type="email"
                placeholder={getTranslatedText("Email")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5"><TranslatedText>Resume/CV *</TranslatedText></label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="resume"
                  className="px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <TranslatedText>Choose File</TranslatedText>
                </label>
                <span className="text-xs text-gray-500 truncate">
                  {formData.resume ? formData.resume.name : <TranslatedText>No file chosen</TranslatedText>}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Department */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5"><TranslatedText>Department *</TranslatedText></label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] appearance-none bg-white"
                required
              >
                <option value=""><TranslatedText>Select Department</TranslatedText></option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                  // 'dept' is hardcoded English. If backend requires English, value stays English.
                  // For display, we can enable translation if desired, but these are simple words.
                  // I will wrap {dept} in TranslatedText just in case.
                ))}
              </select>
            </div>

            {/* Applying For */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5"><TranslatedText>Applying for *</TranslatedText></label>
              <select
                value={formData.applyingFor}
                onChange={(e) => setFormData({ ...formData, applyingFor: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] appearance-none bg-white"
                required
              >
                <option value=""><TranslatedText>Select Position</TranslatedText></option>
                <option value="Architect"><TranslatedText>Architect</TranslatedText></option>
                <option value="Video Editor"><TranslatedText>Video Editor</TranslatedText></option>
                <option value="Online Sales Representative"><TranslatedText>Online Sales Representative</TranslatedText></option>
                <option value="Designer"><TranslatedText>Designer</TranslatedText></option>
                <option value="Marketing Executive"><TranslatedText>Marketing Executive</TranslatedText></option>
              </select>
            </div>

            {/* Phone No */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5"><TranslatedText>Phone No. *</TranslatedText></label>
              <input
                type="tel"
                placeholder={getTranslatedText("Phone No.")}
                value={formData.phoneNo}
                onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-6 md:px-8 py-2.5 md:py-3 rounded-lg text-white font-semibold text-sm md:text-base transition-colors hover:opacity-90"
            style={{ backgroundColor: '#8B7355' }}
          >
            <TranslatedText>Submit Enquiry</TranslatedText>
          </button>
        </div>
      </form>
    </div>
  )
}

export default JoinTheTeamForm
