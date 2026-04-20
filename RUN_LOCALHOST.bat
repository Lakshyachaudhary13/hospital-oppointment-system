@echo off
echo ==================================================
echo   CAREPLUS ^| LOCALHOST STARTUP (MOCK BACKEND)
echo ==================================================
echo.

echo [1/2] Checking Dependencies...
if not exist node_modules (
    echo Installing required packages...
    call npm install express cors body-parser
)

echo.
echo [2/2] Launching Server and Portal...
echo You can open local in a min...
echo Server starting on http://localhost:8080
echo.

:: Start the node server in a new minimized window
start /min cmd /c "node server.js"

:: Wait a moment for server to initialize
ping 127.0.0.1 -n 4 > nul

:: Open the browser
start http://localhost:8080/index.html

echo.
echo ==================================================
echo   SYSTEM IS LIVE AT: http://localhost:8080
echo   (Close this window to stop the server)
echo ==================================================
pause
