// ===== Główny komponent aplikacji =====

import { useState } from 'react'
import CaseLibrary from './components/CaseLibrary'
import CaseDetail from './components/CaseDetail'
import Exam from './components/Exam'
import Stats from './components/Stats'
import { EcgCase } from './types'

type Tab = 'biblioteka' | 'egzamin' | 'statystyki' | 'o-programie'

export default function App() {
  const [tab, setTab] = useState<Tab>('biblioteka')
  const [openCase, setOpenCase] = useState<EcgCase | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="app-root">
      <div className="topbar">
        <span className="brand">SYMULATOR EKG – MEDYCYNA RATUNKOWA</span>
        <button className={tab === 'biblioteka' && !openCase ? 'active' : ''} onClick={() => { setTab('biblioteka'); setOpenCase(null) }}>Biblioteka przypadków</button>
        <button className={tab === 'egzamin' ? 'active' : ''} onClick={() => { setTab('egzamin'); setOpenCase(null) }}>Egzamin specjalizacyjny</button>
        <button className={tab === 'statystyki' ? 'active' : ''} onClick={() => { setTab('statystyki'); setOpenCase(null) }}>Statystyki</button>
        <button className={tab === 'o-programie' ? 'active' : ''} onClick={() => { setTab('o-programie'); setOpenCase(null) }}>O programie</button>
      </div>

      <div className="main-content">
        {tab === 'biblioteka' && !openCase && (
          <CaseLibrary onOpenCase={(c) => setOpenCase(c)} />
        )}
        {tab === 'biblioteka' && openCase && (
          <CaseDetail caseData={openCase} onBack={() => setOpenCase(null)} />
        )}
        {tab === 'egzamin' && (
          <Exam onFinish={() => setTab('statystyki')} />
        )}
        {tab === 'statystyki' && (
          <Stats key={refreshKey} onRefresh={() => setRefreshKey(k => k + 1)} />
        )}
        {tab === 'o-programie' && <About />}
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="card">
      <h2>O PROGRAMIE</h2>
      <p>
        Dydaktyczny symulator EKG i monitorowania pacjenta dla lekarzy medycyny ratunkowej.
        Aplikacja zawiera 100 przypadków klinicznych w 10 kategoriach, symulację monitora
        wieloparametrowego (inspirowanego przepływem pracy monitorów typu IntelliVue)
        oraz defibrylatora/resuscytatora (inspirowanego przepływem pracy typu R Series),
        a także tryb egzaminu specjalizacyjnego.
      </p>
      <p>
        <b>Interfejsy są oryginalnymi projektami inspirowanymi klinicznymi przepływami pracy –
        nie wykorzystują materiałów firmowych żadnego producenta.</b>
      </p>
      <h3>Zastrzeżenia</h3>
      <p className="small muted">
        Symulator ma wyłącznie cele edukacyjne. Wykorzystywane dane kliniczne są fikcyjne i
        wygenerowane do celów dydaktycznych. Symulator nie zastępuje profesjonalnej oceny medycznej,
        wytycznych ERC/ESC/PTEiKCh ani decyzji klinicznych u prawdziwych pacjentów.
      </p>
      <h3>Referencje kliniczne</h3>
      <ul className="small">
        <li>ERC Guidelines 2021 (ALS, BLS, Toksykologia, Hipotermia, Pediatric)</li>
        <li>ESC Guidelines: ACS 2023, NSTEMI, PE 2019, AF 2020, HCM 2023, Inherited Arrhythmias, Pacing</li>
        <li>AHA/ERC: defibrylacja, TTM, Torsades de pointes</li>
        <li>Surviving Sepsis Campaign 2021</li>
        <li>GOLD 2023 (POChP), ATS/IDSA 2019 (zapalenie płuc)</li>
        <li>ATLS 10 (trauma)</li>
      </ul>
    </div>
  )
}
