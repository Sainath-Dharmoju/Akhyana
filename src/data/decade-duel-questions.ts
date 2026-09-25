import { LudoDuelQuestion } from "@/games/ludo/types";

export type LearningStage = "foundation" | "systems" | "evidence" | "mastery";

export interface DecadeDuelQuestion extends LudoDuelQuestion {
  decadeId: string; // e.g. "1940s", "1950s", "1960s", "1970s", "1980s"
  stage: LearningStage;
  topic?: string;
}

/**
 * Question bank categorised by modern decades (1940s - 1980s)
 * and pedagogical learning stages.
 */
export const DECADE_DUEL_QUESTIONS: DecadeDuelQuestion[] = [
  // --- 1940s: Independence, Constitution & Partition ---
  {
    id: "q-1940s-01",
    decadeId: "1940s",
    stage: "foundation",
    topic: "Constitution Drafting",
    question: "Who served as the Chairman of the Drafting Committee of the Indian Constitution?",
    choices: [
      "Dr. B.R. Ambedkar",
      "Jawaharlal Nehru",
      "Sardar Vallabhbhai Patel",
      "Dr. Rajendra Prasad",
    ],
    correctIndex: 0,
    explanation: "Dr. B.R. Ambedkar chaired the Drafting Committee appointed in August 1947.",
    era: "1940s",
    difficulty: "easy",
  },
  {
    id: "q-1940s-02",
    decadeId: "1940s",
    stage: "systems",
    topic: "Integration of States",
    question: "What instrument did princely states sign to accede to the Dominion of India?",
    choices: [
      "Instrument of Accession",
      "Treaty of Subsidiary Alliance",
      "Delhi Pact",
      "Charter of Federation",
    ],
    correctIndex: 0,
    explanation: "The Instrument of Accession was the legal document enabling princely states to join India.",
    era: "1940s",
    difficulty: "medium",
  },
  {
    id: "q-1940s-03",
    decadeId: "1940s",
    stage: "evidence",
    topic: "Constituent Assembly Debates",
    question: "On which date did the Constituent Assembly formally adopt the Constitution of India?",
    choices: [
      "26 November 1949",
      "15 August 1947",
      "26 January 1950",
      "30 January 1948",
    ],
    correctIndex: 0,
    explanation: "Adopted on 26 November 1949 (celebrated as Constitution Day), it came into effect on 26 January 1950.",
    era: "1940s",
    difficulty: "medium",
  },

  // --- 1950s: Republic, Planning & Nation Building ---
  {
    id: "q-1950s-01",
    decadeId: "1950s",
    stage: "foundation",
    topic: "First General Elections",
    question: "Who was the first Chief Election Commissioner of independent India during the 1951-52 elections?",
    choices: [
      "Sukumar Sen",
      "T.N. Seshan",
      "K.V.K. Sundaram",
      "Feroze Gandhi",
    ],
    correctIndex: 0,
    explanation: "Sukumar Sen oversaw India’s monumental first general elections based on universal adult franchise.",
    era: "1950s",
    difficulty: "easy",
  },
  {
    id: "q-1950s-02",
    decadeId: "1950s",
    stage: "systems",
    topic: "Economic Planning",
    question: "The First Five-Year Plan (1951–56) focused primarily on which economic sector?",
    choices: [
      "Agriculture and irrigation projects",
      "Heavy industrial machinery",
      "Information technology",
      "Atomic power generation",
    ],
    correctIndex: 0,
    explanation: "Based on the Harrod-Domar model, the first plan prioritized agriculture and major dams (like Bhakra-Nangal).",
    era: "1950s",
    difficulty: "medium",
  },
  {
    id: "q-1950s-03",
    decadeId: "1950s",
    stage: "evidence",
    topic: "Linguistic Reorganisation",
    question: "Which commission recommendations led to the States Reorganisation Act of 1956?",
    choices: [
      "Fazal Ali Commission",
      "Sarkaria Commission",
      "Simon Commission",
      "Radcliffe Commission",
    ],
    correctIndex: 0,
    explanation: "The Fazal Ali Commission (with Panikkar and Kunzru) recommended reorganizing state boundaries along linguistic lines.",
    era: "1950s",
    difficulty: "hard",
  },

  // --- 1960s: Green Revolution & Modern Institutions ---
  {
    id: "q-1960s-01",
    decadeId: "1960s",
    stage: "foundation",
    topic: "Agricultural Science",
    question: "Which Indian scientist is renowned as the primary architect of India’s Green Revolution?",
    choices: [
      "M.S. Swaminathan",
      "Homi J. Bhabha",
      "Vikram Sarabhai",
      "C.V. Raman",
    ],
    correctIndex: 0,
    explanation: "Dr. M.S. Swaminathan led the introduction of high-yielding semi-dwarf wheat varieties in India.",
    era: "1960s",
    difficulty: "easy",
  },
  {
    id: "q-1960s-02",
    decadeId: "1960s",
    stage: "systems",
    topic: "Space Research Initiation",
    question: "INCOSPAR, the precursor to ISRO, was established in 1962 under the leadership of:",
    choices: [
      "Dr. Vikram Sarabhai",
      "Dr. A.P.J. Abdul Kalam",
      "Dr. Satish Dhawan",
      "Prof. U.R. Rao",
    ],
    correctIndex: 0,
    explanation: "Vikram Sarabhai convinced the government of space science’s practical importance, launching the Thumba rocket station.",
    era: "1960s",
    difficulty: "medium",
  },
  {
    id: "q-1960s-03",
    decadeId: "1960s",
    stage: "evidence",
    topic: "Green Revolution Technology",
    question: "Which high-yielding Mexican wheat strains were adapted to Indian conditions in the mid-1960s?",
    choices: [
      "Lerma Rojo and Sonora 64",
      "Golden Rice 2",
      "IR8 Wonder Rice",
      "Bt Cotton varieties",
    ],
    correctIndex: 0,
    explanation: "Norman Borlaug collaborated with Indian scientists to introduce Lerma Rojo and Sonora 64 strains.",
    era: "1960s",
    difficulty: "hard",
  },

  // --- 1970s: Space Age, White Revolution & Self-Reliance ---
  {
    id: "q-1970s-01",
    decadeId: "1970s",
    stage: "foundation",
    topic: "Satellite Technology",
    question: "What was the name of India’s first indigenous satellite launched in 1975?",
    choices: [
      "Aryabhata",
      "Rohini",
      "Bhaskara-I",
      "Apple",
    ],
    correctIndex: 0,
    explanation: "Aryabhata, built by ISRO, was launched on 19 April 1975 from Kapustin Yar.",
    era: "1970s",
    difficulty: "easy",
  },
  {
    id: "q-1970s-02",
    decadeId: "1970s",
    stage: "systems",
    topic: "Operation Flood",
    question: "Operation Flood, launched in 1970 to create the nationwide milk grid, was spearheaded by:",
    choices: [
      "Dr. Verghese Kurien",
      "Norman Borlaug",
      "Morarji Desai",
      "Jagjivan Ram",
    ],
    correctIndex: 0,
    explanation: "Dr. Verghese Kurien founded the National Dairy Development Board and transformed India into a leading milk producer.",
    era: "1970s",
    difficulty: "medium",
  },
  {
    id: "q-1970s-03",
    decadeId: "1970s",
    stage: "evidence",
    topic: "Nuclear Research Milestone",
    question: "What was the official code name for India’s first peaceful nuclear explosive experiment in May 1974 at Pokhran?",
    choices: [
      "Smiling Buddha",
      "Operation Shakti",
      "Operation Vijay",
      "Operation Meghdoot",
    ],
    correctIndex: 0,
    explanation: "Conducted on Buddha Purnima in 1974, the test at Pokhran was designated Smiling Buddha.",
    era: "1970s",
    difficulty: "medium",
  },

  // --- 1980s: Telecom, Technology & Modern Governance ---
  {
    id: "q-1980s-01",
    decadeId: "1980s",
    stage: "foundation",
    topic: "Telecom Revolution",
    question: "Which autonomous centre established in 1984 accelerated India’s rural and digital telecommunications?",
    choices: [
      "C-DOT (Centre for Development of Telematics)",
      "TRAI",
      "Doordarshan National",
      "NIC (National Informatics Centre)",
    ],
    correctIndex: 0,
    explanation: "C-DOT designed digital telephone exchange switches ruggedized for rural Indian power and climate conditions.",
    era: "1980s",
    difficulty: "medium",
  },
  {
    id: "q-1980s-02",
    decadeId: "1980s",
    stage: "systems",
    topic: "Supercomputing",
    question: "C-DAC was created in 1988 to develop indigenous supercomputers after denial of Cray supercomputers, producing:",
    choices: [
      "PARAM 8000",
      "PARAM Yuva",
      "SahasraT",
      "Pratyush",
    ],
    correctIndex: 0,
    explanation: "PARAM 8000 was unveiled in 1991 as India’s first parallel supercomputer designed under Vijay Bhatkar.",
    era: "1980s",
    difficulty: "hard",
  },
  {
    id: "q-1980s-03",
    decadeId: "1980s",
    stage: "evidence",
    topic: "First Indian in Space",
    question: "In 1984, Wing Commander Rakesh Sharma flew aboard which Soviet spacecraft to the Salyut 7 station?",
    choices: [
      "Soyuz T-11",
      "Vostok 1",
      "Sputnik 5",
      "Soyuz MS-01",
    ],
    correctIndex: 0,
    explanation: "Rakesh Sharma spent 7 days aboard Salyut 7 after launching on Soyuz T-11 in April 1984.",
    era: "1980s",
    difficulty: "medium",
  },
];

