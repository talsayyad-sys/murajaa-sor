@echo off
chcp 65001 >nul
title Instalator - Symulator EKG
setlocal

where node >nul 2>nul
if errorlevel 1 goto nonode

echo ============================================
echo  INSTALATOR - Symulator EKG (Medycyna Ratunkowa)
echo ============================================
echo.
echo Instalowanie zaleznosci... (jednorazowo, moze potrwac kilka minut)
echo.
call npm install
if errorlevel 1 goto fail

echo.
echo [OK] Instalacja zakonczona pomyslnie.
echo Uruchom teraz plik start.bat
pause
goto end

:nonode
echo.
echo [BLAD] Nie znaleziono Node.js na komputerze.
echo.
echo Aby zainstalowac:
echo   1. Wejdz na https://nodejs.org
echo   2. Pobierz wersje LTS (zalecane 20.x)
echo   3. Podczas instalacji zaznacz opcje "Automatically install the necessary tools"
echo   4. Po instalacji uruchom ponownie ten plik (install.bat)
pause
goto end

:fail
echo.
echo [BLAD] Instalacja nie powiodla sie.
echo Sprawdz polaczenie z internetem i uruchom install.bat ponownie.
pause
goto end

:end
endlocal
