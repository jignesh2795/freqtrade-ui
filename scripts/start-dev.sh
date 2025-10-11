#!/bin/bash

echo "🚀 Starting FreqTrade UI Development Environment"
echo "================================================"

# Start FreqTrade in background
echo "Starting FreqTrade..."
cd freqtrade
source .env/bin/activate
freqtrade trade --config user_data/configs/config.json &
FREQTRADE_PID=$!

# Wait for FreqTrade to start
sleep 3

# Start Frontend
echo "Starting Frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Services started!"
echo "FreqTrade API: http://localhost:8081"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all services"

# Trap Ctrl+C to kill both processes
trap "kill $FREQTRADE_PID $FRONTEND_PID" EXIT

# Wait
wait