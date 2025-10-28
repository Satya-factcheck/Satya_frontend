import React, { memo } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ExternalLink, Share2, Facebook, Twitter, MessageCircle } from 'lucide-react'
import CredibilityBadge from '../components/CredibilityBadge'
import BiasMeter from '../components/BiasMeter'

const ArticleDetailsPage = () => {
  const { id } = useParams()

  // Mock article data
  const article = {
    id,
    headline: 'Government Announces New Digital India Initiative for Rural Areas',
    content: `The central government has launched a comprehensive digital literacy program aimed at connecting over 5000 villages to high-speed internet by end of 2024.

    The initiative, unveiled today by the Ministry of Electronics and Information Technology, represents one of the largest digital infrastructure projects undertaken in rural India. The program will focus on providing affordable internet connectivity, digital skills training, and establishing digital service centers in remote areas.

    Key highlights of the program include:
    - Installation of fiber optic cables in 5000+ villages
    - Free digital literacy training for over 1 million rural residents
    - Subsidized smartphones and tablets for students
    - Establishment of 2000 Common Service Centers

    The government has allocated ₹15,000 crore for this initiative over the next two years. Industry experts have praised the move, noting that digital connectivity is crucial for economic development and access to essential services in rural areas.

    However, some critics have raised concerns about the implementation timeline and the sustainability of such large-scale projects in regions with limited infrastructure.`,
    source: 'The Hindu',
    author: 'Rajesh Kumar',
    publishedAt: 'January 15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=1200',
    credibilityScore: 92,
    verdict: 'True',
    bias: 'Neutral',
    biasScore: 0,
    sourceReputation: 94,
    factCheckSummary: 'This article accurately reports on a verified government announcement. All statistics and quotes have been cross-referenced with official government press releases and ministry statements.',
    references: [
      'Ministry of Electronics & IT Press Release - Jan 15, 2024',
      'Official Digital India Portal Update',
      'Parliamentary Budget Allocation Document'
    ]
  }

  const relatedArticles = [
    {
      id: 2,
      headline: 'How Digital Literacy is Transforming Rural India',
      source: 'Indian Express',
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
      verdict: 'True',
      credibilityScore: 88
    },
    {
      id: 3,
      headline: 'Critics Question Feasibility of Rural Internet Expansion',
      source: 'The Wire',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
      verdict: 'True',
      credibilityScore: 85
    },
    {
      id: 4,
      headline: 'Previous Digital India Projects: Success and Challenges',
      source: 'NDTV',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
      verdict: 'True',
      credibilityScore: 90
    }
  ]

  const handleShare = (platform) => {
    const url = window.location.href
    const text = article.headline
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    }
    
    window.open(urls[platform], '_blank', 'width=600,height=400')
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">Fact-Check Analysis</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{article.factCheckSummary}</p>
        
        <h3 className="font-semibold mb-3">Verified References:</h3>
        <ul className="space-y-2">
          {article.references.map((ref, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <ExternalLink className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">{ref}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Related Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Related Articles & Different Perspectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((related) => (
            <div key={related.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <img src={related.imageUrl} alt={related.headline} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="mb-2">
                  <CredibilityBadge verdict={related.verdict} size="sm" />
                </div>
                <h3 className="font-bold text-sm mb-2 line-clamp-2">{related.headline}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{related.source}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default ArticleDetailsPage