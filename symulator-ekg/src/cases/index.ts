// ===== Zbiorczy rejestr wszystkich 100 przypadków =====

import { EcgCase } from './types'
import { casesTachy } from './cases/casesTachy'
import { casesBrady } from './cases/casesBrady'
import { casesAcs } from './cases/casesAcs'
import { casesElectro } from './cases/casesElectro'
import { casesTox } from './cases/casesTox'
import { casesPulm } from './cases/casesPulm'
import { casesInherited } from './cases/casesInherited'
import { casesPacer } from './cases/casesPacer'
import { casesMimic } from './cases/casesMimic'
import { casesArrest } from './cases/casesArrest'

export const allCases: EcgCase[] = [
  ...casesTachy,       // 1–15
  ...casesBrady,      // 16–25
  ...casesAcs,        // 26–40
  ...casesElectro,    // 41–50
  ...casesTox,        // 51–60
  ...casesPulm,       // 61–70
  ...casesInherited,  // 71–80
  ...casesPacer,      // 81–85
  ...casesMimic,      // 86–90
  ...casesArrest      // 91–100
]

export function getCase(id: number): EcgCase | undefined {
  return allCases.find(c => c.id === id)
}

export function casesByCategory(cat: string): EcgCase[] {
  return allCases.filter(c => c.cat === cat)
}

export function randomCases(n: number, diff?: 1 | 2 | 3): EcgCase[] {
  let pool = allCases
  if (diff) pool = pool.filter(c => c.diff === diff)
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(n, shuffled.length))
}
