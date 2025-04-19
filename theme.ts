export type Themes = {
  light: ThemeColors;
  dark: ThemeColors;
};

export type ThemeColors = {
  background: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  secondary: string;
  card: string;
  checked: string;
  disabled?: string;
};

export const themes: Themes = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8E8E93',
    primary: '#007AFF',
    secondary: '#5856D6',
    border: '#E5E5EA',
    card: '#F2F2F7',
    checked: '#f0f0f0',
    disabled: '#D1D1D6',
  },
  dark: {
    background: '#000000',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    border: '#38383A',
    card: '#1C1C1E',
    checked: '#1f1f1f',
    disabled: '#2C2C2E',
  },
};
