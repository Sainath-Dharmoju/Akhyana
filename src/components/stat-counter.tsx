import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface StatCounterProps {
  label: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  variant?: 'default' | 'accent' | 'primary';
}

export function StatCounter({
  label,
  value,
  unit,
  subtitle,
  variant = 'default',
}: StatCounterProps) {
  const theme = useTheme();

  let valueColor: string = theme.text;
  if (variant === 'accent') valueColor = theme.accent;
  else if (variant === 'primary') valueColor = theme.primary;

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
      <ThemedText type="label" themeColor="textSecondary" style={styles.label}>
        {label}
      </ThemedText>

      <View style={styles.valueRow}>
        <ThemedText type="statValue" style={[styles.valText, { color: valueColor }]}>
          {value}
        </ThemedText>
        {unit && (
          <ThemedText type="cardTitle" style={[styles.unitText, { color: valueColor }]}>
            {unit}
          </ThemedText>
        )}
      </View>

      {subtitle && (
        <ThemedText type="caption" themeColor="textMuted">
          {subtitle}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  valText: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
  },
  unitText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
