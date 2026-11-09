// ===== Trwałość lokalna: zapisywanie wyników egzaminów i postępów =====
// Implementacja oparta na localStorage (przeglądarka przechowuje dane lokalnie).

import { ExamResult } from './types'

const KEY_RESULTS = 'symulator-ekg-wyniki'
const KEY_PROGRESS = 'symulator-ekg-postep'

export function saveExamResult(res: ExamResult): void {
  try {
    const all = loadResults()
    all.push(res)
    localStorage.setItem(KEY_RESULTS, JSON.stringify(all))
  } catch (e) {
    console.error('Błąd zapisu wyników:', e)
  }
}

export function loadResults(): ExamResult[] {
  try {
    const raw = localStorage.getItem(KEY_RESULTS)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function clearResults(): void {
  localStorage.removeItem(KEY_RESULTS)
}

export interface CaseProgress {
  seen: number[]          // ID przypadków, które użytkownik zobaczył
  correctDx: number[]     // ID z poprawnym rozpoznaniem
  correctTx: number[]     // ID z poprawnym leczeniem
}

export function loadProgress(): CaseProgress {
  try {
    const raw = localStorage.getItem(KEY_PROGRESS)
    if (raw) return JSON.parse(raw)
  } catch { /* pusty */ }
  return { seen: [], correctDx: [], correctTx: [] }
}

export function saveProgress(p: CaseProgress): void {
  try {
    localStorage.setItem(KEY_PROGRESS, JSON.stringify(p))
  } catch (e) {
    console.error('Błąd zapisu postępu:', e)
  }
}

export function recordProgress(caseId: number, dxOk: boolean, txOk: boolean): void {
  const p = loadProgress()
  if (!p.seen.includes(caseId)) p.seen.push(caseId)
  if (dxOk && !p.correctDx.includes(caseId)) p.correctDx.push(caseId)
  if (txOk && !p.correctTx.includes(caseId)) p.correctTx.push(caseId)
  saveProgress(p)
}

// ===== Statystyki wydajności =====

export interface PerfStats {
  n: number
  avgScore: number
  bestScore: number
  byCat: Record<string, { n: number, avg: number }>
}

export function computeStats(): PerfStats {
  const results = loadResults()
  if (results.length === 0) return { n: 0, avgScore: 0, bestScore: 0, byCat: {} }

  let sum = 0
  let best = 0
  const byCat: Record<string, { n: number, avg: number }> = {}

  for (const r of results) {
    sum += r.score
    if (r.score > best) best = r.score
    // Agregacja wg kategorii (per pytanie)
    for (const q of r.perQ) {
      const c = getCatOf(q.caseId)
      if (!byCat[c]) byCat[c] = { n: 0, avg: 0 }
      byCat[c].n++
    }
  }

  return {
    n: results.length,
    avgScore: Math.round(sum / results.length),
    bestScore: best,
    byCat
  }
}

function getCatOf(caseId: number): string {
  // Import z odroczeniem, aby uniknąć cykli
  const { allCases } = require('./cases')
  return allCases.find(c => c.id === caseId)?.cat ?? 'nieznana'
}
