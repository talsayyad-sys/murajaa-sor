// ===== Skrypt weryfikacyjny: sprawdza spójność biblioteki 100 przypadków =====
// Uruchomienie: npm run verify  (lub node scripts/verify.mjs)
// Skrypt parsuje pliki przypadków jako zwykły tekst (bez importu TS),
// weryfikując liczbę przypadków w każdej kategorii i unikalność ID.

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const CASES_DIR = join(process.cwd(), 'src', 'cases')

const expected = {
  casesTachy: 15,
  casesBrady: 10,
  casesAcs: 15,
  casesElectro: 10,
  casesTox: 10,
  casesPulm: 10,
  casesInherited: 10,
  casesPacer: 5,
  casesMimic: 5,
  casesArrest: 10
}

let ok = true
const ids = new Set()

try {
  const files = readdirSync(CASES_DIR).filter(f => f.startsWith('cases') && f.endsWith('.ts'))
  if (files.length !== 10) {
    console.error('✘ Oczekiwano 10 plików przypadków, znaleziono:', files.length)
    ok = false
  }

  for (const f of files) {
    const content = readFileSync(join(CASES_DIR, f), 'utf-8')
    // Licz wystąpienia "id: <n>"
    const matches = [...content.matchAll(/id:\s*(\d+),\s*cat/g)]
    const nameMatch = content.match(/export const (\w+):/)
    const name = nameMatch ? nameMatch[1] : f
    const count = matches.length

    if (expected[name] !== undefined && count !== expected[name]) {
      console.error(`✘ ${f}: oczekiwano ${expected[name]} przypadków, znaleziono ${count}`)
      ok = false
    } else {
      console.log(`✔ ${f}: ${count} przypadków`)
    }

    for (const m of matches) {
      const id = Number(m[1])
      if (ids.has(id)) {
        console.error(`✘ Duplikat ID: ${id} w ${f}`)
        ok = false
      }
      ids.add(id)
    }
  }

  const total = ids.size
  if (total !== 100) {
    console.error(`✘ Oczekiwano 100 unikalnych przypadków, znaleziono: ${total}`)
    ok = false
  } else {
    console.log('✔ Łącznie 100 unikalnych przypadków (ID 1–100)')
  }

  // Sprawdź kompletność od 1 do 100
  for (let i = 1; i <= 100; i++) {
    if (!ids.has(i)) {
      console.error(`✘ Brak przypadku o ID ${i}`)
      ok = false
    }
  }

  if (ok) {
    console.log('\n=== WERYFIKACJA ZAKOŃCZONA POMYŚLNIE ===')
    console.log('Wszystkie 100 przypadków jest dostępnych, unikalnych i kompletnych.')
    process.exit(0)
  } else {
    console.log('\n=== WERYFIKACJA NIE POWIODŁA SIĘ ===')
    process.exit(1)
  }
} catch (e) {
  console.error('Błąd podczas weryfikacji:', e.message)
  process.exit(1)
}
