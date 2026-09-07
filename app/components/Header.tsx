import React from 'react';
import { Text, View } from 'react-native';
import { useColors } from '../hooks/use-color-scheme';

interface HeaderProps {
  title: string;
  subtitle: string;
  icon?: string;
  badge?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, icon, badge }) => {
  const colors = useColors();
  
  return (
    <View className="flex-row justify-between items-start gap-4 mb-6">
      <View className="flex-1 gap-3">
        <View className="flex-row items-center gap-3">
          {icon && <Text className="text-3xl">{icon}</Text>}
          <View className="flex-1">
            <Text 
              className="text-lg font-bold leading-tight"
              style={{ color: colors.foreground }}
            >
              {title}
            </Text>
          </View>
        </View>
        <Text 
          className="text-xs font-semibold tracking-wide"
          style={{ color: colors.primary }}
        >
          {subtitle}
        </Text>
      </View>
      {badge && <View className="ml-2">{badge}</View>}
    </View>
  );
};
