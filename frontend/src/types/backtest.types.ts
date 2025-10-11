/**
 * Backtest Type Definitions
 */

import { Trade } from './trade.types';

export interface BacktestConfig {
  strategy: string;
  timeframe: string;
  timerange: string;
  start_date?: string;
  end_date?: string;
  max_open_trades: number;
  stake_amount: number | string;
  dry_run_wallet?: number;
  enable_protections: boolean;
}

export interface BacktestResult {
  strategy: string;
  total_trades: number;
  trades: Trade[];
  results_per_pair: Record<string, PairResult>;
  sell_reason_summary: Record<string, ReasonSummary>;
  left_open_trades: Trade[];
  total_volume: number;
  avg_stake_amount: number;
  profit_mean: number;
  profit_median: number;
  profit_total: number;
  profit_total_abs: number;
  profit_total_pct: number;
  duration_avg: string;
  wins: number;
  losses: number;
  holding_avg: string;
  max_drawdown: number;
  max_drawdown_abs: number;
  max_drawdown_start: string;
  max_drawdown_end: string;
  sharpe_ratio?: number;
  sortino_ratio?: number;
  calmar_ratio?: number;
  expectancy?: number;
  backtest_start: string;
  backtest_start_ts: number;
  backtest_end: string;
  backtest_end_ts: number;
}

export interface PairResult {
  key: string;
  trades: number;
  profit_mean: number;
  profit_total: number;
  profit_total_abs: number;
  duration_avg: string;
}

export interface ReasonSummary {
  trades: number;
  wins: number;
  draws: number;
  losses: number;
  profit_mean: number;
  profit_total: number;
}