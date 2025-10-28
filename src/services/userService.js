import { api } from '../utils/apiClient'
import { API_ENDPOINTS } from '../config/api'

/**
 * User Interests API Service
 * Handles all API calls related to user interests
 */

/**
 * Fetch user's saved interests from backend
 * @returns {Promise<string[]>} Array of interest IDs
 */
export const getUserInterests = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_USER_INTERESTS)
    return response.interests || []
  } catch (error) {
    console.error('Error fetching user interests:', error)
    // Fallback to localStorage if API fails
    const saved = localStorage.getItem('userInterests')
    return saved ? JSON.parse(saved) : []
  }
}

/**
 * Save user's interests to backend
 * @param {string[]} interests - Array of interest IDs
 * @returns {Promise<object>} Response from backend
 */
export const saveUserInterests = async (interests) => {
  try {
    const response = await api.post(API_ENDPOINTS.UPDATE_USER_INTERESTS, {
      interests,
    })
    
    // Also save to localStorage as backup
    localStorage.setItem('userInterests', JSON.stringify(interests))
    localStorage.setItem('hasCompletedOnboarding', 'true')
    
    return response
  } catch (error) {
    console.error('Error saving user interests:', error)
    
    // Save to localStorage even if API fails
    localStorage.setItem('userInterests', JSON.stringify(interests))
    localStorage.setItem('hasCompletedOnboarding', 'true')
    
    throw error
  }
}

/**
 * Update user's interests (partial update)
 * @param {string[]} interests - Array of interest IDs
 * @returns {Promise<object>} Response from backend
 */
export const updateUserInterests = async (interests) => {
  try {
    const response = await api.put(API_ENDPOINTS.UPDATE_USER_INTERESTS, {
      interests,
    })
    
    // Update localStorage
    localStorage.setItem('userInterests', JSON.stringify(interests))
    
    return response
  } catch (error) {
    console.error('Error updating user interests:', error)
    
    // Update localStorage even if API fails
    localStorage.setItem('userInterests', JSON.stringify(interests))
    
    throw error
  }
}

/**
 * Get personalized news feed based on user interests
 * @param {object} options - Query options (page, limit, filter)
 * @returns {Promise<object>} News articles and metadata
 */
export const getPersonalizedFeed = async (options = {}) => {
  const { page = 1, limit = 20, filter = 'trending' } = options
  
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      filter,
    })
    
    const response = await api.get(`${API_ENDPOINTS.GET_NEWS_FEED}?${queryParams}`)
    return response
  } catch (error) {
    console.error('Error fetching personalized feed:', error)
    throw error
  }
}

/**
 * Get trending news (no personalization)
 * @param {object} options - Query options
 * @returns {Promise<object>} Trending news articles
 */
export const getTrendingNews = async (options = {}) => {
  const { page = 1, limit = 20 } = options
  
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    const response = await api.get(
      `${API_ENDPOINTS.GET_TRENDING}?${queryParams}`,
      { requiresAuth: false }
    )
    return response
  } catch (error) {
    console.error('Error fetching trending news:', error)
    throw error
  }
}

/**
 * Get article by ID
 * @param {string} articleId - Article ID
 * @returns {Promise<object>} Article details
 */
export const getArticleById = async (articleId) => {
  try {
    const endpoint = API_ENDPOINTS.GET_ARTICLE_BY_ID.replace(':id', articleId)
    const response = await api.get(endpoint, { requiresAuth: false })
    return response
  } catch (error) {
    console.error('Error fetching article:', error)
    throw error
  }
}

/**
 * Verify a news article/claim
 * @param {object} data - Article URL or text to verify
 * @returns {Promise<object>} Verification result
 */
export const verifyArticle = async (data) => {
  try {
    const response = await api.post(API_ENDPOINTS.VERIFY_ARTICLE, data)
    return response
  } catch (error) {
    console.error('Error verifying article:', error)
    throw error
  }
}
