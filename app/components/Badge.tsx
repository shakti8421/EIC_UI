import React from 'react';
import { Text, View } from 'react-native';
import { useColors } from '../hooks/use-color-scheme';

interface BadgeProps {
  icon?: string;
  text: string;
  variant?: 'success' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({ icon, text, variant = 'success' }) => {
  const colors = useColors();
  
  let backgroundColor = colors.accent;
  let textColor = colors.accentForeground;
  let borderColor = colors.border;

  if (variant === 'default') {
    backgroundColor = colors.muted;
    textColor = colors.mutedForeground;
  }

  return (
    <View 
      style={{ 
        backgroundColor,
        borderColor,
        borderWidth: 1,
      }}
      className="flex-row items-center gap-2 px-4 py-2 rounded-full"
    >
      {icon && <Text className="text-lg" style={{ color: textColor }}>{icon}</Text>}
      <Text className="text-sm font-medium" style={{ color: textColor }}>{text}</Text>
    </View>
  );
};
