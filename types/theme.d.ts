import { Theme } from '@react-navigation/native';

/**
 * Extends the React Navigation Theme to include custom color properties
 * @module '@react-navigation/native'
 */
declare module '@react-navigation/native' {
  export interface AppTheme extends Theme {
    colors: Theme['colors'] & {
      muted: string;
      activeIcon: string;
      inactiveIcon: string;
    };
  }
}
