/**
 * Validation utility functions
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidNumber = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

export const isPositiveNumber = (value: number): boolean => {
  return isValidNumber(value) && value > 0;
};

export const isInRange = (
  value: number,
  min: number,
  max: number
): boolean => {
  return value >= min && value <= max;
};

export const validatePair = (pair: string): boolean => {
  // Format: BASE/QUOTE (e.g., BTC/USDT)
  const pairRegex = /^[A-Z0-9]+\/[A-Z0-9]+$/;
  return pairRegex.test(pair);
};

export const validateStakeAmount = (amount: number | string): boolean => {
  if (typeof amount === 'string') {
    if (amount === 'unlimited') return true;
    return false;
  }
  return isPositiveNumber(amount);
};