import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AnnotationTag } from '@/components/annotation-tag';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { DUEL_MS } from '@/games/ludo/engine';
import { LudoDuelQuestion, LudoPlayerConfig } from '@/games/ludo/types';
import { useTheme } from '@/hooks/use-theme';

interface LudoDuelOverlayProps {
  question: LudoDuelQuestion;
  attacker: LudoPlayerConfig;
  defender: LudoPlayerConfig;
  elapsedMs: number;
  attackerChoice: number | null;
  defenderChoice: number | null;
  result: string | null;
  onAnswer: (role: 'attacker' | 'defender', choice: number) => void;
}

export function LudoDuelOverlay({
  question,
  attacker,
  defender,
  elapsedMs,
  attackerChoice,
  defenderChoice,
  result,
  onAnswer,
}: LudoDuelOverlayProps) {
  const theme = useTheme();
  const remaining = Math.max(0, Math.ceil((DUEL_MS - elapsedMs) / 1000));

  return (
    <View style={styles.overlay}>
      <ScrollView contentContainerStyle={styles.overlayInner} bounces={false}>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
        <AnnotationTag label="Historical duel · 5 seconds" variant="accent" />
        <View style={styles.vsRow}>
          <View style={styles.side}>
            <View style={[styles.dot, { backgroundColor: attacker.color }]} />
            <ThemedText type="smallBold">{attacker.name}</ThemedText>
            <ThemedText type="caption" themeColor="textMuted">
              ATTACK
            </ThemedText>
          </View>
          <ThemedText type="annotation">VS</ThemedText>
          <View style={styles.side}>
            <View style={[styles.dot, { backgroundColor: defender.color }]} />
            <ThemedText type="smallBold">{defender.name}</ThemedText>
            <ThemedText type="caption" themeColor="textMuted">
              DEFEND
            </ThemedText>
          </View>
        </View>
        <ThemedText type="heroDisplay" style={styles.count}>
          {remaining}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {question.question}
        </ThemedText>
        {result ? (
          <ThemedText type="smallBold" style={{ color: theme.primary }}>
            {result}
          </ThemedText>
        ) : (
          <View style={styles.columns}>
            <AnswerColumn
              label="Attacker"
              locked={attackerChoice !== null}
              selected={attackerChoice}
              choices={question.choices}
              onSelect={(index) => onAnswer('attacker', index)}
            />
            <AnswerColumn
              label="Defender"
              locked={defenderChoice !== null}
              selected={defenderChoice}
              choices={question.choices}
              onSelect={(index) => onAnswer('defender', index)}
            />
          </View>
        )}
      </View>
      </ScrollView>
    </View>
  );
}

function AnswerColumn({
  label,
  locked,
  selected,
  choices,
  onSelect,
}: {
  label: string;
  locked: boolean;
  selected: number | null;
  choices: string[];
  onSelect: (index: number) => void;
}) {
  const theme = useTheme();
  return (
    <View style={styles.column}>
      <ThemedText type="annotation" themeColor="textMuted">
        {label}
      </ThemedText>
      {choices.map((choice, index) => {
        const isSelected = selected === index;
        return (
          <Pressable
            key={`${label}-${choice}`}
            disabled={locked}
            onPress={() => onSelect(index)}
            style={[
              styles.choice,
              {
                backgroundColor: isSelected ? theme.primaryLight : theme.background,
                borderColor: isSelected ? theme.primary : theme.border,
              },
            ]}>
            <ThemedText type="caption">{choice}</ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill as any,
    backgroundColor: 'rgba(36, 54, 36, 0.4)',
    justifyContent: 'center',
    padding: Spacing.three,
    zIndex: 30,
  },
  overlayInner: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.three,
    gap: Spacing.two,
    maxHeight: '100%',
  },
  vsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  side: {
    alignItems: 'center',
    flex: 1,
    gap: 2,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  count: {
    textAlign: 'center',
    fontSize: 48,
    lineHeight: 52,
  },
  columns: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  column: {
    flex: 1,
    gap: Spacing.one,
  },
  choice: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.two,
  },
});
