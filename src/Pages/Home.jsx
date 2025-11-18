import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import bgImage from '../assets/images/bg.jpg'
import bgMobileImage from '../assets/images/bgmobile.png'

const Home = () => {
  const navigate = useNavigate()
  const [vin, setVin] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleVinSubmit = (e) => {
    e.preventDefault()
    if (vin.length === 17) {
      // Navigate to payment page with VIN as URL parameter
      navigate(`/payment?vin=${vin}`)
    } else {
      alert('Please enter a valid 17-character VIN')
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Clean Professional Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>

      {/* Modern Glass Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              {/* Modern Logo - Mobile Responsive */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                  <img 
                    src={logo} 
                    alt="Car Vistors Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-800">Car Vistors</h1>
                  <p className="text-xs text-gray-600 font-medium">Professional VIN Solutions</p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold text-gray-800">Car Vistors</h1>
                </div>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-1">
                <a href="#home" className="px-4 py-2 text-gray-700 hover:text-[rgba(37,150,190,1)] hover:bg-[rgba(37,150,190,0.1)] font-medium transition-all duration-200 rounded-xl relative group">
                  Home
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[rgba(37,150,190,1)] transition-all duration-300 group-hover:w-3/4"></span>
                </a>
                <a href="#services" className="px-4 py-2 text-gray-600 hover:text-[rgba(37,150,190,1)] hover:bg-[rgba(37,150,190,0.1)] font-medium transition-all duration-200 rounded-xl relative group">
                  Services
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[rgba(37,150,190,1)] transition-all duration-300 group-hover:w-3/4"></span>
                </a>
                <button 
                  onClick={() => navigate('/about')}
                  className="px-4 py-2 text-gray-600 hover:text-[rgba(37,150,190,1)] hover:bg-[rgba(37,150,190,0.1)] font-medium transition-all duration-200 rounded-xl relative group"
                >
                  About
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[rgba(37,150,190,1)] transition-all duration-300 group-hover:w-3/4"></span>
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-4 py-2 text-gray-600 hover:text-[rgba(37,150,190,1)] hover:bg-[rgba(37,150,190,0.1)] font-medium transition-all duration-200 rounded-xl relative group"
                >
                  Contact
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[rgba(37,150,190,1)] transition-all duration-300 group-hover:w-3/4"></span>
                </button>
              </div>

              {/* Desktop CTA Buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-200/50"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Login</span>
                  </div>
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-[rgba(37,150,190,1)] to-[rgba(37,150,190,0.8)] hover:from-[rgba(37,150,190,0.9)] hover:to-[rgba(37,150,190,1)] text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span>Get Started</span>
                  </div>
                </button>
              </div>

              {/* Mobile Menu */}
              <div className="lg:hidden flex items-center space-x-3">
                <button 
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-[rgba(37,150,190,1)] to-[rgba(37,150,190,0.8)] text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </button>
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-3 text-gray-700 hover:text-[rgba(37,150,190,1)] hover:bg-[rgba(37,150,190,0.1)] focus:outline-none transition-all duration-200 rounded-xl"
                >
                  <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              {/* Backdrop */}
              <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-md transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              ></div>
              
              {/* Sidebar */}
              <div className={`fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-3xl shadow-2xl border-l border-white/30 transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-screen">
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between p-6 border-b border-white/30 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[rgba(37,150,190,0.2)] to-[rgba(37,150,190,0.3)] rounded-xl backdrop-blur-sm border border-white/30">
                        <img 
                          src={logo} 
                          alt="Car Vistors Logo" 
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-gray-800">Car Vistors</h2>
                        <p className="text-xs text-gray-600 font-medium">Professional VIN Solutions</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white/30 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Sidebar Navigation */}
                  <div className="flex-1 px-6 py-6 space-y-3 overflow-y-auto">
                    {/* Navigation Items */}
                    <div className="space-y-2">
                      <a 
                        href="#home" 
                        className="flex items-center px-4 py-4 text-gray-700 hover:text-[rgba(37,150,190,1)] hover:bg-gradient-to-r hover:from-[rgba(37,150,190,0.1)] hover:to-[rgba(37,150,190,0.2)] font-medium transition-all duration-300 rounded-2xl group backdrop-blur-sm border border-transparent hover:border-[rgba(37,150,190,0.3)]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] rounded-xl mr-4 group-hover:from-[rgba(37,150,190,0.2)] group-hover:to-[rgba(37,150,190,0.3)] transition-all duration-300">
                          <svg className="w-5 h-5 text-gray-500 group-hover:text-[rgba(37,150,190,1)] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <span className="transition-all duration-300 font-semibold">Home</span>
                      </a>
                      
                      <a 
                        href="#services" 
                        className="flex items-center px-4 py-4 text-gray-600 hover:text-[rgba(37,150,190,1)] hover:bg-gradient-to-r hover:from-[rgba(37,150,190,0.1)] hover:to-[rgba(37,150,190,0.2)] font-medium transition-all duration-300 rounded-2xl group backdrop-blur-sm border border-transparent hover:border-[rgba(37,150,190,0.3)]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] rounded-xl mr-4 group-hover:from-[rgba(37,150,190,0.2)] group-hover:to-[rgba(37,150,190,0.3)] transition-all duration-300">
                          <svg className="w-5 h-5 text-gray-500 group-hover:text-[rgba(37,150,190,1)] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="transition-all duration-300 font-semibold">Services</span>
                      </a>
                      
                      <button 
                        onClick={() => {
                          navigate('/about')
                          setIsMobileMenuOpen(false)
                        }}
                        className="flex items-center px-4 py-4 text-gray-600 hover:text-[rgba(37,150,190,1)] hover:bg-gradient-to-r hover:from-[rgba(37,150,190,0.1)] hover:to-[rgba(37,150,190,0.2)] font-medium transition-all duration-300 rounded-2xl group backdrop-blur-sm border border-transparent hover:border-[rgba(37,150,190,0.3)] w-full text-left"
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] rounded-xl mr-4 group-hover:from-[rgba(37,150,190,0.2)] group-hover:to-[rgba(37,150,190,0.3)] transition-all duration-300">
                          <svg className="w-5 h-5 text-gray-500 group-hover:text-[rgba(37,150,190,1)] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="transition-all duration-300 font-semibold">About</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          navigate('/contact')
                          setIsMobileMenuOpen(false)
                        }}
                        className="flex items-center px-4 py-4 text-gray-600 hover:text-[rgba(37,150,190,1)] hover:bg-gradient-to-r hover:from-[rgba(37,150,190,0.1)] hover:to-[rgba(37,150,190,0.2)] font-medium transition-all duration-300 rounded-2xl group backdrop-blur-sm border border-transparent hover:border-[rgba(37,150,190,0.3)] w-full text-left"
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] rounded-xl mr-4 group-hover:from-[rgba(37,150,190,0.2)] group-hover:to-[rgba(37,150,190,0.3)] transition-all duration-300">
                          <svg className="w-5 h-5 text-gray-500 group-hover:text-[rgba(37,150,190,1)] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="transition-all duration-300 font-semibold">Contact</span>
                      </button>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="pt-6 space-y-3">
                      {/* Login Button */}
                      <button 
                        onClick={() => navigate('/login')}
                        className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300/50"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                          <span>Login</span>
                        </div>
                      </button>
                      
                      {/* Get Started Button */}
                      <button 
                        onClick={() => navigate('/register')}
                        className="w-full bg-gradient-to-r from-[rgba(37,150,190,1)] to-[rgba(37,150,190,0.8)] hover:from-[rgba(37,150,190,0.9)] hover:to-[rgba(37,150,190,1)] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm border border-[rgba(37,150,190,0.3)]"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          <span>Get Started</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Hero Section with Background */}
      <section id="home" className="relative min-h-screen z-10 overflow-hidden flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0">
          {/* Desktop Background */}
          <img 
            src={bgImage} 
            alt="Background" 
            className="hidden lg:block w-full h-full object-cover"
          />
          {/* Mobile Background */}
          <img 
            src={bgMobileImage} 
            alt="Mobile Background" 
            className="block lg:hidden w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 pt-32 sm:pt-36 lg:pt-44 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className={`transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} lg:max-w-2xl`}>
              {/* Badge - Desktop Only */}
              <div className="hidden lg:inline-flex items-center px-3 py-2 bg-[rgba(37,150,190,1)] text-white text-sm font-bold rounded-full mb-4 shadow-2xl">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                <span>Professional VIN Service</span>
              </div>
              
              {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-gray-700 leading-tight mb-3 sm:mb-4 text-center lg:text-left mt-16 sm:mt-0" style={{fontFamily: 'Poppins, sans-serif'}}>
                  <span className="block font-extrabold tracking-tight">
                    Decode Any <span className="bg-gradient-to-r from-[rgba(37,150,190,0.8)] to-[rgba(37,150,190,1)] bg-clip-text text-transparent">Vehicle VIN</span>
                  </span>
                  <span className="block text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-600 mt-2 sm:mt-3 font-semibold tracking-wide">
                    Get Instant Reports
                  </span>
                </h1>
              
              {/* Description - Desktop Only */}
              <p className="hidden lg:block text-base text-gray-600 leading-relaxed mb-4">
                Professional VIN analysis service that provides detailed vehicle information, 
                specifications, and comprehensive reports in seconds.
              </p>

              {/* VIN Input Form - Desktop Side */}
              <div className={`hidden lg:block transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-5 shadow-2xl max-w-lg">
                  <form onSubmit={handleVinSubmit} className="space-y-3">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Enter Your Vehicle VIN
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={vin}
                        onChange={(e) => setVin(e.target.value.toUpperCase())}
                        placeholder="Enter VIN here..."
                        maxLength={17}
                        className="flex-1 px-4 py-3 bg-white/30 border-2 border-white/40 rounded-xl text-gray-800 placeholder-gray-500 focus:border-[rgba(37,150,190,1)] focus:outline-none focus:ring-4 focus:ring-[rgba(37,150,190,0.2)] text-base font-mono transition-all duration-300 backdrop-blur-sm"
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[rgba(37,150,190,1)] to-[rgba(37,150,190,0.8)] hover:from-[rgba(37,150,190,0.9)] hover:to-[rgba(37,150,190,1)] text-white font-bold py-3 px-5 rounded-xl text-base transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 whitespace-nowrap"
                      >
                        Decode Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* VIN Input Form - Mobile Side */}
              <div className={`lg:hidden transition-all duration-1000 delay-300 mt-60 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 shadow-2xl w-full max-w-sm">
                  <form onSubmit={handleVinSubmit} className="space-y-3">
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      Enter Your Vehicle VIN
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={vin}
                        onChange={(e) => setVin(e.target.value.toUpperCase())}
                        placeholder="Enter VIN here..."
                        maxLength={17}
                        className="flex-1 px-3 py-2 bg-white/30 border-2 border-white/40 rounded-lg text-gray-800 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 text-sm font-mono transition-all duration-300 backdrop-blur-sm"
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[rgba(37,150,190,1)] to-[rgba(37,150,190,0.8)] hover:from-[rgba(37,150,190,0.9)] hover:to-[rgba(37,150,190,1)] text-white font-bold py-2 px-4 rounded-lg text-sm transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 whitespace-nowrap"
                      >
                        Decode
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
            </div>
          </div>
        </div>

      </section>

      {/* Modern Services Section */}
      <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[rgba(37,150,190,1)] text-white text-xs sm:text-sm font-bold rounded-full mb-6 sm:mb-8 shadow-2xl">
              <div className="w-2 h-2 bg-white rounded-full mr-2 sm:mr-3 animate-pulse"></div>
              <span>Professional Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-700 leading-tight mb-4 sm:mb-6">
              <span className="block">Advanced VIN</span>
              <span className="block bg-gradient-to-r from-[rgba(37,150,190,0.8)] to-[rgba(37,150,190,1)] bg-clip-text text-transparent">
                Analysis Services
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive vehicle analysis and detailed reports through our advanced VIN decoding technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 hover:border-[rgba(37,150,190,0.3)] hover:bg-white/90">
              <div className="w-16 h-16 bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] rounded-xl flex items-center justify-center mb-6 group-hover:from-[rgba(37,150,190,0.2)] group-hover:to-[rgba(37,150,190,0.3)] transition-all duration-300 border border-[rgba(37,150,190,0.2)]">
                <svg className="w-8 h-8 text-[rgba(37,150,190,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Vehicle Report</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Get detailed vehicle specifications, manufacturing details, and comprehensive car information from VIN analysis.
              </p>
              <div className="flex items-center text-[rgba(37,150,190,1)] font-semibold group-hover:text-[rgba(37,150,190,0.8)] transition-colors duration-300">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 hover:border-[rgba(37,150,190,0.3)] hover:bg-white/90">
              <div className="w-16 h-16 bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] rounded-xl flex items-center justify-center mb-6 group-hover:from-[rgba(37,150,190,0.2)] group-hover:to-[rgba(37,150,190,0.3)] transition-all duration-300 border border-[rgba(37,150,190,0.2)]">
                <svg className="w-8 h-8 text-[rgba(37,150,190,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant VIN Decoding</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Fast and accurate VIN decoding service that provides immediate vehicle information and specifications.
              </p>
              <div className="flex items-center text-[rgba(37,150,190,1)] font-semibold group-hover:text-[rgba(37,150,190,0.8)] transition-colors duration-300">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 hover:border-[rgba(37,150,190,0.3)] hover:bg-white/90">
              <div className="w-16 h-16 bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] rounded-xl flex items-center justify-center mb-6 group-hover:from-[rgba(37,150,190,0.2)] group-hover:to-[rgba(37,150,190,0.3)] transition-all duration-300 border border-[rgba(37,150,190,0.2)]">
                <svg className="w-8 h-8 text-[rgba(37,150,190,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Verification</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Verify vehicle authenticity, check specifications, and ensure accurate vehicle identification through VIN analysis.
              </p>
              <div className="flex items-center text-[rgba(37,150,190,1)] font-semibold group-hover:text-[rgba(37,150,190,0.8)] transition-colors duration-300">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-white via-gray-50 to-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[rgba(37,150,190,1)] text-white text-xs sm:text-sm font-bold rounded-full mb-6 sm:mb-8 shadow-2xl">
                <div className="w-2 h-2 bg-white rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                <span>Trusted by Industry Leaders</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-700 leading-tight mb-4 sm:mb-6">
                <span className="block">Why Choose</span>
                <span className="block bg-gradient-to-r from-[rgba(37,150,190,0.8)] to-[rgba(37,150,190,1)] bg-clip-text text-transparent">
                  Car Vistors?
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                We specialize in VIN decoding and comprehensive car report generation. Our advanced technology provides accurate vehicle information, specifications, and detailed analysis to help you make informed decisions about any vehicle.
              </p>
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] rounded-xl flex items-center justify-center mr-4 group-hover:from-[rgba(37,150,190,0.2)] group-hover:to-[rgba(37,150,190,0.3)] transition-all duration-300 border border-[rgba(37,150,190,0.2)]">
                    <svg className="w-6 h-6 text-[rgba(37,150,190,1)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Accurate VIN Decoding</h3>
                    <p className="text-gray-600">Industry-leading accuracy with 99.9% success rate</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] rounded-xl flex items-center justify-center mr-4 group-hover:from-[rgba(37,150,190,0.2)] group-hover:to-[rgba(37,150,190,0.3)] transition-all duration-300 border border-[rgba(37,150,190,0.2)]">
                    <svg className="w-6 h-6 text-[rgba(37,150,190,1)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Detailed Car Reports</h3>
                    <p className="text-gray-600">Comprehensive vehicle information and specifications</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] rounded-xl flex items-center justify-center mr-4 group-hover:from-[rgba(37,150,190,0.2)] group-hover:to-[rgba(37,150,190,0.3)] transition-all duration-300 border border-[rgba(37,150,190,0.2)]">
                    <svg className="w-6 h-6 text-[rgba(37,150,190,1)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Instant Results</h3>
                    <p className="text-gray-600">Get your vehicle report in seconds, not hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] backdrop-blur-sm rounded-3xl p-10 border border-[rgba(37,150,190,0.2)] shadow-2xl">
                <div className="text-center">
                  <div className="grid grid-cols-1 gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-[rgba(37,150,190,1)] mb-2">10,000+</div>
                      <div className="text-gray-700 text-lg font-medium">VINs Decoded</div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-[rgba(37,150,190,1)] mb-2">99.9%</div>
                      <div className="text-gray-700 text-lg font-medium">Accuracy Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-[rgba(37,150,190,1)] mb-2">24/7</div>
                      <div className="text-gray-700 text-lg font-medium">Service Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[rgba(37,150,190,1)] text-white text-xs sm:text-sm font-bold rounded-full mb-6 sm:mb-8 shadow-2xl">
              <div className="w-2 h-2 bg-white rounded-full mr-2 sm:mr-3 animate-pulse"></div>
              <span>Get Professional Support</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-700 leading-tight mb-4 sm:mb-6">
              <span className="block">Ready to Get Started?</span>
              <span className="block bg-gradient-to-r from-[rgba(37,150,190,0.8)] to-[rgba(37,150,190,1)] bg-clip-text text-transparent">
                Contact Us Today
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to get your vehicle's complete car report? Contact us today for professional VIN decoding services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 hover:border-[rgba(37,150,190,0.3)] hover:bg-white/90">
              <div className="w-16 h-16 bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-[rgba(37,150,190,0.2)] group-hover:to-[rgba(37,150,190,0.3)] transition-all duration-300 border border-[rgba(37,150,190,0.2)]">
                <svg className="w-8 h-8 text-[rgba(37,150,190,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Phone Support</h3>
              <p className="text-gray-600 text-lg mb-4">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-500">Available 24/7 for urgent inquiries</p>
            </div>
            
            <div className="text-center group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 hover:border-[rgba(37,150,190,0.3)] hover:bg-white/90">
              <div className="w-16 h-16 bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-[rgba(37,150,190,0.2)] group-hover:to-[rgba(37,150,190,0.3)] transition-all duration-300 border border-[rgba(37,150,190,0.2)]">
                <svg className="w-8 h-8 text-[rgba(37,150,190,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Email Support</h3>
              <p className="text-gray-600 text-lg mb-4">info@carvistors.com</p>
              <p className="text-sm text-gray-500">Professional support within 2 hours</p>
            </div>
            
            <div className="text-center group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 hover:border-[rgba(37,150,190,0.3)] hover:bg-white/90">
              <div className="w-16 h-16 bg-gradient-to-br from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-[rgba(37,150,190,0.2)] group-hover:to-[rgba(37,150,190,0.3)] transition-all duration-300 border border-[rgba(37,150,190,0.2)]">
                <svg className="w-8 h-8 text-[rgba(37,150,190,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Office Location</h3>
              <p className="text-gray-600 text-lg mb-4">123 Auto Street, City</p>
              <p className="text-sm text-gray-500">Visit our professional office</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img 
                    src={logo} 
                    alt="Car Vistors Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Car Vistors</h3>
                  <p className="text-sm text-gray-400 font-medium">Professional VIN Solutions</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Leading provider of professional VIN decoding and comprehensive vehicle analysis services. 
                Trusted by automotive professionals worldwide.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[rgba(37,150,190,1)] transition-colors duration-200 p-2 hover:bg-[rgba(37,150,190,1)]/10 rounded-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[rgba(37,150,190,1)] transition-colors duration-200 p-2 hover:bg-[rgba(37,150,190,1)]/10 rounded-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[rgba(37,150,190,1)] transition-colors duration-200 p-2 hover:bg-[rgba(37,150,190,1)]/10 rounded-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 c0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">VIN Decoding</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Vehicle Reports</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Car History</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">API Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/about')} className="text-gray-400 hover:text-white transition-colors duration-200">About Us</button></li>
                <li><button onClick={() => navigate('/contact')} className="text-gray-400 hover:text-white transition-colors duration-200">Contact</button></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Car Vistors. All rights reserved. | Professional VIN Decoding Solutions
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
