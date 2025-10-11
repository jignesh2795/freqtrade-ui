import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';
import { performanceService } from '@/services/freqtrade';
import { Loading, EmptyState } from '@/components/common';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercent } from '@/utils';
import { clsx } from 'clsx';

interface PairPerformanceData {
  pair: string;
  profit: number;
  profit_pct: number;
  count: number;
}

export const PairPerformance = () => {
  const [data, setData] = useState<PairPerformanceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const performance = await performanceService.getPerformance();
        // Sort by profit percentage descending
        const sorted = performance
          .sort((a, b) => b.profit_pct - a.profit_pct)
          .slice(0, 10); // Top 10 pairs
        setData(sorted);
      } catch (error) {
        console.error('Failed to fetch pair performance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Pairs</CardTitle>
        </CardHeader>
        <CardContent>
          <Loading message="Loading performance..." />
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Pairs</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={TrendingUp}
            title="No Performance Data"
            description="Pair performance will appear after trades are closed"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Pairs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.map((item, index) => {
            const isProfit = item.profit_pct >= 0;
            const profitPercent = item.profit_pct;

            return (
              <div
                key={item.pair}
                className="flex items-center gap-3 p-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-900 flex items-center justify-center">
                  <span className="text-sm font-semibold text-dark-400">
                    {index + 1}
                  </span>
                </div>

                {/* Pair Name */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-dark-50">
                      {item.pair}
                    </span>
                    {isProfit ? (
                      <TrendingUp className="w-4 h-4 text-success-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-danger-400" />
                    )}
                  </div>
                  <div className="text-xs text-dark-400">
                    {item.count} trades
                  </div>
                </div>

                {/* Profit */}
                <div className="text-right flex-shrink-0">
                  <div
                    className={clsx(
                      'text-sm font-semibold',
                      isProfit ? 'text-success-400' : 'text-danger-400'
                    )}
                  >
                    {formatPercent(profitPercent / 100)}
                  </div>
                  <div className="text-xs text-dark-400">
                    {formatCurrency(item.profit)}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex-shrink-0 w-24">
                  <div className="h-2 bg-dark-900 rounded-full overflow-hidden">
                    <div
                      className={clsx(
                        'h-full transition-all',
                        isProfit ? 'bg-success-500' : 'bg-danger-500'
                      )}
                      style={{
                        width: `${Math.min(
                          Math.abs(profitPercent),
                          100
                        )}%`,
                      }}
                    />
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