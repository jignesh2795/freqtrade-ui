import { apiClient } from '../api/client';
import { endpoints } from '../api/endpoints';
import type { BotStatus, BotConfig } from '@/types';

/**
 * Bot Service
 * Handles all bot-related API calls
 */
export const botService = {
  /**
   * Get bot status
   */
  async getStatus(): Promise<BotStatus> {
    return apiClient.get<BotStatus>(endpoints.bot.status);
  },

  /**
   * Start the bot
   */
  async start(): Promise<{ status: string }> {
    return apiClient.post(endpoints.bot.start);
  },

  /**
   * Stop the bot
   */
  async stop(): Promise<{ status: string }> {
    return apiClient.post(endpoints.bot.stop);
  },

  /**
   * Stop buying (keep selling)
   */
  async stopBuy(): Promise<{ status: string }> {
    return apiClient.post(endpoints.bot.stopBuy);
  },

  /**
   * Reload bot configuration
   */
  async reloadConfig(): Promise<{ status: string }> {
    return apiClient.post(endpoints.bot.reload);
  },

  /**
   * Get bot configuration
   */
  async getConfig(): Promise<BotConfig> {
    return apiClient.get<BotConfig>(endpoints.config.get);
  },

  /**
   * Get bot version
   */
  async getVersion(): Promise<{ version: string }> {
    return apiClient.get(endpoints.health.version);
  },

  /**
   * Ping bot (health check)
   */
  async ping(): Promise<{ status: string }> {
    return apiClient.get(endpoints.health.ping);
  },
};