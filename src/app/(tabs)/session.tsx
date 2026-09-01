// import { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import { FrostedCard } from '../../components/FrostedCard';
// import { mockRepSummaries } from '../../ble/mock/MockBleTransport';

// export default function SessionScreen() {
//   const [currentRep, setCurrentRep] = useState(mockRepSummaries[0]);

//   // Simulasi data masuk bergantian tiap 4 detik (meniru jeda repetisi)
//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       index = (index + 1) % mockRepSummaries.length;
//       setCurrentRep(mockRepSummaries[index]);
//     }, 4000);
    
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <View className="flex-1 items-center justify-center bg-background p-md">
//       <FrostedCard className="w-full max-w-sm items-center p-lg">
        
//         {/* Label Uppercase dengan tracking sesuai aturan desain */}
//         <Text className="text-label-md font-semibold tracking-[0.05em] text-on-surface-variant uppercase mb-base">
//           LIFT SPEED
//         </Text>
        
//         {/* Angka besar headline-xl (48px, bobot 800/black) */}
//         <Text className="text-[48px] font-black text-on-surface leading-[56px] tracking-[-0.02em]">
//           {currentRep.peakVelocity.toFixed(2)} m/s
//         </Text>
        
//         <View className="mt-lg flex-row justify-between w-full border-t border-outline-variant/30 pt-base">
//           <View>
//             <Text className="text-label-sm font-medium text-outline uppercase tracking-[0.05em]">Repetisi</Text>
//             <Text className="text-body-lg text-on-surface font-medium">{currentRep.repIndex} / 4</Text>
//           </View>
          
//           <View className="items-end">
//             <Text className="text-label-sm font-medium text-outline uppercase tracking-[0.05em]">Status</Text>
//             <Text className={`text-body-lg font-medium capitalize ${
//               currentRep.classification === 'form_change' ? 'text-error' : 
//               currentRep.classification === 'fatigue' ? 'text-tertiary' : 'text-primary'
//             }`}>
//               {currentRep.classification.replace('_', ' ')}
//             </Text>
//           </View>
//         </View>

//       </FrostedCard>
//     </View>
//   );
// }


import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { mockRepSummaries } from '../../ble/mock/MockBleTransport';
import { FrostedCard } from '../../components/FrostedCard';

export default function SessionScreen() {
  const router = useRouter();
  const [currentRep, setCurrentRep] = useState(mockRepSummaries[0]);
  const [isPaused, setIsPaused] = useState(false);

  // Simulasi data masuk bergantian tiap 4 detik
  useEffect(() => {
    if (isPaused) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % mockRepSummaries.length;
      setCurrentRep(mockRepSummaries[index]);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <ScrollView className="flex-1 bg-background px-gutter pt-xl" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="max-w-md w-full mx-auto justify-between flex-1">
        
        {/* Header Atas */}
        <View className="items-center mb-6">
          <Text className="text-base font-semibold text-on-surface-variant">Barbell Squat</Text>
          <Text className="text-[11px] text-outline uppercase tracking-wider mt-0.5">
            Set 3 of 5 • Real-time BLE Feed
          </Text>
        </View>

        {/* Indikator Utama Lingkaran Kecepatan */}
        <View className="items-center justify-center my-4">
          <View className="w-60 h-60 rounded-full border-4 border-outline-variant/30 items-center justify-center bg-surface-container-lowest shadow-sm p-4">
            <Text className="text-label-md font-semibold tracking-[0.05em] text-outline uppercase mb-1">
              LIFT SPEED
            </Text>
            <Text className="text-[52px] font-black text-on-surface tracking-tighter">
              {currentRep.peakVelocity.toFixed(2)}
            </Text>
            <Text className="text-xs font-bold text-outline uppercase tracking-widest mt-[-4px]">
              M / S
            </Text>
            <Text className="text-[11px] text-outline/70 mt-2 font-medium">
              Repetisi {currentRep.repIndex} / 4
            </Text>
          </View>
        </View>

        {/* Kartu Status & Diagnosis AI Real-time */}
        <FrostedCard className="mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-label-sm font-semibold text-outline uppercase tracking-wider">
              Status Klasifikasi
            </Text>
            <View className={`px-2.5 py-0.5 rounded-full ${
              currentRep.classification === 'form_change' ? 'bg-error-container' : 
              currentRep.classification === 'fatigue' ? 'bg-tertiary-container' : 'bg-primary-container'
            }`}>
              <Text className={`text-[10px] font-bold uppercase ${
                currentRep.classification === 'form_change' ? 'text-on-error-container' : 
                currentRep.classification === 'fatigue' ? 'text-on-tertiary-container' : 'text-on-primary-container'
              }`}>
                {currentRep.classification.replace('_', ' ')}
              </Text>
            </View>
          </View>
          <Text className="text-body-md text-on-surface leading-tight">
            {currentRep.classification === 'form_change' 
              ? 'Peringatan: Terdeteksi perubahan sudut punggung pada fase konsentrik.'
              : currentRep.classification === 'fatigue'
              ? 'Kecepatan melambat wajar akibat akumulasi kelelahan otot.'
              : 'Gerakan stabil dan konsisten. Pertahankan ritme ini.'}
          </Text>
        </FrostedCard>

        {/* Metrik Pendukung Bawah */}
        <View className="flex-row gap-gutter mb-6">
          <View className="flex-1 bg-surface-container-lowest p-md rounded-xl items-center border border-outline-variant/20 shadow-sm">
            <View className="flex-row items-center mb-1">
              <Feather name="trending-down" size={16} color="#ba1a1a" />
              <Text className="text-lg font-bold text-error ml-1">-12%</Text>
            </View>
            <Text className="text-[10px] font-semibold text-outline uppercase tracking-wider">Speed Drop</Text>
          </View>

          <View className="flex-1 bg-surface-container-lowest p-md rounded-xl items-center border border-outline-variant/20 shadow-sm">
            <View className="flex-row items-center mb-1">
              <Ionicons name="flash-outline" size={16} color="#2d4055" />
              <Text className="text-lg font-bold text-primary ml-1">88%</Text>
            </View>
            <Text className="text-[10px] font-semibold text-outline uppercase tracking-wider">Efficiency</Text>
          </View>
        </View>

        {/* Tombol Kontrol Bawah (Pause & Finish Set) */}
        <View className="flex-row items-center gap-base">
          <TouchableOpacity 
            onPress={() => setIsPaused(!isPaused)}
            className="w-14 h-14 bg-surface-container-lowest border border-outline-variant/30 rounded-xl items-center justify-center shadow-sm"
          >
            <Ionicons name={isPaused ? "play" : "pause"} size={20} color="#1a1c1c" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/analysis')}
            className="flex-1 bg-primary h-14 rounded-xl items-center justify-center shadow-md"
          >
            <Text className="text-on-primary font-bold text-base tracking-wide uppercase">Finish Set</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}