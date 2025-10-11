import { useEffect } from 'react';
import { StatCard } from './StatCard';
import { TrendingUp, DollarSign, Target, Activity } from 'lucide-react';
import { useBotStore } from '@/store';
import { performanceService } from '@/services/freqtrade';
import { useApi } from '@/hooks';
import { formatCurrency, formatPercent } from '@/utils';

export const PerformanceSummary = () => {
  const { status } = useBotStore();

  const { data: profitData, loading, refetch } = useApi(
    () => performanceService.getProfit(),
    { autoFetch: true }
  );

  useEffect(() => {
    // Refresh every 30 seconds
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  const totalProfit = profitData?.profit_all_coin || 0;
  const totalProfitPercent = profitData?.profit_all_percent || 0;
  const closedTrades = profitData?.closed_trade_count || 0;
  const winRate = profitData
    ? (profitData.winning_trades / closedTrades) * 100
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Profit"
        value={formatCurrency(totalProfit, status?.stake_currency || 'USDT')}
        subtitle={formatPercent(totalProfitPercent / 100)}
        icon={DollarSign}
        trend={{
          value: totalProfitPercent,
          isPositive: totalProfitPercent >= 0,
        }}
        color={totalProfit >= 0 ? 'success' : 'danger'}
        loading={loading}
      />

      <StatCard
        title="Open Trades"
        value={status?.open_trades || 0}
        subtitle={`Max: ${status?.max_open_trades || 0}`}
        icon={TrendingUp}
        color="primary"
        loading={loading}
      />

      <StatCard
        title="Win Rate"
        value={`${winRate.toFixed(1)}%`}
        subtitle={`${profitData?.winning_trades || 0}/${closedTrades} wins`}
        icon={Target}
        color={winRate >= 50 ? 'success' : 'warning'}
        loading={loading}
      />

      <StatCard
        title="Total Trades"
        value={profitData?.trade_count || 0}
        subtitle={`${closedTrades} closed`}
        icon={Activity}
        color="primary"
        loading={loading}
      />
    </div>
  );
};