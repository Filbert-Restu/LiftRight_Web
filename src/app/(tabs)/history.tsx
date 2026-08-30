import { View, Text, ScrollView } from 'react-native';
import { FrostedCard } from '../../components/FrostedCard';

export default function HistoryScreen() {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
      <View className="max-w-md w-full mx-auto space-y-md">
        
        <View className="mb-sm">
          <Text className="text-label-md font-semibold tracking-[0.05em] text-primary uppercase">
            History & Reports
          </Text>
          <Text className="text-[28px] font-bold text-on-surface tracking-[-0.01em]">
            Riwayat Sesi Latihan
          </Text>
        </View>

        {/* Ringkasan Performa Mingguan */}
        <FrostedCard>
          <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-base">
            Performa Mingguan
          </Text>
          <View className="flex-row justify-between mb-base">
            <View>
              <Text className="text-label-sm text-outline uppercase tracking-[0.05em]">Volume Total</Text>
              <Text className="text-[28px] font-bold text-on-surface">12,450 kg</Text>
            </View>
            <View className="items-end">
              <Text className="text-label-sm text-outline uppercase tracking-[0.05em]">Efisiensi Rata-Rata</Text>
              <Text className="text-[28px] font-bold text-on-surface">84/100</Text>
            </View>
          </View>
          <View className="border-t border-outline-variant/30 pt-base">
            <Text className="text-body-md text-on-surface-variant">
              Saran beban sesi berikutnya: Pertahankan beban 140 kg pada squat, fokuskan pada konsistensi sudut lumbar.
            </Text>
          </View>
        </FrostedCard>

        {/* Daftar Sesi Lampau */}
        <FrostedCard>
          <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-base">
            Daftar Sesi Lampau
          </Text>
          <View className="space-y-sm">
            <View className="flex-row justify-between items-center border-b border-outline-variant/30 pb-sm">
              <View>
                <Text className="text-body-md font-semibold text-on-surface">Deadlift (Heavy)</Text>
                <Text className="text-label-sm text-outline">Kemarin • 38 menit • 32 Reps</Text>
              </View>
              <Text className="text-body-lg font-bold text-primary">87/100</Text>
            </View>
            <View className="flex-row justify-between items-center pt-xs">
              <View>
                <Text className="text-body-md font-semibold text-on-surface">Back Squat</Text>
                <Text className="text-label-sm text-outline">3 hari lalu • 45 menit • 40 Reps</Text>
              </View>
              <Text className="text-body-lg font-bold text-primary">82/100</Text>
            </View>
          </View>
        </FrostedCard>

      </View>
    </ScrollView>
  );
}