import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

/**
 * ProtectedRoute - A wrapper component that requires authentication
 * @param {React.ReactNode} children - The content to protect
 */
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

export default ProtectedRoute

