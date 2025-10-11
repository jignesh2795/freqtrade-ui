import { useEffect, useRef, useCallback } from 'react';

export interface UsePollingOptions {
  enabled?: boolean;
  interval?: number;
  onError?: (error: Error) => void;
}

/**
 * Custom hook for polling an API endpoint
 */
export function usePolling(
  callback: () => Promise<void>,
  options: UsePollingOptions = {}
): { start: () => void; stop: () => void } {
  const { enabled = true, interval = 5000, onError } = options;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const start = useCallback(() => {
    if (intervalRef.current) return;

    const poll = async () => {
      try {
        await callback();
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Polling error');
        onError?.(err);
      }
    };

    // Initial call
    if (enabledRef.current) {
      poll();
    }

    // Set up interval
    intervalRef.current = setInterval(() => {
      if (enabledRef.current) {
        poll();
      }
    }, interval);
  }, [callback, interval, onError]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      start();
    } else {
      stop();
    }

    return () => stop();
  }, [enabled, start, stop]);

  return { start, stop };
}