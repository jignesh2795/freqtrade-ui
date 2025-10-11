import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';
import { useTradeStore } from '@/store';
import { EmptyState, Loading } from '@/components/common';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercent, formatRelativeTime } from '@/utils';
import { clsx } from 'clsx';

export const ActiveTrades = () => {
  const { openTrades, isLoading, fetchOpenTrades } = useTradeStore();

  useEffect(() => {
    fetchOpenTrades();

    // Refresh every 10 seconds
    const interval = setInterval(() => {
      fetchOpenTrades();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchOpenTrades]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <Loading message="Loading trades..." />
        </CardContent>
      </Card>
    );
  }

  if (openTrades.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={TrendingUp}
            title="No Active Trades"
            description="No trades are currently open. The bot will open trades based on your strategy."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Active Trades</CardTitle>
          <Badge variant="primary">{openTrades.length} open</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {openTrades.slice(0, 5).map((trade) => {
            const profitPercent = (trade.profit_ratio || 0) * 100;
            const isProfit = profitPercent >= 0;

            return (
              <div
                key={trade.trade_id}
                className="flex items-center justify-between p-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-dark-50">
                      {trade.pair}
                    </span>
                    <Badge
                      variant={isProfit ? 'success' : 'danger'}
                      size="sm"
                    >
                      {isProfit ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                    </Badge>
                  </div>
                  <div className="text-xs text-dark-400">
                    Entry: {formatCurrency(trade.open_rate)} •{' '}
                    {formatRelativeTime(trade.open_date)}
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={clsx(
                      'font-semibold',
                      isProfit ? 'text-success-400' : 'text-danger-400'
                    )}
                  >
                    {formatPercent(profitPercent / 100)}
                  </div>
                  <div className="text-xs text-dark-400">
                    {formatCurrency(trade.profit_abs || 0)}
                  </div>
                </div>
              </div>
            );
          })}

          {openTrades.length > 5 && (
            <div className="text-center pt-2">
              <button className="text-sm text-primary-400 hover:text-primary-300">
                View all {openTrades.length} trades →
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};