import { OHLCV } from '@/types';
import { formatCurrency, formatPercent } from '@/utils';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface PriceInfoProps {
  data: OHLCV[];
  pair: string;
}

export const PriceInfo: React.FC<PriceInfoProps> = ({ data, pair }) => {
  if (!data || data.length === 0) return null;

  const latest = data[data.length - 1];
  const first = data[0];
  
  const change = latest.close - first.open;
  const changePercent = (change / first.open) * 100;
  const isPositive = change >= 0;

  // Calculate 24h high/low
  const high24h = Math.max(...data.map(d => d.high));
  const low24h = Math.min(...data.map(d => d.low));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Current Price */}
      <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
        <div className="text-xs text-dark-400 mb-1">Current Price</div>
        <div className="text-xl font-bold text-dark-50">
          {formatCurrency(latest.close)}
        </div>
        <div className={clsx(
          'text-sm font-medium flex items-center gap-1 mt-1',
          isPositive ? 'text-success-400' : 'text-danger-400'
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {formatPercent(Math.abs(changePercent) / 100)} ({formatCurrency(Math.abs(change))})
        </div>
      </div>

      {/* 24h High */}
      <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
        <div className="text-xs text-dark-400 mb-1">24h High</div>
        <div className="text-xl font-bold text-success-400">
          {formatCurrency(high24h)}
        </div>
        <div className="text-xs text-dark-500 mt-1">
          Peak price in period
        </div>
      </div>

      {/* 24h Low */}
      <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
        <div className="text-xs text-dark-400 mb-1">24h Low</div>
        <div className="text-xl font-bold text-danger-400">
          {formatCurrency(low24h)}
        </div>
        <div className="text-xs text-dark-500 mt-1">
          Lowest price in period
        </div>
      </div>

      {/* Volume */}
      <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
        <div className="text-xs text-dark-400 mb-1">Volume</div>
        <div className="text-xl font-bold text-primary-400">
          {latest.volume.toFixed(2)}
        </div>
        <div className="text-xs text-dark-500 mt-1">
          Latest candle volume
        </div>
      </div>
    </div>
  );
};