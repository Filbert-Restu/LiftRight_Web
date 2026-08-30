import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FrostedCard } from '../../components/FrostedCard';

export default function ConnectScreen() {
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationStep, setCalibrationStep] = useState(0);

  const startCalibration = () => {
    setIsCalibrating(true);
    setCalibrationStep(1);
    // Simulasi tahapan kalibrasi 3 fase
    setTimeout(() => setCalibrationStep(2), 3000);
    setTimeout(() => {
      setCalibrationStep(3);
      setIsCalibrating(false);
    }, 6000);
  };

  return (
    <View className="flex-1 bg-background p-margin justify-center">
      <View className="max-w-md w-full mx-auto space-y-md">
        
        {/* Header Judul */}
        <View className="mb-sm">
          <Text className="text-label-md font-semibold tracking-[0.05em] text-primary uppercase">
            Preparation
          </Text>
          <Text className="text-[28px] font-bold text-on-surface tracking-[-0.01em]">
            Unit Punggung & Kalibrasi
          </Text>
        </View>

        {/* Status Sensor Card */}
        <FrostedCard>
          <View className="flex-row justify-between items-center mb-base">
            <View>
              <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em]">
                Sensor Status
              </Text>
              <Text className="text-body-md text-on-surface-variant">
                T12-L1 & S1-S2 (Terhubung)[cite: 1, 2]
              </Text>
            </View>
            <View className="bg-primary/20 px-base py-xs rounded-full">
              <Text className="text-label-sm font-semibold text-primary">ACTIVE</Text>
            </View>
          </View>
          
          <View className="border-t border-outline-variant/30 pt-base mt-2 flex-row justify-between">
            <Text className="text-body-md text-outline">Baterai Perangkat</Text>
            <Text className="text-body-md font-semibold text-on-surface">94%</Text>
          </View>
        </FrostedCard>

        {/* Panel Kalibrasi */}
        <FrostedCard>
          <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-xs">
            Urutan Kalibrasi (20 Detik)[cite: 2]
          </Text>
          <Text className="text-body-md text-on-surface-variant mb-md">
            {calibrationStep === 0 && "Tekan tombol di bawah untuk memulai kalibrasi posisi netral dan kelenturan."}
            {calibrationStep === 1 && "Fase 1: Berdiri diam selama 5 detik (Mencatat posisi netral)..."}
            {calibrationStep === 2 && "Fase 2: Membungkuk penuh lalu tegak lagi satu kali..."}
            {calibrationStep === 3 && "Kalibrasi Selesai! Alat siap digunakan untuk latihan."}
          </Text>

          <TouchableOpacity
            onPress={startCalibration}
            disabled={isCalibrating}
            className={`py-sm rounded-lg items-center ${
              isCalibrating ? 'bg-surface-dim' : 'bg-primary'
            }`}
          >
            <Text className="text-on-primary font-semibold text-label-md uppercase tracking-[0.05em]">
              {isCalibrating ? 'Sedang Kalibrasi...' : calibrationStep === 3 ? 'Kalibrasi Ulang' : 'Mulai Kalibrasi'}
            </Text>
          </TouchableOpacity>
        </FrostedCard>

      </View>
    </View>
  );
}