// import { Feather, Ionicons } from '@expo/vector-icons';
// import { useFocusEffect } from 'expo-router';
// import { useCallback, useState } from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { FrostedCard } from '../../components/FrostedCard';
// import { fetchAllSessions } from '../../db/queries';

// export default function HistoryScreen() {
//   const [sessionList, setSessionList] = useState<any[]>([]);

//   useFocusEffect(
//     useCallback(() => {
//       loadSessions();
//     }, [])
//   );

//   const loadSessions = async () => {
//     const data = await fetchAllSessions();
//     setSessionList(data);
//   };

//   return (
//     <ScrollView 
//       className="flex-1 bg-background" 
//       contentContainerStyle={{ 
//         padding: 20, 
//         paddingBottom: 140 
//       }}
//     >
//       <View className="max-w-md w-full mx-auto" style={{ gap: 20 }}>
        
//         {/* Header Atas */}
//         <View className="flex-row justify-between items-center">
//           <View className="w-10" />
//           <Text className="text-sm font-bold tracking-[0.05em] text-on-surface uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>
//             LiftRight
//           </Text>
//           <TouchableOpacity className="p-2 bg-surface-container rounded-lg border border-outline-variant/30">
//             <Ionicons name="settings-outline" size={18} color="#1a1c1c" />
//           </TouchableOpacity>
//         </View>

//         {/* Judul Utama */}
//         <View>
//           <Text className="text-xs font-semibold tracking-[0.05em] text-primary uppercase mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
//             History & Reports
//           </Text>
//           <Text className="text-[28px] font-bold text-on-surface tracking-[-0.01em]" style={{ fontFamily: 'system-ui, sans-serif' }}>
//             Performance History
//           </Text>
//           <Text className="text-sm text-outline mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
//             Review your metrics and track progress.
//           </Text>
//         </View>

//         {/* Grid 4 Kartu Metrik Atas */}
//         <View className="flex-row flex-wrap justify-between gap-y-3">
//           <View className="w-[48%] bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20 shadow-sm">
//             <Text className="text-xs font-semibold text-outline uppercase tracking-[0.05em] mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>Avg Velocity</Text>
//             <Text className="text-[24px] font-bold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>
//               0.82 <Text className="text-sm font-normal text-outline">m/s</Text>
//             </Text>
//           </View>

//           <View className="w-[48%] bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20 shadow-sm">
//             <Text className="text-xs font-semibold text-outline uppercase tracking-[0.05em] mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>Peak Power</Text>
//             <Text className="text-[24px] font-bold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>
//               845 <Text className="text-sm font-normal text-outline">W</Text>
//             </Text>
//           </View>

//           <View className="w-[48%] bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20 shadow-sm">
//             <Text className="text-xs font-semibold text-outline uppercase tracking-[0.05em] mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>Total Reps</Text>
//             <Text className="text-[24px] font-bold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>240</Text>
//           </View>

//           <View className="w-[48%] bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20 shadow-sm">
//             <Text className="text-xs font-semibold text-outline uppercase tracking-[0.05em] mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>Fatigue Drop</Text>
//             <Text className="text-[24px] font-bold text-error" style={{ fontFamily: 'system-ui, sans-serif' }}>12%</Text>
//           </View>
//         </View>

