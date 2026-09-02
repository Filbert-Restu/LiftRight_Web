import { BleManager } from 'react-native-ble-plx';

// Mencegah error 'createClient of undefined' jika dijalankan di lingkungan 
// yang belum mendukung native module (seperti web atau Expo Go biasa)
let manager: BleManager | null = null;

try {
  manager = new BleManager();
} catch (e) {
  console.warn("BleManager native module is not available. Using mock/fallback mode.");
}

export const bleManager = manager;