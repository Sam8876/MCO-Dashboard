@echo off
setlocal enabledelayedexpansion
echo Starting Application Setup...

echo.
echo ========================================
echo Checking dependencies...
echo ========================================

REM Check if node_modules folder exists
if not exist "node_modules" (
    echo node_modules not found. Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo.
        echo npm install failed. Please check the error above.
        pause
        exit /b 1
    )
    echo Dependencies installed successfully.
) else (
    echo node_modules found. Skipping installation.
)

echo.
echo ========================================
echo Starting development server...
echo ========================================
echo Press Ctrl+C to stop the server.
cmd /k "npm run dev"
