/**
 * API Configuration
 * Update these values when the backend team provides the endpoints
 */

// Base URL for the API - update this when backend is deployed
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

// API Endpoints
export const API_ENDPOINTS = {
  // User interests
  GET_USER_INTERESTS: '/user/interests',
  UPDATE_USER_INTERESTS: '/user/interests',
  
  // News articles
  GET_NEWS_FEED: '/news/feed',
  GET_TRENDING: '/news/trending',
  GET_ARTICLE_BY_ID: '/news/:id',
  VERIFY_ARTICLE: '/news/verify',
  
  // User profile
  GET_USER_PROFILE: '/user/profile',
  UPDATE_USER_PROFILE: '/user/profile',
}

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
}

// Request timeout (ms)
export const REQUEST_TIMEOUT = 30000

// Retry configuration
export const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // ms
}
