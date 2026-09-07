import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '../hooks/use-color-scheme';
import { Button } from './Button';
import { InputField } from './InputField';

interface WellWisher {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  bloodGroup: string;
  healthStatus: string;
  initials: string;
}

interface EditWellWisherModalProps {
  isOpen: boolean;
  wisher: WellWisher | null;
  onClose: () => void;
  onSave: (wisher: WellWisher) => void;
}

const relationships = ['Mother', 'Father', 'Wife', 'Husband', 'Son', 'Daughter', 'Sister', 'Brother', 'Friend', 'Other'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const healthStatuses = ['Healthy', 'Diabetic', 'Hypertension', 'Cardiac', 'Asthma', 'Other'];

export const EditWellWisherModal: React.FC<EditWellWisherModalProps> = ({
  isOpen,
  wisher,
  onClose,
  onSave,
}) => {
  const colors = useColors();
  const [editData, setEditData] = useState<WellWisher | null>(wisher);

  React.useEffect(() => {
    if (wisher) {
      setEditData(wisher);
    }
  }, [wisher, isOpen]);

  const handleSave = () => {
    if (!editData) return;

    if (!editData.name.trim()) {
      Alert.alert('Error', 'Please enter their full name');
      return;
    }
    if (!editData.phone.trim() || editData.phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid mobile number');
      return;
    }

    onSave(editData);
    onClose();
  };

  if (!isOpen || !editData) {
    return (
      <Modal visible={false}>
        <View />
      </Modal>
    );
  }

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16, paddingBottom: 32 }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text style={{ color: colors.foreground }} className="text-2xl font-bold">
              Edit well-wisher
            </Text>
            <TouchableOpacity onPress={onClose} className="p-2">
              <Text className="text-2xl" style={{ color: colors.foreground }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          {/* Full Name */}
          <InputField
            label="FULL NAME"
            placeholder="Enter their full name"
            value={editData.name}
            onChangeText={(text) => setEditData({ ...editData, name: text })}
          />

          {/* Relationship */}
          <View className="mb-6">
            <Text style={{ color: colors.mutedForeground }} className="text-xs font-semibold mb-3">
              RELATIONSHIP
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {relationships.slice(0, 5).map((rel) => (
                <TouchableOpacity
                  key={rel}
                  onPress={() => setEditData({ ...editData, relationship: rel })}
                  style={{
                    backgroundColor: editData.relationship === rel ? colors.primary : colors.card,
                    borderColor: editData.relationship === rel ? colors.primary : colors.border,
                  }}
                  className="border rounded-full px-4 py-2"
                >
                  <Text
                    style={{
                      color: editData.relationship === rel ? colors.primaryForeground : colors.foreground,
                    }}
                    className="text-sm font-medium"
                  >
                    {rel}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Mobile Number */}
          <InputField
            label="MOBILE NUMBER"
            placeholder="+91 00000 00000"
            value={editData.phone}
            onChangeText={(text) => setEditData({ ...editData, phone: text })}
            keyboardType="phone-pad"
            maxLength={13}
          />

          {/* Blood Group */}
          <View className="mb-6">
            <Text style={{ color: colors.mutedForeground }} className="text-xs font-semibold mb-3">
              BLOOD GROUP
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {bloodGroups.map((bg) => (
                <TouchableOpacity
                  key={bg}
                  onPress={() => setEditData({ ...editData, bloodGroup: bg })}
                  style={{
                    backgroundColor: editData.bloodGroup === bg ? colors.primary : colors.card,
                    borderColor: editData.bloodGroup === bg ? colors.primary : colors.border,
                  }}
                  className="border rounded-lg px-3 py-2"
                >
                  <Text
                    style={{
                      color: editData.bloodGroup === bg ? colors.primaryForeground : colors.foreground,
                    }}
                    className="text-sm font-medium"
                  >
                    {bg}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Health Status */}
          <View className="mb-8">
            <Text style={{ color: colors.mutedForeground }} className="text-xs font-semibold mb-3">
              HEALTH STATUS
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {healthStatuses.map((status) => (
                <TouchableOpacity
                  key={status}
                  onPress={() => setEditData({ ...editData, healthStatus: status })}
                  style={{
                    backgroundColor: editData.healthStatus === status ? colors.primary : colors.card,
                    borderColor: editData.healthStatus === status ? colors.primary : colors.border,
                  }}
                  className="border rounded-full px-4 py-2"
                >
                  <Text
                    style={{
                      color: editData.healthStatus === status ? colors.primaryForeground : colors.foreground,
                    }}
                    className="text-sm font-medium"
                  >
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Save Button */}
          <Button
            label="Save changes"
            variant="primary"
            icon="✓"
            onPress={handleSave}
          />

          {/* Cancel Button */}
          <TouchableOpacity
            onPress={onClose}
            className="mt-3 py-3 px-4 rounded-lg"
            style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }}
          >
            <Text style={{ color: colors.foreground }} className="text-center font-semibold">
              Cancel
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
