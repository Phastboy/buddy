import { ViewStyle } from 'react-native';

export interface StickySnapHeaderProps {
  height?: number;
  headerStyle?: ViewStyle;
  headerChildren: React.ReactNode;
  children: React.ReactNode;
}
