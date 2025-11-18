import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { notificationAPI } from '../Services/APIs'

const Notifications = () => {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (!token || !storedUser) {
      navigate('/login')
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [navigate])

  useEffect(() => {
    const loadNotifications = async () => {
      if (!user) return
      setLoading(true)
      setError('')
      try {
        const response = await notificationAPI.getByUser({
          userId: user._id,
          email: user.email,
          type: 'user'
        })
        setNotifications(response.notifications || [])
      } catch (err) {
        console.error('Notifications fetch error:', err)
        setError('Unable to load notifications right now.')
        setNotifications([])
      } finally {
        setLoading(false)
      }
    }

    loadNotifications()
  }, [user])

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
      console.error('Mark notification read error:', error)
    }
  }

  const markAllAsRead = async () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
    try {
      await notificationAPI.markAllAsRead({
        userId: user?._id,
        email: user?.email,
        type: 'user'
      })
    } catch (error) {
      console.error('Mark all notifications read error:', error)
    }
  }

  const handleNotificationClick = (notification) => {
    markAsRead(notification._id)
    if (notification.link) {
      navigate(notification.link)
    }
  }

  const formatTimeAgo = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diff = (now - date) / 1000

    if (diff < 60) return 'Just now'
    if (diff < 3600) {
      const minutes = Math.floor(diff / 60)
      return `${minutes} min${minutes !== 1 ? 's' : ''} ago`
    }
    if (diff < 86400) {
      const hours = Math.floor(diff / 3600)
      return `${hours} hr${hours !== 1 ? 's' : ''} ago`
    }
    const days = Math.floor(diff / 86400)
    if (days < 7) {
      return `${days} day${days !== 1 ? 's' : ''} ago`
    }
    return date.toLocaleDateString()
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      case 'info':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      case 'warning':
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        )
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 h-20 sm:h-24">
        <div className="flex items-center justify-between p-4 sm:p-6 h-full">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>
                Notifications
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Notifications Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">{error || "You're all caught up! Check back later for updates."}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`bg-white rounded-xl border border-gray-200 p-4 sm:p-6 transition-all duration-200 hover:shadow-lg cursor-pointer ${
                    !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start space-x-4">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-sm sm:text-base font-semibold ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{formatTimeAgo(notification.createdAt)}</span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className={`text-sm ${
                        !notification.read ? 'text-gray-700' : 'text-gray-600'
                      }`}>
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
  )
}

export default Notifications
