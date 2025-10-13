import React from 'react';
import { BlockBase } from './BlockBase';
import { IndicatorType } from '@/types/strategy';

interface IndicatorBlockProps {
  id: string;
  x: number;
  y: number;
  indicatorType: IndicatorType;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onConnectionStart?: (e: React.MouseEvent, id: string) => void;
  onConnectionEnd?: (e: React.MouseEvent, id: string) => void;
  isSelected?: boolean;
}

const indicatorConfig: Record<IndicatorType, { title: string; description: string; color: string }> = {
  sma: { title: 'SMA', description: 'Simple Moving Average', color: 'bg-blue-500' },
  ema: { title: 'EMA', description: 'Exponential Moving Average', color: 'bg-green-500' },
  rsi: { title: 'RSI', description: 'Relative Strength Index', color: 'bg-red-500' },
  macd: { title: 'MACD', description: 'Moving Average Convergence Divergence', color: 'bg-purple-500' },
  bollinger_bands: { title: 'Bollinger Bands', description: 'Volatility indicator', color: 'bg-yellow-500' },
  stochastic: { title: 'Stochastic', description: 'Momentum indicator', color: 'bg-pink-500' },
  atr: { title: 'ATR', description: 'Average True Range', color: 'bg-indigo-500' },
  adx: { title: 'ADX', description: 'Average Directional Index', color: 'bg-teal-500' }
};

export function IndicatorBlock({
  id,
  x,
  y,
  indicatorType,
  onDragStart,
  onDragEnd,
  onConnectionStart,
  onConnectionEnd,
  isSelected
}: IndicatorBlockProps) {
  const config = indicatorConfig[indicatorType];
  
  return (
    <BlockBase
      id={id}
      title={config.title}
      description={config.description}
      x={x}
      y={y}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onConnectionStart={onConnectionStart}
      onConnectionEnd={onConnectionEnd}
      isSelected={isSelected}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-dark-700">
        <div className={`w-4 h-4 rounded-full ${config.color}`}></div>
      </div>
      <div className="mt-2 text-xs text-dark-300">
        <div>Period: 14</div>
        <div>Source: Close</div>
      </div>
    </BlockBase>
  );
}