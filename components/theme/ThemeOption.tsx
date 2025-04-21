import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '@/utils/useTheme';
import ThemedText from '../ui/ThemedText';

interface IThemeOption {
  title: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
  isActive: boolean;
}

export default function ThemeOption({
  title,
  icon,
  onPress,
  isActive,
}: IThemeOption) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          ...Platform.select({
            ios: {
              shadow: colors.shadow,
            },
            android: {
              elevation: 2,
            },
          }),
        },
      ]}
    >
      <Ionicons name={icon} size={20} color={colors.color} />
      <ThemedText style={[styles.text, { color: colors.color }]}>
        {title.toLowerCase()}
      </ThemedText>
      <Ionicons
        name={isActive ? 'checkmark-circle' : 'ellipse-outline'}
        color={isActive ? colors.primary : colors.color}
        size={20}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 8,
    gap: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginLeft: 8,
  },
});
