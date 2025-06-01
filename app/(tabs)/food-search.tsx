import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { DarkColors, LightColors } from '../../constants/Colors';
interface Product {
  id?: string;
  _id?: string;
  product_name: string;
  nutriments?: {
    [key: string]: any;
    'energy-kcal_100g'?: number;
    carbohydrates_100g?: number;
    proteins_100g?: number;
    fat_100g?: number;
  };
}

export default function FoodSearchScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? DarkColors : LightColors;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const searchFood = async (text: string) => {
    setQuery(text);
    if (text.length < 3) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(text)}&search_simple=1&action=process&json=1&page_size=10`);
      const data = await res.json();
      setResults(data.products || []);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        placeholder="Digite o alimento..."
        value={query}
        onChangeText={searchFood}
        style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
        placeholderTextColor={colors.text + '99'}
      />
      {loading && <ActivityIndicator color={colors.text} />}
      <FlatList
        data={results}
        keyExtractor={(item) => (item.id || item._id || Math.random().toString())}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.item, { backgroundColor: colors.itemBg, borderColor: colors.border }]}>
            <Text style={{ color: colors.text }}>{item.product_name}</Text>
            <Text style={[styles.nutrition, { color: colors.text + '99' }]}>
              {item.nutriments &&
                `Kcal: ${item.nutriments['energy-kcal_100g'] ?? '-'} | Carbs: ${item.nutriments.carbohydrates_100g ?? '-'}g | Prot: ${item.nutriments.proteins_100g ?? '-'}g | Gord: ${item.nutriments.fat_100g ?? '-'}g`}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !loading && query.length >= 3 ? (
            <Text style={{ color: colors.text + '99', textAlign: 'center', marginTop: 16 }}>Nenhum resultado.</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  input: { borderWidth: 1, marginBottom: 8, padding: 8, borderRadius: 4, fontSize: 16 },
  item: { padding: 12, borderBottomWidth: 1 },
  nutrition: { fontSize: 12, marginTop: 2 }
});