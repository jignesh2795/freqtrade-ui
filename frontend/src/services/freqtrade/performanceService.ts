import { apiClient } from '../api/client';
import { endpoints } from '../api/endpoints';

export interface ProfitData {
  profit_closed_coin: number;
  profit_closed_percent: number;
  profit_closed_ratio: number;
  profit_closed_fiat: number;
  profit_all_coin: number;
  profit_all_percent: number;
  profit_all_ratio: number;
  profit_all_fiat: number;
  trade_count: number;
  closed_trade_count: number;
  first_trade_date: string;
  first_trade_timestamp: number;
  latest_trade_date: string;
  latest_trade_timestamp: number;
  avg_duration: string;
  best_pair: string;
  best_rate: number;
  winning_trades: number;
  losing_trades: number;
}

export interface PerformanceEntry {
  pair: string;
  profit: number;
  profit_ratio: number;
  profit_pct: number;
  profit_abs: number;
  count: number;
}

export interface StatsData {
  exit_reasons: Record<string, { trades: number; wins: number; draws: number; losses: number; profit_mean: number; profit_total: number }>;
  durations: Record<string, number>;
}

export interface BalanceData {
  currencies: Array<{
    currency: string;
    free: number;
    balance: number;
    used: number;
    est_stake: number;
  }>;
  total: number;
  symbol: string;
  value: number;
  stake: string;
  note: string;
}

export interface DailyEntry {
  date: string;
  abs_profit: number;
  rel_profit: number;
  starting_balance: number;
  fiat_value: number;
  trade_count: number;
}

/**
 * Performance Service
 * Handles performance and statistics API calls
 */
export const performanceService = {
  /**
   * Get profit information
   */
  async getProfit(): Promise<ProfitData> {
    return apiClient.get<ProfitData>(endpoints.performance.profit);
  },

  /**
   * Get performance per pair
   */
  async getPerformance(): Promise<PerformanceEntry[]> {
    return apiClient.get<PerformanceEntry[]>(endpoints.performance.performance);
  },

  /**
   * Get statistics (exit reasons, durations)
   */
  async getStats(): Promise<StatsData> {
    return apiClient.get<StatsData>(endpoints.performance.stats);
  },

  /**
   * Get account balance
   */
  async getBalance(): Promise<BalanceData> {
    return apiClient.get<BalanceData>(endpoints.performance.balance);
  },

  /**
   * Get daily profit data
   */
  async getDaily(days?: number): Promise<DailyEntry[]> {
    const params = days ? { timescale: days } : {};
    const response = await apiClient.get<{ data: DailyEntry[] }>(
      endpoints.performance.daily,
      { params }
    );
    return response.data || [];
  },
};