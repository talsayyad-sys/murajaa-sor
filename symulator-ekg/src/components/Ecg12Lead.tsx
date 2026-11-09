// ===== Widok EKG 12-odprowadzeniowego (statyczne) =====

import EcgCanvas from './EcgCanvas'
import { EcgCase } from '../types'

const LEADS: { name: string; gain: number; invert?: boolean }[] = [
  { name: 'I', gain: 1.0 },
  { name: 'II', gain: 1.0 },
  { name: 'III', gain: 1.0 },
  { name: 'aVR', gain: 0.8, invert: true },
  { name: 'aVL', gain: 0.7 },
  { name: 'aVF', gain: 1.0 },
  { name: 'V1', gain: 0.8 },
  { name: 'V2', gain: 0.9 },
  { name: 'V3', gain: 1.0 },
  { name: 'V4', gain: 1.0 },
  { name: 'V5', gain: 1.0 },
  { name: 'V6', gain: 0.9 }
]

export default function Ecg12Lead(props: { caseData: EcgCase }) {
  const c = props.caseData
  return (
    <div className="ecg12">
      <div className="lead-name" style={{ textAlign: 'right' }}>
        25 mm/s · 10 mm/mV · 12-odprowadzeniowe EKG · {c.pattern}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
        {LEADS.map(lead => {
          // Modyfikacje odprowadzeń wg lm (lead modifications) jeśli zdefiniowane
          const lm = c.lm?.[lead.name]
          const ov = { ...(c.ov ?? {}) }
          if (lm) {
            if (lm.j !== undefined) ov.j = (c.ov?.j ?? 0) * lm.j + (lm.j * 0.1)
            if (lm.tA !== undefined) ov.tA = (c.ov?.tA ?? 0.3) * lm.tA
            if (lm.flip) { ov.rA = -(c.ov?.rA ?? 1.1); ov.sA = (c.ov?.sA ?? 0.25) }
            if (lm.sMul) ov.sA = (c.ov?.sA ?? 0.25) * lm.sMul
            if (lm.rMul) ov.rA = (c.ov?.rA ?? 1.1) * lm.rMul
          }
          if (lead.invert) {
            ov.rA = -(ov.rA ?? 1.1)
            ov.pA = -(ov.pA ?? 0.15)
          }
          return (
            <div key={lead.name} style={{ background: '#fff' }}>
              <div className="lead-name">{lead.name}</div>
              <div style={{ height: '70px', border: '1px solid #eee' }}>
                <EcgCanvas
                  rhythmId={c.pattern}
                  hr={c.rate ?? c.vit.hr || 60}
                  ov={ov}
                  color="#000"
                  amplitude={2.8 * lead.gain}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
