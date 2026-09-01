import { useState, useCallback } from 'react';
import { Device, BleError } from 'react-native-ble-plx';
import { bleManager } from './manager';
import { LIFT_RIGHT_SERVICE_UUID } from './constants';
import { Platform } from 'react-native';

export function useDeviceConnection() {
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [connectionState, setConnectionState] = useState<string>('DISCONNECTED');

  // Fungsi untuk memindai perangkat LiftRight
  const startScan = useCallback((onDeviceFound: (device: Device) => void) => {
    setIsScanning(true);
    bleManager.startDeviceScan([LIFT_RIGHT_SERVICE_UUID], null, (error, device) => {
      if (error) {
        console.warn(error);
        setIsScanning(false);
        return;
      }
      if (device) {
        onDeviceFound(device);
      }
    });
  }, []);

  const stopScan = useCallback(() => {
    bleManager.stopDeviceScan();
    setIsScanning(false);
  }, []);

  // Fungsi untuk menyambungkan perangkat
  const connectToDevice = async (device: Device) => {
    stopScan();
    setConnectionState('CONNECTING');

    try {
      const deviceConnection = await device.connect();
      
      // Temukan seluruh service & characteristic
      await deviceConnection.discoverAllServicesAndCharacteristics();

      // Penyesuaian MTU khusus Android agar payload tidak terpotong (20+ byte)
      if (Platform.OS === 'android') {
        try {
          await deviceConnection.requestMTU(247);
        } catch (mtuErr) {
          console.warn("Gagal meminta MTU:", mtuErr);
        }
      }

      setConnectedDevice(deviceConnection);
      setConnectionState('CONNECTED');

      // Pantau jika perangkat terputus di tengah jalan (disconnection handler)
      deviceConnection.onDisconnected((error: BleError | null) => {
        console.warn("Perangkat terputus:", error);
        setConnectedDevice(null);
        setConnectionState('DISCONNECTED');
        // Di sini bisa ditambahkan logika reconnect otomatis (exponential backoff)
      });

    } catch (err) {
      console.error("Koneksi gagal:", err);
      setConnectionState('ERROR');
    }
  };

  const disconnectDevice = async () => {
    if (connectedDevice) {
      await connectedDevice.cancelConnection();
      setConnectedDevice(null);
      setConnectionState('DISCONNECTED');
    }
  };

  return {
    connectedDevice,
    isScanning,
    connectionState,
    startScan,
    stopScan,
    connectToDevice,
    disconnectDevice,
  };
}