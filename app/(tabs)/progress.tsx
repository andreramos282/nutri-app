import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useColorScheme } from 'react-native';
import { DarkColors, LightColors } from '../../constants/Colors';
import { useDiary } from '../../context/DiaryContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory-native';

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? DarkColors : LightColors;
  const { peso, addPeso } = useDiary();
  const [novoPeso, setNovoPeso] = useState('');

  const sortedPeso = [...peso].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  const dataChart = sortedPeso.map((it, idx) => ({
    x: idx + 1,
    y: it.peso,
    label: new Date(it.data).toLocaleDateString('pt-BR'),
  }));

  return (
    <View style={[styles.flex, { backgroundColor: colors.background, padding: 20 }]}>
      <View style={[styles.card, { backgroundColor: colors.itemBg, borderColor: colors.border, marginBottom: 18 }]}>
        <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 16 }}>Registrar peso</Text>
        <TextInput
          placeholder="Peso atual (kg)"
          value={novoPeso}
          onChangeText={setNovoPeso}
          style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
          placeholderTextColor={colors.text + '99'}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.tabBar }]}
          onPress={() => {
            if (Number(novoPeso) > 0) {
              addPeso(Number(novoPeso));
              setNovoPeso('');
            }
          }}
        >
          <MaterialCommunityIcons name="chart-line" color={colors.text} size={20} />
          <Text style={[styles.buttonText, { color: colors.text }]}>Registrar</Text>
        </TouchableOpacity>
      </View>
      {peso.length > 0 && (
        <View style={[styles.card, { backgroundColor: colors.itemBg, borderColor: colors.border }]}>
          <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Evolução do Peso</Text>
          <VictoryChart
            theme={VictoryTheme.material}
            width={Dimensions.get('window').width - 48}
            height={220}
          >
            <VictoryAxis
              tickFormat={(_, i) => dataChart[i]?.label || ''}
              style={{
                tickLabels: { angle: 45, fontSize: 10, fill: colors.text },
                axis: { stroke: colors.border },
                ticks: { stroke: colors.border },
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                tickLabels: { fontSize: 12, fill: colors.text },
                axis: { stroke: colors.border },
                ticks: { stroke: colors.border },
                grid: { stroke: colors.inputBg },
              }}
            />
            <VictoryLine
              data={dataChart}
              style={{
                data: { stroke: "#1976D2", strokeWidth: 3 },
              }}
              interpolation="monotoneX"
            />
          </VictoryChart>
          <FlatList
            data={sortedPeso}
            keyExtractor={item => item.data}
            renderItem={({ item }) => (
              <Text style={{ color: colors.text, fontSize: 14 }}>
                {new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })} - {item.peso} kg
              </Text>
            )}
            style={{ marginTop: 10 }}
          />
        </View>
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