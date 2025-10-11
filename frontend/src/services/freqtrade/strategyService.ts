import { apiClient } from '../api/client';
import { endpoints } from '../api/endpoints';
import type { Strategy } from '@/types';

export interface AvailablePair {
  pair: string;
  timeframe: string;
}

export interface PairCandlesParams {
  pair: string;
  timeframe: string;
  limit?: number;
}

export interface PairHistoryParams {
  pair: string;
  timeframe: string;
  timerange?: string;
  strategy?: string;
}

export interface CandleData {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/**
 * Strategy Service
 * Handles strategy-related API calls
 */
export const strategyService = {
  /**
   * Get list of available strategies
   */
  async getStrategies(): Promise<string[]> {
    const response = await apiClient.get<{ strategies: string[] }>(
      endpoints.strategy.list
    );
    return response.strategies || [];
  },

  /**
   * Get specific strategy details
   */
  async getStrategy(strategyName: string): Promise<Strategy> {
    return apiClient.get<Strategy>(endpoints.strategy.get(strategyName));
  },

  /**
   * Get available trading pairs
   */
  async getAvailablePairs(): Promise<AvailablePair[]> {
    const response = await apiClient.get<{ pairs: AvailablePair[] }>(
      endpoints.strategy.availablePairs
    );
    return response.pairs || [];
  },

  /**
   * Get pair candles (OHLCV data)
   */
  async getPairCandles(params: PairCandlesParams): Promise<CandleData[]> {
    const response = await apiClient.get<{ data: CandleData[] }>(
      endpoints.strategy.pairCandles,
      { params }
    );
    return response.data || [];
  },

  /**
   * Get pair history with strategy analysis
   */
  async getPairHistory(params: PairHistoryParams): Promise<any> {
    return apiClient.get(endpoints.strategy.pairHistory, { params });
  },
};