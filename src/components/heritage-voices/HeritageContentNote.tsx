import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/theme';

interface Props {
  contentNote?: string;
}

export function HeritageContentNote({ contentNote }: Props) {
  const colors = Colors.light;
  if (!contentNote || !contentNote.trim()) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.warningLight, borderColor: colors.warning }]}>
      <Text style={[styles.title, { color: colors.warning }]}>⚠ Content Note</Text>
      <Text style={[styles.text, { color: colors.text }]}>{contentNote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 4,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 13,
    lineHeight: 19,
  },
});
