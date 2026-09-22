import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { RapidFireOverlay } from '@/components/ludo/rapid-fire-overlay';
import { LudoDiscoveryOverlay } from '@/components/ludo/discovery-overlay';
import { LudoDuelOverlay } from '@/components/ludo/duel-overlay';
import { LudoBoard } from '@/components/ludo/ludo-board';
import { LudoTurnBar } from '@/components/ludo/turn-bar';
import { LudoVictoryCard } from '@/components/ludo/victory-card';
import { NotFoundState } from '@/components/not-found-state';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { LUDO_DISCOVERIES } from '@/data/ludo';
import { getLudoSetup } from '@/games/ludo/session';
import { useLudoGame } from '@/hooks/use-ludo-game';

export default function LudoPlayScreen() {
  const setup = getLudoSetup();
  if (!setup || setup.length < 2) return <NotFoundState />;
  return <LudoPlay players={setup} />;
}

function LudoPlay({ players }: { players: NonNullable<ReturnType<typeof getLudoSetup>> }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const game = useLudoGame(players);
  const { state } = game;
  const winner = state.players.find((player) => player.seat === state.winnerSeat);
  const attacker = state.players.find((player) => player.seat === state.pendingCapture?.attackerSeat);

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


  const hint = useMemo(() => {
    if (state.phase === 'rolling') return 'Roll the die. A 6 brings a token out of base and grants another roll.';
    if (state.phase === 'selecting') return 'Tap a highlighted token. Only legal moves can be chosen.';
    if (state.phase === 'duel') return 'Attacker and defender answer the same question. First correct answer wins.';
    if (state.phase === 'discovery') return 'A historical station on the path.';
    return '';
  }, [state.phase]);

  return (
        <ThemedView style={[styles.screen, { backgroundColor: game.player.color + '1A' }]}>
      <ScrollView
        scrollEnabled={state.phase === 'complete'}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top > 0 ? insets.top : Spacing.three,
            paddingBottom: insets.bottom + Spacing.four,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <View style={styles.section}>
            <Button title="← SETUP" size="sm" variant="text" onPress={() => router.replace('/game/ludo')} />
            {state.phase === 'complete' && winner ? (
              <LudoVictoryCard
                winner={winner}
                state={state}
                onReplay={game.reset}
                onReturnToGames={() => router.replace('/games')}
              />
            ) : (
              <>
                
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

                <ThemedText type="caption" themeColor="textMuted">
                  Safe squares are the paler path cells. Capture on other path cells starts a duel.
                </ThemedText>
                <ThemedText type="caption" themeColor="textSecondary">
                  Collection {state.collections[String(state.currentSeat)]?.length ?? 0} · XP{' '}
                  {state.xp[String(game.player.seat)] ?? 0}
                </ThemedText>
              </>
            )}
          </View>
        </View>
      </ScrollView>
      
      {isRapidFire && (
        <RapidFireOverlay playerName={game.player.name} onComplete={handleRapidFireComplete} />
      )}
      {state.phase === 'duel' && state.pendingQuestion && attacker && defender ? (

        <LudoDuelOverlay
          question={state.pendingQuestion}
          attacker={attacker}
          defender={defender}
          elapsedMs={game.duelElapsed}
          attackerChoice={game.duelChoices.attacker}
          defenderChoice={game.duelChoices.defender}
          result={game.duelResult}
          onAnswer={game.answerDuel}
        />
      ) : null}
      {state.phase === 'discovery' && discovery ? (
        <LudoDiscoveryOverlay discovery={discovery} onContinue={game.continueDiscovery} />
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { alignItems: 'center', flexGrow: 1 },
  center: { width: '100%', maxWidth: MaxContentWidth, flex: 1 },
  section: { paddingHorizontal: Spacing.three, gap: Spacing.two, flex: 1 },
});
