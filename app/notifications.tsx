import NotificationHeader from '@/components/headers/NotificationHeader';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import useScrollHandler from '@/utils/useScrollHandler';

export default function NotificationScreen() {
  const { scrollY, isScrollingUp } = useScrollHandler();
  return (
    <ThemedView style={{ flex: 1 }}>
      <NotificationHeader scrollY={scrollY} isScrollingUp={isScrollingUp} />
      <ThemedText>Notification Screen</ThemedText>
    </ThemedView>
  );
}
