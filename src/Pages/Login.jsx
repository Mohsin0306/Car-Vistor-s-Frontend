import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logBgImage from '../assets/images/log-bg.png'
import logo from '../assets/images/logo.png'
import { authAPI } from '../Services/APIs'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Try admin login first
      let response = await authAPI.login({ ...formData, userType: 'admin' })
      
      // Store token in localStorage
      localStorage.setItem('token', response.token)
      
      // If admin login successful, redirect to admin dashboard
      if (response.userType === 'admin') {
        localStorage.setItem('admin', JSON.stringify(response.admin))
        localStorage.setItem('userType', 'admin')
        setIsLoading(false)
        navigate('/admin-dashboard')
        return
      }
    } catch (adminError) {
      // If admin login fails, try user login
      try {
        const response = await authAPI.login({ ...formData, userType: 'user' })
        
        // Store token in localStorage
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('userType', 'user')
        setIsLoading(false)
        navigate('/dashboard')
      } catch (userError) {
        setIsLoading(false)
        setError('Invalid credentials. Please check your email and password.')
      }
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={logBgImage} 
          alt="Login Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <nav className="relative z-10 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
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
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button 
                onClick={() => navigate('/register')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              >
                Register
              </button>
              <button 
                onClick={handleBack}
                className="hidden sm:block bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-200 text-sm sm:text-base"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-2 pt-8 sm:pt-4">
        <div className="flex justify-center lg:justify-end items-start lg:items-center min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-120px)]">
          {/* Login Form */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-md flex flex-col mb-8 lg:mr-8">
            {/* Header */}
            <div className="mb-3 lg:mb-4">
              <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>
                Welcome
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                  Back!
                </span>
              </h1>
              <p className="text-gray-600 text-sm">
                Login to access your comprehensive vehicle reports
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-6 shadow-2xl border border-white/40 relative">
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full blur-lg"></div>
              
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-4 relative z-10">
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
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-white/80 to-white/60 border-2 border-gray-200/50 rounded-lg text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:shadow-lg group-hover:shadow-xl text-sm"
                      placeholder="Enter your email address"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-purple-500 rounded-full mr-2"></div>
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-white/80 to-white/60 border-2 border-gray-200/50 rounded-lg text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:shadow-lg group-hover:shadow-xl text-sm"
                      placeholder="Enter your password"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right text-xs pt-1">
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Forgot Password?</a>
                </div>

                {/* Submit Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-base transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Logging In...
                        </>
                      ) : (
                        <>
                          <span>Login to Your Account</span>
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </div>
                  </button>
                </div>

                {/* Register Link */}
                <div className="text-center pt-1">
                  <div className="inline-flex items-center px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/40">
                    <p className="text-gray-700 font-medium text-sm">
                      Don't have an account? <a href="/register" className="text-blue-600 hover:text-blue-800 font-bold transition-colors duration-200">Register Now</a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
