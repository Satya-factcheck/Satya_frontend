import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { cn } from '../utils/cn'
import { Check } from 'lucide-react'

// Import PNG icons
import politicsIcon from '../assets/politics.png'
import technologyIcon from '../assets/technology.png'
import businessIcon from '../assets/business.png'
import sportsIcon from '../assets/sports.png'
import healthIcon from '../assets/health.png'
import scienceIcon from '../assets/science.png'
import entertainmentIcon from '../assets/entertainment.png'
import environmentIcon from '../assets/environment.png'
import educationIcon from '../assets/education.png'
import travelIcon from '../assets/travel.png'
import foodIcon from '../assets/food&culture.png'
import financeIcon from '../assets/finance.png'

const newsTopics = [
  { id: 'politics', name: 'Politics', icon: politicsIcon },
  { id: 'technology', name: 'Technology', icon: technologyIcon },
  { id: 'business', name: 'Business', icon: businessIcon },
  { id: 'sports', name: 'Sports', icon: sportsIcon },
  { id: 'health', name: 'Health', icon: healthIcon },
  { id: 'science', name: 'Science', icon: scienceIcon },
  { id: 'entertainment', name: 'Entertainment', icon: entertainmentIcon },
  { id: 'environment', name: 'Environment', icon: environmentIcon },
  { id: 'education', name: 'Education', icon: educationIcon },
  { id: 'travel', name: 'Travel', icon: travelIcon },
  { id: 'food', name: 'Food & Culture', icon: foodIcon },
  { id: 'finance', name: 'Finance', icon: financeIcon },
]

const InterestSelector = ({ selectedInterests = [], onSelectionChange, minSelection = 3 }) => {
  const [localSelected, setLocalSelected] = useState(selectedInterests)
  const [hoveredId, setHoveredId] = useState(null)

  const toggleInterest = (topicId) => {
    const newSelected = localSelected.includes(topicId)
      ? localSelected.filter(id => id !== topicId)
      : [...localSelected, topicId]
    
    setLocalSelected(newSelected)
    onSelectionChange?.(newSelected)
  }

  const isSelected = (topicId) => localSelected.includes(topicId)
  const selectionCount = localSelected.length
  const meetsMinimum = selectionCount >= minSelection

  return (
    <div className="w-full">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <motion.h2 
          className="text-3xl font-semibold text-gray-900 dark:text-white mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          What interests you?
        </motion.h2>
        <motion.p 
          className="text-gray-600 dark:text-gray-400 text-base mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Select at least {minSelection} topics to personalize your news feed
        </motion.p>
        
        {/* Animated Counter with progress bar */}
        <motion.div 
          className="inline-flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {/* Counter text */}
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectionCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-2"
              >
                {/* Animated number circle */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: selectionCount > 0 ? [0, 10, -10, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300',
                    meetsMinimum 
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  )}
                >
                  {selectionCount}
                </motion.div>
                
                <span className={cn(
                  'font-medium text-base transition-colors duration-300',
                  meetsMinimum ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                )}>
                  of {minSelection} selected
                </span>
                
                {meetsMinimum && (
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </motion.span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className={cn(
                'h-full rounded-full transition-colors duration-300',
                meetsMinimum 
                  ? 'bg-gray-900 dark:bg-white' 
                  : 'bg-gray-400 dark:bg-gray-600'
              )}
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.min((selectionCount / minSelection) * 100, 100)}%`
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>

          {/* Status message */}
          <AnimatePresence mode="wait">
            {!meetsMinimum ? (
              <motion.p
                key="need-more"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                Pick {minSelection - selectionCount} more to continue
              </motion.p>
            ) : (
              <motion.p
                key="ready"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1"
              >
                Ready to continue! 
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Topics Grid */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {newsTopics.map((topic, index) => {
          const selected = isSelected(topic.id)
          const isHovered = hoveredId === topic.id

          return (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.03,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleInterest(topic.id)}
              onMouseEnter={() => setHoveredId(topic.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                'relative p-6 rounded-xl transition-all duration-300',
                'border-2 overflow-hidden',
                selected
                  ? 'bg-gray-900 dark:bg-gradient-to-br dark:from-blue-600 dark:to-blue-700 border-gray-900 dark:border-blue-500 shadow-lg dark:shadow-blue-500/20'
                  : 'bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-blue-400 hover:shadow-sm dark:hover:shadow-blue-500/10'
              )}
            >
              {/* Subtle background gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent dark:from-blue-500/10 dark:to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered && !selected ? 0.5 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Selection Checkmark with animation */}
              <AnimatePresence>
                {selected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-white dark:bg-white rounded-full flex items-center justify-center shadow-md"
                  >
                    <Check className="w-4 h-4 text-gray-900 dark:text-blue-600 stroke-[3]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon with subtle animation */}
              <motion.div 
                className="w-12 h-12 mx-auto mb-3 flex items-center justify-center relative z-10"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: selected ? [0, -5, 5, 0] : 0
                }}
                transition={{ 
                  scale: { duration: 0.2 },
                  rotate: { duration: 0.5 }
                }}
              >
                <img 
                  src={topic.icon} 
                  alt={topic.name}
                  className={cn(
                    "w-full h-full object-contain transition-all duration-300",
                    selected ? "brightness-0 invert dark:brightness-200 dark:invert" : "opacity-70 dark:opacity-80"
                  )}
                />
              </motion.div>

              {/* Topic Name */}
              <h3 className={cn(
                "font-semibold text-sm text-center relative z-10 transition-colors duration-200",
                selected 
                  ? "text-white dark:text-white" 
                  : "text-gray-700 dark:text-gray-200"
              )}>
                {topic.name}
              </h3>

              {/* Bottom accent line on hover */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-blue-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          )
        })}
      </motion.div>

      {/* Simple Footer */}
      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-xs text-gray-500 dark:text-gray-400">
          You can update your interests anytime in settings
        </p>
      </motion.div>
    </div>
  )
}

export default InterestSelector
