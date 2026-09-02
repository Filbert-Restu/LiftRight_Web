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
    <ScrollView 
      className="flex-1 bg-background" 
      contentContainerStyle={{ padding: 24, paddingBottom: 140, justifyContent: 'space-between', flexGrow: 1 }}
    >
      <View className="max-w-md w-full mx-auto" style={{ gap: 28 }}>
        
        {/* Header Atas */}
        <View className="items-center mt-2">
          <Text className="text-xl font-extrabold text-on-surface tracking-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Barbell Squat
          </Text>
          <Text className="text-xs text-outline font-medium mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Set 3 of 5
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
          onPress={() => router.push('/analysis')}
          className="flex-1 bg-primary h-14 rounded-full items-center justify-center shadow-md"
        >
          <Text className="text-on-primary font-bold text-xs uppercase tracking-widest" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Finish Set
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}