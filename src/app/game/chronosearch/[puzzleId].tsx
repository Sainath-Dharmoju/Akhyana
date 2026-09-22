import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ChronoSearchChallengeCard } from '@/components/chronosearch/challenge-card';
import { ChronoSearchCompletionCard } from '@/components/chronosearch/completion-card';
import { ChronoSearchDiscoveryCard } from '@/components/chronosearch/discovery-card';
import { ChronoSearchHud } from '@/components/chronosearch/game-hud';
import { ChronoSearchWordGrid } from '@/components/chronosearch/word-grid';
import { ChronoSearchWordList } from '@/components/chronosearch/word-list';
import { NotFoundState } from '@/components/not-found-state';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { getChronoSearchPuzzle, getEraForPuzzle } from '@/data/chronosearch';
import { useChronoSearchGame } from '@/hooks/use-chronosearch-game';

export default function ChronoSearchPlayScreen() {
  const { puzzleId } = useLocalSearchParams<{ puzzleId: string }>();
  const puzzle = puzzleId ? getChronoSearchPuzzle(puzzleId) : undefined;
  if (!puzzle) return <NotFoundState />;
  return <ChronoSearchPlay puzzle={puzzle} />;
}

function ChronoSearchPlay({
  puzzle,
}: {
  puzzle: NonNullable<ReturnType<typeof getChronoSearchPuzzle>>;
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const era = getEraForPuzzle(puzzle.id);
  const game = useChronoSearchGame(puzzle);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top > 0 ? insets.top : Spacing.four,
            paddingBottom: insets.bottom + Spacing.seven,
          },
        ]}
        scrollEnabled={!isDragging && game.phase === 'playing'}
        canCancelContentTouches={!isDragging}
        showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <View style={styles.section}>
            <Button
              title="← ERAS"
              size="sm"
              variant="text"
              onPress={() => router.replace('/game/chronosearch')}
            />
            {game.phase === 'complete' ? (
              <ChronoSearchCompletionCard
                eraTitle={era?.title ?? 'ChronoSearch'}
                puzzleTitle={puzzle.title}
                wordCount={puzzle.words.length}
                elapsedSeconds={game.elapsedSeconds}
                breakdown={game.breakdown}
                onReplay={game.reset}
                onReturnToGames={() => router.replace('/games')}
              />
            ) : (
              <>
                <ChronoSearchHud
                  eraTitle={era?.title ?? 'ChronoSearch'}
                  puzzleTitle={puzzle.title}
                  score={game.score}
                  elapsedSeconds={game.elapsedSeconds}
                  wordsFound={game.foundIds.length}
                  wordCount={puzzle.words.length}
                />
                <ChronoSearchWordGrid
                  grid={game.grid}
                  selection={game.selection}
                  foundCellKeys={game.foundCellKeys}
                  invalidSelection={game.invalidSelection}
                  interactionEnabled={game.phase === 'playing'}
                  onDragActiveChange={setIsDragging}
                  onSelectionChange={game.setSelection}
                  onSelectionComplete={game.completeSelection}
                />
                <ChronoSearchWordList words={puzzle.words} foundIds={game.foundIdSet} />
              </>
            )}
          </View>
        </View>
      </ScrollView>
      {game.phase === 'discovery' && game.activeWord ? (
        <ChronoSearchDiscoveryCard
          word={game.activeWord}
          xpEarned={game.lastXpAwarded}
          onContinue={game.continueFromDiscovery}
        />
      ) : null}
      {game.phase === 'challenge' && game.activeWord ? (
        <ChronoSearchChallengeCard
          word={game.activeWord}
          selectedIndex={game.challengeChoice}
          xpAwarded={game.lastXpAwarded}
          onSelect={game.selectChallengeChoice}
          onContinue={game.continueFromChallenge}
        />
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  center: {
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  section: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
});
