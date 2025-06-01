import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { DarkColors, LightColors } from '../../constants/Colors';
export default function DiaryScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? DarkColors : LightColors;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text, fontSize: 18 }}>Diário alimentar (em construção)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, alignItems: 'center', justifyContent: 'center' }
});