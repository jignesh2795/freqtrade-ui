#!/bin/bash

echo "🚀 FreqTrade UI - Setup Script"
echo "================================"

# Check if FreqTrade exists
if [ ! -d "freqtrade" ]; then
    echo "❌ FreqTrade directory not found!"
    exit 1
fi

# Setup FreqTrade
echo "📦 Setting up FreqTrade..."
cd freqtrade
./setup.sh -i

echo "✅ FreqTrade setup complete!"

# Setup Frontend (will be added later)
if [ -d "frontend" ]; then
    echo "📦 Setting up Frontend..."
    cd ../frontend
    npm install
    echo "✅ Frontend setup complete!"
fi

echo ""
echo "✨ Setup complete! Next steps:"
echo "1. cd freqtrade && source .env/bin/activate"
echo "2. freqtrade trade --config user_data/configs/config.json"
echo "3. In another terminal: cd frontend && npm run dev"