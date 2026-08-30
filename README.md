# LiftRight — Mobile Companion App

Aplikasi pendamping untuk perangkat wearable **LiftRight**: dua sensor IMU di punggung (T12–L1 dan S1–S2) yang mengukur kualitas angkatan pada gerakan compound dan memisahkan *kelelahan otot* dari *perubahan teknik*.

Tema visual: **Frosted Industrial**.

> **Peran aplikasi ini: layar dan gerbang sinkronisasi — bukan pemroses.**
> Seluruh analisis (pemotongan repetisi, filter Madgwick, inferensi CNN, deteksi penurunan kecepatan) berjalan **di dalam perangkat**. Aplikasi hanya menerima ringkasan yang sudah jadi lewat BLE, menampilkannya, menyimpannya secara lokal, lalu menyinkronkannya ke cloud. Kalau HP tidak ada atau BLE putus, perangkat tetap berfungsi penuh dan memberi getaran; data tersimpan di flash internal lalu disinkronkan saat tersambung kembali.
>
> **Konsekuensi teknis: jangan pernah menulis logika keputusan latihan (klasifikasi fatigue vs form_change, skor efisiensi, dll.) di sisi aplikasi.** Angka-angka itu datang sudah jadi dari firmware. Aplikasi hanya menampilkan, menyimpan, dan mengunggah.

---

## Status proyek — baca ini dulu sebelum menulis kode

**Repo ini saat ini masih scaffold default `create-expo-app` (Expo SDK 57).** Belum ada BLE, belum ada state management, belum ada database lokal, belum ada Supabase, belum ada design token Frosted Industrial yang benar-benar dipasang. Yang sudah ada hanyalah:

- `src/app/` — dua rute contoh bawaan template (`index.tsx`, `explore.tsx`) + `_layout.tsx`
- `src/components/` — komponen contoh bawaan template (themed-text, themed-view, collapsible, dll.)
- `src/hooks/`, `src/constants/theme.ts` — bawaan template
- `package.json` — dependency bawaan Expo Router saja; **belum ada** `nativewind`, `react-native-ble-plx`, `zustand`, `@tanstack/react-query`, `drizzle-orm`, `expo-sqlite`, `@supabase/supabase-js`, dsb.
- Tidak ada `tailwind.config.js`, `.env.example`, atau `drizzle.config.ts` di repo.

