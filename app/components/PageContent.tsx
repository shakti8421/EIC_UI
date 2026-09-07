import React from 'react';
import { Text, View } from 'react-native';
import { useColors } from '../hooks/use-color-scheme';

interface PageContentProps {
  icon: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const PageContent: React.FC<PageContentProps> = ({
  icon,
  title,
  subtitle,
  children,
}) => {
  const colors = useColors();

  return (
    <View className="flex-1">
      {/* Icon Section */}
      <View 
        style={{ backgroundColor: colors.accent }}
        className="w-24 h-24 rounded-3xl items-center justify-center mx-auto mb-8"
      >
        <Text className="text-5xl">{icon}</Text>
      </View>

      {/* Title Section */}
      <Text 
        className="text-3xl font-bold text-center mb-4 leading-tight"
        style={{ color: colors.foreground }}
      >
        {title}
      </Text>
      <Text 
        className="text-base text-center mb-8"
        style={{ color: colors.mutedForeground }}
      >
        {subtitle}
      </Text>

      {/* Content */}
      {children}
    </View>
  );
};
