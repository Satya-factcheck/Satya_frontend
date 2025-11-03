import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { UserPreferencesProvider } from './context/UserContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import VerifyPage from './pages/VerifyPage'
import ArticleDetailsPage from './pages/ArticleDetailsPage'
import AboutPage from './pages/AboutPage'
import SelectInterestsPage from './pages/SelectInterestsPage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import OAuthCallbackPage from './pages/OAuthCallbackPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserPreferencesProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/auth/verify" element={<EmailVerificationPage />} />
                <Route path="/auth/callback" element={<OAuthCallbackPage />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
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
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
