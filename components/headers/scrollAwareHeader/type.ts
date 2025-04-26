import { SharedValue, StyleProps } from 'react-native-reanimated';

/**
 * Props for the ScrollAwareHeader component
 */
export interface ScrollAwareHeaderProps {
  children: React.ReactNode;
  scrollY: SharedValue<number>;
  isScrollingUp: SharedValue<boolean>;
  height?: number;
  fadeDistance?: number;
  containerStyle?: StyleProps;
  showBackButton?: boolean;
  childrenContainerStyle?: StyleProps;
}
