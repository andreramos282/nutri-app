import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { DarkColors, LightColors } from '../../constants/Colors';
export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? DarkColors : LightColors;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Bem-vindo ao Nutri App!</Text>
      <Text style={[styles.text, { color: colors.text }]}>Acesse as abas abaixo para navegar.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  text: { fontSize: 18, textAlign: 'center', marginBottom: 8 }
});