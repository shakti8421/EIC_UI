import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useColors } from '../../hooks/use-color-scheme';

interface CareCicleProps {
  count: number;
  onSeeAll?: () => void;
  onAddWisher?: () => void;
}

export const CareCircle: React.FC<CareCicleProps> = ({ count, onSeeAll, onAddWisher }) => {
  const colors = useColors();

  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center mb-4">
        <Text style={{ color: colors.foreground }} className="text-2xl font-bold">
          Your care circle
        </Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={{ color: colors.primary }} className="font-semibold">
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-4">
        {/* Add Wish-er Card */}
        <TouchableOpacity
          onPress={onAddWisher}
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
          className="flex-1 rounded-lg border p-6 items-center justify-center gap-3"
        >
          <Text className="text-3xl">➕</Text>
          <Text style={{ color: colors.foreground }} className="font-semibold text-center text-sm">
            Add a well-wisher
          </Text>
        </TouchableOpacity>

        {/* Count Card */}
        <View
          style={{ backgroundColor: colors.accent }}
          className="flex-1 rounded-lg p-6 items-center justify-center gap-2"
        >
          <TouchableOpacity
          className="flex-1 rounded-lg items-center justify-center gap-2"
          onPress={onSeeAll}>
          <Text className="text-3xl">👥</Text>
          <Text style={{ color: colors.accentForeground }} className="text-2xl font-bold">
            {String(count).padStart(2, '0')}
          </Text>
          <Text style={{ color: colors.accentForeground }} className="text-xs text-center">
            people in your circle
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
