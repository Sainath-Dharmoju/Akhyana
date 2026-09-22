import { LudoSeat, PLAYER_START_INDEX, TRACK_LENGTH } from './types';

export interface BoardCell {
  row: number;
  col: number;
}

/** Clockwise 52-square circuit on a 15×15 board. */
export const TRACK_CELLS: BoardCell[] = [
  { row: 13, col: 6 },
  { row: 12, col: 6 },
  { row: 11, col: 6 },
  { row: 10, col: 6 },
  { row: 9, col: 6 },
  { row: 8, col: 5 },
  { row: 8, col: 4 },
  { row: 8, col: 3 },
  { row: 8, col: 2 },
  { row: 8, col: 1 },
  { row: 8, col: 0 },
  { row: 7, col: 0 },
  { row: 6, col: 0 },
  { row: 6, col: 1 },
  { row: 6, col: 2 },
  { row: 6, col: 3 },
  { row: 6, col: 4 },
  { row: 6, col: 5 },
  { row: 5, col: 6 },
  { row: 4, col: 6 },
  { row: 3, col: 6 },
  { row: 2, col: 6 },
  { row: 1, col: 6 },
  { row: 0, col: 6 },
  { row: 0, col: 7 },
  { row: 0, col: 8 },
  { row: 1, col: 8 },
  { row: 2, col: 8 },
  { row: 3, col: 8 },
  { row: 4, col: 8 },
  { row: 5, col: 8 },
  { row: 6, col: 9 },
  { row: 6, col: 10 },
  { row: 6, col: 11 },
  { row: 6, col: 12 },
  { row: 6, col: 13 },
  { row: 6, col: 14 },
  { row: 7, col: 14 },
  { row: 8, col: 14 },
  { row: 8, col: 13 },
  { row: 8, col: 12 },
  { row: 8, col: 11 },
  { row: 8, col: 10 },
  { row: 8, col: 9 },
  { row: 9, col: 8 },
  { row: 10, col: 8 },
  { row: 11, col: 8 },
  { row: 12, col: 8 },
  { row: 13, col: 8 },
  { row: 14, col: 8 },
  { row: 14, col: 7 },
  { row: 14, col: 6 },
];

export const HOME_PATH_CELLS: Record<LudoSeat, BoardCell[]> = {
  0: [
    { row: 13, col: 7 },
    { row: 12, col: 7 },
    { row: 11, col: 7 },
    { row: 10, col: 7 },
    { row: 9, col: 7 },
  ],
  1: [
    { row: 7, col: 1 },
    { row: 7, col: 2 },
    { row: 7, col: 3 },
    { row: 7, col: 4 },
    { row: 7, col: 5 },
  ],
  2: [
    { row: 1, col: 7 },
    { row: 2, col: 7 },
    { row: 3, col: 7 },
    { row: 4, col: 7 },
    { row: 5, col: 7 },
  ],
  3: [
    { row: 7, col: 13 },
    { row: 7, col: 12 },
    { row: 7, col: 11 },
    { row: 7, col: 10 },
    { row: 7, col: 9 },
  ],
};

export const FINISH_CELLS: Record<LudoSeat, BoardCell> = {
  0: { row: 8, col: 7 },
  1: { row: 7, col: 6 },
  2: { row: 6, col: 7 },
  3: { row: 7, col: 8 },
};

export const BASE_CELLS: Record<LudoSeat, BoardCell[]> = {
  0: [
    { row: 11, col: 2 },
    { row: 11, col: 3 },
    { row: 12, col: 2 },
    { row: 12, col: 3 },
  ],
  1: [
    { row: 2, col: 2 },
    { row: 2, col: 3 },
    { row: 3, col: 2 },
    { row: 3, col: 3 },
  ],
  2: [
    { row: 2, col: 11 },
    { row: 2, col: 12 },
    { row: 3, col: 11 },
    { row: 3, col: 12 },
  ],
  3: [
    { row: 11, col: 11 },
    { row: 11, col: 12 },
    { row: 12, col: 11 },
    { row: 12, col: 12 },
  ],
};

export const BASE_AREAS: Record<LudoSeat, { row: number; col: number; size: number }> = {
  0: { row: 9, col: 0, size: 6 },
  1: { row: 0, col: 0, size: 6 },
  2: { row: 0, col: 9, size: 6 },
  3: { row: 9, col: 9, size: 6 },
};

export function trackIndexForDistance(seat: LudoSeat, distance: number): number | null {
  if (distance < 0 || distance > 50) return null;
  return (PLAYER_START_INDEX[seat] + distance) % TRACK_LENGTH;
}

export function cellForToken(seat: LudoSeat, index: number, distance: number): BoardCell {
  if (distance < 0) return BASE_CELLS[seat][index];
  if (distance >= 56) return FINISH_CELLS[seat];
  if (distance >= 51) return HOME_PATH_CELLS[seat][distance - 51];
  const trackIndex = trackIndexForDistance(seat, distance);
  return TRACK_CELLS[trackIndex ?? 0];
}

export function isPathCell(row: number, col: number): boolean {
  if (row >= 6 && row <= 8) return true;
  if (col >= 6 && col <= 8) return true;
  return false;
}
