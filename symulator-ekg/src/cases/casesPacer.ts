// ===== Biblioteka przypadkow: Nieprawidlowosci rozrusznika (5 przypadkow) =====

import { EcgCase } from '../types'

export const casesPacer: EcgCase[] = [
  {
    id: 81, cat: 'pacer', title: 'Awaria rozrusznika - brak wychwytu (failure to capture)', diff: 2,
    pres: 'Mezczyzna 78 l. z rozrusznikiem: zawroty glowy, EKG: impulsy widoczne, ale bez nastepujacych pobudzen, tetno 34/min.',
    hist: 'Rozrusznik DDD od 7 lat, ostatnia kontrola 3 lata temu (przeoczona).',
    labs: ['K+ 4,2 mmol/l', 'Elektroda: impedancja >1200 om (dyslokacja)'],
    vit: { hr: 34, bp: '90/55', sbp: 90, dbp: 55, spo2: 95, rr: 14, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['Blok AV z dysfunkcja rozrusznika', 'Bateria rozrusznika wyczerpana', 'Przerwana elektroda'],
    dx: 'Brak wychwytu rozrusznika (failure to capture) - dyslokacja elektrody',
    tx: ['Stymulacja zewnetrzna przeznodowa (prog podniesiony)', 'Kontrola elektrody (RTG: pozycja)', 'Pilna interwencja elektrofizjologiczna', 'Ulozenie pacjenta na lewym boku (czasem pomaga przy dyslokacji)'],
    txIds: ['pacing'],
    paceThr: 80,
    expected: 'Dyslokacja elektrody: widoczne impulsy, ale brak QRS; zewnetrzna stymulacja moze byc trudna (prog podwyzszony).',
    compl: ['Asystolia', 'Zatrzymanie krazenia', 'Omdlenia'],
    edu: 'Awaria wychwytu: impuls jest widoczny (spike), ale bez QRS - przyczyny: dyslokacja, przerwana elektroda, wyczerpanie baterii, wzrost progu (zawal, hiperkaliemia).',
    ref: 'ESC 2022 (Pacing); ERC 2021.',
    pattern: 'paced', rate: 34, threat: true
  },
  {
    id: 82, cat: 'pacer', title: 'Rozrusznik - brak czujnosci (undersensing)', diff: 2,
    pres: 'Kobieta 72 l. z PM: uczucie uderzen w klatce piersiowej, EKG: impulsy w rytmie zatokowym niezaleznie od QRS (praca w konkurencji).',
    hist: 'Rozrusznik VVI, bateria OK (kontrola 2 mies. temu).',
    labs: ['K+ 4,0 mmol/l', 'Impedancja elektrody: prawidlowa'],
    vit: { hr: 74, bp: '125/78', sbp: 125, dbp: 78, spo2: 97, rr: 15, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['Praca rozrusznika w trybie konkurencji', 'Nadczujnosc rozrusznika (oversensing)'],
    dx: 'Brak czujnosci rozrusznika (undersensing) - impulsy w konkurencji',
    tx: ['Pilna reprogramacja rozrusznika (czujnosc)', 'Ocena przyczyny: dyslokacja mikro, fibroza, bateria', 'Monitorowanie EKG', 'Unikac silnych pol elektromagnetycznych'],
    txIds: [],
    expected: 'Undersensing: rozrusznik nie widzi wlasnych QRS i stymuluje niezaleznie - ryzyko VT na spirali R-na-T.',
    compl: ['VT', 'Zjawisko R-na-T', 'Zaburzenia rytmu'],
    edu: 'Undersensing to brak rozpoznawania wlasnych pobudzen przez rozrusznik. Ryzyko: stymulacja na podatnym T (R-na-T).',
    ref: 'ESC 2022 (Pacing).',
    pattern: 'paced', rate: 74, threat: false
  },
  {
    id: 83, cat: 'pacer', title: 'Zespol rozrusznika (pacemaker syndrome) w VVI', diff: 3,
    pres: 'Mezczyzna 70 l. z PM VVI: zawroty, oslabienie, obrzeki, tetno weneckie (fale cannon A waves), spadek cisnienia.',
    hist: 'Rozpuszczajacy rozrusznik VVI z powodu AF z bradykardia.',
    labs: ['Echo: funkcja LV prawidlowa, ale brak synchronizacji AV', 'BNP 450 pg/ml'],
    vit: { hr: 60, bp: '105/65', sbp: 105, dbp: 65, spo2: 96, rr: 16, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['Niewydolnosc serca', 'Zastoinowa niewydolnosc', 'Wada zastawkowa'],
    dx: 'Zespol rozrusznika (pacemaker syndrome) - asynchronia AV',
    tx: ['Ulepszenie rozrusznika do trybu DDD (przywrocenie synchronizacji AV)', 'Farmakoterapia objawowa do czasu wymiany', 'Kontrola objetosci plynow'],
    txIds: [],
    expected: 'Tryb VVI bez synchronizacji AV powoduje spadek rzutu serca o 20-30%; wymiana na DDD usuwa objawy.',
    compl: ['Niewydolnosc serca', 'Omdlenia', 'Obrzeki'],
    edu: 'Pacemaker syndrome: stymulacja komor bez synchronizacji z przedsionkami powoduje spadek CO, obrzeki, zawroty. Rozwiazanie: tryb DDD.',
    ref: 'ESC 2022 (Pacing).',
    pattern: 'paced', rate: 60, threat: false
  },
  {
    id: 84, cat: 'pacer', title: 'Zaklocenie rozrusznika przez pole elektromagnetyczne', diff: 3,
    pres: 'Kobieta 68 l. z PM: nagle omdlenie podczas przechodzenia przez bramke zabezpieczen z polem magnetycznym, tetno 35/min.',
    hist: 'Rozpuszczajacy PM (starszy model, brak ochrony MRI).',
    labs: ['K+ 4,1 mmol/l', 'Interrogacja PM: przejsciowe zahamowanie stymulacji'],
    vit: { hr: 35, bp: '88/55', sbp: 88, dbp: 55, spo2: 95, rr: 14, temp: 36.6, etco2: 37, gcs: 14 },
    ddx: ['Brak wychwytu', 'Awaria baterii', 'Zaburzenia elektrolitowe'],
    dx: 'Zaklocenie rozrusznika polem elektromagnetycznym (inhibicja stymulacji)',
    tx: ['Usuniecie pacjenta z pola (natychmiast)', 'Atropina jesli objawowa bradykardia', 'Stymulacja zewnetrzna w razie potrzeby', 'Interrogacja PM po incydencie', 'Unikac podobnych pol w przyszlosci'],
    txIds: ['atropina', 'pacing'],
    paceThr: 65,
    expected: 'Usuniecie z pola natychmiast przywraca stymulacje; starsze rozruszniki sa podatne na inhibicje przez EMF.',
    compl: ['Asystolia', 'Zatrzymanie krazenia', 'Omdlenie z urazem'],
    edu: 'Pola elektromagnetyczne (bramki, silniki przemyslowe, MRI bez MR-safe) moga zahamowac stymulacje - zagrazajaca bradykardia.',
    ref: 'ESC 2022 (Pacing); MR-safety guidelines.',
    pattern: 'paced', rate: 35, threat: true
  },
  {
    id: 85, cat: 'pacer', title: 'Rytm stymulowany z prawidlowa funkcja (normal paced rhythm)', diff: 1,
    pres: 'Mezczyzna 75 l. z PM DDD do rutynowej kontroli: rytm stymulowany, tetno 70/min, stabilny, bez objawow.',
    hist: 'Blok AV III st., PM DDD od 2 lat.',
    labs: ['K+ 4,2 mmol/l', 'Bateria: OK (kontrola systemowa)', 'Wychwyt: prawidlowy'],
    vit: { hr: 70, bp: '128/78', sbp: 128, dbp: 78, spo2: 97, rr: 14, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['VT (szeroki QRS)', 'Blok odnogi z rytmem zatokowym'],
    dx: 'Prawidlowy rytm stymulowany (paced rhythm)',
    tx: ['Bez interwencji - kontrola ambulatoryjna', 'Rutynowa kontrola rozpuszczalna co 6-12 mies.'],
    txIds: [],
    expected: 'Prawidlowy rytm stymulowany: spike + szeroki QRS z morfologia LBBB (elektroda RV).',
    compl: ['Brak'],
    edu: 'Rytm stymulowany prawidlowo: widoczny spike przed kazdym QRS, morfologia LBBB (stymulacja RV). Nie mylic z VT!',
    ref: 'ESC 2022 (Pacing).',
    pattern: 'paced', rate: 70, threat: false
  }
]
