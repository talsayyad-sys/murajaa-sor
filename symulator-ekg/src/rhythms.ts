// ===== Rejestr wzorców rytmów serca =====
// Każdy wzorzec definiuje morfologię pojedynczego uderzenia oraz sekwencję odstępów RR.
// Amplitudy w mV, czasy w ms. Wzorce są ORYGINALNE – inspirowane opisami
// elektrokardiograficznymi z literatury, bez użycia materiałów firmowych.

export interface BeatSpec {
  pA: number      // amplituda załamka P [mV]
  pW: number      // szerokość P [ms]
  pr: number      // odstęp PR [ms]
  qA: number      // amplituda Q [mV] (ujemne wychylenie)
  qW: number
  rA: number      // amplituda R [mV]
  rW: number
  sA: number      // amplituda S [mV]
  sW: number
  j: number       // uniesienie/obniżenie punktu J [mV]
  tA: number      // amplituda T [mV]
  tW: number      // szerokość T [ms]
  tNeg: boolean   // T ujemny
  uA: number      // amplituda U [mV]
  qt: number      // QT [ms]
}

export interface RhythmPattern {
  id: string
  name: string
  spec: () => BeatSpec
  rr: (i: number, hr: number) => number  // długość cyklu RR [ms]
  atrialRate?: number                   // dodatkowa aktywność przedsionkowa [/min]
  irregular?: boolean                   // chaotyczne RR (np. AF)
}

const defaultSpec: BeatSpec = {
  pA: 0.15, pW: 90, pr: 160,
  qA: 0.1, qW: 40,
  rA: 1.1, rW: 60,
  sA: 0.25, sW: 50,
  j: 0, tA: 0.3, tW: 160, tNeg: false,
  uA: 0.03, qt: 400
}

function spec(ov: Partial<BeatSpec> = {}): BeatSpec {
  return { ...defaultSpec, ...ov }
}

