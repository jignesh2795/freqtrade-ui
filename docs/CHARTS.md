# Charts System

## Overview
Professional trading charts with candlestick display, trade markers, and technical indicators using Lightweight Charts library.

## Features

### TradingChart Component
- **Candlestick Display**: OHLC data visualization
- **Volume Histogram**: Trading volume at chart bottom
- **Trade Markers**: Buy/sell points with prices
- **Responsive Design**: Auto-resize with window
- **Dark Theme**: Matching application design
- **Crosshair**: Price and time tracking
- **Time Scale**: Date and time display
- **Price Scale**: Dynamic price range

### Chart Controls
- **Timeframe Selector**: Switch between 1m to 1d
- **Pair Selector**: Choose trading pair from whitelist
- **Zoom Controls**: Zoom in/out functionality
- **Reset View**: Fit all content
- **Indicators Toggle**: Show/hide indicators
- **Refresh Button**: Reload chart data

### Trade Markers
- **Entry Markers**: Blue arrow pointing up below candle
- **Exit Markers**: Green (profit) or Red (loss) arrow above candle
- **Price Labels**: Show exact entry/exit prices
- **Automatic Placement**: Positioned at trade timestamps

## Components

### TradingChart
```typescript
<TradingChart
  data={ohlcvData}
  pair="BTC/USDT"
  trades={tradesArray}
  height={600}
  showVolume={true}
/>
```

Props:

- data: OHLCV candlestick data array
- pair: Trading pair name
- trades: Array of trades for markers (optional)
- height: Chart height in pixels (default: 500)
- showVolume: Show volume histogram (default: true)

### TimeframeSelector
```typescript
<TimeframeSelector
  selected="1h"
  onSelect={(tf) => setTimeframe(tf)}
  timeframes={['1m', '5m', '15m', '1h', '4h', '1d']}
/>
```

### PairSelector
```typescript
<PairSelector
  pairs={availablePairs}
  selected="BTC/USDT"
  onSelect={(pair) => setPair(pair)}
/>
```

### ChartControls
```typescript
<ChartControls
  onZoomIn={handleZoomIn}
  onZoomOut={handleZoomOut}
  onReset={handleReset}
  onRefresh={handleRefresh}
  onToggleIndicators={handleToggleIndicators}
  showIndicators={false}
  loading={isLoading}
/>
```

## Data Flow

### Loading Chart Data

1. User selects pair and timeframe
2. Fetch candle data from FreqTrade API
3. Transform data to Lightweight Charts format
4. Display candlesticks and volume
5. Add trade markers if available

### Trade Markers

1. Filter trades for selected pair
2. Map trades to marker format
3. Entry: Blue arrow at open_date
4. Exit: Green/Red arrow at close_date
5. Display on chart

### Real-time Updates

- Chart data loaded on pair/timeframe change
- Manual refresh via button
- Auto-resize on window change
- Markers update when trades change

## API Integration

### Endpoints Used

- GET /pair_candles: Fetch OHLCV data

```typescript
{
    pair: "BTC/USDT",
    timeframe: "1h",
    limit: 500
}
```

### Data Format

```typescript
interface OHLCV {
  timestamp: number;  // Unix timestamp in ms
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
```

## Customization

### Theme Colors

```typescript
// Candlesticks
upColor: '#22c55e',      // Green for up candles
downColor: '#ef4444',    // Red for down candles

// Volume
volumeColor: '#64748b',  // Gray for volume bars

// Background
background: '#0f172a',   // Dark background
textColor: '#94a3b8',    // Light gray text

// Grid
gridColor: '#1e293b',    // Subtle grid lines
```

### Trade Marker Colors

```typescript
// Entry (Buy)
color: '#3b82f6',        // Blue arrow

// Exit (Profit)
color: '#22c55e',        // Green arrow

// Exit (Loss)
color: '#ef4444',        // Red arrow
```

## Performance

### Optimizations

- Lazy loading of chart data
- Efficient data transformation
- Memoized calculations
- Auto-cleanup on unmount
- Debounced resize handler

### Data Limits

- Default: 500 candles loaded
- Adjustable via API params
- Pagination for historical data
- Memory-efficient rendering

## Usage Examples

### Basic Chart

```typescript
import { TradingChart } from '@/components/charts';

const MyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data
    const fetchData = async () => {
      const candles = await getCandles('BTC/USDT', '1h');
      setData(candles);
    };
    fetchData();
  }, []);

  return <TradingChart data={data} pair="BTC/USDT" />;
};
```

### Chart with Trade Markers

```typescript
const ChartWithTrades = () => {
  const { openTrades, closedTrades } = useTradeStore();
  const allTrades = [...openTrades, ...closedTrades];

  return (
    <TradingChart
      data={chartData}
      pair={selectedPair}
      trades={allTrades.filter(t => t.pair === selectedPair)}
    />
  );
};
```

### Full Chart Page

See ChartsPage.tsx for complete implementation with:

- Pair selection
- Timeframe selection
- Chart controls
- Trade filtering
- Statistics display
- Loading states

## Technical Details

### Lightweight Charts

- Version: Latest
- Library: TradingView's Lightweight Charts
- Type: Canvas-based rendering
- Performance: 60fps smooth scrolling
- Features: Crosshair, zooming, panning

### Canvas Rendering

- High performance
- Smooth animations
- Memory efficient
- Hardware accelerated

### Responsive Design

- Auto-resize on window change
- Maintains aspect ratio
- Mobile-friendly (future)
- Touch support ready

## Future Enhancements

### Planned Features

- Technical indicators (MA, EMA, RSI, MACD)
- Drawing tools (trendlines, fibonacci)
- Multiple chart layouts
- Compare multiple pairs
- Save chart configurations
- Export chart as image
- Real-time price updates via WebSocket
- Order book visualization
- Heatmap overlays
- Custom indicator builder

### Advanced Features

- Alerts on price levels
- Pattern recognition
- Backtesting overlay
- Strategy signals display
- Risk/reward zones
- Support/resistance levels
- Volume profile
- Time and sales

## Troubleshooting

### Common Issues

**Chart not displaying:**

- Check data format (timestamps in ms)
- Verify data array not empty
- Check console for errors

**Markers not showing:**

- Ensure trades array has correct timestamps
- Verify trade dates match data range
- Check marker data format

**Performance issues:**

- Reduce data points (use larger timeframe)
- Disable volume if not needed
- Check for memory leaks

**Resize not working:**

- Check container has width
- Verify resize handler attached
- Check for layout conflicts

### Browser Support

- Chrome: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- Edge: ✅ Fully supported
- Mobile: 🟡 Basic support (optimizations needed)