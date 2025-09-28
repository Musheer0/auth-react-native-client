import React from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useColors } from '@/hooks/use-colors';

export default function TabLayout() {
  const colors = useColors()

  return (
    <View style={{ flex:1, backgroundColor:colors.background,}}>
      <Slot /> {/* renders child screens like index.tsx, explore.tsx */}
    </View>
  );
}
