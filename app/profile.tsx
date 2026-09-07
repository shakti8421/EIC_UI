import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from './components/Button';
import { InputField } from './components/InputField';
import { PageHeader } from './components/PageHeader';
import { useColors } from './hooks/use-color-scheme';

interface ProfileData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  mobileNumber: string;
  email: string;
  bloodGroup: string;
  address: string;
  emergencyContact: string;
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genders = ['Male', 'Female', 'Other'];

export default function ProfilePage() {
  const router = useRouter();
  const colors = useColors();

  const [profile, setProfile] = useState<ProfileData>({
    fullName: 'Aarav Mehta',
    dateOfBirth: '14 Aug 1992',
    gender: 'Male',
    mobileNumber: '+91 98765 43210',
    email: 'aarav.mehta@email.com',
    bloodGroup: 'O+',
    address: 'Indiranagar, Bengaluru',
    emergencyContact: '+91 99887 66551',
  });

  const profileCompletion = 78;

  const handleSaveProfile = () => {
    Alert.alert('Success', 'Profile saved successfully!');
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16, paddingBottom: 32 }}
      >
        {/* Header */}
        <PageHeader
          title="My profile"
          onBackPress={() => router.back()}
        />

        {/* Profile Card */}
        <View
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
          className="border rounded-lg p-4 mb-8 mt-4 flex-row items-center gap-4"
        >
          <View
            style={{ backgroundColor: colors.primary }}
            className="w-16 h-16 rounded-lg items-center justify-center"
          >
            <Text className="text-2xl font-bold" style={{ color: colors.primaryForeground }}>
              {profile.fullName.split(' ').map((n) => n[0]).join('')}
            </Text>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text style={{ color: colors.foreground }} className="text-lg font-bold">
                {profile.fullName}
              </Text>
              <Text className="text-lg">✓</Text>
            </View>
            <Text style={{ color: colors.mutedForeground }} className="text-sm mt-1">
              Member since August 2024
            </Text>
          </View>
        </View>

        {/* Profile Completion */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-2">
            <Text style={{ color: colors.mutedForeground }} className="text-xs font-bold">
              PROFILE COMPLETION
            </Text>
            <Text style={{ color: colors.primary }} className="text-sm font-bold">
              {profileCompletion}%
            </Text>
          </View>
          <View
            style={{ backgroundColor: colors.border, height: 8, borderRadius: 4 }}
            className="overflow-hidden"
          >
            <View
              style={{
                backgroundColor: colors.primary,
                width: `${profileCompletion}%`,
                height: '100%',
              }}
            />
          </View>
          <Text style={{ color: colors.mutedForeground }} className="text-xs mt-2">
            Add your email and address to complete your profile.
          </Text>
        </View>

        {/* Personal Details Section */}
        <View className="mb-8">
          <Text style={{ color: colors.foreground }} className="text-xl font-bold mb-4">
            Personal details
          </Text>

          {/* Full Name */}
          <InputField
            label="FULL NAME"
            placeholder="Enter full name"
            value={profile.fullName}
            onChangeText={(text) => setProfile({ ...profile, fullName: text })}
            editable={false}
          />

          {/* Date of Birth and Gender */}
          <View className="flex-row gap-4 mb-6">
            <View className="flex-1">
              <InputField
                label="DATE OF BIRTH"
                placeholder="DD MMM YYYY"
                value={profile.dateOfBirth}
                onChangeText={(text) => setProfile({ ...profile, dateOfBirth: text })}
                editable={false}
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
                  {profile.gender}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mobile Number */}
          <InputField
            label="MOBILE NUMBER"
            placeholder="+91 00000 00000"
            value={profile.mobileNumber}
            onChangeText={(text) => setProfile({ ...profile, mobileNumber: text })}
            editable={false}
          />

          {/* Email Address */}
          <InputField
            label="EMAIL ADDRESS"
            placeholder="email@example.com"
            value={profile.email}
            onChangeText={(text) => setProfile({ ...profile, email: text })}
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
                  onPress={() => setProfile({ ...profile, bloodGroup: bg })}
                  style={{
                    backgroundColor: profile.bloodGroup === bg ? colors.primary : colors.card,
                    borderColor: profile.bloodGroup === bg ? colors.primary : colors.border,
                  }}
                  className="border rounded-lg px-3 py-2"
                >
                  <Text
                    style={{
                      color: profile.bloodGroup === bg ? colors.primaryForeground : colors.foreground,
                    }}
                    className="text-sm font-medium"
                  >
                    {bg}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Emergency Details Section */}
        <View className="mb-8">
          <Text style={{ color: colors.foreground }} className="text-xl font-bold mb-4">
            Emergency details
          </Text>

          {/* Address */}
          <InputField
            label="ADDRESS"
            placeholder="Enter your address"
            value={profile.address}
            onChangeText={(text) => setProfile({ ...profile, address: text })}
            multiline
          />

          {/* Emergency Contact */}
          <InputField
            label="EMERGENCY CONTACT"
            placeholder="+91 00000 00000"
            value={profile.emergencyContact}
            onChangeText={(text) => setProfile({ ...profile, emergencyContact: text })}
            keyboardType="phone-pad"
          />
        </View>

        {/* Save Button */}
        <Button
          label="Save profile"
          variant="primary"
          icon="✓"
          onPress={handleSaveProfile}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
