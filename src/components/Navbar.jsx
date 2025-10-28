import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, Moon, Sun, Shield, LogIn } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import UserButton from './UserButton'

const Navbar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate or trigger search
      console.log('Searching:', searchQuery)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <button onClick={onMenuClick} className="lg:hidden" aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Satya</span>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for news or claims..."
                className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Search"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Auth Controls */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="hidden sm:flex items-center space-x-2 px-4 py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors font-medium">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center space-x-2">
                <UserButton />
              </div>
            </SignedIn>

            <Link
              to="/verify"
              className="hidden sm:block px-4 py-2 bg-primary text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
            >
              Verify Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
