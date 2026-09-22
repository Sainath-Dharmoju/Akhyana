import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { ChronoSearchWordDef } from '@/games/chronosearch/types';
import { useTheme } from '@/hooks/use-theme';

interface ChronoSearchWordListProps {
  words: ChronoSearchWordDef[];
  foundIds: ReadonlySet<string>;
}

export function ChronoSearchWordList({ words, foundIds }: ChronoSearchWordListProps) {
  const theme = useTheme();
  const remaining = useMemo(() => words.filter((word) => !foundIds.has(word.id)), [foundIds, words]);
  const found = useMemo(() => words.filter((word) => foundIds.has(word.id)), [foundIds, words]);

    return (
    <View style={styles.wrap}>
      <ThemedText type="sectionHeader" themeColor="text">
        Historical collection
      </ThemedText>
      <View style={styles.chips}>
        {words.map((word) => {
          const isFound = foundIds.has(word.id);
          return (
            <View
              key={word.id}
              style={[
                styles.chip,
                {
                  backgroundColor: isFound ? '#50613E' : 'transparent',
                  borderColor: isFound ? '#50613E' : theme.borderStrong,
                  borderWidth: isFound ? 0 : 1,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                }
              ]}>
              <ThemedText type="smallBold" style={{ color: isFound ? '#FFFFFF' : theme.textMuted }}>
                {isFound ? `✓ ${word.displayLabel}` : `○ ${word.displayLabel}`}
              </ThemedText>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.two,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
});
