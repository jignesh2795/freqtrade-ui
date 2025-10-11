@echo off
echo 🚀 Starting FreqTrade UI Development Environment
echo ================================================

REM Start FreqTrade in background
echo Starting FreqTrade...
cd freqtrade
call .env\Scripts\activate.bat
start "FreqTrade" /D "freqtrade" freqtrade trade --config user_data/configs/config.json

REM Wait for FreqTrade to start
timeout /t 3 /nobreak >nul

REM Start Frontend
echo Starting Frontend...
cd ../frontend
if exist "frontend" (
    start "Frontend" /D "../frontend" npm run dev
) else (
    echo Frontend directory not found. Skipping frontend start.
)

echo.
echo ✅ Services started!
echo FreqTrade API: http://127.0.0.1:8081
echo Frontend: http://localhost:5173
echo.
echo Press Ctrl+C to stop this script
echo Note: You may need to manually stop the FreqTrade and Frontend processes