/**
 * API Configuration
 */

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  wsURL: import.meta.env.VITE_WS_URL || 'ws://localhost:8080/api/v1/ws',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

export const API_ENDPOINTS = {
  // Health & Status
  ping: '/ping',
  version: '/version',
  status: '/status',

  // Bot Control
  start: '/start',
  stop: '/stop',
  stopBuy: '/stopbuy',
  reload: '/reload_config',

  // Trades
  trades: '/trades',
  trade: (_id: number) => `/trade/${_id}`,
  tradeHistory: '/trades/history',
  forceSell: (_id: number) => `/forcesell`,
  forceBuy: '/forcebuy',

  // Performance
  profit: '/profit',
  performance: '/performance',
  balance: '/balance',
  stats: '/stats',

  // Strategy
  strategies: '/strategies',
  strategy: (_name: string) => `/strategy/${_name}`,
  availablePairs: '/available_pairs',
  whitelist: '/whitelist',

  // Backtesting
  backtest: '/backtest',
  backtestAbort: '/backtest/abort',

  // Logs
  logs: '/logs',
} as const;