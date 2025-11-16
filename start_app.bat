@echo off
echo Starting Application...

REM Check if node_modules folder exists
if not exist "node_modules" (
    echo node_modules not found. Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo npm install failed. Please check the error above.
        pause
        exit /b 1
    )
    echo Dependencies installed successfully.
) else (
    echo node_modules found. Skipping installation.
)

echo Starting development server...
call npm run dev

pause

