import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from './components/Button';
import { InfoMessage } from './components/InfoMessage';
import { InputField } from './components/InputField';
import { PageContent } from './components/PageContent';
import { PageHeader } from './components/PageHeader';
import { useColors } from './hooks/use-color-scheme';

export default function RegisterPage() {
  const router = useRouter();
  const colors = useColors();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOTP = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    // Navigate to OTP verification page
    router.push({
      pathname: '/verify-otp',
      params: { phoneNumber, isEmergency: 'false' },
    });
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 16 }}
      >
        {/* Header */}
        <PageHeader 
          title="Create your account"
          onBackPress={() => router.back()}
        />

        {/* Content */}
        <PageContent
          icon="📱"
          title="Your number, your care."
          subtitle="We'll use your mobile number to keep your EIC account safe."
        >
          {/* Input Field */}
          <InputField
            label="MOBILE NUMBER"
            placeholder="+91 00000 00000"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={13}
          />

          {/* Info Message */}
          <InfoMessage message="We'll send a one-time password to this number." />

          {/* Send OTP Button */}
          <Button
            label="Send OTP"
            variant="primary"
            icon="→"
            onPress={handleSendOTP}
          />

          {/* Sign In Link */}
          <View className="flex-row justify-center items-center gap-1 mt-6 mb-8">
            <Text className="text-sm" style={{ color: colors.mutedForeground }}>
              Already registered?{' '}
            </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
                Sign in instead
              </Text>
            </TouchableOpacity>
          </View>
        </PageContent>
      </ScrollView>
    </SafeAreaView>
  );
}
