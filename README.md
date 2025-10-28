# 🛡️ Satya - Indian Misinformation Detection Platform

A modern, responsive React frontend for AI-powered news verification and credibility analysis, designed specifically for the Indian context.

## ✨ Features

- **Real-time News Verification**: AI-powered fact-checking and credibility scoring
- **Multi-language Support**: English, Hindi, Tamil, Bengali, Telugu, Marathi, Gujarati
- **Bias Detection**: Political and ideological bias analysis with visual indicators
- **Source Credibility**: Reputation scoring for news sources
- **Interactive UI**: Smooth animations, dark mode, and responsive design
- **Smart Categorization**: Trending, Verified, Misleading, and Fake news tabs
- **Instant Verification**: Submit any claim or URL for immediate analysis

## 🚀 Tech Stack

- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Lucide React** - Beautiful icon library
- **Clerk** - Authentication & user management

## 📦 Installation

```bash
# Clone the repository
cd Satya_frontend

# Install dependencies
npm install

# Set up environment variables (see Authentication Setup below)
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
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
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── NewsCard.jsx
│   │   ├── CredibilityBadge.jsx
│   │   ├── BiasMeter.jsx
│   │   ├── UserButton.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ...
│   ├── pages/            # Route pages
│   │   ├── HomePage.jsx
│   │   ├── VerifyPage.jsx
│   │   ├── ArticleDetailsPage.jsx
│   │   └── AboutPage.jsx
│   ├── context/          # React context providers
│   │   └── ThemeContext.jsx
│   ├── utils/            # Utility functions
│   │   └── cn.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Key Components

### NewsCard
Displays article with credibility badge, bias meter, and source information.

### CredibilityBadge
Color-coded badge showing verification status (True/Misleading/Fake/Unverified).

### BiasMeter
Visual representation of political bias (Left/Neutral/Right).

### VerifyPage
Interactive form for instant claim verification with AI analysis.

## 🌐 Routes

- `/` - Home page with news feed
- `/verify` - Claim verification tool
- `/article/:id` - Detailed article view
- `/about` - About page with FAQs and contact form

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

## 🚧 Future Enhancements

- [x] User authentication (Clerk integration complete)
- [ ] Backend API integration
- [ ] Save/bookmark articles
- [ ] Advanced search filters
- [ ] Regional news customization
- [ ] WhatsApp/Telegram bot integration
- [ ] Browser extension
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



## 📧 Contact

For questions or feedback, reach out at contact@satya.in

---

Made with ❤️ for India
