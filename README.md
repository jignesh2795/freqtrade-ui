# FreqTrade UI

A professional, modern React-based UI for FreqTrade cryptocurrency trading bot.

## 🚀 Features (Planned)

- **Real-time Dashboard** - Monitor bot performance and active trades
- **Strategy Management** - Create and manage trading strategies
- **Backtesting Interface** - Test strategies with historical data
- **Configuration Editor** - Easy bot configuration
- **Advanced Charts** - Professional trading charts with indicators
- **Bot Controls** - Start, stop, and control bot operations

## 📋 Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

## 🛠️ Setup

### Quick Setup
```bash
./scripts/setup.sh
```

### Manual Setup

#### Setup FreqTrade

```bash
cd freqtrade
./setup.sh -i
source .env/bin/activate
freqtrade create-userdir --userdir user_data
```

#### Configure API
Edit freqtrade/user_data/configs/config.json and ensure API is enabled.

#### Setup Frontend (Coming soon)

```bash
cd frontend
npm install
```

## 🏃 Running

### Development Mode
```bash
./scripts/start-dev.sh
```

### Manual Start

#### Start FreqTrade

```bash
cd freqtrade
source .env/bin/activate
freqtrade trade --config user_data/configs/config.json
```

#### Start Frontend (Coming soon)

```bash
cd frontend
npm run dev
```

## 📚 Documentation

- [FreqTrade Setup](docs/FREQTRADE_SETUP.md)
- [API Endpoints](docs/API_ENDPOINTS.md)
- [Day 2 Summary](docs/DAY_2_SUMMARY.md)
- [Day 3 TODO List](docs/DAY_3_TODO.md)

## 🗺️ Development Roadmap

- Phase 0: Project Setup
- Phase 1: Core Infrastructure
- Phase 2: MVP Features
- Phase 3: Advanced Features
- Phase 4: Production Ready

## 📝 Current Status
Phase 0: Project Setup - Complete

- FreqTrade integration ✅
- API configuration ✅
- Documentation ✅
- React setup ✅
- Design system ✅
- Base components ✅

## 🤝 Contributing
This is a personal project. Contributions guidelines will be added later.

## 📄 License
To be determined

## 🔗 Links

- [FreqTrade Documentation](https://www.freqtrade.io/en/stable/)
- [FreqTrade GitHub](https://github.com/freqtrade/freqtrade)