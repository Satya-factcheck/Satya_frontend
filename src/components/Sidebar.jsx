import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, MapPin, Globe } from 'lucide-react'
import { cn } from '../utils/cn'

const Sidebar = ({ isOpen, onClose }) => {
  const categories = [
    { id: 'politics', name: 'Politics', icon: Globe },
    { id: 'health', name: 'Health', icon: TrendingUp },
    { id: 'technology', name: 'Technology', icon: Globe },
    { id: 'entertainment', name: 'Entertainment', icon: TrendingUp },
  ]

  const regions = [
    'National', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className={cn(
              "fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-40 overflow-y-auto",
              "lg:static lg:translate-x-0"
            )}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={onClose} className="lg:hidden" aria-label="Close">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                  CATEGORIES
                </h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <cat.icon className="w-5 h-5 text-primary" />
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Regional News */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                  REGIONAL NEWS
                </h3>
                <div className="space-y-2">
                  {regions.map(region => (
                    <button
                      key={region}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{region}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
