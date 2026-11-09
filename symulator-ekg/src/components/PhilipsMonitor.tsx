// ===== Monitor 1: tryb inspirowany Philips IntelliVue =====
// Oryginalny interfejs inspirowany klinicznym przepływem pracy monitora pacjenta.

import { useEffect, useState, useRef } from 'react'
import EcgCanvas from './EcgCanvas'
import { PhysioState } from '../physio'
import { AlarmLimits } from '../types'

interface PhilipsProps {
  state: PhysioState
  alarms: AlarmLimits
  onAlarmLimitsChange: (a: AlarmLimits) => void
  log: string[]
}

export default function PhilipsMonitor(props: PhilipsProps) {
  const s = props.state
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const hrAlarm = s.hr < props.alarms.hrLow || s.hr > props.alarms.hrHigh
  const spo2Alarm = s.spo2 < props.alarms.spo2Low
  const rrAlarm = s.rr < props.alarms.rrLow || s.rr > props.alarms.rrHigh
  const etco2Alarm = s.etco2 < props.alarms.etco2Low || s.etco2 > props.alarms.etco2High
  const anyAlarm = hrAlarm || spo2Alarm || rrAlarm || etco2Alarm

  const hrText = s.hr === 0 ? '--' : String(Math.round(s.hr))
  const bpText = s.sbp === 0 ? '--/--' : `${Math.round(s.sbp)}/${Math.round(s.dbp)}`

  return (
    <div className="monitor">
      <div className="monitor-header">
        <span>MONITOR PACJENTA – tryb wieloparametrowy</span>
        <span>{now.toLocaleTimeString('pl-PL')}</span>
      </div>

      {anyAlarm && (
        <div className={'alarm-banner' + (hrAlarm ? '' : ' alarm-yellow')}>
          <span>
            {hrAlarm && '⚠ TĘTNO POZA ZAKRESEM '}
            {spo2Alarm && '⚠ SpO2 NISKIE '}
            {rrAlarm && '⚠ ODDECH POZA ZAKRESEM '}
            {etco2Alarm && '⚠ EtCO2 POZA ZAKRESEM'}
          </span>
          <span>🔊 ALARM</span>
        </div>
      )}

      <div className="wave-grid">
        <div className="wave-row">
          <div className="wave-label"><b>II</b> EKG 1,0 mV</div>
          <div className="wave-canvas-wrap">
            <EcgCanvas rhythmId={s.rhythmId} hr={s.hr || 60} color="#00e07f" amplitude={2.5} />
          </div>
        </div>
        <div className="wave-row">
          <div className="wave-label"><b>PLETH</b> SpO2</div>
          <div className="wave-canvas-wrap">
            <PlethCanvas hr={s.hr} spo2={s.spo2} />
          </div>
        </div>
        <div className="wave-row">
          <div className="wave-label"><b>ART</b> Ciśnienie</div>
          <div className="wave-canvas-wrap">
            <ArtCanvas hr={s.hr} sbp={s.sbp} dbp={s.dbp} />
          </div>
        </div>
        <div className="wave-row">
          <div className="wave-label"><b>RESP</b> Oddech</div>
          <div className="wave-canvas-wrap">
            <RespCanvas rr={s.rr} />
          </div>
        </div>
        <div className="wave-row">
          <div className="wave-label"><b>EtCO2</b> Kapnografia</div>
          <div className="wave-canvas-wrap">
            <CapnoCanvas rr={s.rr} etco2={s.etco2} />
          </div>
        </div>
      </div>

      <div className="nums-row">
        <div className="num-box">
          <div className="num-label">HR [HR] (bpm)</div>
          <div className="num-value hr-col">{hrText}</div>
        </div>
        <div className="num-box">
          <div className="num-label">SpO2 (%)</div>
          <div className="num-value spo2-col">{s.spo2 === 0 ? '--' : Math.round(s.spo2)}</div>
        </div>
        <div className="num-box">
          <div className="num-label">NIBP (mmHg)</div>
          <div className="num-value nibp-col">{bpText}</div>
          <div className="num-unit">mmHg</div>
        </div>
        <div className="num-box">
          <div className="num-label">RR (oddechy/min)</div>
          <div className="num-value resp-col">{s.rr === 0 ? '--' : Math.round(s.rr)}</div>
        </div>
        <div className="num-box">
          <div className="num-label">EtCO2 (mmHg)</div>
          <div className="num-value etco2-col">{s.etco2 === 0 ? '--' : Math.round(s.etco2)}</div>
        </div>
        <div className="num-box">
          <div className="num-label">Temp. (°C)</div>
          <div className="num-value temp-col">{s.temp.toFixed(1)}</div>
        </div>
        <div className="num-box">
          <div className="num-label">GCS</div>
          <div className="num-value">{s.gcs}</div>
        </div>
      </div>

      <div className="alarm-limits" style={{ padding: '10px 14px', borderTop: '1px solid #131b26' }}>
        <span className="muted small">Limity alarmów: </span>
        <button className="small" onClick={() => props.onAlarmLimitsChange({ ...props.alarms, hrLow: props.alarms.hrLow - 5 })}>HR−</button>
        <span className="small">{props.alarms.hrLow}–{props.alarms.hrHigh}</span>
        <button className="small" onClick={() => props.onAlarmLimitsChange({ ...props.alarms, hrHigh: props.alarms.hrHigh + 5 })}>HR+</button>
        {' | '}
        <button className="small" onClick={() => props.onAlarmLimitsChange({ ...props.alarms, spo2Low: Math.max(50, props.alarms.spo2Low - 2) })}>SpO2−</button>
        <span className="small">SpO2 > {props.alarms.spo2Low}%</span>
      </div>

      {props.log.length > 0 && (
        <div style={{ padding: '8px 14px', borderTop: '1px solid #131b26' }}>
          <div className="muted small">Dziennik zdarzeń:</div>
          {props.log.slice(-5).map((l, i) => <div key={i} className="small" style={{ color: '#9ab' }}>{l}</div>)}
        </div>
      )}
    </div>
  )
}