/**
 * Fisher-Yates shuffle that randomizes answer choices and preserves the correct answer index.
 * Guarantees answers are never shown in the same order across rounds.
 */
export function randomizeQuestionChoices(question: DecadeDuelQuestion): DecadeDuelQuestion {
  const correctAnswer = question.choices[question.correctIndex];
  const shuffledChoices = [...question.choices];

  for (let i = shuffledChoices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledChoices[i];
    shuffledChoices[i] = shuffledChoices[j];
    shuffledChoices[j] = temp;
  }

  const newCorrectIndex = shuffledChoices.indexOf(correctAnswer);

  return {
    ...question,
    choices: shuffledChoices,
    correctIndex: newCorrectIndex,
  };
}

export interface PickDecadeQuestionOptions {
  decadeId?: string; // e.g. "1950s" or leave empty for mixed/all decades
  stage?: LearningStage;
  usedQuestionIds?: string[];
}

/**
 * Selects a fresh question according to decade and learning stage,
 * avoiding recently used questions and randomizing option positions.
 */
export function pickDecadeDuelQuestion(
  options: PickDecadeQuestionOptions = {},
): DecadeDuelQuestion {
  const { decadeId, stage, usedQuestionIds = [] } = options;

  let candidates = DECADE_DUEL_QUESTIONS;

  if (decadeId) {
    const byDecade = candidates.filter((q) => q.decadeId === decadeId);
    if (byDecade.length > 0) candidates = byDecade;
  }

  if (stage) {
    const byStage = candidates.filter((q) => q.stage === stage);
    if (byStage.length > 0) candidates = byStage;
  }

  // Filter out questions that have already been played
  const unused = candidates.filter((q) => !usedQuestionIds.includes(q.id));
  const pool = unused.length > 0 ? unused : candidates;

  const selected = pool[Math.floor(Math.random() * pool.length)];

  // Return with shuffled choices so the answer is never in a fixed position
  return randomizeQuestionChoices(selected);
}
