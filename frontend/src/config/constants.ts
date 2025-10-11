/**
 * Application Constants
 */

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  TRADES: '/trades',
  STRATEGIES: '/strategies',
  BACKTESTING: '/backtesting',
  CONFIGURATION: '/configuration',
  BOT_CONTROL: '/bot-control',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
} as const;

export const STORAGE_KEYS = {
  THEME: 'freqtrade-ui-theme',
  SIDEBAR_COLLAPSED: 'freqtrade-ui-sidebar-collapsed',
  USER_PREFERENCES: 'freqtrade-ui-preferences',
  API_TOKEN: 'freqtrade-ui-token',
} as const;

export const BOT_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  ERROR: 'error',
  RUNNING: 'running',
  STOPPED: 'stopped',
} as const;

export const TRADE_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  PENDING: 'pending',
} as const;

export const TIMEFRAMES = [
  '1m', '3m', '5m', '15m', '30m',
  '1h', '2h', '4h', '6h', '8h',
  '12h', '1d', '3d', '1w'
] as const;

export const CHART_INDICATORS = [
  'SMA', 'EMA', 'RSI', 'MACD', 'BB', 'STOCH',
  'ATR', 'ADX', 'CCI', 'MFI'
] as const;

export const REFRESH_INTERVALS = {
  fast: 5000,    // 5 seconds
  medium: 15000, // 15 seconds
  slow: 30000,   // 30 seconds
} as const;