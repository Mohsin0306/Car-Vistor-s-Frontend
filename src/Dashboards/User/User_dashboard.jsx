import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { requestAPI, notificationAPI } from '../../Services/APIs'
import BottomNav from './BottomNav'

const UserDashboard = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [recentReports, setRecentReports] = useState([])
  const [lastVehicle, setLastVehicle] = useState('')
  const [vinInput, setVinInput] = useState('')
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [stats, setStats] = useState({
    totalReports: 0,
    thisMonth: 0,
    totalSpent: 0
  })
  const [notificationCount, setNotificationCount] = useState(0)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      navigate('/login')
      return
    }

    setUser(JSON.parse(userData))
    
    // Always fetch latest request for this user; do not rely on shared cache
    const u = JSON.parse(userData)
    requestAPI
      .getByUser({ email: u.email, page: 1, limit: 1 })
      .then((res) => {
        const latest = (res.data?.requests || [])[0]
        if (latest) {
          setRecentReports([
            {
              id: latest._id,
              vin: latest.vin,
              vehicle: latest.vehicleDetails?.vehicle,
              date: new Date(latest.requestDate).toISOString().slice(0,10),
              status: latest.status === 'pending' ? 'Processing' : latest.status,
              price: `$${latest.paymentAmount || 35}`
            }
          ])
          setLastVehicle(latest.vehicleDetails?.vehicle || '')
          setStats({ totalReports: 1, thisMonth: 1, totalSpent: latest.paymentAmount || 35 })
        } else {
          setRecentReports([])
          setLastVehicle('')
          setStats({ totalReports: 0, thisMonth: 0, totalSpent: 0 })
        }
      })
      .catch(() => {
        setRecentReports([])
        setLastVehicle('')
        setStats({ totalReports: 0, thisMonth: 0, totalSpent: 0 })
      })
  }, [navigate])

  const handleNewReport = () => {
    navigate('/')
  }

  const refreshNotificationCount = useCallback(async () => {
    if (!user) return
    try {
      const response = await notificationAPI.getByUser({
        userId: user.id || user._id,
        email: user.email,
        type: 'user'
      })
      const unread = (response.notifications || []).filter((n) => !n.read).length
      setNotificationCount(unread)
    } catch (error) {
      console.error('User notification count error:', error)
      setNotificationCount(0)
    }
  }, [user])

  useEffect(() => {
    if (!user) return
    refreshNotificationCount()
    const interval = setInterval(refreshNotificationCount, 60000)
    return () => clearInterval(interval)
  }, [user, refreshNotificationCount])

  const handleCreateRequest = async (e) => {
    e.preventDefault()
    const vinUpper = (vinInput || '').toUpperCase().trim()
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/
    if (!vinRegex.test(vinUpper)) {
      setCreateError('Invalid VIN. Enter 17 characters (A–Z, 0–9, no I/O/Q).')
      return
    }
    setCreateError('')
    setCreating(true)
    try {
      const res = await requestAPI.create({ vin: vinUpper, userEmail: user.email })
      // Defensive: only show success if backend confirms success
      if (res && res.success !== false) {
        setLastVehicle(res.data.vehicle || '')
        setRecentReports([
          {
            id: res.data.id,
            vin: res.data.vin,
            vehicle: res.data.vehicle,
            date: new Date(res.data.requestDate).toISOString().slice(0,10),
            status: res.data.status === 'pending' ? 'Processing' : res.data.status,
            price: `$${res.data.paymentAmount}`
          }
        ])
        refreshNotificationCount()
      }
    } catch (err) {
      setCreateError(err.message || 'Failed to create request')
    } finally {
      setCreating(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 overflow-hidden">
        {/* Top Header */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 h-20 sm:h-24">
          <div className="flex items-center justify-between p-4 sm:p-6 h-full">
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
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>Dashboard</h1>
                <p className="text-sm sm:text-base text-gray-600">Welcome back, {user.firstName}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <div className="relative">
                <button 
                  onClick={() => navigate('/notifications')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                {notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 bg-red-500 rounded-full flex items-center justify-center px-1 shadow-lg">
                    <span className="text-xs text-white font-bold">{notificationCount}</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleNewReport}
                className="hidden sm:flex bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm">New VIN Report</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8 pb-24">
          {/* If no recent request, show VIN input form */}
          {!lastVehicle && recentReports.length === 0 ? (
            <div className="flex items-center justify-center min-h-[50vh] sm:min-h-[60vh]">
              <div className="w-full max-w-2xl text-center px-4 sm:px-6">
                <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-gray-900 mb-2 sm:mb-3" style={{fontFamily: 'Poppins, sans-serif'}}>Start a VIN Decode</h3>
                <p className="text-gray-600 text-xs sm:text-base mb-6 sm:mb-8">Enter your 17‑character VIN and we’ll create your request instantly.</p>
                {createError && (
                  <div className="inline-flex items-center bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-full text-xs sm:text-sm mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
                    {createError}
                  </div>
                )}
                <form onSubmit={handleCreateRequest} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-center w-full">
                  <label htmlFor="vin" className="sr-only">Vehicle VIN</label>
                  <div className="relative w-full sm:max-w-xl">
                    <input
                      id="vin"
                      type="text"
                      value={vinInput}
                      onChange={(e) => setVinInput(e.target.value.toUpperCase())}
                      maxLength={17}
                      autoComplete="off"
                      spellCheck={false}
                      className="w-full bg-white/80 backdrop-blur pl-12 pr-16 py-3 sm:py-4 rounded-2xl border border-gray-200/70 focus:border-blue-600 focus:ring-8 focus:ring-blue-500/10 outline-none tracking-widest text-sm sm:text-lg uppercase placeholder-gray-400 shadow-lg transition"
                      placeholder="WVWZZZ3CZ8E000001"
                    />
                    <div className="absolute inset-y-0 left-4 flex items-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l2-2m0 0l7-7 7 7M5 11v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    </div>
                    <div className="absolute inset-y-0 right-4 flex items-center">
                      <span className="text-[10px] font-semibold text-gray-400">17 CHAR</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={creating}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-5 sm:px-7 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-60 transition w-full sm:w-auto"
                  >
                    {creating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Creating
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        Decode
                      </>
                    )}
                  </button>
                </form>
                <div className="mt-4 text-xs sm:text-sm text-gray-500">We’ll email you as soon as the report is ready.</div>
              </div>
            </div>
          ) : (
          /* VIN Request Status */
          <div className="flex items-center justify-center min-h-[50vh] sm:min-h-[60vh]">
            <div className="text-center px-4 max-w-md mx-auto">
              {/* Success Icon */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              {/* Main Message */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                VIN Request Received!
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 font-medium text-sm sm:text-base leading-relaxed">
                Your VIN request has been successfully submitted
                {lastVehicle ? (
                  <>
                    {` for `}
                    <span className="font-semibold text-gray-800">{lastVehicle}</span>
                  </>
                ) : null}
                . Please wait for the email to receive your detailed VIN report at <span className="font-semibold text-blue-600">{user.email}</span>.
              </p>
              
              {/* Email Icon */}
              <div className="flex items-center justify-center space-x-2 text-gray-500 mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Check your email for the report</span>
              </div>
              
              {/* Status Card */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-blue-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">Processing</span>
                </div>
                <p className="text-xs text-gray-600">
                  Your VIN report is being generated and will be sent to <span className="font-semibold text-blue-600">{user.email}</span> shortly.
                </p>
              </div>
            </div>
          </div>
          )}
        </main>
      </div>
    </div>
    <BottomNav />
    </>
  )
}

export default UserDashboard
