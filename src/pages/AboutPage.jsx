import { motion } from 'framer-motion'
import { Shield, Target, Users, Brain, CheckCircle, Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'

const AboutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze news content, cross-reference multiple sources, and detect patterns of misinformation in real-time.'
    },
    {
      icon: Shield,
      title: 'Credibility Scoring',
      description: 'Every article receives a comprehensive credibility score based on source reputation, fact-checking, and bias analysis.'
    },
    {
      icon: Target,
      title: 'Source Verification',
      description: 'We verify the authenticity of sources and assess their historical accuracy to provide context for every piece of information.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built for Indians by Indians, with support for multiple regional languages and understanding of local context.'
    }
  ]

  const howItWorks = [
    {
      step: '1',
      title: 'Submit Content',
      description: 'Paste a news article URL, social media post, or WhatsApp message into our verification system.'
    },
    {
      step: '2',
      title: 'AI Analysis',
      description: 'Our AI analyzes the content, checks against verified databases, and examines linguistic patterns for manipulation.'
    },
    {
      step: '3',
      title: 'Cross-Reference',
      description: 'We cross-reference claims with trusted sources, official statements, and fact-checking organizations.'
    },
    {
      step: '4',
      title: 'Get Results',
      description: 'Receive a detailed credibility report with verdict, confidence score, and supporting evidence.'
    }
  ]

  const faqs = [
    {
      question: 'How accurate is the AI verification?',
      answer: 'Our AI system has been trained on millions of verified articles and achieves over 90% accuracy. However, we always recommend using human judgment and checking multiple sources for important decisions.'
    },
    {
      question: 'What languages do you support?',
      answer: 'We currently support English, Hindi, Tamil, Bengali, Telugu, Marathi, and Gujarati, with more regional languages being added regularly.'
    },
    {
      question: 'Is this service free?',
      answer: 'Yes! Satya is completely free to use. We believe access to truth and credible information should be available to everyone.'
    },
    {
      question: 'How do you detect bias?',
      answer: 'Our system analyzes word choice, framing, source selection, and presentation style to identify potential political or ideological bias in news content.'
    },
    {
      question: 'Can I report misinformation?',
      answer: 'Absolutely! Use our verification tool to submit suspicious content. If confirmed as misinformation, we add it to our database to help protect others.'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-12 h-12 text-primary" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4">About Satya</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Empowering Indians with AI-powered truth verification to combat misinformation and promote media literacy across the nation.
        </p>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 mb-16"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Our Mission</h2>
        <p className="text-lg text-center text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          In an era of information overload and digital misinformation, Satya stands as a beacon of truth. 
          We leverage cutting-edge artificial intelligence to analyze, verify, and provide credibility assessments 
          for news and claims circulating in Indian media and social platforms. Our goal is to create an informed 
          society where citizens can make decisions based on verified facts, not viral falsehoods.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Satya?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">How Satya Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center h-full">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
              {idx < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 group"
            >
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                <span>{faq.question}</span>
                <CheckCircle className="w-5 h-5 text-primary group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Have questions, feedback, or want to report misinformation? We'd love to hear from you.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">contact@satya.in</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">+91 1800-SATYA-IN</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bangalore, Karnataka, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full px-6 py-3 bg-primary hover:bg-blue-700 disabled:bg-green-500 text-white rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
              >
                {submitted ? '✓ Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AboutPage
