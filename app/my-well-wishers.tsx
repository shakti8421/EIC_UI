import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EditWellWisherModal } from './components/EditWellWisherModal';
import { PageHeader } from './components/PageHeader';
import { useColors } from './hooks/use-color-scheme';

interface WellWisher {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  bloodGroup: string;
  healthStatus: string;
  initials: string;
}

const mockWellWishers: WellWisher[] = [
  {
    id: '1',
    name: 'Priya Mehta',
    relationship: 'Wife',
    phone: '+91 98220 11223',
    bloodGroup: 'A+',
    healthStatus: 'Healthy',
    initials: 'PM',
  },
  {
    id: '2',
    name: 'Rajesh Mehta',
    relationship: 'Father',
    phone: '+91 98111 22334',
    bloodGroup: 'B+',
    healthStatus: 'Senior Citizen',
    initials: 'RM',
  },
  {
    id: '3',
    name: 'Test',
    relationship: 'Son',
    phone: '8887451245',
    bloodGroup: 'B+',
    healthStatus: 'Healthy',
    initials: 'T',
  },
];

const getInitialBackgroundColor = (initials: string, colors: any) => {
  const charCode = initials.charCodeAt(0);
  const hue = (charCode * 137.5) % 360;
  return `hsl(${hue}, 70%, 70%)`;
};

export default function MyWellWishersPage() {
  const router = useRouter();
  const colors = useColors();
  const [wellWishers, setWellWishers] = useState<WellWisher[]>(mockWellWishers);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingWisher, setEditingWisher] = useState<WellWisher | null>(null);

  const handleAddWisher = () => {
    router.push('/add-well-wisher');
  };

  const handleEditWisher = (wisherId: string) => {
    const wisher = wellWishers.find((w) => w.id === wisherId);
    if (wisher) {
      setEditingWisher(wisher);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEditedWisher = (updatedWisher: WellWisher) => {
    setWellWishers(wellWishers.map((w) => (w.id === updatedWisher.id ? updatedWisher : w)));
    Alert.alert('Success', 'Well-wisher updated successfully!');
  };

  const handleDeleteWisher = (wisherId: string) => {
    Alert.alert(
      'Delete Well-Wisher',
      'Are you sure you want to remove this well-wisher?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            // TODO: API Call to delete well-wisher
            // Call DELETE API endpoint with wisherId
            // Example: await deleteWellWisher(wisherId);
            console.log('Delete API call placeholder for well-wisher:', wisherId);
            
            // For now, remove from state
            setWellWishers(wellWishers.filter((w) => w.id !== wisherId));
            Alert.alert('Deleted', 'Well-wisher removed successfully');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16, paddingBottom: 32 }}
      >
        {/* Header with Add Button */}
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-1">
            <PageHeader
              title="My well-wishers"
              onBackPress={() => router.back()}
            />
          </View>
          <TouchableOpacity
            onPress={handleAddWisher}
            style={{ backgroundColor: colors.primary }}
            className="w-14 h-14 rounded-full items-center justify-center"
          >
            <Text style={{ color: colors.primaryForeground }} className="text-3xl font-bold">
              +
            </Text>
          </TouchableOpacity>
        </View>

        {/* Care Circle Title */}
        <View className="mb-4">
          <Text style={{ color: colors.foreground }} className="text-3xl font-bold">
            Your care circle
          </Text>
          <Text style={{ color: colors.mutedForeground }} className="text-base mt-1">
            {wellWishers.length} trusted people connected
          </Text>
        </View>

        {/* Well-Wishers List */}
        <View className="gap-4">
          {wellWishers.map((wisher) => (
            <View
              key={wisher.id}
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
              className="border rounded-lg p-4 flex-row items-center gap-4"
            >
              {/* Avatar */}
              <View
                style={{
                  backgroundColor: getInitialBackgroundColor(wisher.initials, colors),
                }}
                className="w-14 h-14 rounded-lg items-center justify-center"
              >
                <Text className="text-lg font-bold" style={{ color: '#ffffff' }}>
                  {wisher.initials}
                </Text>
              </View>

              {/* Info */}
              <View className="flex-1">
                <Text style={{ color: colors.foreground }} className="text-base font-bold">
                  {wisher.name}
                </Text>
                <Text style={{ color: colors.mutedForeground }} className="text-sm mt-1">
                  {wisher.relationship} · {wisher.phone}
                </Text>
                <View className="flex-row gap-2 mt-2">
                  <View
                    style={{ backgroundColor: colors.primary + '20', borderColor: colors.primary }}
                    className="border rounded-full px-2 py-1"
                  >
                    <Text style={{ color: colors.primary }} className="text-xs font-semibold">
                      {wisher.bloodGroup}
                    </Text>
                  </View>
                  <View
                    style={{ backgroundColor: colors.primary + '20', borderColor: colors.primary }}
                    className="border rounded-full px-2 py-1"
                  >
                    <Text style={{ color: colors.primary }} className="text-xs font-semibold">
                      {wisher.healthStatus}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Menu Button */}
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Options',
                    'What would you like to do?',
                    [
                      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                      {
                        text: 'Edit',
                        onPress: () => handleEditWisher(wisher.id),
                      },
                      {
                        text: 'Delete',
                        onPress: () => handleDeleteWisher(wisher.id),
                        style: 'destructive',
                      },
                    ]
                  );
                }}
                className="p-2"
              >
                <Text style={{ color: colors.mutedForeground }} className="text-lg">
                  ⋮
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Empty State */}
        {wellWishers.length === 0 && (
          <View className="flex-1 items-center justify-center py-12">
            <Text className="text-4xl mb-4">👥</Text>
            <Text style={{ color: colors.foreground }} className="text-lg font-bold mb-2">
              No well-wishers yet
            </Text>
            <Text style={{ color: colors.mutedForeground }} className="text-center mb-6">
              Add people to your care circle to help when it matters
            </Text>
            <TouchableOpacity
              onPress={handleAddWisher}
              style={{ backgroundColor: colors.primary }}
              className="px-6 py-3 rounded-lg"
            >
              <Text style={{ color: colors.primaryForeground }} className="font-semibold">
                Add well-wisher
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Edit Well-Wisher Modal */}
      <EditWellWisherModal
        isOpen={isEditModalOpen}
        wisher={editingWisher}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingWisher(null);
        }}
        onSave={handleSaveEditedWisher}
      />
    </SafeAreaView>
  );
}
