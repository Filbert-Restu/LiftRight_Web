import { Redirect } from 'expo-router';

export default function Index() {
  // Langsung arahkan pengguna ke tab session saat aplikasi dibuka
  return <Redirect href="/connect" />;
}