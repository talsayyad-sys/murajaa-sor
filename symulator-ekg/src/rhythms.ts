// ===== Rejestr wzorców rytmów serca =====
// Każdy wzorzec to funkcja generująca pojedynczy uderzenie (beat) w milisekundach.
// Wszystkie wartości amplitudy w mV, czas w ms.

export interface BeatSpec {
  pA: number      // amplituda załamka P [mV]
  pW: number       // szerokość P [ms]
  pr: number       // odstęp PR [ms]
  qA: number       // amplituda Q [mV] (dodatnia liczba = wychylenie w dół)
  qW: number
  rA: number
  rW: number
  sA: number
  sW: number
  j: number        // uniesienie/obniżenie punktu J [mV]
  tA: number
  tW: number
  tC: number       // liczba ujemna = T ujemne
  uA: number
  qt: number       // QT [ms]
}

export interface RhythmPattern {
  id: string
  name: string
  spec: () => BeatSpec
  rr: (i: number, hr: number) => number  // długość cyklu RR [ms] dla i-tego uderzenia
  atrialRate?: number                    // jeśli obecna, dodatkowa fala P (np. trzepotanie P)
}

const defaultSpec: BeatSpec = {
  pA: 0.15, pW: 90, pr: 160,
  qA: 0.1, qW: 40,
  rA: 1.1, rW: 60,
  sA: 0.25, sW: 50,
  j: 0, tA: 0.3, tW: 160, tC: 1,
  uA: 0.03, qt: 400
}

function spec(ov: Partial<BeatSpec> = {}): BeatSpec {
  return { ...defaultSpec, ...ov }
}

