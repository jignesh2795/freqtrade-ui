# FreqTrade Setup Guide

## Installation

1. Navigate to FreqTrade directory:
```bash
cd freqtrade
```

2. Install dependencies:
```bash
./setup.sh -i
```

3. Activate virtual environment:
```bash
source .env/bin/activate
```

## Running FreqTrade

### Development Mode (Dry Run)
```bash
freqtrade trade --config user_data/configs/config.json
```

## API Endpoints

- Base URL: http://127.0.0.1:8081/api/v1
- API Docs: http://127.0.0.1:8081/docs

### Key Endpoints

- GET /ping - Health check
- GET /status - Bot status (requires authentication)
- GET /profit - Profit information (requires authentication)
- GET /trades - Active trades (requires authentication)
- POST /start - Start bot (requires authentication)
- POST /stop - Stop bot (requires authentication)

### Authentication

API endpoints require Basic Authentication:
- Username: freqtrader
- Password: your-password

Example using curl:
```bash
curl -u freqtrader:your-password http://127.0.0.1:8081/api/v1/status
```

## Configuration

- Main config file: freqtrade/user_data/configs/config.json

### Important Settings

- `api_server.enabled`: Must be true
- `api_server.listen_ip_address`: 127.0.0.1
- `api_server.listen_port`: 8081
- `api_server.CORS_origins`: Add React dev server URLs
- `dry_run`: Set to true for development

## Troubleshooting

### API not accessible

- Check if FreqTrade is running
- Verify port 8081 is not in use
- Check firewall settings

### CORS errors

- Ensure React dev server URL is in CORS_origins
- Restart FreqTrade after config changes