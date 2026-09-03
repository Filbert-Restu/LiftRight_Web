// import { MaterialIcons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { useState } from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { Device } from 'react-native-ble-plx';
// import { useDeviceConnection } from '../../ble/useDeviceConnection';

// export default function ConnectScreen() {
//   const router = useRouter();
  
//   const {
//     connectedDevice,
//     isScanning,
//     connectionState,
//     startScan,
//     stopScan,
//     connectToDevice,
//     disconnectDevice,
//   } = useDeviceConnection();

//   const [discoveredDevices, setDiscoveredDevices] = useState<Device[]>([]);
//   const [isCalibrating, setIsCalibrating] = useState(false);
//   const [calibrationStep, setCalibrationStep] = useState(0);

//   const handleScan = () => {
//     setDiscoveredDevices([]);
//     startScan((device) => {
//       setDiscoveredDevices((prev) => {
//         if (!prev.some((d) => d.id === device.id)) {
//           return [...prev, device];
//         }
//         return prev;
//       });
//     });
//   };

//   const startCalibration = () => {
//     setIsCalibrating(true);
//     setCalibrationStep(1);
//     setTimeout(() => setCalibrationStep(2), 3000);
//     setTimeout(() => {
//       setCalibrationStep(3);
//       setIsCalibrating(false);
//     }, 6000);
//   };

//   return (
//     <ScrollView 
//       className="flex-1 bg-background" 
//       contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 140, flexGrow: 1 }}
//     >
//       <View className="max-w-md w-full mx-auto" style={{ gap: 20 }}>

//       {/* Header Atas */}
//       <View className="flex-row justify-center items-center relative h-10">
//         <Text className="text-sm font-bold tracking-[0.05em] text-on-surface uppercase ml-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
//           LiftRight
//         </Text>
//       </View>

//       {/* Judul Utama dengan sedikit dorongan ke bawah */}
//       <View style={{ marginTop: 0 }}>
//         <Text className="text-xs font-semibold tracking-[0.05em] text-primary uppercase mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
//           Preparation
//         </Text>
//         <Text className="text-[28px] font-bold text-on-surface tracking-[-0.01em]" style={{ fontFamily: 'system-ui, sans-serif' }}>
//           Unit Punggung & Kalibrasi
//         </Text>
//       </View>

//         {/* Status Sensor Card Menggunakan Style Kartu Putih Bersih ala Referensi */}
//         <View className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-sm" style={{ gap: 16 }}>
//           <View className="flex-row justify-between items-center mb-base">
//             <View className="flex-1">
//               <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em]" style={{ fontFamily: 'system-ui, sans-serif' }}>
//                 Sensor Status
//               </Text>
//               <Text className="text-body-md text-on-surface-variant" style={{ fontFamily: 'system-ui, sans-serif' }}>
//                 Unit Punggung (T12–L1 & S1–S2)
//               </Text>
//             </View>
//             <View className={`px-base py-xs rounded-full ${connectedDevice ? 'bg-primary/20' : 'bg-surface-dim'}`}>
//               <Text className={`text-label-sm font-semibold ${connectedDevice ? 'text-primary' : 'text-outline'}`} style={{ fontFamily: 'system-ui, sans-serif' }}>
//                 {connectionState}
//               </Text>
//             </View>
//           </View>

//           {connectedDevice ? (
//             <View className="py-2 border-t border-outline-variant/10 space-y-2">
//               <View className="flex-row items-center justify-between">
//                 <View className="flex-row items-center gap-3">
//                   <MaterialIcons name="bluetooth-connected" size={20} color="#2d4055" />
//                   <View>
//                     <Text className="text-sm font-semibold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>
//                       {connectedDevice.name || 'LiftRight Smart Sensor'}
//                     </Text>
//                     <Text className="text-[11px] text-outline" style={{ fontFamily: 'system-ui, sans-serif' }}>ID: {connectedDevice.id}</Text>
//                   </View>
//                 </View>
//                 <TouchableOpacity onPress={disconnectDevice} className="px-3 py-1 bg-red-100 rounded-lg">
//                   <Text className="text-xs font-medium text-red-600" style={{ fontFamily: 'system-ui, sans-serif' }}>Putuskan</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ) : (
//             <View className="py-3 border-t border-outline-variant/10 items-center">
//               <TouchableOpacity
//                 onPress={isScanning ? stopScan : handleScan}
//                 className="w-full py-3 bg-surface-container border border-outline-variant/30 rounded-xl items-center"
//               >
//                 <Text className="text-sm font-semibold text-primary uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>
//                   {isScanning ? 'Memindai Perangkat...' : 'Cari Perangkat (Scan)'}
//                 </Text>
//               </TouchableOpacity>

