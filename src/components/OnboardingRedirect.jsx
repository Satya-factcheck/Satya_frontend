import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useUserPreferences } from '../context/UserContext'

/**
 * OnboardingRedirect - Redirects users to interest selection if they haven't completed onboarding
 * Place this component in pages that should trigger the onboarding check (like HomePage)
 */
const OnboardingRedirect = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, loading } = useAuth()
  const { hasCompletedOnboarding } = useUserPreferences()

  useEffect(() => {
    // Wait for auth to load
    if (loading) return

    // Only redirect if user is authenticated, hasn't completed onboarding, and not already on the onboarding page
    if (isAuthenticated && !hasCompletedOnboarding && location.pathname !== '/select-interests') {
      navigate('/select-interests')
    }
  }, [isAuthenticated, loading, hasCompletedOnboarding, location.pathname, navigate])

  // Show children (the actual page content)
  return <>{children}</>
}

export default OnboardingRedirect
