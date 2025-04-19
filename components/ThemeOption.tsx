import React from 'react';
import useTheme from '@/hooks/useTheme';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
          backgroundColor: colors.card,
          borderColor: colors.border,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            android: {
              elevation: 2,
            },
          }),
        },
      ]}
    >
      <Ionicons name={icon} size={20} color={colors.text} />
      <Text style={[styles.text, { color: colors.text }]}>
        {title.toLowerCase()}
      </Text>
      <Ionicons
        name={isActive ? 'checkmark-circle' : 'ellipse-outline'}
        color={isActive ? colors.primary : colors.text}
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
