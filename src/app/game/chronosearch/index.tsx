import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ChronoSearchEraCard } from '@/components/chronosearch/era-card';
import { HairlineDivider } from '@/components/hairline-divider';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { getChronoSearchEras } from '@/data/chronosearch';

export default function ChronoSearchEraScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const eras = getChronoSearchEras();

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
        showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <View style={styles.section}>
            <Button title="← BACK TO GAMES" size="sm" variant="text" onPress={() => router.back()} />
            <ThemedText type="heroDisplay" style={styles.title}>
              CHRONOSEARCH
            </ThemedText>
            <ThemedText type="editorialLead" themeColor="textSecondary">
              Hunt Through History. Choose an era, find hidden words, and read the evidence behind each discovery.
            </ThemedText>
          </View>
          <HairlineDivider verticalMargin="md" />
          <View style={styles.list}>
            {eras.map((era) => (
              <ChronoSearchEraCard
                key={era.id}
                era={era}
                onPress={() => router.push(`/game/chronosearch/${era.puzzleId}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
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
    gap: Spacing.two,
  },
  title: {
    letterSpacing: -1,
  },
  list: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
});
