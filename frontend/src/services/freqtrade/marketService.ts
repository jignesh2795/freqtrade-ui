import { apiClient } from '../api/client';
import { endpoints } from '../api/endpoints';
import type { Ticker, OHLCV } from '@/types';

export interface WhitelistResponse {
  whitelist: string[];
  length: number;
  method: string;
}

export interface BlacklistResponse {
  blacklist: string[];
  length: number;
  method: string;
}

export interface AddBlacklistParams {
  blacklist: string[];
}

/**
 * Market Service
 * Handles market data and pair management
 */
export const marketService = {
  /**
   * Get current whitelist
   */
  async getWhitelist(): Promise<WhitelistResponse> {
    return apiClient.get<WhitelistResponse>(endpoints.config.whitelist);
  },

  /**
   * Get current blacklist
   */
  async getBlacklist(): Promise<BlacklistResponse> {
    return apiClient.get<BlacklistResponse>(endpoints.config.blacklist);
  },

  /**
   * Add pairs to blacklist
   */
  async addToBlacklist(pairs: string[]): Promise<BlacklistResponse> {
    return apiClient.post<BlacklistResponse>(endpoints.config.blacklist, {
      blacklist: pairs,
    });
  },

  /**
   * Remove pairs from blacklist
   */
  async removeFromBlacklist(pairs: string[]): Promise<BlacklistResponse> {
    return apiClient.delete<BlacklistResponse>(endpoints.config.blacklist, {
      data: { blacklist: pairs },
    });
  },

  /**
   * Get ticker data for a pair
   * Note: This would typically come from strategy.pairCandles
   */
  async getTickerData(pair: string, timeframe: string): Promise<OHLCV[]> {
    const response = await apiClient.get<{ data: OHLCV[] }>(
      endpoints.strategy.pairCandles,
      {
        params: { pair, timeframe, limit: 1000 },
      }
    );
    return response.data || [];
  },
};