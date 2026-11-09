// ===== Biblioteka przypadkow: Nasladownictwa EKG (5 przypadkow) =====

import { EcgCase } from '../types'

export const casesMimic: EcgCase[] = [
  {
    id: 86, cat: 'mimic', title: 'Hipertrofia lewej komory nasladujaca STEMI', diff: 2,
    pres: 'Mezczyzna 62 l., bez bolu, EKG: wysokie R w odprowadzeniach lewych z uniesieniami ST zgodnymi z kierunkiem QRS, glebokie S w V1-V3.',
    hist: 'Nadcisnienie nieleczone od 20 lat.',
    labs: ['Troponina ujemna x2', 'Echo: LVH (grubosc sciany 15 mm)'],
    vit: { hr: 68, bp: '170/95', sbp: 170, dbp: 95, spo2: 97, rr: 14, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['STEMI boczny', 'Zespol wczesnej repolaryzacji', 'LVH z repolaryzacja nieprawidlowa'],
    dx: 'Hipertrofia lewej komory z nieprawidlowa repolaryzacja (imitacja STEMI)',
    tx: ['Nie kierowac na PCI bez potwierdzenia troponina', 'Leczenie nadcisnienia', 'Echo dla potwierdzenia LVH', 'Kontrola EKG porownawcza ze starym zapisem'],
    txIds: [],
    expected: 'Uniesienia ST w LVH sa zwykle zgodne z kierunkiem QRS i stabilne w czasie - bez zmian serii.',
    compl: ['Niepotrzebna koronarografia', 'Niewlasciwe leczenie'],
    edu: 'LVH: wysokie R + uniesienia/obnizenia zgodne z QRS + asymetria T. Porownaj z poprzednimi EKG!',
    ref: 'ESC 2023 (ACS mimics).',
    pattern: 'hcm', rate: 68, threat: false
  },
  {
    id: 87, cat: 'mimic', title: 'Wczesna repolaryzacja jako wariant prawidlowy u mlodego sportowca', diff: 1,
    pres: 'Mezczyzna 24 l., atleta, EKG kontrolne: uniesienia J w odprowadzeniach dolnych i bocznych, bez objawow.',
    hist: 'Zdrowy sportowiec, intensywny trening.',
    labs: ['Troponina ujemna', 'Echo: serce sportowca (poszerzenie komor, bez patologii)'],
    vit: { hr: 54, bp: '118/68', sbp: 118, dbp: 68, spo2: 98, rr: 12, temp: 36.6, etco2: 37, gcs: 15 },
    ddx: ['Zespol ERS (zlosliwy)', 'Zapalenie osierdzia', 'STEMI'],
    dx: 'Wczesna repolaryzacja jako wariant prawidlowy u sportowca',
    tx: ['Bez leczenia - wariant normy', 'Porownanie z poprzednimi EKG', 'Jesli omdlenie lub wywiad rodzinny naglej smierci - poglebiona ocena'],
    txIds: [],
    expected: 'U sportowcow uniesienia J sa czeste i lagodne; bez omdlen i wywiadu rodzinnego - bez interwencji.',
    compl: ['Brak (jesli lagodny wariant)'],
    edu: 'Wczesna repolaryzacja u sportowcow: czesty wariant normy; zlosliwa tylko przy VF w wywiadzie lub wywiadzie rodzinnym naglej smierci.',
    ref: 'ESC 2022 (Athlete ECG).',
    pattern: 'ers', rate: 54, threat: false
  },
  {
    id: 88, cat: 'mimic', title: 'Rozwarstwienie aorty nasladujace STEMI (obnizenia ST)', diff: 3,
    pres: 'Mezczyzna 65 l., nagly rozdzierajacy bol w klatce piersiowej promieniujacy do plecow, RR 190/110 (roznica konczyn 30 mmHg), obnizenia ST boczne.',
    hist: 'Nadcisnienie, cechy Marlana (nie rozpoznano).',
    labs: ['D-dimer 8 500 ng/ml', 'Troponina 0,3 ng/ml (lekko podwyzszona)', 'CT: rozwarstwienie aorty typu A'],
    vit: { hr: 96, bp: '190/110', sbp: 190, dbp: 110, spo2: 96, rr: 22, temp: 36.6, etco2: 36, gcs: 15 },
    ddx: ['NSTEMI', 'Zatorowosc plucna', 'Kryzys nadcisnieniowy'],
    dx: 'Rozwarstwienie aorty typu A z obnizeniami ST (ucisk tetnicy wiencowej)',
    tx: ['Pilna chirurgia (kardiochirurgia natychmiastowa)', 'Kontrola cisnienia (beta-bloker i.v. + nitroprusek)', 'Unikac antykoagulacji i heparyny (przeciwwskazana!)', 'Nie kierowac na PCI'],
    txIds: ['beta-blok'],
    expected: 'Rozwarstwienie typu A: chirurgia ratujaca zycie; heparyna przeciwwskazana; obnizenia ST wynikaja z niedokrwienia wiencowego.',
    compl: ['Tamponada (pekniecie do osierdzia)', 'Zawal', 'Smierc'],
    edu: 'Rozdzierajacy bol promieniujacy do plecow + asymetria RR + obnizenia ST = podejrzenie rozwarstwienia. Nie stosuj heparyny!',
    ref: 'ESC 2024 (Aorta); ERC 2021.',
    pattern: 'nstemi', rate: 96, threat: true
  },
  {
    id: 89, cat: 'mimic', title: 'Objaw Chvostka w hipokalcemii nasladujacej LQTS', diff: 3,
    pres: 'Kobieta 50 l., po resekcji jelita (przewlekla biegunka): parestezje, dodatni Chvostek, QTc 540 ms.',
    hist: 'Zespol krotkiego jelita, niedobor wapnia przewlekly.',
    labs: ['Ca (skoryg.) 6,5 mg/dl', 'Mg 1,2 mg/dl', 'PTH 12 pg/ml (niski)', 'QTc 540 ms'],
    vit: { hr: 78, bp: '115/72', sbp: 115, dbp: 72, spo2: 98, rr: 16, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['Zespol LQTS wrodzony', 'Zatrucie lekami QT-wydluzajacymi', 'Hipokaliemia'],
    dx: 'Hipokalcemia z wydluzonym QT (imitacja LQTS)',
    tx: ['Wapno 10% i.v. (korekta)', 'Korekta Mg', 'Wapno doustnie + witamina D przewlekle', 'Kontrola EKG po korekcie'],
    txIds: ['wapno'],
    expected: 'Po wyrownaniu wapnia QT normalizuje sie - roznicowanie z wrodzonym LQTS przez korekte przyczynowa.',
    compl: ['Torsades', 'Tetania', 'Drgawki'],
    edu: 'Hipokalcemia wydluza ST i QT (ale bez zalamka dwugarbnego jak w LQTS); korekta wapnia usuwa wydluzenie QT.',
    ref: 'ERC 2021.',
    pattern: 'hypocalcemia', rate: 78, threat: false
  },
  {
    id: 90, cat: 'mimic', title: 'Blad pozycjonowania elektrod EKG - falszywy zawal', diff: 2,
    pres: 'Kobieta 45 l., kontrola zdrowia: EKG wykazuje wzorzec zawalu w odprowadzeniach dolnych i bocznych, ale pacjentka zdrowa.',
    hist: 'Zdrowa, brak objawow.',
    labs: ['Troponina ujemna', 'Powtorne EKG z prawidlowym pozycjonowaniem: norma'],
    vit: { hr: 72, bp: '120/75', sbp: 120, dbp: 75, spo2: 98, rr: 14, temp: 36.6, etco2: 38, gcs: 15 },
    ddx: ['Zawal dolno-boczny', 'Dekstrokardia', 'Blad pozycjonowania elektrod'],
    dx: 'Blad pozycjonowania elektrod EKG (odwrocone elektrody konczynowe)',
    tx: ['Powtorzenie EKG z prawidlowym pozycjonowaniem', 'Edukacja personelu technicznego', 'Bez leczenia farmakologicznego'],
    txIds: [],
    expected: 'Zamiana elektrod konczynowych daje odwrotny wzorzec w aVR/aVL; poprawne EKG pokazuje norme.',
    compl: ['Niepotrzebne leczenie ACS', 'Opoznienie prawdziwej diagnozy'],
    edu: 'Odwrotne elektrody rak: P, QRS, T ujemne w I i aVL, dodatnie w aVR. Zawsze sprawdzaj pozycjonowanie przy nietypowym EKG.',
    ref: 'Standardy EKG (AHA 2007).',
    pattern: 'sinus-normal', rate: 72, threat: false
  }
]
