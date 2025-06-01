import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { DarkColors, LightColors } from '../../constants/Colors';
export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? DarkColors : LightColors;

  const [pesoInicial, setPesoInicial] = useState('');
  const [pesoMeta, setPesoMeta] = useState('');
  const [metaKcal, setMetaKcal] = useState('');

  const salvarPerfil = () => {
    Alert.alert('Perfil salvo!', `Peso inicial: ${pesoInicial}\nMeta: ${pesoMeta}\nKcal: ${metaKcal}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Peso Inicial (kg):</Text>
      <TextInput
        value={pesoInicial}
        onChangeText={setPesoInicial}
        keyboardType="numeric"
        style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
        placeholder="Ex: 70"
        placeholderTextColor={colors.text + '99'}
      />
      <Text style={{ color: colors.text }}>Meta de Peso (kg):</Text>
      <TextInput
        value={pesoMeta}
        onChangeText={setPesoMeta}
        keyboardType="numeric"
        style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
        placeholder="Ex: 65"
        placeholderTextColor={colors.text + '99'}
      />
      <Text style={{ color: colors.text }}>Meta de Calorias (kcal/dia):</Text>
      <TextInput
        value={metaKcal}
        onChangeText={setMetaKcal}
        keyboardType="numeric"
        style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
        placeholder="Ex: 2000"
        placeholderTextColor={colors.text + '99'}
      />
      <View style={styles.buttonWrapper}>
        <Button title="Salvar" onPress={salvarPerfil} color={colors.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4, fontSize: 16 },
  buttonWrapper: { marginTop: 12 }
});