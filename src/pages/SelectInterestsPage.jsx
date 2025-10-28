import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { motion, AnimatePresence } from 'framer-motion'
import InterestSelector from '../components/InterestSelector'
import { useUserPreferences } from '../context/UserContext'
import { saveUserInterests } from '../services/userService'
import { AlertCircle, Hand } from 'lucide-react'

const SelectInterestsPage = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { interests, setInterests, hasCompletedOnboarding, setHasCompletedOnboarding } = useUserPreferences()
  const [selectedInterests, setSelectedInterests] = useState(interests || [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState(null)

  const minSelection = 3
  const canSubmit = selectedInterests.length >= minSelection

  const handleSubmit = async () => {
    if (!canSubmit) return

    setIsSubmitting(true)
    setError(null)

    try {
      // Save interests to backend
      await saveUserInterests(selectedInterests)
      
      // Update context
      setInterests(selectedInterests)
      setHasCompletedOnboarding(true)

      // Show success animation
      setShowSuccess(true)

      // Redirect after animation
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (error) {
      console.error('Error saving interests:', error)
      
      // Check if it's a network/server error - proceed anyway with local storage
      if (error.status === 0 || error.status >= 500 || error.message?.includes('Network')) {
        // Network or server error - save locally and proceed immediately
        setInterests(selectedInterests)
        setHasCompletedOnboarding(true)
        setShowSuccess(true)
        setTimeout(() => navigate('/'), 1500)
      } else {
        // Other errors - show error message
        setError(error.message || 'Failed to save interests. Please try again.')
        setIsSubmitting(false)
      }
    }
  }

  const handleSkip = () => {
    // Allow skipping but still mark as onboarded
    setHasCompletedOnboarding(true)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-slate-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header - Classy & Standard Design */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Welcome{user?.firstName ? `, ${user.firstName}` : ''}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Let's personalize your news experience
          </p>
        </motion.div>

        {/* Interest Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800/50 dark:backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700/50 p-8 md:p-12"
        >
          <InterestSelector
            selectedInterests={selectedInterests}
            onSelectionChange={setSelectedInterests}
            minSelection={minSelection}
          />

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-12 justify-center items-center"
          >
            {/* Skip Button */}
            <button
              onClick={handleSkip}
              disabled={isSubmitting}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
            >
              Skip for now
            </button>

            {/* Submit Button with Spinning Gradient Border */}
            {canSubmit ? (
              <>
                <style>{`
                  .button-wrapper::before {
                    animation: spin-gradient 4s linear infinite;
                  }
                  
                  @keyframes spin-gradient {
                    from {
                      transform: rotate(0deg);
                    }
                    
                    to {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
                <motion.div
                  className="relative inline-block p-0.5 rounded-full overflow-hidden transition duration-300 before:content-[''] before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_#3b82f6,_#60a5fa,_#93c5fd,_#dbeafe,_transparent,_transparent,_transparent,_#dbeafe,_#93c5fd,_#60a5fa,_#3b82f6)] button-wrapper"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit || isSubmitting}
                    className="relative z-10 bg-gray-900 dark:bg-gray-800 text-white rounded-full px-12 py-4 font-bold text-lg"
                  >
                    <span className="flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          Continue to News Feed
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </>
                      )}
                    </span>
                  </button>
                </motion.div>
              </>
            ) : (
              <motion.button
                disabled={true}
                className="relative px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  Continue to News Feed →
                </span>
              </motion.button>
            )}
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-xl flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Something went wrong</p>
                  <p className="text-sm mt-1">{error}</p>
                  <p className="text-xs mt-2 opacity-75">
                    Your preferences have been saved locally. You can continue.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Helper Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6"
          >
            You can always update your interests later in settings
          </motion.p>
        </motion.div>

        {/* Success Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', damping: 15 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-6xl shadow-2xl shadow-green-500/50"
                >
                  ✓
                </motion.div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                  All Set!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Taking you to your personalized news feed...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SelectInterestsPage
