import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ExperienceMode } from '@/data/types';
import { useTheme } from '@/hooks/use-theme';

interface ExperienceModeBadgeProps {
  mode: ExperienceMode;
  compact?: boolean;
}

const MODE_LABELS: Record<ExperienceMode, string> = {
  explore: 'MODE: EXPLORE',
  story: 'MODE: STORY',
  discover: 'MODE: DISCOVER',
  reconstruct: 'MODE: RECONSTRUCT',
};

export function ExperienceModeBadge({ mode }: ExperienceModeBadgeProps) {
  const theme = useTheme();
  const label = MODE_LABELS[mode] || 'MODE: EXPLORE';

  return (
    <View style={styles.container}>
      <ThemedText type="annotation" style={{ color: theme.secondary }}>
        [{label}]
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
});
