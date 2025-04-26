import { SharedValue } from 'react-native-reanimated';

/**
 * Props for TimelineHeader component
 */
export interface TimelineHeaderProps {
  scrollY: SharedValue<number>;
  isScrollingUp: SharedValue<boolean>;
  headerHeight: number;
}
