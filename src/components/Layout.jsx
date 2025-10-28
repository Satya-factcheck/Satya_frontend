import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useState } from 'react'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 mt-16">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
