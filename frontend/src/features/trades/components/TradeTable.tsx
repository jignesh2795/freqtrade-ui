import { useState } from 'react';
import { Badge } from '@/components/ui';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { Trade } from '@/types';
import { formatCurrency, formatPercent, formatDateTime, formatDuration } from '@/utils';
import { clsx } from 'clsx';

interface TradeTableProps {
  trades: Trade[];
  onSelectTrade: (trade: Trade) => void;
  loading?: boolean;
}

export const TradeTable: React.FC<TradeTableProps> = ({
  trades,
  onSelectTrade,
  loading,
}) => {
  const [sortKey, setSortKey] = useState<keyof Trade>('open_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: keyof Trade) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const sortedTrades = [...trades].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    
    if (aVal === undefined || bVal === undefined) return 0;
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const SortIcon = ({ column }: { column: keyof Trade }) => {
    if (sortKey !== column) return null;
    return (
      <span className="ml-1">
        {sortOrder === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-dark-800 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (trades.length === 0) {
    return (
      <div className="text-center py-12 text-dark-400">
        No trades found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dark-700">
            <th
              className="text-left py-3 px-4 text-sm font-medium text-dark-400 cursor-pointer hover:text-dark-200"
              onClick={() => handleSort('pair')}
            >
              Pair <SortIcon column="pair" />
            </th>
            <th
              className="text-left py-3 px-4 text-sm font-medium text-dark-400 cursor-pointer hover:text-dark-200"
              onClick={() => handleSort('open_date')}
            >
              Opened <SortIcon column="open_date" />
            </th>
            <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
              Entry Price
            </th>
            <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
              Current Price
            </th>
            <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
              Amount
            </th>
            <th
              className="text-right py-3 px-4 text-sm font-medium text-dark-400 cursor-pointer hover:text-dark-200"
              onClick={() => handleSort('profit_ratio')}
            >
              Profit % <SortIcon column="profit_ratio" />
            </th>
            <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
              Profit
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-dark-400">
              Status
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-dark-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTrades.map((trade) => {
            const profitPercent = (trade.profit_ratio || 0) * 100;
            const isProfit = profitPercent >= 0;
            const duration = trade.close_date
              ? new Date(trade.close_date).getTime() - new Date(trade.open_date).getTime()
              : Date.now() - new Date(trade.open_date).getTime();

            return (
              <tr
                key={trade.trade_id}
                className="border-b border-dark-800 hover:bg-dark-800 transition-colors cursor-pointer"
                onClick={() => onSelectTrade(trade)}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-dark-50">
                      {trade.pair}
                    </span>
                    {isProfit ? (
                      <TrendingUp className="w-4 h-4 text-success-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-danger-400" />
                    )}
                  </div>
                  {trade.buy_tag && (
                    <span className="text-xs text-dark-500">
                      {trade.buy_tag}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 text-sm text-dark-300">
                  {formatDateTime(trade.open_date)}
                </td>
                <td className="py-4 px-4 text-right text-sm text-dark-300">
                  {formatCurrency(trade.open_rate)}
                </td>
                <td className="py-4 px-4 text-right text-sm text-dark-300">
                  {trade.close_rate
                    ? formatCurrency(trade.close_rate)
                    : formatCurrency(trade.open_rate)} {/* Should be current_rate */}
                </td>
                <td className="py-4 px-4 text-right text-sm text-dark-300">
                  {trade.amount.toFixed(4)}
                </td>
                <td className="py-4 px-4 text-right">
                  <span
                    className={clsx(
                      'font-semibold',
                      isProfit ? 'text-success-400' : 'text-danger-400'
                    )}
                  >
                    {formatPercent(profitPercent / 100)}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span
                    className={clsx(
                      'font-medium',
                      isProfit ? 'text-success-400' : 'text-danger-400'
                    )}
                  >
                    {formatCurrency(trade.profit_abs || 0)}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <Badge
                    variant={trade.is_open ? 'primary' : 'default'}
                    size="sm"
                  >
                    {trade.is_open ? 'Open' : 'Closed'}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTrade(trade);
                    }}
                    className="text-primary-400 hover:text-primary-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};