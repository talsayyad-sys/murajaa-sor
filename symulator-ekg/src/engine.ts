// ===== Silnik sygnału EKG: generowanie ciągłej krzywej =====
// Wizualizacja w mV/s zgodna z typową szybkością podawania 25 mm/s.

import { getRhythm, BeatSpec, RhythmPattern } from './rhythms'

export interface SigContext {
  rhythmId: string
  hr: number
  ov?: any  // ShapeOv z przypadku
}

// Zapamiętywana sekwencja punktów uderzenia (cache na wzorzec)
let beatCache: { key: string; points: number[] } | null = null

function gauss(t: number, w: number): number {
  const s = w / 4
  return Math.exp(-(t * t) / (2 * s * s))
}

/** Generuje punkty [mV] jednego cyklu EKG dla danego spec i HR. */
export function renderBeat(s: BeatSpec, hr: number, tNeg: boolean, atrialRate?: number): number[] {
  const qt = Math.max(s.qt, 300)
  const cycle = Math.max(60000 / Math.max(hr, 15), qt + 200)
  const pts: number[] = []
  const step = 2 // ms na punkt
  const totalPts = Math.round(cycle / step)

  for (let k = 0; k < totalPts; k++) {
    const t = k * step
    let v = 0

    // Fala P
    if (s.pA > 0) v += s.pA * gauss(t - s.pW, s.pW)
    // Odstęp PR – linia bazowa
    // Zespół QRS
    const qStart = s.pW + s.pr
    if (s.qA > 0) v -= s.qA * gauss(t - qStart - s.qW, s.qW)
    const rStart = qStart + s.qW
    v += s.rA * gauss(t - rStart - s.rW, s.rW)
    const sStart = rStart + s.rW
    v -= s.sA * gauss(t - sStart - s.sW, s.sW)

    // Uniesienie/obniżenie J
    const jStart = sStart + s.sW
    const jEnd = jStart + qt
    const tStart = jStart + (qt - s.tW) * 0.4
    if (t >= jStart && t <= jEnd) v += s.j

    // Załamek T
    const tSign = tNeg ? -1 : 1
    v += tSign * s.tA * gauss(t - tStart - s.tW / 2, s.tW)

    // Załamek U
    if (s.uA > 0 && qt + 60 < cycle) {
      v += s.uA * gauss(t - (jStart + s.tW + 80), 60)
    }

    // Fale trzepotania P (jeśli obecne)
    if (atrialRate && atrialRate > 0) {
      const fPeriod = 60000 / atrialRate
      const phase = (t % fPeriod) / fPeriod
      v += 0.12 * Math.sin(phase * Math.PI * 2) * (phase < 0.5 ? 1 : 0.3)
    }

    pts.push(v)
  }
  return pts
}

/** Zwraca pełny bufor sygnału (kilka cykli) dla wyświetlenia. */
export function buildBuffer(rit: RhythmPattern, hr: number, ov?: any): number[] {
  const key = rit.id + '|' + hr + '|' + JSON.stringify(ov ?? {})
  if (beatCache && beatCache.key === key) return beatCache.points

  let s = rit.spec()
  if (ov) s = { ...s, ...ov }

  const out: number[] = []
  // Generuj 5 cykli z RR według funkcji rytmu
  for (let i = 0; i < 5; i++) {
    const rr = rit.rr(i, hr)
    const hrI = 60000 / Math.max(rr, 300)
    const beat = renderBeat(s, Math.min(hrI, 250), s.tNeg, (rit as any).atrialRate)
    out.push(...beat)
  }

  if (beatCache && out.length > 200000) beatCache = null
  beatCache = { key, points: out }
  return out
}

/** Główna funkcja: bufor EKG dla rytmu, HR i nadpisań przypadku. */
export function ecgBuffer(rhythmId: string, hr: number, ov?: any): number[] {
  const rit = getRhythm(rhythmId)
  return buildBuffer(rit, hr, ov)
}
