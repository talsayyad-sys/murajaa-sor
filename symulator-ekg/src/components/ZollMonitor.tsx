// ===== Monitor 2: tryb inspirowany ZOLL R Series =====
// Oryginalny interfejs defibrylatora/resuscytatora – przepływ kliniczny.

import { useEffect, useRef, useState } from 'react'
import EcgCanvas from './EcgCanvas'
import { PhysioState, defib, cardiovert, pace, cpr } from '../physio'
import { EcgCase } from '../types'

interface ZollProps {
  state: PhysioState
  caseData: EcgCase
  onStateChange: (s: PhysioState) => void
}

type Mode = 'MONITOR' | 'DEFIB' | 'SYNC' | 'PACE'

export default function ZollMonitor(props: ZollProps) {
  const s = props.state
  const [mode, setMode] = useState<Mode>('MONITOR')
  const [energy, setEnergy] = useState(150)
  const [charged, setCharged] = useState(false)
  const [paceMa, setPaceMa] = useState(50)
  const [cprRate, setCprRate] = useState(0)
  const [lastMsg, setLastMsg] = useState<string>('')
  const logRef = useRef<string[]>([])

  const setS = (ns: PhysioState, msg: string) => {
    logRef.current.push(msg)
    setLastMsg(msg)
    props.onStateChange(ns)
  }

  const doCharge = () => {
    setCharged(true)
    setLastMsg('ŁADOWANIE... ' + energy + ' J gotowe do wyładowania')
  }

  const doShock = () => {
    if (!charged) { setLastMsg('⚠ Najpierw naładuj urządzenie (ŁADUJ)'); return }
    setCharged(false)
    if (mode === 'SYNC') {
      const { state: ns, success } = cardiovert(s, props.caseData, energy)
      setS(ns, success ? '✔ KARDIOWERSJA ' + energy + ' J – rytm zatokowy!' : '✘ Kardiowersja nieskuteczna')
    } else {
      const { state: ns, success } = defib(s, props.caseData, energy)
      setS(ns, success ? '✔ DEFIBRYLACJA ' + energy + ' J – powrót rytmu!' : '✘ Wyładowanie bez efektu – kontynuuj RKO')
    }
  }

  const doPace = () => {
    const { state: ns, captured } = pace(s, props.caseData, paceMa)
    setS(ns, captured ? '✔ Wychwyt stymulacji przy ' + paceMa + ' mA' : '✘ Brak wychwytu – zwiększ amperaż')
  }

  const toggleCpr = () => {
    const ns = cpr({ ...s }, true)
    ns.cprActive = !s.cprActive
    if (!ns.cprActive) { ns.sbp = Math.max(ns.sbp - 20, 0) }
    setS(ns, ns.cprActive ? 'RKO aktywne – uciśnięcia 100–120/min' : 'RKO zatrzymane')
  }

  return (
    <div className="zoll">
      <div className="zoll-header">
        <span>DEFIBRYLATOR / RESUSCYTATOR – tryb {mode}</span>
        <span>⚡ {charged ? 'NAŁADOWANE: ' + energy + ' J' : 'GOTOWOŚĆ'}</span>
      </div>

      <div className="wave-grid">
        <div className="wave-row">
          <div className="wave-label"><b>II</b> EKG</div>
          <div className="wave-canvas-wrap" style={{ height: '140px' }}>
            <EcgCanvas rhythmId={s.rhythmId} hr={s.hr || 60} color="#00e07f" amplitude={2.5} />
          </div>
        </div>
      </div>

      <div className="nums-row">
        <div className="num-box">
          <div className="num-label">HR</div>
          <div className="num-value hr-col">{s.hr === 0 ? '--' : Math.round(s.hr)}</div>
        </div>
        <div className="num-box">
          <div className="num-label">SpO2</div>
          <div className="num-value spo2-col">{s.spo2 === 0 ? '--' : Math.round(s.spo2)}</div>
        </div>
        <div className="num-box">
          <div className="num-label">NIBP</div>
          <div className="num-value nibp-col">{s.sbp === 0 ? '--/--' : `${Math.round(s.sbp)}/${Math.round(s.dbp)}`}</div>
        </div>
      </div>

      <div className="energy-display">
        {energy} J {mode === 'SYNC' ? '(SYNCHRONIZACJA WŁ.)' : ''}
      </div>

      <div className="zoll-controls">
        <button className="zoll-btn" onClick={() => setMode('MONITOR')}>MONITOR</button>
        <button className="zoll-btn sync" onClick={() => { setMode('SYNC'); setEnergy(120); setCharged(false) }}>KARDIOWERSJA (SYNC)</button>
        <button className="zoll-btn" onClick={() => { setMode('DEFIB'); setEnergy(150); setCharged(false) }}>DEFIBRYLACJA</button>
        <button className="zoll-btn pace" onClick={() => setMode('PACE')}>STYMULACJA (PACE)</button>

        <button className="zoll-btn" onClick={() => setEnergy(Math.max(70, energy - 50))}>ENERGIA −50 J</button>
        <button className="zoll-btn" onClick={() => setEnergy(Math.min(360, energy + 50))}>ENERGIA +50 J</button>

        <button className="zoll-btn charge" onClick={doCharge}>⚡ ŁADUJ</button>
        <button className="zoll-btn shock" onClick={doShock} disabled={!charged}>WYŁADOWANIE</button>

        {mode === 'PACE' && (
          <>
            <button className="zoll-btn" onClick={() => setPaceMa(Math.max(10, paceMa - 10))}>mA −10</button>
            <button className="zoll-btn" onClick={() => setPaceMa(Math.min(200, paceMa + 10))}>mA +10</button>
            <button className="zoll-btn pace" onClick={doPace}>STYMULUJ ({paceMa} mA)</button>
          </>
        )}

        <button className="zoll-btn" onClick={toggleCpr}>
          {s.cprActive ? '⏹ STOP RKO' : '▶ RKO (CPR)'}
        </button>
      </div>

      {/* Informacja zwrotna CPR */}
      {s.cprActive && (
        <div style={{ padding: '0 14px 12px' }}>
          <div className="small muted">Tempo uciśnięć: {cprRate || 110}/min</div>
          <div className="cpr-bar">
            <div className="cpr-fill" style={{ width: Math.min(100, Math.round((cprRate || 110) / 120 * 100)) + '%' }} />
          </div>
          <div className="small muted">Cel: 100–120/min, głębokość 5–6 cm</div>
        </div>
      )}

      {lastMsg && (
        <div style={{ padding: '10px 14px', borderTop: '1px solid #333', color: '#ffd83d', fontWeight: 600 }}>
          {lastMsg}
        </div>
      )}

      {logRef.current.length > 0 && (
        <div style={{ padding: '0 14px 12px' }}>
          <div className="small muted">Dziennik:</div>
          {logRef.current.slice(-6).map((l, i) => (
            <div key={i} className="small" style={{ color: '#9ab' }}>{l}</div>
          ))}
        </div>
      )}
    </div>
  )
}
