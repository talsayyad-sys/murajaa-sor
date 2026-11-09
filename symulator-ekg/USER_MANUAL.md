# PODRĘCZNIK UŻYTKOWNIKA – Symulator EKG (Medycyna Ratunkowa)

Poradnik dla lekarza – bez wiedzy programistycznej.

---

## 1. Co to jest?

Program edukacyjny do nauki interpretacji EKG i postępowania w stanach nagłych:
- **100 przypadków** z pełnymi omówieniami,
- **monitor pacjenta** (EKG, SpO2, ciśnienie, oddech, EtCO2, temperatura),
- **defibrylator symulacyjny** (energia, ładowanie, wyładowanie, kardiowersja, stymulacja, RKO),
- **egzamin specjalizacyjny** z punktacją i statystykami.

---

## 2. Pierwsze uruchomienie (raz)

1. Upewnij się, że masz **Node.js** (jeśli nie: https://nodejs.org → pobierz LTS → instaluj).
2. Otwórz folder projektu → **dwuklik `install.bat`** → poczekaj (kilka minut).
3. Komunikat `[OK] Instalacja zakonczona pomyslnie` = gotowe.

## 3. Codzienne uruchomienie

1. **Dwuklik `start.bat`**.
2. Program sam otworzy się w Chrome (lub domyślnej przeglądarce).
3. Po pracy zamknij **okno "Serwer Symulatora EKG"**.

**Wskazówka:** po jednorazowym uruchomieniu `build.bat` możesz używać `run_production.bat`
(tryb offline, szybsze działanie).

---

## 4. Zakładka: Biblioteka przypadków

- Filtry kategorii u góry (np. "Ostre zespoły wieńcowe (15)").
- Kliknij **"Otwórz"** przy dowolnym przypadku.

### Wewnątrz przypadku
- **Monitor wieloparametrowy** – 5 animowanych fal (EKG, pleth, ciśnienie, oddech, kapnografia)
  i liczby: HR, SpO2, NIBP, RR, EtCO2, temp., GCS. Czerwony pasek = alarm.
- **Przycisk "Defibrylator (ZOLL)"** – tryb resuscytacji:
  1. Wybierz tryb (DEFIBRYLACJA / KARDIOWERSJA / STYMULACJA),
  2. ustaw energię (+50/−50 J),
  3. **ŁADUJ** → **WYŁADOWANIE** (przycisk aktywuje się po naładowaniu),
  4. stymulacja: mA −10/+10 → STYMULUJ (szukaj progu wychwytu),
  5. RKO: włącz/wyłącz.
- **EKG 12-odprowadzeniowe** – pod spodem.
- **Podanie leczenia** – klikaj leki; parametry monitora reagują (np. adenozyna zwalnia tętno).
- **"Pokaż pełne omówienie"** – rozpoznanie, diagnostyka różnicowa, prawidłowe leczenie,
  oczekiwana odpowiedź, powikłania, wyjaśnienie, referencje.

---

## 5. Zakładka: Egzamin specjalizacyjny

1. Ustaw: liczbę pytań (5–30), trudność (★/★★/★★★), czas (60–180 s/pytanie).
2. **ROZPOCZNIJ EGZAMIN**.
3. Przy każdym pytaniu: obejrzyj EKG i wywiad → wybierz **rozpoznanie** → określ **czy stan
   zagraża życiu** → wybierz **pierwszą interwencję** → **ZATWIERDŹ**.
4. Po każdym pytaniu zobacz szczegółową odpowiedź z wyjaśnieniem.
5. Na koniec: wynik %, tabela odpowiedzi, zapis do statystyk.

**Punktacja:** rozpoznanie 40% · zagrożenie życiu 30% · leczenie 30%.

---

## 6. Zakładka: Statystyki

- Liczba egzaminów, średni i najlepszy wynik.
- Historia wszystkich podejść.
- Przycisk usuwania danych (pyta o potwierdzenie).

---

## 7. Częste pytania

**Nie otwiera się Chrome.** Normalne – aplikacja użyje domyślnej przeglądarki.

**"Brak zaleznosci"** – uruchom najpierw `install.bat`.

**Port zajęty** – zamknij poprzednie okno serwera, uruchom `start.bat` ponownie.

**Gdzie są moje wyniki?** W przeglądarce (localStorage). Nie czyść danych witryny localhost.

**Czy to medycyna rzeczywista?** Nie – to symulacja edukacyjna z fikcyjnymi danymi.
Zawsze sprawdzaj aktualne wytyczne ERC/ESC w praktyce klinicznej.
