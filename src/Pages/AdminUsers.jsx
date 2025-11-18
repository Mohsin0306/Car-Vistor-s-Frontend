import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import A_Sidebar from '../Dashboards/Admin/A_Sidebar'
import { userAPI } from '../Services/APIs'

const AdminUsers = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [error, setError] = useState('')
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
    fetchUsers()
  }, [navigate])

  const fetchUsers = async (isSearch = false, currentSearch = searchTerm) => {
    try {
      // Only show full-page loader on initial load, not during search
      if (!isSearch && isInitialLoad) {
        setLoading(true)
      }
      setError('')
      const response = await userAPI.getAll({ 
        page: 1, 
        limit: 100,
        search: currentSearch || undefined
      })
      
      if (response.success) {
        setUsers(response.data.users || [])
      } else {
        setError(response.message || 'Failed to fetch users')
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch users')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
      setIsInitialLoad(false)
    }
  }

  useEffect(() => {
    if (admin && !isInitialLoad) {
      const delayDebounceFn = setTimeout(() => {
        fetchUsers(true, searchTerm) // Pass current search term
      }, 500)
      return () => clearTimeout(delayDebounceFn)
    }
  }, [searchTerm, admin, isInitialLoad])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
                <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">Users</h1>
                <p className="hidden sm:block text-sm sm:text-base text-gray-600">Manage all registered users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="p-2 sm:p-6 lg:p-8">
          {/* Stats Badges - Compact */}
          <div className="flex items-center gap-1.5 lg:gap-3 mb-2 overflow-x-auto pb-1 -mx-2 sm:-mx-6 lg:-mx-8 px-2 sm:px-6 lg:px-8 ml-0 lg:ml-[5px]">
            <div className="flex items-center gap-1 lg:gap-2 px-2 py-1 lg:px-4 lg:py-1 bg-blue-50 border border-blue-200 rounded-full shrink-0">
              <svg className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-[10px] lg:text-sm font-semibold text-blue-700">Total {users.length}</span>
            </div>

            <div className="flex items-center gap-1 lg:gap-2 px-2 py-1 lg:px-4 lg:py-1 bg-green-50 border border-green-200 rounded-full shrink-0">
              <svg className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[10px] lg:text-sm font-semibold text-green-700">Active {users.length}</span>
            </div>

            <div className="flex items-center gap-1 lg:gap-2 px-2 py-1 lg:px-4 lg:py-1 bg-purple-50 border border-purple-200 rounded-full shrink-0">
              <svg className="w-3 h-3 lg:w-4 lg:h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[10px] lg:text-sm font-semibold text-purple-700">
                New {users.filter(u => {
                  const userDate = new Date(u.createdAt)
                  const monthStart = new Date()
                  monthStart.setDate(1)
                  monthStart.setHours(0, 0, 0, 0)
                  return userDate >= monthStart
                }).length}
              </span>
            </div>
          </div>

          {/* Search Bar - Mobile Only */}
          <div className="mb-3 lg:hidden px-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white/95 border border-transparent focus:border-transparent focus:ring-0 focus-visible:ring-2 focus-visible:ring-blue-300 rounded-full shadow-md shadow-blue-100 hover:shadow-blue-200 transition-all outline-none"
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
                    placeholder="Search name, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-5 py-3 text-sm tracking-wide text-gray-700 bg-white/95 border border-transparent hover:border-transparent rounded-full shadow-sm shadow-blue-100 focus:bg-white focus:border-transparent focus:ring-0 focus-visible:ring-2 focus-visible:ring-blue-300 focus:shadow-md focus:shadow-blue-200 transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
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

          {/* Users List */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-900">All Users ({users.length})</h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs font-semibold text-blue-600">Verified</span>
                </div>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden px-2 sm:px-4 py-3 space-y-2 bg-gradient-to-b from-white via-white/70 to-blue-50/40">
              {users.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-blue-200 bg-white/70 backdrop-blur-sm p-6 text-center shadow-inner">
                  <svg className="w-6 h-6 mx-auto mb-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <p className="text-sm font-medium text-blue-600">No users found</p>
                  <p className="text-xs text-gray-500 mt-1">Try adjusting your search terms.</p>
                </div>
              ) : (
                users.map((user) => (
                  <div
                    key={user._id}
                    className="rounded-xl border border-gray-200/60 bg-white hover:bg-gray-50/50 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                  >
                    <div className="relative px-3 pt-3 pb-2.5">
                      <div className="flex items-start gap-2.5">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 ring-1 ring-blue-100 group-hover:ring-blue-200 transition-all">
                            <span className="text-white font-bold text-xs">
                              {(user.firstName?.[0] || 'U') + (user.lastName?.[0] || '')}
                            </span>
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1 break-all">
                                <svg className="w-3 h-3 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                                </svg>
                                <span className="truncate">{user.email}</span>
                              </p>
                            </div>
                            <span className="px-1.5 py-0.5 text-[9px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full flex-shrink-0">
                              Active
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-gray-500">
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatDate(user.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-4 sm:px-6 py-8 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="hover:bg-blue-50/50 transition-colors duration-150 border-b border-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md ring-2 ring-blue-50">
                                <span className="text-white font-bold text-sm">
                                  {(user.firstName?.[0] || 'U') + (user.lastName?.[0] || '')}
                                </span>
                              </div>
                              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-sm font-semibold text-gray-900">
                                  {user.firstName} {user.lastName}
                                </div>
                                <span className="px-2 py-0.5 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full">
                                  Active
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">ID: #{user._id.slice(-6)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                            </svg>
                            <div className="text-sm font-medium text-gray-900">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatDate(user.createdAt)}</span>
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

export default AdminUsers

