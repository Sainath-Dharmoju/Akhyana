import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  HERITAGE_CATEGORIES,
  getFeaturedArticle,
  searchHeritageArticles,
} from '@/data/heritage-voices';
import { HeritageArticleCard } from '@/components/heritage-voices/HeritageArticleCard';
import { Colors, Spacing } from '@/constants/theme';

export default function HeritageVoicesScreen() {
  const colors = Colors.light;
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const featured = getFeaturedArticle();
  const articles = searchHeritageArticles(searchQuery, selectedCategory);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={[styles.headerIcon]}>🏛️</Text>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Heritage Voices</Text>
          </View>
          <Text style={[styles.headerSubtitle, { color: colors.oliveDark }]}>
            Research. Perspectives. Discoveries.
          </Text>
          <Text style={[styles.headerDesc, { color: colors.textSecondary }]}>
            A curated space for historians, archaeologists, researchers, and heritage experts to share their work and perspectives.
          </Text>
        </View>

        {/* Submit Action Banner */}
        <Pressable
          style={({ pressed }) => [
            styles.submitBanner,
            { backgroundColor: colors.sageLight, borderColor: colors.cardBorder },
            pressed && { opacity: 0.8 },
          ]}
          onPress={() => router.push('/heritage-voices/submit')}>
          <View style={styles.submitBannerContent}>
            <Text style={[styles.submitBannerTitle, { color: colors.oliveDeep }]}>
              Are you a qualified heritage researcher?
            </Text>
            <Text style={[styles.submitBannerSubtitle, { color: colors.textSecondary }]}>
              Submit research articles for editorial review.
            </Text>
          </View>
          <Text style={[styles.submitBannerAction, { color: colors.primary }]}>Submit →</Text>
        </Pressable>

        {/* Search Input */}
        <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search articles, authors, topics, or tags..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <Pressable onPress={() => setSearchQuery('')}>
              <Text style={{ color: colors.textMuted, fontSize: 16 }}>✕</Text>
            </Pressable>
          ) : null}
        </View>

        {/* Categories Bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesBar}>
          {HERITAGE_CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              style={[
                styles.categoryChip,
                { borderColor: colors.cardBorder, backgroundColor: colors.card },
                selectedCategory === cat && { backgroundColor: colors.primary, borderColor: colors.primary },
              ]}
              onPress={() => setSelectedCategory(cat)}>
              <Text
                style={[
                  styles.categoryText,
                  { color: selectedCategory === cat ? '#FFFFFF' : colors.text },
                ]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Featured Article Section (Only shown when not searching and on 'All') */}
        {!searchQuery && selectedCategory === 'All' && featured && (
          <View style={styles.section}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>Featured Article</Text>
            <HeritageArticleCard article={featured} featured />
          </View>
        )}

        {/* Articles List */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: colors.text }]}>
            {searchQuery || selectedCategory !== 'All' ? 'Articles' : 'Recent Articles'}
          </Text>

          {articles.length > 0 ? (
            articles.map((art) => <HeritageArticleCard key={art.id} article={art} />)
          ) : (
            <View style={[styles.emptyBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No articles found</Text>
              <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
                {selectedCategory !== 'All'
                  ? 'No Heritage Voices articles are currently available in this category.'
                  : 'Try another search query or category filter.'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    fontSize: 26,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  headerDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },
  submitBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 14,
  },
  submitBannerContent: {
    flex: 1,
    gap: 2,
  },
  submitBannerTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  submitBannerSubtitle: {
    fontSize: 11,
  },
  submitBannerAction: {
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    padding: 0,
  },
  categoriesBar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  emptyBox: {
    padding: 24,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
  },
});
