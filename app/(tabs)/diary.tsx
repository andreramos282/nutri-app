import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import { DarkColors, LightColors } from '../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDiary } from '../../context/DiaryContext';

export default function DiaryScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? DarkColors : LightColors;
  const { entries, refeicoes, addRefeicao } = useDiary();

  // Agrupa alimentos por refeição
  const grouped = entries.reduce((acc, entry) => {
    if (!acc[entry.refeicao]) acc[entry.refeicao] = [];
    acc[entry.refeicao].push(entry);
    return acc;
  }, {} as Record<string, typeof entries>);

  // Form para adicionar nova refeição
  const [novaRefeicao, setNovaRefeicao] = useState('');
  const [novoHorario, setNovoHorario] = useState('');

  return (
    <View style={[styles.flex, { backgroundColor: colors.background, padding: 20 }]}>
      <View style={[styles.card, { backgroundColor: colors.itemBg, borderColor: colors.border, marginBottom: 18 }]}>
        <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 16 }}>Adicionar nova refeição</Text>
        <TextInput
          placeholder="Nome da refeição"
          value={novaRefeicao}
          onChangeText={setNovaRefeicao}
          style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
          placeholderTextColor={colors.text + '99'}
        />
        <TextInput
          placeholder="Horário (ex: 15:30)"
          value={novoHorario}
          onChangeText={setNovoHorario}
          style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
          placeholderTextColor={colors.text + '99'}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.tabBar }]}
          onPress={() => {
            if (novaRefeicao && novoHorario) {
              addRefeicao(novaRefeicao, novoHorario);
              setNovaRefeicao('');
              setNovoHorario('');
            }
          }}
        >
          <MaterialCommunityIcons name="plus" color={colors.text} size={21} />
          <Text style={[styles.buttonText, { color: colors.text }]}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      {Object.keys(grouped).length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <MaterialCommunityIcons name="notebook-outline" color={colors.text + '99'} size={64} />
          <Text style={{ color: colors.text + '99', fontSize: 18, marginTop: 12 }}>
            Nenhum alimento registrado no diário.
          </Text>
        </View>
      ) : (
        <FlatList
          data={Object.keys(grouped)}
          keyExtractor={refeicao => refeicao}
          renderItem={({ item: refeicao }) => (
            <View style={[styles.card, { backgroundColor: colors.itemBg, borderColor: colors.border }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <MaterialCommunityIcons name="silverware-fork-knife" color={colors.text} size={22} style={{ marginRight: 8 }} />
                <Text style={[styles.refeicao, { color: colors.text }]}>{refeicao}</Text>
              </View>
              {grouped[refeicao].map((entry, idx) => (
                <Text key={idx} style={[styles.item, { color: colors.text + 'dd' }]}>
                  <MaterialCommunityIcons name="food" size={16} color={colors.text + '88'} /> {entry.nome} - {entry.quantidade}g
                  <Text style={{ color: colors.text + '99' }}> ({entry.horario})</Text>
                  <Text style={{ fontSize: 12, color: colors.text + '77' }}>
                    {'\n'}Kcal: {Math.round(entry.nutrientes.calorias)}, Prot: {entry.nutrientes.proteinas.toFixed(1)}g, Carb: {entry.nutrientes.carboidratos.toFixed(1)}g, Gord: {entry.nutrientes.gorduras.toFixed(1)}g
                  </Text>
                </Text>
              ))}
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    marginBottom: 8,
  },
  refeicao: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  item: {
    fontSize: 16,
    marginLeft: 4,
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 6,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 5,
  },
});