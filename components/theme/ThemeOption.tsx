import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/utils/useThemeColors';
import { Text } from '../Themed';

/**
 * Props for the ThemeOption component
 */
interface ThemeOptionProps {
  title: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  isActive: boolean;
  onPress: () => void;
}

/**
 * A selectable theme option component with icon and checkmark
 * @component
 * @param {ThemeOptionProps} props - Component props
 * @returns {React.ReactElement} A themed selectable option
 * @example
 * <ThemeOption
 *   title="Light"
 *   icon="sunny"
 *   isActive={mode === 'light'}
 *   onPress={() => setMode('light')}
 * />
 */
export const ThemeOption = ({
  title,
  icon,
  isActive,
  onPress,
}: ThemeOptionProps) => {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          ...Platform.select({
            ios: {
              shadowColor: colors.primary,
              shadowOpacity: 0.1,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
            },
            android: {
              elevation: 2,
            },
          }),
        },
      ]}
    >
      <Ionicons name={icon} size={20} color={colors.inactiveIcon} />
      <Text style={[styles.text]}>{title}</Text>
      <Ionicons
        name={isActive ? 'checkmark-circle' : 'ellipse-outline'}
        color={isActive ? colors.primary : colors.text}
        size={20}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 4,
    gap: 12,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
});
