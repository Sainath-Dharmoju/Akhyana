import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AkhyanaHeader } from '@/components/akhyana-header';
import { AnnotationTag } from '@/components/annotation-tag';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { TIME_WINDOWS } from '@/data/historical-events';
import { useHistoricalJourney } from '@/hooks/use-active-civilization';
import { useTheme } from '@/hooks/use-theme';

export default function ExploreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { activeDecadeId, setActiveDecadeId } = useHistoricalJourney();
  const [query, setQuery] = useState('');
  const matchingWindows = useMemo(() => {
    const normalized = query.trim().toLowerCase().replace(/s$/, '');
    if (!normalized) return TIME_WINDOWS;
    return TIME_WINDOWS.filter((window) =>
      [window.label.toLowerCase().replace(/s$/, ''), String(window.startYear)].some((value) => value.includes(normalized)),
    );
  }, [query]);

  return <ThemedView style={styles.screen}><ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top || Spacing.four, paddingBottom: insets.bottom + BottomTabInset + Spacing.six }]} showsVerticalScrollIndicator={false}><View style={styles.wrapper}>
    <AkhyanaHeader showTagline={false} subtitle="EXPLORE" />
    <View style={styles.hero}><ThemedText type="annotation" style={{ color: theme.accent }}>AKHYANA TIME BROWSER</ThemedText><ThemedText type="heroDisplay">EXPLORE INDIA{`\n`}THROUGH TIME.</ThemedText><ThemedText type="editorialLead" themeColor="textSecondary">Choose a time window, then open a historically curated event. Opening an event moves you into Learn.</ThemedText></View>
    <View style={styles.section}><ThemedText type="sectionHeader">SEARCH / YEAR / DECADE</ThemedText><View style={[styles.search, { backgroundColor: theme.card, borderColor: theme.border }]}><TextInput value={query} onChangeText={setQuery} placeholder="Search a year or decade..." placeholderTextColor={theme.textMuted} keyboardType="numbers-and-punctuation" autoCapitalize="none" autoCorrect={false} style={[styles.input, { color: theme.text }]} />{query.length > 0 && <Pressable accessibilityRole="button" accessibilityLabel="Clear time-window search" hitSlop={8} onPress={() => setQuery('')} style={styles.clear}><ThemedText type="smallBold" style={{ color: theme.primary }}>CLEAR</ThemedText></Pressable>}</View></View>
    <View style={styles.section}><ThemedText type="sectionHeader">TIME WINDOWS</ThemedText>{matchingWindows.length === 0 ? <View style={[styles.empty, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}><ThemedText type="cardTitle">NO TIME WINDOW FOUND</ThemedText><ThemedText type="small" themeColor="textSecondary">Try 1890s, 1940s, or 2010s.</ThemedText></View> : matchingWindows.map((window) => <Pressable key={window.id} onPress={() => { setActiveDecadeId(window.id); router.push(`/decade/${window.id}`); }} style={({ pressed }) => [styles.card, { backgroundColor: activeDecadeId === window.id ? theme.primaryLight : theme.card, borderColor: activeDecadeId === window.id ? theme.primary : theme.border }, pressed && styles.pressed]}><AnnotationTag label={`${window.startYear}–${window.endYear - 1}`} variant="highlight" /><ThemedText type="editorialHeader">{window.label}</ThemedText><ThemedText type="small" themeColor="textSecondary">{window.description}</ThemedText><ThemedText type="smallBold" style={{ color: theme.primary }}>VIEW EVENTS →</ThemedText></Pressable>)}</View>
  </View></ScrollView></ThemedView>;
}

const styles = StyleSheet.create({ screen: { flex: 1 }, content: { alignItems: 'center' }, wrapper: { width: '100%', maxWidth: MaxContentWidth }, hero: { paddingHorizontal: Spacing.four, paddingTop: Spacing.four, gap: Spacing.two }, section: { paddingHorizontal: Spacing.four, paddingTop: Spacing.six, gap: Spacing.three }, search: { minHeight: 54, borderWidth: 1, borderRadius: BorderRadius.lg, flexDirection: 'row', alignItems: 'center', paddingLeft: Spacing.three, paddingRight: Spacing.two }, input: { flex: 1, minWidth: 0, fontSize: 16, paddingVertical: Spacing.three }, clear: { minHeight: 40, justifyContent: 'center', paddingHorizontal: Spacing.two }, card: { borderWidth: 1, borderRadius: BorderRadius.xl, padding: Spacing.four, gap: Spacing.two }, empty: { borderWidth: 1, borderRadius: BorderRadius.lg, padding: Spacing.four, gap: Spacing.one }, pressed: { opacity: 0.82 } });
