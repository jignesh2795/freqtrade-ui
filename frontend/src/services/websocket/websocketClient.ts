import { io, Socket } from 'socket.io-client';
import { API_CONFIG } from '@/config';

export type WebSocketEventType =
  | 'status'
  | 'whitelist'
  | 'analyzed_df'
  | 'trade_update'
  | 'new_candle'
  | 'pong';

export type WebSocketCallback = (data: any) => void;

export interface WebSocketConfig {
  url: string;
  autoConnect?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
}

/**
 * WebSocket Client for real-time FreqTrade updates
 */
class WebSocketClient {
  private socket: Socket | null = null;
  private config: WebSocketConfig;
  private eventHandlers: Map<WebSocketEventType, Set<WebSocketCallback>>;
  private reconnectAttempts: number = 0;
  private isManualDisconnect: boolean = false;

  constructor(config?: Partial<WebSocketConfig>) {
    this.config = {
      url: config?.url || API_CONFIG.wsURL,
      autoConnect: config?.autoConnect ?? false,
      reconnectionAttempts: config?.reconnectionAttempts ?? 5,
      reconnectionDelay: config?.reconnectionDelay ?? 3000,
    };

    this.eventHandlers = new Map();
  }

  /**
   * Connect to WebSocket server
   */
  public connect(): void {
    if (this.socket?.connected) {
      console.warn('[WebSocket] Already connected');
      return;
    }

    this.isManualDisconnect = false;

    console.log(`[WebSocket] Connecting to ${this.config.url}`);

    this.socket = io(this.config.url, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: this.config.reconnectionAttempts,
      reconnectionDelay: this.config.reconnectionDelay,
    });

    this.setupEventListeners();
  }

  /**
   * Disconnect from WebSocket server
   */
  public disconnect(): void {
    this.isManualDisconnect = true;
    
    if (this.socket) {
      console.log('[WebSocket] Disconnecting');
      this.socket.disconnect();
      this.socket = null;
    }

    this.reconnectAttempts = 0;
  }

  /**
   * Check if connected
   */
  public isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Subscribe to a specific event
   */
  public on(event: WebSocketEventType, callback: WebSocketCallback): () => void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }

    this.eventHandlers.get(event)!.add(callback);

    // Return unsubscribe function
    return () => this.off(event, callback);
  }

  /**
   * Unsubscribe from a specific event
   */
  public off(event: WebSocketEventType, callback: WebSocketCallback): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.delete(callback);
    }
  }

  /**
   * Emit an event to server
   */
  public emit(event: string, data?: any): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('[WebSocket] Cannot emit, not connected');
    }
  }

  /**
   * Setup internal event listeners
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      console.log('[WebSocket] Connected');
      this.reconnectAttempts = 0;
      
      // Emit subscribe event to receive updates
      this.emit('subscribe', { type: 'status' });
      this.emit('subscribe', { type: 'whitelist' });
      this.emit('subscribe', { type: 'trades' });
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`[WebSocket] Disconnected: ${reason}`);
    });

    this.socket.on('connect_error', (error) => {
      console.error('[WebSocket] Connection error:', error);
      this.reconnectAttempts++;

      if (
        !this.isManualDisconnect &&
        this.reconnectAttempts >= (this.config.reconnectionAttempts || 5)
      ) {
        console.error('[WebSocket] Max reconnection attempts reached');
        this.disconnect();
      }
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`[WebSocket] Reconnect attempt ${attemptNumber}`);
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log(`[WebSocket] Reconnected after ${attemptNumber} attempts`);
      this.reconnectAttempts = 0;
    });

    // FreqTrade specific events
    this.setupFreqTradeEvents();
  }

  /**
   * Setup FreqTrade specific event handlers
   */
  private setupFreqTradeEvents(): void {
    if (!this.socket) return;

    // Status updates
    this.socket.on('status', (data) => {
      this.handleEvent('status', data);
    });

    // Whitelist updates
    this.socket.on('whitelist', (data) => {
      this.handleEvent('whitelist', data);
    });

    // Trade updates
    this.socket.on('trade_update', (data) => {
      this.handleEvent('trade_update', data);
    });

    // Analyzed dataframe
    this.socket.on('analyzed_df', (data) => {
      this.handleEvent('analyzed_df', data);
    });

    // New candle
    this.socket.on('new_candle', (data) => {
      this.handleEvent('new_candle', data);
    });

    // Pong (heartbeat response)
    this.socket.on('pong', (data) => {
      this.handleEvent('pong', data);
    });
  }

  /**
   * Handle incoming events and notify subscribers
   */
  private handleEvent(event: WebSocketEventType, data: any): void {
    if (import.meta.env.DEV) {
      console.log(`[WebSocket] Event: ${event}`, data);
    }

    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`[WebSocket] Error in ${event} handler:`, error);
        }
      });
    }
  }

  /**
   * Send ping to server (heartbeat)
   */
  public ping(): void {
    this.emit('ping');
  }

  /**
   * Clear all event handlers
   */
  public clearAllHandlers(): void {
    this.eventHandlers.clear();
  }
}

// Export singleton instance
export const wsClient = new WebSocketClient();