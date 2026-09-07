import React from 'react';
import { Text, View } from 'react-native';
import { useColors } from '../hooks/use-color-scheme';

interface InfoMessageProps {
  message: string;
  type?: 'info' | 'warning' | 'success';
}

export const InfoMessage: React.FC<InfoMessageProps> = ({ message, type = 'info' }) => {
  const colors = useColors();

  let bgColor = colors.accent;
  let textColor = colors.accentForeground;
  let icon = 'ⓘ';

  if (type === 'warning') {
    bgColor = colors.muted;
    textColor = colors.mutedForeground;
    icon = '⚠️';
  } else if (type === 'success') {
    bgColor = '#C8E6C9';
    textColor = '#2E7D32';
    icon = '✓';
  }

  return (
    <View 
      style={{ backgroundColor: bgColor }}
      className="flex-row items-center gap-3 p-4 rounded-lg mb-6"
    >
      <Text className="text-lg">{icon}</Text>
      <Text 
        className="text-sm flex-1"
        style={{ color: textColor }}
      >
        {message}
      </Text>
    </View>
  );
};