//               {discoveredDevices.length > 0 && (
//                 <View className="w-full mt-3 space-y-2">
//                   <Text className="text-xs text-outline font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Perangkat Tersedia:</Text>
//                   {discoveredDevices.map((dev) => (
//                     <TouchableOpacity
//                       key={dev.id}
//                       onPress={() => connectToDevice(dev)}
//                       className="p-3 bg-surface-container-high rounded-lg flex-row justify-between items-center"
//                     >
//                       <Text className="text-sm font-medium text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>{dev.name || 'ESP32-Device'}</Text>
//                       <Text className="text-xs text-primary font-bold" style={{ fontFamily: 'system-ui, sans-serif' }}>HUBUNGKAN</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               )}
//             </View>
//           )}
//         </View>

//         {/* Panel Kalibrasi Menggunakan Style Kartu Putih Bersih ala Referensi */}
//         <View className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-sm" style={{ gap: 16 }}>
//           <Text className="text-label-md font-semibold text-on-surface uppercase tracking-[0.05em] mb-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
//             Urutan Kalibrasi (20 Detik)
//           </Text>
//           <Text className="text-body-md text-on-surface-variant mb-md" style={{ fontFamily: 'system-ui, sans-serif' }}>
//             {!connectedDevice 
//               ? "Hubungkan perangkat terlebih dahulu untuk memulai kalibrasi."
//               : calibrationStep === 0 && "Tekan tombol di bawah untuk memulai kalibrasi posisi netral."}
//             {calibrationStep === 1 && "Fase 1: Berdiri diam selama 5 detik..."}
//             {calibrationStep === 2 && "Fase 2: Membungkuk penuh lalu tegak lagi..."}
//             {calibrationStep === 3 && "Kalibrasi Selesai! Alat siap digunakan."}
//           </Text>

//           <TouchableOpacity
//             onPress={startCalibration}
//             disabled={!connectedDevice || isCalibrating}
//             className={`py-3 rounded-xl items-center mb-3 ${
//               !connectedDevice || isCalibrating ? 'bg-surface-dim opacity-50' : 'bg-surface-container border border-outline-variant/30'
//             }`}
//           >
//             <Text className={`font-semibold text-label-md uppercase tracking-[0.05em] ${!connectedDevice || isCalibrating ? 'text-outline' : 'text-primary'}`} style={{ fontFamily: 'system-ui, sans-serif' }}>
//               {isCalibrating ? 'Sedang Kalibrasi...' : calibrationStep === 3 ? 'Kalibrasi Ulang' : 'Mulai Kalibrasi'}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Tombol Pindah ke Sesi Latihan Mengikuti Bentuk Pill Gelap ala Referensi */}
//         <View className="mt-2">
//           <TouchableOpacity 
//             onPress={() => router.push('/session')}
//             className="bg-primary h-14 rounded-full items-center justify-center shadow-md"
//           >
//             <Text className="text-on-primary font-bold text-xs uppercase tracking-widest" style={{ fontFamily: 'system-ui, sans-serif' }}>
//               Mulai Sesi Latihan
//             </Text>
//           </TouchableOpacity>
//         </View>

//       </View>
//     </ScrollView>
//   );
// }

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { useDeviceConnection } from '../../ble/useDeviceConnection';

