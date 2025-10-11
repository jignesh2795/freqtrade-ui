import { useEffect } from 'react';
import { Button } from '@/components/ui';
import { RefreshCw } from 'lucide-react';
import { useBotStore } from '@/store';
import { useToast } from '@/hooks';
import {
  BotControlPanel,
  LogViewer,
  QuickSettings,
  SystemMonitor,
} from './components';

export default function BotControlPage() {
  const { fetchStatus, fetchConfig } = useBotStore();
  const { success } = useToast();
  
  useEffect(() => {
    fetchStatus();
    fetchConfig();
    
    // Auto-refresh status every 5 seconds
    const interval = setInterval(() => {
      fetchStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchStatus, fetchConfig]);
  
  const handleRefreshAll = async () => {
    await Promise.all([fetchStatus(), fetchConfig()]);
    success('Refreshed', 'All data has been updated');
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-50">Bot Control</h1>
          <p className="text-dark-400 mt-1">
            Start, stop, and monitor bot operations
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={handleRefreshAll}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh All
        </Button>
      </div>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bot Control Panel */}
          <BotControlPanel />
          
          {/* Log Viewer */}
          <LogViewer />
        </div>
        
        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Quick Settings */}
          <QuickSettings />
          
          {/* System Monitor */}
          <SystemMonitor />
        </div>
      </div>
    </div>
  );
}