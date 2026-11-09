// ===== Katalog kategorii klinicznych =====

import { Category } from './types'

export const categories: Category[] = [
  { id: 'tachy', name: 'Tachyarytmie', count: 15 },
  { id: 'brady', name: 'Bradyarytmie i bloki AV', count: 10 },
  { id: 'acs', name: 'Ostre zespoły wieńcowe', count: 15 },
  { id: 'electro', name: 'Zaburzenia elektrolitowe', count: 10 },
  { id: 'tox', name: 'Toksykologiczne EKG', count: 10 },
  { id: 'pulm', name: 'Płucne i serce prawe', count: 10 },
  { id: 'inherited', name: 'Dziedziczne zespoły arytmiczne', count: 10 },
  { id: 'pacer', name: 'Nieprawidłowości rozrusznika', count: 5 },
  { id: 'mimic', name: 'Naśladownictwa EKG', count: 5 },
  { id: 'arrest', name: 'Zatrzymanie krążenia i po resuscytacji', count: 10 }
]

export function catName(id: string): string {
  return categories.find(c => c.id === id)?.name ?? id
}
