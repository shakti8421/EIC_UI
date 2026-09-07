import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CareCircle } from './components/dashboard/CareCircle';
import { EmergencyCallout } from './components/dashboard/EmergencyCallout';
import { ProfileCard } from './components/dashboard/ProfileCard';
import { RecentRequests } from './components/dashboard/RecentRequests';
import { DrawerMenu } from './components/DrawerMenu';
import { useAuth } from './context/AuthContext';
import { useColors } from './hooks/use-color-scheme';

const mockRequests = [
  {
    id: '1',
    type: 'Accident',
    status: 'completed' as const,
    reference: 'EIC-240819',
    date: '19 Aug 2024',
  },
  {
    id: '2',
    type: 'Respiratory Emergency',
    status: 'in-progress' as const,
    reference: 'EIC-240702',
    date: '02 Jul 2024',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const colors = useColors();
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (!user) {
    return (
      <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      <DrawerMenu isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16, paddingBottom: 24 }}
      >
        {/* Header with Greeting and Menu */}
        <View className="flex-row justify-between items-start mb-6">
          <View>
            <Text style={{ color: colors.mutedForeground }} className="text-sm mb-1">
              {getGreeting()}
            </Text>
            <View className="flex-row items-center gap-2">
              <Text style={{ color: colors.foreground }} className="text-2xl font-bold">
                {user.name}
              </Text>
              <Text className="text-2xl">✨</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setDrawerOpen(true)}
            className="p-2"
          >
            <Text className="text-2xl">☰</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <ProfileCard
          userName={user.name}
          profileComplete={user.profileComplete}
          onCompleteProfile={() => {
            router.push('/profile');
          }}
        />

        {/* Emergency Callout */}
        <EmergencyCallout
          onPress={() => {
            router.push('/emergency-request');
          }}
        />

        {/* Care Circle */}
        <CareCircle
          count={2}
          onSeeAll={() => {
            router.push('/my-well-wishers');
          }}
          onAddWisher={() => {
            router.push('/add-well-wisher');
          }}
        />

        {/* Recent Requests */}
        <RecentRequests
          requests={mockRequests}
          onViewHistory={() => {
            router.push('/emergency-history');
          }}
          onRequestPress={(request) => {
            // router.push('/emergency-request');
          }}
        />

        {/* Footer Message */}
        <Text
          style={{ color: colors.mutedForeground }}
          className="text-center text-sm mt-8"
        >
          EIC is here with you, every step.
        </Text>

        {/* Logout Button (for testing) */}
        <TouchableOpacity
          onPress={() => {
            logout();
            router.push('/');
          }}
          className="mt-8 py-3 px-4 bg-gray-200 rounded-lg"
        >
          <Text className="text-center font-semibold text-gray-800">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
