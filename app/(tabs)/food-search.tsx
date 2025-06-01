import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useColorScheme } from 'react-native';
import { DarkColors, LightColors } from '../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDiary } from '../../context/DiaryContext';
import { FOODS, Nutrientes } from '../../constants/foods';

function renderMacrosMicros(n: Nutrientes, quantidade: number, colors: any) {
  const fator = quantidade > 0 ? quantidade / 100 : 1;
  const macro = (val?: number, dec = 1) => val !== undefined ? (val * fator).toFixed(dec) : '';
  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <Text style={[styles.nutriente, { color: colors.text }]}>Calorias: {macro(n.calorias, 0)} kcal</Text>
      <Text style={styles.nutriente}>Proteínas: {macro(n.proteinas)} g</Text>
      <Text style={styles.nutriente}>Carboidratos: {macro(n.carboidratos)} g</Text>
      <Text style={styles.nutriente}>Gorduras: {macro(n.gorduras)} g</Text>
      <Text style={styles.nutriente}>Fibras: {macro(n.fibras)} g</Text>
      <Text style={styles.nutriente}>Cálcio: {macro(n.calcio, 0)} mg</Text>
      <Text style={styles.nutriente}>Ferro: {macro(n.ferro)} mg</Text>
      <Text style={styles.nutriente}>Sódio: {macro(n.sodio, 0)} mg</Text>
      <Text style={styles.nutriente}>Potássio: {macro(n.potassio, 0)} mg</Text>
      <Text style={styles.nutriente}>Vitamina C: {macro(n.vitaminaC, 1)} mg</Text>
    </View>
  );
}

export default function FoodSearchScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? DarkColors : LightColors;
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof FOODS[0] | null>(null);
  const [quantidade, setQuantidade] = useState('');
  const [refeicao, setRefeicao] = useState('');
  const [horario, setHorario] = useState('');
  const { addEntry, refeicoes } = useDiary();

  const alimentosFiltrados = search.length > 0
    ? FOODS.filter(a => a.nome.toLowerCase().includes(search.toLowerCase()))
    : FOODS;

  function handleSelect(item: typeof FOODS[0]) {
    setSelected(item);
  }

 function handleAdd() {
  if (selected && quantidade && refeicao && horario) {
    const fator = Number(quantidade) / 100;
    addEntry({
      alimentoId: selected.id,
      nome: selected.nome,
      quantidade: Number(quantidade),
      refeicao,
      horario,
      nutrientes: {
        calorias: selected.nutrientes.calorias * fator,
        proteinas: selected.nutrientes.proteinas * fator,
        carboidratos: selected.nutrientes.carboidratos * fator,
        gorduras: selected.nutrientes.gorduras * fator,
        calcio: selected.nutrientes.calcio * fator,
        ferro: selected.nutrientes.ferro * fator,
        sodio: selected.nutrientes.sodio * fator,
        potassio: selected.nutrientes.potassio ? selected.nutrientes.potassio * fator : 0,
        magnesio: selected.nutrientes.magnesio ? selected.nutrientes.magnesio * fator : 0,
        fibras: selected.nutrientes.fibras ? selected.nutrientes.fibras * fator : 0,
        vitaminaC: selected.nutrientes.vitaminaC ? selected.nutrientes.vitaminaC * fator : 0,
      }
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
            placeholder="Quantidade em gramas (ex: 100)"
            value={quantidade}
            onChangeText={setQuantidade}
            style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.inputBg }]}
            placeholderTextColor={colors.text + '99'}
            keyboardType="numeric"
          />
          {renderMacrosMicros(selected.nutrientes, Number(quantidade), colors)}
          <Text style={{ color: colors.text, fontWeight: 'bold', marginTop: 16 }}>Selecione a refeição:</Text>
          <FlatList
            data={refeicoes}
            horizontal
            keyExtractor={r => r.nome + r.horario}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: refeicao === item.nome ? colors.tabBar : colors.inputBg,
                  borderRadius: 8,
                  padding: 8,
                  marginRight: 8,
                  marginTop: 8,
                  borderWidth: 1,
                  borderColor: colors.border
                }}
                onPress={() => {
                  setRefeicao(item.nome);
                  setHorario(item.horario);
                }}
              >
                <Text style={{ color: colors.text }}>{item.nome} ({item.horario})</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={{ color: colors.text + '99' }}>Adicione uma refeição no diário.</Text>}
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
  nutriente: {
    fontSize: 16,
    marginBottom: 2,
  }
});