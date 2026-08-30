import { Stack } from 'expo-router';
// Import CSS ini wajib agar Tailwind / NativeWind bisa bekerja
import '../global.css'; 

export default function RootLayout() {
  return (
    <Stack>
      {/* Matikan header bawaan Stack agar tidak bentrok dengan desain kita */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}