import { apiClient } from '../api/client';
import { endpoints } from '../api/endpoints';

/**
 * Configuration Service
 * Handles configuration-related API calls
 */
export const configService = {
  /**
   * Reload bot configuration
   */
  async reloadConfig(): Promise<{ status: string }> {
    return apiClient.post(endpoints.config.reload);
  },

  /**
   * Get current configuration
   */
  async getConfig(): Promise<any> {
    return apiClient.get(endpoints.config.get);
  },
};