import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { tradeService } from '@/services/freqtrade';
import type { Trade } from '@/types';

export interface TradeFilters {
  pair?: string;
  minProfit?: number;
  maxProfit?: number;
}

export interface TradeState {
  // State
  openTrades: Trade[];
  closedTrades: Trade[];
  selectedTrade: Trade | null;
  filters: TradeFilters;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;

  // Actions
  fetchOpenTrades: () => Promise<void>;
  fetchClosedTrades: (limit?: number) => Promise<void>;
  fetchTrade: (tradeId: number) => Promise<void>;
  forceEnter: (pair: string, price?: number) => Promise<boolean>;
  forceExit: (tradeId: number) => Promise<boolean>;
  selectTrade: (trade: Trade | null) => void;
  updateTrade: (trade: Trade) => void;
  addTrade: (trade: Trade) => void;
  removeTrade: (tradeId: number) => void;
  setFilters: (filters: Partial<TradeFilters>) => void;
  clearFilters: () => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  openTrades: [],
  closedTrades: [],
  selectedTrade: null,
  filters: {},
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const useTradeStore = create<TradeState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchOpenTrades: async () => {
        set({ isLoading: true, error: null });
        try {
          const trades = await tradeService.getOpenTrades();
          set({
            openTrades: trades,
            isLoading: false,
            lastUpdated: Date.now(),
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to fetch open trades';
          set({ error: message, isLoading: false });
        }
        },

      fetchClosedTrades: async (limit = 50) => {
        set({ isLoading: true, error: null });
        try {
          const trades = await tradeService.getTradeHistory({ limit });
          set({
            closedTrades: trades,
            isLoading: false,
            lastUpdated: Date.now(),
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to fetch closed trades';
          set({ error: message, isLoading: false });
        }
      },

      fetchTrade: async (tradeId: number) => {
        set({ isLoading: true, error: null });
        try {
          const trade = await tradeService.getTrade(tradeId);
          set({
            selectedTrade: trade,
            isLoading: false,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to fetch trade';
          set({ error: message, isLoading: false });
        }
      },

      forceEnter: async (pair: string, price?: number) => {
        set({ isLoading: true, error: null });
        try {
          const trade = await tradeService.forceEnter({
            pair,
            price,
          });
          
          // Add to open trades
          set((state) => ({
            openTrades: [...state.openTrades, trade],
            isLoading: false,
          }));
          
          return true;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to force enter';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      forceExit: async (tradeId: number) => {
        set({ isLoading: true, error: null });
        try {
          await tradeService.forceExit({ tradeid: tradeId });
          
          // Remove from open trades
          set((state) => ({
            openTrades: state.openTrades.filter((t) => t.trade_id !== tradeId),
            isLoading: false,
          }));
          
          // Refresh to get updated trade in closed trades
          get().fetchClosedTrades();
          
          return true;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to force exit';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      selectTrade: (trade) => {
        set({ selectedTrade: trade });
      },

      updateTrade: (updatedTrade) => {
        set((state) => {
          const openIndex = state.openTrades.findIndex(
            (t) => t.trade_id === updatedTrade.trade_id
          );

          if (openIndex !== -1) {
            const newOpenTrades = [...state.openTrades];
            newOpenTrades[openIndex] = updatedTrade;
            return { openTrades: newOpenTrades };
          }

          return state;
        });
      },

      addTrade: (trade) => {
        set((state) => ({
          openTrades: [...state.openTrades, trade],
        }));
      },

      removeTrade: (tradeId) => {
        set((state) => ({
          openTrades: state.openTrades.filter((t) => t.trade_id !== tradeId),
        }));
      },

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      clearFilters: () => {
        set({ filters: {} });
      },

      setError: (error) => {
        set({ error });
      },

      reset: () => {
        set(initialState);
      },
    }),
    { name: 'TradeStore' }
  )
);

// Computed selector for filtered trades
export const useFilteredTrades = () => {
  const { openTrades, filters } = useTradeStore();

  return openTrades.filter((trade) => {
    if (filters.pair && trade.pair !== filters.pair) return false;
    
    if (filters.minProfit !== undefined) {
      const profit = trade.profit_ratio || 0;
      if (profit < filters.minProfit) return false;
    }
    
    if (filters.maxProfit !== undefined) {
      const profit = trade.profit_ratio || 0;
      if (profit > filters.maxProfit) return false;
    }

    return true;
  });
};