//         {/* Grafik Velocity Across Sets */}
//         <View className="mt-2">
//           <FrostedCard>
//             <View className="flex-row justify-between items-start mb-4">
//               <Text className="text-xs font-semibold text-on-surface uppercase tracking-[0.05em]" style={{ fontFamily: 'system-ui, sans-serif' }}>Velocity Across Sets</Text>
//               <Text className="text-xs text-outline text-right uppercase tracking-[0.05em]" style={{ fontFamily: 'system-ui, sans-serif' }}>Squat - Last Session</Text>
//             </View>
//             <View className="h-32 flex-row items-end justify-around pb-2 border-b border-outline-variant/30 mb-3">
//               <View className="w-8 bg-surface-container rounded-t" style={{ height: '70%' }} />
//               <View className="w-8 bg-primary rounded-t" style={{ height: '95%' }} />
//               <View className="w-8 bg-surface-container rounded-t" style={{ height: '80%' }} />
//               <View className="w-8 bg-surface-container rounded-t" style={{ height: '65%' }} />
//               <View className="w-8 bg-surface-container rounded-t" style={{ height: '55%' }} />
//             </View>
//             <View className="flex-row justify-around">
//               <Text className="text-xs text-outline uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>S1</Text>
//               <Text className="text-xs font-bold text-primary uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>S2</Text>
//               <Text className="text-xs text-outline uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>S3</Text>
//               <Text className="text-xs text-outline uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>S4</Text>
//               <Text className="text-xs text-outline uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>S5</Text>
//             </View>
//           </FrostedCard>
//         </View>

//         {/* Daftar Sesi Lampau (Dinamis dari SQLite dengan Scroll Mandiri) */}
//         <View className="mt-2">
//           <Text className="text-xs font-semibold text-on-surface uppercase tracking-[0.05em] px-1 mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
//             Previous Sessions
//           </Text>
          
//           <FrostedCard>
//             {sessionList.length === 0 ? (
//               <Text className="text-xs text-outline py-2 italic text-center">Belum ada riwayat sesi lokal.</Text>
//             ) : (
//               <ScrollView 
//                 style={{ maxHeight: 260 }} 
//                 showsVerticalScrollIndicator={true}
//                 nestedScrollEnabled={true}
//                 contentContainerStyle={{ gap: 16, paddingRight: 4 }}
//               >
//                 {sessionList.map((item, index) => (
//                   <View 
//                     key={item.id} 
//                     className={`flex-row justify-between items-center ${
//                       index < sessionList.length - 1 ? 'border-b border-outline-variant/30 pb-4' : 'pt-1'
//                     }`}
//                   >
//                     <View className="flex-row items-center gap-3">
//                       <View className="w-10 h-10 rounded-lg bg-surface-container items-center justify-center">
//                         <Feather name="calendar" size={18} color="#2d4055" />
//                       </View>
//                       <View>
//                         <Text className="text-sm font-semibold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>
//                           {item.exercise}
//                         </Text>
//                         <Text className="text-xs text-outline mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
//                           {new Date(item.startedAt).toLocaleDateString()} • Vol: {item.totalVolumeKg ?? 0} kg
//                         </Text>
//                       </View>
//                     </View>
//                     <Text className="text-sm font-bold text-primary" style={{ fontFamily: 'system-ui, sans-serif' }}>
//                       {item.avgEfficiency ? `${item.avgEfficiency}% Eff` : 'Selesai'}
//                     </Text>
//                   </View>
//                 ))}
//               </ScrollView>
//             )}
//           </FrostedCard>
//         </View>

//         {/* Next Session Insight Card */}
//         <View className="mt-2 bg-surface-container-lowest px-6 py-8 rounded-3xl border border-outline-variant/20 shadow-sm" style={{ gap: 16 }}>
//           <View className="w-10 h-10 rounded-full bg-surface-container items-center justify-center border border-outline-variant/20">
//             <Ionicons name="bulb-outline" size={20} color="#2d4055" />
//           </View>
//           <Text className="text-lg font-bold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>
//             Next Session Insight
//           </Text>
//           <Text className="text-xs text-outline leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 18 }}>
//             Your velocity dropped significantly on the final squat set. Consider reducing load by 5% next session to maintain optimal speed and power output.
//           </Text>
//           <View className="pt-2">
//             <TouchableOpacity className="bg-primary h-12 rounded-xl items-center justify-center shadow-sm">
//               <Text className="text-on-primary font-bold text-xs uppercase tracking-wider" style={{ fontFamily: 'system-ui, sans-serif' }}>
//                 Adjust Next Workout →
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//       </View>
//     </ScrollView>
//   );
// }

