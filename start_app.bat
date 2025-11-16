@echo off
setlocal enabledelayedexpansion
echo Starting Application Setup...

REM Check if Node.js is installed
where node >nul 2>&1
if errorlevel 1 (
    echo Node.js not found. Installing Node.js...
    goto :install_nodejs
)

REM Check if npm is installed
where npm >nul 2>&1
if errorlevel 1 (
    echo npm not found. Installing Node.js (includes npm)...
    goto :install_nodejs
)

echo Node.js and npm are installed.
goto :check_dependencies

:install_nodejs
echo.
echo ========================================
echo Installing Node.js...
echo ========================================
echo.

REM Detect system architecture (x64 or x86)
if "%PROCESSOR_ARCHITECTURE%"=="AMD64" (
    set "ARCH=x64"
) else if "%PROCESSOR_ARCHITECTURE%"=="x86" (
    set "ARCH=x86"
) else (
    set "ARCH=x64"
)

REM Use latest LTS version of Node.js (20.x as of 2024)
set "NODE_VERSION=20.11.0"
set "NODE_INSTALLER=node-v%NODE_VERSION%-%ARCH%.msi"
set "NODE_URL=https://nodejs.org/dist/v%NODE_VERSION%/%NODE_INSTALLER%"
set "INSTALLER_PATH=%TEMP%\%NODE_INSTALLER%"

echo Downloading Node.js v%NODE_VERSION% (%ARCH%)...
echo URL: %NODE_URL%

REM Try PowerShell first (Windows 10+), then try curl
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '%NODE_URL%' -OutFile '%INSTALLER_PATH%'}" 2>nul
if errorlevel 1 (
    echo PowerShell download failed. Trying curl...
    curl -L -o "%INSTALLER_PATH%" "%NODE_URL%" 2>nul
    if errorlevel 1 (
        echo.
        echo ERROR: Could not download Node.js installer.
        echo Please download and install Node.js manually from: https://nodejs.org/
        echo.
        pause
        exit /b 1
    )
)

if not exist "%INSTALLER_PATH%" (
    echo.
    echo ERROR: Node.js installer was not downloaded successfully.
    echo Please download and install Node.js manually from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js installer downloaded successfully.
echo Installing Node.js (this may require administrator privileges)...
echo Please wait, this may take a few minutes...

REM Install Node.js silently and add to PATH
msiexec /i "%INSTALLER_PATH%" /quiet /norestart ADDLOCAL=ALL

REM Wait a moment for installation to complete
timeout /t 5 /nobreak >nul

REM Refresh environment variables
call refreshenv.cmd 2>nul
if errorlevel 1 (
    REM If refreshenv doesn't exist, try to refresh PATH manually
    for /f "tokens=2*" %%A in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v PATH 2^>nul') do set "SYSTEM_PATH=%%B"
    set "PATH=!SYSTEM_PATH!;%PATH%"
)

REM Verify installation
where node >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Node.js installation may have failed or PATH was not updated.
    echo Please restart your terminal/command prompt and run this script again.
    echo Or manually add Node.js to your PATH environment variable.
    echo.
    pause
    exit /b 1
)

echo Node.js installed successfully!

REM Clean up installer
del "%INSTALLER_PATH%" 2>nul

:check_dependencies
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
call npm run dev

pause
