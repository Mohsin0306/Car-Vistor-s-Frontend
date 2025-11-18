import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import A_Sidebar from '../Dashboards/Admin/A_Sidebar'
import { reportAPI } from '../Services/APIs'
import logo from '../assets/images/logo.png'

const ReportDetail = () => {
  const navigate = useNavigate()
  const { vin } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin')
    const token = localStorage.getItem('token')
    const userType = localStorage.getItem('userType')

    if (!token || userType !== 'admin' || !storedAdmin) {
      navigate('/login')
      return
    }

    setAdmin(JSON.parse(storedAdmin))
    fetchReport()
  }, [vin, navigate])

  const fetchReport = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await reportAPI.getByVin(vin)

      if (response.success) {
        setReport(response.data)
      } else {
        setError(response.message || 'Failed to fetch report')
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch report')
      console.error('Error fetching report:', err)
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

  const renderValue = (value, key = '') => {
    if (value === null || value === undefined || value === '') return 'N/A'
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (typeof value === 'number') {
      // Format numbers with commas for large values
      if (value > 1000) return value.toLocaleString()
      return String(value)
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
      // For nested objects, return null and handle in renderSection
      return null
    }
    // Remove "undefined" strings
    const stringValue = String(value)
    if (stringValue.includes('undefined')) {
      return stringValue.replace(/undefined/g, '').trim() || 'N/A'
    }
    return stringValue
  }

  const formatKey = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const renderSection = (title, data) => {
    if (!hasData(data)) return null

    return (
      <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">{title}</h3>
        <div className="space-y-3">
          {typeof data === 'object' && !Array.isArray(data) ? (
            Object.entries(data)
              .filter(([key, value]) => value !== null && value !== undefined && value !== '')
              .map(([key, value]) => {
                // Handle nested objects
                if (typeof value === 'object' && !Array.isArray(value)) {
                  if (!hasData(value)) return null
                  const nestedEntries = Object.entries(value).filter(([_, nestedValue]) => hasData(nestedValue))
                  if (nestedEntries.length === 0) return null

                  return (
                    <div key={key} className="border-l-2 border-blue-200 pl-4 py-2 bg-gray-50 rounded">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">{formatKey(key)}</h4>
                      <div className="space-y-2 ml-2">
                        {nestedEntries.map(([nestedKey, nestedValue]) => (
                          <div key={nestedKey} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                            <span className="text-xs font-medium text-gray-600">{formatKey(nestedKey)}:</span>
                            <span className="text-xs text-gray-900 text-right sm:text-left">
                              {Array.isArray(nestedValue) ? (
                                <div className="flex flex-wrap gap-1">
                                  {nestedValue.map((item, idx) => {
                                    if (typeof item === 'object' && item !== null) {
                                      const objEntries = Object.entries(item).filter(([_, v]) => v !== null && v !== undefined && v !== '')
                                      if (objEntries.length === 0) return null
                                      return (
                                        <div key={idx} className="inline-block px-2 py-1 bg-blue-50 border border-blue-200 rounded text-xs">
                                          {objEntries.map(([k, v], i) => (
                                            <div key={i}>
                                              <span className="font-medium">{formatKey(k)}:</span> {String(v).replace(/undefined/g, '').trim() || 'N/A'}
                                            </div>
                                          ))}
                                        </div>
                                      )
                                    }
                                    const itemStr = String(item).replace(/undefined/g, '').trim()
                                    return itemStr ? (
                                      <span key={idx} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                        {itemStr}
                                      </span>
                                    ) : null
                                  })}
                                </div>
                              ) : (
                                renderValue(nestedValue, nestedKey)
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }

                const displayValue = renderValue(value, key)
                if (displayValue === null) return null // Skip nested objects, they're handled separately

                return (
                  <div key={key} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                      <span className="text-sm font-medium text-gray-600">
                        {formatKey(key)}:
                      </span>
                      <span className="text-sm text-gray-900 text-right sm:text-left font-medium">
                        {Array.isArray(value) ? (
                          <div className="flex flex-wrap gap-2">
                            {value.map((item, idx) => {
                              if (typeof item === 'object' && item !== null) {
                                // For object arrays, show key-value pairs
                                const objEntries = Object.entries(item).filter(([_, v]) => v !== null && v !== undefined && v !== '')
                                if (objEntries.length === 0) return null
                                return (
                                  <div key={idx} className="inline-block px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md text-xs">
                                    {objEntries.map(([k, v], i) => (
                                      <div key={i}>
                                        <span className="font-medium">{formatKey(k)}:</span> {String(v).replace(/undefined/g, '').trim() || 'N/A'}
                                      </div>
                                    ))}
                                  </div>
                                )
                              }
                              const itemStr = String(item).replace(/undefined/g, '').trim()
                              return itemStr ? (
                                <span key={idx} className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                                  {itemStr}
                                </span>
                              ) : null
                            })}
                          </div>
                        ) : (
                          displayValue || 'N/A'
                        )}
                      </span>
                    </div>
                  </div>
                )
              })
              .filter(item => item !== null)
          ) : (
            <div className="text-sm text-gray-900">{renderValue(data)}</div>
          )}
        </div>
      </div>
    )
  }

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <A_Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:ml-0 overflow-hidden">
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error || 'Report not found'}</p>
              <button
                onClick={() => navigate('/admin/reports')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Back to Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const reportData = report.reportData || {}

  // Extract nested data structure (handles dynamic key structure)
  const getNestedData = () => {
    if (!reportData || typeof reportData !== 'object') return {}
    const firstKey = Object.keys(reportData)[0]
    if (firstKey && reportData[firstKey] && typeof reportData[firstKey] === 'object') {
      return reportData[firstKey]
    }
    return reportData
  }

  const nestedData = getNestedData() || {}
  const trimKey = (reportData && typeof reportData === 'object' && Object.keys(reportData).length > 0)
    ? Object.keys(reportData)[0]
    : '' // The dynamic key (trim/style name)

  // Extract commonly used values for cleaner conditionals
  const basicInfo = nestedData?.basic || null

  // Extract vehicle name from reportData - handle nested structure
  const getVehicleName = () => {
    // Check nested basic.vehicle_name (this is the primary source)
    if (nestedData.basic?.vehicle_name) {
      return nestedData.basic.vehicle_name
    }

    // Try to construct from nested basic object
    if (nestedData.basic?.make && nestedData.basic?.model) {
      const year = nestedData.basic.year ? `${nestedData.basic.year} ` : ''
      const trim = nestedData.basic.trim?.Trim ? ` ${nestedData.basic.trim.Trim}` : ''
      return `${year}${nestedData.basic.make} ${nestedData.basic.model}${trim}`.trim()
    }

    // Fallback: Check top-level basic.vehicle_name
    if (reportData.basic?.vehicle_name) {
      return reportData.basic.vehicle_name
    }

    // Try to construct from top-level basic object
    if (reportData.basic?.make && reportData.basic?.model) {
      const year = reportData.basic.year ? `${reportData.basic.year} ` : ''
      const trim = reportData.basic.trim?.Trim ? ` ${reportData.basic.trim.Trim}` : ''
      return `${year}${reportData.basic.make} ${reportData.basic.model}${trim}`.trim()
    }

    // Check for trim_and_style
    if (reportData.trim_and_style) {
      return reportData.trim_and_style
    }

    // Build from top-level year, make, model, trim
    const parts = []
    if (reportData.year) parts.push(String(reportData.year))
    if (reportData.make) parts.push(reportData.make)
    if (reportData.model) parts.push(reportData.model)
    if (reportData.trim && typeof reportData.trim === 'string') parts.push(reportData.trim)

    if (parts.length > 0) {
      return parts.join(' ')
    }

    // Use saved vehicleName if it's valid
    if (report.vehicleName && !report.vehicleName.includes('undefined')) {
      return report.vehicleName
    }

    // Fallback to VIN
    return report.vin ? `Vehicle - ${report.vin}` : 'Unknown Vehicle'
  }

  const vehicleName = getVehicleName()

  // Helper to render color swatches
  const renderColorSwatch = (color) => {
    if (!color || typeof color !== 'object') return null
    const hex = color.Hex || color.hex || '#000000'
    const colorName = color.Color || color.color || color['Generic Name'] || 'Unknown'
    return (
      <div key={colorName} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
        <div
          className="w-8 h-8 rounded border border-gray-300 shadow-sm"
          style={{ backgroundColor: hex }}
          title={colorName}
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{colorName}</p>
          {color.Code && <p className="text-xs text-gray-500">Code: {color.Code}</p>}
        </div>
      </div>
    )
  }

  // Helper to render feature categories
  const renderFeatureCategory = (categoryName, features) => {
    if (!features || !Array.isArray(features) || features.length === 0) return null

    return (
      <div key={categoryName} className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <span className="w-1 h-4 bg-blue-500 rounded"></span>
          {categoryName}
        </h4>
        <ul className="space-y-1.5">
          {features.map((feature, idx) => (
            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-blue-500 mt-1.5">•</span>
              <span className="flex-1">{String(feature).replace(/undefined/g, '').trim()}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // Helper to check if object/array has meaningful data
  const hasData = (data) => {
    if (!data) return false
    if (typeof data === 'string') return data.trim() !== '' && !data.includes('undefined')
    if (Array.isArray(data)) return data.length > 0
    if (typeof data === 'object') {
      const entries = Object.entries(data)
      if (entries.length === 0) return false
      return entries.some(([key, value]) => {
        if (value === null || value === undefined || value === '') return false
        if (typeof value === 'string') return value.trim() !== '' && !value.includes('undefined')
        if (Array.isArray(value)) return value.length > 0
        if (typeof value === 'object') return hasData(value)
        return true
      })
    }
    return true
  }

  // Helper to render data field with N/A fallback
  const renderField = (label, value) => {
    const displayValue = renderValue(value)
    if (!displayValue || displayValue === 'N/A') return null
    return (
      <div>
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{displayValue}</p>
      </div>
    )
  }

  return (
    <>
      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 2cm;
            margin-bottom: 1.5cm;
          }
          
          @page:first {
            margin: 2.5cm;
            margin-bottom: 1.5cm;
          }
          
          /* Remove all browser default headers and footers */
          @page {
            marks: none;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .no-print {
            display: none !important;
          }
          
          .print-break {
            page-break-after: always;
          }
          
          .print-avoid-break {
            page-break-inside: avoid;
          }
          
          .print-header {
            display: none !important;
          }
          
          @page:first {
            .print-header {
              display: none !important;
            }
          }
          
          .print-footer {
            display: block !important;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid #e5e7eb;
            padding: 10px 0;
            font-size: 10px;
            color: #6b7280;
            text-align: center;
          }
          
          /* Hide footer on first page */
          @page:first {
            .print-footer {
              display: none !important;
            }
          }
          
          main {
            margin-top: 0;
            margin-bottom: 50px;
          }
          
          .first-page-design {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            page-break-after: always;
          }
          
          .first-page-only {
            display: block !important;
          }
          
          /* Ensure first page content is centered vertically */
          @page:first {
            margin: 2.5cm;
          }
          
          /* Hide print header and footer on first page */
          @page:first {
            @top-center {
              content: none;
            }
            @bottom-center {
              content: none;
            }
          }
          
          .bg-gradient-to-br {
            background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%) !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .shadow-2xl, .shadow-sm, .shadow-lg {
            box-shadow: none !important;
          }
          
          a {
            color: #1e40af !important;
            text-decoration: none !important;
          }
          
          /* Hide URLs and links in print */
          a[href]:after {
            content: none !important;
          }
          
          a[href^="http"]:after,
          a[href^="//"]:after {
            content: none !important;
          }
          
          /* Hide browser default URL printing in page margins */
          @page {
            @bottom-right {
              content: "" !important;
            }
            @bottom-left {
              content: "" !important;
            }
            @top-right {
              content: "" !important;
            }
            @top-left {
              content: "" !important;
            }
            @bottom-center {
              content: "" !important;
            }
            @top-center {
              content: "" !important;
            }
          }
          
          /* Additional rules to hide URL - reduce bottom margin */
          @page {
            margin-bottom: 0.3cm !important;
          }
          
          @page:first {
            margin-bottom: 0.3cm !important;
          }
          
          /* Hide any content that might be the URL */
          body::before,
          body::after {
            display: none !important;
            content: none !important;
          }
          
          html::before,
          html::after {
            display: none !important;
            content: none !important;
          }
          
          h1, h2, h3, h4 {
            color: #111827 !important;
            page-break-after: avoid;
          }
          
          table {
            page-break-inside: avoid;
          }
          
          img {
            page-break-inside: avoid;
            max-width: 100% !important;
          }
          
          .text-white {
            color: #ffffff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          /* Professional spacing for print */
          .print\:space-y-4 > * + * {
            margin-top: 1rem;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="no-print">
          <A_Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 overflow-hidden">
          {/* Print Header - Modern First Page Design */}
          <div className="print-header hidden">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex flex-col items-center text-center py-4">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <img 
                    src={logo} 
                    alt="Car Vistor's Logo" 
                    className="h-16 w-16 object-contain"
                  />
                  <div className="text-left">
                    <h1 className="text-2xl font-bold text-gray-900">Car Vistor's</h1>
                    <p className="text-sm text-gray-600">Professional VIN Solutions</p>
                  </div>
                </div>
                <div className="w-full border-t-2 border-blue-600 my-3"></div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Identification Report</h2>
                <p className="text-base text-gray-600">Professional VIN Decode Analysis</p>
              </div>
            </div>
          </div>

          {/* Print Footer */}
          <div className="print-footer hidden">
            <div className="max-w-7xl mx-auto px-6">
              <p>This report is generated for informational purposes. All data is based on VIN decode information.</p>
              <p className="mt-1">Page <span className="page-number"></span> | Generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Top Header */}
          <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 h-14 sm:h-20 lg:h-24 no-print">
          <div className="flex items-center justify-between p-3 sm:p-5 lg:p-6 h-full">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors no-print"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">Report Details</h1>
                <p className="hidden sm:block text-sm sm:text-base text-gray-600">{vehicleName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  // Show instruction to disable headers/footers
                  const shouldPrint = window.confirm(
                    'To remove the URL from the PDF:\n\n' +
                    '1. Click OK to open print dialog\n' +
                    '2. In the print dialog, find "More settings" or "Options"\n' +
                    '3. UNCHECK "Headers and footers" or "Background graphics"\n' +
                    '4. Then click Print/Save\n\n' +
                    'This will remove the URL from the bottom of the page.'
                  )
                  if (shouldPrint) {
                    window.print()
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold flex items-center gap-2 print:hidden"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print / Save PDF
              </button>
              <button
                onClick={() => navigate('/admin/reports')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-semibold print:hidden"
              >
                Back to Reports
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="p-3 sm:p-6 lg:p-8 print:p-0">
          <div>
          {/* Hero Section - Vehicle Overview - Modern First Page Design */}
          <div className="bg-white border-b border-gray-200 p-6 mb-6 print:border-0 print:p-0 print:mb-0 print:first-page-design print:min-h-screen print:flex print:items-center print:justify-center">
            {/* Modern First Page Design - Print Only */}
            <div className="hidden print:block print:w-full print:max-w-4xl print:mx-auto print:px-8 print:py-12 print:text-center">
              {/* Logo and Company Header */}
              <div className="print:flex print:flex-col print:items-center print:mb-12">
                <img 
                  src={logo} 
                  alt="Car Vistor's Logo" 
                  className="h-24 w-24 object-contain mb-6"
                />
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Car Vistor's</h1>
                <p className="text-xl text-gray-600 mb-8">Professional VIN Solutions</p>
                <div className="w-40 h-1.5 bg-blue-600 mx-auto mb-10"></div>
              </div>
              
              {/* Report Title */}
              <div className="print:mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">Vehicle Identification Report</h2>
                <p className="text-lg text-gray-600">Professional VIN Decode Analysis</p>
              </div>
              
              {/* Vehicle Information - Centered Card Design */}
              <div className="print:bg-gray-50 print:border-2 print:border-gray-300 print:rounded-lg print:p-10 print:mb-10 print:shadow-lg">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{vehicleName}</h3>
                {trimKey && trimKey !== vehicleName && (
                  <p className="text-xl text-gray-600 mb-8">{trimKey}</p>
                )}
                
                <div className="print:grid print:grid-cols-2 print:gap-6 print:max-w-2xl print:mx-auto print:mt-8">
                  <div className="print:text-center print:py-4 print:border-b print:border-gray-300">
                    <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">VIN Number</p>
                    <p className="text-lg font-bold text-gray-900">{report.vin}</p>
                  </div>
                  {basicInfo?.year && (
                    <div className="print:text-center print:py-4 print:border-b print:border-gray-300">
                      <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Year</p>
                      <p className="text-lg font-bold text-gray-900">{basicInfo.year}</p>
                    </div>
                  )}
                  {basicInfo?.make && (
                    <div className="print:text-center print:py-4 print:border-b print:border-gray-300">
                      <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Make</p>
                      <p className="text-lg font-bold text-gray-900">{basicInfo.make}</p>
                    </div>
                  )}
                  {basicInfo?.model && (
                    <div className="print:text-center print:py-4 print:border-b print:border-gray-300">
                      <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Model</p>
                      <p className="text-lg font-bold text-gray-900">{basicInfo.model}</p>
                    </div>
                  )}
                </div>
                
                <div className="print:mt-8 print:pt-6 print:border-t print:border-gray-300">
                  <p className="text-sm text-gray-600">Report Generated: {formatDate(report?.decodedDate || new Date())}</p>
                </div>
              </div>
              
              {/* Decorative Element */}
              <div className="print:flex print:justify-center print:mt-8">
                <div className="print:w-32 print:h-1 print:bg-blue-600"></div>
              </div>
            </div>
            
            {/* Regular View (Non-Print) */}
            <div className="print:hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{vehicleName}</h2>
                  {trimKey && trimKey !== vehicleName && (
                    <p className="text-gray-600 text-sm">{trimKey}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">VIN</p>
                    <p className="font-semibold text-gray-900">{report.vin}</p>
                  </div>
                  {basicInfo?.year && (
                    <div>
                      <p className="text-gray-500">Year</p>
                      <p className="font-semibold text-gray-900">{basicInfo.year}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Cards - Hide on first page print */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 print:grid-cols-3 print:gap-3 print-avoid-break print:page-break-before-always">
            <div className="bg-white border border-gray-200 p-4 rounded-lg print:border print:p-3 print:avoid-break print:hidden">
              <p className="text-xs text-gray-500 mb-1">Decoded By</p>
              <p className="text-sm font-semibold text-gray-900">{report.decodedBy || 'N/A'}</p>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg print:border print:p-3 print-avoid-break">
              <p className="text-xs text-gray-500 mb-1">Date</p>
              <p className="text-sm font-semibold text-gray-900">{formatDate(report.decodedDate)}</p>
            </div>
            {basicInfo?.make && (
              <div className="bg-white border border-gray-200 p-4 rounded-lg print:border print:p-3 print-avoid-break">
                <p className="text-xs text-gray-500 mb-1">Make</p>
                <p className="text-sm font-semibold text-gray-900">{basicInfo.make}</p>
              </div>
            )}
            {basicInfo?.body_type && (
              <div className="bg-white border border-gray-200 p-4 rounded-lg print:border print:p-3 print-avoid-break">
                <p className="text-xs text-gray-500 mb-1">Body Type</p>
                <p className="text-sm font-semibold text-gray-900">{basicInfo.body_type}</p>
              </div>
            )}
          </div>
        

          {/* Report Data Sections */}
          <div className="space-y-6 print:space-y-4">
        {/* Basic Vehicle Information */}
        {basicInfo && hasData(basicInfo) && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {basicInfo.vehicle_name && (
                <div className="sm:col-span-2 lg:col-span-3">
                  <p className="text-xs text-gray-500 mb-1">Vehicle Name</p>
                  <p className="text-lg font-semibold text-gray-900">{basicInfo.vehicle_name}</p>
                </div>
              )}
              {basicInfo.make && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Make</p>
                  <p className="text-sm font-semibold text-gray-900">{basicInfo.make}</p>
                </div>
              )}
              {basicInfo.model && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Model</p>
                  <p className="text-sm font-semibold text-gray-900">{basicInfo.model}</p>
                </div>
              )}
              {basicInfo.year && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Year</p>
                  <p className="text-sm font-semibold text-gray-900">{basicInfo.year}</p>
                </div>
              )}
              {basicInfo.model_group && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Model Group</p>
                  <p className="text-sm font-semibold text-gray-900">{basicInfo.model_group}</p>
                </div>
              )}
              {basicInfo.body_type && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Body Type</p>
                  <p className="text-sm font-semibold text-gray-900">{basicInfo.body_type}</p>
                </div>
              )}
              {basicInfo.doors && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Doors</p>
                  <p className="text-sm font-semibold text-gray-900">{basicInfo.doors}</p>
                </div>
              )}
              {basicInfo.trims && Array.isArray(basicInfo.trims) && basicInfo.trims.length > 0 && (
                <div className="sm:col-span-2 lg:col-span-3">
                  <p className="text-xs text-gray-500 mb-2">Available Trims</p>
                  <div className="flex flex-wrap gap-2">
                    {basicInfo.trims.map((trim, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                        {trim}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {basicInfo.trim && typeof basicInfo.trim === 'object' && (
                <div className="sm:col-span-2 lg:col-span-3">
                  <p className="text-xs text-gray-500 mb-2">Trim Details</p>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {basicInfo.trim.Style && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Style:</span>
                        <span className="text-sm font-medium text-gray-900">{basicInfo.trim.Style}</span>
                      </div>
                    )}
                    {basicInfo.trim.Trim && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Trim:</span>
                        <span className="text-sm font-medium text-gray-900">{basicInfo.trim.Trim}</span>
                      </div>
                    )}
                    {basicInfo.trim['MSRP / Invoice'] && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">MSRP / Invoice:</span>
                        <span className="text-sm font-medium text-gray-900">{basicInfo.trim['MSRP / Invoice']}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Market Value / Pricing */}
        {nestedData?.market_value && hasData(nestedData.market_value) && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Market Value</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {nestedData.market_value.msrp && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">MSRP</p>
                  <p className="text-xl font-bold text-gray-900">{nestedData.market_value.msrp}</p>
                </div>
              )}
              {nestedData.market_value.invoice_price && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Invoice Price</p>
                  <p className="text-xl font-bold text-gray-900">{nestedData.market_value.invoice_price}</p>
                </div>
              )}
              {nestedData.market_value.destination_charge && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Destination Charge</p>
                  <p className="text-xl font-bold text-gray-900">{nestedData.market_value.destination_charge}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Engine Information */}
        {nestedData?.engine && hasData(nestedData.engine) && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Engine Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(nestedData.engine)
                .filter(([key, value]) => hasData(value))
                .map(([key, value]) => (
                  <div key={key} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500 mb-1">{formatKey(key)}</p>
                    <p className="text-sm font-semibold text-gray-900">{renderValue(value)}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Transmission & Drivetrain */}
        {((nestedData?.transmission && hasData(nestedData.transmission)) || (nestedData?.drivetrain && hasData(nestedData.drivetrain))) && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Transmission & Drivetrain</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {nestedData.transmission && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Transmission</h4>
                  <div className="space-y-2">
                    {Object.entries(nestedData.transmission)
                      .filter(([key, value]) => hasData(value))
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="text-sm text-gray-600">{formatKey(key)}</span>
                          <span className="text-sm font-medium text-gray-900">{renderValue(value)}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {nestedData.drivetrain && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Drivetrain</h4>
                  <div className="space-y-2">
                    {Object.entries(nestedData.drivetrain)
                      .filter(([key, value]) => hasData(value))
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="text-sm text-gray-600">{formatKey(key)}</span>
                          <span className="text-sm font-medium text-gray-900">{renderValue(value)}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Fuel Economy */}
        {nestedData?.fuel && hasData(nestedData.fuel) && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Fuel Economy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {nestedData.fuel.fuel_economy && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Combined</p>
                  <p className="text-xl font-bold text-gray-900">{nestedData.fuel.fuel_economy}</p>
                </div>
              )}
              {nestedData.fuel.city_mileage && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">City</p>
                  <p className="text-xl font-bold text-gray-900">{nestedData.fuel.city_mileage}</p>
                </div>
              )}
              {nestedData.fuel.highway_mileage && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Highway</p>
                  <p className="text-xl font-bold text-gray-900">{nestedData.fuel.highway_mileage}</p>
                </div>
              )}
              {nestedData.fuel.fuel_type && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Fuel Type</p>
                  <p className="text-xl font-bold text-gray-900">{nestedData.fuel.fuel_type}</p>
                </div>
              )}
              {nestedData.fuel.fuel_capacity && (
                <div className="sm:col-span-2 lg:col-span-4">
                  <p className="text-xs text-gray-500 mb-1">Fuel Capacity</p>
                  <p className="text-sm font-semibold text-gray-900">{nestedData.fuel.fuel_capacity}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dimensions */}
        {nestedData?.dimensions && hasData(nestedData.dimensions) && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Dimensions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(nestedData.dimensions)
                .filter(([key, value]) => hasData(value))
                .map(([key, value]) => (
                  <div key={key} className="text-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">{formatKey(key)}</p>
                    <p className="text-sm font-semibold text-gray-900">{renderValue(value)}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {nestedData?.colors && hasData(nestedData.colors) && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Available Colors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nestedData.colors.exterior && Array.isArray(nestedData.colors.exterior) && nestedData.colors.exterior.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Exterior Colors</h4>
                  <div className="space-y-2">
                    {nestedData.colors.exterior.map(renderColorSwatch)}
                  </div>
                </div>
              )}
              {nestedData.colors.interior && Array.isArray(nestedData.colors.interior) && nestedData.colors.interior.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Interior Colors</h4>
                  <div className="space-y-2">
                    {nestedData.colors.interior.map(renderColorSwatch)}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features */}
        {nestedData?.feature && hasData(nestedData.feature) && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Features & Equipment</h3>
            <div className="space-y-6">
              {nestedData.feature.mechanical_and_powertrain && renderFeatureCategory('Mechanical & Powertrain', nestedData.feature.mechanical_and_powertrain)}
              {nestedData.feature.safety && renderFeatureCategory('Safety', nestedData.feature.safety)}
              {nestedData.feature.interior && renderFeatureCategory('Interior', nestedData.feature.interior)}
              {nestedData.feature.exterior && renderFeatureCategory('Exterior', nestedData.feature.exterior)}
            </div>
          </div>
        )}

        {/* Wheels & Tires */}
        {nestedData?.wheels_and_tires && hasData(nestedData.wheels_and_tires) && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Wheels & Tires</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(nestedData.wheels_and_tires)
                .filter(([key, value]) => hasData(value))
                .map(([key, value]) => (
                  <div key={key} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">{formatKey(key)}</p>
                    <p className="text-sm font-semibold text-gray-900">{renderValue(value)}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Suspension & Braking */}
        {((nestedData?.suspension && hasData(nestedData.suspension)) || (nestedData?.braking && hasData(nestedData.braking))) && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Suspension & Braking</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {nestedData.suspension && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Suspension</h4>
                  <div className="space-y-2">
                    {Object.entries(nestedData.suspension)
                      .filter(([key, value]) => value !== null && value !== undefined && value !== '' && !String(value).includes('undefined'))
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="text-sm text-gray-600">{formatKey(key)}</span>
                          <span className="text-sm font-medium text-gray-900">{renderValue(value)}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {nestedData.braking && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Braking</h4>
                  <div className="space-y-2">
                    {Object.entries(nestedData.braking)
                      .filter(([key, value]) => value !== null && value !== undefined && value !== '' && !String(value).includes('undefined'))
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="text-sm text-gray-600">{formatKey(key)}</span>
                          <span className="text-sm font-medium text-gray-900">{renderValue(value)}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Manufacturer Info */}
        {nestedData?.manufacturer && hasData(nestedData.manufacturer) && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Manufacturer Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(nestedData.manufacturer)
                .filter(([key, value]) => hasData(value))
                .map(([key, value]) => (
                  <div key={key} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">{formatKey(key)}</p>
                    <p className="text-sm font-semibold text-gray-900">{renderValue(value)}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Weight & Seating */}
        {((nestedData?.weight && hasData(nestedData.weight)) || (nestedData?.seating && hasData(nestedData.seating))) && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Weight & Seating</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nestedData.weight && Object.entries(nestedData.weight)
                .filter(([key, value]) => hasData(value))
                .map(([key, value]) => (
                  <div key={key} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">{formatKey(key)}</p>
                    <p className="text-sm font-semibold text-gray-900">{renderValue(value)}</p>
                  </div>
                ))}
              {nestedData.seating && Object.entries(nestedData.seating)
                .filter(([key, value]) => hasData(value))
                .map(([key, value]) => (
                  <div key={key} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">{formatKey(key)}</p>
                    <p className="text-sm font-semibold text-gray-900">{renderValue(value)}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Intro Section */}
        {nestedData?.intro && hasData(nestedData.intro) && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 print:border print:p-4 print-avoid-break print:mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Introduction</h3>
            <div className="space-y-2">
              {Object.entries(nestedData.intro)
                .filter(([key, value]) => hasData(value))
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">{formatKey(key)}</span>
                    <span className="text-sm font-medium text-gray-900">{renderValue(value)}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Render any other sections */}
        {Object.entries(nestedData)
          .filter(([key]) =>
            !['basic', 'engine', 'transmission', 'drivetrain', 'fuel', 'dimensions',
              'colors', 'feature', 'wheels_and_tires', 'suspension', 'braking',
              'manufacturer', 'weight', 'seating', 'intro', 'market_value'].includes(key)
          )
          .filter(([key, value]) => hasData(value))
          .map(([key, value]) => {
            if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
              return renderSection(formatKey(key), value)
            }
            return null
          })
          .filter(Boolean)
        }
          </div>
        </div>
      </main>
      </div>
    </div>
    </>
  )
}

export default ReportDetail

