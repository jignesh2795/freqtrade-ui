# Trade Management System

## Overview
Complete trade management interface with filtering, sorting, and force entry/exit capabilities.

## Features

### Trade List
- **Dual View**: Open and Closed trades in separate tabs
- **Sortable Columns**: Click column headers to sort
- **Real-time Updates**: Auto-refresh every 10 seconds
- **Pagination**: Navigate large trade lists with customizable page size

### Filtering
- **Search**: Filter by trading pair name
- **Profit Range**: Min/Max profit percentage filters
- **Status**: Filter by open/closed status
- **Active Filter Count**: Badge showing number of active filters
- **Clear Filters**: Quick reset button

### Trade Details
- **Comprehensive View**: All trade information in modal
- **Key Metrics**: Entry price, exit price, amount, duration
- **Profit Analysis**: Visual profit/loss indicators
- **Fee Breakdown**: Open and close fees
- **Trade Timeline**: Open and close timestamps
- **Strategy Info**: Strategy name and parameters

### Force Entry
- **Manual Trade Opening**: Override strategy signals
- **Pair Selection**: Choose from available pairs
- **Order Types**: Market or Limit orders
- **Price Control**: Set custom entry price for limit orders
- **Validation**: Form validation before submission
- **Safety Warning**: Alert about bypassing strategy

### Force Exit
- **Manual Trade Closing**: Exit trades manually
- **Confirmation**: Prevent accidental exits
- **Immediate Effect**: Trade closed and moved to history
- **Refresh**: Automatic list update after exit

## Components

### TradeTable
```typescript
<TradeTable
  trades={trades}
  onSelectTrade={(trade) => showDetails(trade)}
  loading={isLoading}
/>
```
Features:
- Sortable columns
- Profit/loss color coding
- Status badges
- Click to view details
- Loading skeleton
- Empty state

### TradeFilters
```typescript
<TradeFilters
  onFilterChange={(filters) => applyFilters(filters)}
  activeFiltersCount={count}
/>
```
Features:
- Search input
- Advanced filters panel
- Min/Max profit filters
- Status dropdown
- Clear all button
- Filter count badge

### TradeDetailsModal
```typescript
<TradeDetailsModal
  trade={selectedTrade}
  isOpen={showModal}
  onClose={closeModal}
  onForceExit={(id) => exitTrade(id)}
/>
```
Features:
- Full trade information
- Key metrics cards
- Profit banner
- Fee breakdown
- Force exit button
- Responsive layout

### ForceEntryModal
```typescript
<ForceEntryModal
  isOpen={showModal}
  onClose={closeModal}
/>
```
Features:
- Pair selection
- Order type choice
- Price input for limits
- Form validation
- Warning message
- Success/error handling

## State Management

### Trade Store
```typescript
const {
  openTrades,
  closedTrades,
  fetchOpenTrades,
  fetchClosedTrades,
  forceEntry,
  forceExit,
  filters,
  setFilters,
  clearFilters,
} = useTradeStore();
```

Actions:
- `fetchOpenTrades()`: Load open trades
- `fetchClosedTrades(limit)`: Load trade history
- `forceEntry(params)`: Open new trade
- `forceExit(tradeId)`: Close trade manually
- `setFilters(filters)`: Apply filters
- `clearFilters()`: Reset filters

## API Integration

### Endpoints Used
- `GET /trades`: Fetch open trades
- `GET /trades/history`: Fetch closed trades
- `POST /forceenter`: Force entry
- `POST /forceexit`: Force exit
- `GET /trade/{id}`: Get trade details

### Auto-Refresh
- Open trades: Every 10 seconds
- Closed trades: On demand
- After actions: Immediate refresh

## Usage Examples

### View Open Trades
1. Navigate to Trades page
2. "Open Trades" tab selected by default
3. Auto-refreshes every 10 seconds

### Filter Trades
1. Use search box for pair name
2. Click "Filters" button for advanced options
3. Set min/max profit percentage
4. Filter updates in real-time

### View Trade Details
1. Click on any trade row
2. Modal opens with full information
3. Force exit button for open trades
4. Close modal with button or backdrop

### Force Entry
1. Click "Force Entry" button
2. Select trading pair
3. Choose order type
4. Enter price if limit order
5. Confirm to open trade

### Force Exit
1. Open trade details modal
2. Click "Force Exit" button
3. Confirm action
4. Trade closed and moved to history

## Error Handling

### Network Errors
- Toast notification with error message
- Retry button in notification
- No data loss

### Validation Errors
- Form validation before submission
- Clear error messages
- Field-level validation

### API Errors
- Graceful error handling
- User-friendly messages
- Automatic retry for transient errors

## Performance

### Optimizations
- Pagination for large lists
- Memoized filtered trades
- Lazy loading modals
- Efficient re-renders

### Loading States
- Skeleton loaders
- Loading spinners
- Disabled buttons during actions
- Progress indicators

## Accessibility

### Keyboard Navigation
- Tab through controls
- Enter to submit forms
- Escape to close modals
- Arrow keys in table

### Screen Readers
- ARIA labels
- Semantic HTML
- Clear button labels
- Status announcements

## Future Enhancements

### Planned Features
- Bulk actions (close multiple trades)
- Export trades to CSV
- Trade notes/annotations
- Advanced charting in modal
- Trade comparison
- Performance analytics per trade
- Keyboard shortcuts
- Custom columns selection
- Save filter presets
- Trade grouping by strategy

### Ideas
- Real-time price updates in table
- Trade alerts and notifications
- Trade templates for force entry
- Risk/reward calculator
- Position sizing calculator