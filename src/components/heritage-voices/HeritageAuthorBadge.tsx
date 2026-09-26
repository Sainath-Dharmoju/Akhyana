import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { HeritageExpert } from '@/types/heritage-voices';
import { HeritageVerificationBadge } from './HeritageVerificationBadge';
import { Colors } from '@/constants/theme';

interface Props {
  expert: HeritageExpert;
  onPress?: () => void;
  showCredentialsButton?: boolean;
}

export function HeritageAuthorBadge({ expert, onPress, showCredentialsButton = false }: Props) {
  const colors = Colors.light;
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/heritage-voices/author/${expert.id}`);
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={[styles.avatar, { backgroundColor: colors.sageLight }]}>
        <Text style={[styles.avatarText, { color: colors.oliveDark }]}>
          {expert.name.replace(/^(Dr\.|Prof\.)\s*/, '').charAt(0)}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.name, { color: colors.text }]}>{expert.name}</Text>
        {expert.designation && (
          <Text style={[styles.designation, { color: colors.textSecondary }]} numberOfLines={1}>
            {expert.designation} {expert.fieldOfExpertise ? `· ${expert.fieldOfExpertise}` : ''}
          </Text>
        )}
        <View style={styles.badgeRow}>
          <HeritageVerificationBadge status={expert.verificationStatus} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
  },
  designation: {
    fontSize: 12,
  },
  badgeRow: {
    marginTop: 2,
  },
});
