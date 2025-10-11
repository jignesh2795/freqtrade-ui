import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks';
import { useBotStore, useTradeStore } from '@/store';
import { useDashboardData } from './hooks';
import {
  PerformanceSummary,
  ActiveTrades,
  RecentActivity,
  BotStatusCard,
  DailyProfitChart,
  PairPerformance,
  TradeStatistics,
} from './components';

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { success } = useToast();
  const { fetchStatus } = useBotStore();
  const { fetchOpenTrades, fetchClosedTrades } = useTradeStore();
  const { refreshAll } = useDashboardData();

  useEffect(() => {
    // Set initial loading to false after first render
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchStatus(),
        fetchOpenTrades(),
        fetchClosedTrades(10),
      ]);
      success('Dashboard Refreshed', 'All data has been updated');
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-50">Dashboard</h1>
          <p className="text-dark-400 mt-1">
            Monitor your bot performance and active trades
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Performance Summary Cards */}
      <PerformanceSummary />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <DailyProfitChart />
          <ActiveTrades />
          <TradeStatistics />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <BotStatusCard />
          <PairPerformance />
          <RecentActivity />
        </div>
      </div>

      {/* Loading Overlay */}
      {initialLoading && (
        <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-dark-200">Loading dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}