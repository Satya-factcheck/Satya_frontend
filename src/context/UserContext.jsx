import { createContext, useContext, useState, useEffect } from 'react'
import { getUserInterests } from '../services/userService'

const UserContext = createContext()

export const useUserPreferences = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserPreferences must be used within UserPreferencesProvider')
  }
  return context
}

export const UserPreferencesProvider = ({ children }) => {
  // Load from localStorage or defaults
  const [interests, setInterestsState] = useState(() => {
    const saved = localStorage.getItem('userInterests')
    return saved ? JSON.parse(saved) : []
  })

  const [hasCompletedOnboarding, setHasCompletedOnboardingState] = useState(() => {
    const saved = localStorage.getItem('hasCompletedOnboarding')
    return saved === 'true'
  })

  const [isLoading, setIsLoading] = useState(false)

  // Sync with backend on mount
  useEffect(() => {
    const syncWithBackend = async () => {
      // Only sync if user has completed onboarding
      if (!hasCompletedOnboarding) return

      setIsLoading(true)
      try {
        const backendInterests = await getUserInterests()
        if (backendInterests && backendInterests.length > 0) {
          // Backend data takes precedence
          setInterestsState(backendInterests)
          localStorage.setItem('userInterests', JSON.stringify(backendInterests))
        }
      } catch (error) {
        console.error('Failed to sync interests from backend:', error)
        // Continue with localStorage data
      } finally {
        setIsLoading(false)
      }
    }

    syncWithBackend()
  }, [hasCompletedOnboarding])

  // Save interests to localStorage whenever they change
  const setInterests = (newInterests) => {
    setInterestsState(newInterests)
    localStorage.setItem('userInterests', JSON.stringify(newInterests))
  }

  // Save onboarding status to localStorage
  const setHasCompletedOnboarding = (status) => {
    setHasCompletedOnboardingState(status)
    localStorage.setItem('hasCompletedOnboarding', status.toString())
  }

  // Clear all user preferences (for logout)
  const clearPreferences = () => {
    setInterestsState([])
    setHasCompletedOnboardingState(false)
    localStorage.removeItem('userInterests')
    localStorage.removeItem('hasCompletedOnboarding')
  }

  const value = {
    interests,
    setInterests,
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
    clearPreferences,
    isLoading,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
