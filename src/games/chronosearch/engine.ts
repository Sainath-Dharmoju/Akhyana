import {
  ChronoSearchPuzzleDef,
  ChronoSearchWordDef,
  GridCell,
  WordDirection,
} from './types';

const DIRECTION_DELTA: Record<WordDirection, GridCell> = {
  horizontal: { row: 0, col: 1 },
  vertical: { row: 1, col: 0 },
  diagonal: { row: 1, col: 1 },
  'diagonal-up': { row: -1, col: 1 },
};

export function cellKey(cell: GridCell): string {
  return `${cell.row}:${cell.col}`;
}

export function cellsForWord(word: ChronoSearchWordDef): GridCell[] {
  const delta = DIRECTION_DELTA[word.direction];
  const letters = word.word.toUpperCase();
  return Array.from({ length: letters.length }, (_, index) => ({
    row: word.row + delta.row * index,
    col: word.col + delta.col * index,
  }));
}

export function assembleGrid(puzzle: ChronoSearchPuzzleDef): string[][] {
  const { gridSize, words, fill } = puzzle;
  const grid: (string | null)[][] = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => null),
  );

  for (const word of words) {
    const letters = word.word.toUpperCase();
    const cells = cellsForWord(word);
    if (cells.length !== letters.length) {
      throw new Error(`ChronoSearch: length mismatch for ${word.id}`);
    }

    cells.forEach((cell, index) => {
      if (cell.row < 0 || cell.col < 0 || cell.row >= gridSize || cell.col >= gridSize) {
        throw new Error(`ChronoSearch: ${word.id} is outside the grid`);
      }
      const existing = grid[cell.row][cell.col];
      const next = letters[index];
      if (existing && existing !== next) {
        throw new Error(`ChronoSearch: overlap at ${cellKey(cell)} for ${word.id}`);
      }
      grid[cell.row][cell.col] = next;
    });
  }

  let fillIndex = 0;
  return grid.map((row) =>
    row.map((letter) => {
      if (letter) return letter;
      const fillLetter = fill[fillIndex % fill.length]?.toUpperCase() ?? 'X';
      fillIndex += 1;
      return fillLetter;
    }),
  );
}

export function getStraightPath(start: GridCell, end: GridCell): GridCell[] | null {
  const rowDiff = end.row - start.row;
  const colDiff = end.col - start.col;
  const absRow = Math.abs(rowDiff);
  const absCol = Math.abs(colDiff);

  if (absRow !== 0 && absCol !== 0 && absRow !== absCol) {
    return null;
  }

  const steps = Math.max(absRow, absCol);
  if (steps === 0) return [start];

  const rowStep = rowDiff === 0 ? 0 : rowDiff / absRow;
  const colStep = colDiff === 0 ? 0 : colDiff / absCol;

  return Array.from({ length: steps + 1 }, (_, index) => ({
    row: start.row + rowStep * index,
    col: start.col + colStep * index,
  }));
}

export function lettersFromPath(grid: string[][], path: GridCell[]): string {
  return path.map((cell) => grid[cell.row][cell.col]).join('');
}

export function reverseWord(word: string): string {
  return word.split('').reverse().join('');
}

export function formatElapsed(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const CHRONOSEARCH_SCORE = {
  wordFound: 20,
  importantDiscovery: 10,
  challengeCorrect: 15,
  puzzleComplete: 30,
} as const;

export function pointsForFoundWord(isImportant: boolean): number {
  return CHRONOSEARCH_SCORE.wordFound + (isImportant ? CHRONOSEARCH_SCORE.importantDiscovery : 0);
}

export type SelectionResult =
  | { status: 'found'; word: ChronoSearchWordDef }
  | { status: 'already_found' }
  | { status: 'invalid' };

export function evaluateSelection(
  words: ChronoSearchWordDef[],
  foundIds: ReadonlySet<string>,
  selected: string,
): SelectionResult {
  const normalized = selected.toUpperCase();
  if (normalized.length < 2) return { status: 'invalid' };

  const match = words.find((word) => {
    const target = word.word.toUpperCase();
    return target === normalized || reverseWord(target) === normalized;
  });

  if (!match) return { status: 'invalid' };
  if (foundIds.has(match.id)) return { status: 'already_found' };
  return { status: 'found', word: match };
}

export function inferDirection(start: GridCell, next: GridCell): GridCell | null {
  const row = Math.sign(next.row - start.row);
  const col = Math.sign(next.col - start.col);
  if (row === 0 && col === 0) return null;
  return { row, col };
}

export function projectOntoDirection(
  start: GridCell,
  target: GridCell,
  direction: GridCell,
  gridSize: number,
): GridCell {
  let steps: number;
  if (direction.row !== 0 && direction.col !== 0) {
    steps = Math.max(Math.abs(target.row - start.row), Math.abs(target.col - start.col));
  } else if (direction.row !== 0) {
    steps = Math.abs(target.row - start.row);
  } else {
    steps = Math.abs(target.col - start.col);
  }

  while (steps > 0) {
    const row = start.row + direction.row * steps;
    const col = start.col + direction.col * steps;
    if (row >= 0 && col >= 0 && row < gridSize && col < gridSize) {
      return { row, col };
    }
    steps -= 1;
  }

  return start;
}

export function selectionPathFromDrag(
  start: GridCell,
  current: GridCell,
  lockedDirection: GridCell | null,
  gridSize: number,
): { path: GridCell[]; direction: GridCell | null } {
  const direction = lockedDirection ?? inferDirection(start, current);
  if (!direction) return { path: [start], direction: null };
  const end = projectOntoDirection(start, current, direction, gridSize);
  const path = getStraightPath(start, end) ?? [start];
  return { path, direction };
}
