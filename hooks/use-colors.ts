// theme.ts
import { useColorScheme } from 'react-native';

const lightColors = {
  background: '#fff',
  text: '#000',
  primary: '#1e90ff',
};

const darkColors = {
  background: '#000',
  text: '#fff',
  primary: '#ff6347',
};

// Dynamic hook that returns theme-aware colors object
export function useColors() {
  const theme = useColorScheme() ?? 'light';
  return theme === 'dark' ? darkColors : lightColors;
}
