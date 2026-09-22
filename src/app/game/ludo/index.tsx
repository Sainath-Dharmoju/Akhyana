import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnnotationTag } from '@/components/annotation-tag';
import { Button } from '@/components/button';
import { HairlineDivider } from '@/components/hairline-divider';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, MaxContentWidth, Spacing } from '@/constants/theme';
import { LUDO_CIVILIZATIONS } from '@/data/ludo';
import { seatsForPlayerCount } from '@/games/ludo/engine';
import { setLudoSetup } from '@/games/ludo/session';
import { LudoPlayerConfig, LudoSeat } from '@/games/ludo/types';
import { useTheme } from '@/hooks/use-theme';

export default function LudoSetupScreen() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState<2 | 3 | 4>(2);
  const [civBySeat, setCivBySeat] = useState<Record<number, string>>({
    0: 'indus',
    1: 'maurya',
    2: 'chola',
    3: 'gupta',
  });

  const seats = useMemo(() => seatsForPlayerCount(count), [count]);

  const start = () => {
    const players: LudoPlayerConfig[] = seats.map((seat, index) => {
      const civ =
        LUDO_CIVILIZATIONS.find((item) => item.id === civBySeat[seat]) ?? LUDO_CIVILIZATIONS[index];
      return {
        seat,
        name: `Player ${index + 1}`,
        civilizationId: civ.id,
        civilizationName: civ.name,
        color: civ.color,
      };
    });
    setLudoSetup(players);
    router.push('/game/ludo/play');
  };

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
              LUDO
            </ThemedText>
            <ThemedText type="editorialLead" themeColor="textSecondary">
              Legends of Civilization. Local pass-and-play. Captures pause for a 5-second Historical Duel.
            </ThemedText>
          </View>
          <HairlineDivider verticalMargin="md" />
          <View style={styles.section}>
            <ThemedText type="sectionHeader">PLAYERS</ThemedText>
            <View style={styles.row}>
              {([2, 3, 4] as const).map((value) => (
                <Pressable
                  key={value}
                  onPress={() => setCount(value)}
                  style={[
                    styles.countChip,
                    {
                      backgroundColor: count === value ? theme.primaryLight : theme.card,
                      borderColor: count === value ? theme.primary : theme.border,
                    },
                  ]}>
                  <ThemedText type="smallBold">{value}</ThemedText>
                </Pressable>
              ))}
            </View>
          </View>
          {seats.map((seat, index) => (
            <PlayerCivPicker
              key={seat}
              seat={seat}
              label={`Player ${index + 1}`}
              selectedId={civBySeat[seat]}
              onSelect={(id) => setCivBySeat((current) => ({ ...current, [seat]: id }))}
            />
          ))}
          <View style={styles.section}>
            <Button title="Start match" size="lg" onPress={start} />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function PlayerCivPicker({
  seat,
  label,
  selectedId,
  onSelect,
}: {
  seat: LudoSeat;
  label: string;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const theme = useTheme();
  return (
    <View style={styles.section}>
      <ThemedText type="smallBold">{label}</ThemedText>
      <View style={styles.civList}>
        {LUDO_CIVILIZATIONS.map((civ) => {
          const selected = civ.id === selectedId;
          return (
            <Pressable
              key={`${seat}-${civ.id}`}
              onPress={() => onSelect(civ.id)}
              style={[
                styles.civCard,
                {
                  backgroundColor: selected ? theme.primaryLight : theme.card,
                  borderColor: selected ? civ.color : theme.cardBorder,
                },
              ]}>
              <View style={[styles.swatch, { backgroundColor: civ.color }]} />
              <ThemedText type="caption">{civ.short}</ThemedText>
              {selected ? <AnnotationTag label="Selected" variant="highlight" /> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { alignItems: 'center' },
  center: { width: '100%', maxWidth: MaxContentWidth },
  section: { paddingHorizontal: Spacing.four, gap: Spacing.two, marginBottom: Spacing.three },
  title: { letterSpacing: -1 },
  row: { flexDirection: 'row', gap: Spacing.two },
  countChip: {
    width: 56,
    height: 44,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  civList: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  civCard: {
    width: '47%',
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.two,
    gap: 4,
  },
  swatch: { width: 12, height: 12, borderRadius: 6 },
});
