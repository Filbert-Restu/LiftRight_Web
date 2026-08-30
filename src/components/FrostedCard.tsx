import { BlurView } from "expo-blur";
import { View } from "react-native";

export function FrostedCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <BlurView
      intensity={16}
      tint="light"
      className={`overflow-hidden rounded-lg border border-[#AAC7D8]/30 ${className}`}
    >
      <View className="bg-white/80 p-md">{children}</View>
    </BlurView>
  );
}