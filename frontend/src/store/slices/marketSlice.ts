import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { marketService } from '@/services/freqtrade';
import type { OHLCV } from '@/types';

export interface MarketState {
  // State
  whitelist: string[];
  blacklist: string[];
  selectedPair: string | null;
  pairData: Record<string, OHLCV[]>;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;

  // Actions
  fetchWhitelist: () => Promise<void>;
  fetchBlacklist: () => Promise<void>;
  addToBlacklist: (pairs: string[]) => Promise<boolean>;
  removeFromBlacklist: (pairs: string[]) => Promise<boolean>;
  fetchPairData: (pair: string, timeframe: string) => Promise<void>;
  selectPair: (pair: string | null) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  whitelist: [],
  blacklist: [],
  selectedPair: null,
  pairData: {},
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const useMarketStore = create<MarketState>()(
  devtools(
    (set) => ({
      ...initialState,

      fetchWhitelist: async () => {
        set({ isLoading: true, error: null });
        try {
          const { whitelist } = await marketService.getWhitelist();
          set({
            whitelist,
            isLoading: false,
            lastUpdated: Date.now(),
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to fetch whitelist';
          set({ error: message, isLoading: false });
        }
      },

      fetchBlacklist: async () => {
        set({ isLoading: true, error: null });
        try {
          const { blacklist } = await marketService.getBlacklist();
          set({
            blacklist,
            isLoading: false,
            lastUpdated: Date.now(),
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to fetch blacklist';
          set({ error: message, isLoading: false });
        }
      },

      addToBlacklist: async (pairs: string[]) => {
        set({ isLoading: true, error: null });
        try {
          const { blacklist } = await marketService.addToBlacklist(pairs);
          set({
            blacklist,
            isLoading: false,
            lastUpdated: Date.now(),
          });
          return true;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to add to blacklist';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      removeFromBlacklist: async (pairs: string[]) => {
        set({ isLoading: true, error: null });
        try {
          const { blacklist } = await marketService.removeFromBlacklist(pairs);
          set({
            blacklist,
            isLoading: false,
            lastUpdated: Date.now(),
          });
          return true;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to remove from blacklist';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      fetchPairData: async (pair: string, timeframe: string) => {
        set({ isLoading: true, error: null });
        try {
          const data = await marketService.getTickerData(pair, timeframe);
          set((state) => ({
            pairData: {
              ...state.pairData,
              [`${pair}_${timeframe}`]: data,
            },
            isLoading: false,
            lastUpdated: Date.now(),
          }));
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to fetch pair data';
          set({ error: message, isLoading: false });
        }
      },

      selectPair: (pair) => {
        set({ selectedPair: pair });
      },

      setError: (error) => {
        set({ error });
      },

      reset: () => {
        set(initialState);
      },
    }),
    { name: 'MarketStore' }
  )
);