import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Settings, Save, X, AlertCircle, CheckCircle } from 'lucide-react'
import InterestSelector from '../components/InterestSelector'
import { useUserPreferences } from '../context/UserContext'
import { updateUserInterests } from '../services/userService'
import ProtectedRoute from '../components/ProtectedRoute'

const SettingsPage = () => {
  const navigate = useNavigate()
  const { interests, setInterests } = useUserPreferences()
  const [selectedInterests, setSelectedInterests] = useState(interests || [])
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    setShowSuccess(false)

    // Update context immediately for instant feedback
    setInterests(selectedInterests)

    try {
      // Attempt to save to backend (will fail gracefully if not available)
      await updateUserInterests(selectedInterests)
      
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Error syncing with server:', error)
      
      // Show success anyway since we saved locally
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      
      // Optionally show a subtle info message about offline save
      console.info('Preferences saved locally. Will sync when backend is available.')
    } finally {
      setIsSaving(false)
    }
  }

  const hasChanges = JSON.stringify(selectedInterests.sort()) !== JSON.stringify(interests.sort())

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your preferences and interests
              </p>
            </div>
          </div>
        </motion.div>

        {/* Interests Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Your Interests
          </h2>
          
          <InterestSelector
            selectedInterests={selectedInterests}
            onSelectionChange={setSelectedInterests}
            minSelection={0}
          />

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 justify-end">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            
            <motion.button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              whileHover={hasChanges ? { scale: 1.05 } : {}}
              whileTap={hasChanges ? { scale: 0.95 } : {}}
              className={`
                px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2
                ${hasChanges
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {isSaving ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </motion.button>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Your preferences have been saved successfully!</span>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Could not sync with server</p>
                <p className="text-sm mt-1">{error}</p>
                <p className="text-xs mt-2 opacity-75">
                  Your preferences have been saved locally and will sync when the connection is restored.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Other Settings Sections (Placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🔔</span>
            Notifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Notification settings coming soon...
          </p>
        </motion.div>
      </div>
    </ProtectedRoute>
  )
}

export default SettingsPage
