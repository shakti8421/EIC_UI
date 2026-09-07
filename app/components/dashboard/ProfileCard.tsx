import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useColors } from '../../hooks/use-color-scheme';

interface ProfileCardProps {
  userName: string;
  profileComplete: number;
  onCompleteProfile?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  userName,
  profileComplete,
  onCompleteProfile,
}) => {
  const colors = useColors();

  return (
    <View
      style={{ backgroundColor: colors.primary }}
      className="rounded-3xl p-6 mb-6 overflow-hidden"
    >
      <View className="flex-row justify-between items-start mb-6">
        <View className="flex-1">
          <Text style={{ color: colors.primaryForeground }} className="text-white opacity-80 mb-2">
            YOUR CARE PROFILE
          </Text>
          <Text style={{ color: colors.primaryForeground }} className="text-3xl font-bold">
            You're ready for{'\n'}when it matters.
          </Text>
          <Text style={{ color: colors.primaryForeground }} className="text-sm opacity-90 mt-3">
            Your information helps us respond faster.
          </Text>
        </View>

        {/* Progress Circle */}
        <View className="items-center gap-2">
          <View className="w-20 h-20 rounded-full border-4 border-yellow-300 items-center justify-center">
            <Text style={{ color: colors.primaryForeground }} className="text-2xl font-bold">
              {profileComplete}%
            </Text>
            <Text style={{ color: colors.primaryForeground }} className="text-xs">
              complete
            </Text>
          </View>
        </View>
      </View>

      {/* Complete Profile Button */}
      {onCompleteProfile && (
        <TouchableOpacity onPress={onCompleteProfile} className="flex-row items-center gap-2">
          <Text style={{ color: colors.primaryForeground }} className="font-semibold text-white">
            Complete profile
          </Text>
          <Text style={{ color: colors.primaryForeground }}>→</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
