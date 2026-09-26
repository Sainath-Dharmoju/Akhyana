import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnnotationTag } from '@/components/annotation-tag';
import { Button } from '@/components/button';
import { HairlineDivider } from '@/components/hairline-divider';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, MaxContentWidth, Spacing } from '@/constants/theme';
import { getYearsWithQuestions, hasYearQuestions } from '@/data/year-duel-questions';
import { seatsForPlayerCount } from '@/games/ludo/engine';
import { setLudoSetup } from '@/games/ludo/session';
import { LudoPlayerConfig } from '@/games/ludo/types';
import { useTheme } from '@/hooks/use-theme';

const PLAYER_COLORS = ['#C05621', '#2B6CB0', '#2F855A', '#B7791F'];
const POPULAR_YEARS = [1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959];

export default function LudoSetupScreen() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState<2 | 3 | 4>(2);
  const [selectedYear, setSelectedYear] = useState<number>(1956);
  const [customYearInput, setCustomYearInput] = useState<string>('');

  const seats = useMemo(() => seatsForPlayerCount(count), [count]);
  const availableYears = useMemo(() => getYearsWithQuestions(), []);

  const effectiveYear = useMemo(() => {
    const custom = parseInt(customYearInput.trim(), 10);
    if (!isNaN(custom) && custom > 0) return custom;
    return selectedYear;
  }, [customYearInput, selectedYear]);

  const yearHasQuestions = useMemo(() => hasYearQuestions(effectiveYear), [effectiveYear]);

  const start = () => {
    const players: LudoPlayerConfig[] = seats.map((seat, index) => ({
      seat,
      name: `Player ${index + 1}`,
      civilizationId: `player-${index + 1}`,
      civilizationName: `Player ${index + 1}`,
      color: PLAYER_COLORS[seat] ?? PLAYER_COLORS[index % PLAYER_COLORS.length],
    }));
    setLudoSetup(players, effectiveYear);
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
              Local pass-and-play. Captures pause for a Historical Duel on your selected year.
            </ThemedText>
          </View>

          <HairlineDivider verticalMargin="md" />

          {/* PLAYERS */}
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

          <HairlineDivider verticalMargin="md" />

          {/* YEAR SELECTION (Replaces Empire Selection) */}
          <View style={styles.section}>
            <ThemedText type="sectionHeader">QUIZ YEAR</ThemedText>
            <ThemedText type="caption" themeColor="textSecondary">
              Select or enter the specific year for all historical duels in this match.
            </ThemedText>

            <View style={styles.yearGrid}>
              {POPULAR_YEARS.map((y) => {
                const isSelected = effectiveYear === y && !customYearInput.trim();
                const supported = availableYears.includes(y);
                return (
                  <Pressable
                    key={y}
                    onPress={() => {
                      setSelectedYear(y);
                      setCustomYearInput('');
                    }}
                    style={[
                      styles.yearChip,
                      {
                        backgroundColor: isSelected ? theme.primaryLight : theme.card,
                        borderColor: isSelected ? theme.primary : theme.cardBorder,
                      },
                    ]}>
                    <ThemedText type="smallBold">{y}</ThemedText>
                    {supported ? (
                      <ThemedText type="annotation" themeColor="textMuted">READY</ThemedText>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.customYearRow}>
              <ThemedText type="caption" themeColor="textSecondary">Or enter year:</ThemedText>
              <TextInput
                style={[
                  styles.yearInput,
                  {
                    color: theme.text,
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
                placeholder="e.g. 1956"
                placeholderTextColor={theme.textMuted}
                keyboardType="numeric"
                value={customYearInput}
                onChangeText={setCustomYearInput}
                maxLength={4}
              />
            </View>

            <View style={[styles.activeYearBadge, { backgroundColor: theme.primaryLight, borderColor: theme.primary }]}>
              <ThemedText type="smallBold">Active Quiz Year: {effectiveYear}</ThemedText>
              {!yearHasQuestions ? (
                <AnnotationTag label="No verified questions yet" variant="accent" />
              ) : (
                <AnnotationTag label="Verified questions available" variant="highlight" />
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Button
              title="Start match"
              size="lg"
              onPress={start}
              disabled={!yearHasQuestions}
            />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
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
  yearGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  yearChip: {
    width: '30%',
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.two,
    alignItems: 'center',
    gap: 2,
  },
  customYearRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, marginTop: Spacing.two },
  yearInput: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    minWidth: 100,
    fontSize: 16,
  },
  activeYearBadge: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.three,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.two,
  },
});
