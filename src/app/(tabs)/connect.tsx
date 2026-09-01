import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { useDeviceConnection } from '../../ble/useDeviceConnection';
import { FrostedCard } from '../../components/FrostedCard';

export default function ConnectScreen() {
  const router = useRouter();
  
  // Memanggil mesin BLE dari hook
  const {
    connectedDevice,
    isScanning,
    connectionState,
    startScan,
    stopScan,
    connectToDevice,
    disconnectDevice,
  } = useDeviceConnection();

  const [discoveredDevices, setDiscoveredDevices] = useState<Device[]>([]);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationStep, setCalibrationStep] = useState(0);

  // Fungsi untuk memulai pemindaian dan menampung perangkat yang ditemukan
  const handleScan = () => {
    setDiscoveredDevices([]);
    startScan((device) => {
      setDiscoveredDevices((prev) => {
        if (!prev.some((d) => d.id === device.id)) {
          return [...prev, device];
        }
        return prev;
      });
    });
  };

  const startCalibration = () => {
    setIsCalibrating(true);
    setCalibrationStep(1);
    setTimeout(() => setCalibrationStep(2), 3000);
    setTimeout(() => {
      setCalibrationStep(3);
      setIsCalibrating(false);
    }, 6000);
  };

  return (
    <ScrollView className="flex-1 bg-background px-gutter pt-xl" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="max-w-md w-full mx-auto space-y-md">
        
        {/* Header Judul */}
        <View className="mb-sm flex-row justify-between items-center">
          <View>
            <Text className="text-label-md font-semibold tracking-[0.05em] text-primary uppercase">
              Preparation
            </Text>
            <Text className="text-[28px] font-bold text-on-surface tracking-[-0.01em]">
              Unit Punggung & Kalibrasi
            </Text>
          </View>
        </View>

        {/* Status Sensor Card Berdasarkan Koneksi Nyata */}
        <FrostedCard>
          <View className="flex-row justify-between items-center mb-base">
            <View className="flex-1">
              <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em]">
                Sensor Status
              </Text>
              <Text className="text-body-md text-on-surface-variant">
                Unit Punggung (T12–L1 & S1–S2)
              </Text>
            </View>
            <View className={`px-base py-xs rounded-full ${connectedDevice ? 'bg-primary/20' : 'bg-surface-dim'}`}>
              <Text className={`text-label-sm font-semibold ${connectedDevice ? 'text-primary' : 'text-outline'}`}>
                {connectionState}
              </Text>
            </View>
          </View>

          {/* Indikator Perangkat Terhubung / Tombol Scan */}
          {connectedDevice ? (
            <View className="py-2 border-t border-outline-variant/10 space-y-2">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <MaterialIcons name="bluetooth-connected" size={20} color="#2d4055" />
                  <View>
                    <Text className="text-sm font-semibold text-on-surface">
                      {connectedDevice.name || 'LiftRight Smart Sensor'}
                    </Text>
                    <Text className="text-[11px] text-outline">ID: {connectedDevice.id}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={disconnectDevice} className="px-3 py-1 bg-red-100 rounded-lg">
                  <Text className="text-xs font-medium text-red-600">Putuskan</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className="py-3 border-t border-outline-variant/10 items-center">
              <TouchableOpacity
                onPress={isScanning ? stopScan : handleScan}
                className="w-full py-3 bg-surface-container border border-outline-variant/30 rounded-xl items-center"
              >
                <Text className="text-sm font-semibold text-primary uppercase">
                  {isScanning ? 'Memindai Perangkat...' : 'Cari Perangkat (Scan)'}
                </Text>
              </TouchableOpacity>

              {/* Daftar Perangkat yang Ditemukan saat Scan */}
              {discoveredDevices.length > 0 && (
                <View className="w-full mt-3 space-y-2">
                  <Text className="text-xs text-outline font-medium">Perangkat Tersedia:</Text>
                  {discoveredDevices.map((dev) => (
                    <TouchableOpacity
                      key={dev.id}
                      onPress={() => connectToDevice(dev)}
                      className="p-3 bg-surface-container-high rounded-lg flex-row justify-between items-center"
                    >
                      <Text className="text-sm font-medium text-on-surface">{dev.name || 'ESP32-Device'}</Text>
                      <Text className="text-xs text-primary font-bold">HUBUNGKAN</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        </FrostedCard>

        {/* Panel Kalibrasi (Hanya aktif jika perangkat terhubung) */}
        <FrostedCard>
          <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-xs">
            Urutan Kalibrasi (20 Detik)
          </Text>
          <Text className="text-body-md text-on-surface-variant mb-md">
            {!connectedDevice 
              ? "Hubungkan perangkat terlebih dahulu untuk memulai kalibrasi."
              : calibrationStep === 0 && "Tekan tombol di bawah untuk memulai kalibrasi posisi netral."}
            {calibrationStep === 1 && "Fase 1: Berdiri diam selama 5 detik..."}
            {calibrationStep === 2 && "Fase 2: Membungkuk penuh lalu tegak lagi..."}
            {calibrationStep === 3 && "Kalibrasi Selesai! Alat siap digunakan."}
          </Text>

          <TouchableOpacity
            onPress={startCalibration}
            disabled={!connectedDevice || isCalibrating}
            className={`py-3 rounded-lg items-center mb-3 ${
              !connectedDevice || isCalibrating ? 'bg-surface-dim opacity-50' : 'bg-primary'
            }`}
          >
            <Text className="text-on-primary font-semibold text-label-md uppercase tracking-[0.05em]">
              {isCalibrating ? 'Sedang Kalibrasi...' : calibrationStep === 3 ? 'Kalibrasi Ulang' : 'Mulai Kalibrasi'}
            </Text>
          </TouchableOpacity>
        </FrostedCard>

        {/* Tombol Pindah ke Sesi Latihan */}
        <TouchableOpacity 
          onPress={() => router.push('/session')}
          className="bg-primary h-14 rounded-xl items-center justify-center shadow-md"
        >
          <Text className="text-on-primary font-bold text-base tracking-wide uppercase">
            Mulai Sesi Latihan
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}