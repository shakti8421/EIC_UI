import React from 'react';
import { Text, View } from 'react-native';
import { useColors } from '../hooks/use-color-scheme';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  badge?: React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  badge,
}) => {
  const colors = useColors();
  
  return (
    <View 
      style={{ backgroundColor: colors.accent }}
      className="rounded-3xl p-8 gap-6 mb-8"
    >
      <Text className="text-4xl font-bold leading-tight" style={{ color: colors.foreground }}>{title}</Text>
      <Text className="text-base leading-relaxed" style={{ color: colors.mutedForeground }}>{subtitle}</Text>
      {badge && <View>{badge}</View>}
    </View>
  );
};
