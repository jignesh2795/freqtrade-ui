# FreqTrade UI

A professional, modern React-based UI for FreqTrade cryptocurrency trading bot.

![Phase](https://img.shields.io/badge/Phase-1_Complete-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-38bdf8)

## 📋 Project Status

**Phase 1: Core Infrastructure - COMPLETE** ✅

All core infrastructure has been implemented:
- ✅ API integration with FreqTrade backend
- ✅ WebSocket real-time updates
- ✅ State management with Zustand
- ✅ Routing with React Router
- ✅ Component library with shadcn/ui
- ✅ Utility functions for formatting, validation, calculations
- ✅ Common components (ErrorBoundary, Loading, EmptyState)
- ✅ Comprehensive testing completed

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd freqtrade-ui

# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The application will be available at http://localhost:5173

## 🏗️ Architecture

```
frontend/
├── src/
│   ├── app/           # Application setup and routing
│   ├── components/    # Reusable UI components
│   ├── features/      # Feature-specific modules
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API and WebSocket services
│   ├── store/         # Global state management
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── tests/             # Test files
```

## 📁 Key Directories

- `src/app/` - Application routing and layout
- `src/components/` - Shared UI components
- `src/features/` - Feature modules (bot, trades, strategies, etc.)
- `src/hooks/` - Custom React hooks
- `src/services/` - API and WebSocket integration
- `src/store/` - Global state management
- `src/utils/` - Utility functions for formatting, validation, calculations

## 🔧 Features

### Core Infrastructure
- REST API client for FreqTrade endpoints
- WebSocket integration for real-time updates
- Global state management with Zustand
- Responsive UI with Tailwind CSS
- Dark/light theme support
- Component library with shadcn/ui

### Utility Functions
- **Formatters**: Currency, numbers, dates, strings
- **Validators**: Email, URL, number validation
- **Calculations**: Profit, ROI, win rate, Sharpe ratio
- **Helpers**: Debounce, throttle, array utilities

### Common Components
- **ErrorBoundary**: Graceful error handling
- **Loading**: Loading indicators with fullscreen support
- **EmptyState**: Empty state displays with actions

## 📚 Documentation

- [Phase 1 Summary](docs/PHASE_1_SUMMARY.md) - Complete implementation details
- [API Endpoints](docs/API_ENDPOINTS.md) - Available API endpoints
- [Testing Checklist](docs/TESTING_CHECKLIST.md) - Comprehensive testing checklist
- [Testing Summary](docs/TESTING_SUMMARY.md) - Testing results and summary

## 🧪 Testing

Phase 1 testing has been completed with:
- Unit tests for all utility functions
- Component tests for common UI components
- Manual testing of development environment
- Build and compilation verification

See [TESTING_CHECKLIST.md](docs/TESTING_CHECKLIST.md) for detailed testing procedures and [TESTING_SUMMARY.md](docs/TESTING_SUMMARY.md) for results.

## 🛣️ Roadmap

### Phase 2: Feature Implementation (In Progress)
- Trading dashboard with real-time data
- Trade management interface
- Strategy configuration
- Backtesting tools
- Performance analytics
- Bot control panel

### Phase 3: Advanced Features
- Notifications system
- Advanced charting
- Multi-bot support
- Mobile optimization
- Export functionality

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FreqTrade](https://github.com/freqtrade/freqtrade) - The open source crypto trading bot
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS