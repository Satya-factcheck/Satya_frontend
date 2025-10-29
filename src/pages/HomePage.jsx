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
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [totalArticles, setTotalArticles] = useState(0)
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
    setPage(1) // Reset to page 1 when tab or interests change
    setArticles([]) // Clear existing articles
    fetchNews(1, false) // Fetch first page
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

  const fetchNews = async (pageNum = 1, append = false) => {
    // Don't fetch if already loading or no more data
    if (append && (isLoadingMore || !hasMore)) return
    
    if (append) {
      setIsLoadingMore(true)
    } else {
      setIsLoading(true)
    }
    setError(null)

    try {
      let response
      
      // Use personalized feed if user is signed in and has interests
      if (isSignedIn && hasCompletedOnboarding && interests.length > 0) {
        response = await getPersonalizedFeed({
          page: pageNum,
          limit: 6,
          filter: activeTab,
        })
      } else {
        // Fall back to trending news for non-authenticated or new users
        response = await getTrendingNews({ page: pageNum, limit: 6 })
      }

      // Process response
      if (response && response.articles) {
        if (append) {
          setArticles(prev => [...prev, ...response.articles])
        } else {
          setArticles(response.articles)
        }
        
        // Update pagination metadata
        setTotalArticles(response.total || response.articles.length)
        setHasMore(response.hasMore !== undefined ? response.hasMore : response.articles.length === 6)
      } else {
        // No articles returned
        if (!append) {
          setArticles([])
          setTotalArticles(0)
          setHasMore(false)
        }
      }
    } catch (error) {
      console.error('Error fetching news:', error)
      setError(error.message)
      // Don't show any articles on error
      if (!append) {
        setArticles([])
        setTotalArticles(0)
        setHasMore(false)
      }
    } finally {
      if (append) {
        setIsLoadingMore(false)
      } else {
        setIsLoading(false)
      }
    }
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchNews(nextPage, true) // Append to existing articles
  }

  const handleRefresh = () => {
    setPage(1)
    setArticles([])
    setHasMore(true)
    fetchNews(1, false)
  }

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
        {!searchQuery && totalArticles > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Showing {articles.length} of {totalArticles} articles
          </p>
        )}
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
      {!searchQuery && filteredArticles.length > 0 && hasMore && (
        <div className="mt-12 text-center">
          <button 
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-8 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
          >
            {isLoadingMore ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Loading more...
              </>
            ) : (
              <>Load More Articles</>
            )}
          </button>
        </div>
      )}
      
      {/* End of Results */}
      {!searchQuery && filteredArticles.length > 0 && !hasMore && (
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            You've reached the end of the feed
          </p>
        </div>
      )}
    </div>
    </OnboardingRedirect>
  )
}

export default HomePage
