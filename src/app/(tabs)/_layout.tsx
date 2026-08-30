import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#f9f9f9' } }}>
      <Tabs.Screen name="connect" options={{ title: 'Connect' }} />
      <Tabs.Screen name="session" options={{ title: 'Session' }} />
      <Tabs.Screen name="analysis" options={{ title: 'Analysis' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
    </Tabs>
  );
}