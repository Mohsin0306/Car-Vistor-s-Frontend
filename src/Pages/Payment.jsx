import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { vinAPI } from '../Services/APIs'

const Payment = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isProcessing, setIsProcessing] = useState(false)
  const [vehicleDetails, setVehicleDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Get VIN from URL parameters
  const urlParams = new URLSearchParams(location.search)
  const vinFromUrl = urlParams.get('vin')

  // Fetch vehicle details on component mount
  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        setIsLoading(true)
        // Get VIN from URL parameters or use a default VIN for demo
        const vin = vinFromUrl || '1HGBH41JXMN109186'
        
        const response = await vinAPI.decode(vin)
        setVehicleDetails(response.data)
        setError('')
      } catch (error) {
        console.error('Error fetching vehicle details:', error)
        setError(error.message || 'Failed to fetch vehicle details')
        // Set default details for demo
        setVehicleDetails({
          vehicle: "2020 Toyota Camry LE",
          vin: "1HGBH41JXMN109186",
          year: "2020",
          make: "Toyota",
          model: "Camry LE",
          engine: "2.5L 4-Cylinder",
          transmission: "Automatic",
          fuelType: "Gasoline",
          mileage: "45,000 miles",
          condition: "Excellent"
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchVehicleDetails()
  }, [vinFromUrl])

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Navigate to register page with VIN parameter if available
      if (vinFromUrl) {
        navigate(`/register?vin=${vinFromUrl}`)
      } else {
        navigate('/register')
      }
    }, 2000)
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                <img 
                  src="/src/assets/images/logo.png" 
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
            
            <button 
              onClick={handleBack}
              className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Payment Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
            Complete Your
            <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              VIN Report Purchase
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant access to comprehensive vehicle information and detailed specifications
          </p>
        </div>

        {/* Mobile Fixed Bottom Payment */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-bold text-gray-400 line-through">$50</span>
                <span className="text-2xl font-bold text-blue-600">$35</span>
                <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  30% OFF
                </div>
              </div>
            </div>
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-xl text-base transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                'Pay $35 - Get Report Now'
              )}
            </button>
            <div className="text-center mt-2">
              <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure Payment • SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Container */}
        <div className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/30 h-[calc(100vh-200px)]">
          <div className="grid grid-cols-2 gap-12 h-full">
            {/* Left Side - Vehicle Information */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Poppins, sans-serif'}}>
                Vehicle Information
              </h2>
              
              <div className="space-y-3 flex-1">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading vehicle details...</span>
                  </div>
                ) : vehicleDetails ? (
                  <>
                    <div className="flex justify-between items-center py-2 border-b border-gray-300">
                      <span className="text-gray-600 font-medium text-sm">Vehicle:</span>
                      <span className="text-gray-900 font-semibold text-sm">{vehicleDetails.vehicle}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-300">
                      <span className="text-gray-600 font-medium text-sm">VIN:</span>
                      <span className="text-gray-900 font-mono text-xs">{vehicleDetails.vin}</span>
                    </div>
                    
                    {vehicleDetails.year && vehicleDetails.year !== 'N/A' && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-300">
                        <span className="text-gray-600 font-medium text-sm">Year:</span>
                        <span className="text-gray-900 font-semibold text-sm">{vehicleDetails.year}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.make && vehicleDetails.make !== 'N/A' && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-300">
                        <span className="text-gray-600 font-medium text-sm">Make:</span>
                        <span className="text-gray-900 font-semibold text-sm">{vehicleDetails.make}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.model && vehicleDetails.model !== 'N/A' && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-300">
                        <span className="text-gray-600 font-medium text-sm">Model:</span>
                        <span className="text-gray-900 font-semibold text-sm">{vehicleDetails.model}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.engine && vehicleDetails.engine !== 'N/A' && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-300">
                        <span className="text-gray-600 font-medium text-sm">Engine:</span>
                        <span className="text-gray-900 font-semibold text-sm">{vehicleDetails.engine}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.transmission && vehicleDetails.transmission !== 'N/A' && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-300">
                        <span className="text-gray-600 font-medium text-sm">Transmission:</span>
                        <span className="text-gray-900 font-semibold text-sm">{vehicleDetails.transmission}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.fuelType && vehicleDetails.fuelType !== 'N/A' && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-300">
                        <span className="text-gray-600 font-medium text-sm">Fuel Type:</span>
                        <span className="text-gray-900 font-semibold text-sm">{vehicleDetails.fuelType}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.mileage && vehicleDetails.mileage !== 'N/A' && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-300">
                        <span className="text-gray-600 font-medium text-sm">Mileage:</span>
                        <span className="text-gray-900 font-semibold text-sm">{vehicleDetails.mileage}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.condition && vehicleDetails.condition !== 'N/A' && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium text-sm">Condition:</span>
                        <span className="text-green-600 font-semibold text-sm">{vehicleDetails.condition}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-red-600">Failed to load vehicle details</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Payment Details */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Poppins, sans-serif'}}>
                Payment Details
              </h2>
              
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                {/* Pricing */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">VIN Report Package</h3>
                  
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <span className="text-xl font-bold text-gray-400 line-through">$50</span>
                    <span className="text-3xl font-bold text-blue-600">$35</span>
                  </div>
                  
                  <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    30% OFF
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm">What's Included:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">Complete Vehicle Specifications</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">Manufacturing Details</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">Safety Ratings & Recalls</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">Market Value Analysis</span>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <div className="space-y-3">
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-xl text-base transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      'Pay $35 - Get Report Now'
                    )}
                  </button>

                  {/* Security Badge */}
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span>Secure Payment • SSL Encrypted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Content - No Container */}
        <div className="lg:hidden grid grid-cols-1 gap-8 pb-20">
            {/* Left Side - Vehicle Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Poppins, sans-serif'}}>
                Vehicle Information
              </h2>
              
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading vehicle details...</span>
                  </div>
                ) : vehicleDetails ? (
                  <>
                    <div className="flex justify-between items-center py-3 border-b border-gray-300">
                      <span className="text-gray-600 font-medium">Vehicle:</span>
                      <span className="text-gray-900 font-semibold">{vehicleDetails.vehicle}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-gray-300">
                      <span className="text-gray-600 font-medium">VIN:</span>
                      <span className="text-gray-900 font-mono text-sm">{vehicleDetails.vin}</span>
                    </div>
                    
                    {vehicleDetails.year && vehicleDetails.year !== 'N/A' && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-300">
                        <span className="text-gray-600 font-medium">Year:</span>
                        <span className="text-gray-900 font-semibold">{vehicleDetails.year}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.make && vehicleDetails.make !== 'N/A' && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-300">
                        <span className="text-gray-600 font-medium">Make:</span>
                        <span className="text-gray-900 font-semibold">{vehicleDetails.make}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.model && vehicleDetails.model !== 'N/A' && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-300">
                        <span className="text-gray-600 font-medium">Model:</span>
                        <span className="text-gray-900 font-semibold">{vehicleDetails.model}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.engine && vehicleDetails.engine !== 'N/A' && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-300">
                        <span className="text-gray-600 font-medium">Engine:</span>
                        <span className="text-gray-900 font-semibold">{vehicleDetails.engine}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.transmission && vehicleDetails.transmission !== 'N/A' && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-300">
                        <span className="text-gray-600 font-medium">Transmission:</span>
                        <span className="text-gray-900 font-semibold">{vehicleDetails.transmission}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.fuelType && vehicleDetails.fuelType !== 'N/A' && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-300">
                        <span className="text-gray-600 font-medium">Fuel Type:</span>
                        <span className="text-gray-900 font-semibold">{vehicleDetails.fuelType}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.mileage && vehicleDetails.mileage !== 'N/A' && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-300">
                        <span className="text-gray-600 font-medium">Mileage:</span>
                        <span className="text-gray-900 font-semibold">{vehicleDetails.mileage}</span>
                      </div>
                    )}
                    
                    {vehicleDetails.condition && vehicleDetails.condition !== 'N/A' && (
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600 font-medium">Condition:</span>
                        <span className="text-green-600 font-semibold">{vehicleDetails.condition}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-red-600">Failed to load vehicle details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Payment
