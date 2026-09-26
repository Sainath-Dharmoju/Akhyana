import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  HERITAGE_CATEGORIES,
  getHeritageArticles,
  searchHeritageArticles,
  getFeaturedArticle,
} from '@/data/heritage-voices';
import { HeritageArticleCard } from '@/components/heritage-voices/HeritageArticleCard';
import { Colors } from '@/constants/theme';

export default function HeritageVoicesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = Colors.light;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = getFeaturedArticle();
  const articles = searchHeritageArticles(searchQuery, selectedCategory);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 80 },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <Text style={[styles.title, { color: colors.text }]}>Heritage Voices</Text>
            <Pressable
              style={[styles.submitBtn, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/heritage-voices/submit')}>
              <Text style={styles.submitBtnText}>+ Write</Text>
            </Pressable>
          </View>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Expert research, perspectives & heritage commentary
          </Text>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search research topics, experts, or tags..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Text style={[styles.clearBtn, { color: colors.textMuted }]}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* Category Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {HERITAGE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <Pressable
                key={cat}
                style={[
                  styles.categoryPill,
                  { borderColor: colors.cardBorder },
                  isSelected && { backgroundColor: colors.primary, borderColor: colors.primary },
                ]}
                onPress={() => setSelectedCategory(cat)}>
                <Text
                  style={[
                    styles.categoryText,
                    { color: isSelected ? '#FFFFFF' : colors.text },
                    isSelected && { fontWeight: '700' },
                  ]}>
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Featured Spotlight (only on empty search and 'All' category) */}
        {!searchQuery && selectedCategory === 'All' && featured && (
          <View style={styles.featuredSection}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>Spotlight Research</Text>
            <HeritageArticleCard article={featured} featured />
          </View>
        )}

        {/* Article Feed */}
        <View style={styles.articlesSection}>
          <Text style={[styles.sectionHeading, { color: colors.text }]}>
            {searchQuery ? 'Search Results' : selectedCategory === 'All' ? 'Recent Observations' : `${selectedCategory} Studies`}
          </Text>

          {articles.length === 0 ? (
            <View style={[styles.emptyBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <Text style={styles.emptyIcon}>🏛️</Text>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No Articles Found</Text>
              <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
                Try adjusting your search terms or selecting a different category.
              </Text>
            </View>
          ) : (
            <View style={styles.articlesList}>
              {articles.map((article) => (
                <HeritageArticleCard key={article.id} article={article} />
              ))}
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
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  submitBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  clearBtn: {
    fontSize: 14,
    paddingHorizontal: 4,
  },
  categoriesScroll: {
    marginBottom: 16,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
    backgroundColor: '#FCFBF4',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
  },
  featuredSection: {
    marginBottom: 20,
  },
  articlesSection: {
    gap: 10,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },
  articlesList: {
    gap: 12,
  },
  emptyBox: {
    padding: 28,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 6,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptyDesc: {
    fontSize: 13,
    textAlign: 'center',
  },
});
