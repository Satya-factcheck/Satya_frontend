import React, { memo, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ExternalLink, Share2, Facebook, Twitter, MessageCircle, AlertTriangle, Loader2 } from 'lucide-react'
import CredibilityBadge from '../components/CredibilityBadge'
import BiasMeter from '../components/BiasMeter'
import { getArticleById } from '../services/userService'

const ArticleDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getArticleById(id)
        setArticle(data)
      } catch (err) {
        console.error('Error fetching article:', err)
        setError(err.message || 'Failed to load article')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchArticle()
    }
  }, [id])

  const handleShare = (platform) => {
    if (!article) return
    
    const url = window.location.href
    const text = article.headline
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    }
    
    window.open(urls[platform], '_blank', 'width=600,height=400')
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600 dark:text-gray-400">Loading article...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center"
        >
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-amber-500" />
          <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'The article you are looking for does not exist or has been removed.'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8"
      >
        {/* Hero Image */}
        <div className="relative h-96 bg-gray-200 dark:bg-gray-700">
          <img
            src={article.imageUrl}
            alt={article.headline}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <CredibilityBadge verdict={article.verdict} size="lg" />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="font-semibold text-primary text-base">{article.source}</span>
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{article.publishedAt}</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.headline}</h1>

          {/* Credibility Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                SOURCE REPUTATION
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {article.sourceReputation}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Highly trusted source with strong editorial standards
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                POLITICAL BIAS
              </h3>
              <BiasMeter bias={article.bias} score={article.biasScore} />
            </div>
          </div>

          {/* Article Content */}
          <div className="prose dark:prose-invert max-w-none mb-8">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="flex items-center space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <span className="font-semibold flex items-center">
              <Share2 className="w-5 h-5 mr-2" />
              Share:
            </span>
            <button
              onClick={() => handleShare('whatsapp')}
              className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-900/50 transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.article>

      {/* Fact-Check Summary */}
      {(article.factCheckResults || article.claims) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Fact-Check Analysis</h2>
          
          {article.claims && article.claims.length > 0 && (
            <>
              <h3 className="font-semibold mb-3">Extracted Claims:</h3>
              <ul className="space-y-2 mb-6">
                {article.claims.slice(0, 5).map((claim, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <ExternalLink className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {claim.claim || claim}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
          
          {article.factCheckResults && article.factCheckResults.length > 0 && (
            <>
              <h3 className="font-semibold mb-3">Fact-Check References:</h3>
              <ul className="space-y-2">
                {article.factCheckResults.slice(0, 5).map((result, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <ExternalLink className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    <a 
                      href={result.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {result.title || result.publisher?.site || 'Fact-check source'}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {article.mbfcPublisherMatch && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-2">Publisher Analysis (MBFC):</h3>
              <p className="text-gray-700 dark:text-gray-300">
                {article.source} has a credibility rating of {article.sourceReputation}/100 
                with a {article.bias.toLowerCase()} bias according to Media Bias/Fact Check.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default ArticleDetailsPage