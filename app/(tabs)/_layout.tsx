import { Tabs } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
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
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="food-search"
        options={{
          title: 'Buscar Alimentos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-apple" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: 'Diário',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="notebook" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progresso',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="show-chart" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}