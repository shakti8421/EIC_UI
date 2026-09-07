import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useColors } from '../hooks/use-color-scheme';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'phone-pad' | 'email-address' | 'numeric';
  maxLength?: number;
  secureTextEntry?: boolean;
  multiline?: boolean;
  editable?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength,
  secureTextEntry = false,
  multiline = false,
  editable = true,
}) => {
  const colors = useColors();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="gap-2 mb-4">
      <Text 
        className="text-xs font-semibold tracking-wide"
        style={{ color: colors.foreground }}
      >
        {label}
      </Text>
      <View className="relative">
        <TextInput
          style={{
            borderColor: colors.border,
            borderWidth: 1,
            color: colors.foreground,
            paddingRight: secureTextEntry ? 50 : 24,
            opacity: editable ? 1 : 0.6,
          }}
          className="rounded-2xl px-6 py-4 text-base"
          placeholder={placeholder}
          placeholderTextColor={colors.mutedForeground}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry && !showPassword}
          multiline={multiline}
          editable={editable}
          numberOfLines={multiline ? 4 : 1}
        />
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4"
          >
            <Text className="text-lg">{showPassword ? '👁️' : '🙈'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
