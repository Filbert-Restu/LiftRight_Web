import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { mockRepSummaries } from '../../ble/mock/MockBleTransport';
import { saveCompleteSession } from '../../db/queries';
import { useSessionStore } from '../../stores/sessionStore';

export default function SessionScreen() {
  const router = useRouter();
  const { sessionId, exercise, startedAt, sets, addSetData, resetSession } = useSessionStore();
  
  const [currentRep, setCurrentRep] = useState(mockRepSummaries[0]);
  const [isPaused, setIsPaused] = useState(false);

  // Simulasi data masuk bergantian tiap 4 detik
  useEffect(() => {
    if (isPaused) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % mockRepSummaries.length;
      const repData = mockRepSummaries[index];
      setCurrentRep(repData);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  // Fungsi saat set/sesi diselesaikan
  const handleFinishSetOrSession = async () => {
    // 1. Bungkus data simulasi saat ini sebagai bagian dari set
    const currentSetPayload = {
      id: Date.now().toString(),
      setIndex: sets.length + 1,
      loadKg: 60, // Contoh beban default (kg), bisa disesuaikan
      repCount: currentRep.repIndex,
      efficiencyScore: 88,
      velocityLossPct: 12,
      stickingAngleDeg: 45,
      classification: currentRep.classification || 'Good',
      reps: [
        {
          id: 'rep-' + Date.now(),
          repIndex: currentRep.repIndex,
          peakVelocity: currentRep.peakVelocity,
          meanVelocity: currentRep.meanVelocity || 0.5,
          trunkAngleMin: 10,
          trunkAngleMax: 45,
          deviationScore: 5,
          classification: 'Stable',
          confidence: 0.95,
        }
      ]
    };

    // 2. Masukkan ke store sementara
    addSetData(currentSetPayload);

    // 3. Jika ini akhir sesi, simpan permanen ke SQLite
    const finalSessionData = {
      id: sessionId || Date.now().toString(),
      exercise: exercise || 'Barbell Squat',
      startedAt: startedAt || Date.now() - 60000,
      endedAt: Date.now(),
      totalVolumeKg: 60 * currentRep.repIndex,
      avgEfficiency: 88,
      sets: [...sets, currentSetPayload],
    };

    const success = await saveCompleteSession(finalSessionData);

    if (success) {
      resetSession(); // Bersihkan state sesi aktif
      router.push('/(tabs)/history'); // Lempar otomatis ke tab History
    } else {
      console.error('Gagal menyimpan sesi ke database lokal.');
    }
  };

  return (
    <ScrollView 
      className="flex-1 bg-background" 
      contentContainerStyle={{ padding: 24, paddingBottom: 140, justifyContent: 'space-between', flexGrow: 1 }}
    >
      <View className="max-w-md w-full mx-auto" style={{ gap: 28 }}>
        
        {/* Header Atas */}
        <View className="items-center mt-2">
          <Text className="text-xl font-extrabold text-on-surface tracking-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>
            {exercise || 'Barbell Squat'}
          </Text>
          <Text className="text-xs text-outline font-medium mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Set {sets.length + 1}
          </Text>
        </View>

        {/* Indikator Utama Lingkaran Kecepatan */}
        <View className="items-center justify-center py-4">
          <View className="w-64 h-64 rounded-full border-4 border-outline-variant/20 items-center justify-center bg-surface-container-lowest shadow-sm p-4">
            <Text className="text-[56px] font-black text-on-surface tracking-tighter" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {currentRep.peakVelocity.toFixed(2)}
            </Text>
            <Text className="text-xs font-bold text-outline tracking-widest uppercase mt-[-2px]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              M / S
            </Text>
            <Text className="text-xs text-outline font-medium mt-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {currentRep.repIndex} / 4 REPS
            </Text>
          </View>
        </View>

        {/* Metrik Pendukung Bawah (Speed Drop & Efficiency) */}
        <View className="flex-row gap-4">
          <View className="flex-1 bg-surface-container-lowest p-6 rounded-3xl items-center border border-outline-variant/20 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Feather name="trending-down" size={16} color="#ba1a1a" />
              <Text className="text-2xl font-black text-error ml-1.5" style={{ fontFamily: 'system-ui, sans-serif' }}>-12%</Text>
            </View>
            <Text className="text-[10px] font-bold text-outline uppercase tracking-wider" style={{ fontFamily: 'system-ui, sans-serif' }}>Speed Drop</Text>
          </View>

          <View className="flex-1 bg-surface-container-lowest p-6 rounded-3xl items-center border border-outline-variant/20 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Ionicons name="flash-outline" size={16} color="#2d4055" />
              <Text className="text-2xl font-black text-primary ml-1.5" style={{ fontFamily: 'system-ui, sans-serif' }}>88%</Text>
            </View>
            <Text className="text-[10px] font-bold text-outline uppercase tracking-wider" style={{ fontFamily: 'system-ui, sans-serif' }}>Efficiency</Text>
          </View>
        </View>

      </View>

      {/* Tombol Kontrol Bawah (Pause & Finish Set) */}
      <View className="max-w-md w-full mx-auto flex-row items-center gap-4 pt-4">
        <TouchableOpacity 
          onPress={() => setIsPaused(!isPaused)}
          className="w-14 h-14 bg-surface-container-lowest border border-outline-variant/30 rounded-full items-center justify-center shadow-sm"
        >
          <Ionicons name={isPaused ? "play" : "pause"} size={20} color="#1a1c1c" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleFinishSetOrSession}
          className="flex-1 bg-primary h-14 rounded-full items-center justify-center shadow-md"
        >
          <Text className="text-on-primary font-bold text-xs uppercase tracking-widest" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Finish Set & Save
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}