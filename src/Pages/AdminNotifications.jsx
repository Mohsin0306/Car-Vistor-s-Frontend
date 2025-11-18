import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import A_Sidebar from '../Dashboards/Admin/A_Sidebar'
import { notificationAPI } from '../Services/APIs'

const AdminNotifications = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin')
    const token = localStorage.getItem('token')
    if (!token || !storedAdmin) {
      navigate('/login')
      return
    }
    setAdmin(JSON.parse(storedAdmin))
  }, [navigate])

  useEffect(() => {
    const loadNotifications = async () => {
      if (!admin) return
      setLoading(true)
      setError('')
      try {
        const response = await notificationAPI.getByUser({
          userId: admin.id || admin._id,
          email: admin.email,
          type: 'admin'
        })
        setNotifications(response.notifications || [])
      } catch (err) {
        console.error('Admin notifications fetch error:', err)
        setError('Unable to load notifications right now.')
        setNotifications([])
      } finally {
        setLoading(false)
      }
    }

    loadNotifications()
  }, [admin])

  const markAsRead = async (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification._id === id
          ? { ...notification, read: true }
          : notification
      )
    )
    try {
      await notificationAPI.markAsRead(id)
    } catch (error) {
      console.error('Admin mark notification error:', error)
    }
  }

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })))
    try {
      await notificationAPI.markAllAsRead({
        userId: admin?.id || admin?._id,
        email: admin?.email,
        type: 'admin'
      })
    } catch (error) {
      console.error('Admin mark all notifications error:', error)
    }
  }

  const handleNotificationClick = (notification) => {
    markAsRead(notification._id)
    if (notification.link) {
      navigate(notification.link)
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="no-print">
        <A_Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 lg:ml-64 xl:ml-72">
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 h-16 sm:h-20 flex items-center px-4 sm:px-6">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Admin Notifications
              </h1>
              <p className="text-sm text-gray-600">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All tasks are up to date'}
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Mark All Read
            </button>
          )}
        </div>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-red-500 border-t-transparent"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                <div className="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <p className="text-gray-500">{error || 'No notifications for now.'}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 transition-all duration-200 hover:shadow-xl cursor-pointer ${
                      !notification.read ? 'border-l-4 border-l-red-500 bg-red-50/40' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.type === 'success'
                          ? 'bg-green-100 text-green-600'
                          : notification.type === 'warning'
                          ? 'bg-yellow-100 text-yellow-600'
                          : notification.type === 'error'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className={`text-base sm:text-lg font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{new Date(notification.createdAt).toLocaleString()}</span>
                            {!notification.read && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                          </div>
                        </div>
                        <p className={`text-sm sm:text-base mt-1 ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminNotifications

