import { StickySnapHeader } from '@/components/headers/scrollAwareHeader';
import TimelineHeader from '@/components/headers/timelineheader';
import { ScrollContent } from '@/components/sampleContent';

export default function HomeScreen() {
  return (
    <StickySnapHeader height={64} headerChildren={<TimelineHeader />}>
      <ScrollContent />
    </StickySnapHeader>
  );
}
