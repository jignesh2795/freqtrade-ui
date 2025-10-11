/**
 * Trade Type Definitions
 */

export interface Trade {
  trade_id: number;
  pair: string;
  is_open: boolean;
  is_short: boolean;
  exchange: string;
  amount: number;
  amount_requested: number;
  stake_amount: number;
  strategy: string;
  buy_tag?: string;
  timeframe: number;
  fee_open: number;
  fee_open_cost?: number;
  fee_open_currency?: string;
  fee_close: number;
  fee_close_cost?: number;
  fee_close_currency?: string;
  open_date: string;
  open_timestamp: number;
  open_rate: number;
  open_rate_requested?: number;
  open_trade_value: number;
  close_date?: string;
  close_timestamp?: number;
  close_rate?: number;
  close_rate_requested?: number;
  close_profit?: number;
  close_profit_pct?: number;
  close_profit_abs?: number;
  profit_ratio?: number;
  profit_pct?: number;
  profit_abs?: number;
  sell_reason?: string;
  sell_order_status?: string;
  stop_loss_abs?: number;
  stop_loss_ratio?: number;
  stop_loss_pct?: number;
  stoploss_order_id?: string;
  stoploss_last_update?: string;
  stoploss_last_update_timestamp?: number;
  initial_stop_loss_abs?: number;
  initial_stop_loss_ratio?: number;
  initial_stop_loss_pct?: number;
  min_rate?: number;
  max_rate?: number;
  open_order_id?: string;
  orders: Order[];
}

export interface Order {
  order_id: string;
  order_timestamp: number;
  order_type: string;
  order_side: string;
  pair: string;
  order_filled_timestamp?: number;
  order_filled_date?: string;
  status: string;
  average?: number;
  cost?: number;
  filled?: number;
  is_open: boolean;
  remaining?: number;
}

export interface TradeStats {
  total_trades: number;
  open_trades: number;
  closed_trades: number;
  winning_trades: number;
  losing_trades: number;
  win_rate: number;
  total_profit: number;
  total_profit_pct: number;
  avg_profit: number;
  avg_profit_pct: number;
  avg_duration: string;
  best_pair: string;
  best_rate: number;
}