# 🛡️ Satya - Indian Misinformation Detection Platform (Frontend)

A modern, responsive React frontend for AI-powered news verification and credibility analysis, integrated with the Satya backend API and article processing pipeline.

## ✨ Feature

- **Real-time News Verification**: AI-powered fact-checking using Gemini, Google Fact Check, and HuggingFace APIs
- **Personalized News Feed**: Clerk-authenticated feed with pagination and filtering (verified/misleading/fake)
- **Smart Search**: Search across article headlines, content, and publishers
- **Instant Verification**: Submit URLs or text claims for comprehensive analysis
- **Bias Detection**: Visual bias meter with HuggingFace-powered analysis
- **Source Reputation**: MBFC-based publisher credibility scoring (0-100)
- **Verdict System**: Articles classified as Verified (green), Misleading (yellow), or Fake (red)
- **Interactive UI**: Smooth animations, dark mode, and responsive design
- **User Authentication**: Clerk-based auth with protected routes
- **Article Details**: Full article view with fact-check results and extracted claims

## 🚀 Tech Stack

- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router v6** - Client-side routing with protected routes
- **Clerk** - Authentication & user management
- **Lucide React** - Beautiful, consistent icon library
- **Context API** - State management (UserContext, ThemeContext)
- **Axios/Fetch** - HTTP client for backend API integration

## 📦 Installation

```bash
# Navigate to frontend directory
cd Satya_frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Clerk keys and backend URL

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API URL (update with your deployed backend)
VITE_API_BASE_URL=http://localhost:4000/api

# Clerk Authentication Keys (get from https://dashboard.clerk.com)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

**Production values:**
```env
VITE_API_BASE_URL=https://satya-backend.up.railway.app/api
VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
```

## 🔐 Authentication Setup

This project uses **Clerk** for authentication. Follow these steps to set up:

### 1. Create a Clerk Account
1. Go to [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Sign up for a free account
3. Create a new application
4. Choose your preferred authentication methods (Email, Google, GitHub, etc.)

### 2. Get Your API Keys
1. In the Clerk Dashboard, go to **API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)

### 3. Configure Environment Variables
Create a `.env` file in the root directory:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

Replace `your_actual_key_here` with the key you copied from Clerk.

### 4. Configure Sign-In Redirect URLs
In the Clerk Dashboard under **Sign-in & Sign-up**:
- Add `http://localhost:5173` to the Redirect URLs (for development)
- Add your production URL for deployed environments

### 5. Authentication Features
- **Protected Routes**: The `/verify` page requires authentication
- **User Button**: Click your avatar in the navbar to access profile, settings, and sign out
- **Sign In Button**: Located in the navbar for unauthenticated users
- **Automatic Redirects**: Unauthenticated users are redirected to sign-in when accessing protected pages

### Protected Routes
To protect a new route, wrap it with the `ProtectedRoute` component:

```jsx
import ProtectedRoute from './components/ProtectedRoute'

<Route 
  path="/your-route" 
  element={
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  } 
/>
```

## 🏗️ Project Structure

