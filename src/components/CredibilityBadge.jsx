import { CheckCircle, AlertTriangle, XCircle, HelpCircle } from 'lucide-react'
import { cn } from '../utils/cn'

const CredibilityBadge = ({ verdict, size = 'md' }) => {
  const config = {
    True: {
      icon: CheckCircle,
      text: 'Verified',
      bg: 'bg-green-100 dark:bg-green-900/30',
      text_color: 'text-green-700 dark:text-green-400',
      border: 'border-green-300 dark:border-green-700'
    },
    Misleading: {
      icon: AlertTriangle,
      text: 'Misleading',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text_color: 'text-yellow-700 dark:text-yellow-400',
      border: 'border-yellow-300 dark:border-yellow-700'
    },
    Fake: {
      icon: XCircle,
      text: 'False',
      bg: 'bg-red-100 dark:bg-red-900/30',
      text_color: 'text-red-700 dark:text-red-400',
      border: 'border-red-300 dark:border-red-700'
    },
    Unverified: {
      icon: HelpCircle,
      text: 'Unverified',
      bg: 'bg-gray-100 dark:bg-gray-700',
      text_color: 'text-gray-700 dark:text-gray-300',
      border: 'border-gray-300 dark:border-gray-600'
    }
  }

  const { icon: Icon, text, bg, text_color, border } = config[verdict] || config.Unverified
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  return (
    <div className={cn(
      'inline-flex items-center space-x-1.5 rounded-full border font-medium',
      bg, text_color, border, sizeClasses[size]
    )}>
      <Icon className={cn(size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />
      <span>{text}</span>
    </div>
  )
}

export default CredibilityBadge
