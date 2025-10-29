import { api } from '../utils/apiClient'
import { API_ENDPOINTS } from '../config/api'

/**
 * User & News Feed API Service
 * Handles all API calls for user data and news feed
 */

/**
 * Fetch user's saved interests from backend (localStorage fallback)
 * @returns {Promise<string[]>} Array of interest IDs
 */
export const getUserInterests = async () => {
  try {
    // For now, use localStorage since backend doesn't have interests endpoint yet
    const saved = localStorage.getItem('userInterests')
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Error fetching user interests:', error)
    return []
  }
}

/**
 * Save user's interests (localStorage for now)
 * @param {string[]} interests - Array of interest IDs
 * @returns {Promise<object>} Response
 */
export const saveUserInterests = async (interests) => {
  try {
    // Save to localStorage (backend endpoint to be added later)
    localStorage.setItem('userInterests', JSON.stringify(interests))
    localStorage.setItem('hasCompletedOnboarding', 'true')
    return { success: true }
  } catch (error) {
    console.error('Error saving user interests:', error)
    throw error
  }
}

/**
 * Update user's interests (partial update)
 * @param {string[]} interests - Array of interest IDs
 * @returns {Promise<object>} Response
 */
export const updateUserInterests = async (interests) => {
  try {
    // Update localStorage (backend endpoint to be added later)
    localStorage.setItem('userInterests', JSON.stringify(interests))
    return { success: true }
  } catch (error) {
    console.error('Error updating user interests:', error)
    throw error
  }
}

/**
 * Get personalized news feed based on user interests
 * @param {object} options - Query options (page, limit, classification)
 * @returns {Promise<object>} News articles and metadata
 */
export const getPersonalizedFeed = async (options = {}) => {
  const { page = 1, limit = 6, filter = 'trending' } = options
  
  try {
    // Map frontend filter names to backend classification values
    const classificationMap = {
      'trending': undefined, // No filter for trending
      'verified': 'verified',
      'misleading': 'misleading',
      'fake': 'fake'
    }
    
    const classification = classificationMap[filter]
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    // Add classification filter if specified
    if (classification) {
      queryParams.append('classification', classification)
    }
    
    const response = await api.get(`${API_ENDPOINTS.GET_NEWS_FEED}?${queryParams}`)
    
    // Backend returns: { data: articles[], meta: { page, limit, total, totalPages, hasMore } }
    // Map to frontend format
    return {
      articles: response.data.map(mapBackendArticle),
      total: response.meta.total,
      hasMore: response.meta.hasMore,
      page: response.meta.page,
      limit: response.meta.limit,
    }
  } catch (error) {
    console.error('Error fetching personalized feed:', error)
    throw error
  }
}

/**
 * Get trending news (same as personalized feed without classification filter)
 * @param {object} options - Query options
 * @returns {Promise<object>} Trending news articles
 */
export const getTrendingNews = async (options = {}) => {
  const { page = 1, limit = 6 } = options
  
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    const response = await api.get(
      `${API_ENDPOINTS.GET_NEWS_FEED}?${queryParams}`,
      { requiresAuth: false }
    )
    
    // Map to frontend format
    return {
      articles: response.data.map(mapBackendArticle),
      total: response.meta.total,
      hasMore: response.meta.hasMore,
      page: response.meta.page,
      limit: response.meta.limit,
    }
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
    const response = await api.get(endpoint, { requiresAuth: true })
    return mapBackendArticle(response.data)
  } catch (error) {
    console.error('Error fetching article:', error)
    throw error
  }
}

/**
 * Verify a news article/claim
 * @param {object} data - { url?: string, article?: string }
 * @returns {Promise<object>} Verification result
 */
export const verifyArticle = async (data) => {
  try {
    const response = await api.post(API_ENDPOINTS.VERIFY_ARTICLE, data)
    // Backend returns the processed article with all verification data
    return mapBackendArticle(response.data)
  } catch (error) {
    console.error('Error verifying article:', error)
    throw error
  }
}

/**
 * Get current user data
 * @returns {Promise<object>} User data from Clerk
 */
export const getUserData = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_USER_ME)
    return response.data
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

/**
 * Map backend article format to frontend format
 * Backend: { headline, publisher, url, content, factual (0-100), bias (enum), classification, mbfc_publisher_match, ... }
 * Frontend: { id, headline, source, summary, credibilityScore, verdict, bias, biasScore, ... }
 */