```
Satya_frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation with search & autocomplete
│   │   ├── Sidebar.jsx      # Sidebar navigation
│   │   ├── Footer.jsx       # Footer with media literacy tips
│   │   ├── NewsCard.jsx     # Article card with reputation score
│   │   ├── BiasMeter.jsx    # Visual bias indicator (0-100%)
│   │   ├── InterestSelector.jsx  # Interest selection UI
│   │   ├── UserButton.jsx   # User profile button (Clerk)
│   │   ├── ProtectedRoute.jsx    # Auth route wrapper
│   │   ├── OnboardingRedirect.jsx # Onboarding flow handler
│   │   ├── LoadingSkeleton.jsx   # Loading placeholder
│   │   └── Layout.jsx       # Main layout wrapper
│   ├── pages/               # Route pages
│   │   ├── HomePage.jsx     # Main news feed with pagination
│   │   ├── VerifyPage.jsx   # Claim verification tool
│   │   ├── ArticleDetailsPage.jsx # Detailed article view
│   │   ├── AboutPage.jsx    # About and FAQ
│   │   ├── SelectInterestsPage.jsx # Onboarding interests
│   │   └── SettingsPage.jsx # User settings
│   ├── context/             # React context providers
│   │   ├── UserContext.jsx  # User preferences & interests
│   │   └── ThemeContext.jsx # Dark/light theme
│   ├── services/            # API integration layer
│   │   ├── apiClient.js     # Axios wrapper with auth & retry
│   │   └── userService.js   # API service functions
│   ├── utils/               # Utility functions
│   │   └── cn.js            # Tailwind class merger
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
│   └── assets/              # PNG icons for interests
├── BACKEND_API_DOCUMENTATION.md  # Backend team guide
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Key Components

### NewsCard
Displays article with source reputation score badge, bias meter, and verdict tag.
- **Source Reputation**: 90-100 (Excellent), 70-89 (Good), 50-69 (Fair), 0-49 (Low)
- **Verdict Tags**: Green (Verified), Yellow (Misleading), Red (Fake)

### BiasMeter
Visual progress bar showing bias level (0-100%):
- **0-30%**: Unbiased (Green)
- **31-60%**: Slightly Biased (Amber)
- **61-100%**: Biased (Red)

### InterestSelector
Clean, minimalist interest selection with animated counter and progress bar. Used in onboarding and settings.

### Navbar
Navigation with smart search:
- **Autocomplete**: Shows user's interests + trending searches
- **Search Filtering**: Real-time article filtering
- **Theme Toggle**: Switch between light/dark mode
- **User Button**: Profile and settings access

### HomePage (Pagination Implemented ✅)
Main feed with complete pagination:
- **Load More Button**: Fetches next page of articles
- **Loading States**: Shows spinner while loading
- **Article Counter**: "Showing X of Y articles"
- **End of Feed**: Displays message when no more articles
- **Auto Reset**: Returns to page 1 when filters change

## 🔄 Pagination Details

The frontend implements **infinite scroll-style pagination**:

### Frontend Behavior
```javascript
// Initial load: 20 articles (page 1)
// Click "Load More": Appends 20 more articles (page 2)
// Continues until hasMore: false
```

### Expected Backend Response
```json
{
  "success": true,
  "data": {
    "articles": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 15,
      "totalArticles": 287,
      "hasMore": true,
      "limit": 20
    }
  }
}
```

### Key Features
- ✅ Appends new articles to existing list
- ✅ Shows loading spinner on "Load More"
- ✅ Resets to page 1 when switching tabs/filters
- ✅ Displays article count
- ✅ Handles end of results gracefully

See `BACKEND_API_DOCUMENTATION.md` for complete API specs.

## 🔍 Search & Autocomplete

### Search Features
- **URL-based**: Uses `useSearchParams` for shareable search URLs
- **Real-time Filtering**: Filters by headline, summary, source, author
- **Result Count**: Shows number of matching articles
- **Clear Button**: Quick search reset

### Autocomplete Suggestions
1. **User Interests** (Pink Heart icon) - Your selected topics
2. **Trending Searches** (Blue TrendingUp icon) - Popular queries
3. **Smart Filtering** - Shows relevant suggestions as you type

## 🌐 Routes

- `/` - Home page with personalized news feed
- `/verify` - Claim verification tool (Protected)
- `/article/:id` - Detailed article view
- `/about` - About page with FAQs
- `/select-interests` - Onboarding interest selection (Protected)
- `/settings` - User settings and preferences (Protected)

## 🎯 User Flow

### First Time User
1. Sign up via Clerk authentication
2. Select interests (3-12 topics)
3. Redirected to personalized feed
4. Interests appear in search autocomplete

### Returning User
1. Sign in automatically
2. See personalized feed based on interests
3. Use search with interest suggestions
4. Filter by Trending/Verified/Misleading/Fake
5. Load more articles via pagination

## 🎯 Design Philosophy

- **Clean & Minimal**: Focus on content and readability
- **Accessible**: ARIA labels, keyboard navigation, high contrast
- **Performance**: Lazy loading, code splitting, optimized images
- **Responsive**: Mobile-first design that works on all devices
- **Engaging**: Smooth animations and interactive elements

## 🔧 Configuration

### Theme Colors (tailwind.config.js)
```javascript
colors: {
  primary: '#2563EB',    // Blue
  accent: '#FACC15',     // Yellow
  background: '#F9FAFB', // Light gray
}
```

### Dark Mode
Toggle between light and dark themes using the moon/sun icon in the navbar.

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Backend Integration

### API Documentation
See **`BACKEND_API_DOCUMENTATION.md`** for complete API specifications including:
- Authentication endpoints
- News feed APIs with pagination
- Search & autocomplete
- Verification service
- Data models and schemas
- Error handling
- Rate limiting

### API Client
Frontend includes `apiClient.js` with:
- Automatic JWT token injection (Clerk)
- Retry logic (3 attempts, exponential backoff)
- Request/response interceptors
- Centralized error handling

### Available Interests
```javascript
['technology', 'politics', 'sports', 'entertainment', 
 'business', 'science', 'health', 'environment', 
 'education', 'world-news', 'local-news', 'fact-checking']
