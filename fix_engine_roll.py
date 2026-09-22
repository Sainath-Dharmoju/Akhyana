import re

with open('src/games/ludo/engine.ts', 'r') as f:
    text = f.read()

# Change condition to allow 0
replacement = """export function rollDice(state: LudoGameState, value: number): LudoGameState {
  if (state.phase !== 'rolling' || state.hasRolled) return state;
  if (value < 0 || value > 6) return state;

  if (value === 0) {
    return beginTurn(state, nextSeat(state, state.currentSeat));
  }"""

text = re.sub(r'export function rollDice\(state: LudoGameState, value: number\): LudoGameState \{\n\s*if \(state\.phase \!\=\= \'rolling\' \|\| state\.hasRolled\) return state;\n\s*if \(value \< 1 \|\| value \> 6\) return state;', replacement, text)

with open('src/games/ludo/engine.ts', 'w') as f:
    f.write(text)
