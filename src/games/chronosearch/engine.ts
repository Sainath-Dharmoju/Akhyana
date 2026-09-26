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

export interface GridScreenBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

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

export function isValidStraightLine(start: GridCell, end: GridCell): boolean {
  const rowDelta = end.row - start.row;
  const colDelta = end.col - start.col;
  if (rowDelta === 0 && colDelta === 0) return true;
  const isHorizontal = rowDelta === 0 && colDelta !== 0;
  const isVertical = rowDelta !== 0 && colDelta === 0;
  const isDiagonal = Math.abs(rowDelta) === Math.abs(colDelta) && rowDelta !== 0;
  return isHorizontal || isVertical || isDiagonal;
}

export function getStraightPath(start: GridCell, end: GridCell): GridCell[] | null {
  const rowDelta = end.row - start.row;
  const colDelta = end.col - start.col;

  if (!isValidStraightLine(start, end)) {
    return null;
  }

  const steps = Math.max(Math.abs(rowDelta), Math.abs(colDelta));
  if (steps === 0) return [start];

  const rowStep = Math.sign(rowDelta);
  const colStep = Math.sign(colDelta);

  const path: GridCell[] = [];
  let currentRow = start.row;
  let currentCol = start.col;

  for (let i = 0; i <= steps; i++) {
    path.push({ row: currentRow, col: currentCol });
    currentRow += rowStep;
    currentCol += colStep;
  }

  return path;
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

export function selectionPathFromDrag(
  start: GridCell,
  current: GridCell,
  previousPath: GridCell[] | null,
  _gridSize: number,
): { path: GridCell[]; direction: GridCell | null } {
  if (isValidStraightLine(start, current)) {
    const path = getStraightPath(start, current);
    if (path) {
      const rowDelta = Math.sign(current.row - start.row);
      const colDelta = Math.sign(current.col - start.col);
      return {
        path,
        direction: rowDelta !== 0 || colDelta !== 0 ? { row: rowDelta, col: colDelta } : null,
      };
    }
  }

  // If the drag point drifts into an irregular or non-straight cell, retain the last valid straight path
  if (previousPath && previousPath.length > 0) {
    const lastCell = previousPath[previousPath.length - 1];
    return {
      path: previousPath,
      direction: {
        row: Math.sign(lastCell.row - start.row),
        col: Math.sign(lastCell.col - start.col),
      },
    };
  }

  return { path: [start], direction: null };
}

/**
 * Converts screen touch coordinates (pageX, pageY) into grid row/column
 * based on actual rendered grid origin and dimensions on screen.
 * Clamps coordinates to valid grid boundaries.
 */
export function getCellFromTouchPosition(
  pageX: number,
  pageY: number,
  bounds: GridScreenBounds,
  size: number,
): GridCell | null {
  if (bounds.width <= 0 || bounds.height <= 0 || size <= 0) {
    return null;
  }

  const localX = pageX - bounds.left;
  const localY = pageY - bounds.top;

  const cellWidth = bounds.width / size;
  const cellHeight = bounds.height / size;

  let col = Math.floor(localX / cellWidth);
  let row = Math.floor(localY / cellHeight);

  // Clamp to grid boundaries so dragging near edges tracks accurately
  col = Math.max(0, Math.min(size - 1, col));
  row = Math.max(0, Math.min(size - 1, row));

  return { row, col };
}
