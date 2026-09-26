import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { HeritageExpert } from '@/types/heritage-voices';
import { HeritageVerificationBadge } from './HeritageVerificationBadge';
import { Colors } from '@/constants/theme';

interface Props {
  expert: HeritageExpert;
  showBio?: boolean;
}

export function HeritageAuthorBadge({ expert, showBio = false }: Props) {
  const router = useRouter();
  const colors = Colors.light;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
        pressed && { opacity: 0.8 },
      ]}
      onPress={() => router.push(`/heritage-voices/author/${expert.id}`)}>
      <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
        <Text style={styles.avatarText}>
          {expert.name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')}
        </Text>
      </View>

      <View style={styles.details}>
        <View style={styles.nameRow}>
          <Text style={[styles.name, { color: colors.text }]}>{expert.name}</Text>
          <HeritageVerificationBadge status={expert.verificationStatus} isDemo={expert.isDemo} />
        </View>

        {expert.designation && (
          <Text style={[styles.designation, { color: colors.textSecondary }]}>
            {expert.designation}
            {expert.institution ? ` · ${expert.institution}` : ''}
          </Text>
        )}

        {showBio && expert.bio && (
          <Text style={[styles.bio, { color: colors.textMuted }]} numberOfLines={2}>
            {expert.bio}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  details: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontWeight: '800',
  },
  designation: {
    fontSize: 11,
  },
  bio: {
    fontSize: 11,
    marginTop: 2,
  },
});
