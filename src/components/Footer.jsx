import { Link } from 'react-router-dom'
import { Shield, Twitter, Facebook, Instagram, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">Satya</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fighting misinformation with AI-powered fact-checking and credibility analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary">Home</Link></li>
              <li><Link to="/verify" className="text-gray-600 dark:text-gray-400 hover:text-primary">Verify Claims</Link></li>
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary">About Us</Link></li>
            </ul>
          </div>

          {/* Media Literacy */}
          <div>
            <h3 className="font-semibold mb-4">Media Literacy</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ Check multiple sources</li>
              <li>✓ Verify before sharing</li>
              <li>✓ Look for credible citations</li>
              <li>✓ Beware of emotional headlines</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Satya. All rights reserved. Made with ❤️ for India.
        </div>
      </div>
    </footer>
  )
}

export default Footer
