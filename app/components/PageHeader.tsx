import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useColors } from '../hooks/use-color-scheme';

interface PageHeaderProps {
  title: string;
  onBackPress?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, onBackPress }) => {
  const colors = useColors();

  return (
    <View className="flex-row items-center gap-4 mb-8">
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} className="p-2">
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
      )}
      <Text 
        className="text-2xl font-bold flex-1"
        style={{ color: colors.foreground }}
      >
        {title}
      </Text>
    </View>
  );
};
