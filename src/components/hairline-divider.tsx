import { StyleSheet, View, ViewStyle } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface HairlineDividerProps {
  style?: ViewStyle;
  verticalMargin?: 'none' | 'sm' | 'md' | 'lg';
}

export function HairlineDivider({ style, verticalMargin = 'md' }: HairlineDividerProps) {
  const theme = useTheme();

  let marginStyle: ViewStyle = {};
  if (verticalMargin === 'sm') marginStyle = { marginVertical: Spacing.two };
  else if (verticalMargin === 'md') marginStyle = { marginVertical: Spacing.four };
  else if (verticalMargin === 'lg') marginStyle = { marginVertical: Spacing.six };

  return (
    <View
      style={[
        styles.divider,
        { backgroundColor: theme.border },
        marginStyle,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
  },
});

