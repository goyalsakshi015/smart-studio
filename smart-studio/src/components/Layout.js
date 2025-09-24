import React from 'react'
import Sidebar from './Sidebar'
import { Outlet,useLocation} from 'react-router-dom'
import Header from './Header'

const Layout = ({userDetails,onLogout}) => {
    const location = useLocation()
    const routeTitles = {
    '/generateIdea': 'Idea Generator',
    '/contentCreation': 'Content Creator',
    '/summary': 'Summarizer',
    '/': 'Home',
  }

  const headerTitle = routeTitles[location.pathname] || 'Smart Studio'
  return (
      <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userDetails={userDetails} onLogout={onLogout} headerTitle={headerTitle}/>
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout