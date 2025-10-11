import { apiClient } from '../api/client';
import { endpoints } from '../api/endpoints';
import type { BacktestResult } from '@/types';

export interface BacktestStartParams {
  strategy: string;
  timerange?: string;
  timeframe?: string;
  max_open_trades?: number;
  stake_amount?: number | string;
  dry_run_wallet?: number;
  enable_protections?: boolean;
}

export interface BacktestStatusResponse {
  status: 'not_started' | 'running' | 'stopped' | 'ended';
  running: boolean;
  status_msg: string;
  step: string;
  progress: number;
  trade_count?: number;
  result?: BacktestResult;
}

export interface BacktestHistoryEntry {
  strategy: string;
  run_id: string;
  backtest_start_time: number;
}

/**
 * Backtest Service
 * Handles backtesting operations
 */
export const backtestService = {
  /**
   * Start a backtest
   */
  async startBacktest(params: BacktestStartParams): Promise<{ status: string }> {
    return apiClient.post(endpoints.backtest.start, params);
  },

  /**
   * Get backtest status
   */
  async getBacktestStatus(): Promise<BacktestStatusResponse> {
    return apiClient.get<BacktestStatusResponse>(endpoints.backtest.status);
  },

  /**
   * Abort running backtest
   */
  async abortBacktest(): Promise<{ status: string }> {
    return apiClient.get(endpoints.backtest.abort);
  },

  /**
   * Get backtest history
   */
  async getBacktestHistory(): Promise<BacktestHistoryEntry[]> {
    const response = await apiClient.get<{ backtests: BacktestHistoryEntry[] }>(
      endpoints.backtest.history
    );
    return response.backtests || [];
  },

  /**
   * Poll backtest status until complete
   */
  async pollBacktestStatus(
    onProgress?: (progress: number, step: string) => void,
    intervalMs: number = 1000
  ): Promise<BacktestResult> {
    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const status = await this.getBacktestStatus();

          if (onProgress) {
            onProgress(status.progress, status.step);
          }

          if (status.status === 'ended' && status.result) {
            resolve(status.result);
          } else if (status.status === 'stopped') {
            reject(new Error('Backtest was stopped'));
          } else if (status.running) {
            setTimeout(poll, intervalMs);
          }
        } catch (error) {
          reject(error);
        }
      };

      poll();
    });
  },
};