import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

const BiasMeter = ({ bias = 'Unbiased', score = 0 }) => {
  // score: 0 (Unbiased) to 100 (Biased)
  const position = score

  const getBiasColor = () => {
    if (score <= 30) return 'bg-green-500' // Unbiased
    if (score <= 60) return 'bg-yellow-500' // Slightly biased
    return 'bg-red-500' // Biased
  }

  const getBiasLabel = () => {
    if (score <= 30) return 'Unbiased'
    if (score <= 60) return 'Slightly Biased'
    return 'Biased'
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400 mb-2">
        <span className="flex-shrink-0">Unbiased</span>
        <span className="flex-shrink-0">Slightly Biased</span>
        <span className="flex-shrink-0">Biased</span>
      </div>
      <div className="relative h-2 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 dark:from-green-900 dark:via-yellow-900 dark:to-red-900 rounded-full overflow-hidden">
        <motion.div
          initial={{ left: '0%' }}
          animate={{ left: `${position}%` }}
          transition={{ type: 'spring', damping: 20 }}
          className={cn(
            'absolute top-0 w-1 h-full',
            getBiasColor()
          )}
          style={{ transform: 'translateX(-50%)' }}
        />
      </div>
    </div>
  )
}

export default BiasMeter
