import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { DarkColors, LightColors } from '../../constants/Colors';
export default function AppLayout() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? DarkColors : LightColors;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.tabBar, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text + '99',
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.text }
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
      <Tabs.Screen name="food-search" options={{ title: 'Buscar Alimentos' }} />
      <Tabs.Screen name="diary" options={{ title: 'Diário' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progresso' }} />
    </Tabs>
  );
}