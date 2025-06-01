import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useColorScheme } from 'react-native';
import { DarkColors, LightColors } from '../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDiary } from '../../context/DiaryContext';

type Food = { nome: string; id: string };

const ALIMENTOS: Food[] = [
  { id: '1', nome: 'Arroz' },
  { id: '2', nome: 'Feijão' },
  { id: '3', nome: 'Batata' },
  { id: '4', nome: 'Frango' },
];

export default function FoodSearchScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? DarkColors : LightColors;
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Food | null>(null);
  const [quantidade, setQuantidade] = useState('');
  const [refeicao, setRefeicao] = useState('');
  const [horario, setHorario] = useState('');
  const { addEntry } = useDiary();

  const alimentosFiltrados = search.length > 0
    ? ALIMENTOS.filter(a => a.nome.toLowerCase().includes(search.toLowerCase()))
    : ALIMENTOS;

  function handleSelect(item: Food) {
    setSelected(item);
  }

  function handleAdd() {
    if (selected && quantidade && refeicao && horario) {
      addEntry({
        alimento: selected.nome,
        quantidade,
        refeicao,
        horario,
      });
      setSelected(null);
      setQuantidade('');
      setRefeicao('');
      setHorario('');
      setSearch('');
    }
  }

  if (selected) {
    return (
      <KeyboardAvoidingView
        style={[styles.flex, { backgroundColor: colors.background, padding: 20 }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.card, { backgroundColor: colors.itemBg, borderColor: colors.border }]}>
          <Text style={[styles.foodTitle, { color: colors.text }]}>{selected.nome}</Text>
          <TextInput
            placeholder="Quantidade (ex: 100g)"
            value={quantidade}
            onChangeText={setQuantidade}
            style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.inputBg }]}
            placeholderTextColor={colors.text + '99'}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Refeição (ex: Almoço)"
            value={refeicao}
            onChangeText={setRefeicao}
            style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.inputBg }]}
            placeholderTextColor={colors.text + '99'}
          />
          <TextInput
            placeholder="Horário (ex: 12:00)"
            value={horario}
            onChangeText={setHorario}
            style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.inputBg }]}
            placeholderTextColor={colors.text + '99'}
          />
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.tabBar }]} onPress={handleAdd}>
            <MaterialCommunityIcons name="plus" color={colors.text} size={22} />
            <Text style={[styles.buttonText, { color: colors.text }]}>Adicionar ao Diário</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected(null)} style={styles.cancelButton}>
            <Text style={{ color: colors.text + '99' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={[styles.flex, { backgroundColor: colors.background, padding: 20 }]}>
      <TextInput
        placeholder="Buscar alimento..."
        value={search}
        onChangeText={setSearch}
        style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.inputBg }]}
        placeholderTextColor={colors.text + '99'}
      />
      <FlatList
        data={alimentosFiltrados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            style={[styles.card, { backgroundColor: colors.itemBg, borderColor: colors.border }]}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="food-apple" color={colors.text} size={26} style={{ marginRight: 10 }} />
              <Text style={[styles.foodTitle, { color: colors.text }]}>{item.nome}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <Text style={{ color: colors.text + '99', textAlign: 'center', marginTop: 16 }}>Nenhum alimento encontrado.</Text>
        }
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
  },
  foodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginTop: 10,
    gap: 6,
    elevation: 1,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    alignSelf: 'center',
    marginTop: 12,
  },
});