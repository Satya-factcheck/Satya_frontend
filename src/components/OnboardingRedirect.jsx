import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { useUserPreferences } from '../context/UserContext'

/**
 * OnboardingRedirect - Redirects users to interest selection if they haven't completed onboarding
 * Place this component in pages that should trigger the onboarding check (like HomePage)
 */
const OnboardingRedirect = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn, isLoaded } = useUser()
  const { hasCompletedOnboarding } = useUserPreferences()

  useEffect(() => {
    // Wait for Clerk to load
    if (!isLoaded) return

    // Only redirect if user is signed in, hasn't completed onboarding, and not already on the onboarding page
    if (isSignedIn && !hasCompletedOnboarding && location.pathname !== '/select-interests') {
      navigate('/select-interests')
    }
  }, [isSignedIn, isLoaded, hasCompletedOnboarding, location.pathname, navigate])

  // Show children (the actual page content)
  return <>{children}</>
}

export default OnboardingRedirect
