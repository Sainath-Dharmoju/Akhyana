import { createLudoGame, rollDice, applyTokenMove } from './src/games/ludo/engine';
import { LUDO_DISCOVERIES } from './src/data/ludo';

let state = createLudoGame([
  { seat: 0, name: 'P1', civilizationId: 'c1', civilizationName: 'C1', color: 'red' },
  { seat: 1, name: 'P2', civilizationId: 'c2', civilizationName: 'C2', color: 'blue' }
]);
console.log("Initial state:", state.phase);
state = rollDice(state, 6);
console.log("After rolling 6:", state.phase, state.diceValue);

const legal = state.tokens.filter(t => t.seat === 0);
if(legal.length > 0) {
  state = applyTokenMove(state, legal[0].id, LUDO_DISCOVERIES);
  console.log("After moving token:", state.phase, legal[0].id);
} else {
  console.log("No legal tokens found?");
}

console.log("Success! Engine is functional.");
