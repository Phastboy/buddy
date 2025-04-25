import { ThemeMode } from '@/utils/theme.utils';
import { useAppTheme } from '@/utils/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { ThemeOption } from './ThemeOption';
import { View } from '../Themed';

/**
 * A component that displays theme options for user selection
 * @component
 * @returns {React.ReactElement} A container with theme selection options
 * @example
 * <ThemeSelector />
 */
export const ThemeSelector = () => {
  const { colors } = useTheme();
  const { mode, setMode } = useAppTheme();

  /**
   * Type definition for theme options
   */
  interface ThemeOption {
    id: ThemeMode;
    title: string;
    icon: React.ComponentProps<typeof Ionicons>['name'];
  }

  /**
   * Available theme options configuration
   * @type {ThemeOption[]}
   */
  const THEME_OPTIONS: ThemeOption[] = [
    {
      id: 'light',
      title: 'Light',
      icon: 'sunny',
    },
    {
      id: 'dark',
      title: 'Dark',
      icon: 'moon',
    },
    {
      id: 'system',
      title: 'System',
      icon: 'phone-portrait',
    },
  ];

  return (
    <View style={{ padding: 16 }}>
      {THEME_OPTIONS.map((option) => (
        <ThemeOption
          key={option.id}
          title={option.title}
          icon={option.icon}
          isActive={mode === option.id}
          onPress={() => setMode(option.id)}
        />
      ))}
    </View>
  );
};
