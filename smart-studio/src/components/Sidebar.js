import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-gray-200 transition-colors ${
      isActive ? 'bg-blue-500 text-white' : 'text-gray-700'
    }`

  return (
    <div className="w-64 min-h-screen bg-gray-100 p-4 shadow-lg">
      <nav className="space-y-2">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/generateIdea" className={linkClass}>
          Idea Generator
        </NavLink>
        <NavLink to="/contentCreation" className={linkClass}>
          Content Creation
        </NavLink>
        <NavLink to="/summary" className={linkClass}>
          Summarizer
        </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar
