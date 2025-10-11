/**
 * Financial calculation utilities
 */

export const calculateProfitPercent = (
  entryPrice: number,
  currentPrice: number
): number => {
  return ((currentPrice - entryPrice) / entryPrice) * 100;
};

export const calculateProfit = (
  entryPrice: number,
  currentPrice: number,
  amount: number
): number => {
  return (currentPrice - entryPrice) * amount;
};

export const calculateROI = (profit: number, investment: number): number => {
  return (profit / investment) * 100;
};

export const calculateWinRate = (
  wins: number,
  total: number
): number => {
  if (total === 0) return 0;
  return (wins / total) * 100;
};

export const calculateAverageProfit = (
  profits: number[]
): number => {
  if (profits.length === 0) return 0;
  const sum = profits.reduce((acc, val) => acc + val, 0);
  return sum / profits.length;
};

export const calculateSharpeRatio = (
  returns: number[],
  riskFreeRate: number = 0
): number => {
  if (returns.length === 0) return 0;

  const avgReturn = calculateAverageProfit(returns);
  const stdDev = calculateStandardDeviation(returns);

  if (stdDev === 0) return 0;

  return (avgReturn - riskFreeRate) / stdDev;
};

export const calculateStandardDeviation = (values: number[]): number => {
  if (values.length === 0) return 0;

  const avg = calculateAverageProfit(values);
  const squaredDiffs = values.map((value) => Math.pow(value - avg, 2));
  const avgSquaredDiff = calculateAverageProfit(squaredDiffs);

  return Math.sqrt(avgSquaredDiff);
};

export const calculateMaxDrawdown = (values: number[]): number => {
  if (values.length === 0) return 0;

  let maxDrawdown = 0;
  let peak = values[0];

  for (const value of values) {
    if (value > peak) {
      peak = value;
    }

    const drawdown = ((peak - value) / peak) * 100;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  return maxDrawdown;
};