import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AnnotationTag } from '@/components/annotation-tag';
import { EditorialCard } from '@/components/editorial-card';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { ChronoSearchEra } from '@/games/chronosearch/types';

interface ChronoSearchEraCardProps {
  era: ChronoSearchEra;
  onPress: () => void;
}

export function ChronoSearchEraCard({ era, onPress }: ChronoSearchEraCardProps) {
  return (
    <EditorialCard variant="default" onPress={onPress}>
      <View style={styles.row}>
        <AnnotationTag label={era.periodLabel.toUpperCase()} variant="highlight" />
      </View>
      <ThemedText type="cardTitle" style={styles.title}>
        {era.title}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {era.summary}
      </ThemedText>
      <ThemedText type="caption" themeColor="textMuted" style={styles.focus}>
        {era.focus}
      </ThemedText>
      <ThemedText type="smallBold" style={styles.cta}>
        Begin this era →
      </ThemedText>
    </EditorialCard>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: Spacing.two,
  },
  title: {
    marginBottom: Spacing.one,
  },
  focus: {
    marginTop: Spacing.two,
  },
  cta: {
    marginTop: Spacing.three,
  },
});
