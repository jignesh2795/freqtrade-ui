import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { strategyService } from '@/services/freqtrade';
import type { Strategy } from '@/types';

export interface StrategyState {
  // State
  strategies: string[];
  currentStrategy: Strategy | null;
  selectedStrategyName: string | null;
  availablePairs: Array<{ pair: string; timeframe: string }>;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;

  // Actions
  fetchStrategies: () => Promise<void>;
  fetchStrategy: (strategyName: string) => Promise<void>;
  fetchAvailablePairs: () => Promise<void>;
  selectStrategy: (strategyName: string) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  strategies: [],
  currentStrategy: null,
  selectedStrategyName: null,
  availablePairs: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const useStrategyStore = create<StrategyState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchStrategies: async () => {
        set({ isLoading: true, error: null });
        try {
          const strategies = await strategyService.getStrategies();
          set({
            strategies,
            isLoading: false,
            lastUpdated: Date.now(),
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to fetch strategies';
          set({ error: message, isLoading: false });
        }
      },

      fetchStrategy: async (strategyName: string) => {
        set({ isLoading: true, error: null });
        try {
          const strategy = await strategyService.getStrategy(strategyName);
          set({
            currentStrategy: strategy,
            selectedStrategyName: strategyName,
            isLoading: false,
            lastUpdated: Date.now(),
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to fetch strategy';
          set({ error: message, isLoading: false });
        }
      },

      fetchAvailablePairs: async () => {
        set({ isLoading: true, error: null });
        try {
          const pairs = await strategyService.getAvailablePairs();
          set({
            availablePairs: pairs,
            isLoading: false,
            lastUpdated: Date.now(),
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to fetch pairs';
          set({ error: message, isLoading: false });
        }
      },

      selectStrategy: (strategyName: string) => {
        set({ selectedStrategyName: strategyName });
        get().fetchStrategy(strategyName);
      },

      setError: (error) => {
        set({ error });
      },

      reset: () => {
        set(initialState);
      },
    }),
    { name: 'StrategyStore' }
  )
);