// Normalny rytm zatokowy
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
    id: 'sinus-arr', name: 'Niekiedy znaczna arytmia zatokowa',
    spec: () => spec(),
    rr: (i, hr) => (60000 / hr) * (1 + 0.15 * Math.sin(i * 0.8))
  },
  'afib': {
    id: 'afib', name: 'Migotanie przedsionków',
    spec: () => spec({ pA: 0, pr: 0 }),
    rr: (i, hr) => (60000 / hr) * (0.7 + 0.6 * Math.abs(Math.sin(i * 2.7)))
  },
  'aflutter': {
    id: 'aflutter', name: 'Trzepotanie przedsionków 2:1',
    spec: () => spec({ pA: 0, pr: 0 }),
    rr: (_i, hr) => 60000 / hr,
    atrialRate: 300
  },
  'svt': {
    id: 'svt', name: 'Częstoskurcz nadkomorowy',
    spec: () => spec({ pA: 0, pr: 0, rA: 0.9, rW: 50 }),
    rr: (_i, hr) => 60000 / hr
  },
  'svt-variant': {
    id: 'svt-variant', name: 'Częstoskurcz nadkomorowy (wariant morfologii)',
    spec: () => spec({ pA: 0, pr: 0, rA: 0.7, rW: 55, sA: 0.4 }),
    rr: (_i, hr) => 60000 / hr
  },
  'avnrt': {
    id: 'avnrt', name: 'AVNRT',
    spec: () => spec({ pA: 0, pr: 0, rA: 0.8, rW: 50 }),
    rr: (_i, hr)  => 60000 / hr
  },
  'avrt': {
    id: 'avrt', name: 'AVRT',
    spec: () => spec({ pA: 0, pr: 0, rA: 0.8, rW: 50, sA: 0.35 }),
    rr: (_i, hr) => 60000 / hr
  },
  'wpw-svt': {
    id: 'wpw-svt', name: 'Częstoskurcz AVRT z zespołem WPW (szeroki QRS)',
    spec: () => spec({ pA: 0, pr: 0, rA: 1.0, rW: 110, sA: 0.3 }),
    rr: (_i, hr) => 60000 / hr
  },
  'vt-sustained': {
    id: 'vt-sustained', name: 'Częstoskurcz komorowy utrwalony',
    spec: () => spec({ pA: 0, pr: 0, rA: 1.4, rW: 140, sA: 0.6, tA: -0.4, tC: -1 }),
    rr: (_i, hr) => 60000 / hr
  },
  'vt-nsvt': {
    id: 'vt-nsvt', name: 'Częstoskurcz komorowy nieutrwalony',
    spec: () => spec({ pA: 0, pr: 0, rA: 1.4, rW: 140, sA:  0.6, tA: -0.4, tC: -1 }),
    rr: (_i, hr) => 60000 / hr
  },
  'vt-polymorphic': {
    id: 'vt-polymorphic', name: 'Częstoskurcz komorowy polimorficzny',
    spec: () => spec({ pA: 0, pr: 0, rA: 1.2, rW: 140, sA: 0.7, tA: -0.3, tC: -1 }),
    rr: (i, hr) => (60000 / hr) * (1 + 0.1 * Math.sin(i))
  },
  'torsades': {
    id: 'torsades', name: 'Torsades de pointes',
    spec: () => spec({ pA: 0, pr: 0, rA: 1.5, rW: 150, sA: 0.8, tA: -0.5, tC: -1 }),
    rr: (i, hr) => (60000 / hr) * (1 + 0.25 * Math.sin(i * 1.5))
  },
  'vf-coarse': {
    id: 'vf-coarse', name: 'Migotanie komór grubo- i drobnowłókniste',
    spec: () => spec({ pA: 0, pr: 0, rA: 0.6, rW: 200, sA: 0.5, tA: 0 }),
    rr: (_i, hr) => 600
  },
  'vf-fine': {
    id: 'vf-fine', id2: undefined as any, name: 'Migotanie komór drobnowłókniste',
    spec: () => spec({ pA: 0, pr: 0, rA: 0.15, rW: 220, sA: 0.12, tA: 0 }),
    rr: (_i, hr) => 500
  },
  'asystole': {
    id: 'asystole', name: 'Asystolia',
    spec: () => spec({ pA: 0, pr: 0, rA: 0, qA: 0, sA: 0, tA: 0, uA: 0 }),
    rr: (_i, hr) => 60000 / 40
  },
  'pea': {
    id: 'pea', name: 'Asystolia / aktywność bez tętna (PEA)',
    spec: () => spec({ pA: 0.05, pW: 120, pr: 200, rA: 0.4, rW: 90, sA: 0.2, tA: 0.1 }),
    rr: (_i, hr) => 60000 / hr
  },
  'avb1': {
    id: 'avb1', name: 'Blok przedsionkowo-komorowy I stopnia',
    spec: () => spec({ pr: 320 }),
    rr: (_i, hr) => 60000 / hr
  },
  'avb2-mobitz1': {
    id: 'avb2-mobitz1', name: 'Blok AV II stopnia Mobitz I (Wenckebach)',
    spec: () => spec({ pr: 280 }),
    rr: (i, hr) => ((i % 4 === 3) ? (60000 / hr) * 1.9 : (60000 / hr))
  },
  'avb2-mobitz2': {
    id: 'avb2-mobitz2', name: 'Blok AV II stopnia Mobitz II',
    spec: () => spec(),
    rr: (i, hr) => ((i % 3 === 2) ? (60000 / hr) * 2 : (60000 / hr))
  },
  'avb2-21': {
    id: 'avb2-21', name: 'Blok AV II stopnia 2:1',
    spec: () => spec(),
    rr: (_i, hr) => (60000 / hr) * 2
  },
  'chb': {
    id: 'chb', name: 'Blok AV III stopnia (całkowity)',
    spec: () => spec({ pA: 0.12, pr: 0, rA: 1.0, rW: 130, sA: 0.4, tA: 0.25, qt: 480 }),
    rr: (_i, hr) => 60000 / hr,
    atrialRate: 75
  },
  'paced': {
    id: 'paced', name: 'Rytm stymulowany (PM)',
    spec: () => spec({ pA: 0, pr: 0, rA: 1.0, rW: 130, sA: 0.45, tA: 0.25, tC: -0.5 as any }),
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
    spec: () => spec({ j: -0.2, tA: -0.25, rA: 1.3 }),
    rr: (_i,  hr) => 60000 / hr
  },
  'stemi-lateral': {
    id: 'stemi-lateral', name: 'STEMI ściany bocznej',
    spec: () => spec({ j: 0.32, tA: 0.42 }),
    rr: (_i, hr) => 60000 / hr
  },
  'nstemi': {
    id: 'nstemi', name: 'NSTEMI',
    spec: () => spec({ j: -0.15, tA: -0.2 }),
    rr: (_i, hr) => 60000 / hr
  },
  'stemi-rv': {
    id: 'stemi-rv', name: 'STEMI prawej komory (RV)',
    spec: () => spec({ j: 0.28, tA: 0.35 }),
    rr: (_i, hr) => 60000 / hr
  },
  'pericarditis': {
    id: 'pericarditis', name: 'Zapalenie osierdzia',
    spec: () => spec({ j: 0.18, tA: 0.3 }),
    rr: (_i, hr) => 60000 / hr
  },
  'brugada': {
    id: 'brugada', name: 'Zespół Brugadów',
    spec: ( ) => spec({ rA: 1.2, rW: 80, sA: 0.7, j: 0.25, tA: -0.3, tC: -1 }),
    rr: (_i, hr) =>  60000 / hr
  },
  'lqts': {
    id: 'lqts', name: 'Zespół wydłużonego QT',
    spec: () => spec({ qt: 560, tA: 0.35, tW: 240 }),
    rr: (_i, hr) => 60000 / hr
  },
  'sqt's: undefined as any,
  'sqts': {
    id: 'sqts', name: 'Zespół krótkiego QT',
    spec: () => spec({ qt: 280, tA: 0.35, tW: 100 }),
    rr: (_i, hr) => 60000 / hr
  },
  'ers': {
    id: 'ers', name: 'Zespół wczesnej polaryzacji',
    spec: () => spec({ j: 0.25, rA: 1.2 }),
    rr: (_i, hr) => 60000 / hr
  },
  'cpvt': {
    id: 'cpvt', name: 'CPVT',
    spec: () => spec({ pA: 0, pr: 0, rA: 1.3, rW: 140, sA: 0.7, tA: -0.4, tC: -1 }),
    rr: (i, hr) => (60000 / hr) * (1 + 0.15 * Math.sin(i * 1.2))
  },
  'hcm': {
    id: 'hcm', name: 'Kardiomiopatia przerostowa (HCM)',
    spec: () => spec({ rA: 2.4, sA: 0.5, qA: 0.3 }),
    rr: (_i, hr) => 60000 / hr
  },
  'arvc': {
    id: 'arvc', name: 'ARVC',
    spec: () => spec({ rA: 0.9, rW: 100, sA: 0.6, tA: -0.25, tC: -1 }),
    rr: (_i, hr) => 60000 / hr
  },
  'pvc': {
    id: 'pvc', name: 'Ekstrasystole komorowe',
    spec: () => spec({ pA: 0, pr: 0, rA: 1.5, rW: 150, sA:  0.7, tA: -0.45, tC: -1 }),
    rr: (i, hr) => ((i % 6 === 4) ? (60000 / hr) * 0.4 : (60000 / hr))
  },
  'pac': {
    id: 'pac', name: 'Ekstrasystole przedsionkowe',
    spec: () => spec({ pA: 0.1, pr: 130 }),
    rr: (i, hr) => ((i % 7 === 5) ? (60000 / hr) * 0.6 : (60000 / hr))
  },
  'wpw-sinus': {
    id: 'wpw-sinus', name: 'Zespół WPW – rytm zatokowy',
    spec: () => spec({ pr: 100, rW: 100, sA: 0.4, j: 0.12 }),
    rr: (_i,  hr) => 60000 / 60
  },
  'hyperkalemia': {
    id: 'hyperkalemia', name: 'Hiperkaliemia',
    spec: () => spec({ pA: 0, pr: 0, rA: 0.8, rW: 160, sA: 0.4, tA: 0.5, tW: 200 }),
    rr: (_i, hr) => 60000 / hr
  },
  'hypokalemia': {
    id: 'hypokalemia', name: 'Hipopotasemia',
    spec: () =>  spec({ tA: 0.2, tW: 180, uA: 0.18, qt: 440 }),
    rr: (_i, hr) => 60000 / hr
  },
  'hypercalcemia': {
    id: 'hypercalcemia', name: 'Hiperkalcemia',
    spec: () => spec({ qt: 320, tW: 120 }),
    rr: (_i, hr) => 60000 / hr
  },
  'hypocalcemia': {
    id: 'hypocalcemia', name: 'Hipokalcemia',
    sign: undefined as any,
    spec: () => spec({ qt: 520, tW: 260 }),
    rr: (_i, hr) => 60000 / hr
  },
  'dig-toxicity': {
    id: 'dig-toxicity', name: 'Zatrucie glikozydami naparstnicy',
    spec: () => spec({ pA: 0.05, pr: 280, rA: 0.5, rW: 100, sA: 0.3, tA: -0.15, tC: -1, j: -0.08 }),
    rr: (i, hr) => ((i % 4 === 3) ? (60000 / hr) * 1.8 : (60000 / hr))
  },
  'pe-sinus': {
    id: 'pe-sinus', name: 'Zatorowość płucna – tachykardia zatokowa',
    spec: () => spec({ rA: 0.9, sA: 0.5, tA: -0.2, tC: -1 }),
    rr: (_i, hr) => 60000 / hr
  },
  'pe-s1q3t3': {
    id: 'pe-s1q3t3', name: 'Zatorowość płucna – S1Q3T3',
    spec: () => spec({ rA: 0.9, sA: 0.5, tA: -0.2, tC:  -1 }),
    rrr: undefined as any,
    rr: (_i, hr) => 60000 / hr
  },
  'copd-sinus': {
    id: 'copd-sinus', name: 'POChP – rytm zatokowy z cechami przerostu P pulmonale',
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
    spec: () => spec({ pA: 0.3, rA: 0.7, sA: 0.6, tA: -0.25, tC: -1 }),
    rr: (_i, hr) => 60000 / hr
  },
  'stemi-lateral-alternans': {
    id: 'stemi-lateral-alternans', name: 'STEMI z alternacją T',
    spec: () => spec({ j: 0.3, tA: 0.4, tC: undefined as any }),
    rr: (i, hr) => (60000 / hr)  * (i % 2 === 0 ? 1 : 1)
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
