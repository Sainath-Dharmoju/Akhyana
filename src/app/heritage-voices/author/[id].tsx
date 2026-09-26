import React from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeritageExpertById, getArticlesByAuthor } from '@/data/heritage-voices';
import { HeritageVerificationBadge } from '@/components/heritage-voices/HeritageVerificationBadge';
import { HeritageArticleCard } from '@/components/heritage-voices/HeritageArticleCard';
import { Colors } from '@/constants/theme';

export default function AuthorProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = Colors.light;

  const expert = id ? getHeritageExpertById(id) : undefined;
  const articles = id ? getArticlesByAuthor(id) : [];

  if (!expert) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background, paddingTop: insets.top }]}>
        <Text style={[styles.notFoundTitle, { color: colors.text }]}>Author Not Found</Text>
        <Pressable onPress={() => router.back()} style={styles.backLink}>
          <Text style={{ color: colors.primary, fontWeight: '700' }}>← Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 60 },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Navigation */}
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backBtnText, { color: colors.oliveDark }]}>← Back</Text>
        </Pressable>

        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={[styles.avatar, { backgroundColor: colors.sageLight }]}>
            <Text style={[styles.avatarText, { color: colors.oliveDark }]}>
              {expert.name.replace(/^(Dr\.|Prof\.)\s*/, '').charAt(0)}
            </Text>
          </View>
          <Text style={[styles.name, { color: colors.text }]}>{expert.name}</Text>
          {expert.designation && <Text style={[styles.designation, { color: colors.textSecondary }]}>{expert.designation}</Text>}
          {expert.institution && <Text style={[styles.institution, { color: colors.textMuted }]}>{expert.institution}</Text>}

          <View style={styles.badgeRow}>
            <HeritageVerificationBadge status={expert.verificationStatus} showExplanation />
          </View>

          {expert.bio && <Text style={[styles.bio, { color: colors.text }]}>{expert.bio}</Text>}
        </View>

        {/* Credentials Section */}
        {expert.credentials && expert.credentials.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>Verified Credentials</Text>
            <View style={styles.credList}>
              {expert.credentials.map((cred) => (
                <View
                  key={cred.id}
                  style={[styles.credCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                  <Text style={[styles.credTitle, { color: colors.text }]}>{cred.title}</Text>
                  {cred.institution && (
                    <Text style={[styles.credInst, { color: colors.textSecondary }]}>
                      {cred.institution} {cred.year ? `(${cred.year})` : ''}
                    </Text>
                  )}
                  {cred.verificationNote && (
                    <Text style={[styles.credNote, { color: colors.oliveDark }]}>
                      ✓ {cred.verificationNote}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Articles Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: colors.text }]}>
            Articles by {expert.name} ({articles.length})
          </Text>
          {articles.length > 0 ? (
            articles.map((art) => <HeritageArticleCard key={art.id} article={art} />)
          ) : (
            <Text style={{ color: colors.textMuted, fontStyle: 'italic' }}>No articles published yet.</Text>
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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  backLink: {
    marginTop: 10,
  },
  backBtn: {
    paddingVertical: 6,
    marginBottom: 10,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  profileCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '800',
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  designation: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  institution: {
    fontSize: 12,
    textAlign: 'center',
  },
  badgeRow: {
    marginVertical: 6,
  },
  bio: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },
  credList: {
    gap: 8,
  },
  credCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    gap: 4,
  },
  credTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  credInst: {
    fontSize: 12,
  },
  credNote: {
    fontSize: 11,
    marginTop: 2,
  },
});
