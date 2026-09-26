import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { HeritageSource } from '@/types/heritage-voices';
import { Colors } from '@/constants/theme';

interface Props {
  sources: HeritageSource[];
}

export function HeritageSourceList({ sources }: Props) {
  const colors = Colors.light;

  if (!sources || sources.length === 0) return null;

  const handleOpenUrl = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Sources & References</Text>
      <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
        Published works and records supporting this article
      </Text>

      <View style={styles.list}>
        {sources.map((src, index) => (
          <View key={src.id || index} style={[styles.sourceCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={styles.badgeRow}>
              <View style={[styles.typeBadge, { backgroundColor: colors.backgroundElement }]}>
                <Text style={[styles.typeText, { color: colors.textSecondary }]}>
                  {src.sourceType.toUpperCase().replace('_', ' ')}
                </Text>
              </View>
              {src.year && <Text style={[styles.yearText, { color: colors.textMuted }]}>{src.year}</Text>}
            </View>
            <Text style={[styles.title, { color: colors.text }]}>{src.title}</Text>
            {src.author && <Text style={[styles.author, { color: colors.textSecondary }]}>Author: {src.author}</Text>}
            {src.publisher && <Text style={[styles.publisher, { color: colors.textMuted }]}>Publisher / Archive: {src.publisher}</Text>}
            {src.url && (
              <TouchableOpacity onPress={() => handleOpenUrl(src.url!)} style={styles.urlRow}>
                <Text style={[styles.urlText, { color: colors.primary }]}>🔗 View External Reference ↗</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  sectionSubtitle: {
    fontSize: 12,
    marginBottom: 10,
    marginTop: 2,
  },
  list: {
    gap: 10,
  },
  sourceCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    gap: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  yearText: {
    fontSize: 11,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  author: {
    fontSize: 12,
  },
  publisher: {
    fontSize: 11,
  },
  urlRow: {
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  urlText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
