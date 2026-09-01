// import { View, Text, ScrollView } from 'react-native';
// import { FrostedCard } from '../../components/FrostedCard';

// export default function HistoryScreen() {
//   return (
//     <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
//       <View className="max-w-md w-full mx-auto space-y-md">
        
//         <View className="mb-sm">
//           <Text className="text-label-md font-semibold tracking-[0.05em] text-primary uppercase">
//             History & Reports
//           </Text>
//           <Text className="text-[28px] font-bold text-on-surface tracking-[-0.01em]">
//             Riwayat Sesi Latihan
//           </Text>
//         </View>

//         {/* Ringkasan Performa Mingguan */}
//         <FrostedCard>
//           <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-base">
//             Performa Mingguan
//           </Text>
//           <View className="flex-row justify-between mb-base">
//             <View>
//               <Text className="text-label-sm text-outline uppercase tracking-[0.05em]">Volume Total</Text>
//               <Text className="text-[28px] font-bold text-on-surface">12,450 kg</Text>
//             </View>
//             <View className="items-end">
//               <Text className="text-label-sm text-outline uppercase tracking-[0.05em]">Efisiensi Rata-Rata</Text>
//               <Text className="text-[28px] font-bold text-on-surface">84/100</Text>
//             </View>
//           </View>
//           <View className="border-t border-outline-variant/30 pt-base">
//             <Text className="text-body-md text-on-surface-variant">
//               Saran beban sesi berikutnya: Pertahankan beban 140 kg pada squat, fokuskan pada konsistensi sudut lumbar.
//             </Text>
//           </View>
//         </FrostedCard>

//         {/* Daftar Sesi Lampau */}
//         <FrostedCard>
//           <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-base">
//             Daftar Sesi Lampau
//           </Text>
//           <View className="space-y-sm">
//             <View className="flex-row justify-between items-center border-b border-outline-variant/30 pb-sm">
//               <View>
//                 <Text className="text-body-md font-semibold text-on-surface">Deadlift (Heavy)</Text>
//                 <Text className="text-label-sm text-outline">Kemarin • 38 menit • 32 Reps</Text>
//               </View>
//               <Text className="text-body-lg font-bold text-primary">87/100</Text>
//             </View>
//             <View className="flex-row justify-between items-center pt-xs">
//               <View>
//                 <Text className="text-body-md font-semibold text-on-surface">Back Squat</Text>
//                 <Text className="text-label-sm text-outline">3 hari lalu • 45 menit • 40 Reps</Text>
//               </View>
//               <Text className="text-body-lg font-bold text-primary">82/100</Text>
//             </View>
//           </View>
//         </FrostedCard>

//       </View>
//     </ScrollView>
//   );
// }

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FrostedCard } from '../../components/FrostedCard';

export default function HistoryScreen() {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
      <View className="max-w-md w-full mx-auto space-y-md">
        
        {/* Header Judul */}
        <View className="mb-sm flex-row justify-between items-center">
          <View>
            <Text className="text-label-md font-semibold tracking-[0.05em] text-primary uppercase">
              History & Reports
            </Text>
            <Text className="text-[28px] font-bold text-on-surface tracking-[-0.01em]">
              Riwayat Sesi Latihan
            </Text>
          </View>
          <TouchableOpacity className="p-2 bg-surface-container rounded-xl border border-outline-variant/30">
            <Ionicons name="filter-outline" size={20} color="#1a1c1c" />
          </TouchableOpacity>
        </View>

        {/* Ringkasan Performa Mingguan */}
        <FrostedCard>
          <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-base">
            Performa Mingguan
          </Text>
          <View className="flex-row justify-between mb-base">
            <View>
              <Text className="text-label-sm text-outline uppercase tracking-[0.05em]">Volume Total</Text>
              <Text className="text-[28px] font-bold text-on-surface">12,450 <Text className="text-base text-outline">kg</Text></Text>
            </View>
            <View className="items-end">
              <Text className="text-label-sm text-outline uppercase tracking-[0.05em]">Efisiensi Rata-Rata</Text>
              <Text className="text-[28px] font-bold text-primary">84/100</Text>
            </View>
          </View>
          <View className="border-t border-outline-variant/30 pt-base">
            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons name="bulb-outline" size={16} color="#2d4055" />
              <Text className="text-xs font-bold text-on-surface">Insight AI</Text>
            </View>
            <Text className="text-body-md text-on-surface-variant leading-relaxed">
              Saran beban sesi berikutnya: Pertahankan beban 140 kg pada squat, fokuskan pada konsistensi sudut lumbar.
            </Text>
          </View>
        </FrostedCard>

        {/* Grafik Mini Tren Kecepatan */}
        <FrostedCard>
          <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-base">
            Tren Kecepatan Barbel (m/s)
          </Text>
          <View className="h-28 flex-row items-end justify-around pb-2 border-b border-outline-variant/20 mb-2">
            <View className="w-8 bg-primary-fixed rounded-t items-center justify-start pt-1" style={{ height: '65%' }}>
              <Text className="text-[9px] font-bold text-primary">0.71</Text>
            </View>
            <View className="w-8 bg-primary-fixed rounded-t items-center justify-start pt-1" style={{ height: '75%' }}>
              <Text className="text-[9px] font-bold text-primary">0.78</Text>
            </View>
            <View className="w-8 bg-primary rounded-t items-center justify-start pt-1" style={{ height: '90%' }}>
              <Text className="text-[9px] font-bold text-on-primary">0.85</Text>
            </View>
            <View className="w-8 bg-primary-fixed rounded-t items-center justify-start pt-1" style={{ height: '80%' }}>
              <Text className="text-[9px] font-bold text-primary">0.80</Text>
            </View>
          </View>
          <View className="flex-row justify-around">
            <Text className="text-[10px] text-outline font-medium">Sen</Text>
            <Text className="text-[10px] text-outline font-medium">Sel</Text>
            <Text className="text-[10px] text-outline font-medium">Rab</Text>
            <Text className="text-[10px] text-outline font-medium">Kam</Text>
          </View>
        </FrostedCard>

        {/* Daftar Sesi Lampau */}
        <FrostedCard>
          <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-base">
            Daftar Sesi Lampau
          </Text>
          <View className="space-y-4">
            
            {/* Item 1 */}
            <View className="flex-row justify-between items-center border-b border-outline-variant/20 pb-3">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-xl bg-primary-fixed/50 items-center justify-center">
                  <MaterialCommunityIcons name="weight-lifter" size={20} color="#2d4055" />
                </View>
                <View>
                  <Text className="text-body-md font-semibold text-on-surface">Deadlift (Heavy)</Text>
                  <Text className="text-label-sm text-outline">Kemarin • 38 menit • 32 Reps</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-body-lg font-bold text-primary">87</Text>
                <Text className="text-[10px] text-outline uppercase">Skor</Text>
              </View>
            </View>

            {/* Item 2 */}
            <View className="flex-row justify-between items-center pt-1">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-xl bg-surface-container items-center justify-center">
                  <MaterialCommunityIcons name="dumbbell" size={20} color="#466271" />
                </View>
                <View>
                  <Text className="text-body-md font-semibold text-on-surface">Back Squat</Text>
                  <Text className="text-label-sm text-outline">3 hari lalu • 45 menit • 40 Reps</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-body-lg font-bold text-primary">82</Text>
                <Text className="text-[10px] text-outline uppercase">Skor</Text>
              </View>
            </View>

          </View>
        </FrostedCard>

      </View>
    </ScrollView>
  );
}