import { Feather, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FrostedCard } from '../../components/FrostedCard';
import { fetchAllSessions } from '../../db/queries';
import { syncOfflineSessions } from '../../sync/uploadSession';

export default function HistoryScreen() {
  const [sessionList, setSessionList] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadSessions();
    }, [])
  );

  const loadSessions = async () => {
    const data = await fetchAllSessions();
    setSessionList(data);
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      const result = await syncOfflineSessions();
      if (result.success) {
        if (result.count === 0) {
          Alert.alert('Info', 'Semua data lokal sudah sinkron dengan cloud.');
        } else {
          Alert.alert('Sukses', `Berhasil menyinkronkan ${result.count} sesi ke Supabase!`);
          loadSessions(); 
        }
      } else {
        Alert.alert('Gagal', 'Sinkronisasi gagal. Periksa koneksi internet Anda.');
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat menyinkronkan data.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <ScrollView 
      className="flex-1 bg-background" 
      contentContainerStyle={{ 
        padding: 20, 
        paddingBottom: 140 
      }}
    >
      <View className="max-w-md w-full mx-auto" style={{ gap: 20 }}>
        
        {/* Header Atas */}
        <View className="flex-row justify-between items-center">
          {/* Tombol Sinkronisasi Cloud di Kiri */}
          <TouchableOpacity 
            onPress={handleManualSync}
            disabled={isSyncing}
            className="p-2 bg-surface-container rounded-lg border border-outline-variant/30 items-center justify-center"
          >
            {isSyncing ? (
              <ActivityIndicator size="small" color="#2d4055" />
            ) : (
              <Ionicons name="cloud-upload-outline" size={18} color="#2d4055" />
            )}
          </TouchableOpacity>

          <Text className="text-sm font-bold tracking-[0.05em] text-on-surface uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>
            LiftRight
          </Text>

          <TouchableOpacity className="p-2 bg-surface-container rounded-lg border border-outline-variant/30">
            <Ionicons name="settings-outline" size={18} color="#1a1c1c" />
          </TouchableOpacity>
        </View>

        {/* Judul Utama */}
        <View>
          <Text className="text-xs font-semibold tracking-[0.05em] text-primary uppercase mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
            History & Reports
          </Text>
          <Text className="text-[28px] font-bold text-on-surface tracking-[-0.01em]" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Performance History
          </Text>
          <Text className="text-sm text-outline mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Review your metrics and track progress.
          </Text>
        </View>

        {/* Grid 4 Kartu Metrik Atas */}
        <View className="flex-row flex-wrap justify-between gap-y-3">
          <View className="w-[48%] bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20 shadow-sm">
            <Text className="text-xs font-semibold text-outline uppercase tracking-[0.05em] mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>Avg Velocity</Text>
            <Text className="text-[24px] font-bold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>
              0.82 <Text className="text-sm font-normal text-outline">m/s</Text>
            </Text>
          </View>

          <View className="w-[48%] bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20 shadow-sm">
            <Text className="text-xs font-semibold text-outline uppercase tracking-[0.05em] mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>Peak Power</Text>
            <Text className="text-[24px] font-bold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>
              845 <Text className="text-sm font-normal text-outline">W</Text>
            </Text>
          </View>

          <View className="w-[48%] bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20 shadow-sm">
            <Text className="text-xs font-semibold text-outline uppercase tracking-[0.05em] mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>Total Reps</Text>
            <Text className="text-[24px] font-bold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>240</Text>
          </View>

          <View className="w-[48%] bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20 shadow-sm">
            <Text className="text-xs font-semibold text-outline uppercase tracking-[0.05em] mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>Fatigue Drop</Text>
            <Text className="text-[24px] font-bold text-error" style={{ fontFamily: 'system-ui, sans-serif' }}>12%</Text>
          </View>
        </View>

        {/* Grafik Velocity Across Sets */}
        <View className="mt-2">
          <FrostedCard>
            <View className="flex-row justify-between items-start mb-4">
              <Text className="text-xs font-semibold text-on-surface uppercase tracking-[0.05em]" style={{ fontFamily: 'system-ui, sans-serif' }}>Velocity Across Sets</Text>
              <Text className="text-xs text-outline text-right uppercase tracking-[0.05em]" style={{ fontFamily: 'system-ui, sans-serif' }}>Squat - Last Session</Text>
            </View>
            <View className="h-32 flex-row items-end justify-around pb-2 border-b border-outline-variant/30 mb-3">
              <View className="w-8 bg-surface-container rounded-t" style={{ height: '70%' }} />
              <View className="w-8 bg-primary rounded-t" style={{ height: '95%' }} />
              <View className="w-8 bg-surface-container rounded-t" style={{ height: '80%' }} />
              <View className="w-8 bg-surface-container rounded-t" style={{ height: '65%' }} />
              <View className="w-8 bg-surface-container rounded-t" style={{ height: '55%' }} />
            </View>
            <View className="flex-row justify-around">
              <Text className="text-xs text-outline uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>S1</Text>
              <Text className="text-xs font-bold text-primary uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>S2</Text>
              <Text className="text-xs text-outline uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>S3</Text>
              <Text className="text-xs text-outline uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>S4</Text>
              <Text className="text-xs text-outline uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>S5</Text>
            </View>
          </FrostedCard>
        </View>

        {/* Daftar Sesi Lampau (Dinamis dari SQLite dengan Scroll Mandiri) */}
        <View className="mt-2">
          <Text className="text-xs font-semibold text-on-surface uppercase tracking-[0.05em] px-1 mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Previous Sessions
          </Text>
          
          <FrostedCard>
            {sessionList.length === 0 ? (
              <Text className="text-xs text-outline py-2 italic text-center">Belum ada riwayat sesi lokal.</Text>
            ) : (
              <ScrollView 
                style={{ maxHeight: 260 }} 
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
                contentContainerStyle={{ gap: 16, paddingRight: 4 }}
              >
                {sessionList.map((item, index) => (
                  <View 
                    key={item.id} 
                    className={`flex-row justify-between items-center ${
                      index < sessionList.length - 1 ? 'border-b border-outline-variant/30 pb-4' : 'pt-1'
                    }`}
                  >
                    <View className="flex-row items-center gap-3">
                      <View className="w-10 h-10 rounded-lg bg-surface-container items-center justify-center">
                        <Feather name="calendar" size={18} color="#2d4055" />
                      </View>
                      <View>
                        <Text className="text-sm font-semibold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          {item.exercise}
                        </Text>
                        <Text className="text-xs text-outline mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          {new Date(item.startedAt).toLocaleDateString()} • Vol: {item.totalVolumeKg ?? 0} kg
                        </Text>
                      </View>
                    </View>
                    <Text className="text-sm font-bold text-primary" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      {item.avgEfficiency ? `${item.avgEfficiency}% Eff` : 'Selesai'}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </FrostedCard>
        </View>

        {/* Next Session Insight Card */}
        <View className="mt-2 bg-surface-container-lowest px-6 py-8 rounded-3xl border border-outline-variant/20 shadow-sm" style={{ gap: 16 }}>
          <View className="w-10 h-10 rounded-full bg-surface-container items-center justify-center border border-outline-variant/20">
            <Ionicons name="bulb-outline" size={20} color="#2d4055" />
          </View>
          <Text className="text-lg font-bold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Next Session Insight
          </Text>
          <Text className="text-xs text-outline leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 18 }}>
            Your velocity dropped significantly on the final squat set. Consider reducing load by 5% next session to maintain optimal speed and power output.
          </Text>
          <View className="pt-2">
            <TouchableOpacity className="bg-primary h-12 rounded-xl items-center justify-center shadow-sm">
              <Text className="text-on-primary font-bold text-xs uppercase tracking-wider" style={{ fontFamily: 'system-ui, sans-serif' }}>
                Adjust Next Workout →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}