function mapBackendArticle(backendArticle) {
  // Map bias enum to bias score
  const biasScoreMap = {
    'far-left': -80,
    'left': -40,
    'left-center': -20,
    'neutral': 0,
    'right-center': 20,
    'right': 40,
    'far-right': 80,
  }
  
  // Map classification to verdict
  const verdictMap = {
    'verified': 'True',
    'misleading': 'Misleading',
    'fake': 'Fake',
    'unverified': 'Unverified',
  }
  
  // Calculate source reputation from MBFC data
  // Formula: ((1 - abs(bias)) + factual) / 2
  let sourceReputation = 50; // Default fallback
  let publisherBiasScore = 0; // For display
  
  if (backendArticle.mbfc_publisher_match) {
    const mbfc = backendArticle.mbfc_publisher_match;
    
    // Handle different data sources and scales
    let factualScore = 0.5; // default
    let biasValue = 0; // default neutral
    
    // Pipeline returns mbfc_factuality_score (0-1 scale)
    if (typeof mbfc.mbfc_factuality_score === 'number') {
      factualScore = mbfc.mbfc_factuality_score;
    }
    // Database has factual (could be 0-1 or 0-100 scale)
    else if (typeof mbfc.factual === 'number') {
      // If factual is > 1, it's 0-100 scale, otherwise 0-1 scale
      factualScore = mbfc.factual > 1 ? mbfc.factual / 100 : mbfc.factual;
    }
    
    // Get bias value (database stores as -1 to 1)
    if (typeof mbfc.mbfc_bias_score === 'number') {
      biasValue = mbfc.mbfc_bias_score;
    } else if (typeof mbfc.bias === 'number') {
      biasValue = mbfc.bias;
    }
    
    // Calculate combined reputation: ((1 - abs(bias)) + factual) / 2
    const biasAdjustment = 1 - Math.abs(biasValue);
    sourceReputation = Math.round(((biasAdjustment + factualScore) / 2) * 100);
    
    // Convert bias to percentage for meter (0-100, where 0 is unbiased)
    publisherBiasScore = Math.round(Math.abs(biasValue) * 100);
  }
  
  // Get credibility score (article-level factuality)
  // Backend stores as 0-100 in factual field
  const credibilityScore = typeof backendArticle.factual === 'number' 
    ? Math.round(backendArticle.factual) 
    : sourceReputation; // Fallback to publisher reputation if article score missing
  
  // Get article bias score for display
  let articleBiasScore = publisherBiasScore; // Default to publisher bias
  
  // First check if we have articleBiasScore from pipeline (numeric -1 to 1)
  if (typeof backendArticle.articleBiasScore === 'number' && Math.abs(backendArticle.articleBiasScore) > 0.05) {
    // Only use article bias if it's significant (> 5%)
    articleBiasScore = Math.round(Math.abs(backendArticle.articleBiasScore) * 100);
  }
  // Then check bias_analysis for more detailed info
  else if (backendArticle.bias_analysis?.biasMagnitude !== undefined && Math.abs(backendArticle.bias_analysis.biasMagnitude) > 0.05) {
    // Only use if bias magnitude is significant (> 5%)
    articleBiasScore = Math.round(Math.abs(backendArticle.bias_analysis.biasMagnitude) * 100);
  }
  // Otherwise keep publisher bias (already set as default)
  
  // Get bias direction (left/right/neutral)
  let biasDirection = 'Neutral';
  if (backendArticle.bias) {
    biasDirection = capitalize(backendArticle.bias);
  } else if (backendArticle.bias_analysis?.biasDirection) {
    biasDirection = capitalize(backendArticle.bias_analysis.biasDirection);
  }
  
  return {
    id: backendArticle._id || backendArticle.id,
    headline: backendArticle.headline,
    summary: backendArticle.content?.substring(0, 200) + '...' || '', // First 200 chars as summary
    content: backendArticle.content,
    source: backendArticle.publisher,
    author: backendArticle.author || 'Unknown',
    publishedAt: backendArticle.published_at || backendArticle.createdAt,
    imageUrl: backendArticle.image_url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
    credibilityScore,
    verdict: verdictMap[backendArticle.classification] || 'Unverified',
    bias: biasDirection,
    biasScore: articleBiasScore,
    url: backendArticle.url,
    
    // Additional data from backend
    claims: backendArticle.claims || [],
    factCheckResults: backendArticle.fact_check_results || [],
    biasAnalysis: backendArticle.bias_analysis || {},
    mbfcPublisherMatch: backendArticle.mbfc_publisher_match,
    
    // Source reputation from MBFC data with formula
    sourceReputation,
  }
}

/**
 * Capitalize first letter of string
 */
function capitalize(str) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}
