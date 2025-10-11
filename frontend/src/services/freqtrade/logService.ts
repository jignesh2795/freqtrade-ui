import { apiClient } from '../api/client';
import { endpoints } from '../api/endpoints';

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  logger: string;
}

/**
 * Log Service
 * Handles log-related API calls
 */
export const logService = {
  /**
   * Get bot logs
   */
  async getLogs(limit?: number): Promise<LogEntry[]> {
    const response = await apiClient.get<{ log_count: number; logs: any[] }>(
      endpoints.logs.get,
      { params: limit ? { limit } : {} }
    );
    
    // Parse logs from the FreqTrade format:
    // [logtime-formatted, logepoch, logger-name, loglevel, message \n + exception]
    return response.logs.map((log: any[]) => ({
      timestamp: log[0], // formatted date string
      level: log[3],     // log level (INFO, WARNING, ERROR, etc.)
      message: log[4],   // log message
      logger: log[2],    // logger name
    }));
  },
};