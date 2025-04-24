import { Text, View } from '@/components/Themed';

export default function EventsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Events</Text>
      <Text>Welcome to the events!</Text>
      <Text>Events feature is not implemented yet, stay tuned!</Text>
    </View>
  );
}
