import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from './components/Badge';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { useColors } from './hooks/use-color-scheme';

const features = [
  {
    id: 1,
    icon: '🏥',
    title: 'Emergency assistance',
    description: 'Immediate help when you need it most',
  },
  {
    id: 2,
    icon: '👤',
    title: 'Patient registration',
    description: 'Quick and easy enrollment process',
  },
  {
    id: 3,
    icon: '👥',
    title: 'Family connections',
    description: 'Keep loved ones informed and connected',
  },
  {
    id: 4,
    icon: '✈️',
    title: 'Live tracking',
    description: 'Real-time updates on your care journey',
  },
];

export default function Index() {
  const router = useRouter();
  const colors = useColors();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleEmergency = () => {
    router.push('/emergency-access');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  // if (showSplash) {
  //   return (
  //     <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
  //       <View className="flex-1 justify-center items-center px-6 gap-6">
  //         <Image
  //           source={require('../assets/images/splash-icon.jpeg')}
  //           style={{
  //             width: 300,
  //             height: 250,
  //             resizeMode: 'contain',
  //           }}
  //         />
  //         <View className="items-center gap-2">
  //           <Text 
  //             className="text-2xl font-bold text-center"
  //             style={{ color: colors.foreground }}
  //           >
  //             Emergency Intensive Care
  //           </Text>
  //           <Text 
  //             className="text-base text-center"
  //             style={{ color: colors.mutedForeground }}
  //           >
  //             Professional Emergency Response Team
  //           </Text>
  //         </View>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header Section */}
        <View className="px-6 pt-6 pb-4">
          <Header
            icon="🚑"
            title="EMERGENCY INTENSIVE CARE"
            subtitle="WE TRULY CARE FOR YOU"
            badge={
              <Badge
                icon="🛡️"
                text="Your care, secured"
                variant="success"
              />
            }
          />
        </View>

        {/* Hero Section */}
        <View className="px-6 pb-8">
          <HeroSection
            title="When every second matters."
            subtitle="One trusted place to connect with emergency responders, hospitals, and the people who matter most."
            badge={
              <View className="flex-row items-center gap-2">
                <View style={{ backgroundColor: colors.accent }} className="w-3 h-3 rounded-full" />
                <Text className="text-sm font-semibold" style={{ color: colors.mutedForeground }}>
                  Responders available near you
                </Text>
              </View>
            }
          />
        </View>

        {/* Section Title */}
        <View className="px-6 mb-4">
          <Text className="text-xs font-semibold mb-2" style={{ color: colors.primary }}>
            HOW WE HELP
          </Text>
          <Text className="text-2xl font-bold" style={{ color: colors.foreground }}>
            A little more care, right when you need it.
          </Text>
        </View>

        {/* Features Grid */}
        <View className="px-6 mb-8 gap-4">
          <View className="flex-row gap-4">
            {features.slice(0, 2).map((feature) => (
              <Card
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </View>
          <View className="flex-row gap-4">
            {features.slice(2, 4).map((feature) => (
              <Card
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </View>
        </View>

        {/* CTA Buttons */}
        <View className="px-6 gap-4 mb-8">
          <Button
            label="Have an emergency"
            variant="primary"
            icon="ⓘ"
            onPress={handleEmergency}
          />
          <Button
            label="Register with EIC"
            variant="outline"
            icon="→"
            onPress={handleRegister}
          />
        </View>

        {/* Sign In Link */}
        <View className="flex-row justify-center items-center gap-2 pb-8">
          <Text className="text-sm" style={{ color: colors.mutedForeground }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
