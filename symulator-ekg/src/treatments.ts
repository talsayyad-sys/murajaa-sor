// ===== Bank leków i metod postępowania (postępowanie wg ERC 2021/ILCOR) =====

import { Treatment } from './types'

export const treatments: Treatment[] = [
  { id: 'adenozyna', name: 'Adenozyna 6 mg i.v. (bolus) → 12 mg', dose: '6–12 mg i.v. szybko, z płucnieniem', contra: 'Astma, blok AV II/III st. (bez rozrusznika), dawka >12 mg' },
  { id: 'amiodaron', name: 'Amiodaron 300 mg i.v. (VF/pVT)', dose: '300 mg i.v. w zatrzymaniu krążenia; 150 mg w tachyarytmiach', contra: 'Blok AV II/III, bradykardia zatokowa, wstrząs kardiogenny' },
  { id: 'verapamil', name: 'Weryzol – werytropomadryna (werapamil 2,5–5 mg i.v.)', dose: '2,5–5 mg i.v. powoli', contra: 'Blok AV, szeroki QRS niewiadomego pochodzenia, wstrząs' },
  { id: 'diltiazem', name: 'Diltiazem 0,25 mg/kg i.v.', dose: '0,25 mg/kg i.v.', contra: 'Blok AV, hipotensja' },
  { id: 'beta-blok', name: 'Beta-bloker i.v. (metoprolol 5 mg)', dose: '5 mg i.v. co 5 min do dawki 15 mg', contra: 'Astma, blok AV II/III, bradykardia, wstrząs kardiogenny, ciężka niewydolność' },
  { id: 'digoxin', name: 'Digoksyna 0,25 mg i.v.', dose: '0,25–0,5 mg i.v.', contra: 'Blok AV II/III, hipokaliemia, zatrucie naparstnicą' },
  { id: 'adrenalina', name: 'Adrenalina 1 mg i.v. co 3–5 min (ALS)', dose: '1 mg i.v. co 3–5 min', contra: 'Brak w zatrzymaniu krążenia' },
  { id: 'norepi', name: 'Norepinefryna w infuzji', dose: '0,05–0,5 µg/kg/min', contra: 'Niekontrolowane nadciśnienie' },
  { id: 'atropina', name: 'Atropina 0,5–1 mg i.v.', dose: '0,5 mg i.v. co 3–5 min (max 3 mg)', contra: 'Blok AV II st. Mobitz II/III st. – nieskuteczna, kamicą' },
  { id: 'lidokaina', name: 'Lidokaina 1–1,5 mg/kg i.v.', dose: '1–1,5 mg/kg i.v.', contra: 'Brak zalecenia pierwszego rzutu w VF/pVT' },
  { id: 'magnez', name: 'Magnez 2 g i.v.', dose: '2 g (8 mmol) i.v. w 10 min', contra: 'Niewydolność nerek (ostrożnie)' },
  { id: 'wapno', name: 'Chlorek wapnia 10% 10 ml i.v.', dose: '10 ml i.v.', contra: 'Jednoczesne z wodorowęglanem (wstrzymanie w jednym dostępie)' },
  { id: 'insulina-glukoza', name: 'Insulina 10 j.m. + glukoza 25 g i.v.', dose: '10 j.m. insuliny + 25 g glukozy i.v.', contra: 'Hipoglikemia – kontrola glikemii' },
  { id: 'sodawapno', name: 'Wodorowęglan sodu 50 ml 8,4% i.v.', dose: '50 ml 8,4% i.v.', contra: 'Najpierw wentylacja, ryzyko alkalózy' },
  { id: 'nalokson', name: 'Nalokson 0,4 mg i.v.', dose: '0,4 mg i.v., powtarzać co 2 min', contra: 'Najpierw wentylacja workiem, jeśli depresja oddechowa' },
  { id: 'tlen', name: 'Tlenoterapia (SpO2 <90%)', dose: 'Tlenotterapia celowana 94–98%', contra: 'Przewlekła hipoksemia (POChP – cel 88–92%)' },
  { id: 'płyny', name: 'Krystaloidy 500 ml i.v.', dose: '500 ml – 1 L w bolusach', contra: 'Zastoinowa niewydolność serca, obrzęk płuc (ostrożnie)' },
  { id: 'adeno-iv', name: 'Adenozyna 6 mg i.v. szybki bolus', dose: '6 mg i.v. w 1–2 s, następnie 12 mg', contra: 'Blok AV zaawansowany' },
  { id: 'fizostygmina', name: 'Fizostygmina 1–2 mg i.v.', dose: '1–2 mg i.v. powoli', contra: 'Astma, blok AV, niedrożność jelit' },
  { id: 'sodubikarb', name: 'Sodubikarb (wodorowęglan) 50 ml i.v.', dose: '50 ml 8,4%', contra: 'Najpierw wentylacja' },
  { id: 'pacing', name: 'Stymulacja przeprzełykowa/zewnątrzsercową', dose: 'Próg 40–80 mA, 70/min, czujność na wychwyt', contra: 'Brak wychwytu – konieczna stymulacja dożylna' },
  { id: 'cpr', name: 'RKO – uciśnięcia klatki piersiowej', dose: '100–120/min, głębokość 5–6 cm', contra: 'Zatrzymanie oddechu bez zatrzymania krążenia (wentylacja)' },
  { id: 'defib', name: 'Defibrylacja niesynchronizowana', dose: '150–200 J (dwufazowy), kolejne 360 J', contra: 'Rytm zorganizowany (→ kardiowersja), asystolia/PEA' },
  { id: 'cardiovert', name: 'Kardiowersja synchronizowana', dose: '120–200 J (dwufazowy)', contra: 'Asystolia, brak rytmu zorganizowanego' },
  { id: 'heparin', name: 'Heparyna niskocząsteczkowa', dose: 'Enoksaparyna 1 mg/kg s.c.', contra: 'Aktywne krwawienie' },
  { id: 'aspiryna', name: 'Kwas acetylosalicylowy 300 mg', dose: '300 mg p.o./i.v.', contra: 'Czynne krwawienie z przewodu pokarmowego' },
  { id: 'morfino', name: 'Morfina 5 mg i.v.', dose: '2–5 mg i.v. przy silnym bólu', contra: 'Hipotensja, depresja oddechowa' },
  { id: 'fibrinoliza', name: 'Fibrinoliza (dla STEMI bez dostępu do PCI)', dose: 'Tenekteplaza wg masy ciała', contra: 'Przeciwwskazania: OUN krwotoczne, aktywne krwawienie' },
  { id: 'pci', name: 'Pilna koronarografia (PCI)', dose: 'Czas od drzwi do balonu <90 min', contra: 'Odmowa pacjenta, śmierć mózgu' },
  { id: 'perikardio', name: 'Perikardiocenteza', dose: 'Pod kontrolą USG, pilnie', contra: 'Brak – procedura ratująca życie' },
  { id: 'tromboliza-pe', name: 'Fibrinoliza w zatorowości płucnej masywnej', dose: 'Alteplaza 100 mg w 2 h', contra: 'Ryzyko krwawienia (jak w STEMI)' },
  { id: 'kalcium-agonist', name: 'Kalcjum – poprawa kurczliwości', dose: '10 ml 10% i.v.', contra: 'Jednoczesny wlew wodorowęglanu' },
  { id: 'vent', name: 'Wentylacja workiem/tubusem', dose: '10 oddechów/min', contra: 'Brak' },
  { id: 'glukagon', name: 'Glukagon 1–5 mg i.v.', dose: '1–5 mg i.v. w zatruciu BB+CCB', contra: 'Hiperglikemia' },
  { id: 'lipidy', name: 'Emulsja lipidowa 20%', dose: '1,5 ml/kg bolus', contra: 'Brak (przypadkowe przedawkowanie leków lipofilowych)' },
  { id: 'dializa', name: 'Hemodializa', dose: 'Pilnie w ciężkiej hiperkaliemii', contra: 'Niestabilność – najpierw stabilizacja' },
  { id: 'układanie', name: 'Ułożenie na boku + aspiracja treści', dose: 'Standard', contra: 'Brak' },
  { id: 'koagulacja', name: 'Odwrotnie antykoagulacji (vit. K, PCC)', dose: 'Vit. K 5–10 mg i.v. + PCC', contra: 'Brak zakrzepicy czynnej' },
  { id: 'amiodaron-szok', name: 'Amiodaron 300 mg w VF/pVT', dose: '300 mg i.v. po 3. wyładowaniu', contra: 'Brak w zatrzymaniu' },
  { id: 'magnez-tors', name: 'Magnez 2 g i.v. w torsades', dose: '2 g i.v. w 10 min', contra: 'Zaburzenia przewodzenia' }
]

export function findTreatment(id: string): Treatment | undefined {
  return treatments.find(t => t.id === id)
}
