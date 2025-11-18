import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      name: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
      path: '/dashboard'
    },
    {
      name: 'My Requests',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      path: '/requests'
    },
    {
      name: 'Profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      path: '/dashboard/profile'
    },
    {
      name: 'Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      path: '/dashboard/settings'
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
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
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800" style={{fontFamily: 'Poppins, sans-serif'}}>Car Vistors</h1>
              <p className="text-xs sm:text-sm text-gray-600">Professional VIN Solutions</p>
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
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl transform scale-105' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 hover:shadow-lg hover:transform hover:scale-105'
                  }
                `}
              >
                <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`}>
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

        {/* User Info & Logout */}
        <div className="p-4 sm:p-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-blue-50/30">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm sm:text-lg">
                {JSON.parse(localStorage.getItem('user') || '{}').firstName?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-gray-800 truncate" style={{fontFamily: 'Poppins, sans-serif'}}>
                {JSON.parse(localStorage.getItem('user') || '{}').firstName || 'User'} {JSON.parse(localStorage.getItem('user') || '{}').lastName || ''}
              </p>
              <p className="text-xs text-gray-500 truncate font-medium">
                {JSON.parse(localStorage.getItem('user') || '{}').email || 'user@example.com'}
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

export default Sidebar
