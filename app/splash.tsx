import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from './hooks/use-color-scheme';

export default function SplashScreenPage() {
  const router = useRouter();
  const colors = useColors();

  useEffect(() => {
    // Show splash screen for 3 seconds then navigate to landing page
    const timer = setTimeout(() => {
      router.replace('/landing');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      <View className="flex-1 justify-center items-center px-6 gap-6">
        <Image
          source={require('../assets/images/splash-icon.jpeg')}
          style={{
            width: 300,
            height: 250,
            resizeMode: 'contain',
          }}
        />
        <View className="items-center gap-2">
          <Text 
            className="text-2xl font-bold text-center"
            style={{ color: colors.foreground }}
          >
            Emergency Intensive Care
          </Text>
          <Text 
            className="text-base text-center"
            style={{ color: colors.mutedForeground }}
          >
            Professional Emergency Response Team
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
