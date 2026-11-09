// ===== Biblioteka przypadków: Nieprawidłowości rozrusznika (5 przypadków) =====

import { EcgCase } from '../types'

export const casesPacer: EcgCase[] = [
  {
    id: 81, cat: 'pacer', title: 'Awaria rozrusznika – brak wychwytu (failure to capture)', diff: 2,
    pres: 'Mężczyzna 78 l. z rozrusznikiem: zawroty głowy, EKG: impulsy widoczne ale bez następujących pobudzeń, tętno 34/min.',
    hist: 'Rozrusznik DDD od 7 lat, ostatnia kontrola 3 lata temu (przeoczona).',
    labs: ['K+ 4,2 mmol/l', 'Elektroda: impedancja >1200 Ω (dyslokacja)'],
    vit: { hr: 34, bp: '90/55', sbp: 90, dbp: 55, spo2: 95, rr: 14, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['Blok AV z dysfunkcją rozrusznika', 'Bateria rozrusznika wyczerpana', 'Przerwana elektroda'],
    dx: 'Brak wychwytu rozrusznika (failure to capture) – dyslokacja elektrody',
    tx: ['Stymulacja zewnętrzna przeznodowa (próg podniesiony)', 'Kontrola elektrody (RTG: pozycja)', 'Pilna interwencja elektrofizjologiczna', 'Ułożenie pacjenta na lewym boku (czasem pomaga dyslokacji)'],
    txIds: ['pacing'],
    paceThr: 80,
    expected: 'Dyslokacja elektrody: widoczne impulsy ale brak QRS; zewnętrzna stymulacja może być trudna (próg podwyższony).',
    compl: ['Asystolia', 'Zatrzymanie krążenia', 'Omdlenia'],
    edu: 'Awaria wychwytu: impuls jest widoczny (spike) ale bez QRS – przyczyny: dyslokacja, przerwana elektroda, wyczerpanie baterii, wzrost progu (zawał, hiperkaliemia).',
    ref: 'ESC 2022 (Pacing); ERC 2021.',
    pattern: 'paced', rate: 34, threat: true
  },
  {
    id: 82, cat: 'pacer', title: 'Rozrusznik – brak czujności (undersensing)', diff: 2,
    pres: 'Kobieta 72 l. z PM: uczucie "uderzeń" w klatce, EKG: impulsy w rytmie zatokowym niezależnie od QRS (działa na konkurencji).',
    hist: 'Rozrusznik VVI, bateria OK (kontrola 2 mies. temu).',
    labs: ['K+ 4,0 mmol/l', 'Impedancja elektrody: prawidłowa'],
    vit: { hr: 74, bp: '125/78', sbp: 125, dbp: 78, spo2: 97, rr: 15, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['Praca rozrusznika w trybie竞争 (competitive)', 'Nadczujność rozrusznika (oversensing)'],
    dx: 'Brak czujności rozrusznika (undersensing) – impulsy w竞争中',
    tx: ['Pilna reprogramacja rozrusznika (czujność)', 'Ocena przyczyny: dyslokacja mikro, fibroza, bateria', 'Monitorowanie EKG', 'Unikać silnych pól elektromagnetycznych'],
    txIds: [],
    expected: 'Undersensing: rozrusznik nie "widzi" własnych QRS i stymuluje niezależnie – ryzyko VT na spirali R-na-T.',
    compl: ['VT', 'R-na-T现象', 'Zaburzenia rytmu'],
    edu: 'Undersensing to brak rozpoznawania własnych pobudzeń przez rozrusznik. Ryzyko: stymulacja na podatnym T (R-na-T).',
    ref: 'ESC 2022 (Pacing).',
    pattern: 'paced', rate: 74, threat: false
  },
  {
    id: 83, cat: 'pacer', title: 'Zespół rozrusznika (pacemaker syndrome) w VVI', diff: 3,
    pres: 'Mężczyzna 70 l. z PM VVI: zawroty, osłabienie, obrzęki, tętno jitro weneckie (cannon A waves), spadek ciśnienia.',
    hist: 'Rozpuszczający rozrusznik VVI z powodu AF z bradykardią.',
    labs: ['Echo: funkcja LV prawidłowa, ale brak synchronizacji AV', 'BNP 450 pg/ml'],
    vit: { hr: 60, bp: '105/65', sbp: 105, dbp: 65, spo2: 96, rr: 16, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['Niewydolność serca', 'Zastoinowa niewydolność', 'Wada zastawkowa'],
    dx: 'Zespół rozrusznika (pacemaker syndrome) – asynchronia AV',
    tx: ['Ulepszenie rozrusznika do trybu DDD (przywrócenie synchronizacji AV)', 'Farmakoterapia objawowa do czasu wymiany', 'Kontrola objętości płynów'],
    txIds: [],
    expected: 'Tryb VVI bez synchronizacji AV → spadek wyoutu serca o 20–30%; wymiana na DDD usuwa objawy.',
    compl: ['Niewydolność serca', 'Omdlenia', 'Obrzęki'],
    edu: 'Pacemaker syndrome: stymulacja komór bez synchronizacji z przedsionkami → spadek CO, obrzęki, zawroty. Rozwiązanie: tryb DDD.',
    ref: 'ESC 2022 (Pacing).',
    pattern: 'paced', rate: 60, threat: false
  },
  {
    id: 84, cat: 'pacer', title: 'Zakłócenie rozrusznika przez pole elektromagnetyczne (MRI-like)', diff: 3,
    pres: 'Kobieta 68 l. z PM: nagłe omdlenie podczas przechodzenia przez bramkę zabezpieczeń z polem magnetycznym, tętno 35/min.',
    hist: 'Rozpuszczający PM (starszy model, brak ochrony MRI).',
    labs: ['K+ 4,1 mmol/l', 'Interrogacja PM: przejściowe zahamowanie stymulacji'],
    vit: { hr: 35, bp: '88/55', sbp: 88, dbp: 55, spo2: 95, rr: 14, temp: 36.6, etco2: 37, gcs: 14 },
    ddx: ['Brak wychwytu', 'Awaria baterii', 'Zaburzenia elektrolitowe'],
    dx: 'Zakłócenie rozrusznika polem elektromagnetycznym (inhibicja stymulacji)',
    tx: ['Usunięcie pacjenta z pola (natychmiast)', 'Atropina jeśli objawowa bradykardia', 'Stymulacja zewnętrzna w razie potrzeby', 'Interrogacja PM po incydencie', 'Unikać podobnych pól w przyszłości'],
    txIds: ['atropina', 'pacing'],
    paceThr: 65,
    expected: 'Usunięcie z pola natychmiast przywraca stymulację; starsze rozruszniki są podatne na inhibicję przez EMF.',
    compl: ['Asystolia', 'Zatrzymanie krążenia', 'Omdlenie z urazem'],
    edu: 'Pola elektromagnetyczne (bramki, silniki przemysłowe, MRI bez MR-safe) mogą zahamować stymulację – zagrażające bradykardia.',
    ref: 'ESC 2022 (Pacing); MR-safety guidelines.',
    pattern: 'paced', rate: 35, threat: true
  },
  {
    id: 85, cat: 'pacer', title: 'Rytm stymulowany z prawidłową funkcją (normal paced rhythm)', diff: 1,
    pres: 'Mężczyzna 75 l. z PM DDD do rutynowej kontroli: rytm stymulowany, tętno 70/min, stabilny, bez objawów.',
    hist: 'Blok AV III st., PM DDD od 2 lat.',
    labs: ['K+ 4,2 mmol/l', 'Bateria: OK (kontrola systemowa)', 'Wychwyt: prawidłowy'],
    vit: { hr: 70, bp: '128/78', sbp: 128, dbp: 78, spo2: 97, rr: 14, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['VT (szeroki QRS)', 'Blok odnogi z rytmem zatokowym'],
    dx: 'Prawidłowy rytm stymulowany (paced rhythm)',
    tx: ['Bez interwencji – kontrola ambulatoryjna', 'Rutynowa kontrola rozpuszczalna co 6–12 mies.'],
    txIds: [],
    expected: 'Prawidłowy rytm stymulowany: spike + szeroki QRS z morfologią LBBB (elektroda RV).',
    compl: ['Brak'],
    edu: 'Rytm stymulowany prawidłowo: widoczny spike przed każdym QRS, morfologia LBBB (stymulacja RV). Nie mylić z VT!',
    ref: 'ESC 2022 (Pacing).',
    pattern: 'paced', rate: 70, threat: false
  }
]
