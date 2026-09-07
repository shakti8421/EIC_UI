import { useColorScheme as rnUseColorScheme } from 'react-native';
import colors from '../../constants/colors';

export function useColors() {
  const colorScheme = rnUseColorScheme();
  return colors.light; // Always return light theme for now, can expand later
}
