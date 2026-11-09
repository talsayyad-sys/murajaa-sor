// ===== Silnik fizjologiczny: postęp kliniczny i odpowiedź na leczenie =====
// Model edukacyjny: uproszczona symulacja hemodynamiki i wymiany gazowej.

import { EcgCase } from './types'

export interface PhysioState {
  hr: number
  sbp: number
  dbp: number
  spo2: number
  rr: number
  etco2: number
  temp: number
  gcs: number
  rhythmId: string
  alive: boolean
  shocksDelivered: number
  cprActive: boolean
  log: LogEntry[]
}

export interface LogEntry {
  t: number   // sekundy symulacji
  text: string
}

const DEFAULT: PhysioState = {
  hr: 80, sbp: 120, dbp: 80, spo2: 96, rr: 14, etco2: 38, temp: 36.6, gcs: 15,
  rhythmId: 'sinus-normal', alive: true, shocksDelivered: 0, cprActive: false, log: []
}

export function initState(c: EcgCase): PhysioState {
  const s: PhysioState = {
    ...DEFAULT,
    hr: c.vit.hr,
    sbp: c.vit.sbp,
    dbp: c.vit.dbp,
    spo2: c.vit.spo2,
    rr: c.vit.rr,
    etco2: c.vit.etco2,
    temp: c.vit.temp,
    gcs: c.vit.gcs,
    rhythmId: c.pattern
  }
  s.log = [{ t: 0, text: 'Monitorowanie rozpoczęte. Rytm: ' + c.pattern }]
  return s
}

export function step(state: PhysioState, dtSec: number, caseData: EcgCase): PhysioState {
  // Uproszczona naturalna progresja: lekkie fluktuacje + trend chorobowy
  const n = (a: number, m: number) => a + (Math.random() - 0.5) * m
  state.hr = clamp(n(state.hr, 2), 0, 220)
  state.sbp = clamp(n(state.sbp, 3), 0, 250)
  state.dbp = clamp(n(state.dbp, 2), 0, 180)
  state.spo2 = clamp(n(state.spo2, 1), 0, 100)
  state.rr = clamp(n(state.rr, 1), 0, 60)
  state.etco2 = clamp(n(state.etco2, 1), 0, 80)
  return state
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v))
}

/** Defibrylacja – skuteczność zależna od rytmu i liczby wyładowań. */
export function defib(state: PhysioState, caseData: EcgCase, energy: number): { state: PhysioState, success: boolean } {
  state.shocksDelivered++
  const base = caseData.shock ?? 0
  let p = base * (0.85 + 0.10 * state.shocksDelivered)
  if (energy >= 150) p *= 1.05
  const success = Math.random() < Math.min(p, 0.95)

  if (success) {
    state.rhythmId = 'sinus-normal'
    state.hr = 60 + Math.floor(Math.random() * 20)
    state.sbp = Math.max(state.sbp, 95)
    state.log.push({ t: Date.now() % 1e7, text: 'Wyładowanie ' + energy + ' J – powrót rytmu zatokowego' })
  } else {
    state.log.push({ t: Date.now() % 1e7, text: 'Wyładowanie ' + energy + ' J – rytm bez zmian, kontynuuj RKO' })
  }
  return { state, success }
}

/** Kardiowersja – wymaga rytmu zorganizowanego i synchronizacji. */
export function cardiovert(state: PhysioState, caseData: EcgCase, energy: number): { state: PhysioState, success: boolean } {
  state.shocksDelivered++
  const base = caseData.shock ?? 0
  let p = base
  const success = Math.random() < Math.min(p, 0.95)
  if (success) {
    state.rhythmId = 'sinus-normal'
    state.hr = 70 + Math.floor(Math.random() * 15)
    state.log.push({ t: Date.now() % 1e7, text: 'Kardiowersja ' + energy + ' J skuteczna' })
  } else {
    state.log.push({ t: Date.now() % 1e7, text: 'Kardiowersja ' + energy + ' J nieskuteczna' })
  }
  return { state, success }
}

/** Stymulacja (pacing) – próg wychwytu zdefiniowany w przypadku. */
export function pace(state: PhysioState, caseData: EcgCase, current: number): { state: PhysioState, captured: boolean } {
  const thr = caseData.paceThr ?? 40
  const captured = current >= thr
  if (captured) {
    state.rhythmId = 'paced'
    state.hr = 70
    state.sbp = Math.max(state.sbp, 95)
    state.log.push({ t: Date.now() % 1e7, text: 'Stymulacja ' + current + ' mA – wychwyt uzyskany, tętno 70/min' })
  } else {
    state.log.push({ t: 0, text: 'Stymulacja ' + current + ' mA – brak wychwytu (próg: ' + thr + ' mA)' })
  }
  return { state, captured }
}

/** RKO (CPR) – utrzymuje perfuzję, poprawia szansę skutecznej defibrylacji. */
export function cpr(state: PhysioState, active: boolean): PhysioState {
  state.cprActive = active
  if (active) {
    state.sbp = Math.max(state.sbp, 70)
    state.etco2 = Math.max(state.etco2, 15)
    state.log.push({ t: 0, text: 'RKO rozpoczęte (30:2)' })
  } else {
    state.log.push({ t: 0, text: 'RKO przerwane' })
  }
  return state
}

/** Podanie leku – opisowe efekty farmakologiczne. */
export interface DrugEffect { hr?: number; sbp?: number; spo2?: number; rr?: number; etco2?: number; rhythm?: string }

export const drugEffects: Record<string, DrugEffect> = {
  'adenozyna':   { hr: -30 },
  'amiodaron':   { hr: -25 },
  'verapamil':   { hr: -20, sbp: -10 },
  'diltiazem':   { hr: -15, sbp: -5 },
  'beta-blok':   { hr: -25, sbp: -10 },
  'adenokortykosteroid': {},
  'digoxin':     { hr: -30 },
  'adrenalina':  { hr: 25, sbp: 15 },
  'norepi':      { sbp: 25 },
  'atropina':    { hr: 25 },
  'lidokaina':   {},
  'magnez':      {},
  'wapno':       {},
  'insulina-glukoza': {},
  'sodawapno':   {},
  'nalokson':    { rr: 8 },
  'tlen':        { spo2: 5 },
  'płyny':       { sbp: 10 },
  'adeno-iv':    { hr: -40 },
  'klonidyna':   {},
  'fizostygmina': {},
  'sodubikarb':  {}
}

export function giveDrug(state: PhysioState, drugId: string): PhysioState {
  const eff = drugEffects[drugId]
  const name = drugId
  if (!eff) {
    state.log.push({ t: 0, text: 'Podano: ' + name })
    return state
  }
  if (eff.hr) state.hr = clamp(state.hr + eff.hr, 0, 220)
  if (eff.sbp) state.sbp = clamp(state.sbp + eff.sbp, 0, 250)
  if (eff.spo2) state.spo2 = clamp(state.spo2 + eff.spo2, 0, 100)
  if (eff.rr) state.rr = clamp(state.rr + eff.rr, 0, 60)
  if (eff.etco2) state.etco2 = clamp(state.etco2 + eff.etco2, 0, 80)
  if (eff.rhythm) state.rhythmId = eff.rhythm
  state.log.push({ t: 0, text: 'Podano: ' + name + ' – efekt hemodynamiczny zastosowany' })
  return state
}
