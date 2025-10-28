import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

const BiasMeter = ({ bias = 'Unbiased', score = 0 }) => {
  // score: 0 (Unbiased) to 100 (Biased)
  // Handle negative scores by converting to absolute value
  const normalizedScore = Math.abs(score)
  const position = Math.min(Math.max(normalizedScore, 0), 100)

  const getBiasInfo = () => {
    if (position <= 30) {
      return {
        label: 'Unbiased',
        color: 'from-emerald-500 to-emerald-600',
        bgColor: 'bg-emerald-500',
        textColor: 'text-emerald-600 dark:text-emerald-400'
      }
    }
    if (position <= 60) {
      return {
        label: 'Slightly Biased',
        color: 'from-amber-500 to-amber-600',
        bgColor: 'bg-amber-500',
        textColor: 'text-amber-600 dark:text-amber-400'
      }
    }
    return {
      label: 'Biased',
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-500',
      textColor: 'text-rose-600 dark:text-rose-400'
    }
  }

  const biasInfo = getBiasInfo()

  return (
    <div className="w-full space-y-2">
      {/* Label and Score */}
      <div className="flex items-center justify-between text-xs">
        <span className={cn('font-medium', biasInfo.textColor)}>
          {biasInfo.label}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {Math.round(position)}% bias
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        {/* Filled bar with gradient */}
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${position}%` }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className={cn(
            'h-full bg-gradient-to-r rounded-full relative',
            biasInfo.color
          )}
          style={{ minWidth: position > 0 ? '12px' : '0px' }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
        </motion.div>

        {/* Marker dots for scale */}
        <div className="absolute inset-0 flex items-center justify-between px-1">
          <div className="w-0.5 h-1.5 bg-white/40 rounded-full"></div>
          <div className="w-0.5 h-1.5 bg-white/40 rounded-full"></div>
          <div className="w-0.5 h-1.5 bg-white/40 rounded-full"></div>
        </div>
      </div>

      {/* Scale labels */}
      <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  )
}

export default BiasMeter
