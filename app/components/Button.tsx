import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useColors } from '../hooks/use-color-scheme';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'outline';
  onPress?: () => void;
  icon?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  onPress,
  icon,
  disabled = false,
}) => {
  const colors = useColors();
  const isPrimary = variant === 'primary';
  
  const backgroundColor = isPrimary ? colors.primary : 'transparent';
  const textColor = isPrimary ? colors.primaryForeground : colors.primary;
  const borderColor = !isPrimary ? colors.primary : 'transparent';
  const opacity = disabled ? 0.5 : 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor,
        borderColor,
        borderWidth: !isPrimary ? 2 : 0,
        opacity,
      }}
      className="rounded-full py-4 px-6 flex-row items-center justify-center gap-2 w-full"
      activeOpacity={0.8}
    >
      {icon && <Text className="text-lg" style={{ color: textColor }}>{icon}</Text>}
      <Text className="font-semibold text-center" style={{ color: textColor }}>{label}</Text>
    </TouchableOpacity>
  );
};
