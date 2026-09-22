/**
 * Akhyana design tokens.
 * The product intentionally renders as a white-first experience across system appearances.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#263426',
    textSecondary: '#4E5D47',
    textMuted: '#737D68',
    background: '#F4F3E8',
    backgroundElement: '#E8E9DA',
    backgroundSelected: '#D9E1C6',
    card: '#FCFBF4',
    cardBorder: '#CDD2B9',
    primary: '#30452F',
    primaryText: '#FFFFFF',
    primaryLight: '#E0E6D3',
    secondary: '#718154',
    accent: '#657546',
    accentLight: '#E6EAD9',
    accentText: '#445336',
    success: '#587345',
    successLight: '#E1E9D6',
    warning: '#7D7246',
    warningLight: '#EFEBD8',
    border: '#CDD2B9',
    borderStrong: '#AEB99A',
    oliveDeep: '#243624',
    oliveDark: '#30452F',
    olive: '#50613E',
    oliveMedium: '#718154',
    sage: '#AEBB96',
    sageLight: '#D9E1C6',
    olivePale: '#E8E9DA',
    oliveMuted: '#899477',
    surface: '#FCFBF4',
    backgroundSecondary: '#EEF0E2',
  },
  dark: {
    text: '#263426',
    textSecondary: '#4E5D47',
    textMuted: '#737D68',
    background: '#F4F3E8',
    backgroundElement: '#E8E9DA',
    backgroundSelected: '#D9E1C6',
    card: '#FCFBF4',
    cardBorder: '#CDD2B9',
    primary: '#30452F',
    primaryText: '#FFFFFF',
    primaryLight: '#E0E6D3',
    secondary: '#718154',
    accent: '#657546',
    accentLight: '#E6EAD9',
    accentText: '#445336',
    success: '#587345',
    successLight: '#E1E9D6',
    warning: '#7D7246',
    warningLight: '#EFEBD8',
    border: '#CDD2B9',
    borderStrong: '#AEB99A',
    oliveDeep: '#243624',
    oliveDark: '#30452F',
    olive: '#50613E',
    oliveMedium: '#718154',
    sage: '#AEBB96',
    sageLight: '#D9E1C6',
    olivePale: '#E8E9DA',
    oliveMuted: '#899477',
    surface: '#FCFBF4',
    backgroundSecondary: '#EEF0E2',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'Georgia',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'sans-serif-medium',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    serif: '"Georgia", "Times New Roman", serif',
    rounded: 'system-ui, sans-serif',
    mono: 'monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 48,
  seven: 64,
  eight: 80,
  nine: 96,
} as const;

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 18,
  xl: 28,
  full: 9999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
