// ===== Widok biblioteki przypadków klinicznych =====

import { useState } from 'react'
import { allCases } from '../cases'
import { categories, catName } from '../categories'
import { EcgCase } from '../types'

export default function CaseLibrary(props: { onOpenCase: (c: EcgCase) => void }) {
  const [filterCat, setFilterCat] = useState<string>('all')
  const [search, setSearch] = useState('')

  const list = allCases.filter(c => {
    if (filterCat !== 'all' && c.cat !== filterCat) return false
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <div className="card">
        <h2>BIBLIOTEKA PRZYPADKÓW – 100 przypadków klinicznych</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className={filterCat === 'all' ? 'active' : ''} onClick={() => setFilterCat('all')}>Wszystkie (100)</button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={filterCat === cat.id ? 'active' : ''}
              onClick={() => setFilterCat(cat.id)}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <input
          type="text"
          placeholder="Szukaj po tytule..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '8px', background: '#16202b', color: '#d7e0ea', border: '1px solid #1d2a38', borderRadius: '6px' }}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Kategoria</th>
            <th>Tytuł</th>
            <th>Trudność</th>
            <th>Zagrażający życiu</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{catName(c.cat)}</td>
              <td>{c.title}</td>
              <td>{'★'.repeat(c.diff)}</td>
              <td>{c.threat ? <span className="tag threat">TAK</span> : 'nie'}</td>
              <td><button onClick={() => props.onOpenCase(c)}>Otwórz</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
