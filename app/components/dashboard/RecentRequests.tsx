import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useColors } from '../../hooks/use-color-scheme';

interface Request {
  id: string;
  type: string;
  status: 'completed' | 'in-progress' | 'pending';
  reference: string;
  date: string;
}

interface RecentRequestsProps {
  requests: Request[];
  onViewHistory?: () => void;
  onRequestPress?: (request: Request) => void;
}

const getStatusColor = (status: Request['status']): { bg: string; text: string } => {
  switch (status) {
    case 'completed':
      return { bg: '#D4EDDA', text: '#155724' };
    case 'in-progress':
      return { bg: '#D1ECF1', text: '#0C5460' };
    default:
      return { bg: '#FFF3CD', text: '#856404' };
  }
};

const getStatusLabel = (status: Request['status']): string => {
  switch (status) {
    case 'completed':
      return '✓ Completed';
    case 'in-progress':
      return '◐ In Progress';
    default:
      return '○ Pending';
  }
};

export const RecentRequests: React.FC<RecentRequestsProps> = ({
  requests,
  onViewHistory,
  onRequestPress,
}) => {
  const colors = useColors();

  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center mb-4">
        <Text style={{ color: colors.foreground }} className="text-2xl font-bold">
          Recent requests
        </Text>
        <TouchableOpacity onPress={onViewHistory}>
          <Text style={{ color: colors.primary }} className="font-semibold">
            View history
          </Text>
        </TouchableOpacity>
      </View>

      <View className="gap-3">
        {requests.map((request) => {
          const statusColors = getStatusColor(request.status);
          return (
            <TouchableOpacity
              key={request.id}
              onPress={() => onRequestPress?.(request)}
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
              className="rounded-lg border p-4 flex-row items-center justify-between"
            >
              <View className="flex-row items-center gap-3 flex-1">
                <View style={{ backgroundColor: '#FFE0E6' }} className="w-12 h-12 rounded-full items-center justify-center">
                  <Text className="text-lg">💓</Text>
                </View>
                <View className="flex-1">
                  <Text style={{ color: colors.foreground }} className="font-semibold">
                    {request.type}
                  </Text>
                  <Text style={{ color: colors.mutedForeground }} className="text-xs">
                    {request.reference} · {request.date}
                  </Text>
                </View>
              </View>
              <View
                style={{ backgroundColor: statusColors.bg }}
                className="px-3 py-1 rounded-full"
              >
                <Text style={{ color: statusColors.text }} className="text-xs font-semibold">
                  {getStatusLabel(request.status)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
