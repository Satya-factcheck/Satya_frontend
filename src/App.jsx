import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import VerifyPage from './pages/VerifyPage'
import ArticleDetailsPage from './pages/ArticleDetailsPage'
import AboutPage from './pages/AboutPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/verify" 
              element={
                <ProtectedRoute>
                  <VerifyPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/article/:id" element={<ArticleDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
