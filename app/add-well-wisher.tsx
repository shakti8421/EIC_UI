import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from './components/Button';
import { InputField } from './components/InputField';
import { PageHeader } from './components/PageHeader';
import { useColors } from './hooks/use-color-scheme';

interface WellWisher {
  fullName: string;
  relationship: string;
  age: string;
  gender: string;
  mobileNumber: string;
  bloodGroup: string;
  healthStatus: string;
  profilePhoto?: string;
}

const relationships = ['Mother', 'Father', 'Wife', 'Husband', 'Son', 'Daughter', 'Sister', 'Brother', 'Friend', 'Other'];
const genders = ['Male', 'Female', 'Other'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const healthStatuses = ['Healthy', 'Diabetic', 'Hypertension', 'Cardiac', 'Asthma', 'Other'];

export default function AddWellWisherPage() {
  const router = useRouter();
  const colors = useColors();

  const [wisher, setWisher] = useState<WellWisher>({
    fullName: '',
    relationship: 'Mother',
    age: '',
    gender: 'Female',
    mobileNumber: '',
    bloodGroup: 'O+',
    healthStatus: 'Healthy',
  });

  const handleSaveWisher = () => {
    // Validate required fields
    if (!wisher.fullName.trim()) {
      Alert.alert('Error', 'Please enter their full name');
      return;
    }
    if (!wisher.mobileNumber.trim() || wisher.mobileNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid mobile number');
      return;
    }
    if (!wisher.age.trim()) {
      Alert.alert('Error', 'Please enter their age');
      return;
    }

    // Save the well-wisher (API call would go here)
    Alert.alert('Success', 'Well-wisher added successfully!');
    router.back();
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 16, paddingBottom: 32 }}
      >
        {/* Header */}
        <PageHeader
          title="Add well-wisher"
          onBackPress={() => router.back()}
        />

        {/* Main Title */}
        <View className="mb-6 mt-4">
          <Text
            style={{ color: colors.foreground }}
            className="text-3xl font-bold mb-2"
          >
            Grow your care circle.
          </Text>
          <Text
            style={{ color: colors.mutedForeground }}
            className="text-base"
          >
            Keep the people you love close to help when it matters.
          </Text>
        </View>

        {/* Add Profile Photo Section */}
        <TouchableOpacity
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
          className="border rounded-lg p-4 flex-row items-center gap-4 mb-8"
        >
          <Text className="text-3xl">📸</Text>
          <View className="flex-1">
            <Text style={{ color: colors.foreground }} className="font-semibold mb-1">
              Add a profile photo
            </Text>
            <Text style={{ color: colors.mutedForeground }} className="text-xs">
              Optional - helps responders identify them
            </Text>
          </View>
          <Text className="text-xl">→</Text>
        </TouchableOpacity>

        {/* Basic Details Section */}
        <View className="mb-8">
          <Text style={{ color: colors.foreground }} className="text-lg font-bold mb-4">
            Basic details
          </Text>

          {/* Full Name */}
          <InputField
            label="FULL NAME"
            placeholder="Enter their full name"
            value={wisher.fullName}
            onChangeText={(text) => setWisher({ ...wisher, fullName: text })}
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
                  onPress={() => setWisher({ ...wisher, relationship: rel })}
                  style={{
                    backgroundColor: wisher.relationship === rel ? colors.primary : colors.card,
                    borderColor: wisher.relationship === rel ? colors.primary : colors.border,
                  }}
                  className="border rounded-full px-4 py-2"
                >
                  <Text
                    style={{
                      color: wisher.relationship === rel ? colors.primaryForeground : colors.foreground,
                    }}
                    className="text-sm font-medium"
                  >
                    {rel}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Age and Gender */}
          <View className="flex-row gap-4 mb-6">
            <View className="flex-1">
              <InputField
                label="AGE"
                placeholder="Age"
                value={wisher.age}
                onChangeText={(text) => setWisher({ ...wisher, age: text })}
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <Text style={{ color: colors.mutedForeground }} className="text-xs font-semibold mb-2">
                GENDER
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
                className="border rounded-lg px-4 py-3"
              >
                <Text style={{ color: colors.foreground }}>
                  {wisher.gender}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mobile Number */}
          <InputField
            label="MOBILE NUMBER"
            placeholder="+91 00000 00000"
            value={wisher.mobileNumber}
            onChangeText={(text) => setWisher({ ...wisher, mobileNumber: text })}
            keyboardType="phone-pad"
            maxLength={13}
          />
        </View>

        {/* Blood Group and Health Status */}
        <View className="mb-8">
          <Text style={{ color: colors.foreground }} className="text-lg font-bold mb-4">
            Health information
          </Text>

          {/* Blood Group */}
          <View className="mb-6">
            <Text style={{ color: colors.mutedForeground }} className="text-xs font-semibold mb-3">
              BLOOD GROUP
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {bloodGroups.map((bg) => (
                <TouchableOpacity
                  key={bg}
                  onPress={() => setWisher({ ...wisher, bloodGroup: bg })}
                  style={{
                    backgroundColor: wisher.bloodGroup === bg ? colors.primary : colors.card,
                    borderColor: wisher.bloodGroup === bg ? colors.primary : colors.border,
                  }}
                  className="border rounded-lg px-3 py-2"
                >
                  <Text
                    style={{
                      color: wisher.bloodGroup === bg ? colors.primaryForeground : colors.foreground,
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
          <View className="mb-6">
            <Text style={{ color: colors.mutedForeground }} className="text-xs font-semibold mb-3">
              HEALTH STATUS
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {healthStatuses.map((status) => (
                <TouchableOpacity
                  key={status}
                  onPress={() => setWisher({ ...wisher, healthStatus: status })}
                  style={{
                    backgroundColor: wisher.healthStatus === status ? colors.primary : colors.card,
                    borderColor: wisher.healthStatus === status ? colors.primary : colors.border,
                  }}
                  className="border rounded-full px-4 py-2"
                >
                  <Text
                    style={{
                      color: wisher.healthStatus === status ? colors.primaryForeground : colors.foreground,
                    }}
                    className="text-sm font-medium"
                  >
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Save Button */}
        <Button
          label="Save well-wisher"
          variant="primary"
          icon="✓"
          onPress={handleSaveWisher}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
