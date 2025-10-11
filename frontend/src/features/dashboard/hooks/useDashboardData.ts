import { useEffect, useCallback } from 'react';
import { useBotStore, useTradeStore } from '@/store';
import { REFRESH_INTERVALS } from '@/config';

export const useDashboardData = () => {
  const { fetchStatus } = useBotStore();
  const { fetchOpenTrades, fetchClosedTrades } = useTradeStore();

  const refreshAll = useCallback(async () => {
    try {
      await Promise.all([
        fetchStatus(),
        fetchOpenTrades(),
        fetchClosedTrades(10),
      ]);
    } catch (error) {
      console.error('Dashboard refresh failed:', error);
    }
  }, [fetchStatus, fetchOpenTrades, fetchClosedTrades]);

  useEffect(() => {
    // Initial fetch
    refreshAll();

    // Set up auto-refresh
    const interval = setInterval(() => {
      refreshAll();
    }, REFRESH_INTERVALS.slow); // 30 seconds

    return () => clearInterval(interval);
  }, [refreshAll]);

  return { refreshAll };
};