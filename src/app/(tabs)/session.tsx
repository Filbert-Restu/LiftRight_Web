import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { FrostedCard } from '../../components/FrostedCard';
import { mockRepSummaries } from '../../ble/mock/MockBleTransport';

export default function SessionScreen() {
  const [currentRep, setCurrentRep] = useState(mockRepSummaries[0]);

  // Simulasi data masuk bergantian tiap 4 detik (meniru jeda repetisi)
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % mockRepSummaries.length;
      setCurrentRep(mockRepSummaries[index]);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-background p-md">
      <FrostedCard className="w-full max-w-sm items-center p-lg">
        
        {/* Label Uppercase dengan tracking sesuai aturan desain */}
        <Text className="text-label-md font-semibold tracking-[0.05em] text-on-surface-variant uppercase mb-base">
          LIFT SPEED
        </Text>
        
        {/* Angka besar headline-xl (48px, bobot 800/black) */}
        <Text className="text-[48px] font-black text-on-surface leading-[56px] tracking-[-0.02em]">
          {currentRep.peakVelocity.toFixed(2)} m/s
        </Text>
        
        <View className="mt-lg flex-row justify-between w-full border-t border-outline-variant/30 pt-base">
          <View>
            <Text className="text-label-sm font-medium text-outline uppercase tracking-[0.05em]">Repetisi</Text>
            <Text className="text-body-lg text-on-surface font-medium">{currentRep.repIndex} / 4</Text>
          </View>
          
          <View className="items-end">
            <Text className="text-label-sm font-medium text-outline uppercase tracking-[0.05em]">Status</Text>
            <Text className={`text-body-lg font-medium capitalize ${
              currentRep.classification === 'form_change' ? 'text-error' : 
              currentRep.classification === 'fatigue' ? 'text-tertiary' : 'text-primary'
            }`}>
              {currentRep.classification.replace('_', ' ')}
            </Text>
          </View>
        </View>

      </FrostedCard>
    </View>
  );
}