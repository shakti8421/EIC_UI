import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageHeader } from './components/PageHeader';
import { useColors } from './hooks/use-color-scheme';

interface EmergencyRequest {
  id: string;
  type: string;
  reference: string;
  date: string;
  patient: string;
  location: string;
  status: 'completed' | 'in-progress' | 'pending';
}

const mockRequests: EmergencyRequest[] = [
  {
    id: '1',
    type: 'Accident',
    reference: 'EIC-240819',
    date: '19 Aug 2024, 10:42 AM',
    patient: 'Aarav Mehta',
    location: 'Koramangala, Bengaluru',
    status: 'completed',
  },
  {
    id: '2',
    type: 'Respiratory Emergency',
    reference: 'EIC-240702',
    date: '02 Jul 2024, 08:15 PM',
    patient: 'Rajesh Mehta',
    location: 'Indiranagar, Bengaluru',
    status: 'in-progress',
  },
];

const getStatusColor = (status: EmergencyRequest['status']): { bg: string; text: string } => {
  switch (status) {
    case 'completed':
      return { bg: '#D4EDDA', text: '#155724' };
    case 'in-progress':
      return { bg: '#FFF3CD', text: '#856404' };
    default:
      return { bg: '#F8D7DA', text: '#721C24' };
  }
};

const getStatusLabel = (status: EmergencyRequest['status']): string => {
  switch (status) {
    case 'completed':
      return '✓ Completed';
    case 'in-progress':
      return '◐ In Progress';
    default:
      return '○ Pending';
  }
};

const getStatusIcon = (status: EmergencyRequest['status']): string => {
  switch (status) {
    case 'completed':
      return '✓';
    case 'in-progress':
      return '◐';
    default:
      return '○';
  }
};

export default function EmergencyHistoryPage() {
  const router = useRouter();
  const colors = useColors();

  const totalRequests = mockRequests.length;
  const lastStatus = mockRequests[0]?.status === 'completed' ? 'All clear' : 'In Progress';

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 16, paddingBottom: 32 }}
      >
        {/* Header */}
        <PageHeader
          title="Emergency history"
          onBackPress={() => router.back()}
        />

        {/* Main Title */}
        <View className="mb-6 mt-4">
          <Text
            style={{ color: colors.foreground }}
            className="text-3xl font-bold mb-2"
          >
            Your requests
          </Text>
          <Text
            style={{ color: colors.mutedForeground }}
            className="text-base"
          >
            A clear record of every time you reached out.
          </Text>
        </View>

        {/* Stats Card */}
        <View
          style={{ backgroundColor: '#9C3E7D' }}
          className="rounded-3xl px-6 py-6 mb-8 flex-row justify-between items-center"
        >
          <View className="flex-row items-center gap-6">
            <View>
              <Text style={{ color: 'rgba(255,255,255,0.7)' }} className="text-xs font-semibold mb-1">
                TOTAL REQUESTS
              </Text>
              <Text style={{ color: '#FFFFFF' }} className="text-4xl font-bold">
                {String(totalRequests).padStart(2, '0')}
              </Text>
            </View>

            <View style={{ width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.3)' }} />

            <View>
              <Text style={{ color: 'rgba(255,255,255,0.7)' }} className="text-xs font-semibold mb-1">
                LAST STATUS
              </Text>
              <Text style={{ color: '#C4E062' }} className="text-lg font-bold">
                {lastStatus}
              </Text>
            </View>
          </View>
        </View>

        {/* Requests List */}
        <View className="gap-4">
          {mockRequests.map((request) => {
            const statusColors = getStatusColor(request.status);
            return (
              <TouchableOpacity
                key={request.id}
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
                className="rounded-2xl border p-4 overflow-hidden"
              >
                {/* Top Row with Type and Status */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-center gap-3 flex-1">
                    <View style={{ backgroundColor: '#FFE0E6' }} className="w-12 h-12 rounded-lg items-center justify-center">
                      <Text className="text-2xl">💓</Text>
                    </View>
                    <View className="flex-1">
                      <Text style={{ color: colors.foreground }} className="font-bold text-base">
                        {request.type}
                      </Text>
                      <Text style={{ color: colors.mutedForeground }} className="text-xs">
                        {request.reference}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ backgroundColor: statusColors.bg }}
                    className="px-3 py-1 rounded-full"
                  >
                    <Text style={{ color: statusColors.text }} className="text-xs font-semibold">
                      {getStatusLabel(request.status)}
                    </Text>
                  </View>
                </View>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 12 }} />

                {/* Patient and Date Row */}
                <View className="gap-2 mb-2">
                  <View className="flex-row">
                    <Text style={{ color: colors.mutedForeground }} className="text-xs font-semibold w-20">
                      PATIENT
                    </Text>
                    <Text style={{ color: colors.foreground }} className="flex-1 font-semibold">
                      {request.patient}
                    </Text>
                  </View>
                  <View className="flex-row">
                    <Text style={{ color: colors.mutedForeground }} className="text-xs font-semibold w-20">
                      DATE
                    </Text>
                    <Text style={{ color: colors.foreground }} className="flex-1 font-semibold">
                      {request.date}
                    </Text>
                  </View>
                </View>

                {/* Location */}
                <View className="flex-row items-center gap-2">
                  <Text className="text-base">📍</Text>
                  <Text style={{ color: colors.mutedForeground }} className="text-sm flex-1">
                    {request.location}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
