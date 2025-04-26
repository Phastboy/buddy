import { CustomDrawerContent, NavItem } from '@/components/CustomDrawer';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const navItems: NavItem[] = [
  {
    label: 'Profile',
    icon: 'person',
    path: '/profile',
    activeIcon: 'person',
    inactiveIcon: 'person-outline',
  },
  {
    label: 'Settings',
    icon: 'settings',
    path: '/settings',
    activeIcon: 'settings',
    inactiveIcon: 'settings-outline',
  },
];

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent items={navItems} />}
        screenOptions={{
          headerShown: false,
          drawerPosition: 'left',
          drawerType: 'front',
          drawerStyle: {
            width: '70%',
          },
        }}
      />
    </GestureHandlerRootView>
  );
}
