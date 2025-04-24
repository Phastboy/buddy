import { Text, View } from '@/components/Themed';

export default function ChatScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chat</Text>
      <Text>Welcome to the chat!</Text>
      <Text>chat is not implemented yet, stay tuned!</Text>
    </View>
  );
}
