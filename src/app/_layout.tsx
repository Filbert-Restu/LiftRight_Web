import { db } from '@/db/client';
import migrations from '@/db/migrations/migrations';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

// Import CSS ini wajib agar Tailwind / NativeWind bisa bekerja
import '../global.css';

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  // Tampilkan layar muat/error jika migrasi database gagal atau sedang berjalan
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>
          Gagal menyiapkan database lokal: {error.message}
        </Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Menyiapkan penyimpanan database lokal...</Text>
      </View>
    );
  }

  return (
    <Stack>
      {/* Matikan header bawaan Stack agar tidak bentrok dengan desain kita */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}