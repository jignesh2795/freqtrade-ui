/**
 * Common Type Definitions
 */

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface Filters {
  [key: string]: any;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}