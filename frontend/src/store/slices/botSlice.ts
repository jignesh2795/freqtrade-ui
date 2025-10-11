import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { botService } from '@/services/freqtrade';
import type { BotStatus, BotConfig } from '@/types';

export interface BotState {
  // State
  status: BotStatus | null;
  config: BotConfig | null;
  version: string | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;

  // Actions
  fetchStatus: () => Promise<void>;
  fetchConfig: () => Promise<void>;
  fetchVersion: () => Promise<void>;
  startBot: () => Promise<boolean>;
  stopBot: () => Promise<boolean>;
  stopBuy: () => Promise<boolean>;
  reloadConfig: () => Promise<boolean>;
  ping: () => Promise<boolean>;
  updateStatus: (status: Partial<BotStatus>) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  status: null,
  config: null,
  version: null,
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const useBotStore = create<BotState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        fetchStatus: async () => {
          set({ isLoading: true, error: null });
          try {
            const status = await botService.getStatus();
            set({
              status,
              isLoading: false,
              lastUpdated: Date.now(),
            });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch status';
            set({ error: message, isLoading: false });
          }
        },

        fetchConfig: async () => {
          set({ isLoading: true, error: null });
          try {
            const config = await botService.getConfig();
            set({
              config,
              isLoading: false,
              lastUpdated: Date.now(),
            });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch config';
            set({ error: message, isLoading: false });
          }
        },

        fetchVersion: async () => {
          try {
            const { version } = await botService.getVersion();
            set({ version });
          } catch (error) {
            console.error('Failed to fetch version:', error);
          }
        },

        startBot: async () => {
          set({ isLoading: true, error: null });
          try {
            await botService.start();
            await get().fetchStatus();
            set({ isLoading: false });
            return true;
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to start bot';
            set({ error: message, isLoading: false });
            return false;
          }
        },

        stopBot: async () => {
          set({ isLoading: true, error: null });
          try {
            await botService.stop();
            await get().fetchStatus();
            set({ isLoading: false });
            return true;
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to stop bot';
            set({ error: message, isLoading: false });
            return false;
          }
        },

        stopBuy: async () => {
          set({ isLoading: true, error: null });
          try {
            await botService.stopBuy();
            await get().fetchStatus();
            set({ isLoading: false });
            return true;
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to stop buy';
            set({ error: message, isLoading: false });
            return false;
          }
        },

        reloadConfig: async () => {
          set({ isLoading: true, error: null });
          try {
            await botService.reloadConfig();
            await get().fetchConfig();
            await get().fetchStatus();
            set({ isLoading: false });
            return true;
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to reload config';
            set({ error: message, isLoading: false });
            return false;
          }
        },

        ping: async () => {
          try {
            await botService.ping();
            return true;
          } catch (error) {
            return false;
          }
        },

        updateStatus: (statusUpdate) => {
          set((state) => ({
            status: state.status ? { ...state.status, ...statusUpdate } : null,
            lastUpdated: Date.now(),
          }));
        },

        setError: (error) => {
          set({ error });
        },

        clearError: () => {
          set({ error: null });
        },

        reset: () => {
          set(initialState);
        },
      }),
      {
        name: 'bot-store',
        partialize: (state) => ({
          // Only persist version, not the full state
          version: state.version,
        }),
      }
    ),
    { name: 'BotStore' }
  )
);