// Simple test script to verify utility functions
import { 
  formatCurrency, 
  formatNumber, 
  formatPercent 
} from './src/utils/formatters.js';

import { 
  isValidEmail, 
  isValidUrl 
} from './src/utils/validators.js';

import { 
  calculateProfitPercent, 
  calculateROI 
} from './src/utils/calculations.js';

import { 
  sleep, 
  debounce 
} from './src/utils/helpers.js';

console.log('Testing utility functions...');

// Test formatters
console.log('Format currency: $1000 USD =', formatCurrency(1000));
console.log('Format number: 1000.555 with 2 decimals =', formatNumber(1000.555, 2));
console.log('Format percent: 0.1 =', formatPercent(0.1));

// Test validators
console.log('Valid email test@example.com:', isValidEmail('test@example.com'));
console.log('Invalid email test:', isValidEmail('test'));

console.log('Valid URL https://example.com:', isValidUrl('https://example.com'));
console.log('Invalid URL example:', isValidUrl('example'));

// Test calculations
console.log('Profit percent (100->110):', calculateProfitPercent(100, 110));
console.log('ROI (100 profit, 1000 investment):', calculateROI(100, 1000));

// Test helpers
console.log('Sleep function test - waiting 100ms...');
sleep(100).then(() => {
  console.log('Sleep function completed');
  
  console.log('All utility tests completed successfully!');
});