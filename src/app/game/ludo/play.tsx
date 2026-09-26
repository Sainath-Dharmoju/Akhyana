import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnnotationTag } from '@/components/annotation-tag';
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
import { BorderRadius, MaxContentWidth, Spacing } from '@/constants/theme';
import { LUDO_DISCOVERIES } from '@/data/ludo';
import { getYearsWithQuestions } from '@/data/year-duel-questions';
import { getLudoSetup } from '@/games/ludo/session';
import { useLudoGame } from '@/hooks/use-ludo-game';
import { useTheme } from '@/hooks/use-theme';

export default function LudoPlayScreen() {
  const setup = getLudoSetup();
  if (!setup || setup.length < 2) return <NotFoundState />;
  return <LudoPlay players={setup} />;
}

function LudoPlay({ players }: { players: NonNullable<ReturnType<typeof getLudoSetup>> }) {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const game = useLudoGame(players);
  const { state } = game;
  const winner = state.players.find((player) => player.seat === state.winnerSeat);
  const attacker = state.players.find((player) => player.seat === state.pendingCapture?.attackerSeat);
  const defender = state.players.find((player) => player.seat === state.pendingCapture?.defenderSeat);
  const discovery = LUDO_DISCOVERIES.find((item) => item.id === state.pendingDiscovery?.discoveryId);

  const [isRapidFire, setIsRapidFire] = useState(false);
  const [showNextYearPicker, setShowNextYearPicker] = useState(false);

  const availableYears = useMemo(() => getYearsWithQuestions(), []);

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
            <View style={styles.topBar}>
              <Button title="← SETUP" size="sm" variant="text" onPress={() => router.replace('/game/ludo')} />
              <View style={styles.yearStatusBadge}>
                <ThemedText type="smallBold">QUIZ: {game.quizYear}</ThemedText>
                {game.quizPhase === 'retry' ? (
                  <AnnotationTag label="RETRY PHASE" variant="accent" />
                ) : game.quizPhase === 'year_complete' ? (
                  <AnnotationTag label="COMPLETED" variant="highlight" />
                ) : null}
              </View>
            </View>

            {/* Year Completion Banner: Appears ONLY when entire year is completed */}
            {game.quizPhase === 'year_complete' ? (
              <View style={[styles.completionBanner, { backgroundColor: theme.card, borderColor: theme.primary }]}>
                <ThemedText type="cardTitle">{game.quizYear} COMPLETED</ThemedText>
                <ThemedText type="caption" themeColor="textSecondary">
                  All questions mastered. Achievement recorded. Select the next year to continue this match.
                </ThemedText>
                <Button
                  title="SELECT NEXT YEAR"
                  size="sm"
                  onPress={() => setShowNextYearPicker(true)}
                />
              </View>
            ) : null}

            {state.phase === 'complete' && winner ? (
              <LudoVictoryCard
                winner={winner}
                state={state}
                onReplay={game.reset}
                onReturnToGames={() => router.replace('/games')}
              />
            ) : (
              <>
                {(game.player.seat === 1 || game.player.seat === 2) && (
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
                {(game.player.seat === 0 || game.player.seat === 3) && (
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

      {/* Next Year Selection Modal (keeps the existing board match completely intact) */}
      <Modal visible={showNextYearPicker} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <ThemedText type="cardTitle">Select Next Quiz Year</ThemedText>
            <ThemedText type="caption" themeColor="textSecondary">
              The current Ludo match continues without resetting. Only the quiz question cycle will update.
            </ThemedText>
            <View style={styles.modalYearList}>
              {availableYears.map((y) => (
                <Pressable
                  key={y}
                  onPress={() => {
                    game.selectNextYear(y);
                    setShowNextYearPicker(false);
                  }}
                  style={[
                    styles.modalYearChip,
                    {
                      backgroundColor: game.quizYear === y ? theme.primaryLight : theme.background,
                      borderColor: game.quizYear === y ? theme.primary : theme.border,
                    },
                  ]}>
                  <ThemedText type="smallBold">{y}</ThemedText>
                </Pressable>
              ))}
            </View>
            <Button title="Cancel" variant="text" size="sm" onPress={() => setShowNextYearPicker(false)} />
          </View>
        </View>
      </Modal>

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
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  yearStatusBadge: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  completionBanner: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.three,
    gap: Spacing.one,
    marginVertical: Spacing.two,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  modalYearList: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  modalYearChip: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
});
