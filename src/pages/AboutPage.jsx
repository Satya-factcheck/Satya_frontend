import { motion } from 'framer-motion'
import { Shield, Target, Brain, CheckCircle, TrendingUp, AlertTriangle, Zap, Globe } from 'lucide-react'
import logo from '../assets/logo.svg'

const AboutPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Reputation Scoring',
      description: 'Each article displays a reputation score showing how credible or slanted the source is, helping you make informed decisions instantly.'
    },
    {
      icon: Target,
      title: 'Bias Detection',
      description: 'Visual bias meter reveals three levels: Unbiased, Slightly Biased, or Biased — making bias visible, not hidden.'
    },
    {
      icon: Zap,
      title: 'Instant Verification',
      description: 'Paste WhatsApp forwards or social media posts — get a clear verdict (✅ True, ⚠️ Misleading, ❌ Fake) with explanations in seconds.'
    },
    {
      icon: Globe,
      title: 'India-Focused',
      description: 'Built for Indians, aggregating trusted Indian and global outlets with plans for regional language support.'
    }
  ]

  const howItWorks = [
    {
      step: '1',
      title: 'Browse News Feed',
      description: 'Each card displays headline, summary, source, reputation score, and bias meter — see credibility at a glance.'
    },
    {
      step: '2',
      title: 'Click for Details',
      description: 'Open detailed credibility reports with verdict, fact-check references, and source reputation analysis.'
    },
    {
      step: '3',
      title: 'Verify Messages',
      description: 'Paste WhatsApp forwards or text directly — our AI checks against databases and fact-checking APIs.'
    },
    {
      step: '4',
      title: 'Get Clear Verdict',
      description: 'Receive instant results: ✅ True, ⚠️ Misleading, or ❌ Fake — with short explanations and evidence.'
    }
  ]

  const faqs = [
    {
      question: 'Why is SATYA needed?',
      answer: 'Fake news spreads six times faster than real information. A single misleading message can impact health choices, votes, and public safety. SATYA gives every Indian an instant way to verify truth before sharing.'
    },
    {
      question: 'How does SATYA verify claims?',
      answer: 'We analyze content against fact-checking APIs, trusted databases, and our own verification logs. Each claim receives a clear verdict (✅ True, ⚠️ Misleading, ❌ Fake) with explanations and evidence.'
    },
    {
      question: 'What makes SATYA different?',
      answer: 'SATYA is India-focused, aggregating trusted Indian and global outlets. We show reputation scores, bias meters, and make it easy to verify WhatsApp forwards and social media posts instantly.'
    },
    {
      question: 'Is SATYA free to use?',
      answer: 'Yes! SATYA is completely free. We believe access to truth and credible information should be available to everyone.'
    },
    {
      question: 'What are the future plans?',
      answer: 'We\'re launching a mobile app with WhatsApp/Twitter integration, expanding to regional languages, and introducing contrasting-perspective views to show how different outlets cover the same story.'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-16"
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Satya Logo" className="w-20 h-20" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          About SATYA
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Empowering citizens with AI-powered fact-checking to combat misinformation and promote truth in the digital age.
        </p>
      </motion.div>

      {/* The Problem */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">The Problem We're Solving</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border-l-4 border-red-500">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-red-600 dark:text-red-400" />
              <h3 className="text-xl font-bold">Viral Misinformation</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Fake news spreads <strong>6 times faster</strong> than real information on social media platforms.
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              <h3 className="text-xl font-bold">Real-World Impact</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Misleading messages about health, politics, and safety can reach <strong>hundreds of thousands</strong> before being debunked.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border-l-4 border-amber-500">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              <h3 className="text-xl font-bold">The Gap</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              People aren't the problem — the <strong>lack of verification and clarity</strong> is.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 text-center">
          <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed">
            Every day, millions of Indians scroll through social media and share shocking, emotional, or urgent content. 
            A single forwarded message can mislead hundreds. A false headline can polarize opinions. 
            A photoshopped image can ignite outrage <strong>before the truth even appears</strong>.
          </p>
        </div>
      </motion.div>

      {/* Our Solution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 mb-16"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Our Mission</h2>
        <p className="text-lg text-center text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
          We asked ourselves: <strong>What if we could give every Indian an instant truth detector?</strong> 
          Something that cuts through noise and shows only facts.
        </p>
        <p className="text-xl text-center font-semibold text-primary">
          That question became our mission. SATYA is a platform built to make truth go viral.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">What SATYA Does</h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          SATYA is an India-focused platform that detects, verifies, and explains the credibility of news and viral messages.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
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
        transition={{ delay: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">How SATYA Works</h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Simple, powerful, and built for real-time verification
        </p>
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

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 md:p-12"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Our Technology</h2>
        <p className="text-center text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Simple but powerful — designed for real-time updates and fast, reliable verification.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold mb-2">Frontend</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">React + Vite for lightning-fast user experience</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold mb-2">Backend</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Node.js/Express for robust API handling</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-bold mb-2">Database</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">MongoDB Atlas for article data & verification logs</p>
          </div>
        </div>
      </motion.div>

      {/* Impact & Future */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Impact & Future Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-primary">Our Impact</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              SATYA empowers people to <strong>verify first, share later</strong> — building a culture of informed, responsible digital citizens.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Misinformation isn't harmless — it shapes health choices, votes, and even safety. 
              SATYA gives citizens a simple way to tell fact from fiction, instantly.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-primary">What's Next</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span><strong>Mobile App:</strong> Seamless integration with WhatsApp and X (Twitter) for one-tap verification</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span><strong>Regional Languages:</strong> Expand to Hindi, Tamil, Bengali, and more Indian languages</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span><strong>Contrasting Perspectives:</strong> Show how different outlets cover the same story</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span><strong>India's Trust Layer:</strong> Become the go-to platform for transparency and accountability</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
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
    </div>
  )
}

export default AboutPage
