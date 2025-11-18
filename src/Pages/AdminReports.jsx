import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import A_Sidebar from '../Dashboards/Admin/A_Sidebar'
import { reportAPI } from '../Services/APIs'

const AdminReports = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [vin, setVin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [reportData, setReportData] = useState(null)
  const [reports, setReports] = useState([])
  const [showReportsList, setShowReportsList] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin')
    const token = localStorage.getItem('token')
    const userType = localStorage.getItem('userType')

    if (!token || userType !== 'admin' || !storedAdmin) {
      navigate('/login')
      return
    }

    setAdmin(JSON.parse(storedAdmin))
    fetchReports()
  }, [navigate])

  const fetchReports = async (isSearch = false, currentSearch = searchTerm) => {
    try {
      if (!isSearch && isInitialLoad) {
        setLoading(true)
      }
      setError('')
      const response = await reportAPI.getAll({ 
        page: 1, 
        limit: 100,
        search: currentSearch || undefined
      })
      
      if (response.success) {
        setReports(response.data.reports || [])
      } else {
        setError(response.message || 'Failed to fetch reports')
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch reports')
      console.error('Error fetching reports:', err)
    } finally {
      setLoading(false)
      setIsInitialLoad(false)
    }
  }

  useEffect(() => {
    if (admin && !isInitialLoad) {
      const delayDebounceFn = setTimeout(() => {
        fetchReports(true, searchTerm)
      }, 500)
      return () => clearTimeout(delayDebounceFn)
    }
  }, [searchTerm, admin, isInitialLoad])

  const getVehicleNameFromData = (reportData) => {
    if (!reportData) return 'Unknown Vehicle'
    
    // The reportData structure has a dynamic key (trim/style name) as the first level
    // Example: reportData["SL Front-wheel Drive Automatic"].basic.vehicle_name
    const firstKey = Object.keys(reportData)[0]
    
    if (firstKey && reportData[firstKey]) {
      const nestedData = reportData[firstKey]
      
      // Check nested basic.vehicle_name (this is the primary source)
      if (nestedData.basic?.vehicle_name) {
        return nestedData.basic.vehicle_name
      }
      
      // Try to construct from basic object
      if (nestedData.basic?.make && nestedData.basic?.model) {
        const year = nestedData.basic.year ? `${nestedData.basic.year} ` : ''
        const trim = nestedData.basic.trim?.Trim ? ` ${nestedData.basic.trim.Trim}` : ''
        return `${year}${nestedData.basic.make} ${nestedData.basic.model}${trim}`.trim()
      }
    }
    
    // Fallback: Check top-level basic (if structure is different)
    if (reportData.basic?.vehicle_name) {
      return reportData.basic.vehicle_name
    }
    
    // Try to construct from top-level basic object
    if (reportData.basic?.make && reportData.basic?.model) {
      const year = reportData.basic.year ? `${reportData.basic.year} ` : ''
      const trim = reportData.basic.trim?.Trim ? ` ${reportData.basic.trim.Trim}` : ''
      return `${year}${reportData.basic.make} ${reportData.basic.model}${trim}`.trim()
    }
    
    // Try top-level fields
    if (reportData.trim_and_style) {
      return reportData.trim_and_style
    }
    
    if (reportData.year && reportData.make && reportData.model) {
      const parts = [
        reportData.year,
        reportData.make,
        reportData.model,
        reportData.trim
      ].filter(Boolean)
      return parts.join(' ')
    }
    
    if (reportData.make && reportData.model) {
      return `${reportData.make} ${reportData.model}`
    }
    
    // Fallback
    return 'Unknown Vehicle'
  }

  const handleDecode = async (e) => {
    e.preventDefault()
    
    if (!vin.trim()) {
      setError('Please enter a VIN number')
      return
    }

    // Basic VIN validation
    const vinUpper = vin.toUpperCase().trim()
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/
    if (!vinRegex.test(vinUpper)) {
      setError('Invalid VIN format. Must be 17 characters (no I, O, Q).')
      return
    }

    try {
      setLoading(true)
      setError('')
      setSuccess('')
      setReportData(null)

      const adminEmail = admin?.email || 'admin@system.com'
      const response = await reportAPI.decode(vinUpper, adminEmail)
      
      if (response.success) {
        const vehicleName = response.vehicleName || getVehicleNameFromData(response.data) || vinUpper
        setSuccess(`VIN decoded successfully! Report saved for ${vehicleName}`)
        setReportData(response.data)
        setVin('')
        // Refresh reports list
        fetchReports()
      }
    } catch (err) {
      setError(err.message || 'Failed to decode VIN')
      setReportData(null)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getVehicleName = (report) => {
    // First try the vehicleName field - but skip if it contains "undefined"
    if (report.vehicleName && !report.vehicleName.includes('undefined')) {
      return report.vehicleName
    }
    
    // Extract from reportData structure
    const reportData = report.reportData || {}
    const extractedName = getVehicleNameFromData(reportData)
    
    // Only use extracted name if it's valid
    if (extractedName && extractedName !== 'Unknown Vehicle' && !extractedName.includes('undefined')) {
      return extractedName
    }
    
    // Fallback to VIN
    return `VIN: ${report.vin}`
  }

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (loading && isInitialLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 h-14 sm:h-20 lg:h-24">
          <div className="flex items-center justify-between p-3 sm:p-5 lg:p-6 h-full">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">VIN Reports</h1>
                <p className="hidden sm:block text-sm sm:text-base text-gray-600">Advanced VIN Decode & Reports</p>
              </div>
            </div>
            <button
              onClick={() => setShowReportsList(!showReportsList)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
            >
              {showReportsList ? 'New Decode' : 'View All Reports'}
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="p-3 sm:p-6 lg:p-8">
          {!showReportsList ? (
            <>
              {/* VIN Decode Form */}
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg overflow-hidden mb-6">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Decode VIN</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Enter a VIN to generate an advanced decode report</p>
                </div>
                <div className="p-4 sm:p-6">
                  <form onSubmit={handleDecode}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Enter 17-character VIN..."
                        value={vin}
                        onChange={(e) => setVin(e.target.value.toUpperCase())}
                        maxLength={17}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Decoding...' : 'Decode VIN'}
                      </button>
                    </div>
                  </form>

                  {/* Error Message */}
                  {error && (
                    <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Success Message */}
                  {success && (
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-green-800">{success}</p>
                      </div>
                    </div>
                  )}

                  {/* Report Data Preview */}
                  {reportData && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Report Preview:</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Vehicle:</span> {getVehicleNameFromData(reportData)}</p>
                        {reportData.price && (
                          <p><span className="font-medium">Base MSRP:</span> ${reportData.price.base_msrp?.toLocaleString() || 'N/A'}</p>
                        )}
                        {reportData.vehicle && (
                          <p><span className="font-medium">Body Type:</span> {reportData.vehicle.body_type || 'N/A'}</p>
                        )}
                        {reportData.basic?.body_type && (
                          <p><span className="font-medium">Body Type:</span> {reportData.basic.body_type}</p>
                        )}
                      </div>
                      <button
                        onClick={() => navigate(`/admin/report/${reportData.vin || reportData.basic?.vin || vin}`)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                      >
                        View Full Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Reports List */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search VIN, vehicle name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/95 border border-transparent focus:border-transparent focus:ring-0 focus-visible:ring-2 focus-visible:ring-blue-300 rounded-full shadow-md shadow-blue-100 hover:shadow-blue-200 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">All Reports ({reports.length})</h3>
                </div>

                <div className="p-4">
                  {reports.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No reports found</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {reports.map((report) => (
                        <div
                          key={report._id}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => navigate(`/admin/report/${report.vin}`)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 truncate">
                                {getVehicleName(report)}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">VIN: {report.vin}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                Decoded by: {report.decodedBy} • {formatDate(report.decodedDate)}
                              </p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminReports

