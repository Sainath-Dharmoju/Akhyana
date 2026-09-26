import {
  ChronoSearchDecade,
  ChronoSearchEra,
  ChronoSearchPuzzleDef,
} from '@/games/chronosearch/types';

/**
 * ChronoSearch Content Organization:
 * Decade -> Exact Year (when available) -> ChronoSearch Puzzle -> Historical Words
 *
 * Puzzles use documented historical events and vocabulary from specific decades and years.
 * Ancient and medieval puzzles without single-year granularity are preserved under
 * PRESERVED_ERA_PUZZLES to maintain integrity without fabricating dates.
 */

export const CHRONOSEARCH_PUZZLES: ChronoSearchPuzzleDef[] = [
  // 1940s -------------------------------------------------------------
  {
    id: 'chrono-1942',
    decade: 1940,
    year: 1942,
    title: 'Quit India Movement (1942)',
    description: 'The historic Bombay resolution and mass non-violent call for complete freedom.',
    gridSize: 8,
    fill: 'MWXKZQJYPVFT',
    words: [
      {
        id: 'bharat',
        word: 'BHARAT',
        displayLabel: 'Bharat',
        clue: 'National call in the Quit India resolution (Bharat Chhodo)',
        row: 0,
        col: 0,
        direction: 'horizontal',
        category: 'Movement',
        isImportant: true,
        explanation:
          'In August 1942, the All India Congress Committee met at Gowalia Tank Maidan in Bombay, launching the Bharat Chhodo (Quit India) movement.',
        challenge: {
          question: 'The 1942 Quit India movement was officially launched from:',
          choices: [
            'Gowalia Tank Maidan, Bombay',
            'Sarnath pillar grounds',
            'Fort William, Calcutta',
          ],
          correctIndex: 0,
          explanation:
            'The resolution was passed at Gowalia Tank Maidan in Bombay on August 8, 1942.',
        },
      },
      {
        id: 'radio',
        word: 'RADIO',
        displayLabel: 'Radio',
        clue: 'Underground broadcast service operated by Usha Mehta',
        row: 1,
        col: 7,
        direction: 'vertical',
        category: 'Communication',
        isImportant: true,
        explanation:
          'The Congress Secret Radio, operated underground by young activists including Usha Mehta, broadcast news of the freedom struggle across the country.',
        challenge: {
          question: 'The clandestine Congress Radio during the 1942 movement was organised by:',
          choices: [
            'Dr. B.R. Ambedkar',
            'Usha Mehta and fellow patriots',
            'Lord Mountbatten',
          ],
          correctIndex: 1,
          explanation:
            'Usha Mehta and her team ran the secret transmitter to circumvent British censorship.',
        },
      },
      {
        id: 'march',
        word: 'MARCH',
        displayLabel: 'March',
        clue: 'Public rallies across cities and rural districts',
        row: 2,
        col: 0,
        direction: 'horizontal',
        category: 'Action',
        isImportant: false,
        explanation:
          'Protest marches, hartals, and demonstrations spread across towns and villages in the wake of leadership arrests.',
      },
      {
        id: 'action',
        word: 'ACTION',
        displayLabel: 'Action',
        clue: 'Do or Die exhortation for non-violent direct action',
        row: 4,
        col: 0,
        direction: 'horizontal',
        category: 'Principle',
        isImportant: false,
        explanation:
          'Mahatma Gandhi’s speech at Gowalia Tank gave the mantra: "Do or Die. We shall either free India or die in the attempt."',
      },
      {
        id: 'prison',
        word: 'PRISON',
        displayLabel: 'Prison',
        clue: 'Mass detentions of national leadership',
        row: 6,
        col: 0,
        direction: 'horizontal',
        category: 'Event',
        isImportant: false,
        explanation:
          'Within hours of the resolution, principal national leaders were arrested and imprisoned to suppress the campaign.',
      },
      {
        id: 'quit',
        word: 'QUIT',
        displayLabel: 'Quit',
        clue: 'Unconditional demand for immediate self-rule',
        row: 1,
        col: 6,
        direction: 'vertical',
        category: 'Slogan',
        isImportant: false,
        explanation:
          'The word "Quit" signified the demand for an immediate British withdrawal from Indian administration.',
      },
    ],
  },
  {
    id: 'chrono-1947',
    decade: 1940,
    year: 1947,
    title: 'Independence & Partition (1947)',
    description: 'The transfer of power, the Constituent Assembly, and the birth of independent India.',
    gridSize: 8,
    fill: 'QZKXWVMJYPFG',
    words: [
      {
        id: 'azad',
        word: 'AZAD',
        displayLabel: 'Azad',
        clue: 'Freedom and sovereignty achieved on August 15',
        row: 0,
        col: 0,
        direction: 'horizontal',
        category: 'Milestone',
        isImportant: true,
        explanation:
          'On August 15, 1947, India attained independence ("Azadi") ending almost two centuries of British colonial rule.',
        challenge: {
          question: 'India officially achieved independence at midnight of:',
          choices: [
            'January 26, 1950',
            'August 14–15, 1947',
            'November 26, 1949',
          ],
          correctIndex: 1,
          explanation:
            'The Indian Independence Act took effect at the stroke of midnight on August 14–15, 1947.',
        },
      },
      {
        id: 'border',
        word: 'BORDER',
        displayLabel: 'Border',
        clue: 'Radcliffe boundary demarcating Punjab and Bengal',
        row: 1,
        col: 1,
        direction: 'horizontal',
        category: 'Geography',
        isImportant: true,
        explanation:
          'The Radcliffe Boundary Commission drew the partition line separating India and Pakistan in Punjab and Bengal.',
        challenge: {
          question: 'The border demarcation commission in 1947 was headed by:',
          choices: [
            'Sir Cyril Radcliffe',
            'C. Rajagopalachari',
            'Lord Curzon',
          ],
          correctIndex: 0,
          explanation:
            'Sir Cyril Radcliffe chaired the Boundary Commissions for Punjab and Bengal.',
        },
      },
      {
        id: 'flag',
        word: 'FLAG',
        displayLabel: 'Flag',
        clue: 'Tricolor adopted on July 22, 1947',
        row: 0,
        col: 7,
        direction: 'vertical',
        category: 'Symbol',
        isImportant: false,
        explanation:
          'The National Flag of India, featuring saffron, white, and green with the Ashoka Chakra, was adopted by the Constituent Assembly on July 22, 1947.',
      },
      {
        id: 'unity',
        word: 'UNITY',
        displayLabel: 'Unity',
        clue: 'Integration of over 500 princely states',
        row: 3,
        col: 2,
        direction: 'horizontal',
        category: 'Governance',
        isImportant: false,
        explanation:
          'Sardar Vallabhbhai Patel and V.P. Menon led the diplomatic integration of more than 500 princely states into the Indian Union.',
      },
      {
        id: 'peace',
        word: 'PEACE',
        displayLabel: 'Peace',
        clue: 'Appeals and missions for communal reconciliation',
        row: 2,
        col: 0,
        direction: 'diagonal',
        category: 'Effort',
        isImportant: false,
        explanation:
          'Amid partition displacement, intensive peace efforts were led in riot-affected regions to restore communal harmony.',
      },
      {
        id: 'nation',
        word: 'NATION',
        displayLabel: 'Nation',
        clue: 'Sovereign democratic state embarking on its journey',
        row: 7,
        col: 1,
        direction: 'horizontal',
        category: 'Identity',
        isImportant: false,
        explanation:
          'The birth of the sovereign nation was marked by Jawaharlal Nehru’s famous "Tryst with Destiny" address.',
      },
    ],
  },

  // 1950s -------------------------------------------------------------
  {
    id: 'chrono-1950',
    decade: 1950,
    year: 1950,
    title: 'Dawn of the Republic (1950)',
    description: 'Enactment of the Indian Constitution and establishment of the sovereign Republic.',
    gridSize: 8,
    fill: 'ZXYWVKQPFMBJ',
    words: [
      {
        id: 'republic',
        word: 'REPUBLIC',
        displayLabel: 'Republic',
        clue: 'Status proclaimed on January 26, 1950',
        row: 0,
        col: 0,
        direction: 'horizontal',
        category: 'Milestone',
        isImportant: true,
        explanation:
          'On January 26, 1950, the Constitution of India came into effect, making India a sovereign democratic Republic.',
        challenge: {
          question: 'January 26 was chosen as Republic Day because in 1930:',
          choices: [
            'The Simon Commission submitted its report',
            'Purna Swaraj (Complete Independence) declaration was commemorated',
            'The First Round Table Conference opened',
          ],
          correctIndex: 1,
          explanation:
            'January 26 commemorated the declaration of Purna Swaraj adopted at the Lahore Congress in 1929–1930.',
        },
      },
      {
        id: 'emblem',
        word: 'EMBLEM',
        displayLabel: 'Emblem',
        clue: 'State Emblem adopted from Sarnath Lion Capital',
        row: 2,
        col: 1,
        direction: 'horizontal',
        category: 'Symbol',
        isImportant: true,
        explanation:
          'The Lion Capital of Ashoka at Sarnath was officially adopted as the State Emblem of India on January 26, 1950.',
        challenge: {
          question: 'The State Emblem of India features the motto "Satyameva Jayate" from the:',
          choices: [
            'Mundaka Upanishad',
            'Arthashastra',
            'Rigveda',
          ],
          correctIndex: 0,
          explanation:
            'The phrase "Satyameva Jayate" (Truth Alone Triumphs) is taken from the ancient Mundaka Upanishad.',
        },
      },
      {
        id: 'rights',
        word: 'RIGHTS',
        displayLabel: 'Rights',
        clue: 'Fundamental Rights enshrined in Part III',
        row: 1,
        col: 7,
        direction: 'vertical',
        category: 'Constitution',
        isImportant: false,
        explanation:
          'Part III of the Constitution guaranteed enforceable Fundamental Rights, including equality, freedom of speech, and protection against discrimination.',
      },
      {
        id: 'prasad',
        word: 'PRASAD',
        displayLabel: 'Prasad',
        clue: 'Dr. Rajendra Prasad sworn in as first President',
        row: 4,
        col: 1,
        direction: 'horizontal',
        category: 'Leader',
        isImportant: false,
        explanation:
          'Dr. Rajendra Prasad, who presided over the Constituent Assembly, was sworn in as the first President of the Republic of India on January 26, 1950.',
      },
      {
        id: 'law',
        word: 'LAW',
        displayLabel: 'Law',
        clue: 'Supreme law of the land framed by the Assembly',
        row: 1,
        col: 0,
        direction: 'vertical',
        category: 'Constitution',
        isImportant: false,
        explanation:
          'The Constitution created an independent judiciary and the rule of law as the foundation of Indian democracy.',
      },
      {
        id: 'justice',
        word: 'JUSTICE',
        displayLabel: 'Justice',
        clue: 'Social, economic, and political justice in the Preamble',
        row: 7,
        col: 0,
        direction: 'horizontal',
        category: 'Principle',
        isImportant: false,
        explanation:
          'The Preamble places "Justice — social, economic, and political" as the foremost objective for all citizens.',
      },
    ],
  },
  {
    id: 'chrono-1956',
    decade: 1950,
    year: 1956,
    title: 'States Reorganisation (1956)',
    description: 'Re-drawing state borders along linguistic lines through the States Reorganisation Act.',
    gridSize: 8,
    fill: 'KVWQZXPYJMBF',
    words: [
      {
        id: 'states',
        word: 'STATES',
        displayLabel: 'States',
        clue: 'Linguistic reorganisation of Indian states',
        row: 0,
        col: 0,
        direction: 'horizontal',
        category: 'Governance',
        isImportant: true,
        explanation:
          'The States Reorganisation Act of 1956 restructured Indian states and union territories predominantly on linguistic boundaries.',
        challenge: {
          question: 'The committee that recommended the linguistic reorganization of states in 1955 was the:',
          choices: [
            'Radcliffe Commission',
            'Fazal Ali Commission (States Reorganisation Commission)',
            'Hunter Commission',
          ],
          correctIndex: 1,
          explanation:
            'The Fazal Ali Commission (comprising Justice Fazal Ali, K.M. Panikkar, and H.N. Kunzru) submitted its landmark report in 1955.',
        },
      },
      {
        id: 'report',
        word: 'REPORT',
        displayLabel: 'Report',
        clue: 'The SRC findings submitted in late 1955',
        row: 2,
        col: 1,
        direction: 'horizontal',
        category: 'Document',
        isImportant: false,
        explanation:
          'The commission conducted extensive public consultations across all provinces and princely unions before submitting its recommendations.',
      },
      {
        id: 'andhra',
        word: 'ANDHRA',
        displayLabel: 'Andhra',
        clue: 'Pioneering linguistic state established in 1953',
        row: 1,
        col: 0,
        direction: 'vertical',
        category: 'State',
        isImportant: true,
        explanation:
          'The creation of Andhra State in 1953, following Potti Sreeramulu’s fast, became the catalyst for the nationwide States Reorganisation Commission.',
        challenge: {
          question: 'The linguistic movement leading to Andhra State in 1953 was championed by:',
          choices: [
            'Potti Sreeramulu',
            'Subhas Chandra Bose',
            'C. Rajagopalachari',
          ],
          correctIndex: 0,
          explanation:
            'Potti Sreeramulu underwent a 56-day hunger strike that galvanized popular demand for a Telugu-speaking state.',
        },
      },
      {
        id: 'union',
        word: 'UNION',
        displayLabel: 'Union',
        clue: 'Union Territories and the federal balance',
        row: 4,
        col: 2,
        direction: 'horizontal',
        category: 'Federation',
        isImportant: false,
        explanation:
          'The 1956 reorganisation created 14 states and 6 union territories, strengthening federal coordination.',
      },
      {
        id: 'map',
        word: 'MAP',
        displayLabel: 'Map',
        clue: 'Subcontinental administrative cartography redrawn',
        row: 1,
        col: 7,
        direction: 'vertical',
        category: 'Geography',
        isImportant: false,
        explanation:
          'The internal map of India transformed from colonial provinces and princely classifications to coherent linguistic units.',
      },
      {
        id: 'reform',
        word: 'REFORM',
        displayLabel: 'Reform',
        clue: 'Administrative modernisation of governance',
        row: 7,
        col: 1,
        direction: 'horizontal',
        category: 'Policy',
        isImportant: false,
        explanation:
          'Linguistic reorganisation enabled education, court proceedings, and regional administration in state languages.',
      },
    ],
  },
];

/**
 * Preserved ancient/medieval puzzles.
 * Under Part 12 rules, these remain intact as preserved historical era puzzles
 * rather than fabricating artificial modern year metadata.
 */
export const PRESERVED_ERA_PUZZLES: ChronoSearchPuzzleDef[] = [
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
        clue: 'Principal type-site in Punjab',
        row: 0,
        col: 0,
        direction: 'horizontal',
        category: 'Place',
        isImportant: true,
        explanation:
          'Harappa, in present-day Punjab, is a principal excavated city of the Indus civilisation.',
      },
      {
        id: 'indus',
        word: 'INDUS',
        displayLabel: 'Indus',
        clue: 'River basin supporting the urban culture',
        row: 1,
        col: 0,
        direction: 'vertical',
        category: 'Place',
        isImportant: false,
        explanation:
          'The civilisation developed along the Indus and related river systems in northwest India and Pakistan.',
      },
      {
        id: 'drain',
        word: 'DRAIN',
        displayLabel: 'Drain',
        clue: 'Baked-brick municipal sanitation network',
        row: 1,
        col: 2,
        direction: 'diagonal',
        category: 'Invention',
        isImportant: true,
        explanation:
          'Several Indus cities used baked-brick drains and soak pits, demonstrating planned municipal sanitation.',
      },
      {
        id: 'seal',
        word: 'SEAL',
        displayLabel: 'Seal',
        clue: 'Steatite stamp with motifs and unread script',
        row: 1,
        col: 3,
        direction: 'diagonal',
        category: 'Heritage',
        isImportant: false,
        explanation:
          'Steatite seals bearing animals and the undeciphered Indus script were likely used in administration and trade.',
      },
      {
        id: 'dock',
        word: 'DOCK',
        displayLabel: 'Dock',
        clue: 'Tidal brick basin at Lothal',
        row: 2,
        col: 7,
        direction: 'vertical',
        category: 'Place',
        isImportant: false,
        explanation:
          'A large brick basin at Lothal is often interpreted as a tidal dock linked to maritime trade.',
      },
      {
        id: 'bath',
        word: 'BATH',
        displayLabel: 'Bath',
        clue: 'Watertight Great Bath at Mohenjo-daro',
        row: 6,
        col: 0,
        direction: 'horizontal',
        category: 'Monument',
        isImportant: false,
        explanation:
          'The Great Bath at Mohenjo-daro is a watertight brick tank used for public or ritual cleansing.',
      },
      {
        id: 'lothal',
        word: 'LOTHAL',
        displayLabel: 'Lothal',
        clue: 'Port settlement in Gujarat with bead workshops',
        row: 7,
        col: 2,
        direction: 'horizontal',
        category: 'Place',
        isImportant: true,
        explanation:
          'Lothal was a Harappan settlement in Gujarat associated with craft production and coastal exchange.',
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
        clue: 'Mauryan emperor who promulgated dhamma',
        row: 0,
        col: 1,
        direction: 'horizontal',
        category: 'Ruler',
        isImportant: true,
        explanation:
          'Ashoka (c. 268–232 BCE) issued inscriptions promoting dhamma—ethical conduct and public welfare—across his realm.',
      },
      {
        id: 'maurya',
        word: 'MAURYA',
        displayLabel: 'Maurya',
        clue: 'Dynasty founded by Chandragupta',
        row: 1,
        col: 0,
        direction: 'vertical',
        category: 'Civilization',
        isImportant: false,
        explanation:
          'The Mauryan dynasty built a large subcontinental empire in the late first millennium BCE.',
      },
      {
        id: 'edict',
        word: 'EDICT',
        displayLabel: 'Edict',
        clue: 'Royal inscriptions carved on rocks and pillars',
        row: 1,
        col: 2,
        direction: 'diagonal',
        category: 'Heritage',
        isImportant: true,
        explanation:
          'Ashokan edicts were public messages in Prakrit and other regional languages concerning governance and welfare.',
      },
      {
        id: 'lion',
        word: 'LION',
        displayLabel: 'Lion',
        clue: 'Sarnath pillar capital with four lions',
        row: 4,
        col: 1,
        direction: 'horizontal',
        category: 'Monument',
        isImportant: false,
        explanation:
          'The lion capital from Sarnath, commissioned in Ashoka’s period, is now the State Emblem of India.',
      },
      {
        id: 'dhamma',
        word: 'DHAMMA',
        displayLabel: 'Dhamma',
        clue: 'Civic ethic of non-violence and generosity',
        row: 6,
        col: 2,
        direction: 'horizontal',
        category: 'Tradition',
        isImportant: false,
        explanation:
          'In the edicts, dhamma refers to a civic and moral code emphasizing mutual respect and benevolence.',
      },
      {
        id: 'sarnath',
        word: 'SARNATH',
        displayLabel: 'Sarnath',
        clue: 'Site of the Buddha’s first sermon and Ashokan pillar',
        row: 7,
        col: 0,
        direction: 'horizontal',
        category: 'Place',
        isImportant: true,
        explanation:
          'Sarnath, near Varanasi, is where the Buddha gave his first sermon; Ashoka marked the site with a pillar.',
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
        clue: 'Medieval Tamil maritime empire',
        row: 0,
        col: 0,
        direction: 'horizontal',
        category: 'Civilization',
        isImportant: true,
        explanation:
          'The imperial Cholas combined great temple patronage with Indian Ocean seafaring and administration.',
      },
      {
        id: 'temple',
        word: 'TEMPLE',
        displayLabel: 'Temple',
        clue: 'Granite monumental structures of Thanjavur',
        row: 0,
        col: 7,
        direction: 'vertical',
        category: 'Monument',
        isImportant: false,
        explanation:
          'Stone temples such as Brihadisvara at Thanjavur served as religious and civic hubs.',
      },
      {
        id: 'brihad',
        word: 'BRIHAD',
        displayLabel: 'Brihad',
        clue: 'The Great Temple built by Rajaraja I',
        row: 1,
        col: 0,
        direction: 'diagonal',
        category: 'Monument',
        isImportant: true,
        explanation:
          'Brihadisvara temple at Thanjavur was completed under Rajaraja I c. 1010 CE and is a World Heritage site.',
      },
      {
        id: 'sail',
        word: 'SAIL',
        displayLabel: 'Sail',
        clue: 'Navigation across the Bay of Bengal',
        row: 2,
        col: 3,
        direction: 'diagonal',
        category: 'Tradition',
        isImportant: false,
        explanation:
          'Chola inscriptions record maritime expeditions and trade links across Southeast Asia.',
      },
      {
        id: 'port',
        word: 'PORT',
        displayLabel: 'Port',
        clue: 'Coromandel coastal centres of exchange',
        row: 6,
        col: 0,
        direction: 'horizontal',
        category: 'Place',
        isImportant: false,
        explanation:
          'Ports along the Coromandel coast facilitated international maritime commerce.',
      },
      {
        id: 'bronze',
        word: 'BRONZE',
        displayLabel: 'Bronze',
        clue: 'Lost-wax cast sacred sculptures like Nataraja',
        row: 7,
        col: 0,
        direction: 'horizontal',
        category: 'Heritage',
        isImportant: true,
        explanation:
          'Chola lost-wax bronzes represent a pinnacle of Indian metal casting and artistic expression.',
      },
    ],
  },
];

