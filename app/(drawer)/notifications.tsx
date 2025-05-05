import NotificationHeader from '@/components/headers/notificationHeader';
import { StickySnapHeader } from '@/components/headers/scrollAwareHeader';
import { ScrollContent } from '@/components/sampleContent';

export default function HomeScreen() {
  return (
    <StickySnapHeader height={64} headerChildren={<NotificationHeader />}>
      <ScrollContent />
    </StickySnapHeader>
  );
}
