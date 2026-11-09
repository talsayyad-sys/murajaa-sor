// ===== Biblioteka przypadków: Naśladownictwa EKG (5 przypadków) =====

import { EcgCase } from '../types'

export const casesMimic: EcgCase[] = [
  {
    id: 86, cat: 'mimic', title: 'Hipertrofia lewej komory naśladująca STEMI (wysokie R + uniesienia)', diff: 2,
    pres: 'Mężczyzna 62 l., bez bólu, EKG: wysokie R w odprowadzeniach lewych z uniesieniami ST konkordynacyjnymi, głębokie S w V1–V3.',
    hist: 'Nadciśnienie nieleczone od 20 lat.',
    labs: ['Troponina ujemna x2', 'Echo: LVH (grubość ściany 15 mm)'],
    vit: { hr: 68, bp: '170/95', sbp: 170, dbp: 95, spo2: 97, rr: 14, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['STEMI boczny', 'Zespół wczesnej repolaryzacji', 'LVH z repolaryzacją nieprawidłową'],
    dx: 'Hipertrofia lewej komory z nieprawidłową repolaryzacją (imitacja STEMI)',
    tx: ['Nie kierować na PCI bez potwierdzenia troponiną', 'Leczenie nadciśnienia', 'Echo dla potwierdzenia LVH', 'Kontrola EKG porównawcza ze starym zapisem'],
    txIds: [],
    expected: 'Uniesienia ST w LVH są zwykle konkordyntacyjne (skierowane tak jak QRS) i stabilne w czasie – bez zmian serii.',
    compl: ['Niepotrzebna koronarografia', 'Niewłaściwe leczenie'],
    edu: 'LVH: wysokie R + konkordyntacyjne uniesienia/obniżenia + asymetria T. Porównaj z poprzednimi EKG!',
    ref: 'ESC 2023 (ACS mimics).',
    pattern: 'hcm', rate: 68, threat: false
  },
  {
    id: 87, cat: 'mimic', title: 'Wczesna repolaryzacja jako wariant prawidłowy (young athlete)', diff: 1,
    pres: 'Mężczyzna 24 l., atleta, EKG kontrolne: uniesienia J w odprowadzeniach dolnych i boczn-bocznych, bez objawów.',
    hist: 'Zdrowy sportowiec, intensywny trening.',
    labs: ['Troponina ujemna', 'Echo: serce sportowca (poszerzenie komór, bez patologii)'],
    vit: { hr: 54, bp: '118/68', sbp: 118, dbp: 68, spo2: 98, rr: 12, temp: 36.6, etco2: 37, gcs: 15 },
    ddx: ['Zespół ERS (złośliwy)', 'Zapalenie osierdzia', 'STEMI'],
    dx: 'Wczesna repolaryzacja jako wariant prawidłowy u sportowca',
    tx: ['Bez leczenia – wariant normy', 'Porównanie z poprzednimi EKG', 'Dyskrecja: jeśli omdlenie/家族 history – pogłębiona ocena'],
    txIds: [],
    expected: 'U sportowców uniesienia J są częste i łagodne; bez omdleń i wywiadu rodzinnego – bez interwencji.',
    compl: ['Brak (jeśli真 benign)'],
    edu: 'Wczesna repolaryzacja u sportowców: częsty wariant normy; złośliwa tylko przy VF w wywiadzie lub wywiadzie rodzinnym nagłej śmierci.',
    ref: 'ESC 2022 (Athlete ECG).',
    pattern: 'ers', rate: 54, threat: false
  },
  {
    id: 88, cat: 'mimic', title: 'Rozwarstwienie aorty naśladujące STEMI (obniżenia ST)', diff: 3,
    pres: 'Mężczyzna 65 l., nagły rozdzierający ból w klatce piersiowej promieniujący do pleców, RR 190/110 (różnica kończyn 30 mmHg), obniżenia ST lateral.',
    hist: 'Nadciśnienie, kurczenie (Marfan-like – nie rozpoznano).',
    labs: ['D-dimer 8 500 ng/ml', 'Troponina 0,3 ng/ml (lekko podwyższona)', 'CT: rozwarstwienie aorty typu A'],
    vit: { hr: 96, bp: '190/110', sbp: 190, dbp: 110, spo2: 96, rr: 22, temp: 36.6, etco2: 36, gcs: 15 },
    ddx: ['NSTEMI', 'Zatorowość płucna', 'Nadciśnieniowe kryzysy'],
    dx: 'Rozwarstwienie aorty typu A z obniżeniami ST (iskrzenie wieńcowe)',
    tx: ['Pilna chirurgia (kardiochirurgia natychmiastowa)', 'Kontrola ciśnienia (beta-bloker i.v. + nitropruszek)', 'Unikać antykoagulacji i heparyny (przeciwwskazana!)', 'Nie kierować na PCI (cath lab dla rozwarstwienia)'],
    txIds: ['beta-blok'],
    expected: 'Rozwarstwienie typu A: chirurgia ratująca życie; heparyna przeciwwskazana; obniżenia ST wynikają z niedokrwienia koronarnego (dyssekcja pnia).',
    compl: ['Tamponada (pęknięcie do osierdzia)', 'Zawał', 'Śmierć'],
    edu: 'Rozdzierający ból promieniujący do pleców + asymetria RR + obniżenia ST = podejrzenie rozwarstwienia. Nie stosuj heparyny!',
    ref: 'ESC 2024 (Aorta); ERC 2021.',
    pattern: 'nstemi', rate: 96, threat: true
  },
  {
    id: 89, cat: 'mimic', title: 'Zespół Chvostka z hipokalcemią naśladującą LQTS', diff: 3,
    pres: 'Kobieta 50 l., po resekcji jelita (diarrhea przewlekła): parestezje, dodatni Chvostek, QTc 540 ms.',
    hist: 'Zespół krótkiego jelita, niedobór wapnia przewlekły.',
    labs: ['Ca (skoryg.) 6,5 mg/dl', 'Mg 1,2 mg/dl', 'PTH 12 pg/ml (niski)', 'QTc 540 ms'],
    vit: { hr: 78, bp: '115/72', sbp: 115, dbp: 72, spo2: 98, rr: 16, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['Zespół LQTS wrodzony', 'Zatrucie lekami QT-wydłużającymi', 'Hipokaliemia'],
    dx: 'Hipokalcemia z wydłużonym QT (imitacja LQTS)',
    tx: ['Wapno 10% i.v. (korekta)', 'Korekta Mg', 'Wapno doustnie + witamina D przewlekle', 'Kontrola EKG po korekcie'],
    txIds: ['wapno'],
    expected: 'Po wyrównaniu wapnia QT normalizuje się – różnicowanie z wrodzonym LQTS przez korektę przyczynową.',
    compl: ['Torsades', 'Tetania', 'Drgawki'],
    edu: 'Hipokalcemia wydłuża ST i QT (ale nie notch jak LQTS); korekta wapnia usuwa wydłużenie QT.',
    ref: 'ERC 2021.',
    pattern: 'hypocalcemia', rate: 78, threat: false
  },
  {
    id: 90, cat: 'mimic', title: 'Zaburzenia pozycjonowania elektrod EKG (dyskinesia electrode) – "fałszywy" zawał', diff: 2,
    pres: 'Kobieta 45 l., kontrola zdrowia: EKG wykazuje "wzorzec zawału" w dolnych i lateralnych (wysokie R, głębokie S), ale pacjentka zdrowa.',
    hist: 'Zdrowa, brak objawów.',
    labs: ['Troponina ujemna', 'Powtórne EKG z prawidłowym pozycjonowaniem: norma'],
    vit: { hr: 72, bp: '120/75', sbp: 120, dbp: 75, spo2: 98, rr: 14, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['Zawał dolny-boczny', 'Dekstrokardia', 'Błąd pozycjonowania elektrod'],
    dx: 'Błąd pozycjonowania elektrod EKG (odwrócone elektrody kończynowe)',
    tx: ['Powtórzenie EKG z prawidłowym pozycjonowaniem', 'Edukacja personelu technicznego', 'Bez leczenia farmakologicznego'],
    txIds: [],
    expected: 'Zamiana elektrod kończynowych (np. prawy i lewy ramię) daje odwrócony wzorzec w aVR/aVL; poprawne EKG pokazuje normę.',
    compl: ['Niepotrzebne leczenie ACS', 'Opóźnienie prawdziwej diagnozy'],
    edu: 'Odwrotne elektrody rąk: P, QRS, T ujemne w I i aVL, dodatnie w aVR. Zawsze sprawdzaj pozycjonowanie przy "dziwnym" EKG.',
    ref: 'Standardy EKG (AHA 2007).',
    pattern: 'sinus-normal', rate: 72, threat: false
  }
]
