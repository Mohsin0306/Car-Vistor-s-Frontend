import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import A_Sidebar from '../Dashboards/Admin/A_Sidebar'
import { requestAPI } from '../Services/APIs'

const VINRequestDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userType = localStorage.getItem('userType')
    const admin = localStorage.getItem('admin')

    if (!token || userType !== 'admin' || !admin) {
      navigate('/login')
      return
    }

    fetchRequestDetails()
  }, [id, navigate])

  const fetchRequestDetails = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await requestAPI.getById(id)
      
      if (response.success) {
        setRequest(response.data)
      } else {
        setError(response.message || 'Failed to fetch request details')
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch request details')
      console.error('Error fetching request details:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await requestAPI.updateStatus({ requestId: id, status: newStatus })
      
      if (response.success) {
        setRequest(prev => ({ ...prev, status: newStatus }))
      } else {
        setError(response.message || 'Failed to update status')
      }
    } catch (err) {
      setError(err.message || 'Failed to update status')
      console.error('Error updating status:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error && !request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex">
        <A_Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:ml-0 overflow-hidden">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-red-200 shadow-lg p-6 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">Error</h2>
              </div>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => navigate('/admin-dashboard')}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex">
      {/* Sidebar */}
      <A_Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 overflow-hidden">
        {/* Top Header */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 h-12 sm:h-20 lg:h-24">
          <div className="flex items-center justify-between px-3 py-2 sm:p-5 lg:p-6 h-full">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => navigate('/admin-dashboard')}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-sm sm:text-xl lg:text-2xl font-bold text-gray-900">VIN Details</h1>
                <p className="hidden sm:block text-sm sm:text-base text-gray-600">Request ID: #{request?._id?.slice(-8)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="p-3 sm:p-6 lg:p-8">
          {error && (
            <div className="mb-3 sm:mb-6 bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-2 sm:ml-3">
                  <p className="text-xs sm:text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {request && (
            <div className="space-y-3 sm:space-y-6">
              {/* Main Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="px-4 py-3 sm:px-6 sm:py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 break-all">{request.vin}</h2>
                      <p className="text-xs sm:text-sm text-gray-600">ID: #{request._id.slice(-8)}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-full border shrink-0 ${getStatusColor(request.status)}`}>
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current"></span>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  {/* User & Request Info - Mobile Compact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                    {/* User Information */}
                    <div className="space-y-2 sm:space-y-4">
                      <h3 className="text-sm sm:text-lg font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="hidden sm:inline">User Information</span>
                        <span className="sm:hidden">User</span>
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 break-all">{request.userEmail}</p>
                      </div>
                    </div>

                    {/* Request Information */}
                    <div className="space-y-2 sm:space-y-4">
                      <h3 className="text-sm sm:text-lg font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="hidden sm:inline">Request Information</span>
                        <span className="sm:hidden">Request</span>
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                        <div>
                          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Request Date</p>
                          <p className="text-xs sm:text-sm font-medium text-gray-900">{formatDate(request.requestDate)}</p>
                        </div>
                        {request.completedDate && (
                          <div>
                            <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Completed Date</p>
                            <p className="text-xs sm:text-sm font-medium text-gray-900">{formatDate(request.completedDate)}</p>
                          </div>
                        )}
                        <div className="pt-1 sm:pt-0 border-t border-gray-200 sm:border-0">
                          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Payment Amount</p>
                          <p className="text-base sm:text-lg font-bold text-green-600">${request.paymentAmount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Details Card */}
              {request.vehicleDetails && (
                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                  <div className="px-4 py-3 sm:px-6 sm:py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Vehicle Details
                    </h3>
                  </div>
                  <div className="p-3 sm:p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                      {Object.entries(request.vehicleDetails).map(([key, value]) => (
                        value && value !== 'N/A' ? (
                          <div key={key} className="bg-gray-50 rounded-lg p-2.5 sm:p-4">
                            <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 truncate">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </p>
                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate" title={value}>{value}</p>
                          </div>
                        ) : null
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="px-4 py-3 sm:px-6 sm:py-5 border-b border-gray-200">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Actions</h3>
                </div>
                <div className="p-3 sm:p-6">
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                    {request.status === 'pending' && (
                      <button
                        onClick={() => handleStatusChange('processing')}
                        className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
                      >
                        Mark as Processing
                      </button>
                    )}
                    {request.status === 'processing' && (
                      <button
                        onClick={() => handleStatusChange('completed')}
                        className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-green-600 text-white text-sm sm:text-base rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
                      >
                        Mark as Completed
                      </button>
                    )}
                    {request.status === 'completed' && (
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-green-600 py-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm sm:text-base font-semibold">Request Completed</span>
                      </div>
                    )}
                    <button
                      onClick={() => navigate('/admin-dashboard')}
                      className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-gray-200 text-gray-700 text-sm sm:text-base rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default VINRequestDetail

