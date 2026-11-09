@echo off
chcp 65001 >nul
title Symulator EKG - wersja produkcyjna (offline)
setlocal
set "URL=http://localhost:5173"

where node >nul 2>nul
if errorlevel 1 goto nonode
if not exist node_modules goto nodeps
if not exist dist goto nodist

echo Uruchamianie wersji produkcyjnej (offline)...
start "Serwer produkcyjny - nie zamykaj tego okna" cmd /k npm run preview

echo Czekam na start serwera...
timeout /t 4 /nobreak >nul

set "CHROME="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" set "CHROME=%LocalAppData%\Google\Chrome\Application\chrome.exe"
if defined ProgramFiles(x86) if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if defined CHROME (
  start "" "%CHROME%" --new-window "%URL%"
) else (
  echo Nie wykryto Chrome - otwieram domyslna przegladarke.
  start "" "%URL%"
)
endlocal
goto :eof

:nonode
echo [BLAD] Brak Node.js. Zainstaluj Node.js LTS z https://nodejs.org
pause
goto :eof

:nodeps
echo [BLAD] Brak zaleznosci. Najpierw uruchom install.bat
pause
goto :eof

:nodist
echo [BLAD] Brak katalogu dist. Najpierw uruchom build.bat
pause
