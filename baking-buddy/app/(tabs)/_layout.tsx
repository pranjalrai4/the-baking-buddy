import { Text } from 'react-native';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#c8960c',
        tabBarInactiveTintColor: '#a08030',
        tabBarStyle: { backgroundColor: '#fffbea', borderTopColor: '#f0d060' },
        headerStyle: { backgroundColor: '#fffbea' },
        headerTintColor: '#c8960c',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Tabs.Screen name="home" options={{ title: 'Home', headerShown: false, tabBarIcon: () => <Text>🏠</Text> }} />
      <Tabs.Screen name="pantry" options={{ title: 'Pantry', headerShown: false, tabBarIcon: () => <Text>🧺</Text> }} />
      <Tabs.Screen name="swap" options={{ title: 'Swap', headerShown: false, tabBarIcon: () => <Text>🔄</Text> }} />
      <Tabs.Screen name="analyze" options={{ title: 'Analyze', headerShown: false, tabBarIcon: () => <Text>📸</Text> }} />
      <Tabs.Screen name="diary" options={{ title: 'Diary', headerShown: false, tabBarIcon: () => <Text>📓</Text>}} />
    </Tabs>
  );
}