import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface EditorialCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  variant?: 'default' | 'highlight' | 'muted' | 'accent';
  noPadding?: boolean;
}

export function EditorialCard({
  children,
  style,
  onPress,
  variant = 'default',
  noPadding = false,
}: EditorialCardProps) {
  const theme = useTheme();

  let backgroundColor: string = theme.card;
  let borderColor: string = theme.cardBorder;

  if (variant === 'highlight') {
    backgroundColor = theme.primaryLight;
    borderColor = theme.secondary;
  } else if (variant === 'accent') {
    backgroundColor = theme.accentLight;
    borderColor = theme.accent;
  } else if (variant === 'muted') {
    backgroundColor = theme.backgroundElement;
    borderColor = theme.border;
  }

  const content = (
    <View
      style={[
        styles.card,
        {
          backgroundColor,
          borderColor,
        },
        noPadding && styles.noPadding,
        style,
      ]}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: BorderRadius.xl,
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.four,
    overflow: 'hidden',
  },
  noPadding: {
    padding: 0,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});
