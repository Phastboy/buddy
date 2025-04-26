import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer initialRouteName="(tabs)">
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Home',
            drawerLabel: 'Home',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: 'Settings',
            drawerLabel: 'Settings',
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
