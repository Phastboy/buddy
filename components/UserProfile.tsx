import React from 'react';
import { Image, StyleSheet } from 'react-native';
import ThemedView from './ui/ThemedView';
import ThemedText from './ui/ThemedText';

interface UserProfileProps {
  user: {
    name: string;
    avatarUrl: string;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <ThemedView style={styles.container}>
      <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      <ThemedText style={styles.name}>{user.name}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
