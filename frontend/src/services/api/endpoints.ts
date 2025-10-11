/**
 * API Endpoints
 * Centralized endpoint definitions
 */

export const endpoints = {
  // Health & Status
  health: {
    ping: '/ping',
    version: '/version',
  },

  // Bot Management
  bot: {
    status: '/status',
    start: '/start',
    stop: '/stop',
    stopBuy: '/stopbuy',
    reload: '/reload_config',
  },

  // Trade Management
  trades: {
    list: '/trades',
    get: (tradeId: number) => `/trade/${tradeId}`,
    history: '/trades/history',
    delete: (tradeId: number) => `/trades/${tradeId}`,
    forceEnter: '/forceenter',
    forceExit: '/forceexit',
  },

  // Performance & Stats
  performance: {
    profit: '/profit',
    performance: '/performance',
    stats: '/stats',
    balance: '/balance',
    daily: '/daily',
  },

  // Strategy Management
  strategy: {
    list: '/strategies',
    get: (strategyName: string) => `/strategy/${strategyName}`,
    availablePairs: '/available_pairs',
    pairCandles: '/pair_candles',
    pairHistory: '/pair_history',
  },

  // Configuration
  config: {
    get: '/show_config',
    whitelist: '/whitelist',
    blacklist: '/blacklist',
    reload: '/reload_config',
  },

  // Backtesting
  backtest: {
    start: '/backtest',
    status: '/backtest',
    abort: '/backtest/abort',
    history: '/backtest/history',
  },

  // Logs
  logs: {
    get: '/logs',
  },

  // System
  system: {
    ping: '/ping',
    version: '/version',
    health: '/health',
    sysinfo: '/sysinfo',
  },
} as const;

export default endpoints;