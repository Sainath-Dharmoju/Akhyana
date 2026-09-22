import {
  ChronoSearchEra,
  ChronoSearchPuzzleDef,
} from '@/games/chronosearch/types';

export const CHRONOSEARCH_ERAS: ChronoSearchEra[] = [
  {
    id: 'indus-valley',
    title: 'Indus Valley',
    periodLabel: 'c. 2600–1900 BCE',
    summary: 'Planned cities, sanitation, seals, and riverine trade along the Indus system.',
    focus: 'Cities, waterworks, and craft',
    puzzleId: 'indus-grid-1',
  },
  {
    id: 'mauryan',
    title: 'Mauryan Empire',
    periodLabel: 'c. 322–185 BCE',
    summary: 'A subcontinental state remembered through Ashoka’s inscriptions and the lion capital.',
    focus: 'Rule, edicts, and public ethics',
    puzzleId: 'maurya-grid-1',
  },
  {
    id: 'chola',
    title: 'Chola Period',
    periodLabel: 'c. 9th–13th century CE',
    summary: 'Temple architecture, bronze sculpture, and Indian Ocean seafaring from the Tamil coast.',
    focus: 'Temples, bronze, and ports',
    puzzleId: 'chola-grid-1',
  },
];

export const CHRONOSEARCH_PUZZLES: ChronoSearchPuzzleDef[] = [
  {
    id: 'indus-grid-1',
    eraId: 'indus-valley',
    title: 'Cities of the Indus',
    gridSize: 8,
    fill: 'QWYMZXVFJGKQPYWX',
    words: [
      {
        id: 'harappa',
        word: 'HARAPPA',
        displayLabel: 'Harappa',
        row: 0,
        col: 0,
        direction: 'horizontal',
        category: 'Place',
        isImportant: true,
        explanation:
          'Harappa, in present-day Punjab, is a principal excavated city of the Indus civilisation. The culture is often called Harappan after this site.',
        challenge: {
          question: 'The Indus civilisation is also commonly called Harappan because:',
          choices: [
            'Harappa was the only city in the culture',
            'Early excavations at Harappa gave the culture its modern name',
            'Harappa invented the undeciphered script',
          ],
          correctIndex: 1,
          explanation:
            'Nineteenth- and early twentieth-century work at Harappa made it a type-site; many other cities are now known.',
        },
      },
      {
        id: 'indus',
        word: 'INDUS',
        displayLabel: 'Indus',
        row: 1,
        col: 0,
        direction: 'vertical',
        category: 'Place',
        isImportant: false,
        explanation:
          'The civilisation developed along the Indus and related river systems in present-day Pakistan and northwest India.',
      },
      {
        id: 'drain',
        word: 'DRAIN',
        displayLabel: 'Drain',
        row: 1,
        col: 2,
        direction: 'diagonal',
        category: 'Invention',
        isImportant: true,
        explanation:
          'Several Indus cities used baked-brick drains and soak pits. This municipal sanitation is unusually well evidenced for the third millennium BCE.',
        challenge: {
          question: 'Covered street drains at sites such as Mohenjo-daro mainly show that:',
          choices: [
            'Cities had organised waste-water planning',
            'The Indus script has been fully deciphered',
            'Every house had a private well only',
          ],
          correctIndex: 0,
          explanation:
            'Archaeology documents brick-lined drains and house outlets; it does not by itself decode the script.',
        },
      },
      {
        id: 'seal',
        word: 'SEAL',
        displayLabel: 'Seal',
        row: 1,
        col: 3,
        direction: 'diagonal',
        category: 'Heritage',
        isImportant: false,
        explanation:
          'Steatite seals bearing animals and the undeciphered Indus script were likely used in administration and trade. The script itself remains unread.',
      },
      {
        id: 'dock',
        word: 'DOCK',
        displayLabel: 'Dock',
        row: 2,
        col: 7,
        direction: 'vertical',
        category: 'Place',
        isImportant: false,
        explanation:
          'A large brick basin at Lothal is often interpreted as a tidal dock linked to maritime trade. Some scholars still debate whether it was a dock, a reservoir, or another waterwork.',
      },
      {
        id: 'bath',
        word: 'BATH',
        displayLabel: 'Bath',
        row: 6,
        col: 0,
        direction: 'horizontal',
        category: 'Monument',
        isImportant: false,
        explanation:
          'The Great Bath at Mohenjo-daro is a watertight brick tank. Ritual or public bathing is a common interpretation; the exact original use is not proven.',
      },
      {
        id: 'lothal',
        word: 'LOTHAL',
        displayLabel: 'Lothal',
        row: 7,
        col: 2,
        direction: 'horizontal',
        category: 'Place',
        isImportant: true,
        explanation:
          'Lothal, in present-day Gujarat, was a Harappan settlement associated with craft production and long-distance exchange along the gulf.',
        challenge: {
          question: 'Lothal is especially discussed by historians because of its:',
          choices: [
            'Rock edicts of Ashoka',
            'Evidence for craft and a major water basin linked to trade',
            'Chola bronze workshop',
          ],
          correctIndex: 1,
          explanation:
            'Lothal is a Harappan site. The brick basin and workshop evidence are the usual points of discussion, not Mauryan edicts or Chola bronzes.',
        },
      },
    ],
  },
  {
    id: 'maurya-grid-1',
    eraId: 'mauryan',
    title: 'Ashoka’s Realm',
    gridSize: 8,
    fill: 'BQWZXVJKGYFPQMWN',
    words: [
      {
        id: 'ashoka',
        word: 'ASHOKA',
        displayLabel: 'Ashoka',
        row: 0,
        col: 1,
        direction: 'horizontal',
        category: 'Ruler',
        isImportant: true,
        explanation:
          'Ashoka (c. 268–232 BCE) was a Mauryan emperor. After the Kalinga war he issued inscriptions promoting dhamma—ethical conduct and public welfare—across his realm.',
        challenge: {
          question: 'Ashoka’s rock and pillar inscriptions are important because they:',
          choices: [
            'Are the only evidence that cities existed in India',
            'Are contemporary royal messages in readable historical languages',
            'Decode the Indus script',
          ],
          correctIndex: 1,
          explanation:
            'The edicts survive as dated royal texts. They do not decode Indus writing, which belongs to a much earlier period.',
        },
      },
      {
        id: 'maurya',
        word: 'MAURYA',
        displayLabel: 'Maurya',
        row: 1,
        col: 0,
        direction: 'vertical',
        category: 'Civilization',
        isImportant: false,
        explanation:
          'The Mauryan dynasty, beginning with Chandragupta Maurya, built a large state across much of the subcontinent in the late first millennium BCE.',
      },
      {
        id: 'edict',
        word: 'EDICT',
        displayLabel: 'Edict',
        row: 1,
        col: 2,
        direction: 'diagonal',
        category: 'Heritage',
        isImportant: true,
        explanation:
          'Ashokan edicts were carved on rocks and pillars in Prakrit and other languages. They discuss governance, non-violence, and care for people and animals.',
        challenge: {
          question: 'Most surviving Ashokan edicts were intended to be:',
          choices: [
            'Public inscriptions of royal policy',
            'Secret military codes',
            'Temple foundation hymns in Tamil',
          ],
          correctIndex: 0,
          explanation:
            'The edicts were displayed in public places so that the emperor’s message could be read or heard.',
        },
      },
      {
        id: 'lion',
        word: 'LION',
        displayLabel: 'Lion',
        row: 4,
        col: 1,
        direction: 'horizontal',
        category: 'Monument',
        isImportant: false,
        explanation:
          'The lion capital from Sarnath, commissioned in Ashoka’s period, is now the State Emblem of India. It once crowned a pillar at a major Buddhist site.',
      },
      {
        id: 'dhamma',
        word: 'DHAMMA',
        displayLabel: 'Dhamma',
        row: 6,
        col: 2,
        direction: 'horizontal',
        category: 'Tradition',
        isImportant: false,
        explanation:
          'In the edicts, dhamma refers to a civic ethic: restraint, generosity, respect for sects, and welfare works—not a single exclusive doctrine.',
      },
      {
        id: 'sarnath',
        word: 'SARNATH',
        displayLabel: 'Sarnath',
        row: 7,
        col: 0,
        direction: 'horizontal',
        category: 'Place',
        isImportant: true,
        explanation:
          'Sarnath, near Varanasi, is where the Buddha is said to have given his first sermon. Ashoka marked the site with a pillar whose lion capital survives.',
        challenge: {
          question: 'Sarnath is historically significant in this era mainly as:',
          choices: [
            'A Harappan dockyard',
            'A Buddhist site marked by an Ashokan pillar',
            'The Chola capital',
          ],
          correctIndex: 1,
          explanation:
            'Sarnath is a Buddhist pilgrimage centre associated with the first sermon and with Ashoka’s pillar, not with Indus docks or the later Chola capital.',
        },
      },
    ],
  },
  {
    id: 'chola-grid-1',
    eraId: 'chola',
    title: 'Temples and the Sea',
    gridSize: 8,
    fill: 'QWXJKVFYGPZMNBQL',
    words: [
      {
        id: 'chola',
        word: 'CHOLA',
        displayLabel: 'Chola',
        row: 0,
        col: 0,
        direction: 'horizontal',
        category: 'Civilization',
        isImportant: true,
        explanation:
          'The Cholas were a Tamil dynasty whose imperial phase (especially the 10th–12th centuries) combined temple patronage with overseas trade and naval power.',
        challenge: {
          question: 'Imperial Chola power is best described as:',
          choices: [
            'A Bronze Age Indus city culture',
            'A medieval South Indian dynasty with temples and overseas links',
            'The dynasty that issued the Sarnath lion capital',
          ],
          correctIndex: 1,
          explanation:
            'The imperial Cholas are a medieval South Indian polity. Ashoka’s lion capital is Mauryan; Indus cities are far earlier.',
        },
      },
      {
        id: 'temple',
        word: 'TEMPLE',
        displayLabel: 'Temple',
        row: 0,
        col: 7,
        direction: 'vertical',
        category: 'Monument',
        isImportant: false,
        explanation:
          'Monumental stone temples such as the Brihadisvara at Thanjavur were royal foundations, economic centres, and stages for ritual and dance.',
      },
      {
        id: 'brihad',
        word: 'BRIHAD',
        displayLabel: 'Brihad',
        row: 1,
        col: 0,
        direction: 'diagonal',
        category: 'Monument',
        isImportant: true,
        explanation:
          'Brihadisvara—often shortened in teaching as the “Brihad” temple—was built under Rajaraja I at Thanjavur (completed c. 1010 CE) and is a UNESCO World Heritage site.',
        challenge: {
          question: 'The Brihadisvara temple at Thanjavur was a royal foundation of:',
          choices: [
            'Rajaraja I of the Cholas',
            'Ashoka Maurya',
            'The Harappan city administration',
          ],
          correctIndex: 0,
          explanation:
            'Inscriptions and architectural history attribute the great Thanjavur temple to Rajaraja I, not to Mauryan or Indus builders.',
        },
      },
      {
        id: 'sail',
        word: 'SAIL',
        displayLabel: 'Sail',
        row: 2,
        col: 3,
        direction: 'diagonal',
        category: 'Tradition',
        isImportant: false,
        explanation:
          'Chola-period sources and later tradition remember organised seafaring across the Bay of Bengal, connecting the Tamil coast with Sri Lanka and Southeast Asia.',
      },
      {
        id: 'port',
        word: 'PORT',
        displayLabel: 'Port',
        row: 6,
        col: 0,
        direction: 'horizontal',
        category: 'Place',
        isImportant: false,
        explanation:
          'Coastal centres on the Coromandel supported merchants, ship traffic, and the movement of metals, textiles, and spices in the Indian Ocean world.',
      },
      {
        id: 'bronze',
        word: 'BRONZE',
        displayLabel: 'Bronze',
        row: 7,
        col: 0,
        direction: 'horizontal',
        category: 'Heritage',
        isImportant: true,
        explanation:
          'Chola-period bronze images, including Nataraja, were cast by the lost-wax process for temple worship and procession. They remain a major sculptural tradition.',
        challenge: {
          question: 'Chola bronzes such as Nataraja were typically made by:',
          choices: [
            'Carving a single granite block only',
            'Lost-wax metal casting for temple use',
            'Stamping Indus steatite seals',
          ],
          correctIndex: 1,
          explanation:
            'The classic Chola icons are lost-wax bronzes made for ritual, distinct from stone architecture and from Indus seal-carving.',
        },
      },
    ],
  },
];

export function getChronoSearchEras(): ChronoSearchEra[] {
  return CHRONOSEARCH_ERAS;
}

export function getChronoSearchPuzzle(puzzleId: string): ChronoSearchPuzzleDef | undefined {
  return CHRONOSEARCH_PUZZLES.find((puzzle) => puzzle.id === puzzleId);
}

export function getChronoSearchEra(eraId: string): ChronoSearchEra | undefined {
  return CHRONOSEARCH_ERAS.find((era) => era.id === eraId);
}

export function getEraForPuzzle(puzzleId: string): ChronoSearchEra | undefined {
  const puzzle = getChronoSearchPuzzle(puzzleId);
  if (!puzzle) return undefined;
  return getChronoSearchEra(puzzle.eraId);
}
