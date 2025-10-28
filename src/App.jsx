import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { UserPreferencesProvider } from './context/UserContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import VerifyPage from './pages/VerifyPage'
import ArticleDetailsPage from './pages/ArticleDetailsPage'
import AboutPage from './pages/AboutPage'
import SelectInterestsPage from './pages/SelectInterestsPage'
import SettingsPage from './pages/SettingsPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <UserPreferencesProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/select-interests" 
                element={
                  <ProtectedRoute>
                    <SelectInterestsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/verify" 
                element={
                  <ProtectedRoute>
                    <VerifyPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={<SettingsPage />} 
              />
              <Route path="/article/:id" element={<ArticleDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Layout>
        </Router>
      </UserPreferencesProvider>
    </ThemeProvider>
  )
}

export default App
