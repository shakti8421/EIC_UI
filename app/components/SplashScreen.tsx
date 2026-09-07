import React from 'react';
import { Image, Text, View } from 'react-native';
import { useColors } from '../hooks/use-color-scheme';

interface SplashScreenProps {
  imageSource?: any;
  title?: string;
  subtitle?: string;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  imageSource,
  title = 'Emergency Intensive Care',
  subtitle = 'Professional Emergency Response Team',
}) => {
  const colors = useColors();
  
  return (
    <View 
      style={{ backgroundColor: colors.accent }}
      className="rounded-3xl p-6 gap-6 mb-8 items-center"
    >
      {imageSource && (
        <Image
          source={imageSource}
          style={{
            width: 300,
            height: 250,
            resizeMode: 'contain',
          }}
        />
      )}
      <View className="items-center gap-2">
        <Text className="text-xl font-bold text-center" style={{ color: colors.foreground }}>
          {title}
        </Text>
        <Text className="text-sm text-center" style={{ color: colors.mutedForeground }}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
};
