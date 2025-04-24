import ThemeProvider from '@/components/theme/ThemeContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="(auth)/login"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(drawer)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </>
    </ThemeProvider>
  );
}
