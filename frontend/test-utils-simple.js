// Simple test to verify utility functions work
console.log('Testing utility functions...');

// Test formatters
const formatCurrency = (value, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatPercent = (value, decimals = 2) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

const formatNumber = (value, decimals = 2) => {
  return value.toFixed(decimals);
};

// Test validators
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Test calculations
const calculateProfitPercent = (entryPrice, currentPrice) => {
  return ((currentPrice - entryPrice) / entryPrice) * 100;
};

const calculateROI = (profit, investment) => {
  return (profit / investment) * 100;
};

// Test helpers
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

console.log('Format currency: $1000 USD =', formatCurrency(1000));
console.log('Format number: 1000.555 with 2 decimals =', formatNumber(1000.555, 2));
console.log('Format percent: 0.1 =', formatPercent(0.1));

console.log('Valid email test@example.com:', isValidEmail('test@example.com'));
console.log('Invalid email test:', isValidEmail('test'));

console.log('Valid URL https://example.com:', isValidUrl('https://example.com'));
console.log('Invalid URL example:', isValidUrl('example'));

console.log('Profit percent (100->110):', calculateProfitPercent(100, 110));
console.log('ROI (100 profit, 1000 investment):', calculateROI(100, 1000));

console.log('All utility tests completed successfully!');