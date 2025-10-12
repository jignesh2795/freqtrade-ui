# FreqTrade UI

A professional, modern React-based UI for FreqTrade cryptocurrency trading bot.

![Phase](https://img.shields.io/badge/Phase-2_Complete-success)
![MVP](https://img.shields.io/badge/MVP-Delivered-brightgreen)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-38bdf8)

## 🎉 Phase 2 Complete - MVP Delivered!

All core features are now functional with real FreqTrade integration. Dashboard, Trade Management, Bot Control, and Charts are production-ready.

## ✨ Current Features

### Phase 0 ✅ (Days 1-3)
- ✅ FreqTrade API integration
- ✅ React + TypeScript setup
- ✅ Custom design system
- ✅ 15+ UI components
- ✅ Dark mode support

### Phase 1 ✅ (Days 4-7)
- ✅ Complete API service layer
- ✅ WebSocket real-time updates
- ✅ State management (Zustand)
- ✅ Routing system
- ✅ Layout components

### Phase 2 ✅ (Days 8-14) - MVP
- ✅ **Dashboard** - 8 widgets, 2 charts, real-time metrics
- ✅ **Trade Management** - Full CRUD, filtering, pagination
- ✅ **Bot Control** - Start/stop, logs, settings, monitoring
- ✅ **Charts** - Candlesticks, volume, trade markers, MA indicators

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
```

```bash
# Start both services
./scripts/start-dev.sh
```

Or manually:

```bash
# Terminal 1 - FreqTrade
cd freqtrade
source .env/bin/activate
freqtrade trade --config user_data/configs/config.json

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Access:

- Frontend: http://localhost:5173
- FreqTrade API: http://localhost:8080/api/v1

## 📚 Documentation

- [Phase 0 Summary](docs/PHASE_0_SUMMARY.md) - Setup & Foundation
- [Phase 1 Summary](docs/PHASE_1_SUMMARY.md) - Core Infrastructure
- [Phase 2 Summary](docs/PHASE_2_SUMMARY.md) - MVP Features
- [API Endpoints](docs/API_ENDPOINTS.md) - Available API endpoints
- [Trade Management](docs/TRADE_MANAGEMENT.md) - Trade system documentation
- [Charts System](docs/CHARTS.md) - Charting system documentation

## 🎯 Features in Detail

### Dashboard

- Performance summary cards (profit, trades, win rate)
- Active trades widget with auto-refresh
- Recent activity feed
- Bot status with controls
- Daily profit chart
- Pair performance ranking
- Exit reasons statistics

### Trade Management

- Trade table with sorting
- Open/Closed tabs
- Advanced filtering (pair, profit range)
- Pagination
- Trade details modal
- Force entry/exit
- Search functionality
- Auto-refresh (10s)

### Bot Control

- Start/Stop with confirmations
- Reload configuration
- Real-time log viewer
- Log filtering by level
- Download logs
- Quick settings editor
- System resource monitor
- Auto-refresh (5s)

### Charts

- Candlestick charts (Lightweight Charts)
- Volume histogram
- Trade entry/exit markers
- Moving averages (SMA, EMA)
- Timeframe selector (1m-1d)
- Pair selector
- Price info display
- Toggleable volume and indicators

## 🏗️ Architecture

```
frontend/src/
├── features/
│   ├── dashboard/      # 8 widgets, 2 charts
│   ├── trades/         # Complete trade management
│   ├── botControl/     # Bot operations
│   └── charts/         # Trading charts
├── components/
│   ├── ui/            # 15+ base components
│   ├── layout/        # Sidebar, Header, MainLayout
│   ├── charts/        # Chart components
│   └── common/        # Shared utilities
├── services/          # API & WebSocket
├── store/             # State management (5 stores)
└── hooks/             # Custom React hooks
```

## 📊 Progress Tracker

```
Phase 0: ████████████████████ 100% ✅ (3 days)
Phase 1: ████████████████████ 100% ✅ (7 days)
Phase 2: ████████████████████ 100% ✅ (14 days)
Phase 3: ░░░░░░░░░░░░░░░░░░░░   0%  (4 weeks planned)
Phase 4: ░░░░░░░░░░░░░░░░░░░░   0%  (1 week planned)
```

## 📈 Current Status

Phase 2 Complete:

- 136 total commits
- 4 pages fully functional
- 22+ feature components
- 50+ features working
- MVP delivered ✅

## 🛠️ Tech Stack

### Frontend:

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Zustand (state)
- React Router v6
- Lightweight Charts
- Recharts
- Socket.io Client

### Backend:

- FreqTrade
- Python
- SQLite

## 🎯 Development Roadmap

### Phase 3: Advanced Features (4 weeks)

- Strategy builder
- Advanced backtesting
- Configuration editor
- Mobile optimization
- Advanced indicators
- Alert system

### Phase 4: Production Ready (1 week)

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

## 🤝 Contributing

This is a personal project. Contribution guidelines coming in Phase 4.

## 📄 License

TBD

## 🔗 Links

- [FreqTrade](https://github.com/freqtrade/freqtrade)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lightweight Charts](https://tradingview.github.io/lightweight-charts/)

## 📅 Status

- Status: Phase 2 Complete - MVP Delivered ✅
- Last Updated: 2025-10-12
- Next Milestone: Phase 3 - Advanced Features
- Total Development Time: 96 hours across 24 days