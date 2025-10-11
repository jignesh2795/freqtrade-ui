import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';

// Lazy load pages
const Dashboard = lazy(() => import('@/features/dashboard/Dashboard'));
const Trades = lazy(() => import('@/features/trades/TradesPage'));
const Strategies = lazy(() => import('@/features/strategies/StrategiesPage'));
const Backtesting = lazy(() => import('@/features/backtesting/BacktestingPage'));
const Configuration = lazy(() => import('@/features/configuration/ConfigurationPage'));
const BotControl = lazy(() => import('@/features/botControl/BotControlPage'));
const Analytics = lazy(() => import('@/features/analytics/AnalyticsPage'));
const Settings = lazy(() => import('@/features/settings/SettingsPage'));

export interface RouteConfig {
  path: string;
  element: ReactElement;
  name: string;
  icon?: string;
  showInNav?: boolean;
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
    name: 'Root',
    showInNav: false,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    name: 'Dashboard',
    icon: 'LayoutDashboard',
    showInNav: true,
  },
  {
    path: '/trades',
    element: <Trades />,
    name: 'Trades',
    icon: 'TrendingUp',
    showInNav: true,
  },
  {
    path: '/strategies',
    element: <Strategies />,
    name: 'Strategies',
    icon: 'Brain',
    showInNav: true,
  },
  {
    path: '/backtesting',
    element: <Backtesting />,
    name: 'Backtesting',
    icon: 'Activity',
    showInNav: true,
  },
  {
    path: '/configuration',
    element: <Configuration />,
    name: 'Configuration',
    icon: 'Settings',
    showInNav: true,
  },
  {
    path: '/bot-control',
    element: <BotControl />,
    name: 'Bot Control',
    icon: 'Cpu',
    showInNav: true,
  },
  {
    path: '/analytics',
    element: <Analytics />,
    name: 'Analytics',
    icon: 'BarChart3',
    showInNav: true,
  },
  {
    path: '/settings',
    element: <Settings />,
    name: 'Settings',
    icon: 'Sliders',
    showInNav: true,
  },
];

export default routes;