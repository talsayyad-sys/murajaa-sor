// ===== Komponent: kanwa fali EKG (rysowanie w czasie rzeczywistym) =====

import { useEffect, useRef } from 'react'
import { ecgBuffer } from '../engine'

interface EcgCanvasProps {
  rhythmId: string
  hr: number
  ov?: any
  color?: string
  amplitude?: number  // mV na pełną wysokość
  speed?: number      // px na sekundę
  paused?: boolean
}

export default function EcgCanvas(props: EcgCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posRef = useRef(0)
  const bufRef = useRef<number[]>([])
  const rafRef = useRef<number>()

  useEffect(() => {
    bufRef.current = ecgBuffer(props.rhythmId, props.hr, props.ov)
  }, [props.rhythmId, props.hr, props.ov])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let cancelled = false

    const draw = () => {
      if (cancelled) return
      const dpr = window.devicePixelRatio || 1
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Tło
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)

      // Siatka
      ctx.strokeStyle = 'rgba(60, 90, 130, 0.25)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      const buf = bufRef.current
      if (!buf || buf.length === 0) { rafRef.current = requestAnimationFrame(draw); return }

      const color = props.color ?? '#00e07f'
      const amp = props.amplitude ?? 1.5 // mV na pełną wysokość (przypadek: R~1.1mV)
      const mid = h / 2
      const mvMax = amp / 2

      // Szybkość przewijania: 25 mm/s => 1 mm = 4 px => 100 px/s
      const pxPerSec = props.speed ?? 100
      // buf: 1 punkt = 2 ms => 500 punktów/s
      const pointsPerFrame = Math.round(pxPerSec / 60 * 0.5) // 60 FPS
      const stepX = w / (pxPerSec * (w / pxPerSec)) // = 1 px

      ctx.strokeStyle = color
      ctx.lineWidth = 1.6
      ctx.lineJoin = 'round'
      ctx.beginPath()

      // Rysuj widoczny obszar od bufora z przesunięciem pozycji
      const visiblePts = Math.round((w / pxPerSec) * 500)
      const startIdx = posRef.current
      for (let i = 0; i < visiblePts; i++) {
        const idx = (startIdx + i) % buf.length
        const v = buf[idx]
        const x = (i / visiblePts) * w
        const y = mid - (v / mvMax) * (h / 2)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Przesuń pozycję (przewijanie)
      if (!props.paused) {
        posRef.current = (posRef.current + pointsPerFrame) % buf.length
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => { cancelled = true; if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [props.color, props.amplitude, props.speed, props.paused])

  return <canvas ref={canvasRef} className="wave-canvas" />
}
