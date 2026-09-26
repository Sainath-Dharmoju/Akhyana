export type WordDirection = 'horizontal' | 'vertical' | 'diagonal' | 'diagonal-up';

export interface GridCell {
  row: number;
  col: number;
}

export interface MiniChallenge {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChronoSearchWordDef {
  id: string;
  word: string;
  clue?: string;
  displayLabel: string;
  row: number;
  col: number;
  direction: WordDirection;
  category: string;
  explanation: string;
  isImportant: boolean;
  challenge?: MiniChallenge;
}

export type ChronoSearchWord = ChronoSearchWordDef;

export interface ChronoSearchPuzzleDef {
  id: string;
  decade?: number;
  year?: number;
  eraId?: string;
  title: string;
  description?: string;
  gridSize: number;
  fill: string;
  words: ChronoSearchWordDef[];
}

export type ChronoSearchPuzzle = ChronoSearchPuzzleDef;

export interface ChronoSearchDecade {
  decade: number;
  displayLabel: string;
  summary: string;
  puzzles: ChronoSearchPuzzleDef[];
}

export interface ChronoSearchEra {
  id: string;
  title: string;
  periodLabel: string;
  summary: string;
  focus: string;
  puzzleId: string;
}

export type ChronoSearchPhase = 'playing' | 'discovery' | 'challenge' | 'complete';

export interface ChronoSearchScoreBreakdown {
  wordsFound: number;
  importantDiscoveries: number;
  challengesCorrect: number;
  challengesAttempted: number;
  completionBonus: number;
  total: number;
  xpEarned: number;
}
