import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

const BiasMeter = ({ bias = 'Neutral', score = 0 }) => {
  // score: -100 (Left) to +100 (Right), 0 is Neutral
  const position = ((score + 100) / 200) * 100

  const getBiasColor = () => {
    if (score < -30) return 'bg-blue-500'
    if (score > 30) return 'bg-red-500'
    return 'bg-green-500'
  }

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
        <span>Left</span>
        <span className="font-medium">{bias}</span>
        <span>Right</span>
      </div>
      <div className="relative h-2 bg-gradient-to-r from-blue-200 via-green-200 to-red-200 dark:from-blue-900 dark:via-green-900 dark:to-red-900 rounded-full overflow-hidden">
        <motion.div
          initial={{ left: '50%' }}
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
