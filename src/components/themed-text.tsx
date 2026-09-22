import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?:
    | 'default'
    | 'title'
    | 'heroDisplay'
    | 'editorialHeader'
    | 'sectionHeader'
    | 'editorialLead'
    | 'cardTitle'
    | 'small'
    | 'smallBold'
    | 'subtitle'
    | 'link'
    | 'linkPrimary'
    | 'code'
    | 'label'
    | 'annotation'
    | 'statValue'
    | 'caption'
    | 'quote';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'heroDisplay' && styles.heroDisplay,
        type === 'editorialHeader' && styles.editorialHeader,
        type === 'sectionHeader' && styles.sectionHeader,
        type === 'editorialLead' && styles.editorialLead,
        type === 'title' && styles.title,
        type === 'cardTitle' && styles.cardTitle,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && [styles.linkPrimary, { color: theme.accent }],
        type === 'code' && styles.code,
        type === 'label' && styles.label,
        type === 'annotation' && [styles.annotation, { color: theme.textSecondary }],
        type === 'statValue' && styles.statValue,
        type === 'caption' && styles.caption,
        type === 'quote' && styles.quote,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  heroDisplay: {
    fontFamily: Fonts.sans,
    fontSize: 42,
    lineHeight: 45,
    fontWeight: '900',
    letterSpacing: -1.8,
  },
  editorialHeader: {
    fontFamily: Fonts.sans,
    fontSize: 27,
    lineHeight: 33,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  sectionHeader: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 18,
    fontWeight: '800',
    letterSpacing: 1.7,
    textTransform: 'uppercase',
  },
  editorialLead: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  cardTitle: {
    fontFamily: Fonts.sans,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  annotation: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  small: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
  },
  label: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  default: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 44,
    lineHeight: 48,
    fontWeight: '800',
    letterSpacing: -1,
  },
  quote: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    lineHeight: 26,
    fontStyle: 'italic',
  },
  link: {
    lineHeight: 22,
    fontSize: 14,
    fontWeight: '600',
  },
  linkPrimary: {
    lineHeight: 22,
    fontSize: 14,
    fontWeight: '600',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: '700' }) ?? '500',
    fontSize: 12,
  },
});
