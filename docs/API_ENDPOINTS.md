# FreqTrade API Endpoints Reference

## Base URL
`http://127.0.0.1:8081/api/v1`

## Authentication
Most endpoints require Basic Authentication with:
- Username: `freqtrader`
- Password: `your-password`

Example:
```bash
curl -u freqtrader:your-password http://127.0.0.1:8081/api/v1/status
```

## Endpoints

### Health & Status
- `GET /ping` - Health check (no authentication required)
- `GET /version` - FreqTrade version
- `GET /status` - Bot status and configuration
- `GET /balance` - Get account balance

### Bot Control
- `POST /start` - Start the bot
- `POST /stop` - Stop the bot
- `POST /stopbuy` - Stop buying (but keep selling)
- `POST /reload_config` - Reload configuration

### Trading
- `GET /trades` - Get open trades
- `GET /trade/{tradeid}` - Get specific trade
- `DELETE /trades/{tradeid}` - Force sell a trade
- `GET /trades/history` - Get trade history
- `POST /forcebuy` - Force buy (if enabled)
- `POST /forcesell` - Force sell

### Performance & Stats
- `GET /profit` - Get profit information
- `GET /performance` - Get performance stats
- `GET /stats` - Get statistics

### Strategy & Config
- `GET /strategies` - List available strategies
- `GET /strategy/{strategy}` - Get strategy details
- `GET /available_pairs` - Get available pairs
- `GET /whitelist` - Get current whitelist
- `POST /whitelist` - Update whitelist

### Backtesting
- `POST /backtest` - Start backtest
- `GET /backtest` - Get backtest status
- `GET /backtest/abort` - Abort running backtest

### Logs
- `GET /logs` - Get bot logs

## WebSocket Events
- `trade_update` - Trade state changes
- `status_update` - Bot status changes
- `whitelist_update` - Whitelist changes