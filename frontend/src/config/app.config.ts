/**
 * Application Configuration
 */

export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'FreqTrade UI',
  version: import.meta.env.VITE_APP_VERSION || '0.1.0',
  environment: import.meta.env.VITE_ENV || 'development',
  enableMockData: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
  enableDevTools: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true',
} as const;

export const UI_CONFIG = {
  sidebar: {
    defaultCollapsed: false,
    collapsedWidth: 64,
    expandedWidth: 256,
  },
  theme: {
    defaultTheme: 'dark',
    availableThemes: ['light', 'dark'] as const,
  },
  notifications: {
    position: 'top-right',
    duration: 5000,
    maxVisible: 3,
  },
  table: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
  },
  chart: {
    defaultTimeframe: '1h',
    availableTimeframes: ['1m', '5m', '15m', '30m', '1h', '4h', '1d'],
    defaultIndicators: ['EMA', 'RSI'],
  },
} as const;

export const REFRESH_INTERVALS = {
  fast: 1000,      // 1 second
  normal: 5000,    // 5 seconds
  slow: 30000,     // 30 seconds
  veryLow: 60000,  // 1 minute
} as const;