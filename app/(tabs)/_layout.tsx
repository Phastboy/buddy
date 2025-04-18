import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderTopWidth: 0,
            elevation: 0,
            backgroundColor: '#fff',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            // tabBarIcon: ({ color }) => (
            //   <Ionicons name="home-outline" size={24} color={color} />
            // ),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: 'Events',
            // tabBarIcon: ({ color }) => (
            //   <Ionicons name="settings-outline" size={24} color={color} />
            // ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Notifications',
            // tabBarIcon: ({ color }) => (
            //   <Ionicons name="settings-outline" size={24} color={color} />
            // ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            // tabBarIcon: ({ color }) => (
            //   <Ionicons name="settings-outline" size={24} color={color} />
            // ),
          }}
        />
      </Tabs>
    </>
  );
}
