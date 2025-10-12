import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  TrendingUp,
  Brain,
  Activity,
  Settings,
  Cpu,
  BarChart3,
  Sliders,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useUIStore } from '@/store';
import { Button, Tooltip } from '@/components/ui';

const iconMap = {
  LayoutDashboard,
  TrendingUp,
  Brain,
  Activity,
  Settings,
  Cpu,
  BarChart3,
  Sliders,
};

interface NavItem {
  path: string;
  name: string;
  icon: keyof typeof iconMap;
}

const navItems: NavItem[] = [
  { path: '/dashboard', name: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/trades', name: 'Trades', icon: 'TrendingUp' },
  { path: '/charts', name: 'Charts', icon: 'BarChart3' },
  { path: '/strategies', name: 'Strategies', icon: 'Brain' },
  { path: '/backtesting', name: 'Backtesting', icon: 'Activity' },
  { path: '/bot-control', name: 'Bot Control', icon: 'Cpu' },
  { path: '/analytics', name: 'Analytics', icon: 'BarChart3' },
  { path: '/configuration', name: 'Configuration', icon: 'Settings' },
  { path: '/settings', name: 'Settings', icon: 'Sliders' },
];

export const Sidebar = () => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 h-screen bg-dark-900 border-r border-dark-700',
        'transition-all duration-300 z-40',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo/Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-dark-700">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">FT</span>
            </div>
            <span className="font-semibold text-dark-50">FreqTrade UI</span>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className={clsx('p-2', sidebarCollapsed && 'mx-auto')}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = location.pathname === item.path;

          const navLink = (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg',
                'transition-all duration-200',
                'group',
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-dark-300 hover:text-dark-50 hover:bg-dark-800',
                sidebarCollapsed && 'justify-center'
              )}
            >
              <Icon
                className={clsx(
                  'w-5 h-5 flex-shrink-0',
                  isActive && 'text-white'
                )}
              />
              {!sidebarCollapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </Link>
          );

          return sidebarCollapsed ? (
            <Tooltip key={item.path} content={item.name} position="right">
              {navLink}
            </Tooltip>
          ) : (
            navLink
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700">
        {!sidebarCollapsed && (
          <div className="text-xs text-dark-500 text-center">
            <p>FreqTrade UI v0.1.0</p>
            <p className="mt-1">Phase 2 - MVP Complete</p>
          </div>
        )}
      </div>
    </aside>
  );
};