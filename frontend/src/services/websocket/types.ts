/**
 * WebSocket Event Types and Payloads
 */

export interface StatusUpdate {
  status: 'running' | 'stopped';
  state: string;
}

export interface WhitelistUpdate {
  whitelist: string[];
}

export interface TradeUpdate {
  trade_id: number;
  pair: string;
  open_rate: number;
  current_rate: number;
  profit_ratio: number;
  profit_abs: number;
  stake_amount: number;
  amount: number;
  open_date: string;
}

export interface AnalyzedDataframe {
  pair: string;
  data: Array<{
    date: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    [key: string]: number;
  }>;
  columns: string[];
}

export interface NewCandle {
  pair: string;
  timeframe: string;
  candle: {
    date: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  };
}

export interface PongResponse {
  message: string;
}