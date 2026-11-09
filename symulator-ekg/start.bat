@echo off
chcp 65001 >nul
title Symulator EKG - Medycyna Ratunkowa
setlocal
set "URL=http://localhost:5173"

where node >nul 2>nul
if errorlevel 1 goto nonode
where npm >nul 2>nul
if errorlevel 1 goto nonode
if not exist node_modules goto nodeps

echo ============================================
echo  Symulator EKG - Medycyna Ratunkowa
echo ============================================
echo Uruchamianie lokalnego serwera...
echo.
start "Serwer Symulatora EKG - nie zamykaj tego okna po zakonczeniu pracy" cmd /k npm run dev

echo Czekam na start serwera (ok. 6 sekund)...
timeout /t 6 /nobreak >nul

set "CHROME="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" set "CHROME=%LocalAppData%\Google\Chrome\Application\chrome.exe"
if defined ProgramFiles(x86) if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if defined CHROME goto openchrome

echo [INFO] Nie wykryto przegladarki Google Chrome.
echo Otwieram aplikacje w domyslnej przegladarce systemu Windows.
start "" "%URL%"
goto done

:openchrome
echo [OK] Otwieram aplikacje w Google Chrome...
start "" "%CHROME%" --new-window "%URL%"
goto done

:nonode
echo [BLAD] Brak Node.js. Zainstaluj Node.js LTS z https://nodejs.org, potem uruchom install.bat
pause
goto done

:nodeps
echo [BLAD] Brak zaleznosci. Najpierw uruchom install.bat
pause
goto done

:done
echo.
echo Aplikacja dostepna pod adresem %URL%
echo Aby zamknac aplikacje, zamknij okno "Serwer Symulatora EKG".
endlocal
