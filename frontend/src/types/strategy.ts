// Strategy Builder Types

export type BlockType = 
  | 'indicator'
  | 'condition'
  | 'action'
  | 'logic';

export type IndicatorType = 
  | 'sma'
  | 'ema'
  | 'rsi'
  | 'macd'
  | 'bollinger_bands'
  | 'stochastic'
  | 'atr'
  | 'adx';

export type ConditionOperator = 
  | 'greater_than'
  | 'less_than'
  | 'crosses_above'
  | 'crosses_below'
  | 'equals';

export type ActionType = 
  | 'buy'
  | 'sell'
  | 'hold';

export interface BlockBase {
  id: string;
  type: BlockType;
  x: number;
  y: number;
  title: string;
  description: string;
}

export interface IndicatorBlock extends BlockBase {
  type: 'indicator';
  indicatorType: IndicatorType;
  parameters: Record<string, any>;
}

export interface ConditionBlock extends BlockBase {
  type: 'condition';
  leftOperand: string; // Reference to another block or value
  operator: ConditionOperator;
  rightOperand: string; // Reference to another block or value
}

export interface ActionBlock extends BlockBase {
  type: 'action';
  actionType: ActionType;
  parameters: Record<string, any>;
}

export type StrategyBlock = IndicatorBlock | ConditionBlock | ActionBlock;

export interface Connection {
  id: string;
  sourceBlockId: string;
  targetBlockId: string;
  sourcePort: string;
  targetPort: string;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  blocks: StrategyBlock[];
  connections: Connection[];
  createdAt: Date;
  updatedAt: Date;
}