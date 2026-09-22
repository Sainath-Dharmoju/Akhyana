import { Pressable, StyleSheet, View } from 'react-native';
import { useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import type { LearningVideo } from '@/data/types';
import { useTheme } from '@/hooks/use-theme';

interface LearningVideoPlaceholderProps {
  video: LearningVideo;
}

export function LearningVideoPlaceholder({ video }: LearningVideoPlaceholderProps) {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const duration = `${Math.floor(video.durationSeconds / 60)}:${String(video.durationSeconds % 60).padStart(2, '0')}`;

  const handlePress = () => {
    if (video.status === 'available') {
      setIsPlaying((playing) => !playing);
      return;
    }
    setIsPlaying(true);
    setIsComplete(true);
  };

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => [styles.container, { backgroundColor: theme.primary }, pressed && styles.pressed]}>
      <View style={[styles.orbit, { borderColor: theme.secondary }]} />
      <View style={[styles.playButton, { backgroundColor: theme.card }]}>
        <ThemedText type="editorialHeader" style={{ color: theme.primary }}>{isPlaying ? 'Ⅱ' : '▶'}</ThemedText>
      </View>
      <View style={styles.copy}>
        <ThemedText type="annotation" style={{ color: theme.secondary }}>2D STORY FILM · {duration}</ThemedText>
        <ThemedText type="cardTitle" style={{ color: theme.primaryText }}>{video.title}</ThemedText>
        <ThemedText type="caption" style={{ color: theme.primaryLight }}>
          {isComplete ? 'Story preview completed. Continue to the evidence.' : video.posterLabel}
        </ThemedText>
      </View>
      {video.status === 'planned' && <ThemedText type="annotation" style={[styles.status, { color: theme.primaryLight }]}>FILM PREVIEW</ThemedText>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { minHeight: 210, borderRadius: BorderRadius.xl, overflow: 'hidden', padding: Spacing.four, justifyContent: 'flex-end', gap: Spacing.one },
  orbit: { position: 'absolute', width: 260, height: 260, borderRadius: 130, borderWidth: 32, right: -78, top: -92, opacity: 0.65 },
  playButton: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.two },
  copy: { gap: 4, maxWidth: '78%' }, status: { position: 'absolute', right: Spacing.three, top: Spacing.three }, pressed: { opacity: 0.9 },
});
