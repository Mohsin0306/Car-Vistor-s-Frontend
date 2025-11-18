import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import A_Sidebar from './A_Sidebar'
import { requestAPI, notificationAPI } from '../../Services/APIs'

const Dashboard = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [vinRequests, setVinRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [error, setError] = useState('')
  const [notificationCount, setNotificationCount] = useState(0)

  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin')
    const token = localStorage.getItem('token')
    const userType = localStorage.getItem('userType')

    if (!token || userType !== 'admin' || !storedAdmin) {
      navigate('/login')
      return
    }

      setAdmin(JSON.parse(storedAdmin))
    fetchVinRequests()
  }, [navigate])

  const fetchVinRequests = async (isSearch = false, currentStatus = filterStatus, currentSearch = searchTerm) => {
    try {
      // Only show full-page loader on initial load, not during search/filter
      if (!isSearch && isInitialLoad) {
        setLoading(true)
      }
      setError('')
      const response = await requestAPI.getAll({ 
        page: 1, 
        limit: 100, 
        status: currentStatus === 'all' ? undefined : currentStatus,
        search: currentSearch || undefined
      })
      
      if (response.success) {
        setVinRequests(response.data.requests || [])
      } else {
        setError(response.message || 'Failed to fetch requests')
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch requests')
      console.error('Error fetching VIN requests:', err)
    } finally {
      setLoading(false)
      setIsInitialLoad(false)
    }
  }

  // Search and filter changes
  useEffect(() => {
    if (admin && !isInitialLoad) {
      const delayDebounceFn = setTimeout(() => {
        fetchVinRequests(true, filterStatus, searchTerm) // Pass current values
      }, 500)
      return () => clearTimeout(delayDebounceFn)
    }
  }, [filterStatus, searchTerm, admin, isInitialLoad])

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

  // Remove priority color function since priority field was removed

  // Remove client-side filtering since backend handles it

  const stats = {
    total: vinRequests.length,
    pending: vinRequests.filter(r => r.status === 'pending').length,
    processing: vinRequests.filter(r => r.status === 'processing').length,
    completed: vinRequests.filter(r => r.status === 'completed').length,
    totalRevenue: vinRequests.filter(r => r.status === 'completed').length * 35
  }

  const refreshNotificationCount = useCallback(async () => {
    if (!admin) return
    try {
      const response = await notificationAPI.getByUser({
        userId: admin.id || admin._id,
        email: admin.email,
        type: 'admin'
      })
      const unread = (response.notifications || []).filter((n) => !n.read).length
      setNotificationCount(unread)
    } catch (err) {
      console.error('Admin notification count error:', err)
      setNotificationCount(0)
    }
  }, [admin])

  useEffect(() => {
    if (!admin) return
    refreshNotificationCount()
    const interval = setInterval(refreshNotificationCount, 60000)
    return () => clearInterval(interval)
  }, [admin, refreshNotificationCount])

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const response = await requestAPI.updateStatus({ requestId, status: newStatus })
      
      if (response.success) {
        // Update the local state
    setVinRequests(prev => 
      prev.map(request => 
            request._id === requestId 
          ? { ...request, status: newStatus }
          : request
      )
    )
        refreshNotificationCount()
      } else {
        setError(response.message || 'Failed to update status')
      }
    } catch (err) {
      setError(err.message || 'Failed to update status')
      console.error('Error updating status:', err)
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
                <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>Admin Dashboard</h1>
                <p className="hidden sm:block text-sm sm:text-base text-gray-600">Manage VIN requests and users</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Revenue - Mobile Only */}
              <div className="lg:hidden flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-sm font-bold text-green-600">${stats.totalRevenue}</p>
              </div>
            </div>
            
              {/* Notification Icon */}
              <div className="relative">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => navigate('/admin/notifications')}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                {notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[1rem] h-4 sm:min-w-[1.2rem] sm:h-5 bg-red-500 rounded-full flex items-center justify-center px-1 shadow-lg">
                    <span className="text-[10px] sm:text-xs text-white font-bold">
                      {notificationCount}
                    </span>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="p-0 sm:p-0 lg:p-0">
          {/* Lexx the space above status badges */}
          <div className="h-1" />
          {/* Stats Badges - Compact */}
          <div className="flex items-center gap-1.5 lg:gap-3 mb-2 overflow-x-auto pb-1 -mx-2 sm:-mx-6 lg:-mx-8 px-2 sm:px-6 lg:px-8 ml-0 lg:ml-[5px]">
            <div className="flex items-center gap-1 lg:gap-2 px-2 py-1 lg:px-4 lg:py-1 bg-blue-50 border border-blue-200 rounded-full shrink-0">
              <svg className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
              <span className="text-[10px] lg:text-sm font-semibold text-blue-700">Total {stats.total}</span>
            </div>

            <div className="flex items-center gap-1 lg:gap-2 px-2 py-1 lg:px-4 lg:py-1 bg-yellow-50 border border-yellow-200 rounded-full shrink-0">
              <svg className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              <span className="text-[10px] lg:text-sm font-semibold text-yellow-700">Pending {stats.pending}</span>
            </div>

            <div className="flex items-center gap-1 lg:gap-2 px-2 py-1 lg:px-4 lg:py-1 bg-blue-50 border border-blue-200 rounded-full shrink-0">
              <svg className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
              <span className="text-[10px] lg:text-sm font-semibold text-blue-700">Processing {stats.processing}</span>
              </div>
            </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
              </div>
              </div>
            </div>
          )}


           {/* Search Bar - Mobile Only */}
           <div className="mb-4 lg:hidden px-4">
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
               </div>
               <input
                 type="text"
                 placeholder="Search VIN, email..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/95 border border-transparent focus:border-transparent focus:ring-0 focus-visible:ring-2 focus-visible:ring-blue-300 rounded-full shadow-md shadow-blue-100 hover:shadow-blue-200 transition-all outline-none"
               />
            </div>
          </div>

           {/* Filters and Search - Desktop */}
           <div className="hidden lg:block mb-6">
             <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-r from-white via-blue-50/60 to-blue-100/60 shadow-lg shadow-blue-100">
               <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none"></div>
               <div className="relative flex items-center gap-5 px-6 py-4">
                 <div className="flex-1 relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                     </svg>
                   </div>
                <input
                  type="text"
                     placeholder="Search VIN, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full pl-12 pr-5 py-3 text-sm tracking-wide text-gray-700 bg-white/95 border border-transparent hover:border-transparent rounded-full shadow-sm shadow-blue-100 focus:bg-white focus:border-transparent focus:ring-0 focus-visible:ring-2 focus-visible:ring-blue-300 focus:shadow-md focus:shadow-blue-200 transition-all outline-none"
                />
              </div>
                 <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                    className="appearance-none pl-12 pr-12 py-3 text-sm font-medium text-gray-700 bg-gradient-to-r from-white via-blue-50/60 to-white border border-transparent hover:border-transparent rounded-full shadow-md shadow-blue-100/80 hover:shadow-blue-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-300 focus:shadow-blue-200 transition-all cursor-pointer backdrop-blur"
                >
                    <option value="all">All Requests</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="h-4 w-4 text-blue-400 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VIN Requests */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">VIN Requests ({vinRequests.length})</h3>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden px-4 py-4 space-y-4 bg-gradient-to-b from-white via-white/70 to-blue-50/40">
              {vinRequests.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-blue-200 bg-white/70 backdrop-blur-sm p-6 text-center shadow-inner">
                  <svg className="w-6 h-6 mx-auto mb-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m9 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-medium text-blue-600">No VIN requests yet</p>
                  <p className="text-xs text-gray-500 mt-1">New requests will appear here instantly.</p>
                </div>
              ) : (
                vinRequests.map((request) => (
                  <div
                    key={request._id}
                    className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-md shadow-blue-100 overflow-hidden"
                  >
                    <div className="relative px-4 pt-4 pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-semibold text-gray-900 tracking-tight break-all">{request.vin}</p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                            </svg>
                            {request.userEmail}
                          </p>
                        </div>
                        <span className={`inline-flex items-center gap-0.5 sm:gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold rounded-full border shrink-0 ${getStatusColor(request.status)}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          <span className="leading-none">{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-600">
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-gray-400">Vehicle</p>
                          <p className="text-sm font-medium text-gray-800">{request.vehicleDetails?.vehicle || 'N/A'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] uppercase tracking-wide text-gray-400">Amount</p>
                          <p className="text-sm font-semibold text-blue-600">${request.paymentAmount}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatDate(request.requestDate)}
                        </div>
                        <div className="flex items-center gap-1 text-blue-500 font-medium">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7m-9 2v7" />
                          </svg>
                          {request.vehicleDetails?.vehicle?.split(' ')[0] || 'Vehicle'}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 border-t border-blue-50 bg-blue-50/40">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2v-6a2 2 0 00-.59-1.42l-4-4-4 4A2 2 0 009 13v6a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs">Actions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {request.status === 'pending' && (
                            <button
                              onClick={() => handleStatusChange(request._id, 'processing')}
                              className="px-3 py-1 text-xs font-semibold text-blue-600 bg-white rounded-full border border-blue-100 shadow-sm"
                            >
                              Process
                            </button>
                          )}
                          {request.status === 'processing' && (
                            <button
                              onClick={() => handleStatusChange(request._id, 'completed')}
                              className="px-3 py-1 text-xs font-semibold text-green-600 bg-white rounded-full border border-green-100 shadow-sm"
                            >
                              Complete
                            </button>
                          )}
                          <button 
                            onClick={() => navigate(`/admin/request/${request._id}`)}
                            className="px-3 py-1 text-xs font-semibold text-gray-600 bg-white rounded-full border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vinRequests.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 sm:px-6 py-8 text-center text-gray-500">
                        No VIN requests found
                      </td>
                    </tr>
                  ) : (
                    vinRequests.map((request) => (
                      <tr key={request._id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{request.vin}</div>
                          <div className="text-sm text-gray-500">ID: #{request._id.slice(-6)}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{request.userEmail}</div>
                          <div className="text-sm text-gray-500">User</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{request.vehicleDetails?.vehicle || 'N/A'}</div>
                        <div className="text-sm text-gray-500">${request.paymentAmount}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(request.status)}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(request.requestDate)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {request.status === 'pending' && (
                            <button
                                onClick={() => handleStatusChange(request._id, 'processing')}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Process
                            </button>
                          )}
                          {request.status === 'processing' && (
                            <button
                                onClick={() => handleStatusChange(request._id, 'completed')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Complete
                            </button>
                          )}
                           <button 
                             onClick={() => navigate(`/admin/request/${request._id}`)}
                             className="text-gray-600 hover:text-gray-900 transition-colors"
                           >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
