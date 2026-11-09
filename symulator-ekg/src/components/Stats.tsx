// ===== Widok statystyk osobistych =====

import { loadResults, clearResults, PerfStats, computeStats } from '../storage'

export default function Stats(props: { onRefresh: () => void }) {
  const results = loadResults()
  const stats: PerfStats = computeStats()

  return (
    <div>
      <div className="card">
        <h2>STATYSTYKI OSOBISTE</h2>
        <p>Ukończone egzaminy: <b>{stats.n}</b></p>
        <p>Średni wynik: <b>{stats.avgScore}%</b></p>
        <p>Najlepszy wynik: <b>{stats.bestScore}%</b></p>
      </div>

      <div className="card">
        <h2>HISTORIA EGZAMINÓW</h2>
        {results.length === 0 ? (
          <p className="muted">Brak zapisanych wyników. Rozpocznij egzamin, aby zobaczyć statystyki.</p>
        ) : (
          <table>
            <thead>
              <tr><th>Data</th><th>Pytań</th><th>Trudność</th><th>Wynik</th></tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td>{r.date}</td>
                  <td>{r.n}</td>
                  <td>{r.difficulty}</td>
                  <td className={r.score >= 70 ? 'score-good' : r.score >= 50 ? 'score-mid' : 'score-low'}>
                    {r.score}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <h2>ZARZĄDZANIE DANYMI</h2>
        <p className="small muted">
          Wyniki przechowywane są lokalnie w przeglądarce (localStorage). Czyszczenie danych przeglądarki usuwa historię.
        </p>
        <button
          onClick={() => { if (confirm('Usunąć wszystkie wyniki?')) { clearResults(); props.onRefresh() } }}
          style={{ background: '#3d0d0d', color: '#ff8a8a', border: '1px solid #ff4a4a' }}
        >
          Usuń wszystkie wyniki
        </button>
      </div>
    </div>
  )
}
