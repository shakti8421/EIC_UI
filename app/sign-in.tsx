import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from './components/Button';
import { InputField } from './components/InputField';
import { PageContent } from './components/PageContent';
import { PageHeader } from './components/PageHeader';
import { useAuth } from './context/AuthContext';
import { useColors } from './hooks/use-color-scheme';

export default function SignInPage() {
  const router = useRouter();
  const colors = useColors();
  const { login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please enter both phone number and password');
      return;
    }
    
    try {
      await login(phoneNumber);
      router.replace('/dashboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Password Reset', 'Password reset link sent to your email');
  };

  const handleCreateAccount = () => {
    router.push('/register');
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 16 }}
      >
        {/* Header */}
        <PageHeader 
          title="Welcome back"
          onBackPress={() => router.back()}
        />

        {/* Content */}
        <PageContent
          icon="❤️"
          title="Good to see you."
          subtitle="Sign in to stay close to your care circle."
        >
          {/* Mobile Number Input */}
          <InputField
            label="MOBILE NUMBER"
            placeholder="+91 00000 00000"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={13}
          />

          {/* Password Input */}
          <InputField
            label="PASSWORD"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          {/* Forgot Password Link */}
          <View className="mb-6 items-end">
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <Button
            label="Sign in"
            variant="primary"
            icon="→"
            onPress={handleSignIn}
          />

          {/* Create Account Link */}
          <View className="flex-row justify-center items-center gap-1 mt-6 mb-8">
            <Text className="text-sm" style={{ color: colors.mutedForeground }}>
              New to EIC?{' '}
            </Text>
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
                Create account
              </Text>
            </TouchableOpacity>
          </View>
        </PageContent>
      </ScrollView>
    </SafeAreaView>
  );
}
           
