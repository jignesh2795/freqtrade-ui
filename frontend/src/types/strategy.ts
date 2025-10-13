// src/types/strategy.ts

export type BlockType = 'indicator' | 'condition' | 'action';

export type IndicatorType = 
  | 'SMA' | 'EMA' | 'RSI' | 'MACD' | 'BB' 
  | 'STOCH' | 'ADX' | 'ATR' | 'CCI' | 'MFI';

export type ConditionType = 
  | 'greater' | 'less' | 'equal' | 'cross_above' 
  | 'cross_below' | 'between' | 'outside';

export type ActionType = 'buy' | 'sell' | 'exit';

export interface BlockPosition {
  x: number;
  y: number;
}

export interface ConnectionPoint {
  blockId: string;
  type: 'input' | 'output';
  index: number;
}

export interface Connection {
  id: string;
  from: ConnectionPoint;
  to: ConnectionPoint;
}

export interface BaseBlock {
  id: string;
  type: BlockType;
  position: BlockPosition;
  label?: string;
}

export interface IndicatorBlock extends BaseBlock {
  type: 'indicator';
  indicatorType: IndicatorType;
  parameters: Record<string, number | string>;
  outputs: number;
}

export interface ConditionBlock extends BaseBlock {
  type: 'condition';
  conditionType: ConditionType;
  parameters: Record<string, number | string>;
  inputs: number;
  outputs: number;
}

export interface ActionBlock extends BaseBlock {
  type: 'action';
  actionType: ActionType;
  parameters: Record<string, number | string>;
  inputs: number;
}

export type Block = IndicatorBlock | ConditionBlock | ActionBlock;

export interface Strategy {
  id: string;
  name: string;
  description?: string;
  blocks: Block[];
  connections: Connection[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IndicatorConfig {
  type: IndicatorType;
  label: string;
  description: string;
  parameters: {
    name: string;
    label: string;
    type: 'number' | 'select';
    default: number | string;
    options?: string[];
    min?: number;
    max?: number;
  }[];
  outputs: number;
  color: string;
  icon: string;
}

export const INDICATOR_CONFIGS: Record<IndicatorType, IndicatorConfig> = {
  SMA: {
    type: 'SMA',
    label: 'Simple Moving Average',
    description: 'Average price over N periods',
    parameters: [
      { name: 'period', label: 'Period', type: 'number', default: 20, min: 1, max: 200 },
      { name: 'source', label: 'Source', type: 'select', default: 'close', options: ['open', 'high', 'low', 'close'] }
    ],
    outputs: 1,
    color: '#3b82f6',
    icon: '📈'
  },
  EMA: {
    type: 'EMA',
    label: 'Exponential Moving Average',
    description: 'Weighted average favoring recent prices',
    parameters: [
      { name: 'period', label: 'Period', type: 'number', default: 20, min: 1, max: 200 },
      { name: 'source', label: 'Source', type: 'select', default: 'close', options: ['open', 'high', 'low', 'close'] }
    ],
    outputs: 1,
    color: '#8b5cf6',
    icon: '📊'
  },
  RSI: {
    type: 'RSI',
    label: 'Relative Strength Index',
    description: 'Momentum oscillator (0-100)',
    parameters: [
      { name: 'period', label: 'Period', type: 'number', default: 14, min: 2, max: 50 }
    ],
    outputs: 1,
    color: '#f59e0b',
    icon: '⚡'
  },
  MACD: {
    type: 'MACD',
    label: 'MACD',
    description: 'Trend and momentum indicator',
    parameters: [
      { name: 'fast', label: 'Fast Period', type: 'number', default: 12, min: 2, max: 50 },
      { name: 'slow', label: 'Slow Period', type: 'number', default: 26, min: 2, max: 100 },
      { name: 'signal', label: 'Signal Period', type: 'number', default: 9, min: 2, max: 50 }
    ],
    outputs: 3,
    color: '#10b981',
    icon: '🎯'
  },
  BB: {
    type: 'BB',
    label: 'Bollinger Bands',
    description: 'Volatility bands around MA',
    parameters: [
      { name: 'period', label: 'Period', type: 'number', default: 20, min: 2, max: 100 },
      { name: 'std', label: 'Std Dev', type: 'number', default: 2, min: 1, max: 4 }
    ],
    outputs: 3,
    color: '#ec4899',
    icon: '📏'
  },
  STOCH: {
    type: 'STOCH',
    label: 'Stochastic',
    description: 'Momentum oscillator',
    parameters: [
      { name: 'k_period', label: 'K Period', type: 'number', default: 14, min: 1, max: 50 },
      { name: 'd_period', label: 'D Period', type: 'number', default: 3, min: 1, max: 20 }
    ],
    outputs: 2,
    color: '#06b6d4',
    icon: '🔄'
  },
  ADX: {
    type: 'ADX',
    label: 'Average Directional Index',
    description: 'Trend strength indicator',
    parameters: [
      { name: 'period', label: 'Period', type: 'number', default: 14, min: 2, max: 50 }
    ],
    outputs: 1,
    color: '#f97316',
    icon: '💪'
  },
  ATR: {
    type: 'ATR',
    label: 'Average True Range',
    description: 'Volatility indicator',
    parameters: [
      { name: 'period', label: 'Period', type: 'number', default: 14, min: 2, max: 50 }
    ],
    outputs: 1,
    color: '#ef4444',
    icon: '📉'
  },
  CCI: {
    type: 'CCI',
    label: 'Commodity Channel Index',
    description: 'Momentum oscillator',
    parameters: [
      { name: 'period', label: 'Period', type: 'number', default: 20, min: 2, max: 100 }
    ],
    outputs: 1,
    color: '#14b8a6',
    icon: '🌊'
  },
  MFI: {
    type: 'MFI',
    label: 'Money Flow Index',
    description: 'Volume-weighted RSI',
    parameters: [
      { name: 'period', label: 'Period', type: 'number', default: 14, min: 2, max: 50 }
    ],
    outputs: 1,
    color: '#a855f7',
    icon: '💰'
  }
};

export const CONDITION_CONFIGS = {
  greater: { label: 'Greater Than', symbol: '>', color: '#3b82f6' },
  less: { label: 'Less Than', symbol: '<', color: '#ef4444' },
  equal: { label: 'Equal To', symbol: '=', color: '#10b981' },
  cross_above: { label: 'Crosses Above', symbol: '⤴', color: '#8b5cf6' },
  cross_below: { label: 'Crosses Below', symbol: '⤵', color: '#f59e0b' },
  between: { label: 'Between', symbol: '⇄', color: '#06b6d4' },
  outside: { label: 'Outside Range', symbol: '⇹', color: '#ec4899' }
};

export const ACTION_CONFIGS = {
  buy: { label: 'Buy Signal', color: '#10b981', icon: '📈' },
  sell: { label: 'Sell Signal', color: '#ef4444', icon: '📉' },
  exit: { label: 'Exit Position', color: '#f59e0b', icon: '🚪' }
};