import { StyleSheet, View, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface AnnotationTagProps {
  label: string;
  variant?: 'default' | 'accent' | 'highlight';
  style?: ViewStyle;
}

export function AnnotationTag({ label, variant = 'default', style }: AnnotationTagProps) {
  const theme = useTheme();

  let textColor: string = theme.textSecondary;
  let backgroundColor: string = theme.olivePale;
  let borderColor: string = theme.border;
  if (variant === 'accent') textColor = theme.accent;
  if (variant === 'accent') {
    backgroundColor = theme.accentLight;
    borderColor = theme.sage;
  } else if (variant === 'highlight') {
    textColor = theme.primary;
    backgroundColor = theme.primaryLight;
    borderColor = theme.secondary;
  }

  return (
    <View style={[styles.container, { backgroundColor, borderColor }, style]}>
      <ThemedText type="annotation" style={[styles.text, { color: textColor }]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginVertical: 2,
    paddingHorizontal: Spacing.two,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  text: {
    letterSpacing: 1.1,
    fontSize: 10,
    fontWeight: '800',
  },
});
