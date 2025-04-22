import { SharedValue } from 'react-native-reanimated';
import ScrollAwareHeader from './ScrollAwareHeader';
import ThemedView from '../ui/ThemedView';
import ThemedText from '../ui/ThemedText';
import useTheme from '@/utils/useTheme';

export default function NotificationHeader({
  scrollY,
  isScrollingUp,
  headerHeight = 40,
}: {
  scrollY: SharedValue<number>;
  isScrollingUp: SharedValue<boolean>;
  headerHeight?: number;
}) {
  const { colors } = useTheme();
  return (
    <>
      <ScrollAwareHeader
        scrollY={scrollY}
        isScrollingUp={isScrollingUp}
        height={headerHeight}
        showBackButton
        fadeDistance={50}
        childrenContainerStyle={{ justifyContent: 'space-between' }}
      >
        <ThemedView style={{ flex: 1, alignItems: 'center' }}>
          <ThemedText
            style={{ fontSize: 18, fontWeight: 'bold', color: colors.color }}
          >
            Notifications
          </ThemedText>
        </ThemedView>
      </ScrollAwareHeader>
    </>
  );
}
