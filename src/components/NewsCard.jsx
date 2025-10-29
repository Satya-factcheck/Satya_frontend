import { motion } from 'framer-motion'
import { ExternalLink, Clock, User, Shield, Award, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import CredibilityBadge from './CredibilityBadge'
import BiasMeter from './BiasMeter'
import { cn } from '../utils/cn'

const NewsCard = ({ article, index }) => {
  const {
    id,
    headline,
    summary,
    source,
    author,
    publishedAt,
    imageUrl,
    sourceReputation = 50, // From MBFC data, default 50
    verdict,
    bias,
    biasScore,
    credibilityScore = 50, // Backend factual score (0-100)
  } = article

  // Use sourceReputation for the display (from MBFC)
  const sourceReputationScore = sourceReputation

  // Get reputation level and styling
  const getReputationInfo = () => {
    if (sourceReputationScore >= 90) {
      return {
        level: 'Excellent',
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-50 dark:bg-emerald-950',
        borderColor: 'border-emerald-200 dark:border-emerald-800',
        icon: Award
      }
    }
    if (sourceReputationScore >= 70) {
      return {
        level: 'Good',
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-50 dark:bg-blue-950',
        borderColor: 'border-blue-200 dark:border-blue-800',
        icon: Shield
      }
    }
    if (sourceReputationScore >= 50) {
      return {
        level: 'Fair',
        color: 'text-amber-600 dark:text-amber-400',
        bgColor: 'bg-amber-50 dark:bg-amber-950',
        borderColor: 'border-amber-200 dark:border-amber-800',
        icon: Star
      }
    }
    return {
      level: 'Low',
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-50 dark:bg-gray-900',
      borderColor: 'border-gray-200 dark:border-gray-800',
      icon: Shield
    }
  }

  const reputationInfo = getReputationInfo()
  const ReputationIcon = reputationInfo.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
    >
      <Link to={`/article/${id}`} className="block">
        {/* Image */}
        {imageUrl && (
          <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
            <img
              src={imageUrl}
              alt={headline}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3">
              <CredibilityBadge verdict={verdict} size="sm" />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          {/* Source with Enhanced Reputation Score */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 flex-1">
              <span className="font-semibold text-gray-900 dark:text-white text-sm">{source}</span>
              <div className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-200',
                reputationInfo.bgColor,
                reputationInfo.borderColor
              )}>
                <ReputationIcon className={cn('w-3.5 h-3.5', reputationInfo.color)} />
                <span className={cn('text-xs font-bold', reputationInfo.color)}>
                  {sourceReputationScore}
                </span>
                <span className={cn('text-[10px] font-medium', reputationInfo.color)}>
                  {reputationInfo.level}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{publishedAt}</span>
            </div>
          </div>

          {/* Headline */}
          <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {headline}
          </h3>

          {/* Summary */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {summary}
          </p>

          {/* Author */}
          {author && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>
          )}

          {/* Bias Meter */}
          <div className="mb-4">
            <BiasMeter bias={bias} score={biasScore} />
          </div>

          {/* Footer - Just external link icon */}
          <div className="flex items-center justify-end">
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default NewsCard
