# SOR Kieszonkowy – aplikacja Android (APK)

Natywna aplikacja Android (WebView) z pełną zawartością: dawki leków dla dorosłych i dzieci, skale, algorytmy, 214 stanów nagłych, 55 objawów, zatrucia i kalkulatory.
**Działa w pełni offline.** Internet służy tylko do pobrania czcionek.

- Pakiet: `pl.sor.kieszonkowy` · minimalny Android 7.0 (API 24)
- Przycisk „wstecz” w telefonie zamyka kartę, potem wyszukiwarkę, potem wraca do zakładki Leki, a dopiero potem wychodzi z aplikacji.
- Jasny i ciemny motyw zgodnie z ustawieniami telefonu.

---

## Sposób A: GitHub buduje APK za Ciebie (bez instalowania niczego)

1. Zaloguj się na **github.com**, a następnie wybierz **New repository**. Wpisz nazwę, np. `sor-kieszonkowy`, zaznacz **Private** i kliknij **Create repository**.
2. Na stronie pustego repozytorium kliknij **uploading an existing file**.
3. Rozpakuj ten ZIP na komputerze i przeciągnij **całą zawartość** folderu `SOR-Kieszonkowy-android` (łącznie z ukrytym folderem `.github`). Potem kliknij **Commit changes**.
   - Na Macu ukryte foldery pokażesz skrótem `Cmd + Shift + .`
   - Jeśli folder `.github` się nie wgrał: wejdź w **Actions**, wybierz **set up a workflow yourself**, wklej treść pliku `.github/workflows/build-apk.yml` i kliknij **Commit**.
4. Wejdź w zakładkę **Actions**. Workflow **„Zbuduj APK”** uruchomi się sam i potrwa około 5 minut.
5. Gotowy plik znajdziesz w **Releases** (prawa kolumna repozytorium) jako **SOR-Kieszonkowy.apk**. Otwórz tę stronę na telefonie (zalogowany na GitHub) i pobierz plik.

## Sposób B: Android Studio na komputerze

1. Zainstaluj Android Studio, wybierz **Open** i wskaż folder `SOR-Kieszonkowy-android`.
2. Poczekaj na synchronizację Gradle, a potem wybierz **Build › Build App Bundle(s) / APK(s) › Build APK(s)**.
3. Plik pojawi się w `app/build/outputs/apk/debug/`. Możesz też podłączyć telefon kablem (z włączonym debugowaniem USB) i kliknąć ▶ Run.

## Instalacja na telefonie

1. Otwórz pobrany plik `SOR-Kieszonkowy.apk`.
2. Android poprosi o zgodę na **instalowanie nieznanych aplikacji** dla przeglądarki lub menedżera plików. Zezwól.
3. Kliknij **Zainstaluj**. Jeśli Play Protect ostrzeże o „nieznanym deweloperze”, wybierz **Więcej szczegółów › Zainstaluj mimo to**. To normalne dla aplikacji spoza Sklepu Play.

## Aktualizacja treści

Podmień plik `app/src/main/assets/index.html` w repozytorium. GitHub zbuduje nową wersję z wyższym numerem. Instaluje się ona na starą bez utraty danych, bo każda wersja jest podpisana tym samym kluczem (`app/sor-release.jks`).

> Hasło do klucza jest zapisane w `app/build.gradle`. Trzymaj repozytorium jako **prywatne**.

---

Dawki i kryteria mają charakter orientacyjny. Zawsze weryfikuj je z ChPL, aktualnymi wytycznymi i lokalnymi protokołami.
