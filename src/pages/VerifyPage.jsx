import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Link as LinkIcon, Loader2, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import CredibilityBadge from '../components/CredibilityBadge'
import BiasMeter from '../components/BiasMeter'
import { verifyArticle } from '../services/userService'

const VerifyPage = () => {
  const [input, setInput] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsVerifying(true)
    setError(null)
    
    try {
      // Determine if input is URL or plain text
      const isUrl = input.trim().startsWith('http://') || input.trim().startsWith('https://')
      
      const requestData = isUrl 
        ? { url: input.trim() }
        : { article: input.trim() }
      
      // Call backend API
      const response = await verifyArticle(requestData)
      
      // Map backend response to result format
      setResult({
        article: response,
        verdict: response.verdict,
        confidence: response.credibilityScore,
        summary: `This ${isUrl ? 'article' : 'claim'} has been analyzed for credibility and bias.`,
        explanation: generateExplanation(response),
        sources: generateSources(response),
        relatedClaims: response.claims || [],
      })
    } catch (err) {
      console.error('Verification error:', err)
      setError(err.message || 'Failed to verify the claim. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const generateExplanation = (article) => {
    const parts = []
    
    if (article.factCheckResults && article.factCheckResults.length > 0) {
      parts.push(`Found ${article.factCheckResults.length} fact-check results from verified sources.`)
    }
    
    if (article.mbfcPublisherMatch) {
      parts.push(`Publisher "${article.source}" has a credibility rating of ${article.sourceReputation}/100.`)
    }
    
    if (article.biasAnalysis && article.biasAnalysis.overall_bias) {
      parts.push(`Bias analysis shows ${article.biasAnalysis.overall_bias} leaning.`)
    }
    
    if (article.claims && article.claims.length > 0) {
      parts.push(`Extracted ${article.claims.length} verifiable claims from the content.`)
    }
    
    return parts.join(' ') || 'Analysis completed with available data.'
  }

  const generateSources = (article) => {
    const sources = []
    
    if (article.mbfcPublisherMatch) {
      sources.push({
        name: `MBFC Analysis - ${article.source}`,
        url: article.mbfcPublisherMatch.url || '#',
        credibility: article.sourceReputation,
      })
    }
    
    if (article.factCheckResults) {
      article.factCheckResults.slice(0, 3).forEach(result => {
        sources.push({
          name: result.publisher?.site || 'Fact-Check Source',
          url: result.url || '#',
          credibility: 85,
        })
      })
    }
    
    return sources
  }

  const handleReset = () => {
    setResult(null)
    setInput('')
    setError(null)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header - Only show when no result */}
      {!result && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Verify Claims Instantly</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Paste a news link, WhatsApp message, or any claim to check its credibility
          </p>
        </motion.div>
      )}

      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
        >
          <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </motion.div>
      )}

      {/* Input Form - Only show when no result */}
      {!result && (
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleVerify}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="mb-4">
            <label htmlFor="claim-input" className="block text-sm font-medium mb-2">
              Enter claim or paste URL
            </label>
            <div className="relative">
              <textarea
                id="claim-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Example: 'Government announces free laptops for all students' or paste a news article URL..."
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                disabled={isVerifying}
              />
              <LinkIcon className="absolute top-3 right-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isVerifying || !input.trim()}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-primary hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl font-semibold transition-colors disabled:cursor-not-allowed"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Verify Now</span>
              </>
            )}
          </button>
        </motion.form>
      )}

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Verdict Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Verification Result</h2>
                <CredibilityBadge verdict={result.verdict} size="lg" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary mb-1">{result.confidence}%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Credibility Score</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-primary" />
                  Summary
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{result.summary}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                  Detailed Analysis
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{result.explanation}</p>
              </div>

              {/* Bias Meter */}
              {result.article && (
                <div>
                  <h3 className="font-semibold mb-3">Bias Analysis</h3>
                  <BiasMeter bias={result.article.bias} score={result.article.biasScore} />
                </div>
              )}

              {/* Sources */}
              {result.sources && result.sources.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Verified Sources</h3>
                  <div className="space-y-2">
                    {result.sources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex-1"
                        >
                          {source.name}
                        </a>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {source.credibility}% credible
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Claims */}
              {result.relatedClaims && result.relatedClaims.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Extracted Claims</h3>
                  <div className="space-y-2">
                    {result.relatedClaims.slice(0, 5).map((claim, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {claim.claim || claim}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Verify Another Button */}
          <div className="text-center pt-4">
            <button
              onClick={handleReset}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-primary hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
            >
              <Send className="w-5 h-5" />
              <span>Verify Another Claim</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default VerifyPage
