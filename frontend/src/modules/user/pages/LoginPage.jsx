import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSignIn, setIsSignIn] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Sign In Form State
  const [signInForm, setSignInForm] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  })

  // Sign Up Form State
  const [signUpForm, setSignUpForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  // Sign In Form Validation
  const validateSignIn = () => {
    if (!signInForm.emailOrPhone.trim()) {
      setError('Email or phone number is required')
      return false
    }
    if (!signInForm.password) {
      setError('Password is required')
      return false
    }
    if (signInForm.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    return true
  }

  // Sign Up Form Validation
  const validateSignUp = () => {
    if (!signUpForm.fullName.trim()) {
      setError('Full name is required')
      return false
    }
    if (!signUpForm.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpForm.email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (!signUpForm.phone.trim()) {
      setError('Phone number is required')
      return false
    }
    if (!/^\d{10}$/.test(signUpForm.phone)) {
      setError('Phone number must be exactly 10 digits')
      return false
    }
    if (!signUpForm.password) {
      setError('Password is required')
      return false
    }
    if (signUpForm.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    console.log('[Login] starting sign-in')

    if (!validateSignIn()) {
      console.log('[Login] validation failed')
      return
    }

    setLoading(true)

    try {
      // Determine if email or phone
      const isEmail = signInForm.emailOrPhone.includes('@')
      const loginData = isEmail
        ? { email: signInForm.emailOrPhone.toLowerCase(), password: signInForm.password }
        : { phone: signInForm.emailOrPhone.replace(/\D/g, ''), password: signInForm.password }

      // API call to backend
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      console.log('[Login] POST', `${API_URL}/users/login`, 'payload:', loginData)
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })

      console.log('[Login] response status', response.status)
      const data = await response.json()
      console.log('[Login] response body', data)

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Store token and user info
      if (data.token) {
        localStorage.setItem('authToken', data.token)
        if (signInForm.rememberMe) {
          localStorage.setItem('rememberMe', 'true')
        }
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user))
        }
      }

      setSuccess('Login successful! Redirecting...')

      // Redirect to intended page or home
      const from = location.state?.from || '/'
      const checkoutData = location.state?.checkoutData

      setTimeout(() => {
        navigate(from, {
          replace: true,
          state: checkoutData ? checkoutData : undefined
        })
      }, 1000)
    } catch (err) {
      console.error('[Login] error', err)
      setError(err.message || 'An error occurred during login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    console.log('[Signup] starting sign-up')

    if (!validateSignUp()) {
      console.log('[Signup] validation failed')
      return
    }

    setLoading(true)

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      console.log('[Signup] POST', `${API_URL}/users/register`, 'payload:', {
        name: signUpForm.fullName,
        email: signUpForm.email.toLowerCase(),
        phone: signUpForm.phone
      })
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: signUpForm.fullName,
          email: signUpForm.email.toLowerCase(),
          phone: signUpForm.phone,
          password: signUpForm.password
        })
      })

      console.log('[Signup] response status', response.status)
      const data = await response.json()
      console.log('[Signup] response body', data)

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      // Store token and user info
      if (data.token) {
        localStorage.setItem('authToken', data.token)
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user))
        }
      }

      setSuccess('Registration Complete! Sign Up Successful!')

      // Redirect to profile after successful registration
      setTimeout(() => {
        navigate('/profile', { replace: true })
      }, 2000)
    } catch (err) {
      console.error('[Signup] error', err)
      setError(err.message || 'An error occurred during registration. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle form input changes
  const handleSignInChange = (e) => {
    const { name, value, type, checked } = e.target
    setSignInForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const handleSignUpChange = (e) => {
    const { name, value } = e.target
    setSignUpForm(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  // Switch between Sign In and Sign Up
  const switchTab = (tab) => {
    setIsSignIn(tab === 'signin')
    setError('')
    setSuccess('')
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
            {/* Logo and Title Section */}
            <div className="bg-gradient-to-r from-[#8B7355] to-[#7a6349] py-6 px-6 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome to Aslam Marble Suppliers
              </h1>
              <p className="text-white/90 text-sm">
                {isSignIn ? 'Sign in to continue' : 'Create your account'}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                type="button"
                onClick={() => switchTab('signin')}
                className={`flex-1 py-4 text-center text-base font-semibold transition-all duration-300 ${isSignIn
                    ? 'text-[#8B7355] border-b-2 border-[#8B7355] bg-gray-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchTab('signup')}
                className={`flex-1 py-4 text-center text-base font-semibold transition-all duration-300 ${!isSignIn
                    ? 'text-[#8B7355] border-b-2 border-[#8B7355] bg-gray-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
              >
                Sign Up
              </button>
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

              {/* Sign In Form */}
              {isSignIn ? (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="emailOrPhone"
                      value={signInForm.emailOrPhone}
                      onChange={handleSignInChange}
                      placeholder="Email or mobile phone number"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355] transition-all"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      name="password"
                      value={signInForm.password}
                      onChange={handleSignInChange}
                      placeholder="Password"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355] transition-all"
                      disabled={loading}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={signInForm.rememberMe}
                        onChange={handleSignInChange}
                        className="w-4 h-4 text-[#8B7355] border-gray-300 rounded focus:ring-[#8B7355]"
                        disabled={loading}
                      />
                      <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-[#8B7355] hover:underline font-medium"
                    >
                      Forgot password?
                    </Link>
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
                        Signing in...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>
              ) : (
                /* Sign Up Form */
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={signUpForm.fullName}
                      onChange={handleSignUpChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355] transition-all"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={signUpForm.email}
                      onChange={handleSignUpChange}
                      placeholder="Email"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355] transition-all"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={signUpForm.phone}
                      onChange={handleSignUpChange}
                      placeholder="Phone Number (10 digits)"
                      maxLength="10"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355] transition-all"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      name="password"
                      value={signUpForm.password}
                      onChange={handleSignUpChange}
                      placeholder="Password (min 6 characters)"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355] transition-all"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={signUpForm.confirmPassword}
                      onChange={handleSignUpChange}
                      placeholder="Confirm Password"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355] transition-all"
                      disabled={loading}
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
                        Creating account...
                      </span>
                    ) : (
                      'Sign Up'
                    )}
                  </button>
                </form>
              )}

              {/* Social Login Options */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-center gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full hover:bg-gray-50 hover:border-[#8B7355] transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full hover:bg-gray-50 hover:border-[#8B7355] transition-colors"
                  >
                    <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Terms and Privacy */}
              {!isSignIn && (
                <p className="mt-4 text-xs text-center text-gray-500">
                  By signing up, you agree to our{' '}
                  <Link to="/terms-and-conditions" className="text-[#8B7355] hover:underline">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" className="text-[#8B7355] hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              )}
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-[#8B7355] hover:underline font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default LoginPage

