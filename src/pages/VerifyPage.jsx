import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Link as LinkIcon, Loader2, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import CredibilityBadge from '../components/CredibilityBadge'

const VerifyPage = () => {
  const [input, setInput] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState(null)

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsVerifying(true)
    
    // Simulate API call
    setTimeout(() => {
      setResult({
        verdict: 'Misleading',
        confidence: 78,
        summary: 'This claim contains partially accurate information but presents it in a misleading context.',
        explanation: 'While the core facts mentioned are based on real data, the interpretation and presentation significantly distort the original context. The claim cherry-picks specific statistics while ignoring contradictory evidence.',
        sources: [
          { name: 'Government Official Report', url: '#', credibility: 95 },
          { name: 'Independent Fact-Check Organization', url: '#', credibility: 90 },
          { name: 'Academic Research Paper', url: '#', credibility: 88 }
        ],
        relatedArticles: [
          'Understanding the Full Context Behind This Claim',
          'Expert Analysis: What the Data Really Shows',
          'Similar Claims Debunked in the Past'
        ]
      })
      setIsVerifying(false)
    }, 2000)
  }

  const handleReset = () => {
    setResult(null)
    setInput('')
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
                <div className="text-sm text-gray-500 dark:text-gray-400">Confidence</div>
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
                  Detailed Explanation
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{result.explanation}</p>
              </div>
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
