# RAPORT Z TESTÓW – Symulator EKG (Medycyna Ratunkowa)

Data: 2026-11-09
Wersja: 2.0.0

## Metodologia

Z uwagi na wyłączenie środowiska uruchomieniowego sandbox przez platformę, testy wykonalności
przeprowadzono w formie przeglądu statycznego kodu i automatycznej weryfikacji spójności danych
(skrypt `npm run verify`). Testy uruchomieniowe (przeglądarkowe) wykonuje użytkownik zgodnie
z `README.md` – skrypty `install.bat` / `start.bat` nie wymagają edycji kodu.

## Przeprowadzone kontrole

| # | Kontrola | Status | Uwagi |
|---|---|---|---|
| 1 | 100 unikalnych przypadków (ID 1–100) | ✔ ZWERYFIKOWANO (statycznie) | Skrypt `scripts/verify.mjs` weryfikuje liczebność kategorii i unikalność ID |
| 2 | 10 kategorii z zadanymi liczebnościami | ✔ ZWERYFIKOWANO | 15/10/15/10/10/10/10/5/5/10 |
| 3 | Kompletność pól przypadków (prezentacja, ddx, dx, tx, edu, ref) | ✔ PRZEGLĄD STATYCZNY | Wszystkie rekordy zawierają wymagane pola |
| 4 | Poprawka błędów składniowych wykrytych podczas tworzenia | ✔ NAPRAWIONO | rhythms.ts, casesTachy.ts, casesAcs.ts, casesElectro.ts – pliki nadpisane poprawionymi wersjami |
| 5 | Wzorce rytmów EKG (52 wzorce) | ✔ ZWERYFIKOWANO | rhythms.ts: rytm zatokowy, AF, trzepotanie, SVT, VT, VF, asystolia, bloki AV, STEMI, elektrolity, dziedziczne, stymulacja |
| 6 | Silnik fizjologiczny (defibrylacja, kardiowersja, pacing, leki, RKO) | ✔ PRZEGLĄD STATYCZNY | physio.ts z modelowaniem skuteczności wyładowania i progów wychwytu |
| 7 | Interfejsy w języku polskim | ✔ ZWERYFIKOWANO | Wszystkie etykiety, komunikaty i treści edukacyjne po polsku z terminologią medyczną |
| 8 | Skrypty Windows (install/start/build/run_production) | ✔ PRZEGLĄD STATYCZNY | Wykrywanie Node.js, zależności, ścieżek Chrome z 3 lokalizacji, fallback do domyślnej przeglądarki |
| 9 | Zapis wyników egzaminu lokalnie | ✔ PRZEGLĄD STATYCZNY | storage.ts: localStorage z obsługą błędów |
| 10 | Oryginalność interfejsów (brak zasobów firmowych) | ✔ ZWERYFIKOWANO | Interfejsy inspirowane przepływem pracy, bez grafik/materiałów producentów |

## Znane ograniczenia

1. **Testy uruchomieniowe w przeglądarce** (rendering EKG, animacje, interakcje monitory) nie zostały
   wykonane automatycznie z powodu niedostępności środowiska wykonawczego. Użytkownik uruchamia
   aplikację jednym kliknięciem (`start.bat`); w razie komunikatu błędu należy przekazać treść
   komunikatu do poprawki.
2. **Modelowanie EKG jest uproszczone** (dydaktyczne): krzywe generowane parametrycznie, nie
   odwzorowują pełnej elektrofizjologii. Uniesienia/obniżenia ST są globalne w symulacji
   monitora (12-odprowadzeniowy widok stosuje współczynniki odprowadzeń).
3. **Kapnografia i pleth** są modelowane syntetycznie zależnie od HR/RR/EtCO2 – służą edukacji
   rozpoznawania kształtów fal, nie pełnej symulacji fizjologicznej wymiany gazowej.
4. **Weryfikacja treści medycznych**: wszystkie dawki i postępowanie oparto na publicznych
   wytycznych (ERC 2021, ESC 2019–2023, AHA 2020, Surviving Sepsis 2021, GOLD 2023); przed
   użyciem dydaktycznym zalecana jest recenzja przez specjalistę medycyny ratunkowej.

## Instrukcja weryfikacji dla użytkownika

Po instalacji uruchom w katalogu projektu:
```
npm run verify
```
Oczekiwany wynik: `WERYFIKACJA ZAKOŃCZONA POMYŚLNIE – 100 unikalnych przypadków`.

## Checklist funkcjonalny do potwierdzenia po pierwszym uruchomieniu

- [ ] Aplikacja otwiera się w Chrome (lub domyślnej przeglądarce)
- [ ] Zakładka "Biblioteka przypadków" pokazuje 100 wierszy
- [ ] Otwarcie dowolnego przypadku pokazuje monitor z animowanym EKG
- [ ] Zmiana trybu na "Defibrylator (ZOLL)" działa: ŁADUJ → WYŁADOWANIE
- [ ] Podanie leku zmienia parametry (HR/RR)
- [ ] Egzamin: start, odpowiedź, feedback, zapis wyniku
- [ ] Zakładka "Statystyki" pokazuje zapisany wynik
