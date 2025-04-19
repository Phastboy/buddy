import { View, Text, Button } from 'react-native';
import useTheme from '@/hooks/useTheme';

export default function Home() {
  const { theme, colors, themePreference, updateThemePreference } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 18 }}>
        Current Theme: {theme}
      </Text>
    </View>
  );
}
