import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, CheckCircle, AlertTriangle, XCircle, RefreshCw, X, Search } from 'lucide-react'
import NewsCard from '../components/NewsCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import OnboardingRedirect from '../components/OnboardingRedirect'
import { useUserPreferences } from '../context/UserContext'
import { getPersonalizedFeed, getTrendingNews } from '../services/userService'
import { useUser } from '@clerk/clerk-react'
import { cn } from '../utils/cn'
import { useSearchParams } from 'react-router-dom'

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const [activeTab, setActiveTab] = useState('trending')
  const [isLoading, setIsLoading] = useState(false)
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const { isSignedIn } = useUser()
  const { interests, hasCompletedOnboarding } = useUserPreferences()

  const tabs = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'verified', label: 'Verified', icon: CheckCircle },
    { id: 'misleading', label: 'Misleading', icon: AlertTriangle },
    { id: 'fake', label: 'Fake', icon: XCircle },
  ]

  // Fetch news based on active tab and user interests
  useEffect(() => {
    fetchNews()
  }, [activeTab, interests, isSignedIn, hasCompletedOnboarding])

  // Filter articles based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = articles.filter(article => 
        article.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredArticles(filtered)
    } else {
      setFilteredArticles(articles)
    }
  }, [searchQuery, articles])

  const clearSearch = () => {
    setSearchParams({})
  }

  const fetchNews = async () => {
    setIsLoading(true)
    setError(null)

    try {
      let response
      
      // Use personalized feed if user is signed in and has interests
      if (isSignedIn && hasCompletedOnboarding && interests.length > 0) {
        response = await getPersonalizedFeed({
          page,
          limit: 20,
          filter: activeTab,
        })
      } else {
        // Fall back to trending news for non-authenticated or new users
        response = await getTrendingNews({ page, limit: 20 })
      }

      // Check if response has articles
      if (response && response.articles) {
        setArticles(response.articles)
      } else {
        // Fallback to mock data if API fails or returns nothing
        setArticles(mockArticles)
      }
    } catch (error) {
      console.error('Error fetching news:', error)
      setError(error.message)
      // Fallback to mock data on error
      setArticles(mockArticles)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
    // TODO: Implement pagination
  }

  const handleRefresh = () => {
    setPage(1)
    fetchNews()
  }

  // Mock data
  const mockArticles = [
    {
      id: 1,
      headline: 'Government Announces New Digital India Initiative for Rural Areas',
      summary: 'The central government has launched a comprehensive digital literacy program aimed at connecting over 5000 villages to high-speed internet by end of 2024.',
      source: 'The Hindu',
      author: 'Rajesh Kumar',
      publishedAt: '2 hours ago',
      imageUrl: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800',
      credibilityScore: 92,
      verdict: 'True',
      bias: 'Neutral',
      biasScore: 0
    },
    {
      id: 2,
      headline: 'Misleading Claims About Vaccine Side Effects Circulate on Social Media',
      summary: 'Health experts debunk viral WhatsApp message claiming 80% of vaccinated individuals experience severe side effects. Actual rate is less than 2%.',
      source: 'Alt News',
      author: 'Dr. Priya Sharma',
      publishedAt: '5 hours ago',
      imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800',
      credibilityScore: 65,
      verdict: 'Misleading',
      bias: 'Neutral',
      biasScore: 10
    },
    {
      id: 3,
      headline: 'Indian Space Mission Successfully Launches Communication Satellite',
      summary: 'ISRO celebrates another milestone with the successful deployment of advanced communication satellite that will improve connectivity in remote regions.',
      source: 'Indian Express',
      author: 'Kavita Menon',
      publishedAt: '1 day ago',
      imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
      credibilityScore: 95,
      verdict: 'True',
      bias: 'Neutral',
      biasScore: -5
    },
    {
      id: 4,
      headline: 'Economic Growth Projections Revised Upward for Next Quarter',
      summary: 'Leading economists predict GDP growth of 7.2% driven by strong manufacturing and services sector performance.',
      source: 'Economic Times',
      author: 'Amit Verma',
      publishedAt: '3 hours ago',
      imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
      credibilityScore: 88,
      verdict: 'True',
      bias: 'Right',
      biasScore: 35
    },
    {
      id: 5,
      headline: 'Fake Video of Political Leader Goes Viral Ahead of Elections',
      summary: 'Deepfake technology used to create misleading video. Fact-checkers confirm the video is digitally manipulated and not authentic.',
      source: 'Boom Live',
      author: 'Neha Singh',
      publishedAt: '6 hours ago',
      imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800',
      credibilityScore: 45,
      verdict: 'Fake',
      bias: 'Left',
      biasScore: -40
    },
    {
      id: 6,
      headline: 'New Environmental Policy Aims to Reduce Carbon Emissions by 40%',
      summary: 'Ministry of Environment unveils ambitious plan to combat climate change with focus on renewable energy and sustainable practices.',
      source: 'NDTV',
      author: 'Sunita Reddy',
      publishedAt: '4 hours ago',
      imageUrl: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800',
      credibilityScore: 90,
      verdict: 'True',
      bias: 'Neutral',
      biasScore: 5
    },
  ]

  return (
    <OnboardingRedirect>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
        <h1 className="text-4xl font-bold mb-2">News Verification Feed</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {searchQuery 
            ? `Search results for "${searchQuery}"`
            : isSignedIn && hasCompletedOnboarding && interests.length > 0
              ? `Personalized news based on your ${interests.length} interests`
              : 'AI-powered credibility analysis for Indian news and social media claims'
          }
        </p>
      </motion.div>

      {/* Search Results Banner */}
      <AnimatePresence>
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-900 dark:text-blue-200">
                Found {filteredArticles.length} result{filteredArticles.length !== 1 ? 's' : ''} for "{searchQuery}"
              </span>
            </div>
            <button
              onClick={clearSearch}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2 text-blue-900 dark:text-blue-200"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Could not fetch latest news. Showing cached results.</span>
          </div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-yellow-200 dark:bg-yellow-800 hover:bg-yellow-300 dark:hover:bg-yellow-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </motion.div>
      )}      {/* Tabs */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id
          
          // Get colors based on tab type
          const getTabColors = () => {
            if (!isActive) {
              return 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }
            
            switch(tab.id) {
              case 'verified':
                return 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
              case 'misleading':
                return 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
              case 'fake':
                return 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
              default: // trending
                return 'bg-primary text-white shadow-lg scale-105'
            }
          }
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap',
                getTabColors()
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* News Grid */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchQuery 
              ? `No articles match "${searchQuery}". Try different keywords.`
              : 'No articles available at the moment.'
            }
          </p>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          )}
        </motion.div>
      )}

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full font-medium transition-colors">
          Load More Articles
        </button>
      </div>
    </div>
    </OnboardingRedirect>
  )
}

export default HomePage
