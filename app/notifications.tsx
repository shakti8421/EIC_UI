import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageHeader } from './components/PageHeader';
import { useColors } from './hooks/use-color-scheme';

export default function NotificationsPage() {
  const router = useRouter();
  const colors = useColors();

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 16, paddingBottom: 32 }}
      >
        {/* Header */}
        <PageHeader
          title="Notifications"
          onBackPress={() => router.back()}
        />

        {/* Empty State */}
        <View className="flex-1 items-center justify-center gap-6 mt-12">
          {/* Bell Icon */}
          <View
            style={{ backgroundColor: '#F5E0E8' }}
            className="w-24 h-24 rounded-3xl items-center justify-center"
          >
            <Text className="text-5xl">🔔</Text>
          </View>

          {/* Heading */}
          <Text
            style={{ color: colors.foreground }}
            className="text-3xl font-bold text-center"
          >
            You're all caught up.
          </Text>

          {/* Description */}
          <Text
            style={{ color: colors.mutedForeground }}
            className="text-center text-base leading-6"
          >
            Important updates from your care team will appear here.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
