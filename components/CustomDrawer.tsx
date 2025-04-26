import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  ExternalPathString,
  RelativePathString,
  useNavigation,
  useRouter,
} from 'expo-router';
import UserAvatar from './headers/userAvatar';
import { useThemeColors } from '@/utils/useThemeColors';
import { Text, View } from './Themed';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface NavItem {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  path: '/profile' | '/settings' | RelativePathString | ExternalPathString;
  activeIcon: string;
  inactiveIcon: string;
}

export function CustomDrawerContent({ items }: { items: NavItem[] }) {
  const router = useRouter();
  const colors = useThemeColors();

  return (
    <DrawerContentScrollView style={{ backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <UserAvatar
            avatarUrl="https://avatars.githubusercontent.com/u/75147299?v=4"
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileHandle}>@johndoe</Text>
        </View>

        {items.map((item) => (
          <DrawerItem
            key={item.label}
            label={() => <Text>{item.label}</Text>}
            icon={({ size }) => (
              <Ionicons
                name={item.icon}
                size={size}
                color={colors.inactiveIcon}
                style={{ marginRight: 16 }}
              />
            )}
            onPress={() =>
              router.push({
                pathname: item.path,
              })
            }
            style={[styles.drawerItem]}
            labelStyle={[styles.drawerLabel]}
          />
        ))}
        <View style={styles.postButton}>
          <Text style={styles.postButtonText}>Log out</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  profileContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileHandle: {
    fontSize: 14,
    color: '#666',
  },
  drawerItem: {
    borderRadius: 30,
    marginVertical: 4,
  },
  activeItem: {
    backgroundColor: 'rgba(29, 155, 240, 0.1)',
  },
  drawerLabel: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: -16,
  },
  activeLabel: {
    color: '#1D9BF0', // Twitter blue
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#1D9BF0',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 10,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
