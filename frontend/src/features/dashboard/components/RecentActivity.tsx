import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';
import { useTradeStore } from '@/store';
import { EmptyState, Loading } from '@/components/common';
import { Activity } from 'lucide-react';
import { formatRelativeTime, formatCurrency, formatPercent } from '@/utils';
import { clsx } from 'clsx';

export const RecentActivity = () => {
  const { closedTrades, isLoading, fetchClosedTrades } = useTradeStore();

  useEffect(() => {
    fetchClosedTrades(10);
  }, [fetchClosedTrades]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Loading message="Loading activity..." />
        </CardContent>
      </Card>
    );
  }

  if (closedTrades.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Activity}
            title="No Recent Activity"
            description="Closed trades will appear here once the bot starts trading."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {closedTrades.map((trade) => {
            const profitPercent = (trade.close_profit_pct || 0);
            const isProfit = profitPercent >= 0;

            return (
              <div
                key={trade.trade_id}
                className="flex items-start gap-3 p-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"
              >
                <div
                  className={clsx(
                    'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                    isProfit ? 'bg-success-500' : 'bg-danger-500'
                  )}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-dark-50">
                      {trade.pair}
                    </span>
                    <Badge
                      variant={isProfit ? 'success' : 'danger'}
                      size="sm"
                    >
                      {isProfit ? 'Win' : 'Loss'}
                    </Badge>
                  </div>

                  <div className="text-xs text-dark-400 space-y-0.5">
                    <div>
                      Closed {formatRelativeTime(trade.close_date || '')}
                    </div>
                    <div>
                      {formatCurrency(trade.open_rate)} →{' '}
                      {formatCurrency(trade.close_rate || 0)}
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div
                    className={clsx(
                      'font-semibold text-sm',
                      isProfit ? 'text-success-400' : 'text-danger-400'
                    )}
                  >
                    {formatPercent(profitPercent / 100)}
                  </div>
                  <div className="text-xs text-dark-400">
                    {formatCurrency(trade.close_profit_abs || 0)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};