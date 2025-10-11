/**
 * Theme Configuration
 */

export const THEME_CONFIG = {
  colors: {
    primary: {
      light: '#3b82f6',
      dark: '#2563eb',
    },
    success: {
      light: '#22c55e',
      dark: '#16a34a',
    },
    danger: {
      light: '#ef4444',
      dark: '#dc2626',
    },
    warning: {
      light: '#f59e0b',
      dark: '#d97706',
    },
  },
  breakpoints: {
    mobile: 640,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    wide: 1536,
  },
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

export type ThemeMode = 'light' | 'dark';