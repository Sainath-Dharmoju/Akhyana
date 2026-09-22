import { LudoPlayerConfig } from './types';

let pendingSetup: LudoPlayerConfig[] | null = null;

export function setLudoSetup(players: LudoPlayerConfig[]) {
  pendingSetup = players;
}

export function getLudoSetup(): LudoPlayerConfig[] | null {
  return pendingSetup;
}
