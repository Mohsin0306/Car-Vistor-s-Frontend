import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'

const AboutUs = () => {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Clean Professional Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>

      {/* Modern Glass Navigation - Same as Home */}
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
                <button onClick={() => navigate('/')} className="px-4 py-2 text-gray-700 hover:text-[rgba(37,150,190,1)] hover:bg-[rgba(37,150,190,0.1)] font-medium transition-all duration-200 rounded-xl relative group">
                  Home
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[rgba(37,150,190,1)] transition-all duration-300 group-hover:w-3/4"></span>
                </button>
                <button className="px-4 py-2 text-[rgba(37,150,190,1)] bg-[rgba(37,150,190,0.1)] font-medium transition-all duration-200 rounded-xl relative group">
                  About
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-[rgba(37,150,190,1)]"></span>
                </button>
                <button onClick={() => navigate('/login')} className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-200/50">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Login</span>
                  </div>
                </button>
                <button onClick={() => navigate('/register')} className="bg-gradient-to-r from-[rgba(37,150,190,1)] to-[rgba(37,150,190,0.8)] hover:from-[rgba(37,150,190,0.9)] hover:to-[rgba(37,150,190,1)] text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
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
              <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-md transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              ></div>
              
              <div className={`fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-3xl shadow-2xl border-l border-white/30 transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-screen">
                  <div className="flex items-center justify-between p-6 border-b border-white/30 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[rgba(37,150,190,0.2)] to-[rgba(37,150,190,0.3)] rounded-xl backdrop-blur-sm border border-white/30">
                        <img src={logo} alt="Car Vistors Logo" className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-gray-800">Car Vistors</h2>
                        <p className="text-xs text-gray-600 font-medium">Professional VIN Solutions</p>
                      </div>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white/30 rounded-xl transition-all duration-200">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-2">
                    <button onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }} className="flex items-center px-4 py-4 text-gray-600 hover:text-[rgba(37,150,190,1)] hover:bg-gradient-to-r hover:from-[rgba(37,150,190,0.1)] hover:to-[rgba(37,150,190,0.2)] font-medium transition-all duration-300 rounded-2xl group w-full text-left">
                      <span className="transition-all duration-300 font-semibold">Home</span>
                    </button>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-4 text-[rgba(37,150,190,1)] bg-gradient-to-r from-[rgba(37,150,190,0.1)] to-[rgba(37,150,190,0.2)] font-medium transition-all duration-300 rounded-2xl group w-full text-left">
                      <span className="transition-all duration-300 font-semibold">About</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* About Us Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 pt-32 sm:pt-40">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-[rgba(37,150,190,1)]">Car Vistors</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional VIN Decoding and Vehicle Information Services
          </p>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              Car Vistors is a professional vehicle information service provider specializing in Vehicle Identification Number (VIN) decoding and comprehensive vehicle analysis. Our services are designed to provide accurate, reliable, and legally compliant vehicle information to consumers, businesses, and professionals in the automotive industry.
            </p>
            <p className="mb-4">
              We operate in compliance with all applicable United States federal and state laws governing vehicle information services, data privacy, and consumer protection. Our services utilize publicly available vehicle information databases and comply with the regulations set forth by the National Highway Traffic Safety Administration (NHTSA) and other relevant federal agencies.
            </p>
            <p>
              All vehicle information provided through our services is obtained from legitimate sources and is presented for informational purposes only. We do not guarantee the accuracy, completeness, or timeliness of any vehicle information, and users are advised to verify all information independently before making any decisions based on such information.
            </p>
          </div>
        </div>

        {/* Legal Compliance Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Legal Compliance and Regulations</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Federal Motor Vehicle Safety Standards (FMVSS)</h3>
              <p className="mb-2">
                Our VIN decoding services comply with the Federal Motor Vehicle Safety Standards established under Title 49 of the Code of Federal Regulations (49 CFR Part 565). The VIN system used in our services follows the standardized format required by the National Highway Traffic Safety Administration (NHTSA) for all vehicles manufactured for sale in the United States.
              </p>
              <p>
                Pursuant to 49 CFR Part 565, Vehicle Identification Number (VIN) requirements, all vehicles must have a unique 17-character VIN that provides information about the vehicle's manufacturer, model, year, and other identifying characteristics. Our services decode this information in accordance with these federal regulations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Driver's Privacy Protection Act (DPPA)</h3>
              <p className="mb-2">
                Car Vistors operates in full compliance with the Driver's Privacy Protection Act (18 U.S.C. § 2721 et seq.), which restricts the disclosure of personal information from motor vehicle records. Our services do not provide, access, or disclose personal information protected under the DPPA, including names, addresses, telephone numbers, social security numbers, or other personally identifiable information.
              </p>
              <p>
                We only provide vehicle identification and specification information that is publicly available and does not constitute protected personal information under the DPPA. All data processing and storage practices comply with DPPA requirements and applicable state privacy laws.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fair Credit Reporting Act (FCRA)</h3>
              <p className="mb-2">
                Our services are not consumer reporting agencies as defined under the Fair Credit Reporting Act (15 U.S.C. § 1681 et seq.). The vehicle information we provide does not constitute a consumer report and is not intended to be used for credit, employment, insurance, or other FCRA-covered purposes.
              </p>
              <p>
                Users are expressly prohibited from using our services or the information provided therein for any purpose covered by the FCRA, including but not limited to determining eligibility for credit, employment, insurance, or housing. Any such use is strictly prohibited and may result in legal action.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">State Vehicle Information Laws</h3>
              <p className="mb-2">
                Car Vistors complies with all applicable state laws governing vehicle information services, including but not limited to state-specific regulations regarding VIN verification, vehicle history reporting, and consumer protection requirements.
              </p>
              <p>
                Certain states may have additional requirements or restrictions on vehicle information services. Users are responsible for ensuring their use of our services complies with all applicable state and local laws in their jurisdiction.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Privacy and Security</h3>
              <p className="mb-2">
                We maintain reasonable security measures to protect user data and vehicle information in accordance with applicable data protection laws, including state data breach notification laws and federal privacy regulations.
              </p>
              <p>
                All user information is handled in accordance with our Privacy Policy and Terms of Service. We do not sell, rent, or otherwise disclose user information to third parties except as required by law or as necessary to provide our services.
              </p>
            </div>
          </div>
        </div>

        {/* Service Limitations */}
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Limitations and Disclaimers</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              <strong>Accuracy Disclaimer:</strong> While we strive to provide accurate vehicle information, we do not guarantee the accuracy, completeness, or reliability of any information provided through our services. Vehicle information is obtained from third-party sources and may contain errors or omissions.
            </p>
            <p>
              <strong>No Warranty:</strong> Our services are provided "as is" without warranty of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              <strong>Limitation of Liability:</strong> Car Vistors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services or reliance on any information provided therein.
            </p>
            <p>
              <strong>Prohibited Uses:</strong> Users may not use our services for any illegal purpose or in violation of any applicable laws or regulations. Prohibited uses include, but are not limited to, fraud, identity theft, or any activity that violates the rights of others.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              For questions regarding our services, legal compliance, or this About Us page, please contact us through our official channels. We are committed to maintaining transparency and compliance with all applicable laws and regulations.
            </p>
            <p>
              Car Vistors reserves the right to modify this About Us page and our terms of service at any time. Users are encouraged to review these documents periodically to stay informed of any changes.
            </p>
          </div>
        </div>
      </div>

      {/* Modern Footer - Same as Home */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src={logo} alt="Car Vistors Logo" className="w-full h-full object-contain" />
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
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Car Vistors. All rights reserved. | Professional VIN Decoding Solutions
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AboutUs