export default function ConnectScreen() {
  const router = useRouter();
  
  const {
    connectedDevice,
    isScanning,
    connectionState,
    startScan,
    stopScan,
    connectToDevice,
    disconnectDevice,
  } = useDeviceConnection();

  const [discoveredDevices, setDiscoveredDevices] = useState<Device[]>([]);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationStep, setCalibrationStep] = useState(0);

  const handleScan = () => {
    setDiscoveredDevices([]);
    startScan((device) => {
      setDiscoveredDevices((prev) => {
        if (!prev.some((d) => d.id === device.id)) {
          return [...prev, device];
        }
        return prev;
      });
    });
  };

  const startCalibration = () => {
    setIsCalibrating(true);
    setCalibrationStep(1);
    setTimeout(() => setCalibrationStep(2), 3000);
    setTimeout(() => {
      setCalibrationStep(3);
      setIsCalibrating(false);
    }, 6000);
  };

  return (
    <View 
      className="flex-1 bg-background" 
      style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 140, flexGrow: 1 }}
    >
      <View className="max-w-md w-full mx-auto" style={{ gap: 18 }}>
        
        {/* Header Atas */}
        <View className="flex-row items-center justify-center relative py-2">
          <Text className="text-xl font-bold tracking-[0.05em] text-on-surface ml-2 mt-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
            LiftRight
          </Text>
        </View>

        {/* Judul Utama & Subtitle */}
        <View>
          <Text className="text-[32px] font-bold text-on-surface tracking-[-0.01em] mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Preparation
          </Text>
          <Text className="text-base text-outline" style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 24 }}>
            Ensure sensors are connected and calibrated before starting.
          </Text>
        </View>

        {/* Status Sensor Card */}
        <View className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-sm" style={{ gap: 16 }}>
          <Text className="text-2xl font-bold text-on-surface tracking-[0.02em]" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Sensor Status
          </Text>

          {/* Garis pemisah mandiri */}
          <View className="border-t" style={{ borderColor: '#3b547c14' }} />

          <View className="space-y-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-surface-container items-center justify-center">
                  <MaterialIcons name="bluetooth" size={20} color="#2d4055" />
                </View>
                <View>
                  <Text className="text-base font-semibold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Thoracic Sensor
                  </Text>
                  <Text className="text-sm text-outline" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    {connectedDevice ? 'Connected' : 'Searching...'}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-1.5">
                <View className={`w-2 h-2 rounded-full ${connectedDevice ? 'bg-green-600' : 'bg-outline'}`} />
                <Text className={`text-xs font-medium ${connectedDevice ? 'text-on-surface' : 'text-outline'}`} style={{ fontFamily: 'system-ui, sans-serif' }}>
                  {connectedDevice ? 'Connected' : 'Disconnected'}
                </Text>
              </View>
            </View>

            {connectedDevice ? (
              <View className="pt-2">
                <TouchableOpacity onPress={disconnectDevice} className="px-3 py-1.5 bg-red-100 rounded-lg items-center">
                  <Text className="text-xs font-medium text-red-600" style={{ fontFamily: 'system-ui, sans-serif' }}>Putuskan Koneksi</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="pt-2">
                <TouchableOpacity
                  onPress={isScanning ? stopScan : handleScan}
                  className="w-full py-3 bg-surface-container border border-outline-variant/30 rounded-xl items-center mt-3"
                >
                  <Text className="text-sm font-semibold text-primary" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    {isScanning ? 'Scanning...' : 'Scan for Sensors'}
                  </Text>
                </TouchableOpacity>

                {discoveredDevices.length > 0 && (
                  <View className="w-full mt-3 space-y-2">
                    <Text className="text-xs text-outline font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Perangkat Tersedia:</Text>
                    {discoveredDevices.map((dev) => (
                      <TouchableOpacity
                        key={dev.id}
                        onPress={() => connectToDevice(dev)}
                        className="p-3 bg-surface-container-high rounded-lg flex-row justify-between items-center"
                      >
                        <Text className="text-sm font-medium text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>{dev.name || 'ESP32-Device'}</Text>
                        <Text className="text-xs text-primary font-bold" style={{ fontFamily: 'system-ui, sans-serif' }}>HUBUNGKAN</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        </View>

        {/* Panel Kalibrasi (Desain Berurutan 1, 2, 3 Sesuai Gambar) */}
        <View className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-sm" style={{ gap: 16 }}>
          <Text className="text-2xl font-bold text-on-surface tracking-[0.02em]" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Calibration
          </Text>

          {/* Garis pemisah mandiri */}
          <View className="border-t" style={{ borderColor: '#3b547c14' }} />
          
          <View style={{ gap: 24 }}>
            {/* Step 1 */}
            <View className="flex-row items-start gap-3">
              <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
                <Text className="text-sm font-bold text-on-primary">1</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>Power On</Text>
                <Text className="text-sm text-outline mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>Hold the button on each sensor for 3 seconds.</Text>
              </View>
            </View>

            {/* Step 2 */}
            <View className="flex-row items-start gap-3">
              <View className="w-10 h-10 rounded-full bg-surface-container items-center justify-center mt-0.5 border border-outline-variant/30">
                <Text className="text-sm font-semibold text-outline">2</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>Attach to Body</Text>
                <Text className="text-sm text-outline mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>Secure the bands firmly around your chest and thigh.</Text>
              </View>
            </View>

            {/* Step 3 */}
            <View className="flex-row items-start gap-3">
              <View className="w-10 h-10 rounded-full bg-surface-container items-center justify-center mt-0.5 border border-outline-variant/30">
                <Text className="text-sm font-semibold text-outline">3</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-on-surface" style={{ fontFamily: 'system-ui, sans-serif' }}>Assume Position</Text>
                <Text className="text-sm text-outline mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>Stand completely still in the neutral position.</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={startCalibration}
            disabled={!connectedDevice || isCalibrating}
            activeOpacity={0.7}
            className={`py-3 rounded-xl items-center justify-center mt-3 ${
              !connectedDevice || isCalibrating 
                ? 'bg-surface-dim opacity-50' 
                : 'bg-surface-container border border-outline-variant/30'
            }`}
          >
            <Text className={`font-semibold text-sm tracking-[0.05em] text-center ${!connectedDevice || isCalibrating ? 'text-outline' : 'text-primary'}`} style={{ fontFamily: 'system-ui, sans-serif' }}>
              {isCalibrating ? 'Calibrating...' : calibrationStep === 3 ? 'Recalibrate' : 'Start Calibration'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tombol Start Session dengan Ikon Segitiga di Sisi Kiri */}
        <View className="mt-1">
          <TouchableOpacity 
            onPress={() => router.push('/session')}
            className="bg-primary h-14 rounded-full flex-row items-center justify-center gap-2 shadow-md"
          >
            <Ionicons name="play" size={14} color="#fff" />
            <Text className="text-on-primary font-bold text-xs uppercase tracking-widest" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Start Session
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}