# FreqTrade UI

A professional, modern React-based UI for FreqTrade cryptocurrency trading bot.

![Phase](https://img.shields.io/badge/Phase-1_Complete-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-38bdf8)

## 🎉 Phase 1 Complete!

Core infrastructure is ready with API integration, WebSocket real-time updates, state management, routing, and layout system.

## ✨ Current Features

### Phase 0 ✅
- ✅ FreqTrade API integration
- ✅ React + TypeScript setup
- ✅ Custom design system
- ✅ 15+ UI components
- ✅ Dark mode support
- ✅ Responsive design

### Phase 1 ✅
- ✅ Complete API service layer
- ✅ WebSocket real-time updates
- ✅ State management (Zustand)
- ✅ Routing system (React Router v6)
- ✅ Layout components (Sidebar, Header)
- ✅ Utility functions
- ✅ Error handling

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone repository
git clone <your-repo-url>
cd freqtrade-ui

# Run setup script
./scripts/setup.sh

# Or manual setup:

# 1. Setup FreqTrade
cd freqtrade
./setup.sh -i
source .env/bin/activate

# 2. Setup Frontend
cd ../frontend
npm install
```

### Running
```bash
# Option 1: Use start script
./scripts/start-dev.sh

# Option 2: Manual start

# Terminal 1 - Start FreqTrade
cd freqtrade
source .env/bin/activate
freqtrade trade --config user_data/configs/config.json

# Terminal 2 - Start Frontend
cd frontend
npm run dev
```

### Visit:

- Frontend: http://localhost:5173
- FreqTrade API: http://localhost:8080/api/v1
- API Docs: http://localhost:8080/docs

## 📚 Documentation

- [FreqTrade Setup](./docs/FREQTRADE_SETUP.md)
- [API Endpoints](./docs/API_ENDPOINTS.md)
- [Phase 0 Summary](./docs/PHASE_0_SUMMARY.md)
- [Phase 1 Summary](./docs/PHASE_1_SUMMARY.md)

## 🏗️ Architecture

### Frontend Structure
```
frontend/src/
├── app/                # App configuration and routing
├── components/
│   ├── ui/            # Base UI components (15+)
│   ├── layout/        # Layout components (Sidebar, Header)
│   └── common/        # Common utilities (ErrorBoundary, Loading)
├── features/          # Feature modules (8 pages)
├── services/
│   ├── api/           # API client
│   ├── freqtrade/     # FreqTrade services (6 modules)
│   └── websocket/     # WebSocket client
├── store/             # Zustand state management (5 stores)
├── hooks/             # Custom React hooks (5+)
├── utils/             # Utility functions (40+)
├── types/             # TypeScript definitions
└── styles/            # Global styles
```

### Key Services

- botService: Bot control operations
- tradeService: Trade management
- performanceService: Statistics and metrics
- strategyService: Strategy operations
- backtestService: Backtesting
- marketService: Market data

### State Stores

- botStore: Bot status and configuration
- tradeStore: Trades with filtering
- strategyStore: Strategy selection
- marketStore: Market data and pairs
- uiStore: UI preferences (persisted)

## 🎯 Development Roadmap

### Phase 0: Project Setup & Foundation (3 days) ✅
### Phase 1: Core Infrastructure (1 week) ✅
### Phase 2: MVP Features (2 weeks)

- Dashboard with real data
- Trade management
- Bot control panel
- Basic charting

### Phase 3: Advanced Features (4 weeks)
### Phase 4: Production Ready (1 week)

## 📊 Current Status

Phase 1 Complete:

- 80 commits across 4 branches
- 30+ components built
- 6 API service modules
- 5 state stores
- 9 routes defined
- 40+ utility functions
- 100% TypeScript coverage

## 🛠️ Tech Stack

### Frontend:

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Zustand (state management)
- React Router v6
- Axios (HTTP client)
- Socket.io Client (WebSocket)
- Lucide Icons
- Framer Motion

### Backend:

- FreqTrade
- Python
- SQLite

### Development:

- ESLint + Prettier
- Vitest (testing)
- Git (version control)

## 🧪 Testing
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build

# Run tests (coming in Phase 2)
npm run test
```

## 📝 Scripts
```bash
./scripts/setup.sh       # Initial setup
./scripts/start-dev.sh   # Start development environment
```

## 🤝 Contributing

This is a personal project. Contribution guidelines coming soon.

## 📄 License

TBD

## 🔗 Links

- [FreqTrade](https://www.freqtrade.io/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)

## 📈 Progress

- Phase 0: ████████████████████ 100% (3 days)
- Phase 1: ████████████████████ 100% (7 days)
- Phase 2: ░░░░░░░░░░░░░░░░░░░░   0% (2 weeks planned)
- Phase 3: ░░░░░░░░░░░░░░░░░░░░   0% (4 weeks planned)
- Phase 4: ░░░░░░░░░░░░░░░░░░░░   0% (1 week planned)

**Status:** Phase 1 Complete ✅  
**Last Updated:** [Current Date]  
**Next Milestone:** Phase 2 - MVP Features  
**Lines of Code:** ~5000+  
**Test Coverage:** TBD (Phase 2)