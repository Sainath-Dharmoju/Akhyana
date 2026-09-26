import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { HeritageArticle } from '@/types/heritage-voices';
import { getHeritageExpertById } from '@/data/heritage-voices';
import { HeritageVerificationBadge } from './HeritageVerificationBadge';
import { HeritageReviewBadge } from './HeritageReviewBadge';
import { Colors } from '@/constants/theme';

interface Props {
  article: HeritageArticle;
  featured?: boolean;
}

export function HeritageArticleCard({ article, featured = false }: Props) {
  const colors = Colors.light;
  const router = useRouter();
  const author = getHeritageExpertById(article.authorId);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
        featured && styles.featuredCard,
        pressed && styles.pressed,
      ]}
      onPress={() => router.push(`/heritage-voices/article/${article.id}`)}>
      <View style={styles.topRow}>
        <View style={[styles.categoryBadge, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.categoryText, { color: colors.primary }]}>{article.category}</Text>
        </View>
        {article.readTimeMinutes && (
          <Text style={[styles.readTime, { color: colors.textMuted }]}>{article.readTimeMinutes} min read</Text>
        )}
      </View>

      <Text style={[styles.title, featured && styles.featuredTitle, { color: colors.text }]}>{article.title}</Text>
      <Text style={[styles.summary, { color: colors.textSecondary }]} numberOfLines={featured ? 3 : 2}>
        {article.summary}
      </Text>

      {article.contentNote && (
        <View style={styles.noteIndicator}>
          <Text style={[styles.noteText, { color: colors.warning }]}>⚠ Sensitive content note attached</Text>
        </View>
      )}

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <View style={styles.authorInfo}>
          <Text style={[styles.authorName, { color: colors.text }]}>{author ? author.name : 'Unknown Author'}</Text>
          {author?.designation && (
            <Text style={[styles.authorDesig, { color: colors.textMuted }]} numberOfLines={1}>
              {author.designation}
            </Text>
          )}
        </View>
        <View style={styles.badgeCol}>
          <HeritageVerificationBadge status={article.verificationStatus} />
          {article.reviewStatus === 'content_reviewed' && <HeritageReviewBadge status={article.reviewStatus} />}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginVertical: 6,
  },
  featuredCard: {
    padding: 20,
    borderWidth: 1.5,
  },
  pressed: {
    opacity: 0.9,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  readTime: {
    fontSize: 11,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 6,
  },
  featuredTitle: {
    fontSize: 19,
    lineHeight: 26,
  },
  summary: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  noteIndicator: {
    marginBottom: 10,
  },
  noteText: {
    fontSize: 11,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderTopWidth: 1,
    paddingTop: 10,
    marginTop: 4,
  },
  authorInfo: {
    flex: 1,
    marginRight: 8,
  },
  authorName: {
    fontSize: 13,
    fontWeight: '700',
  },
  authorDesig: {
    fontSize: 11,
    marginTop: 1,
  },
  badgeCol: {
    gap: 4,
    alignItems: 'flex-end',
  },
});
