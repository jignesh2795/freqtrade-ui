import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { API_CONFIG } from '@/config';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * API Client Configuration
 */
class ApiClient {
  private client: AxiosInstance;
  private authToken: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }

        // Log requests in development
        if (import.meta.env.DEV) {
          console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        }

        return config;
      },
      (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Log responses in development
        if (import.meta.env.DEV) {
          console.log(`[API Response] ${response.config.url}`, response.data);
        }

        return response;
      },
      async (error: AxiosError) => {
        // Handle errors
        if (error.response) {
          // Server responded with error
          const { status, data } = error.response;
          
          console.error(`[API Error] ${status}:`, data);

          // Handle specific status codes
          if (status === 401) {
            // Unauthorized - clear auth and redirect to login
            this.clearAuth();
            // TODO: Redirect to login page
          }

          throw new ApiError(
            (data as any)?.message || error.message,
            status,
            data
          );
        } else if (error.request) {
          // Request made but no response
          console.error('[API Error] No response:', error.request);
          throw new ApiError('No response from server', 0);
        } else {
          // Error setting up request
          console.error('[API Error]', error.message);
          throw new ApiError(error.message, 0);
        }
      }
    );
  }

  /**
   * Set authentication token
   */
  public setAuth(token: string): void {
    this.authToken = token;
    localStorage.setItem('api_token', token);
  }

  /**
   * Clear authentication
   */
  public clearAuth(): void {
    this.authToken = null;
    localStorage.removeItem('api_token');
  }

  /**
   * Load auth token from storage
   */
  public loadAuth(): void {
    const token = localStorage.getItem('api_token');
    if (token) {
      this.authToken = token;
    }
  }

  /**
   * GET request
   */
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();