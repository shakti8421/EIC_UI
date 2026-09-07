import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from './components/Button';
import { InputField } from './components/InputField';
import { PageContent } from './components/PageContent';
import { PageHeader } from './components/PageHeader';
import { useAuth } from './context/AuthContext';
import { useColors } from './hooks/use-color-scheme';

export default function VerifyOTPPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colors = useColors();
  const { login } = useAuth();
  const [otp, setOtp] = useState('');
  const [isResending, setIsResending] = useState(false);

  const phoneNumber = (params.phoneNumber as string) || '8512480088';
  const isEmergency = params.isEmergency === 'true';

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) {
      Alert.alert('Error', 'Please enter the 6-digit OTP');
      return;
    }
    
    try {
      // Log in the user
      await login(phoneNumber);
      
      // Navigate based on flow
      if (isEmergency) {
        router.replace('/emergency-request');
      } else {
        router.replace('/dashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    }
  };

  const handleResendCode = () => {
    setIsResending(true);
    setTimeout(() => {
      Alert.alert('Success', 'OTP resent to your mobile number');
      setIsResending(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 16 }}
      >
        {/* Header */}
        <PageHeader 
          title="Verify mobile"
          onBackPress={() => router.back()}
        />

        {/* Content */}
        <PageContent
          icon="💬"
          title="Enter your OTP"
          subtitle={`We sent a 6-digit code to ${phoneNumber}.`}
        >
          {/* OTP Input Field */}
          <InputField
            label="ONE-TIME PASSWORD"
            placeholder="000000"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
          />

          {/* Resend Code Link */}
          <View className="flex-row justify-center items-center gap-1 mb-6">
            <Text className="text-sm" style={{ color: colors.mutedForeground }}>
              Didn't receive it?{' '}
            </Text>
            <TouchableOpacity onPress={handleResendCode} disabled={isResending}>
              <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
                Resend code
              </Text>
            </TouchableOpacity>
          </View>

          {/* Verify Button */}
          <Button
            label="Continue to request"
            variant="primary"
            icon="✓"
            onPress={handleVerifyOTP}
          />
        </PageContent>
      </ScrollView>
    </SafeAreaView>
  );
}
