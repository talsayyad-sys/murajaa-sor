// ===== EGZAMIN SPECJALIZACYJNY – MEDYCYNA RATUNKOWA =====
// Tryb egzaminu: losowe przypadki, limit czasu, pytania DX/TX/threat, punktacja.

import { useEffect, useState, useRef } from 'react'
import { EcgCase, ExamAnswer, ExamResult } from '../types'
import Ecg12Lead from './Ecg12Lead'
import { allCases, randomCases } from '../cases'
import { treatments } from '../treatments'
import { saveExamResult } from '../storage'
import { catName } from '../categories'

interface Props {
  onFinish: () => void
}

type Stage = 'setup' | 'question' | 'feedback' | 'summary'

export default function Exam(props: Props) {
  const [stage, setStage] = useState<Stage>('setup')
  const [nQuestions, setNQuestions] = useState(10)
  const [difficulty, setDifficulty] = useState<'all' | 1 | 2 | 3>('all')
  const [timeLimit, setTimeLimit] = useState(90) // sekund na pytanie
  const [questions, setQuestions] = useState<EcgCase[]>([])
  const [qIndex, setQIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(90)
  const [answers, setAnswers] = useState<ExamAnswer[]>([])
  const [dxChoice, setDxChoice] = useState<number | null>(null)
  const [txChoice, setTxChoice] = useState<number | null>(null)
  const [threatChoice, setThreatChoice] = useState<boolean | null>(null)
  const timerRef = useRef<any>(null)

  const current = questions[qIndex]

  // Przygotowanie pytań DX: poprawne + losowe błędne rozpoznania z innych przypadków
  function buildDxOptions(c: EcgCase): string[] {
    const wrong = allCases
      .filter(x => x.id !== c.id && x.dx !== c.dx)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(x => x.dx)
    const opts = [c.dx, ...wrong]
    return opts.sort(() => Math.random() - 0.5)
  }

  // Opcje leczenia: poprawne txIds[0] + 3 losowe leki z banku
  function buildTxOptions(c: EcgCase): string[] {
    const correctId = c.txIds[0]
    const wrong = treatments
      .filter(t => t.id !== correctId && !c.txIds.includes(t.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(t => t.id)
    const opts = [correctId, ...wrong]
    return opts.sort(() => Math.random() - 0.5)
  }

  const startExam = () => {
    const qs = randomCases(nQuestions, difficulty === 'all' ? undefined : (difficulty as 1 | 2 | 3))
    setQuestions(qs)
    setQIndex(0)
    setAnswers([])
    setTimeLeft(timeLimit)
    setDxChoice(null); setTxChoice(null); setThreatChoice(null)
    setStage('question')
  }

  // Timer
  useEffect(() => {
    if (stage !== 'question') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          // Automatyczne przejście przy czasie 0
          submitAnswer(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [stage, qIndex])

  const submitAnswer = (timeout = false) => {
    if (!current) return
    clearInterval(timerRef.current)
    const dxOk = timeout ? false : dxChoice !== null && buildDxOptions(current)[dxChoice] === current.dx
    // Uwaga: opcje generowane raz przy renderze (przechowujmy w stanie)
    const a: ExamAnswer = {
      caseId: current.id,
      dxOk,
      txOk: txChoice !== null && current.txIds.includes(txChoice),
      threatOk: threatChoice === current.threat,
      threatGiven: threatChoice !== null,
      timeSec: timeLimit - timeLeft
    }
    setAnswers(prev => [...prev, a])
    setStage('feedback')
  }

  const nextQuestion = () => {
    if (qIndex + 1 >= questions.length) {
      // Podsumowanie
      const score = Math.round((answers.reduce((sum, a) => {
        const pts = (a.dxOk ? 40 : 0) + (a.txOk ? 30 : 0) + (a.threatOk ? 30 : 0)
        return sum + pts
      }, 0) / (questions.length * 100)) * 100)
      const res: ExamResult = {
        id: Date.now().toString(),
        date: new Date().toLocaleString('pl-PL'),
        n: questions.length,
        score,
        difficulty: String(difficulty),
        perQ: answers
      }
      saveExamResult(res)
      setStage('summary')
    } else {
      setQIndex(i => i + 1)
      setTimeLeft(timeLimit)
      setDxChoice(null); setTxChoice(null); setThreatChoice(null)
      setStage('question')
    }
  }

  // ===== Setup =====
  if (stage === 'setup') {
    return (
      <div className="card">
        <h2>EGZAMIN SPECJALIZACYJNY – MEDYCYNA RATUNKOWA</h2>
        <p>Ocena: interpretacja EKG, rozpoznawanie stanów zagrażających życiu, diagnostyka różnicowa, leczenie stanów nagłych, przeciwwskazania, priorytety kliniczne.</p>
        <div style={{ display: 'grid', gap: 10, maxWidth: 480 }}>
          <label>Liczba pytań:
            <select value={nQuestions} onChange={e => setNQuestions(Number(e.target.value))}>
              <option value={5}>5</option><option value={10}>10</option>
              <option value={20}>20</option><option value={30}>30</option>
            </select>
          </label>
          <label>Poziom trudności:
            <select value={difficulty} onChange={e => setDifficulty(e.target.value as any)}>
              <option value="all">Wszystkie</option>
              <option value={1}>★ Podstawowy</option>
              <option value={2}>★★ Średni</option>
              <option value={3}>★★★ Zaawansowany</option>
            </select>
          </label>
          <label>Czas na pytanie:
            <select value={timeLimit} onChange={e => setTimeLimit(Number(e.target.value))}>
              <option value={60}>60 sekund</option>
              <option value={90}>90 sekund</option>
              <option value={120}>120 sekund</option>
              <option value={180}>180 sekund</option>
            </select>
          </label>
          <button onClick={startExam}>ROZPOCZNIJ EGZAMIN</button>
        </div>
      </div>
    )
  }

  // ===== Pytanie =====
  if (stage === 'question' && current) {
    const dxOptions = buildDxOptions(current)
    const txOptions = buildTxOptions(current)
    return (
      <div>
        <div className="topbar">
          <span className="brand">Pytanie {qIndex + 1} / {questions.length}</span>
          <span className="exam-timer">⏱ {timeLeft}s</span>
          <span className="tag">{catName(current.cat)}</span>
        </div>

        <div className="grid-2">
          <div>
            <div className="card">
              <h2>EKG 12-ODPROWADZENIOWE</h2>
              <Ecg12Lead caseData={current} />
            </div>
          </div>
          <div>
            <div className="card">
              <h2>PRZYPADEK</h2>
              <p>{current.pres}</p>
              <p className="small muted">{current.hist}</p>
              <ul>{current.labs.map((l, i) => <li key={i} className="small">{l}</li>)}</ul>
            </div>

            <div className="card">
              <h2>1. ROZPOZNANIE</h2>
              {dxOptions.map((d, i) => (
                <button key={i}
                  className={'option-btn' + (dxChoice === i ? ' correct' : '')}
                  onClick={() => setDxChoice(i)}
                >{d}</button>
              ))}
            </div>

            <div className="card">
              <h2>2. CZY STAN ZAGRAŻA ŻYCIU?</h2>
              <button className={'option-btn' + (threatChoice === true ? ' correct' : '')} onClick={() => setThreatChoice(true)}>TAK – natychmiastowe postępowanie ratujące życie</button>
              <button className={'option-btn' + (threatChoice === false ? ' correct' : '')} onClick={() => setThreatChoice(false)}>NIE – postępowanie planowe</button>
            </div>

            <div className="card">
              <h2>3. LECZENIE (pierwsza interwencja)</h2>
              {txOptions.map((t, i) => {
                const tr = treatments.find(x => x.id === t)
                return (
                  <button key={i}
                    className={'option-btn' + (txChoice === t ? ' correct' : '')}
                    onClick={() => setTxChoice(t)}
                  >
                    {tr?.name ?? t}
                    <div className="small muted">{tr?.dose}</div>
                  </button>
                )
              })}
            </div>

            <button onClick={() => submitAnswer(false)}>ZATWIERDŹ ODPOWIEDŹ</button>
          </div>
        </div>
      </div>
    )
  }

  // ===== Feedback =====
  if (stage === 'feedback' && current) {
    const a = answers[answers.length - 1]
    return (
      <div>
        <div className="card">
          <h2>ODPOWIEDŹ – Przypadek #{current.id}: {current.title}</h2>
          <div className="feedback-box">
            <p>{a?.dxOk ? '✔' : '✘'} Rozpoznanie: {current.dx}</p>
            <p>{a?.threatOk ? '✔' : '✘'} Stan zagrażający życiu: {current.threat ? 'TAK' : 'NIE'}</p>
            <p>{a?.txOk ? '✔' : '✘'} Prawidłowe leczenie: {current.tx.join('; ')}</p>
            <h3>Oczekiwana odpowiedź</h3>
            <p>{current.expected}</p>
            <h3>Wyjaśnienie</h3>
            <p>{current.edu}</p>
            <p className="small muted">{current.ref}</p>
          </div>
          <button onClick={nextQuestion} style={{ marginTop: 12 }}>NASTĘPNE PYTANIE →</button>
        </div>
      </div>
    )
  }

  // ===== Podsumowanie =====
  if (stage === 'summary') {
    const nCorrect = answers.filter(a => a.dxOk && a.txOk && a.threatOk).length
    const score = Math.round((answers.reduce((sum, a) =>
      sum + (a.dxOk ? 40 : 0) + (a.txOk ? 30 : 0) + (a.threatOk ? 30 : 0), 0) / (questions.length * 100)) * 100)
    return (
      <div className="card">
        <h2>WYNIKI EGZAMINU</h2>
        <div className={'score-badge ' + (score >= 70 ? 'score-good' : score >= 50 ? 'score-mid' : 'score-low')}>
          Wynik: {score}%
        </div>
        <p>Pytań: {questions.length} · Pełne odpowiedzi (DX+TX+threat): {nCorrect}</p>
        <table>
          <thead><tr><th>#</th><th>Przypadek</th><th>DX</th><th>Leczenie</th><th>Zagrożenie</th><th>Czas</th></tr></thead>
          <tbody>
            {answers.map((a, i) => {
              const c = allCases.find(x => x.id === a.caseId)
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{c?.title ?? a.caseId}</td>
                  <td>{a.dxOk ? '✔' : '✘'}</td>
                  <td>{a.txOk ? '✔' : '✘'}</td>
                  <td>{a.threatOk ? '✔' : '✘'}</td>
                  <td>{a.timeSec}s</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="small muted">Wynik zapisany lokalnie w przeglądarce (statystyki w zakładce "Statystyki").</p>
        <button onClick={props.onFinish}>ZAKOŃCZ EGZAMIN</button>
      </div>
    )
  }

  return null
}
