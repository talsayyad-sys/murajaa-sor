// ===== Widok szczegółów przypadku (monitor + 12-odpr. + dane kliniczne) =====

import { useState } from 'react'
import { EcgCase } from '../types'
import Ecg12Lead from './Ecg12Lead'
import PhilipsMonitor from './PhilipsMonitor'
import ZollMonitor from './ZollMonitor'
import { initState, giveDrug, PhysioState } from '../physio'
import { treatments, findTreatment } from '../treatments'
import { AlarmLimits } from '../types'

const defaultAlarms: AlarmLimits = {
  hrLow: 50, hrHigh: 120, spo2Low: 90, spo2High: 100,
  rrLow: 8, rrHigh: 30, etco2Low: 25, etco2High: 50
}

export default function CaseDetail(props: { caseData: EcgCase; onBack: () => void }) {
  const c = props.caseData
  const [state, setState] = useState<PhysioState>(() => initState(c))
  const [alarms, setAlarms] = useState<AlarmLimits>(defaultAlarms)
  const [tab, setTab] = useState<'philips' | 'zoll'>('philips')
  const [showAnswer, setShowAnswer] = useState(false)
  const [log, setLog] = useState<string[]>([])

  const drugList = treatments.filter(t =>
    // Pokaż wszystkie leki – użytkownik sam podejmuje decyzję
    true
  )

  const onDrug = (id: string) => {
    const ns = giveDrug({ ...state }, id)
    setLog(l => [...l, 'Podano: ' + (findTreatment(id)?.name ?? id)])
    setState(ns)
  }

  return (
    <div>
      <div className="topbar" style={{ marginBottom: 14 }}>
        <button onClick={props.onBack}>← Powrót do biblioteki</button>
        <span className="brand">Przypadek #{c.id}: {c.title}</span>
        {c.threat && <span className="tag threat">⚠ ZAGRAŻAJĄCY ŻYCIU</span>}
        <span className="tag">Trudność: {'★'.repeat(c.diff)}</span>
      </div>

      <div className="grid-2">
        <div>
          {tab === 'philips' ? (
            <PhilipsMonitor
              state={state}
              alarms={alarms}
              onAlarmLimitsChange={setAlarms}
              log={log}
            />
          ) : (
            <ZollMonitor
              state={state}
              caseData={c}
              onStateChange={(s) => setState(s)}
            />
          )}
          <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <button className={tab === 'philips' ? 'active' : ''} onClick={() => setTab('philips')}>Monitor wieloparametrowy (Philips)</button>
            <button className={tab === 'zoll' ? 'active' : ''} onClick={() => setTab('zoll')}>Defibrylator (ZOLL)</button>
          </div>
        </div>

        <div>
          <div className="card">
            <h2>PREZENTACJA KLINICZNA</h2>
            <p>{c.pres}</p>
            <h3>Wywiad / choroby współistniejące</h3>
            <p>{c.hist}</p>
          </div>

          <div className="card">
            <h2>WYNIKI BADAŃ</h2>
            <ul>{c.labs.map((l, i) => <li key={i}>{l}</li>)}</ul>
          </div>

          <div className="card">
            <h2>PODANIE LECZENIA</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {drugList.map(t => (
                <button key={t.id} className="option-btn" onClick={() => onDrug(t.id)}>
                  {t.name}
                  <div className="small muted">{t.dose}</div>
                </button>
              ))}
            </div>
            <div className="small muted" style={{ marginTop: 8 }}>
              Uwaga: leki oddziałują na parametry symulacji. Właściwe leczenie dla tego przypadku jest wskazane w zakładce "Odpowiedź".
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>EKG 12-ODPROWADZENIOWE</h2>
        <Ecg12Lead caseData={c} />
      </div>

      <div className="card">
        <button className="option-btn" onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? 'Ukryj pełne omówienie przypadku' : 'Pokaż pełne omówienie przypadku (odpowiedź)'}
        </button>
        {showAnswer && (
          <div className="feedback-box">
            <h2>ROZPOZNANIE: {c.dx}</h2>
            <h3>Diagnostyka różnicowa</h3>
            <ul>{c.ddx.map((d, i) => <li key={i}>{d}</li>)}</ul>
            <h3>Prawidłowe postępowanie</h3>
            <ul>{c.tx.map((t, i) => <li key={i}>{t}</li>)}</ul>
            <h3>Oczekiwana odpowiedź fizjologiczna</h3>
            <p>{c.expected}</p>
            <h3>Powikłania</h3>
            <ul>{c.compl.map((x, i) => <li key={i}>{x}</li>)}</ul>
            <h3>Wyjaśnienie edukacyjne</h3>
            <p>{c.edu}</p>
            <h3>Referencje</h3>
            <p className="small muted">{c.ref}</p>
          </div>
        )}
      </div>
    </div>
  )
}