export const CHRONOSEARCH_DECADES: ChronoSearchDecade[] = [
  {
    decade: 1940,
    displayLabel: '1940s',
    summary: 'From the Quit India movement to national independence and partition.',
    puzzles: CHRONOSEARCH_PUZZLES.filter((p) => p.decade === 1940),
  },
  {
    decade: 1950,
    displayLabel: '1950s',
    summary: 'The birth of the Republic, democratic constitution, and linguistic reorganization.',
    puzzles: CHRONOSEARCH_PUZZLES.filter((p) => p.decade === 1950),
  },
];

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

export function getChronoSearchDecades(): ChronoSearchDecade[] {
  return CHRONOSEARCH_DECADES;
}

export function getChronoSearchPuzzlesForDecade(decade: number): ChronoSearchPuzzleDef[] {
  return CHRONOSEARCH_PUZZLES.filter((p) => p.decade === decade);
}

export function getChronoSearchPuzzle(puzzleId: string): ChronoSearchPuzzleDef | undefined {
  return (
    CHRONOSEARCH_PUZZLES.find((puzzle) => puzzle.id === puzzleId) ??
    PRESERVED_ERA_PUZZLES.find((puzzle) => puzzle.id === puzzleId)
  );
}

export function getChronoSearchEras(): ChronoSearchEra[] {
  return CHRONOSEARCH_ERAS;
}

export function getChronoSearchEra(eraId: string): ChronoSearchEra | undefined {
  return CHRONOSEARCH_ERAS.find((era) => era.id === eraId);
}

export function getEraForPuzzle(puzzleId: string): ChronoSearchEra | undefined {
  const puzzle = getChronoSearchPuzzle(puzzleId);
  if (!puzzle || !puzzle.eraId) return undefined;
  return getChronoSearchEra(puzzle.eraId);
}