export const rhythms: Record<string, RhythmPattern> = {
  'sinus-normal': {
    id: 'sinus-normal', name: 'Rytm zatokowy prawidłowy',
    spec: () => spec(),
    rr: (_i, hr) => 60000 / hr
  },
  'sinus-tachy': {
    id: 'sinus-tachy', name: 'Tachykardia zatokowa',
    spec: () => spec(),
    rr: (_i, hr) => 60000 / hr
  },
  'sinus-brady': {
    id: 'sinus-brady', name: 'Bradykardia zatokowa',
    spec: () => spec(),
    rr: (_i, hr) => 60000 / hr
  },
  'sinus-arr': {
    id: 'sinus-arr', name: 'Arytmia zatokowa',
    spec: () => spec(),
    rr: (i, hr) => (60000 / hr) * (1 + 0.15 * Math.sin(i * 0.8))
  },
  'afib': {
    id: 'afib', name: 'Migotanie przedsionków', irregular: true,
    spec: () => spec({ pA: 0, pr: 0 }),
    rr: (i, hr) => (60000 / hr) * (0.7 + 0.6 * Math.abs(Math.sin(i * 2.7)))
  },
  'aflutter': {
    id: 'aflutter', name: 'Trzepotanie przedsionków 2:1', atrialRate: 300,
    spec: () => spec({ pA: 0, pr: 0 }),
    rr: (_i, hr) => 60000 / hr
  },
  'svt': {
    id: 'svt', name: 'Częstoskurcz nadkomorowy',
    spec: () => spec({ pA: 0, pr: 0, rA: 0.9, rW: 50 }),
    rr: (_i, hr) => 60000 / hr
  },
  'avnrt': {
    id: 'avnrt', name: 'AVNRT',
    spec: () => spec({ pA: 0, pr: 0, rA: 0.8, rW: 50 }),
    rr: (_i, hr) => 60000 / hr
  },
  'avrt': {
    id: 'avrt', name: 'AVRT (koło reentry ortodromowe)',
    spec: () => spec({ pA: 0, pr: 0, rA: 0.8, rW: 50, sA: 0.35 }),
    rr: (_i, hr) => 60000 / hr
  },
  'wpw-svt': {
    id: 'wpw-svt', name: 'AVRT z zespołem WPW – szeroki QRS',
    spec: () => spec({ pA: 0, pr: 0, rA: 1.0, rW: 110, sA: 0.3 }),
    rr: (_i, hr) => 60000 / hr
  },
  'vt-sustained': {
    id: 'vt-sustained', name: 'Częstoskurcz komorowy utrwalony',
    spec: () => spec({ pA: 0, pr: 0, rA: 1.4, rW: 140, sA: 0.6, tA: 0.4, tNeg: true }),
    rr: (_i, hr) => 60000 / hr
  },
  'vt-nsvt': {
    id: 'vt-nsvt', name: 'Częstoskurcz komorowy nieutrwalony',
    spec: () => spec({ pA: 0, pr: 0, rA: 1.4, rW: 140, sA: 0.6, tA: 0.4, tNeg: true }),
    rr: (_i, hr) => 60000 / hr
  },
  'vt-polymorphic': {
    id: 'vt-polymorphic', name: 'Częstoskurcz komorowy polimorficzny', irregular: true,
    spec: () => spec({ pA: 0, pr: 0, rA: 1.2, rW: 140, sA: 0.7, tA: 0.3, tNeg: true }),
    rr: (i, hr) => (60000 / hr) * (1 + 0.1 * Math.sin(i))
  },
  'torsades': {
    id: 'torsades', name: 'Torsades de pointes', irregular: true,
    spec: () => spec({ pA: 0, pr: 0, rA: 1.5, rW: 150, sA: 0.8, tA: 0.5, tNeg: true }),
    rr: (i, hr) => (60000 / hr) * (1 + 0.25 * Math.sin(i * 1.5))
  },
  'vf-coarse': {
    id: 'vf-coarse', name: 'Migotanie komór grubowłókniste', irregular: true,
    spec: () => spec({ pA: 0, pr: 0, rA: 0.6, rW: 200, sA: 0.5, tA: 0, uA: 0 }),
    rr: () => 600
  },
  'vf-fine': {
    id: 'vf-fine', name: 'Migotanie komór drobnowłókniste', irregular: true,
    spec: () => spec({ pA: 0, pr: 0, rA: 0.15, rW: 220, sA: 0.12, tA: 0, uA: 0 }),
    rr: () => 500
  },
  'asystole': {
    id: 'asystole', name: 'Asystolia',
    spec: () => spec({ pA: 0, pr: 0, rA: 0, qA: 0, sA: 0, tA: 0, uA: 0 }),
    rr: (_i, hr) => 60000 / Math.max(hr, 20)
  },
  'pea': {
    id: 'pea', name: 'Czynność elektryczna bez tętna (PEA)',
    spec: () => spec({ pA: 0.05, pW: 120, pr: 200, rA: 0.4, rW: 90, sA: 0.2, tA: 0.1 }),
    rr: (_i, hr) => 60000 / hr
  },
  'avb1': {
    id: 'avb1', name: 'Blok przedsionkowo-komorowy I stopnia',
    spec: () => spec({ pr: 320 }),
    rr: (_i, hr) => 60000 / hr
  },
  'avb2-mobitz1': {
    id: 'avb2-mobitz1', name: 'Blok AV II st. Mobitz I (Wenckebach)',
    spec: () => spec({ pr: 280 }),
    rr: (i, hr) => (i % 4 === 3 ? (60000 / hr) * 1.9 : 60000 / hr)
  },
  'avb2-mobitz2': {
    id: 'avb2-mobitz2', name: 'Blok AV II st. Mobitz II',
    spec: () => spec(),
    rr: (i, hr) => (i % 3 === 2 ? (60000 / hr) * 2 : 60000 / hr)
  },
  'avb2-21': {
    id: 'avb2-21', name: 'Blok AV II st. typu 2:1',
    spec: () => spec(),
    rr: (_i, hr) => (60000 / hr) * 2
  },
  'chb': {
    id: 'chb', name: 'Blok AV III stopnia (całkowity)', atrialRate: 75,
    spec: () => spec({ pA: 0.12, pr: 0, rA: 1.0, rW: 130, sA: 0.4, tA: 0.25, qt: 480 }),
    rr: (_i, hr) => 60000 / hr
  },
  'paced': {
    id: 'paced', name: 'Rytm stymulowany',
    spec: () => spec({ pA: 0, pr: 0, rA: 1.0, rW: 130, sA: 0.45, tA: 0.25 }),
    rr: (_i, hr) => 60000 / hr
  },
  'stemi-anterior': {
    id: 'stemi-anterior', name: 'STEMI przednio-przegrodowy',
    spec: () => spec({ j: 0.35, tA: 0.45 }),
    rr: (_i, hr) => 60000 / hr
  },
  'stemi-inferior': {
    id: 'stemi-inferior', name: 'STEMI dolny',
    spec: () => spec({ j: 0.30, tA: 0.40 }),
    rr: (_i, hr) => 60000 / hr
  },
  'stemi-posterior': {
    id: 'stemi-posterior', name: 'STEMI tylnej ściany',
    spec: () => spec({ j: -0.2, tA: 0.25, tNeg: true, rA: 1.3 }),
    rr: (_i, hr) => 60000 / hr
  },
  'stemi-lateral': {
    id: 'stemi-lateral', name: 'STEMI ściany bocznej',
    spec: () => spec({ j: 0.32, tA: 0.42 }),
    rr: (_i, hr) => 60000 / hr
  },
  'nstemi': {
    id: 'nstemi', name: 'NSTEMI – obniżenia ST',
    spec: () => spec({ j: -0.15, tA: 0.2 }),
    rr: (_i, hr) => 60000 / hr
  },
  'stemi-rv': {
    id: 'stemi-rv', name: 'STEMI z zajęciem prawej komory',
    spec: () => spec({ j: 0.28, tA: 0.35 }),
    rr: (_i, hr) => 60000 / hr
  },
  'pericarditis': {
    id: 'pericarditis', name: 'Zapalenie osierdzia – uniesienia ST rozlane',
    spec: () => spec({ j: 0.18, tA: 0.3 }),
    rr: (_i, hr) => 60000 / hr
  },
  'brugada': {
    id: 'brugada', name: 'Zespół Brugadów (typ 1)',
    spec: () => spec({ rA: 1.2, rW: 80, sA: 0.7, j: 0.25, tA: 0.3, tNeg: true }),
    rr: (_i, hr) => 60000 / hr
  },
  'lqts': {
    id: 'lqts', name: 'Zespół wydłużonego QT',
    spec: () => spec({ qt: 560, tA: 0.35, tW: 240 }),
    rr: (_i, hr) => 60000 / hr
  },
  'sqts': {
    id: 'sqts', name: 'Zespół krótkiego QT',
    spec: () => spec({ qt: 280, tA: 0.35, tW: 100 }),
    rr: (_i, hr) => 60000 / hr
  },
  'ers': {
    id: 'ers', name: 'Zespół wczesnej repolaryzacji',
    spec: () => spec({ j: 0.25, rA: 1.2 }),
    rr: (_i, hr) => 60000 / hr
  },
  'cpvt': {
    id: 'cpvt', name: 'Częstoskurcz komorowy katecholaminergiczny (CPVT)', irregular: true,
    spec: () => spec({ pA: 0, pr: 0, rA: 1.3, rW: 140, sA: 0.7, tA: 0.4, tNeg: true }),
    rr: (i, hr) => (60000 / hr) * (1 + 0.15 * Math.sin(i * 1.2))
  },
  'hcm': {
    id: 'hcm', name: 'Kardiomiopatia przerostowa',
    spec: () => spec({ rA: 2.4, sA: 0.5, qA: 0.3 }),
    rr: (_i, hr) => 60000 / hr
  },
  'arvc': {
    id: 'arvc', name: 'Kardiomiopatia arytmogenna prawej komory (ARVC)',
    spec: () => spec({ rA: 0.9, rW: 100, sA: 0.6, tA: 0.25, tNeg: true }),
    rr: (_i, hr) => 60000 / hr
  },
  'pvc': {
    id: 'pvc', name: 'Ekstrasystolie komorowe',
    spec: () => spec({ pA: 0, pr: 0, rA: 1.5, rW: 150, sA: 0.7, tA: 0.45, tNeg: true }),
    rr: (i, hr) => (i % 6 === 4 ? (60000 / hr) * 0.4 : 60000 / hr)
  },
  'pac': {
    id: 'pac', name: 'Ekstrasystolie przedsionkowe',
    spec: () => spec({ pA: 0.1, pr: 130 }),
    rr: (i, hr) => (i % 7 === 5 ? (60000 / hr) * 0.6 : 60000 / hr)
  },
  'wpw-sinus': {
    id: 'wpw-sinus', name: 'Zespół WPW – rytm zatokowy',
    spec: () => spec({ pr: 100, rW: 100, sA: 0.4, j: 0.12 }),
    rr: (_i, hr) => 60000 / hr
  },
  'hyperkalemia': {
    id: 'hyperkalemia', name: 'Hiperkaliemia – wysokie, ostre T, poszerzone QRS',
    spec: () => spec({ pA: 0, pr: 0, rA: 0.8, rW: 160, sA: 0.4, tA: 0.5, tW: 200 }),
    rr: (_i, hr) => 60000 / hr
  },
  'hypokalemia': {
    id: 'hypokalemia', name: 'Hipopotasemia – wyraźny załamek U',
    spec: () => spec({ tA: 0.2, tW: 180, uA: 0.18, qt: 440 }),
    rr: (_i, hr) => 60000 / hr
  },
  'hypercalcemia': {
    id: 'hypercalcemia', name: 'Hiperkalcemia – krótkie QT',
    spec: () => spec({ qt: 320, tW: 120 }),
    rr: (_i, hr) => 60000 / hr
  },
  'hypocalcemia': {
    id: 'hypocalcemia', name: 'Hipokalcemia – wydłużone QT',
    spec: () => spec({ qt: 520, tW: 260 }),
    rr: (_i, hr) => 60000 / hr
  },
  'dig-toxicity': {
    id: 'dig-toxicity', name: 'Zatrucie naparstnicą',
    spec: () => spec({ pA: 0.05, pr: 280, rA: 0.5, rW: 100, sA: 0.3, tA: 0.15, tNeg: true, j: -0.08 }),
    rr: (i, hr) => (i % 4 === 3 ? (60000 / hr) * 1.8 : 60000 / hr)
  },
  'pe-sinus': {
    id: 'pe-sinus', name: 'Zatorowość płucna – tachykardia zatokowa',
    spec: () => spec({ rA: 0.9, sA: 0.5, tA: 0.2, tNeg: true }),
    rr: (_i, hr) => 60000 / hr
  },
  'pe-s1q3t3': {
    id: 'pe-s1q3t3', name: 'Zatorowość płucna – S1Q3T3',
    spec: () => spec({ rA: 0.9, sA: 0.5, tA: 0.2, tNeg: true }),
    rr: (_i, hr) => 60000 / hr
  },
  'copd-sinus': {
    id: 'copd-sinus', name: 'POChP – P pulmonale',
    spec: () => spec({ pA: 0.28, pW: 100, rA: 0.7, sA: 0.5 }),
    rr: (_i, hr) => 60000 / hr
  },
  'rae': {
    id: 'rae', name: 'Powiększenie prawego przedsionka',
    spec: () => spec({ pA: 0.3 }),
    rr: (_i, hr) => 60000 / hr
  },
  'tamponade': {
    id: 'tamponade', name: 'Tamponada osierdzia',
    spec: () => spec({ rA: 0.7, sA: 0.4, j: 0.05 }),
    rr: (i, hr) => (60000 / hr) * (1 + 0.08 * Math.sin(i * 3.14))
  },
  'corpulmonale': {
    id: 'corpulmonale', name: 'Plucno-serce (cor pulmonale)',
    spec: () => spec({ pA: 0.3, rA: 0.7, sA: 0.6, tA: 0.25, tNeg: true }),
    rr: (_i, hr) => 60000 / hr
  },
  'hyperacute-T': {
    id: 'hyperacute-T', name: 'Hiperostre załamki T (wczesne STEMI)',
    spec: () => spec({ j: 0.15, tA: 0.8, tW: 200 }),
    rr: (_i, hr) => 60000 / hr
  }
}

export function getRhythm(id: string): RhythmPattern {
  return rhythms[id] ?? rhythms['sinus-normal']
}