Seluruh bagian di bawah (stack, kontrak BLE, skema database, struktur folder) adalah **spesifikasi target/arsitektur yang sudah disetujui**, bukan deskripsi kode yang sudah ada. Anggap dokumen ini sebagai kontrak desain yang harus diimplementasikan bertahap sesuai [Roadmap](#roadmap), mulai dari Tahap 1.

**Kalau kamu (manusia atau AI agent) mengedit repo ini:** cek dulu apakah dependency/file yang kamu asumsikan sudah benar-benar ada di `package.json` / filesystem sebelum menulis kode yang memakainya. Jangan percaya begitu saja bahwa sesuatu di bawah ini sudah terpasang.

> Ada juga catatan penting di [`AGENTS.md`](./AGENTS.md): Expo sudah berubah signifikan — baca dokumentasi versi v57 di https://docs.expo.dev/versions/v57.0.0/ sebelum menulis kode apa pun yang menyentuh API Expo.

---

## Daftar isi

1. [Status proyek](#status-proyek--baca-ini-dulu-sebelum-menulis-kode)
2. [Ringkasan stack (target)](#ringkasan-stack-target)
3. [Kenapa pilihan-pilihan ini](#kenapa-pilihan-pilihan-ini)
4. [Prasyarat](#prasyarat)
5. [Cara menjalankan](#cara-menjalankan)
6. [Struktur folder (target)](#struktur-folder-target)
7. [Design token — Frosted Industrial](#design-token--frosted-industrial)
8. [Kontrak BLE](#kontrak-ble)
9. [Izin platform](#izin-platform)
10. [Model data lokal (target)](#model-data-lokal-target)
11. [Peta layar](#peta-layar)
12. [Jebakan yang sudah diketahui](#jebakan-yang-sudah-diketahui)
13. [Roadmap](#roadmap)

---

## Ringkasan stack (target)

| Lapisan | Pilihan | Paket |
|---|---|---|
| Runtime | Expo (Development Build) | `expo` |
| Bahasa | TypeScript, strict mode | `typescript` |
| Navigasi | Expo Router (file-based) | `expo-router` |
| Styling | NativeWind v4 (Tailwind untuk RN) | `nativewind`, `tailwindcss` |
| Efek frosted | Blur asli platform | `expo-blur` |
| Font | Hanken Grotesk 400–800 | `@expo-google-fonts/hanken-grotesk`, `expo-font` |
| Ikon | Material Symbols / Material Icons | `@expo/vector-icons` |
| BLE | Klien BLE | `react-native-ble-plx` |
| Parsing biner | Base64 cepat + DataView | `react-native-quick-base64` |
| State perangkat | Store ringan | `zustand` |
| State server | Cache & sinkronisasi | `@tanstack/react-query` |
| DB lokal | SQLite + ORM tipe-aman | `expo-sqlite`, `drizzle-orm` |
| Key-value cepat | Preferensi & sesi | `react-native-mmkv` |
| Grafik | Skia (chart batang, ring efisiensi) | `@shopify/react-native-skia`, `victory-native` |
| Animasi | UI thread animation | `react-native-reanimated`, `react-native-gesture-handler` |
| Layar tetap nyala | Wajib saat set berjalan | `expo-keep-awake` |
| Getaran HP | Umpan balik sekunder | `expo-haptics` |
| Backend | Auth + Postgres + Storage | `@supabase/supabase-js` |
| API analitik | Endpoint agregasi & OTA model | FastAPI (repo terpisah) |
| Build & rilis | Cloud build + OTA JS | `eas-cli`, `expo-updates` |
| Pemantauan | Crash & performa | `@sentry/react-native` |
| Uji unit | | `jest`, `@testing-library/react-native` |
| Uji E2E | | `maestro` |
| Kualitas kode | | `eslint`, `prettier` |

Kolom "Paket" di atas adalah **target**. Cek `package.json` untuk daftar dependency yang benar-benar terpasang saat ini.

### Perintah instalasi (belum dijalankan)

```bash
# 1. Styling
npm install nativewind tailwindcss@^3
npx tailwindcss init

# 2. Font
npx expo install @expo-google-fonts/hanken-grotesk @expo/vector-icons

# 3. BLE
npx expo install react-native-ble-plx
npm install react-native-quick-base64

# 4. State & data
npm install zustand @tanstack/react-query drizzle-orm
npx expo install expo-sqlite react-native-mmkv
npm install -D drizzle-kit

# 5. Grafik
npx expo install @shopify/react-native-skia
npm install victory-native

# 6. Backend
npm install @supabase/supabase-js
npx expo install expo-secure-store

# 7. Build
npm install -g eas-cli
npx expo install expo-dev-client expo-updates
```

> `expo-router`, `expo-font`, `react-native-reanimated`, `react-native-gesture-handler`, `react-native-safe-area-context`, `react-native-screens` sudah terpasang lewat scaffold `create-expo-app` — jangan pasang ulang.

---

## Kenapa pilihan-pilihan ini

**Expo Development Build, bukan Expo Go.** `react-native-ble-plx` adalah modul native, jadi Expo Go tidak akan pernah bisa menjalankannya. Tapi kamu tidak perlu keluar dari ekosistem Expo — cukup pakai `expo-dev-client` dan config plugin. Kamu tetap dapat OTA update, EAS Build, dan `npx expo install` yang menjaga kecocokan versi. Bare React Native CLI hanya menambah beban konfigurasi Gradle/Xcode tanpa keuntungan di sini.

**NativeWind, karena desainnya sudah berupa konfigurasi Tailwind.** Mockup Stitch mengekspor token warna, radius, dan spacing langsung dalam bentuk `tailwind.config`. Dengan NativeWind, blok itu bisa disalin apa adanya dan `className="bg-surface-container rounded-lg"` langsung bekerja. Memakai StyleSheet biasa berarti menerjemahkan ulang 40+ token warna secara manual — pekerjaan sia-sia yang rawan salah ketik.

**Zustand + TanStack Query, bukan Redux.** Ada dua jenis state yang sifatnya berbeda: state perangkat yang berubah beberapa kali per detik selama set (kecepatan, hitungan repetisi, status koneksi) dan state server yang jarang berubah (riwayat sesi). Zustand menangani yang pertama dengan overhead render minimal; TanStack Query menangani cache, retry, dan invalidasi yang kedua. Redux Toolkit bisa saja, tapi boilerplate-nya tidak sepadan untuk aplikasi 4 layar.

**expo-sqlite + Drizzle, bukan AsyncStorage.** Data sesi bersifat relasional (sesi → set → repetisi) dan akan sering ada kueri agregat: rata-rata kecepatan per set, tren volume mingguan, perbandingan antar sesi. AsyncStorage memaksa memuat seluruh JSON ke memori untuk itu. Drizzle memberi tipe TypeScript dari skema, jadi kesalahan kolom ketahuan saat kompilasi.

**Skia untuk grafik, bukan library chart biasa.** Dua komponen di desain tidak bisa dibuat rapi dengan `<View>`: ring efisiensi 87/100 dan chart kecepatan antar-set. Skia merender di GPU, jadi animasi ring tetap 60 fps sementara data BLE masuk. `victory-native` (versi XL, berbasis Skia) memberi sumbu dan skala tanpa perlu menghitung sendiri.

**`expo-keep-awake` itu wajib, bukan opsional.** Kalau layar mati di tengah set, di Android koneksi BLE bisa masuk mode hemat daya dan interval koneksi melar — angka kecepatan jadi tersendat. Aktifkan saat set dimulai, matikan saat sesi selesai.

**Supabase untuk sinkronisasi, FastAPI untuk analitik.** Supabase menangani auth, Postgres, dan Row Level Security tanpa perlu menulis backend sendiri. FastAPI dipakai hanya untuk hal yang butuh Python: agregasi lintas pengguna, pelatihan ulang model, dan penyajian berkas model untuk OTA ke perangkat.

---

## Prasyarat

- Node.js LTS dan npm
- Watchman (macOS)
- **HP fisik dengan Bluetooth** — emulator/simulator tidak punya BLE, jadi tidak ada jalan pintas di sini (untuk Tahap 2 ke atas; Tahap 1 memakai mock)
- Android Studio (Android) atau Xcode 15+ (iOS)
- Akun Expo untuk EAS Build
- Proyek Supabase (URL + anon key) — dibutuhkan mulai Tahap 4

---

## Cara menjalankan

Untuk sekarang (scaffold default, belum ada dev client / native module tambahan):

```bash
npm install
npx expo start
```

Setelah `react-native-ble-plx` dan modul native lain terpasang (Tahap 2 ke atas), dev build wajib dipakai — Expo Go tidak akan bisa menjalankan BLE:

```bash
# Salin variabel lingkungan
cp .env.example .env

# Buat development build (sekali di awal, dan tiap ada modul native baru)
eas build --profile development --platform android
# atau lokal:
npx expo run:android

# Jalankan dev server
npx expo start --dev-client
```

`.env.example` (target, belum dibuat):

```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_API_BASE_URL=
```

> Jangan letakkan service role key Supabase di aplikasi. Apa pun yang berawalan `EXPO_PUBLIC_` ikut terbundel dan bisa dibaca siapa saja yang membongkar APK.

**Mode simulator perangkat.** Karena hardware kemungkinan belum siap saat frontend dikerjakan, sediakan `MockBleTransport` yang memutar rekaman ringkasan repetisi dari berkas JSON dengan tempo realistis. Ini memungkinkan seluruh UI dikembangkan dan diuji tanpa perangkat, dan menjadi mode demo cadangan kalau alat bermasalah saat presentasi.

---

## Struktur folder (target)

Struktur berikut adalah rencana, disusun bertahap mengikuti [Roadmap](#roadmap). Struktur `src/app`, `src/components`, `src/hooks`, `src/constants` saat ini masih isi scaffold default Expo Router, belum mengikuti pembagian `features/` di bawah.

```
src/
├── app/                          # Expo Router — rute = berkas
│   ├── _layout.tsx               # Root: font, provider, tema
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Bottom nav 4 tab
│   │   ├── connect.tsx           # Persiapan & koneksi
│   │   ├── session.tsx           # Sesi aktif (live)
│   │   ├── analysis.tsx          # Analisis antar-set
│   │   └── history.tsx           # Riwayat & laporan
│   ├── session/[id].tsx          # Detail satu sesi lampau
│   └── settings.tsx
│
├── ble/
│   ├── manager.ts                # Singleton BleManager
│   ├── constants.ts              # UUID service & characteristic
│   ├── codec.ts                  # Parser struct biner → objek TS
│   ├── useDeviceConnection.ts    # Hook: scan, connect, reconnect
│   ├── useLiveMetrics.ts         # Hook: langganan notifikasi live
│   └── mock/                     # Transport palsu untuk dev tanpa alat
│
├── db/
│   ├── schema.ts                 # Skema Drizzle
│   ├── client.ts
│   └── migrations/
│
├── features/
│   ├── connect/                  # Komponen khusus layar Connect
│   ├── session/
│   ├── analysis/
│   └── history/
│
├── components/
│   ├── FrostedCard.tsx           # BlurView + border + radius
│   ├── MetricTile.tsx
│   ├── EfficiencyRing.tsx        # Skia
│   ├── SetSpeedChart.tsx         # Skia
│   ├── StatusPill.tsx
│   └── PrimaryButton.tsx
│
├── stores/
│   ├── deviceStore.ts            # Zustand: koneksi, baterai, kalibrasi
│   └── sessionStore.ts           # Zustand: set berjalan, repetisi live
│
├── sync/
│   ├── supabase.ts
│   ├── uploadSession.ts          # Antre unggah, tahan offline
│   └── queries.ts                # TanStack Query hooks
│
├── theme/
│   ├── colors.ts                 # Token dari bagian Design token di bawah
│   └── typography.ts
│
└── lib/
    ├── format.ts                 # Format m/s, kg, persentase
    └── time.ts

tailwind.config.js
app.json
drizzle.config.ts
```

---

## Design token — Frosted Industrial

`tailwind.config.js` belum ada di repo. Blok di bawah adalah token yang sudah difinalkan sebagai sumber kebenaran (dipilih di atas versi prosa desain awal yang memakai warna berbeda, karena inilah yang benar-benar terlihat di mockup final). Salin apa adanya saat membuat `tailwind.config.js`.

### `tailwind.config.js` (target)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2d4055",
        "on-primary": "#ffffff",
        "primary-container": "#44576d",
        "on-primary-container": "#b9cce6",
        "primary-fixed": "#d0e4ff",
        "primary-fixed-dim": "#b4c8e2",
        "inverse-primary": "#b4c8e2",

        secondary: "#466271",
        "on-secondary": "#ffffff",
        "secondary-container": "#c9e7f8",
        "on-secondary-container": "#4c6877",

        tertiary: "#344047",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#4b575f",
        "on-tertiary-container": "#c0ccd5",

        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        surface: "#f9f9f9",
        "surface-dim": "#dadada",
        "surface-bright": "#f9f9f9",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f4f3f3",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e8e8e8",
        "surface-container-highest": "#e2e2e2",
        "surface-variant": "#e2e2e2",
        "surface-tint": "#4d6076",

        background: "#f9f9f9",
        "on-background": "#1a1c1c",
        "on-surface": "#1a1c1c",
        "on-surface-variant": "#43474c",
        "inverse-surface": "#2f3131",
        "inverse-on-surface": "#f1f1f1",
        outline: "#74777d",
        "outline-variant": "#c4c6cd",
      },
      borderRadius: {
        sm: 4, DEFAULT: 8, md: 12, lg: 16, xl: 24, full: 9999,
      },
      spacing: {
        xs: 4, base: 8, sm: 12, gutter: 16, margin: 20,
        md: 24, lg: 40, xl: 64,
      },
      fontFamily: {
        sans: ["HankenGrotesk_400Regular"],
        medium: ["HankenGrotesk_500Medium"],
        semibold: ["HankenGrotesk_600SemiBold"],
        bold: ["HankenGrotesk_700Bold"],
        black: ["HankenGrotesk_800ExtraBold"],
      },
    },
  },
};
```

### Skala tipografi

| Token | Ukuran / Line height | Bobot | Dipakai untuk |
|---|---|---|---|
| `headline-xl` | 48 / 56, tracking -0.02em | 800 | Angka kecepatan besar (0.45 m/s) |
| `headline-lg` | 32 / 40, tracking -0.01em | 700 | Judul layar ("Preparation", "Analysis") |
| `headline-lg-mobile` | 28 / 36 | 700 | Varian layar sempit |
| `headline-md` | 24 / 32 | 600 | Judul kartu |
| `body-lg` | 18 / 28 | 400 | Teks pendukung |
| `body-md` | 16 / 24 | 400 | Teks isi |
| `label-md` | 14 / 20, tracking 0.05em | 600 | Label uppercase ("LIFT SPEED", "SETS") |
| `label-sm` | 12 / 16 | 500 | Metadata, keterangan sumbu |

Label uppercase dengan tracking longgar adalah ciri khas tema ini — meniru panel alat gym profesional. Terapkan `uppercase tracking-[0.05em]` konsisten, jangan setengah-setengah.

### Komponen frosted

Efek frosted **bukan** sekadar warna abu. Polanya: `BlurView` dari `expo-blur`, di atasnya lapisan putih semi-transparan, dengan border tipis `#AAC7D8` opasitas 30%.

```tsx
import { BlurView } from "expo-blur";
import { View } from "react-native";

export function FrostedCard({ children, className = "" }) {
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
```

Catatan penting: `overflow-hidden` wajib, jika tidak sudut membulat tidak akan memotong blur di Android. Dan **batasi jumlah `BlurView` per layar** — lihat bagian [jebakan](#jebakan-yang-sudah-diketahui).

Bayangan untuk elevasi tinggi (modal, FAB): `rgba(41, 53, 60, 0.08)`, blur 32px. Di Android pakai `elevation`, di iOS pakai `shadowColor`/`shadowRadius`.

---

## Kontrak BLE

Aplikasi tidak pernah menerima data IMU mentah selama latihan. Hanya tiga jenis pesan ringkasan.

### Service dan characteristic

| Nama | UUID | Sifat | Isi |
|---|---|---|---|
| LiftRight Service | `0000A100-...-0000` | — | — |
| Live Metrics | `0000A101-...-0000` | Notify, ~4 Hz | Kecepatan terakhir, hitungan repetisi, sudut kini, status |
| Rep Summary | `0000A102-...-0000` | Notify, per repetisi | Kecepatan puncak & rata-rata, sudut min/maks, skor simpangan, label |
| Set Summary | `0000A103-...-0000` | Notify, per set | Jumlah repetisi, skor efisiensi, penurunan kecepatan, klasifikasi |
| Control | `0000A104-...-0000` | Write | Mulai/berhenti set, kalibrasi nol, atur gerakan |
| Device Status | `0000A105-...-0000` | Read + Notify | Baterai, versi firmware, versi model |
| History Dump | `0000A106-...-0000` | Notify | Ringkasan tertunda saat perangkat sempat terputus |

Ganti `...` dengan basis UUID kustom firmware. Jangan pakai UUID 16-bit yang sudah dialokasikan Bluetooth SIG.

### Format payload

Struct biner **little-endian**, bukan JSON. JSON membengkakkan payload 3–5 kali lipat untuk data yang isinya angka semua, dan default ATT MTU hanya 23 byte.

```
RepSummary — 20 byte
  uint16  rep_index
  uint16  duration_ms
  int16   peak_velocity_mms      // mm/s, hindari float
  int16   mean_velocity_mms
  int16   trunk_angle_min_deci   // derajat × 10
  int16   trunk_angle_max_deci
  int16   deviation_score        // × 100
  uint8   classification         // 0=normal 1=fatigue 2=form_change
  uint8   confidence             // 0–100
  uint32  timestamp_ms
```

Parsing di sisi aplikasi (target — `react-native-quick-base64` belum terpasang):

```ts
import { toByteArray } from "react-native-quick-base64";

export function decodeRepSummary(base64: string) {
  const view = new DataView(toByteArray(base64).buffer);
  return {
    repIndex:       view.getUint16(0, true),
    durationMs:     view.getUint16(2, true),
    peakVelocity:   view.getInt16(4, true) / 1000,   // → m/s
    meanVelocity:   view.getInt16(6, true) / 1000,
    trunkAngleMin:  view.getInt16(8, true) / 10,     // → derajat
    trunkAngleMax:  view.getInt16(10, true) / 10,
    deviationScore: view.getInt16(12, true) / 100,
    classification: ["normal", "fatigue", "form_change"][view.getUint8(14)],
    confidence:     view.getUint8(15),
    timestampMs:    view.getUint32(16, true),
  };
}
```

Integer berskala dipakai alih-alih float karena ukurannya separuh dan tidak ada ambiguitas endianness float antar platform.

### Alur koneksi

1. Scan dengan filter service UUID — jangan scan semua perangkat, boros baterai dan lambat.
2. Connect, lalu **`requestMTU(247)` di Android**. Tanpa ini payload 20 byte akan terpotong.
3. `discoverAllServicesAndCharacteristics()`.
4. Baca Device Status → tampilkan baterai dan versi firmware.
5. Berlangganan notifikasi. Jangan polling dengan `read` berulang.
6. Kirim perintah kalibrasi, tunggu konfirmasi.
7. Jika ada History Dump tertunda, tarik dulu sebelum sesi baru.

**Interval koneksi adaptif.** Minta interval pendek (15–30 ms) saat set berjalan, panjang (200–500 ms) saat istirahat. Ini penghematan baterai terbesar dan gratis. Di Android lewat `requestConnectionPriority`; di iOS perangkatlah yang harus mengajukan.

**Reconnect otomatis.** BLE putus itu normal — HP masuk kantong, ada gangguan 2,4 GHz. Pasang `onDisconnected`, coba sambung ulang dengan backoff eksponensial, dan tampilkan status jujur di UI. Jangan tampilkan angka basi seolah masih live.

---

## Izin platform

### `app.json` (target — tambahan di atas isi saat ini)

```json
{
  "expo": {
    "plugins": [
      ["react-native-ble-plx", {
        "isBackgroundEnabled": true,
        "modes": ["peripheral", "central"],
        "bluetoothAlwaysPermission": "LiftRight membutuhkan Bluetooth untuk terhubung ke sensor punggung."
      }],
      "expo-router",
      "expo-font"
    ],
    "ios": {
      "infoPlist": {
        "NSBluetoothAlwaysUsageDescription": "LiftRight terhubung ke sensor punggung lewat Bluetooth.",
        "UIBackgroundModes": ["bluetooth-central"]
      }
    },
    "android": {
      "permissions": [
        "android.permission.BLUETOOTH_SCAN",
        "android.permission.BLUETOOTH_CONNECT",
        "android.permission.ACCESS_FINE_LOCATION"
      ]
    }
  }
}
```

`app.json` saat ini masih memakai nama/slug bawaan template (`my-app`) dan belum memiliki plugin BLE di atas — perlu diperbarui saat Tahap 2 dimulai (lihat [Roadmap](#roadmap)).

**Android 12+ berubah total.** Izin lama `BLUETOOTH` dan `BLUETOOTH_ADMIN` diganti `BLUETOOTH_SCAN` dan `BLUETOOTH_CONNECT`, dan keduanya harus **diminta saat runtime**, bukan sekadar dideklarasikan. Tambahkan `android:usesPermissionFlags="neverForLocation"` pada `BLUETOOTH_SCAN` agar izin lokasi tidak ikut diminta — pengguna curiga kalau aplikasi gym meminta lokasi.

**Android 11 ke bawah tetap butuh `ACCESS_FINE_LOCATION`** untuk memindai BLE. Tangani kedua jalur, jangan asumsikan semua penguji pakai HP baru.

---

## Model data lokal (target)

`expo-sqlite` dan `drizzle-orm` belum terpasang. Skema berikut adalah rencana untuk Tahap 3.

```ts
// src/db/schema.ts
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  startedAt: integer("started_at").notNull(),
  endedAt: integer("ended_at"),
  exercise: text("exercise").notNull(),
  totalVolumeKg: real("total_volume_kg"),
  avgEfficiency: real("avg_efficiency"),
  syncedAt: integer("synced_at"),          // null = belum diunggah
});

export const sets = sqliteTable("sets", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull().references(() => sessions.id),
  setIndex: integer("set_index").notNull(),
  loadKg: real("load_kg").notNull(),
  repCount: integer("rep_count").notNull(),
  efficiencyScore: real("efficiency_score"),
  velocityLossPct: real("velocity_loss_pct"),
  stickingAngleDeg: real("sticking_angle_deg"),
  classification: text("classification"),   // normal | fatigue | form_change
});

export const reps = sqliteTable("reps", {
  id: text("id").primaryKey(),
  setId: text("set_id").notNull().references(() => sets.id),
  repIndex: integer("rep_index").notNull(),
  peakVelocity: real("peak_velocity"),
  meanVelocity: real("mean_velocity"),
  trunkAngleMin: real("trunk_angle_min"),
  trunkAngleMax: real("trunk_angle_max"),
  deviationScore: real("deviation_score"),
  classification: text("classification"),
  confidence: integer("confidence"),
});
```

**Tulis ke SQLite lebih dulu, unggah belakangan.** Kolom `syncedAt` yang `null` menandai antrean unggah. Ini membuat aplikasi tetap berfungsi penuh tanpa internet — kondisi normal di gym basement — dan sesuai dengan klaim arsitektur bahwa cloud hanya untuk penyimpanan jangka panjang.

**Patokan pribadi dihitung dari set kerja, bukan pemanasan.** Sudah ditangani firmware, tapi kalau aplikasi menampilkan garis pembanding di grafik, pastikan mengambil `sets` dengan `loadKg` yang sama, bukan set pertama sesi.

---

## Peta layar

| Rute (target) | Isi utama |
|---|---|
| `(tabs)/connect` | Pilih gerakan, status dua unit sensor, urutan kalibrasi 3 fase (20 detik), tombol mulai sesi |
| `(tabs)/session` | Kecepatan besar (m/s), penurunan kecepatan, ring efisiensi, set & repetisi berjalan, Pause / Finish |
| `(tabs)/analysis` | Ringkasan set, sudut titik macet, skor konsistensi, klasifikasi teknik vs kelelahan, saran, tombol set berikutnya |
| `(tabs)/history` | Volume total, efisiensi rata-rata, chart kecepatan antar-set, saran beban sesi berikutnya, daftar sesi lampau |

Rute yang ada sekarang di `src/app/` (`index.tsx`, `explore.tsx`) adalah placeholder bawaan template, belum memetakan ke 4 tab di atas.

### Catatan per layar

**Connect.** Gunakan istilah "Unit Punggung — Sensor Atas / Sensor Bawah", atau tampilkan satu baris status perangkat saja. Kedua sensor ada di satu unit punggung pada satu MCU (T12–L1 dan S1–S2) — **jangan** tampilkan sebagai dua koneksi BLE terpisah ("Thoracic Unit" / "Femoral Unit"), itu tidak cocok dengan arsitektur firmware dan akan menimbulkan pertanyaan yang jawabannya bertentangan dengan desain sendiri.

**Session.** Ini satu-satunya layar yang menerima data frekuensi tinggi. Angka kecepatan harus dibaca dari jarak 2 meter sambil bergerak — `headline-xl` bobot 800 sudah tepat. Jangan animasikan pergantian angka dengan transisi; pengguna butuh nilai, bukan gerakan. Aktifkan `useKeepAwake()` di layar ini saja.

**Analysis.** Beri `paddingBottom` pada ScrollView setara tinggi tombol "START NEXT SET" plus safe area, supaya kartu "AI ADVICE" tidak tertutup. Ini layar tempat fitur inti produk terlihat, jadi klasifikasi teknik-vs-kelelahan harus punya penjelasan satu kalimat, bukan hanya label.

**History.** Chart kecepatan antar-set adalah bukti visual paling kuat dari konsep penurunan kecepatan. Beri garis ambang horizontal (misalnya batas −20%) supaya pola turunnya terbaca sebagai temuan, bukan sekadar batang yang mengecil.

### Bahasa dan istilah

Simpan nada teknis kental ("Target Kinematics", "Telemetry Status", "Orientation Sequence") untuk **label metadata**, dan pakai bahasa biasa untuk **instruksi** — pengguna sedang di bawah barbel 140 kg, bukan sedang membaca datasheet.

**Jangan pernah memakai kata "AMAN"/"SAFE" atau bahasa keselamatan lain.** LiftRight adalah alat bantu latihan, bukan alat medis. Pakai istilah seperti "Deviation Risk: Low" dan skor angka — pertahankan itu di seluruh aplikasi.

---

## Jebakan yang sudah diketahui

**BlurView mahal di Android.** Lebih dari 3–4 `BlurView` dalam satu layar akan menjatuhkan frame rate, terutama di HP kelas menengah yang kemungkinan besar dipakai penguji. Solusi: pakai blur sungguhan hanya untuk elemen mengambang (header, bottom nav, modal). Untuk kartu statis, tiru tampilannya dengan `bg-white/80` dan border — secara visual hampir tidak terbedakan di atas background terang `#f9f9f9`.

**Jangan menyimpan data live di React state.** Notifikasi 4–10 Hz yang masuk ke `useState` akan memicu render seluruh pohon komponen. Simpan di store Zustand dan berlangganan dengan selektor sempit, atau tulis ke shared value Reanimated untuk nilai yang hanya dianimasikan.

**Timestamp perangkat dan HP tidak sinkron.** MCU menghitung dari boot, HP memakai waktu wall-clock. Catat offset sekali saat koneksi terbentuk, lalu konversikan seluruh timestamp perangkat sebelum disimpan. Kalau tidak, riwayat sesi akan tampil di tahun 1970.

**Base64 bawaan React Native lambat.** `react-native-ble-plx` mengembalikan nilai characteristic dalam base64. `atob` polyfill JS jadi hambatan nyata pada 10 Hz. Karena itu `react-native-quick-base64` ada di daftar dependency target.

**iOS menyembunyikan MAC address.** Perangkat tidak bisa diidentifikasi lewat MAC di iOS — sistem memberi UUID acak per aplikasi. Simpan identifier yang diberikan `react-native-ble-plx`, bukan alamat hardware, untuk fitur "sambungkan otomatis ke perangkat terakhir".

**Reanimated harus jadi plugin terakhir di `babel.config.js`.** Kesalahan urutan menghasilkan error runtime yang pesannya tidak informatif sama sekali.

**Font Material Symbols tidak tersedia langsung.** Desain memakai Material Symbols Outlined, tapi `@expo/vector-icons` menyediakan Material Icons (generasi lama) dengan sebagian nama berbeda. Pilih salah satu: muat berkas variable font Material Symbols lewat `expo-font`, atau petakan nama ikon ke Material Icons dan terima perbedaan bentuk kecil. Jangan campur keduanya.

**Expo sudah berubah sejak banyak tutorial ditulis.** Proyek ini memakai Expo SDK 57 (lihat `package.json`). Selalu cek dokumentasi versi v57 di https://docs.expo.dev/versions/v57.0.0/ sebelum mengikuti contoh dari sumber lain — lihat [`AGENTS.md`](./AGENTS.md).

---

## Roadmap

**Tahap 1 — UI dengan data palsu (belum dimulai).** Ganti scaffold default dengan struktur `features/` + 4 tab, styling NativeWind, dan `MockBleTransport` yang memutar rekaman ringkasan repetisi dari JSON. Seluruh layar berjalan tanpa ketergantungan hardware. Ini juga menjadi mode demo cadangan.

**Tahap 2 — BLE nyata.** Sambungkan ke ESP32-S3, verifikasi parsing biner dan stabilitas reconnect.

**Tahap 3 — Persistensi.** SQLite + Drizzle, riwayat sesi, antrean unggah offline.

**Tahap 4 — Cloud.** Supabase auth dan sinkronisasi, endpoint FastAPI untuk tren jangka panjang.

**Tahap 5 — OTA model.** Aplikasi mengunduh model versi baru dari server dan meneruskannya ke perangkat lewat BLE. Ini menutup siklus perbaikan berkelanjutan pada bagian kontribusi AI dan sustainability di concept paper.
