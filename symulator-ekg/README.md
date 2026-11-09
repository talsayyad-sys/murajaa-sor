# Symulator EKG – Medycyna Ratunkowa

Dydaktyczny symulator EKG i monitorowania pacjenta dla lekarzy medycyny ratunkowej.
Zawiera **100 przypadków klinicznych** w 10 kategoriach, dwa tryby monitorowania
oraz **Egzamin specjalizacyjny – Medycyna Ratunkowa**.

---

## WYMAGANIA

- **Windows 10 lub Windows 11**
- **Node.js LTS** (zalecane 20.x) – pobierz z https://nodejs.org
- **Google Chrome** (opcjonalnie – aplikacja otworzy się w domyślnej przeglądarce, jeśli Chrome nie zostanie wykryty)

---

## INSTALACJA (jednorazowa)

1. Pobierz i rozpakuj projekt (lub sklonuj gałąź `symulator-ekg`).
2. Otwórz folder `symulator-ekg` w Eksploratorze Windows.
3. **Kliknij dwukrotnie plik `install.bat`** i poczekaj na zakończenie (pierwsza instalacja może potrwać kilka minut – pobierane są zależności).
4. Po komunikacie `[OK] Instalacja zakonczona pomyslnie` przejdź do uruchomienia.

Jeśli `install.bat` wyświetli komunikat o braku Node.js:
- wejdź na https://nodejs.org,
- pobierz wersję **LTS** (np. 20.x),
- zainstaluj z domyślnymi ustawieniami,
- uruchom ponownie `install.bat`.

---

## URUCHAMIANIE (codzienne)

- **Kliknij dwukrotnie plik `start.bat`.**
- Aplikacja uruchomi lokalny serwer i **automatycznie otworzy się w Google Chrome**.
- Jeśli Chrome nie jest zainstalowany, aplikacja otworzy się w domyślnej przeglądarce Windows.
- Okno "Serwer Symulatora EKG" musi pozostać otwarte podczas pracy – zamknięcie go zamyka aplikację.

### Wersja produkcyjna (offline)
1. Uruchom `build.bat` (jednorazowo) – tworzy katalog `dist`.
2. Od tej pory uruchamiaj `run_production.bat` – działa bez narzędzi deweloperskich, szybciej.

---

## FUNKCJE

### Biblioteka 100 przypadków
| Kategoria | Liczba |
|---|---|
| Tachyarytmie | 15 |
| Bradyarytmie i bloki AV | 10 |
| Ostre zespoły wieńcowe | 15 |
| Zaburzenia elektrolitowe | 10 |
| Toksykologiczne EKG | 10 |
| Płucne i serce prawe | 10 |
| Dziedziczne zespoły arytmiczne | 10 |
| Nieprawidłowości rozrusznika | 5 |
| Naśladownictwa EKG | 5 |
| Zatrzymanie krążenia i po resuscytacji | 10 |

Każdy przypadek zawiera: prezentację kliniczną, wywiad, wyniki badań, EKG 12-odprowadzeniowe,
monitor parametrów życiowych, diagnostykę różnicową, rozpoznanie, postępowanie, oczekiwaną
odpowiedź, powikłania, wyjaśnienie edukacyjne i referencje (ERC, ESC, AHA, PTEiKCh).

### Monitory symulacyjne
- **Tryb monitora wieloparametrowego** (inspirowany przepływem pracy monitorów typu IntelliVue):
  EKG II, pletyzmografia SpO2, ciśnienie tętnicze, oddech, kapnografia (EtCO2), temperatura,
  limity alarmów, symulacja alarmów dźwiękowych/wizualnych.
- **Tryb defibrylatora** (inspirowany przepływem pracy typu R Series):
  wybór energii, ładowanie, wyładowanie, kardiowersja synchronizowana, stymulacja (pacing)
  z regulacją amperażu, RKO z informacją zwrotną, rejestr zdarzeń.

> Interfejsy są oryginalnymi projektami inspirowanymi klinicznym przepływem pracy – nie kopiują materiałów firmowych.

### Egzamin specjalizacyjny
- Losowy dobór przypadków (5–30 pytań), poziomy trudności ★–★★★, limit czasu na pytanie.
- Ocena: interpretacja EKG (40%), rozpoznanie stanu zagrażającego życiu (30%), leczenie (30%).
- Szczegółowa odpowiedź po każdym pytaniu, zapis wyników lokalnie, statystyki osobiste.

---

## STRUKTURA PROJEKTU

```
symulator-ekg/
├── install.bat            – instalacja zależności
├── start.bat              – uruchomienie (otwiera Chrome)
├── build.bat              – budowanie wersji produkcyjnej
├── run_production.bat     – uruchomienie wersji produkcyjnej (offline)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── scripts/verify.mjs     – weryfikacja 100 przypadków (npm run verify)
└── src/
    ├── main.tsx           – punkt wejścia
    ├── App.tsx            – nawigacja
    ├── styles.css
    ├── types.ts           – typy domenowe
    ├── rhythms.ts         – rejestr wzorców rytmów
    ├── engine.ts          – generowanie sygnału EKG
    ├── physio.ts          – silnik fizjologiczny
    ├── treatments.ts      – bank leków
    ├── categories.ts
    ├── storage.ts         – zapis lokalny wyników
    ├── cases/             – 100 przypadków w 10 plikach
    └── components/        – monitory, biblioteka, egzamin, statystyki
```

---

## ROZWIĄZYWANIE PROBLEMÓW

| Problem | Rozwiązanie |
|---|---|
| `install.bat` pokazuje brak Node.js | Zainstaluj Node.js LTS z https://nodejs.org |
| `start.bat` pokazuje "Brak zaleznosci" | Uruchom najpierw `install.bat` |
| Chrome nie otwiera się | Aplikacja otworzy się w domyślnej przeglądarce – to normalne |
| Port 5173 zajęty | Zamknij inne okno serwera i uruchom `start.bat` ponownie |
| Wyniki egzaminu zniknęły | Wyniki są w localStorage przeglądarki – nie czyść danych witryny localhost |

---

## ZASTRZEŻENIA

Symulator ma **wyłącznie cele edukacyjne**. Dane kliniczne są fikcyjne.
Nie zastępuje wytycznych ERC/ESC/PTEiKCh ani decyzji klinicznych u prawdziwych pacjentów.
Przed użyciem dydaktycznym zalecana jest weryfikacja treści przez specjalistę medycyny ratunkowej.
