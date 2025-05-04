import { StickySnapHeader } from '@/components/headers/scrollAwareHeader';
import TimelineHeader from '@/components/headers/timelineheader';
import { StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <StickySnapHeader
      height={64}
      headerChildren={<TimelineHeader />}
      headerStyle={{ backgroundColor: 'white' }}
    >
      {[...Array(50)].map((_, i) => (
        <Text key={i} style={styles.item}>
          Item {i + 1}
        </Text>
      ))}
    </StickySnapHeader>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
