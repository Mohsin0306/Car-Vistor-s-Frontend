import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'

const Navbar = ({ currentPage = 'home' }) => {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Modern Logo - Mobile Responsive */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
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
              <a 
                href="#home" 
                onClick={(e) => {
                  if (currentPage !== 'home') {
                    e.preventDefault()
                    navigate('/')
                  }
                }}
                className={`px-4 py-2 ${currentPage === 'home' ? 'text-[rgba(37,150,190,1)] bg-[rgba(37,150,190,0.1)]' : 'text-gray-700 hover:text-[rgba(37,150,190,1)] hover:bg-[rgba(37,150,190,0.1)]'} font-medium transition-all duration-200 rounded-xl relative group`}
              >
                Home
                {currentPage === 'home' && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-[rgba(37,150,190,1)]"></span>
                )}
                {currentPage !== 'home' && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[rgba(37,150,190,1)] transition-all duration-300 group-hover:w-3/4"></span>
                )}
              </a>
              <a 
                href="#services" 
                onClick={(e) => {
                  if (currentPage !== 'home') {
                    e.preventDefault()
                    navigate('/#services')
                  }
                }}
                className={`px-4 py-2 ${currentPage === 'services' ? 'text-[rgba(37,150,190,1)] bg-[rgba(37,150,190,0.1)]' : 'text-gray-600 hover:text-[rgba(37,150,190,1)] hover:bg-[rgba(37,150,190,0.1)]'} font-medium transition-all duration-200 rounded-xl relative group`}
              >
                Services
                {currentPage === 'services' && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-[rgba(37,150,190,1)]"></span>
                )}
                {currentPage !== 'services' && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[rgba(37,150,190,1)] transition-all duration-300 group-hover:w-3/4"></span>
                )}
              </a>
              <button 
                onClick={() => navigate('/about')}
                className={`px-4 py-2 ${currentPage === 'about' ? 'text-[rgba(37,150,190,1)] bg-[rgba(37,150,190,0.1)]' : 'text-gray-600 hover:text-[rgba(37,150,190,1)] hover:bg-[rgba(37,150,190,0.1)]'} font-medium transition-all duration-200 rounded-xl relative group`}
              >
                About
                {currentPage === 'about' && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-[rgba(37,150,190,1)]"></span>
                )}
                {currentPage !== 'about' && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[rgba(37,150,190,1)] transition-all duration-300 group-hover:w-3/4"></span>
                )}
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className={`px-4 py-2 ${currentPage === 'contact' ? 'text-[rgba(37,150,190,1)] bg-[rgba(37,150,190,0.1)]' : 'text-gray-600 hover:text-[rgba(37,150,190,1)] hover:bg-[rgba(37,150,190,0.1)]'} font-medium transition-all duration-200 rounded-xl relative group`}
              >
                Contact
                {currentPage === 'contact' && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-[rgba(37,150,190,1)]"></span>
                )}
                {currentPage !== 'contact' && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[rgba(37,150,190,1)] transition-all duration-300 group-hover:w-3/4"></span>
                )}
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
                
                {/* Sidebar Menu Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-2">
                  <a 
                    href="#home" 
                    onClick={(e) => {
                      if (currentPage !== 'home') {
                        e.preventDefault()
                        navigate('/')
                        setIsMobileMenuOpen(false)
                      } else {
                        setIsMobileMenuOpen(false)
                      }
                    }}
                    className="flex items-center px-4 py-4 text-gray-600 hover:text-[rgba(37,150,190,1)] hover:bg-gradient-to-r hover:from-[rgba(37,150,190,0.1)] hover:to-[rgba(37,150,190,0.2)] font-medium transition-all duration-300 rounded-2xl group backdrop-blur-sm border border-transparent hover:border-[rgba(37,150,190,0.3)]"
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
                    onClick={(e) => {
                      if (currentPage !== 'home') {
                        e.preventDefault()
                        navigate('/#services')
                        setIsMobileMenuOpen(false)
                      } else {
                        setIsMobileMenuOpen(false)
                      }
                    }}
                    className="flex items-center px-4 py-4 text-gray-600 hover:text-[rgba(37,150,190,1)] hover:bg-gradient-to-r hover:from-[rgba(37,150,190,0.1)] hover:to-[rgba(37,150,190,0.2)] font-medium transition-all duration-300 rounded-2xl group backdrop-blur-sm border border-transparent hover:border-[rgba(37,150,190,0.3)]"
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
                      
                  {/* Get Started Button */}
                  <button 
                    onClick={() => {
                      navigate('/register')
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full bg-gradient-to-r from-[rgba(37,150,190,1)] to-[rgba(37,150,190,0.8)] hover:from-[rgba(37,150,190,0.9)] hover:to-[rgba(37,150,190,1)] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm border border-[rgba(37,150,190,0.3)] mt-4"
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
    </nav>
  )
}

export default Navbar

