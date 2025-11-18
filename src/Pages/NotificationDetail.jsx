import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { notificationAPI } from '../Services/APIs'

const NotificationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [notification, setNotification] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        setLoading(true)
        // Get all notifications and find the one with matching ID
        const userType = localStorage.getItem('userType')
        const user = JSON.parse(localStorage.getItem(userType === 'admin' ? 'admin' : 'user') || '{}')
        
        let response
        if (userType === 'admin') {
          response = await notificationAPI.getByUser(null, user.email, 'admin', 1, 100)
        } else {
          response = await notificationAPI.getByUser(user.id, null, 'user', 1, 100)
        }

        if (response.success && response.data.notifications) {
          const found = response.data.notifications.find(n => n._id === id)
          if (found) {
            setNotification(found)
            // Mark as read if not already read
            if (!found.read) {
              try {
                await notificationAPI.markAsRead(id)
              } catch (err) {
                console.error('Error marking notification as read:', err)
              }
            }
          } else {
            setError('Notification not found')
          }
        } else {
          setError('Failed to load notification')
        }
      } catch (err) {
        console.error('Error fetching notification:', err)
        setError('Failed to load notification')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchNotification()
    }
  }, [id])

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgba(37,150,190,1)] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notification...</p>
        </div>
      </div>
    )
  }

  if (error || !notification) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The notification you are looking for does not exist.'}</p>
          <button
            onClick={() => {
              const userType = localStorage.getItem('userType')
              navigate(userType === 'admin' ? '/admin/notifications' : '/notifications')
            }}
            className="bg-[rgba(37,150,190,1)] hover:bg-[rgba(37,150,190,0.9)] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Back to Notifications
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => {
              const userType = localStorage.getItem('userType')
              navigate(userType === 'admin' ? '/admin/notifications' : '/notifications')
            }}
            className="flex items-center text-gray-600 hover:text-[rgba(37,150,190,1)] transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Notifications</span>
          </button>
        </div>

        {/* Notification Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Header Section */}
          <div className={`px-6 py-5 sm:px-8 sm:py-6 border-b border-gray-200 ${getNotificationColor(notification.type)}`}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold mb-2 break-words">{notification.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="font-medium">Type: {notification.type}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-600">{formatDate(notification.createdAt)}</span>
                  {notification.read && (
                    <>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-600">Read</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="prose prose-lg max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Message</h3>
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {notification.message}
              </div>
            </div>

            {/* Metadata Section */}
            {notification.metadata && Object.keys(notification.metadata).length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(notification.metadata).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-gray-500 capitalize mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </dt>
                        <dd className="text-sm text-gray-900 break-words">
                          {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {/* Link Section */}
            {notification.link && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <a
                  href={notification.link}
                  className="inline-flex items-center text-[rgba(37,150,190,1)] hover:text-[rgba(37,150,190,0.8)] font-semibold transition-colors duration-200"
                >
                  <span>View Related Content</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationDetail

