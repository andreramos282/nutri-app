import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { DarkColors, LightColors } from '../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDiary } from '../../context/DiaryContext';

export default function DiaryScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? DarkColors : LightColors;
  const { entries } = useDiary();

  const grouped = entries.reduce((acc, entry) => {
    if (!acc[entry.refeicao]) acc[entry.refeicao] = [];
    acc[entry.refeicao].push(entry);
    return acc;
  }, {} as Record<string, typeof entries>);

  const refeicoes = Object.keys(grouped);

  return (
    <View style={[styles.flex, { backgroundColor: colors.background, padding: 20 }]}>
      {refeicoes.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <MaterialCommunityIcons name="notebook-outline" color={colors.text + '99'} size={64} />
          <Text style={{ color: colors.text + '99', fontSize: 18, marginTop: 12 }}>
            Nenhum alimento registrado no diário.
          </Text>
        </View>
      ) : (
        <FlatList
          data={refeicoes}
          keyExtractor={refeicao => refeicao}
          renderItem={({ item: refeicao }) => (
            <View style={[styles.card, { backgroundColor: colors.itemBg, borderColor: colors.border }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <MaterialCommunityIcons name="silverware-fork-knife" color={colors.text} size={22} style={{ marginRight: 8 }} />
                <Text style={[styles.refeicao, { color: colors.text }]}>{refeicao}</Text>
              </View>
              {grouped[refeicao].map((entry, idx) => (
                <Text key={idx} style={[styles.item, { color: colors.text + 'dd' }]}>
                  <MaterialCommunityIcons name="food" size={16} color={colors.text + '88'} /> {entry.alimento} 
                  <Text style={{ fontWeight: 'bold' }}> • {entry.quantidade}</Text> 
                  <Text style={{ color: colors.text + '99' }}> ({entry.horario})</Text>
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
});