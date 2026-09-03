import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './schema';

// Membuka database lokal SQLite bernama 'liftright.db'
const expoDb = openDatabaseSync('liftright.db', { enableChangeListener: true });

// Inisialisasi Drizzle ORM dengan skema relasional
export const db = drizzle(expoDb, { schema });