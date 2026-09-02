import { Feather, Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FrostedCard } from '../../components/FrostedCard';

export default function HistoryScreen() {
  return (
    <ScrollView 
      className="flex-1 bg-background" 
      contentContainerStyle={{ 
        padding: 20, 
        paddingBottom: 140 
      }}
    >
      <View className="max-w-md w-full mx-auto" style={{ gap: 20 }}>
        
        {/* Header Atas (Tombol kiri dihilangkan, teks LIFTRIGHT diposisikan rapi) */}
        <View className="flex-row justify-between items-center">
          <View className="w-10" /> {/* Spacer penyeimbang */}
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
            <Text className="text-[24px] font-bold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>0.82 <Text className="text-sm font-normal text-outline">m/s</Text></Text>
          </View>

          <View className="w-[48%] bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20 shadow-sm">
            <Text className="text-xs font-semibold text-outline uppercase tracking-[0.05em] mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>Peak Power</Text>
            <Text className="text-[24px] font-bold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>845 <Text className="text-sm font-normal text-outline">W</Text></Text>
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

        {/* Daftar Sesi Lampau */}
        <View className="mt-2">
          <Text className="text-xs font-semibold text-on-surface uppercase tracking-[0.05em] px-1 mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Previous Sessions
          </Text>
          
          <FrostedCard>
            <View style={{ gap: 16 }}>
              <View className="flex-row justify-between items-center border-b border-outline-variant/30 pb-4">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-lg bg-surface-container items-center justify-center">
                    <Feather name="calendar" size={18} color="#2d4055" />
                  </View>
                  <View>
                    <Text className="text-sm font-semibold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>Heavy Squat Focus</Text>
                    <Text className="text-xs text-outline mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>Oct 24 • 45 mins • 5 Sets</Text>
                  </View>
                </View>
                <Text className="text-sm font-bold text-primary" style={{ fontFamily: 'system-ui, sans-serif' }}>0.75 m/s</Text>
              </View>

              <View className="flex-row justify-between items-center border-b border-outline-variant/30 pb-4">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-lg bg-surface-container items-center justify-center">
                    <Feather name="calendar" size={18} color="#2d4055" />
                  </View>
                  <View>
                    <Text className="text-sm font-semibold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>Bench & Accessories</Text>
                    <Text className="text-xs text-outline mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>Oct 22 • 60 mins • 4 Sets</Text>
                  </View>
                </View>
                <Text className="text-sm font-bold text-primary" style={{ fontFamily: 'system-ui, sans-serif' }}>0.60 m/s</Text>
              </View>

              <View className="flex-row justify-between items-center pt-1">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-lg bg-surface-container items-center justify-center">
                    <Feather name="calendar" size={18} color="#2d4055" />
                  </View>
                  <View>
                    <Text className="text-sm font-semibold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>Deadlift Speed Work</Text>
                    <Text className="text-xs text-outline mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>Oct 19 • 35 mins • 8 Sets</Text>
                  </View>
                </View>
                <Text className="text-sm font-bold text-primary" style={{ fontFamily: 'system-ui, sans-serif' }}>1.05 m/s</Text>
              </View>
            </View>
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