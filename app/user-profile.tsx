import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import UserProfile from '@/components/UserProfile';

export default function UserProfileScreen() {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <ThemedText>User Profile Screen</ThemedText>
      <UserProfile
        user={{ name: 'John Doe', avatarUrl: 'https://example.com/avatar.jpg' }}
      />
      <ThemedText style={{ marginTop: 20 }}>
        Additional user information can go here.
      </ThemedText>
      <ThemedText style={{ marginTop: 10 }}>
        User's recent activities can be displayed here.
      </ThemedText>
      <ThemedText style={{ marginTop: 15 }}>
        Contact information can also be added here.
      </ThemedText>
    </ThemedView>
  );
}