```

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build and preview production
npm run build
npm run preview

# Check for errors
npm run lint
```

## 🚧 Development Status

### ✅ Completed Features
- [x] User authentication (Clerk)
- [x] Interest selection & onboarding
- [x] Personalized news feed
- [x] Search with autocomplete
- [x] Pagination (infinite scroll style)
- [x] Filter tabs (Trending/Verified/Misleading/Fake)
- [x] Bias meter (0-100% scale)
- [x] Source reputation scores
- [x] Dark mode with theme toggle
- [x] Responsive design
- [x] API integration layer prepared

### 🔄 In Progress
- [ ] Backend API connection
- [ ] Real-time verification results
- [ ] Article detail pages

### 📋 Future Enhancements
- [ ] Save/bookmark articles
- [ ] Share to social media
- [ ] Advanced search filters
- [ ] User analytics dashboard
- [ ] WhatsApp/Telegram bot integration
- [ ] Browser extension
- [ ] Mobile app (React Native)



## � Data Models

### Article Object
```javascript
{
  id: string,
  headline: string,
  summary: string,
  source: string,
  sourceReputationScore: number,  // 0-100
  author: string,
  publishedAt: string,           // ISO 8601
  imageUrl: string,
  verdict: 'True' | 'Misleading' | 'Fake',
  biasScore: number,             // 0-100 (absolute value)
  category: string,
  tags: string[]
}
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563EB) - Links, buttons
- **Success**: Green (Emerald) - Verified, Unbiased
- **Warning**: Amber/Yellow - Misleading, Slightly Biased
- **Danger**: Red (Rose) - Fake, Biased
- **Background**: Gradient dark (gray-800 → gray-900 → slate-900)

### Typography
- **Font Family**: System font stack (Inter-like)
- **Headings**: Bold, larger sizes
- **Body**: Regular weight, readable line height

### Dark Mode
- Toggle in navbar (moon/sun icon)
- Persisted in ThemeContext
- Tailwind dark: variants throughout

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact & Support

For questions or feedback:
- **Repository**: [github.com/imajij/Satya_frontend](https://github.com/imajij/Satya_frontend)
- **Issues**: Report bugs or request features via GitHub Issues
- **Backend Team**: See `BACKEND_API_DOCUMENTATION.md`

---

## 📄 License

This project is for educational and social good purposes.

---

Made with ❤️ for India 🇮🇳
