import { motion } from 'framer-motion'
import { ExternalLink, Clock, User } from 'lucide-react'
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
    credibilityScore,
    verdict,
    bias,
    biasScore
  } = article

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
          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span className="font-medium text-primary">{source}</span>
            <div className="flex items-center space-x-1">
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

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{credibilityScore}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Credibility<br />Score
              </span>
            </div>
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default NewsCard
