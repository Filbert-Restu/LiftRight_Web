// import { View, Text, ScrollView } from 'react-native';
// import { FrostedCard } from '../../components/FrostedCard';

// export default function AnalysisScreen() {
//   return (
//     <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
//       <View className="max-w-md w-full mx-auto space-y-md">
        
//         {/* Header Judul */}
//         <View className="mb-sm">
//           <Text className="text-label-md font-semibold tracking-[0.05em] text-primary uppercase">
//             Post-Set Analysis
//           </Text>
//           <Text className="text-[28px] font-bold text-on-surface tracking-[-0.01em]">
//             Analisis Set & Titik Macet
//           </Text>
//         </View>

//         {/* Ringkasan Set Terakhir */}
//         <FrostedCard>
//           <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-base">
//             Ringkasan Set
//           </Text>
//           <View className="flex-row justify-between mb-base">
//             <View>
//               <Text className="text-label-sm text-outline uppercase tracking-[0.05em]">Efisiensi</Text>
//               <Text className="text-[32px] font-bold text-on-surface">87/100</Text>
//             </View>
//             <View className="items-end">
//               <Text className="text-label-sm text-outline uppercase tracking-[0.05em]">Penurunan Kecepatan</Text>
//               <Text className="text-[32px] font-bold text-on-surface">-14%</Text>
//             </View>
//           </View>
//           <View className="border-t border-outline-variant/30 pt-base">
//             <Text className="text-body-md text-on-surface-variant">
//               Sudut titik macet terdeteksi pada kemiringan punggung 47 derajat dengan posisi pinggul stabil.
//             </Text>
//           </View>
//         </FrostedCard>

//         {/* Fitur Utama: Klasifikasi Kelelahan vs Perubahan Teknik */}
//         <FrostedCard>
//           <View className="flex-row items-center justify-between mb-base">
//             <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em]">
//               Diagnosis AI
//             </Text>
//             <View className="bg-tertiary-container px-base py-xs rounded-full">
//               <Text className="text-label-sm font-semibold text-on-tertiary-container">OTOT CAPEK</Text>
//             </View>
//           </View>
//           <Text className="text-body-md text-on-surface mb-base">
//             Gerakan melambat, namun pola gerak tetap konsisten. Ini menandakan otot memang lelah secara wajar dan menjadi stimulus latihan yang bagus.
//           </Text>
//           <View className="bg-surface-container-low p-base rounded-md">
//             <Text className="text-label-sm font-semibold text-primary uppercase tracking-[0.05em] mb-xs">
//               Saran Koreksi
//             </Text>
//             <Text className="text-body-md text-on-surface-variant">
//               Lanjutkan set berikutnya dengan beban yang sama. Pertahankan posisi dada tetap tegap.
//             </Text>
//           </View>
//         </FrostedCard>

//         {/* Breakdown Risiko Penyimpangan */}
//         <FrostedCard>
//           <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-base">
//             Breakdown Risiko Penyimpangan
//           </Text>
//           <View className="space-y-sm">
//             <View className="flex-row justify-between items-center">
//               <Text className="text-body-md text-on-surface-variant">Lumbar Rusuk (T12-L1)</Text>
//               <Text className="text-body-md font-semibold text-on-surface">67%</Text>
//             </View>
//             <View className="flex-row justify-between items-center">
//               <Text className="text-body-md text-on-surface-variant">Lumbar Panggul (S1-S2)</Text>
//               <Text className="text-body-md font-semibold text-on-surface">69%</Text>
//             </View>
//           </View>
//         </FrostedCard>

//       </View>
//     </ScrollView>
//   );
// }

import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FrostedCard } from '../../components/FrostedCard';

export default function AnalysisScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
      <View className="max-w-md w-full mx-auto space-y-md">
        
        {/* Header Judul */}
        <View className="mb-sm">
          <Text className="text-label-md font-semibold tracking-[0.05em] text-primary uppercase">
            Post-Set Analysis
          </Text>
          <Text className="text-[28px] font-bold text-on-surface tracking-[-0.01em]">
            Analisis Set & Titik Macet
          </Text>
        </View>

        {/* Ringkasan Set Terakhir */}
        <FrostedCard>
          <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-base">
            Ringkasan Set
          </Text>
          <View className="flex-row justify-between mb-base">
            <View>
              <Text className="text-label-sm text-outline uppercase tracking-[0.05em]">Efisiensi</Text>
              <Text className="text-[32px] font-bold text-on-surface">87/100</Text>
            </View>
            <View className="items-end">
              <Text className="text-label-sm text-outline uppercase tracking-[0.05em]">Penurunan Kecepatan</Text>
              <Text className="text-[32px] font-bold text-on-surface">-14%</Text>
            </View>
          </View>
          <View className="border-t border-outline-variant/30 pt-base">
            <Text className="text-body-md text-on-surface-variant">
              Sudut titik macet terdeteksi pada kemiringan punggung 47 derajat dengan posisi pinggul stabil.
            </Text>
          </View>
        </FrostedCard>

        {/* Fitur Utama: Klasifikasi Kelelahan vs Perubahan Teknik */}
        <FrostedCard>
          <View className="flex-row items-center justify-between mb-base">
            <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em]">
              Diagnosis AI
            </Text>
            <View className="bg-tertiary-container px-base py-xs rounded-full">
              <Text className="text-label-sm font-semibold text-on-tertiary-container">OTOT CAPEK</Text>
            </View>
          </View>
          <Text className="text-body-md text-on-surface mb-base">
            Gerakan melambat, namun pola gerak tetap konsisten. Ini menandakan otot memang lelah secara wajar dan menjadi stimulus latihan yang bagus.
          </Text>
          <View className="bg-surface-container-low p-base rounded-md">
            <Text className="text-label-sm font-semibold text-primary uppercase tracking-[0.05em] mb-xs">
              Saran Koreksi
            </Text>
            <Text className="text-body-md text-on-surface-variant">
              Lanjutkan set berikutnya dengan beban yang sama. Pertahankan posisi dada tetap tegap.
            </Text>
          </View>
        </FrostedCard>

        {/* Breakdown Risiko Penyimpangan */}
        <FrostedCard>
          <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-base">
            Breakdown Risiko Penyimpangan
          </Text>
          <View className="space-y-sm">
            <View className="flex-row justify-between items-center">
              <Text className="text-body-md text-on-surface-variant">Lumbar Rusuk (T12-L1)</Text>
              <Text className="text-body-md font-semibold text-on-surface">67%</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-body-md text-on-surface-variant">Lumbar Panggul (S1-S2)</Text>
              <Text className="text-body-md font-semibold text-on-surface">69%</Text>
            </View>
          </View>
        </FrostedCard>

        {/* Tombol Navigasi ke Sesi Berikutnya */}
        <TouchableOpacity 
          onPress={() => router.push('/session')}
          className="bg-primary h-14 rounded-xl items-center justify-center shadow-md mt-4"
        >
          <Text className="text-on-primary font-bold text-base tracking-wide uppercase">
            Mulai Set Berikutnya
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}