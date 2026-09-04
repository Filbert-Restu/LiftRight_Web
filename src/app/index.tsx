import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../sync/supabase';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // Cek sesi aktif dari Supabase saat aplikasi pertama kali dibuka
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-surface">
        <ActivityIndicator size="large" color="#2d4055" />
      </View>
    );
  }

  // Jika sudah login arahkan ke connect, jika belum arahkan ke login
  return isAuthenticated ? <Redirect href="/(tabs)/connect" /> : <Redirect href="/login" />;
}