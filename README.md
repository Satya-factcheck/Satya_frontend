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

## 📦 Installation

```bash
# Clone the repository
cd Satya_frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
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

- [ ] Backend API integration
- [ ] User authentication
- [ ] Save/bookmark articles
- [ ] Advanced search filters
- [ ] Regional news customization
- [ ] WhatsApp/Telegram bot integration
- [ ] Browser extension
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

For questions or feedback, reach out at contact@satya.in

---

Made with ❤️ for India
