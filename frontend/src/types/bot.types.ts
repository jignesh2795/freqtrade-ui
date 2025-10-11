/**
 * Bot Type Definitions
 */

export interface BotStatus {
  state: 'running' | 'stopped' | 'reload_config';
  runmode: 'dry_run' | 'live';
  strategy: string;
  strategy_version?: string;
  stoploss: number;
  trailing_stop: boolean;
  trailing_stop_positive?: number;
  trailing_stop_positive_offset?: number;
  trailing_only_offset_is_reached?: boolean;
  timeframe: string;
  timeframe_detail?: string;
  stake_currency: string;
  stake_amount: number | string;
  available_balance: number;
  stake_currency_decimals: number;
  dry_run: boolean;
  max_open_trades: number;
  minimal_roi: Record<string, number>;
  open_trades: number;
  bot_start_date?: string;
}

export interface BotConfig {
  max_open_trades: number;
  stake_currency: string;
  stake_amount: number | string;
  dry_run: boolean;
  exchange: {
    name: string;
    key?: string;
    secret?: string;
    pair_whitelist: string[];
    pair_blacklist: string[];
  };
  strategy: string;
  timeframe: string;
  // Add more config fields as needed
}

export interface BotHealth {
  status: 'healthy' | 'warning' | 'error';
  uptime: number;
  cpu_usage: number;
  memory_usage: number;
  api_calls: number;
  last_heartbeat: string;
}