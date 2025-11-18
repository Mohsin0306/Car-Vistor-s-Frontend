import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'

const AboutUs = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Clean Professional Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>

      {/* Navigation */}
      <nav className="relative z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Car Vistors Logo" 
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => navigate('/')}
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-800">Car Vistors</h1>
                <p className="text-xs text-gray-600 font-medium">Professional VIN Solutions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* About Us Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            About <span className="text-blue-600">Car Vistors</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading provider of professional VIN decoding and comprehensive vehicle analysis services
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              At Car Vistors, we are dedicated to providing accurate, reliable, and comprehensive VIN decoding services 
              that empower our customers to make informed decisions about their vehicles. We combine cutting-edge 
              technology with expert knowledge to deliver detailed vehicle information reports that help you understand 
              every aspect of your vehicle's history, specifications, and condition.
            </p>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">VIN Decoding</h3>
              <p className="text-gray-700">
                Decode any 17-character VIN to get comprehensive vehicle information including make, model, year, 
                engine specifications, and more.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Detailed Reports</h3>
              <p className="text-gray-700">
                Generate professional PDF reports with complete vehicle analysis, specifications, and history 
                for your records or business needs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-700">
                Our team of automotive experts is always ready to help you understand your vehicle data and 
                answer any questions you may have.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Accurate & Reliable</h3>
                <p className="text-gray-700">
                  Our VIN decoding service uses official databases and industry-standard methods to ensure 
                  the highest accuracy in vehicle information.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Processing</h3>
                <p className="text-gray-700">
                  Get your vehicle reports in minutes, not days. Our streamlined process ensures quick 
                  turnaround times without compromising quality.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Reports</h3>
                <p className="text-gray-700">
                  Download professional PDF reports that you can use for business, insurance, or personal 
                  records. All reports are formatted for easy reading and sharing.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Private</h3>
                <p className="text-gray-700">
                  Your data is protected with industry-standard security measures. We respect your privacy 
                  and never share your information with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 sm:p-12 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Integrity</h3>
                <p className="text-blue-100">
                  We maintain the highest standards of honesty and transparency in all our operations.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-blue-100">
                  We continuously improve our services using the latest technology and industry best practices.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Customer Focus</h3>
                <p className="text-blue-100">
                  Your satisfaction is our priority. We go above and beyond to meet your needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Car Vistors for their vehicle information needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Create Account
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Decode VIN Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img src={logo} alt="Car Vistors Logo" className="w-10 h-10 object-contain" />
              <h3 className="text-2xl font-bold">Car Vistors</h3>
            </div>
            <p className="text-gray-400 mb-4">Professional VIN Solutions</p>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Car Vistors. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AboutUs