// ===== Plethysmografia SpO2 =====
function PlethCanvas(props: { hr: number; spo2: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    let raf = 0, t = 0
    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const w = c.clientWidth, h = c.clientHeight
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h)
      ctx.strokeStyle = '#35d6ff'; ctx.lineWidth = 1.8
      ctx.beginPath()
      const period = 60000 / Math.max(props.hr, 20) // ms
      for (let x = 0; x < w; x++) {
        const phase = ((t + x * 10) % period) / period
        // Krzywa pleth: szybki skok + powolny upadek (fala tętna)
        let v = Math.exp(-phase * 5) * Math.sin(phase * Math.PI)
        const y = h * 0.85 - v * h * 0.6
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      ctx.stroke()
      t += 16
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [props.hr, props.spo2])
  return <canvas ref={ref} className="wave-canvas" />
}

// ===== Ciśnienie tętnicze (inwazyjne) =====
function ArtCanvas(props: { hr: number; sbp: number; dbp: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    let raf = 0, t = 0
    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const w = c.clientWidth, h = c.clientHeight
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h)
      ctx.strokeStyle = '#ff9c40'; ctx.lineWidth = 1.8
      ctx.beginPath()
      const period = 60000 / Math.max(props.hr, 20)
      for (let x = 0; x < w; x++) {
        const phase = ((t + x * 10) % period) / period
        // Krzywa tętna: skurcz + dykrot
        let v = 0
        if (phase < 0.35) v = Math.sin((phase / 0.35) * Math.PI)
        else v = 0.12 * Math.sin(((phase - 0.35) / 0.65) * Math.PI)
        const y = h * 0.88 - v * h * 0.7
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      ctx.stroke()
      t += 16
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [props.hr, props.sbp, props.dbp])
  return <canvas ref={ref} className="wave-canvas" />
}

// ===== Oddech =====
function RespCanvas(props: { rr: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    let raf = 0, t = 0
    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const w = c.clientWidth, h = c.clientHeight
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h)
      ctx.strokeStyle = '#ffd83d'; ctx.lineWidth = 1.8
      ctx.beginPath()
      const period = 60000 / Math.max(props.rr, 2)
      for (let x = 0; x < w; x++) {
        const phase = ((t + x * 10) % period) / period
        const v = Math.sin(phase * Math.PI) * (phase < 0.5 ? 1 : 0.8)
        const y = h * 0.7 - v * h * 0.4
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      ctx.stroke()
      t += 16
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [props.rr])
  return <canvas ref={ref} className="wave-canvas" />
}

// ===== Kapnografia =====
function CapnoCanvas(props: { rr: number; etco2: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    let raf = 0, t = 0
    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const w = c.clientWidth, h = c.clientHeight
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h)
      ctx.strokeStyle = '#b28dff'; ctx.lineWidth = 1.8
      ctx.beginPath()
      const period = 60000 / Math.max(props.rr, 2)
      for (let x = 0; x < w; x++) {
        const phase = ((t + x * 10) % period) / period
        // Kapnogram: plateau + szybki spadek (inhalacja)
        let v = 0
        if (phase < 0.1) v = (phase / 0.1) * props.etco2 / 50
        else if (phase < 0.6) v = props.etco2 / 50
        else if (phase < 0.75) v = ((0.75 - phase) / 0.15) * props.etco2 / 50
        const y = h * 0.92 - v * h * 0.75
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      ctx.stroke()
      t += 16
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [props.rr, props.etco2])
  return <canvas ref={ref} className="wave-canvas" />
}
