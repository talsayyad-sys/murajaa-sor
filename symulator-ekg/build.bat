@echo off
chcp 65001 >nul
title Budowanie wersji produkcyjnej - Symulator EKG
setlocal

where node >nul 2>nul
if errorlevel 1 goto nonode
if not exist node_modules goto nodeps

echo Budowanie wersji produkcyjnej (offline)...
call npm run build
if errorlevel 1 goto fail

echo.
echo [OK] Budowanie zakonczone. Pliki gotowe w katalogu "dist".
echo Uruchomienie wersji produkcyjnej: run_production.bat
pause
goto end

:nonode
echo [BLAD] Brak Node.js. Zainstaluj Node.js LTS z https://nodejs.org
pause
goto end

:nodeps
echo [BLAD] Brak zaleznosci. Najpierw uruchom install.bat
pause
goto end

:fail
echo [BLAD] Budowanie nie powiodlo sie - sprawdz komunikaty powyzej.
pause
goto end

:end
endlocal
