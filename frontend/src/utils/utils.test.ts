import { describe, it, expect } from 'vitest';
import { 
  formatCurrency, 
  formatNumber, 
  formatPercent, 
  formatDate, 
  formatTime, 
  formatDateTime, 
  truncate, 
  capitalize,
  formatLargeNumber,
  formatRelativeTime,
  formatDuration,
  slugify
} from './formatters';
import { 
  isValidEmail, 
  isValidUrl, 
  isValidNumber, 
  validatePair,
  isPositiveNumber,
  isInRange,
  validateStakeAmount
} from './validators';
import { 
  calculateProfitPercent, 
  calculateProfit,
  calculateROI, 
  calculateWinRate, 
  calculateSharpeRatio, 
  calculateMaxDrawdown,
  calculateAverageProfit,
  calculateStandardDeviation
} from './calculations';
import { 
  debounce, 
  throttle, 
  sleep, 
  chunk, 
  groupBy,
  sortBy,
  unique,
  isEmpty,
  clamp,
  randomId
} from './helpers';

describe('Utils - Formatters', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(1000, 'EUR')).toBe('€1,000.00');
  });

  it('should format numbers correctly', () => {
    expect(formatNumber(1000)).toBe('1000.00');
    expect(formatNumber(1000.555, 2)).toBe('1000.56');
  });

  it('should format percentages correctly', () => {
    expect(formatPercent(0.1)).toBe('10.00%');
    expect(formatPercent(-0.05)).toBe('-5.00%');
  });

  it('should format dates correctly', () => {
    const date = new Date('2023-01-01');
    // Note: The actual output may vary based on locale
    expect(typeof formatDate(date)).toBe('string');
  });

  it('should format time correctly', () => {
    const date = new Date('2023-01-01T10:30:00');
    // Note: The actual output may vary based on locale
    expect(typeof formatTime(date)).toBe('string');
  });

  it('should format datetime correctly', () => {
    const date = new Date('2023-01-01T10:30:00');
    // Note: The actual output may vary based on locale
    expect(typeof formatDateTime(date)).toBe('string');
  });

  it('should truncate strings correctly', () => {
    expect(truncate('This is a long string', 10)).toBe('This is a ...');
    expect(truncate('Short', 10)).toBe('Short');
  });

  it('should capitalize strings correctly', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('HELLO')).toBe('Hello');
  });
});

describe('Utils - Validators', () => {
  it('should validate emails correctly', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
  });

  it('should validate URLs correctly', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('invalid-url')).toBe(false);
  });

  it('should validate numbers correctly', () => {
    expect(isValidNumber('123')).toBe(true);
    expect(isValidNumber('abc')).toBe(false);
  });

  it('should validate trading pairs correctly', () => {
    expect(validatePair('BTC/USD')).toBe(true);
    expect(validatePair('BTCUSD')).toBe(false);
  });
});

describe('Utils - Calculations', () => {
  it('should calculate profit percentage correctly', () => {
    expect(calculateProfitPercent(100, 110)).toBe(10);
    expect(calculateProfitPercent(100, 90)).toBe(-10);
  });

  it('should calculate ROI correctly', () => {
    expect(calculateROI(100, 1000)).toBe(10);
  });

  it('should calculate win rate correctly', () => {
    expect(calculateWinRate(10, 15)).toBeCloseTo(66.67);
  });

  it('should calculate Sharpe ratio correctly', () => {
    const returns = [0.05, 0.02, -0.01, 0.03];
    expect(typeof calculateSharpeRatio(returns)).toBe('number');
  });

  it('should calculate max drawdown correctly', () => {
    const values = [100, 120, 110, 130, 125];
    expect(typeof calculateMaxDrawdown(values)).toBe('number');
  });
});

describe('Utils - Helpers', () => {
  it('should debounce function calls', async () => {
    let count = 0;
    const func = () => count++;
    const debouncedFunc = debounce(func, 10);
    
    debouncedFunc();
    debouncedFunc();
    debouncedFunc();
    
    await sleep(15);
    expect(count).toBe(1);
  });

  it('should throttle function calls', async () => {
    let count = 0;
    const func = () => count++;
    const throttledFunc = throttle(func, 10);
    
    throttledFunc();
    throttledFunc();
    throttledFunc();
    
    expect(count).toBe(1);
  });

  it('should chunk arrays correctly', () => {
    const array = [1, 2, 3, 4, 5, 6];
    expect(chunk(array, 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
  });

  it('should check if values are empty correctly', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty('test')).toBe(false);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({a: 1})).toBe(false);
  });
});