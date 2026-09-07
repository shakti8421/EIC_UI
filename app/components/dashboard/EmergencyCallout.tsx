import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useColors } from '../../hooks/use-color-scheme';

interface EmergencyCalloutProps {
  onPress?: () => void;
}

export const EmergencyCallout: React.FC<EmergencyCalloutProps> = ({ onPress }) => {
  const colors = useColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: '#D63031' }}
      className="rounded-2xl px-6 py-4 flex-row items-center justify-between mb-8"
    >
      <View className="flex-row items-center gap-4 flex-1">
        <Text className="text-2xl">❗</Text>
        <View className="flex-1">
          <Text className="text-white font-semibold mb-1">Need emergency help?</Text>
          <Text className="text-white text-sm opacity-90">Our response team is ready 24/7.</Text>
        </View>
      </View>
      <Text className="text-white text-xl">→</Text>
    </TouchableOpacity>
  );
};
