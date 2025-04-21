import { ColorValue } from 'react-native';

export type Themes = {
  light: ThemeColors;
  dark: ThemeColors;
};

export type ThemeColors = {
  // Core
  background: ColorValue;
  color: ColorValue;

  // Primary palette
  primary: ColorValue;
  primaryContrast: ColorValue;
  primaryHighlight: ColorValue;

  // Secondary palette
  secondary: ColorValue;
  secondaryContrast: ColorValue;
  secondaryHighlight: ColorValue;

  // States
  checked: ColorValue;
  disabled: ColorValue;
  disabledText: ColorValue;
  hover: ColorValue;

  // Feedback
  error: ColorValue;
  errorContrast: ColorValue;
  success: ColorValue;
  successContrast: ColorValue;
  warning: ColorValue;
  warningContrast: ColorValue;
  info: ColorValue;
  infoContrast: ColorValue;

  // Neutrals
  muted: ColorValue;
  border: ColorValue;
  shadow: ColorValue;
};

export const themes: Themes = {
  light: {
    background: '#FFFFFF',
    color: '#111111',

    primary: '#4F46E5',
    primaryContrast: '#FFFFFF',
    primaryHighlight: '#6366F1',

    secondary: '#E0E7FF',
    secondaryContrast: '#1E1E1E',
    secondaryHighlight: '#C7D2FE',

    checked: '#4F46E5',
    disabled: '#E5E7EB',
    disabledText: '#9CA3AF',
    hover: '#F3F4F6',

    error: '#DC2626',
    errorContrast: '#FFFFFF',
    success: '#16A34A',
    successContrast: '#FFFFFF',
    warning: '#F59E0B',
    warningContrast: '#1E293B',
    info: '#3B82F6',
    infoContrast: '#FFFFFF',

    muted: '#6B7280',
    border: '#E5E7EB',
    shadow: 'rgba(0,0,0,0.1)',
  },

  dark: {
    background: '#1E1E1E',
    color: '#F3F4F6',

    primary: '#6366F1',
    primaryContrast: '#FFFFFF',
    primaryHighlight: '#818CF8',

    secondary: '#2C2C3E',
    secondaryContrast: '#FFFFFF',
    secondaryHighlight: '#4B5563',

    checked: '#818CF8',
    disabled: '#374151',
    disabledText: '#9CA3AF',
    hover: '#374151',

    error: '#EF4444',
    errorContrast: '#1E1E1E',
    success: '#22C55E',
    successContrast: '#1E1E1E',
    warning: '#FBBF24',
    warningContrast: '#1E1E1E',
    info: '#60A5FA',
    infoContrast: '#1E1E1E',

    muted: '#9CA3AF',
    border: '#4B5563',
    shadow: 'rgba(0,0,0,0.4)',
  },
};
