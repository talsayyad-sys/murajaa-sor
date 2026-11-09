// ===== Typy domeny: przypadek kliniczny, badanie, monitor =====

export interface Vitals {
  hr: number
  bp: string
  sbp: number
  dbp: number
  spo2: number
  rr: number
  temp: number
  etco2: number
  gcs: number
}

export interface ShapeOv {
  pA?: number; pW?: number; pr?: number
  qA?: number; qW?: number
  rA?: number; rW?: number
  sA?: number; sW?: number
  j?: number
  tA?: number; tW?: number; tC?: number
  uA?: number
  qt?: number
}

export interface LeadMod { j?: number; tA?: number; flip?: boolean; sMul?: number; rMul?: number }

export interface EcgCase {
  id: number
  cat: string
  title: string
  diff: 1 | 2 | 3
  pres: string
  hist: string
  labs: string[]
  vit: Vitals
  ddx: string[]
  dx: string
  tx: string[]
  txIds: string[]
  contra?: string[]
  expected: string
  compl: string[]
  edu: string
  ref: string
  pattern: string
  rate?: number
  ov?: ShapeOv
  lm?: Record<string, LeadMod>
  threat: boolean
  shock?: number
  adeno?: boolean
  paceThr?: number
}

export interface Treatment {
  id: string
  name: string
  dose: string
  contra: string
}

export interface Category {
  id: string
  name: string
  count: number
}

export interface ExamAnswer {
  caseId: number
  dxOk: boolean
  txOk: boolean
  threatOk: boolean
  threatGiven: boolean
  timeSec: number
}

export interface ExamResult {
  id: string
  date: string
  n: number
  score: number
  difficulty: string
  perQ: ExamAnswer[]
}

export interface AlarmLimits {
  hrLow: number
  hrHigh: number
  spo2Low: number
  spo2High: number
  rrLow: number
  rrHigh: number
  etco2Low: number
  etco2High: number
}
