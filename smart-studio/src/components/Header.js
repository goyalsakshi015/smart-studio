// src/components/Header.jsx
import React from 'react'

const Header = ({ userDetails, onLogout ,headerTitle}) => {
  return (
    <header className="w-full relative flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-gray-800">
        {headerTitle}
      </h1>

      <div className="ml-auto flex items-center space-x-4">
        <span className="text-gray-600">{userDetails?.name}</span>
        <button
          onClick={onLogout}
          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header
