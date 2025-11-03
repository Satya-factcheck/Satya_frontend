import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, Moon, Sun, LogIn, TrendingUp, Clock, Heart } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect, useRef } from 'react'
import UserButton from './UserButton'
import { cn } from '../utils/cn'
import { useUserPreferences } from '../context/UserContext'
import logo from '../assets/logo.svg'

const Navbar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { interests } = useUserPreferences()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const searchRef = useRef(null)

  // Interest names mapping
  const interestNames = {
    politics: 'Politics',
    technology: 'Technology',
    business: 'Business',
    sports: 'Sports',
    health: 'Health',
    science: 'Science',
    entertainment: 'Entertainment',
    environment: 'Environment',
    education: 'Education',
    travel: 'Travel',
    food: 'Food & Culture',
    finance: 'Finance'
  }

  // Popular search terms and trending topics
  const popularSearches = [
    { text: 'Digital India', type: 'trending', icon: TrendingUp },
    { text: 'Vaccine Facts', type: 'trending', icon: TrendingUp },
    { text: 'Election News', type: 'trending', icon: TrendingUp },
    { text: 'Climate Change', type: 'trending', icon: TrendingUp },
    { text: 'Economic Growth', type: 'trending', icon: TrendingUp },
    { text: 'Space Mission', type: 'trending', icon: TrendingUp },
    { text: 'Fake News', type: 'recent', icon: Clock },
    { text: 'Deepfake Detection', type: 'recent', icon: Clock },
    { text: 'Government Policies', type: 'recent', icon: Clock },
    { text: 'Technology', type: 'recent', icon: Clock },
  ]

  // Get user interests as search suggestions
  const userInterestSuggestions = interests.map(interestId => ({
    text: interestNames[interestId] || interestId,
    type: 'interest',
    icon: Heart
  }))

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter suggestions based on query
  useEffect(() => {
    // Combine all suggestions: user interests first, then trending, then recent
    const allSuggestions = [
      ...userInterestSuggestions,
      ...popularSearches
    ]

    if (searchQuery.trim()) {
      const filtered = allSuggestions.filter(item =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 6))
    } else {
      // Show user interests first, then trending
      const defaultSuggestions = [
        ...userInterestSuggestions.slice(0, 3),
        ...popularSearches.filter(item => item.type === 'trending').slice(0, 3)
      ]
      setSuggestions(defaultSuggestions)
    }
  }, [searchQuery, interests])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to home page with search query
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion)
    navigate(`/?search=${encodeURIComponent(suggestion)}`)
    setShowSuggestions(false)
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
              <img src={logo} alt="Satya Logo" className="w-12 h-12" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                SATYA
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full" ref={searchRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search for news or claims..."
                className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Search"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              
              {/* Autocomplete Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                  <div className="p-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 font-medium">
                      {searchQuery ? 'Suggestions' : 'Quick Search'}
                    </p>
                    {suggestions.map((suggestion, index) => {
                      const Icon = suggestion.icon
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left",
                            "hover:bg-gray-100 dark:hover:bg-gray-700"
                          )}
                        >
                          <Icon className={cn(
                            "w-4 h-4",
                            suggestion.type === 'trending' ? "text-blue-500" : 
                            suggestion.type === 'interest' ? "text-pink-500" : 
                            "text-gray-400"
                          )} />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {suggestion.text}
                          </span>
                          {suggestion.type === 'trending' && (
                            <span className="ml-auto text-xs text-blue-500 font-medium">
                              Trending
                            </span>
                          )}
                          {suggestion.type === 'interest' && (
                            <span className="ml-auto text-xs text-pink-500 font-medium">
                              Your Interest
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Switch */}
            <label className="relative inline-flex cursor-pointer items-center" aria-label="Toggle theme">
              <input 
                type="checkbox" 
                className="peer sr-only" 
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <div className="peer h-7 w-12 rounded-full bg-slate-300 dark:bg-slate-600 ring-offset-1 transition-colors duration-200 peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500"></div>
              <span className="absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5 flex items-center justify-center">
                {theme === 'light' ? (
                  <Sun className="w-3 h-3 text-yellow-500" />
                ) : (
                  <Moon className="w-3 h-3 text-indigo-600" />
                )}
              </span>
            </label>

            {/* Auth Controls */}
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors font-medium"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <UserButton />
              </div>
            )}

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
