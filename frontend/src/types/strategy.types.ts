/**
 * Strategy Type Definitions
 */

export interface Strategy {
  strategy_name: string;
  timeframe: string;
  stoploss: number;
  trailing_stop: boolean;
  trailing_stop_positive?: number;
  trailing_stop_positive_offset?: number;
  trailing_only_offset_is_reached?: boolean;
  use_custom_stoploss: boolean;
  process_only_new_candles: boolean;
  use_exit_signal: boolean;
  exit_profit_only: boolean;
  exit_profit_offset: number;
  ignore_roi_if_buy_signal: boolean;
  minimal_roi: Record<string, number>;
  parameters?: StrategyParameter[];
}

export interface StrategyParameter {
  name: string;
  type: 'int' | 'float' | 'string' | 'boolean' | 'select';
  value: unknown;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  description?: string;
}

export interface StrategyPerformance {
  strategy: string;
  trades: number;
  profit: number;
  profit_pct: number;
  avg_profit: number;
  win_rate: number;
  sharpe_ratio?: number;
  sortino_ratio?: number;
  max_drawdown?: number;
}