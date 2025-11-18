import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import regBgImage from '../assets/images/reg-bg.png'
import logo from '../assets/images/logo.png'
import { authAPI, requestAPI } from '../Services/APIs'

const Register = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  // If already authenticated, redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) {
      navigate('/dashboard')
    }
  }, [navigate])
  
  // Get VIN from URL parameters
  const urlParams = new URLSearchParams(location.search)
  const vinFromUrl = urlParams.get('vin')

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const response = await authAPI.register(formData)
      
      // Store token in localStorage
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      // If VIN in URL, create VIN request automatically (no local cache)
      if (vinFromUrl) {
        try {
          await requestAPI.create({ vin: vinFromUrl, userEmail: response.user.email })
        } catch (e) {
          console.error('VIN request creation failed:', e)
        }
      }

      setIsLoading(false)
      // After successful registration, go to user dashboard
      navigate('/dashboard')
    } catch (error) {
      setIsLoading(false)
      setError(error.message || 'Registration failed. Please try again.')
    }
  }

  const handleBack = () => {
    // If VIN is in URL, go back to payment with VIN, otherwise go to home
    if (vinFromUrl) {
      navigate(`/payment?vin=${vinFromUrl}`)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={regBgImage} 
              alt="Registration Background" 
              className="w-full h-full object-cover"
            />
          </div>

      {/* Header */}
      <nav className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Car Vistors Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-600">Car Vistors</h1>
                <p className="text-xs text-gray-500 font-medium">Professional VIN Solutions</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-gray-600">Car Vistors</h1>
              </div>
            </div>
            
            <button 
              onClick={handleBack}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-200"
            >
              {vinFromUrl ? 'Back to Payment' : 'Back to Home'}
            </button>
          </div>
        </div>
      </nav>

      {/* Registration Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start lg:items-center min-h-[calc(100vh-120px)]">
          {/* Left Side - Registration Form */}
          <div className="lg:max-w-lg flex flex-col lg:-ml-16 mt-12">

            {/* Registration Form */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 lg:p-6 shadow-2xl border border-white/40 relative">
              {/* Header */}
              <div className="mb-3 lg:mb-4">
                <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>
                  Create Your
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                    Account
                  </span>
                </h1>
                <p className="text-gray-600 text-sm">
                  Join thousands of satisfied customers
                </p>
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full blur-lg"></div>
          <form onSubmit={handleSubmit} className="space-y-2 lg:space-y-3 relative z-10">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}
            
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div className="group">
                <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></div>
                  First Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-2 py-2 bg-gradient-to-r from-white/80 to-white/60 border-2 border-gray-200/50 rounded-lg text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:shadow-lg group-hover:shadow-xl text-xs"
                    placeholder="Enter your first name"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-2"></div>
                  Last Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-2 py-2 bg-gradient-to-r from-white/80 to-white/60 border-2 border-gray-200/50 rounded-lg text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:shadow-lg group-hover:shadow-xl text-xs"
                    placeholder="Enter your last name"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-2"></div>
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-2 bg-gradient-to-r from-white/80 to-white/60 border-2 border-gray-200/50 rounded-lg text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:shadow-lg group-hover:shadow-xl text-xs"
                  placeholder="Enter your email address"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div className="group">
                <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></div>
                  Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-2 py-2 bg-gradient-to-r from-white/80 to-white/60 border-2 border-gray-200/50 rounded-lg text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:shadow-lg group-hover:shadow-xl text-xs"
                    placeholder="Create a password"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-2"></div>
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-2 py-2 bg-gradient-to-r from-white/80 to-white/60 border-2 border-gray-200/50 rounded-lg text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:shadow-lg group-hover:shadow-xl text-xs"
                    placeholder="Confirm your password"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2 p-2 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg border border-blue-200/30">
              <div className="relative">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                  className="w-4 h-4 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <label className="text-xs text-gray-700 font-medium leading-tight">
                I agree to the <a href="#" className="text-blue-600 hover:text-blue-800 font-bold transition-colors duration-200">Terms of Service</a> and <a href="#" className="text-purple-600 hover:text-purple-800 font-bold transition-colors duration-200">Privacy Policy</a> *
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-5 rounded-xl text-sm transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <span>Create Account & Continue</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </div>

                {/* Login Link */}
                <div className="text-center pt-1">
                  <div className="inline-flex items-center px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/40">
                    <p className="text-gray-700 font-medium text-sm">
                      Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-800 font-bold transition-colors duration-200">Sign In</a>
                    </p>
                  </div>
                </div>
          </form>
        </div>
          </div>

          {/* Right Side - Empty for background image */}
          <div className="hidden lg:block">
            {/* Background car image will be visible here */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
