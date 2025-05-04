import { withTiming } from 'react-native-reanimated';

export const snapHeader = (value: number, height: number) => {
  'worklet';
  return value < -height / 2
    ? withTiming(-height, { duration: 150 })
    : withTiming(0, { duration: 150 });
};
