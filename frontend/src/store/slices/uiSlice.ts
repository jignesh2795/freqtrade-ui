import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface UIState {
  // Theme
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Notifications
  notificationPosition: NotificationPosition;
  setNotificationPosition: (position: NotificationPosition) => void;

  // Modal
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;

  // Loading overlay
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;

  // Selected items
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;

  // Layout preferences
  chartHeight: number;
  setChartHeight: (height: number) => void;

  // Reset
  reset: () => void;
}

const initialState = {
  theme: 'dark' as Theme,
  sidebarCollapsed: false,
  notificationPosition: 'top-right' as NotificationPosition,
  activeModal: null,
  globalLoading: false,
  selectedTimeframe: '1h',
  chartHeight: 400,
};

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        toggleTheme: () => {
          set((state) => ({
            theme: state.theme === 'dark' ? 'light' : 'dark',
          }));
        },

        setTheme: (theme) => {
          set({ theme });
        },

        toggleSidebar: () => {
          set((state) => ({
            sidebarCollapsed: !state.sidebarCollapsed,
          }));
        },

        setSidebarCollapsed: (collapsed) => {
          set({ sidebarCollapsed: collapsed });
        },

        setNotificationPosition: (position) => {
          set({ notificationPosition: position });
        },

        openModal: (modalId) => {
          set({ activeModal: modalId });
        },

        closeModal: () => {
          set({ activeModal: null });
        },

        setGlobalLoading: (loading) => {
          set({ globalLoading: loading });
        },

        setSelectedTimeframe: (timeframe) => {
          set({ selectedTimeframe: timeframe });
        },

        setChartHeight: (height) => {
          set({ chartHeight: height });
        },

        reset: () => {
          set(initialState);
        },
      }),
      {
        name: 'ui-store',
        partialize: (state) => ({
          // Persist these UI preferences
          theme: state.theme,
          sidebarCollapsed: state.sidebarCollapsed,
          notificationPosition: state.notificationPosition,
          selectedTimeframe: state.selectedTimeframe,
          chartHeight: state.chartHeight,
        }),
      }
    ),
    { name: 'UIStore' }
  )
);