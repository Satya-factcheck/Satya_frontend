import { API_BASE_URL, REQUEST_TIMEOUT } from '../config/api'

/**
 * API Client for making HTTP requests
 * Handles authentication, error handling, and response formatting
 */

class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

/**
 * Get auth token from localStorage
 * @returns {string|null}
 */
const getAuthToken = () => {
  try {
    return localStorage.getItem('token')
  } catch (error) {
    console.error('Error getting auth token:', error)
    return null
  }
}

/**
 * Make an API request
 * @param {string} endpoint - API endpoint path
 * @param {object} options - Fetch options
 * @returns {Promise<any>}
 */
export const apiRequest = async (endpoint, options = {}) => {
  const { 
    method = 'GET', 
    body, 
    headers = {},
    requiresAuth = true,
    timeout = REQUEST_TIMEOUT,
    ...restOptions 
  } = options

  try {
    // Build request headers
    const requestHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    }

    // Add auth token if required
    if (requiresAuth) {
      const token = getAuthToken()
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`
      }
    }

    // Build request config
    const requestConfig = {
      method,
      headers: requestHeaders,
      ...restOptions,
    }

    // Add body for non-GET requests
    if (body && method !== 'GET') {
      requestConfig.body = JSON.stringify(body)
    }

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    // Make the request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...requestConfig,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // Parse response
    const contentType = response.headers.get('content-type')
    let data = null

    if (contentType?.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    // Handle errors
    if (!response.ok) {
      throw new ApiError(
        data?.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        data
      )
    }

    return data

  } catch (error) {
    // Handle timeout
    if (error.name === 'AbortError') {
      throw new ApiError('Request timeout', 408, null)
    }

    // Handle network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new ApiError('Network error - please check your connection', 0, null)
    }

    // Re-throw API errors
    if (error instanceof ApiError) {
      throw error
    }

    // Handle unknown errors
    throw new ApiError(error.message || 'An unexpected error occurred', 500, null)
  }
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  get: (endpoint, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'GET' }),
  
  post: (endpoint, body, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'POST', body }),
  
  put: (endpoint, body, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'PUT', body }),
  
  patch: (endpoint, body, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'PATCH', body }),
  
  delete: (endpoint, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'DELETE' }),
}

export { ApiError }
