import { LudoPlayerConfig } from './types';

let pendingSetup: LudoPlayerConfig[] | null = null;
let pendingQuizYear: number | null = null;

/** Store the match setup together with the selected quiz year. */
export function setLudoSetup(players: LudoPlayerConfig[], quizYear: number) {
  pendingSetup = players;
  pendingQuizYear = quizYear;
}

export function getLudoSetup(): LudoPlayerConfig[] | null {
  return pendingSetup;
}

/** Exact quiz year for the active match. Year-based, never empire-based. */
export function getLudoYear(): number | null {
  return pendingQuizYear;
}
