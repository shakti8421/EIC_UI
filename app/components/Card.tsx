import React from 'react';
import { Text, View } from 'react-native';
import { useColors } from '../hooks/use-color-scheme';

interface CardProps {
  icon: string;
  title: string;
  description?: string;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ icon, title, description, onPress }) => {
  const colors = useColors();
  
  return (
    <View 
      style={{ 
        backgroundColor: colors.card,
        borderColor: colors.border,
      }}
      className="rounded-lg p-6 gap-3 border shadow-sm flex-1 items-center"
    >
      <Text className="text-4xl">{icon}</Text>
      <Text className="text-lg font-semibold text-center" style={{ color: colors.cardForeground }}>{title}</Text>
      {description && (
        <Text className="text-sm text-center" style={{ color: colors.mutedForeground }}>{description}</Text>
      )}
    </View>
  );
};
