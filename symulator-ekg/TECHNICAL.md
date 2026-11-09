# OPIS TECHNICZNY – Symulator EKG (Medycyna Ratunkowa)

## Stack technologiczny

- **React 18 + TypeScript** – warstwa interfejsu
- **Vite 5** – serwer deweloperski i budowanie produkcyjne
- **Canvas 2D (natywny API przeglądarki)** – renderowanie EKG i fal fizjologicznych
- **localStorage** – trwałość wyników egzaminów i postępów (bez backendu)

## Architektura

```
src/
├── types.ts        – kontrakt danych (EcgCase, Treatment, ExamResult, AlarmLimits)
├── rhythms.ts      – rejestr 52 wzorców rytmów (spec uderzenia + funkcja RR)
├── engine.ts       – parametryczne generowanie sygnału EKG (pamięć podręczna buforów)
├── physio.ts       – silnik stanu fizjologicznego i odpowiedzi na interwencje
├── treatments.ts   – bank 40 leków/procedur z dawkami i przeciwwskazaniami
├── cases/          – 10 modułów = 100 przypadków (dane czyste, bez logiki)
├── storage.ts      – warstwa trwałości (localStorage + statystyki)
└── components/
    ├── EcgCanvas.tsx       – kanwa EKG (animacja requestAnimationFrame)
    ├── PhilipsMonitor.tsx  – monitor wieloparametrowy + 4 syntetyczne falowody
    ├── ZollMonitor.tsx     – defibrylator (energia, ładuj/wyładowanie, pacing, RKO)
    ├── Ecg12Lead.tsx       – siatka 12 odprowadzeń ze współczynnikami projekcji
    ├── CaseLibrary.tsx     – filtrowana lista przypadków
    ├── CaseDetail.tsx      – kompletny widok przypadku
    ├── Exam.tsx            – maszyna stanów egzaminu (setup→question→feedback→summary)
    └── Stats.tsx           – statystyki i zarządzanie danymi
```

## Generowanie sygnału EKG

Każdy rytm definiuje `BeatSpec` (amplitudy/szerokości P-Q-R-S-T-U, PR, QT, uniesienie J)
oraz funkcję `rr(i, hr)` zwracającą długość cyklu (stała dla rytmów regularnych, sinusoidalna
dla torsades, pseudolosowa dla AF). `engine.ts` składa 5 cykli w bufor punktów (krok 2 ms)
i `EcgCanvas` przewija bufor z prędkością 25 mm/s przy 60 FPS.

## Silnik fizjologiczny

`physio.ts` utrzymuje stan (HR, SBP/DBP, SpO2, RR, EtCO2, temp., GCS, rytm) i modeluje:

- **Defibrylacja**: prawdopodobieństwo sukcesu = `case.shock × (0,85 + 0,10 × n)` –
  realistyczny spadek skuteczności kolejnych wyładowań; rytm wraca zatokowy.
- **Kardiowersja**: analogicznie, wymaga rytmu zorganizowanego (tryb SYNC).
- **Pacing**: wychwyt dopiero przy amperażu ≥ progu przypadku (`paceThr`).
- **Leki**: tabela efektów (ΔHR, ΔSBP, ΔSpO2, ΔRR) ograniczona wartościami fizjologicznymi.
- **RKO**: utrzymuje SBP ≥70 i EtCO2 ≥15 podczas aktywności.

## Tryb egzaminu

Maszyna stanów: konfiguracja (liczba pytań, trudność, czas) → pytanie (EKG 12-odpr. +
prezentacja + 3 decyzje: rozpoznanie / zagrożenie życiu / leczenie) → feedback → podsumowanie.
Punktacja: DX 40% + threat 30% + TX 30%. Wyniki zapisywane w localStorage i agregowane
w statystykach.

## Zgodność i bezpieczeństwo danych

- Aplikacja działa w 100% lokalnie; żadne dane nie opuszczają komputera.
- Wyniki egzaminów przechowywane w localStorage przeglądarki (klucz `symulator-ekg-wyniki`).
- Zależności tylko React/React-DOM/Vite – brak telemetrii i zewnętrznych API.

## Wdrożenie na Windows

- `install.bat` – `npm install` (jednorazowo; wymaga internetu)
- `start.bat` – serwer deweloperski + automatyczne otwarcie Chrome (3 ścieżki wykrywania,
  fallback: domyślna przeglądarka)
- `build.bat` + `run_production.bat` – tryb offline po jednorazowym budowaniu
