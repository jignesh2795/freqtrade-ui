import { useEffect, useRef } from 'react';
import { OHLCV, Trade } from '@/types';

export interface TradingChartProps {
  data: OHLCV[];
  pair: string;
  trades?: Trade[];
  height?: number;
  showVolume?: boolean;
}

export const TradingChart: React.FC<TradingChartProps> = ({
  data,
  pair,
  trades = [],
  height = 500,
  showVolume = true,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Set the dimensions of the container
    chartContainerRef.current.style.width = '100%';
    chartContainerRef.current.style.height = `${height}px`;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        // In a real implementation, we would resize the chart here
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [height]);

  return (
    <div className="relative">
      {/* Chart Title */}
      <div className="absolute top-4 left-4 z-10 bg-dark-900/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-dark-700">
        <div className="text-sm font-semibold text-dark-50">{pair}</div>
        {data.length > 0 && (
          <div className="text-xs text-dark-400 mt-1">
            {data.length} candles • {trades.length} trades
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div 
        ref={chartContainerRef} 
        className="rounded-lg overflow-hidden border border-dark-700 bg-dark-900 flex items-center justify-center"
      >
        <div className="text-dark-500 text-center p-8">
          <div className="font-semibold mb-2">Lightweight Charts API Issue</div>
          <div className="text-sm">Chart implementation pending due to API compatibility issues</div>
          <div className="text-xs mt-2">Data: {data.length} candles, Trades: {trades.length}</div>
        </div>
      </div>
    </div>
  );
};
