import re

with open('src/app/game/ludo/play.tsx', 'r') as f:
    text = f.read()

# Add imports
import_repl = """import { Button } from '@/components/button';
import { RapidFireOverlay } from '@/components/ludo/rapid-fire-overlay';"""
text = text.replace("import { Button } from '@/components/button';", import_repl)

# Add isRapidFire state
state_repl = """
  const defender = state.players.find((player) => player.seat === state.pendingCapture?.defenderSeat);
  const discovery = LUDO_DISCOVERIES.find((item) => item.id === state.pendingDiscovery?.discoveryId);

  const [isRapidFire, setIsRapidFire] = React.useState(false);

  const handleStartRoll = () => {
    setIsRapidFire(true);
  };

  const handleRapidFireComplete = (result: number) => {
    setIsRapidFire(false);
    game.roll(result);
  };
"""
text = text.replace("""  const defender = state.players.find((player) => player.seat === state.pendingCapture?.defenderSeat);
  const discovery = LUDO_DISCOVERIES.find((item) => item.id === state.pendingDiscovery?.discoveryId);""", state_repl)

# Replace the roll call
text = text.replace("onRoll={game.roll}", "onRoll={handleStartRoll}")

# Mount the RapidFireOverlay
render_repl = """
      {isRapidFire && (
        <RapidFireOverlay playerName={game.player.name} onComplete={handleRapidFireComplete} />
      )}
      {state.phase === 'duel' && state.pendingQuestion && attacker && defender ? (
"""
text = text.replace("{state.phase === 'duel' && state.pendingQuestion && attacker && defender ? (", render_repl)

# Change the background and order of elements based on active player
# We want the layout to swap so that TurnBar is near the player's base.
# Player 1 (seat 0) & 4 (seat 3) are at the bottom -> Turn bar below the board.
# Player 2 (seat 1) & 3 (seat 2) are at the top -> Turn bar above the board.
layout_repl = """
                { (game.player.seat === 1 || game.player.seat === 2) && (
                  <LudoTurnBar
                    player={game.player}
                    diceValue={state.diceValue}
                    spinValue={game.diceSpin}
                    canRoll={state.phase === 'rolling' && !state.hasRolled}
                    busy={game.busy}
                    hint={hint}
                    onRoll={handleStartRoll}
                  />
                )}
                <LudoBoard
                  players={state.players}
                  tokens={game.displayTokens}
                  legalIds={game.busy ? [] : game.legalIds}
                  disabled={game.busy || state.phase !== 'selecting'}
                  onTokenPress={game.moveToken}
                />
                { (game.player.seat === 0 || game.player.seat === 3) && (
                  <LudoTurnBar
                    player={game.player}
                    diceValue={state.diceValue}
                    spinValue={game.diceSpin}
                    canRoll={state.phase === 'rolling' && !state.hasRolled}
                    busy={game.busy}
                    hint={hint}
                    onRoll={handleStartRoll}
                  />
                )}
"""

# Replace the specific block of TurnBar and LudoBoard
text = re.sub(r'\<LudoTurnBar.*?\/\>\s*\<LudoBoard.*?\/\>', layout_repl, text, flags=re.DOTALL)

# Add dynamic background to main view
bg_repl = """    <ThemedView style={[styles.screen, { backgroundColor: game.player.color + '1A' }]}>"""
text = text.replace("<ThemedView style={styles.screen}>", bg_repl)

with open('src/app/game/ludo/play.tsx', 'w') as f:
    f.write(text)
