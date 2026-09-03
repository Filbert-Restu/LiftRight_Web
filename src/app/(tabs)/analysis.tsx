import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AnalysisScreen() {
  const router = useRouter();

  return (
    <ScrollView 
      className="flex-1 bg-background" 
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 30, flexGrow: 1 }}
    >
      <View className="max-w-md w-full mx-auto" style={{ gap: 18 }}>
        
        {/* Header Atas */}
        <View className="flex-row items-center justify-center relative py-2">
          <Text className="text-xl font-bold tracking-[0.05em] text-on-surface ml-2 mt-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
            LiftRight
          </Text>
        </View>

        {/* Header Judul Set & Latihan */}
        <View className="items-center mt-1">
          <Text className="text-sm font-semibold tracking-[0.05em] text-outline uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Set 3 • Standing Deadlift
          </Text>
          <View className="flex-row items-baseline gap-1.5">
            <Text className="text-[72px] font-black text-on-surface tracking-[-0.02em]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              8
            </Text>
            <Text className="text-2xl font-bold text-on-surface-variant tracking-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Reps
            </Text>
          </View>
        </View>

        {/* Kartu 1: Sticking Region */}
        <View className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-sm" style={{ gap: 16 }}>
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-on-surface tracking-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Sticking Region
            </Text>
            <View className="bg-surface-container px-3 py-1 rounded-full border border-outline-variant/20">
              <Text className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider" style={{ fontFamily: 'system-ui, sans-serif' }}>Mid-Concentric</Text>
            </View>
          </View>
          
          {/* Progress bar dengan aksen biru */}
          <View className="w-full h-2 bg-surface-container rounded-full overflow-hidden my-2">
            <View className="h-full w-[65%] bg-primary" />
          </View>

          <Text className="text-sm text-outline leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 18 }}>
            Velocity dropped significantly at 65% of concentric phase during spine extension.
          </Text>
        </View>

        {/* Kartu 2: Consistency */}
        <View className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-sm" style={{ gap: 16 }}>
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="tune" size={20} color="#2d4055" />
            <Text className="text-2xl font-bold text-on-surface tracking-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Consistency
            </Text>
          </View>

          <View className="border-t" style={{ borderColor: '#3b547c14' }} />

          <View className="flex-row items-baseline gap-2">
            <Text className="text-[36px] font-black text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>92%</Text>
            <Text className="text-xs font-medium text-outline tracking-wider" style={{ fontFamily: 'system-ui, sans-serif' }}>Bar Path / Torso Alignment</Text>
          </View>
          <Text className="text-sm text-outline leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 18 }}>
            Excellent upright posture stability and vertical path across all 8 reps.
          </Text>
        </View>

        {/* Kartu 3: Fatigue Drop-off */}
        <View className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-sm" style={{ gap: 16 }}>
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="trending-down" size={20} color="#2d4055" />
            <Text className="text-2xl font-bold text-on-surface tracking-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Fatigue Drop-off
            </Text>
          </View>

          <View className="border-t" style={{ borderColor: '#3b547c14' }} />

          <View className="flex-row items-baseline gap-2">
            <Text className="text-[36px] font-black text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>14%</Text>
            <Text className="text-xs font-medium text-outline tracking-wider" style={{ fontFamily: 'system-ui, sans-serif' }}>Velocity Loss</Text>
          </View>
          <Text className="text-sm text-outline leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 18 }}>
            Reps 7 and 8 showed minor technical breakdown in lumbar control.
          </Text>
        </View>

        {/* Kartu 4: Form Cue */}
        <View className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-sm" style={{ gap: 16 }}>
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="lightbulb-outline" size={20} color="#2d4055" />
            <Text className="text-2xl font-bold text-on-surface tracking-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Form Cue
            </Text>
          </View>

          <View className="border-t" style={{ borderColor: '#3b547c14' }} />

          <Text className="text-sm text-outline leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 18 }}>
            Focus on leg drive and keeping the chest upright to push through the mid-concentric sticking point during standing lifts. Consider resting 3 minutes before the next set.
          </Text>
        </View>

        {/* Tombol Navigasi Bawah */}
        <View className="mt-2">
          <TouchableOpacity 
            onPress={() => router.push('/session')}
            className="bg-primary h-14 rounded-full flex-row items-center justify-center gap-2 shadow-md"
          >
            <Ionicons name="play" size={14} color="#fff" />
            <Text className="text-on-primary font-bold text-xs uppercase tracking-widest" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Start Next Set
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}