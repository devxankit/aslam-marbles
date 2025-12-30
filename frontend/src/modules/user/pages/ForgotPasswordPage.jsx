import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import TranslatedText from '../../../components/TranslatedText'
import { usePageTranslation } from '../../../contexts/PageTranslationContext'

const ForgotPasswordPage = () => {
  const { getTranslatedText } = usePageTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: Email/Phone, 2: OTP + Reset Password
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Step 1: Email/Phone Input
  const [emailOrPhone, setEmailOrPhone] = useState('')

  // Step 2: OTP + Password
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: ''
  })

  // Handle OTP Input Change
  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return // Only allow digits

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }

    setError('')
  }

  // Handle OTP Key Down (for backspace)
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  // Handle OTP Paste
  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''))
      setOtp(newOtp.slice(0, 6))

      // Focus last input
      const lastFilledIndex = Math.min(pastedData.length - 1, 5)
      const lastInput = document.getElementById(`otp-${lastFilledIndex}`)
      if (lastInput) lastInput.focus()
    }
    setError('')
  }

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!emailOrPhone.trim()) {
      setError(getTranslatedText('Please enter your email or phone number'))
      return
    }

    setLoading(true)

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${API_URL}/users/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailOrPhone.trim()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || getTranslatedText('Failed to send OTP. Please try again.'))
      }

      setSuccess(data.message || getTranslatedText('OTP sent successfully!'))
      setStep(2)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message || getTranslatedText('An error occurred. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Reset Password (Verify OTP + Reset)
  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const otpValue = otp.join('')
    if (otpValue.length !== 6) {
      setError(getTranslatedText('Please enter the complete 6-digit OTP'))
      return
    }

    if (!passwordData.password) {
      setError(getTranslatedText('Password is required'))
      return
    }

    if (passwordData.password.length < 6) {
      setError(getTranslatedText('Password must be at least 6 characters long'))
      return
    }

    if (passwordData.password !== passwordData.confirmPassword) {
      setError(getTranslatedText('Passwords do not match'))
      return
    }

    setLoading(true)

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${API_URL}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailOrPhone.trim(),
          otp: otpValue,
          password: passwordData.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || getTranslatedText('Failed to reset password.'))
      }

      setSuccess(getTranslatedText('Password reset successfully! Redirecting to login...'))

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 2000)
    } catch (err) {
      setError(err.message || getTranslatedText('An error occurred. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  // Handle password input change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  // Resend OTP
  const handleResendOtp = async () => {
    setError('')
    setLoading(true)

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

      // Re-use forgot-password endpoint for resend as logic is same
      const response = await fetch(`${API_URL}/users/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailOrPhone.trim()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || getTranslatedText('Failed to resend OTP'))
      }

      setSuccess(getTranslatedText('OTP sent successfully!'))
      setOtp(['', '', '', '', '', ''])

      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message || getTranslatedText('Failed to resend OTP. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        variant="default"
        onShowSidebar={() => { }}
        onShowProjects={() => { }}
        onShowCreations={() => { }}
        onShowServices={() => { }}
        onShowProducts={() => { }}
      />

      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#8B7355] to-[#7a6349] py-6 px-6 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                <TranslatedText>Reset Password</TranslatedText>
              </h1>
              <p className="text-white/90 text-sm">
                {step === 1 ? getTranslatedText('Enter your email or phone number') : getTranslatedText('Enter OTP & New Password')}
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-[#8B7355] text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                    1
                  </div>
                  <span className={`ml-2 text-sm ${step >= 1 ? 'text-[#8B7355] font-medium' : 'text-gray-500'}`}>
                    <TranslatedText>Request OTP</TranslatedText>
                  </span>
                </div>
                <div className={`w-16 h-0.5 mx-4 ${step >= 2 ? 'bg-[#8B7355]' : 'bg-gray-200'}`}></div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-[#8B7355] text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                    2
                  </div>
                  <span className={`ml-2 text-sm ${step >= 2 ? 'text-[#8B7355] font-medium' : 'text-gray-500'}`}>
                    <TranslatedText>Reset</TranslatedText>
                  </span>
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="p-6 md:p-8">
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-700 flex-1">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-green-700 flex-1">{success}</p>
                </div>
              )}

              {/* Step 1: Email/Phone Input */}
              {step === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      <TranslatedText>Email or Phone Number</TranslatedText>
                    </label>
                    <input
                      type="text"
                      id="emailOrPhone"
                      value={emailOrPhone}
                      onChange={(e) => {
                        setEmailOrPhone(e.target.value)
                        setError('')
                      }}
                      placeholder={getTranslatedText("Enter your email or phone number")}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355] transition-all"
                      disabled={loading}
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#8B7355] text-white font-semibold rounded-lg hover:bg-[#7a6349] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <TranslatedText>Sending OTP...</TranslatedText>
                      </span>
                    ) : (
                      <TranslatedText>Send OTP</TranslatedText>
                    )}
                  </button>
                </form>
              )}

              {/* Step 2: OTP + Password */}
              {step === 2 && (
                <form onSubmit={handleResetPassword} className="space-y-6">
                  {/* OTP Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <TranslatedText>Enter 6-Digit OTP</TranslatedText>
                    </label>
                    <div className="flex justify-between gap-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          onPaste={index === 0 ? handleOtpPaste : undefined}
                          className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355] transition-all"
                          disabled={loading}
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500 text-center">
                      <TranslatedText>OTP sent to</TranslatedText> {emailOrPhone}
                    </p>
                  </div>

                  {/* Password Section */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        <TranslatedText>New Password</TranslatedText>
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={passwordData.password}
                        onChange={handlePasswordChange}
                        placeholder={getTranslatedText("Enter new password (min 6 characters)")}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355] transition-all"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        <TranslatedText>Confirm New Password</TranslatedText>
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder={getTranslatedText("Confirm new password")}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355] transition-all"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.join('').length !== 6}
                    className="w-full py-3 bg-[#8B7355] text-white font-semibold rounded-lg hover:bg-[#7a6349] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <TranslatedText>Resetting Password...</TranslatedText>
                      </span>
                    ) : (
                      <TranslatedText>Reset Password</TranslatedText>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-sm text-[#8B7355] hover:underline font-medium disabled:opacity-50"
                    >
                      <TranslatedText>Didn't receive OTP? Resend</TranslatedText>
                    </button>
                  </div>
                </form>
              )}

              {/* Back to Login Link */}
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-sm text-[#8B7355] hover:underline font-medium"
                >
                  ← <TranslatedText>Back to Sign In</TranslatedText>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default ForgotPasswordPage

