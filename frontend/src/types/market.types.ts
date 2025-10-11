/**
 * Market Type Definitions
 */

export interface Ticker {
  symbol: string;
  bid: number;
  ask: number;
  last: number;
  change: number;
  percentage: number;
  baseVolume: number;
  quoteVolume: number;
  high: number;
  low: number;
}

export interface OHLCV {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBook {
  bids: [number, number][];
  asks: [number, number][];
  timestamp: number;
}

export interface Pair {
  pair: string;
  base: string;
  quote: string;
  active: boolean;
}