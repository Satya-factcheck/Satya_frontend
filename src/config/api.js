/**
 * API Configuration
 * Updated to match backend API routes (port 4000)
 */

// Base URL for the API - points to backend service
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

// API Endpoints - Updated to match backend routes exactly
export const API_ENDPOINTS = {
  // User endpoints
  GET_USER_ME: '/user/me',
  
  // News feed endpoints
  GET_NEWS_FEED: '/feed',
  GET_ARTICLE_BY_ID: '/feed/:id',
  
  // Verification endpoints
  VERIFY_ARTICLE: '/verify',
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
