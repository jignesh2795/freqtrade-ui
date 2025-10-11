import { apiClient } from '../api/client';
import { endpoints } from '../api/endpoints';
import type { Trade } from '@/types';

export interface TradeHistoryParams {
  limit?: number;
  offset?: number;
}

export interface ForceEnterParams {
  pair: string;
  side?: 'long' | 'short';
  price?: number;
  ordertype?: 'limit' | 'market';
  stakeamount?: number;
}

export interface ForceExitParams {
  tradeid: number;
  ordertype?: 'limit' | 'market';
  amount?: number;
}

/**
 * Trade Service
 * Handles all trade-related API calls
 */
export const tradeService = {
  /**
   * Get open trades
   */
  async getOpenTrades(): Promise<Trade[]> {
    const response = await apiClient.get<{ trades: Trade[] }>(endpoints.trades.list);
    return response.trades || [];
  },

  /**
   * Get specific trade by ID
   */
  async getTrade(tradeId: number): Promise<Trade> {
    return apiClient.get<Trade>(endpoints.trades.get(tradeId));
  },

  /**
   * Get trade history
   */
  async getTradeHistory(params?: TradeHistoryParams): Promise<Trade[]> {
    const response = await apiClient.get<{ trades: Trade[] }>(
      endpoints.trades.history,
      { params }
    );
    return response.trades || [];
  },

  /**
   * Delete (force exit) a trade
   */
  async deleteTrade(tradeId: number): Promise<{ result: string }> {
    return apiClient.delete(endpoints.trades.delete(tradeId));
  },

  /**
   * Force enter a trade
   */
  async forceEnter(params: ForceEnterParams): Promise<Trade> {
    return apiClient.post<Trade>(endpoints.trades.forceEnter, params);
  },

  /**
   * Force exit a trade
   */
  async forceExit(params: ForceExitParams): Promise<{ result: string }> {
    return apiClient.post(endpoints.trades.forceExit, params);
  },
};