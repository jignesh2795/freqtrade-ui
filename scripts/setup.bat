@echo off
echo 🚀 FreqTrade UI - Setup Script
echo ================================

REM Check if FreqTrade exists
if not exist "freqtrade" (
    echo ❌ FreqTrade directory not found!
    exit /b 1
)

REM Setup FreqTrade
echo 📦 Setting up FreqTrade...
cd freqtrade
call setup.bat -i

echo ✅ FreqTrade setup complete!

REM Setup Frontend (will be added later)
if exist "frontend" (
    echo 📦 Setting up Frontend...
    cd ../frontend
    npm install
    echo ✅ Frontend setup complete!
)

echo.
echo ✨ Setup complete! Next steps:
echo 1. cd freqtrade && .env\Scripts\activate.bat
echo 2. freqtrade trade --config user_data/configs/config.json
echo 3. In another terminal: cd frontend && npm run dev