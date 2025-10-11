import { Bell, Moon, Sun, Activity } from 'lucide-react';
import { Button, Badge, Tooltip } from '@/components/ui';
import { useUIStore } from '@/store';
import { useBotStore } from '@/store';
import { useEffect } from 'react';

export const Header = () => {
  const { theme, toggleTheme } = useUIStore();
  const { status, fetchStatus } = useBotStore();

  useEffect(() => {
    // Fetch bot status on mount
    fetchStatus();
  }, [fetchStatus]);

  const getBotStatusColor = () => {
    if (!status) return 'default';
    if (status.state === 'running') return 'success';
    if (status.state === 'stopped') return 'danger';
    return 'warning';
  };

  const getBotStatusText = () => {
    if (!status) return 'Unknown';
    return status.state === 'running' ? 'Online' : 'Offline';
  };

  return (
    <header className="h-16 bg-dark-900 border-b border-dark-700 flex items-center justify-between px-6">
      {/* Left section - could add breadcrumbs here */}
      <div className="flex items-center gap-4">
        {/* Bot Status */}
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-dark-400" />
          <Badge variant={getBotStatusColor()} dot>
            {getBotStatusText()}
          </Badge>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Tooltip content="Notifications" position="bottom">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
          </Button>
        </Tooltip>

        {/* Theme Toggle */}
        <Tooltip content={theme === 'dark' ? 'Light Mode' : 'Dark Mode'} position="bottom">
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </Tooltip>

        {/* User Menu - placeholder */}
        <div className="ml-2 pl-2 border-l border-dark-700">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};