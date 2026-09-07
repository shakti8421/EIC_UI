import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from './components/Button';
import { InputField } from './components/InputField';
import { PageHeader } from './components/PageHeader';
import { useColors } from './hooks/use-color-scheme';

interface EmergencyRequest {
  patientName: string;
  age: string;
  mobileNumber: string;
  gender: 'Male' | 'Female' | 'Other' | null;
  bloodGroup: string | null;
  emergencyType: string | null;
  condition: string | null;
  description: string;
  hasPhoto: boolean;
}

const genderOptions = ['Female', 'Male', 'Other'];
const bloodGroups = ['A+', 'B+', 'AB+', 'O+', 'O-'];
const emergencyTypes = ['Heart attack', 'Accident', 'Stroke', 'Pregnancy'];
const conditionOptions = ['Critical', 'Serious', 'Stable'];

export default function EmergencyRequestPage() {
  const router = useRouter();
  const colors = useColors();
  const [request, setRequest] = useState<EmergencyRequest>({
    patientName: '',
    age: '',
    mobileNumber: '',
    gender: null,
    bloodGroup: null,
    emergencyType: null,
    condition: null,
    description: '',
    hasPhoto: false,
  });

  const handleSubmit = () => {
    if (!request.patientName || !request.age || !request.mobileNumber) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!request.hasPhoto) {
      Alert.alert('Error', 'Please capture a patient photo');
      return;
    }

    // Simulate submission
    Alert.alert('Success', 'Emergency request submitted successfully');
    router.push('/dashboard');
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16, paddingBottom: 24 }}
      >
        {/* Header */}
        <PageHeader
          title="Emergency request"
          onBackPress={() => router.back()}
        />

        {/* Info Card */}
        <View
          style={{ backgroundColor: colors.primary }}
          className="rounded-2xl px-6 py-4 mb-8 flex-row items-center gap-4"
        >
          <Text className="text-white text-xl">💓</Text>
          <View className="flex-1">
            <Text style={{ color: colors.primaryForeground }} className="font-semibold text-white">
              Create emergency request
            </Text>
            <Text style={{ color: colors.primaryForeground }} className="text-xs opacity-90">
              Share what our response team needs to know.
            </Text>
          </View>
        </View>

        {/* Patient Details Section */}
        <View className="mb-8">
          <Text style={{ color: colors.foreground }} className="text-lg font-bold mb-4">
            Patient details
          </Text>

          <InputField
            label="PATIENT NAME"
            placeholder="Full name"
            value={request.patientName}
            onChangeText={(text) => setRequest({ ...request, patientName: text })}
          />

          <View className="flex-row gap-4">
            <View className="flex-1">
              <InputField
                label="AGE"
                placeholder="Years"
                value={request.age}
                onChangeText={(text) => setRequest({ ...request, age: text })}
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <InputField
                label="MOBILE NUMBER"
                placeholder="Number"
                value={request.mobileNumber}
                onChangeText={(text) => setRequest({ ...request, mobileNumber: text })}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Gender Selection */}
          <View className="mb-4">
            <Text style={{ color: colors.foreground }} className="text-xs font-semibold tracking-wide mb-2">
              GENDER
            </Text>
            <View className="flex-row gap-2">
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setRequest({ ...request, gender: option as any })}
                  style={{
                    backgroundColor:
                      request.gender === option ? colors.primary : colors.card,
                    borderColor: request.gender === option ? colors.primary : colors.border,
                  }}
                  className="flex-1 py-2 px-3 rounded-full border items-center"
                >
                  <Text
                    style={{
                      color: request.gender === option ? colors.primaryForeground : colors.foreground,
                    }}
                    className="text-sm font-semibold"
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Blood Group Selection */}
          <View className="mb-4">
            <Text style={{ color: colors.foreground }} className="text-xs font-semibold tracking-wide mb-2">
              BLOOD GROUP
            </Text>
            <View className="flex-row gap-2 flex-wrap">
              {bloodGroups.map((group) => (
                <TouchableOpacity
                  key={group}
                  onPress={() => setRequest({ ...request, bloodGroup: group })}
                  style={{
                    backgroundColor:
                      request.bloodGroup === group ? colors.primary : colors.card,
                    borderColor: request.bloodGroup === group ? colors.primary : colors.border,
                  }}
                  className="py-2 px-4 rounded-full border"
                >
                  <Text
                    style={{
                      color: request.bloodGroup === group ? colors.primaryForeground : colors.foreground,
                    }}
                    className="text-sm font-semibold"
                  >
                    {group}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Emergency Details Section */}
        <View className="mb-8">
          <Text style={{ color: colors.foreground }} className="text-lg font-bold mb-4">
            Emergency details
          </Text>

          {/* Emergency Type */}
          <View className="mb-4">
            <Text style={{ color: colors.foreground }} className="text-xs font-semibold tracking-wide mb-2">
              EMERGENCY TYPE
            </Text>
            <View className="flex-row gap-2 flex-wrap">
              {emergencyTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setRequest({ ...request, emergencyType: type })}
                  style={{
                    backgroundColor:
                      request.emergencyType === type ? colors.primary : colors.card,
                    borderColor: request.emergencyType === type ? colors.primary : colors.border,
                  }}
                  className="py-2 px-4 rounded-full border"
                >
                  <Text
                    style={{
                      color: request.emergencyType === type ? colors.primaryForeground : colors.foreground,
                    }}
                    className="text-sm font-semibold"
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Patient Condition */}
          <View className="mb-4">
            <Text style={{ color: colors.foreground }} className="text-xs font-semibold tracking-wide mb-2">
              PATIENT CONDITION
            </Text>
            <View className="flex-row gap-2">
              {conditionOptions.map((cond) => (
                <TouchableOpacity
                  key={cond}
                  onPress={() => setRequest({ ...request, condition: cond })}
                  style={{
                    backgroundColor:
                      request.condition === cond ? colors.primary : colors.card,
                    borderColor: request.condition === cond ? colors.primary : colors.border,
                  }}
                  className="flex-1 py-2 px-3 rounded-full border items-center"
                >
                  <Text
                    style={{
                      color: request.condition === cond ? colors.primaryForeground : colors.foreground,
                    }}
                    className="text-sm font-semibold"
                  >
                    {cond}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <InputField
            label="DESCRIPTION"
            placeholder="Tell us what happened..."
            value={request.description}
            onChangeText={(text) => setRequest({ ...request, description: text })}
          />
        </View>

        {/* Current Location */}
        <View className="mb-8">
          <View
            style={{ backgroundColor: colors.accent }}
            className="rounded-lg px-4 py-3 flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3 flex-1">
              <Text className="text-lg">📍</Text>
              <View>
                <Text style={{ color: colors.accentForeground }} className="font-semibold">
                  Current location
                </Text>
                <Text style={{ color: colors.accentForeground }} className="text-xs">
                  Location not captured
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={{ color: colors.primary }} className="font-semibold">
                Capture
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Live Patient Photo */}
        <View className="mb-8">
          <View className="flex-row items-center gap-2 mb-4">
            <Text style={{ color: colors.foreground }} className="text-lg font-bold flex-1">
              Live patient photo
            </Text>
            <Text style={{ color: colors.primary }} className="text-xs font-semibold">
              REQUIRED
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setRequest({ ...request, hasPhoto: !request.hasPhoto })}
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 2,
            }}
            className="rounded-lg p-8 items-center justify-center gap-4 mb-2"
          >
            <View
              style={{ backgroundColor: colors.accent }}
              className="w-16 h-16 rounded-full items-center justify-center"
            >
              <Text className="text-3xl">📷</Text>
            </View>
            <Text style={{ color: colors.foreground }} className="font-semibold text-center">
              {request.hasPhoto ? 'Photo Captured ✓' : 'Capture live patient photo'}
            </Text>
            <Text style={{ color: colors.mutedForeground }} className="text-xs text-center">
              Required to submit an emergency request
            </Text>
          </TouchableOpacity>

          {!request.hasPhoto && (
            <TouchableOpacity
              onPress={() => setRequest({ ...request, hasPhoto: true })}
              className="items-center"
            >
              <Text style={{ color: colors.primary }} className="font-semibold">
                Open camera →
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Submit Button */}
        <Button
          label="Submit emergency request"
          variant="primary"
          icon="→"
          onPress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
