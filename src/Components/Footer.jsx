import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'

const Footer = () => {
  const navigate = useNavigate()

  return (
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
            <p className="text-gray-400 leading-relaxed max-w-md">
              Leading provider of professional VIN decoding and comprehensive vehicle analysis services. 
              Trusted by automotive professionals worldwide.
            </p>
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
            © {new Date().getFullYear()} Car Vistors. All rights reserved. | Professional VIN Decoding Solutions
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

