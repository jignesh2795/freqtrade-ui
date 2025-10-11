import { useEffect, useCallback, useRef } from 'react';
import { wsClient, WebSocketEventType, WebSocketCallback } from '@/services/websocket';

export interface UseWebSocketOptions {
  autoConnect?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export interface UseWebSocketReturn {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  subscribe: (event: WebSocketEventType, callback: WebSocketCallback) => () => void;
  emit: (event: string, data?: any) => void;
}

/**
 * Custom hook for WebSocket connection management
 */
export function useWebSocket(options: UseWebSocketOptions = {}): UseWebSocketReturn {
  const { autoConnect = true, onConnect, onDisconnect, onError } = options;
  
  const isConnectedRef = useRef(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const connect = useCallback(() => {
    try {
      wsClient.connect();
      isConnectedRef.current = true;
      optionsRef.current.onConnect?.();
    } catch (error) {
      const err = error instanceof Error ? error : new Error('WebSocket connection failed');
      optionsRef.current.onError?.(err);
    }
  }, []);

  const disconnect = useCallback(() => {
    wsClient.disconnect();
    isConnectedRef.current = false;
    optionsRef.current.onDisconnect?.();
  }, []);

  const subscribe = useCallback(
    (event: WebSocketEventType, callback: WebSocketCallback) => {
      return wsClient.on(event, callback);
    },
    []
  );

  const emit = useCallback((event: string, data?: any) => {
    wsClient.emit(event, data);
  }, []);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      if (autoConnect) {
        disconnect();
      }
    };
  }, [autoConnect, connect, disconnect]);

  return {
    isConnected: isConnectedRef.current,
    connect,
    disconnect,
    subscribe,
    emit,
  };
}