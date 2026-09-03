import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false, 
        tabBarStyle: { backgroundColor: '#f9f9f9' },
        tabBarActiveTintColor: '#2d4055',   // Warna saat tab dipilih (aktif)
        tabBarInactiveTintColor: '#8e9eab', // Warna saat tab tidak dipilih
      }}
    >
      <Tabs.Screen 
        name="connect" 
        options={{ 
          title: 'Connect',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bluetooth" size={20} color={color} />
          ),
        }} 
      />
      <Tabs.Screen name="session" options={{ title: 'Session' }} />
      <Tabs.Screen 
        name="analysis" 
        options={{ 
          title: 'Analysis',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bar-chart" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
    </Tabs>
  );
}