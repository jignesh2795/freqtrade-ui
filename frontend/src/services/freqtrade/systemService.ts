import { apiClient } from '../api/client';
import { endpoints } from '../api/endpoints';

export interface SystemInfo {
  cpu_pct: number[];
  ram_pct: number;
}

/**
 * System Service
 * Handles system-related API calls
 */
export const systemService = {
  /**
   * Get system information (CPU, RAM usage)
   */
  async getSystemInfo(): Promise<SystemInfo> {
    return apiClient.get<SystemInfo>(endpoints.system.sysinfo);
  },
};