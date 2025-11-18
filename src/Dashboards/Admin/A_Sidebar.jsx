import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ChartBarIcon, DocumentTextIcon, UsersIcon, Cog6ToothIcon, 
  ArrowRightOnRectangleIcon, BellIcon, ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'

const A_Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const admin = JSON.parse(localStorage.getItem('admin') || '{}')
  const displayName = [admin.firstName, admin.lastName].filter(Boolean).join(' ') || 'Admin'
  const displayEmail = admin.email || 'admin@carvistors.com'

  const menuItems = [
    { name: 'Dashboard', icon: <ChartBarIcon className="w-5 h-5" />, path: '/admin-dashboard' },
    { name: 'VIN Requests', icon: <DocumentTextIcon className="w-5 h-5" />, path: '/admin/requests' },
    { name: 'Users', icon: <UsersIcon className="w-5 h-5" />, path: '/admin/users' },
    { name: 'Reports', icon: <ClipboardDocumentListIcon className="w-5 h-5" />, path: '/admin/reports' },
    { name: 'Notifications', icon: <BellIcon className="w-5 h-5" />, path: '/admin/notifications' },
    { name: 'Settings', icon: <Cog6ToothIcon className="w-5 h-5" />, path: '/admin/settings' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    localStorage.removeItem('admin')
    navigate('/login')
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 sm:w-72 bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 border-r border-gray-200/50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none lg:z-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200/50 h-20 sm:h-24">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 via-orange-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800" style={{fontFamily: 'Poppins, sans-serif'}}>Admin Panel</h1>
              <p className="text-xs sm:text-sm text-gray-600">Car Vistors Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 sm:px-6 py-4 sm:py-6 space-y-2 sm:space-y-3">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path)
                  onClose()
                }}
                className={`
                  w-full flex items-center space-x-3 sm:space-x-4 px-3 sm:px-5 py-3 sm:py-4 rounded-xl text-left transition-all duration-300 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-xl transform scale-105' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:text-red-600 hover:shadow-lg hover:transform hover:scale-105'
                  }
                `}
              >
                <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-red-600'}`}>
                  {item.icon}
                </span>
                <span className="font-semibold text-xs sm:text-sm">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            )
          })}
        </nav>

        {/* Admin Info & Logout */}
        <div className="p-4 sm:p-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-red-50/30">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-400 via-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm sm:text-lg">
                {displayName.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-gray-800 truncate" style={{fontFamily: 'Poppins, sans-serif'}}>
                {displayName}
              </p>
              <p className="text-xs text-gray-500 truncate font-medium">
                {displayEmail}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 sm:space-x-4 px-3 sm:px-5 py-3 sm:py-4 rounded-xl text-red-600 hover:bg-red-50 hover:shadow-lg transition-all duration-300 group"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-semibold text-xs sm:text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default A_Sidebar
