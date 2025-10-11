# FreqTrade UI

A professional, modern React-based UI for FreqTrade cryptocurrency trading bot.

![Phase](https://img.shields.io/badge/Phase-0_Complete-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-38bdf8)

## í¾‰ Phase 0 Complete!

Foundation is ready with FreqTrade integration, React setup, design system, and 15+ UI components.

## íº€ Quick Start

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
Running
bash# Option 1: Use start script
./scripts/start-dev.sh

# Option 2: Manual start

# Terminal 1 - Start FreqTrade
cd freqtrade
source .env/bin/activate
freqtrade trade --config user_data/configs/config.json

# Terminal 2 - Start Frontend
cd frontend
npm run dev
Visit:

Frontend: http://localhost:5173
FreqTrade API: http://localhost:8080/api/v1
API Docs: http://localhost:8080/docs

í³š Documentation

FreqTrade Setup
API Endpoints
Phase 0 Summary

âœ¨ Features
Completed (Phase 0)

âœ… FreqTrade API integration
âœ… React + TypeScript setup
âœ… Custom design system
âœ… 15+ UI components
âœ… Component showcase
âœ… Dark mode support
âœ… Responsive design
âœ… Smooth animations

In Progress (Phase 1)

íº§ API service layer
ï¿½ï¿½ WebSocket integration
íº§ State management
íº§ Routing setup
íº§ Layout components

Planned (Phase 2+)

í³‹ Dashboard
í³‹ Trading interface
í³‹ Strategy management
í³‹ Backtesting
í³‹ Configuration editor
ï¿½ï¿½ Analytics

í» ï¸ Tech Stack
Frontend:

React 18 + TypeScript
Vite
Tailwind CSS
Zustand (state)
React Router
Axios
Socket.io Client
Lucide Icons
Framer Motion

Backend:

FreqTrade
Python
SQLite

Development:

ESLint + Prettier
Vitest
Git

í³¦ Project Structure
freqtrade-ui/
â”œâ”€â”€ freqtrade/          # FreqTrade bot
â”œâ”€â”€ frontend/           # React app
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ components/ # UI components
â”‚   â”‚   â”œâ”€â”€ features/   # Feature modules
â”‚   â”‚   â”œâ”€â”€ services/   # API services
â”‚   â”‚   â”œâ”€â”€ store/      # State management
â”‚   â”‚   â”œâ”€â”€ hooks/      # Custom hooks
â”‚   â”‚   â””â”€â”€ types/      # TypeScript types
â”œâ”€â”€ docs/               # Documentation
â””â”€â”€ scripts/            # Utility scripts
í¾¯ Development Phases

 Phase 0: Project Setup & Foundation (3 days) âœ…
 Phase 1: Core Infrastructure (1 week)
 Phase 2: MVP Features (2 weeks)
 Phase 3: Advanced Features (4 weeks)
 Phase 4: Production Ready (1 week)

í³Š Current Status
Phase 0 Complete:

37 commits
3 branches merged
50+ files changed
15+ components built
100% type coverage

í´ Contributing
This is a personal project. Guidelines coming soon.
í³„ License
TBD
í´— Links

FreqTrade
React
Tailwind CSS


Status: Phase 0 Complete âœ…
Last Updated: [Current Date]
Next Milestone: Phase 1 - Core Infrastructure
