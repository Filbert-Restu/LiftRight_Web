import { useAuthStore } from '../stores/authStore'; // Import auth store
import { db } from './client';
import { reps, sessions, sets } from './schema';

// Fungsi untuk menyimpan sesi latihan lengkap (Sesi + Set + Repetisi)
export async function saveCompleteSession(sessionData: {
  id: string;
  exercise: string;
  startedAt: number;
  endedAt: number;
  totalVolumeKg: number;
  avgEfficiency: number;
  sets: Array<{
    id: string;
    setIndex: number;
    loadKg: number;
    repCount: number;
    efficiencyScore: number;
    velocityLossPct: number;
    stickingAngleDeg: number;
    classification: string;
    reps: Array<{
      id: string;
      repIndex: number;
      peakVelocity: number;
      meanVelocity: number;
      trunkAngleMin: number;
      trunkAngleMax: number;
      deviationScore: number;
      classification: string;
      confidence: number;
    }>;
  }>;
}) {
  try {
    // Ambil user yang sedang aktif dari Zustand store secara langsung
    const currentUser = useAuthStore.getState().user;
    const activeUserId = currentUser ? currentUser.id : null;

    await db.transaction(async (tx) => {
      // 1. Simpan data utama sesi (termasuk userId)
      await tx.insert(sessions).values({
        id: sessionData.id,
        userId: activeUserId, // <--- Diikat ke ID Supabase atau null jika offline/belum login
        startedAt: sessionData.startedAt,
        endedAt: sessionData.endedAt,
        exercise: sessionData.exercise,
        totalVolumeKg: sessionData.totalVolumeKg,
        avgEfficiency: sessionData.avgEfficiency,
        syncedAt: null, // Tandai belum sinkron ke cloud (offline-first)
      });

      // 2. Simpan setiap set dan repetisinya di dalam sesi tersebut
      for (const s of sessionData.sets) {
        await tx.insert(sets).values({
          id: s.id,
          sessionId: sessionData.id,
          setIndex: s.setIndex,
          loadKg: s.loadKg,
          repCount: s.repCount,
          efficiencyScore: s.efficiencyScore,
          velocityLossPct: s.velocityLossPct,
          stickingAngleDeg: s.stickingAngleDeg,
          classification: s.classification,
        });

        // 3. Simpan detail repetisi per set
        for (const r of s.reps) {
          await tx.insert(reps).values({
            id: r.id,
            setId: s.id,
            repIndex: r.repIndex,
            peakVelocity: r.peakVelocity,
            meanVelocity: r.meanVelocity,
            trunkAngleMin: r.trunkAngleMin,
            trunkAngleMax: r.trunkAngleMax,
            deviationScore: r.deviationScore,
            classification: r.classification,
            confidence: r.confidence,
          });
        }
      }
    });

    console.log('Sesi latihan lengkap berhasil disimpan ke SQLite secara lokal dengan User ID:', activeUserId);
    return true;
  } catch (error) {
    console.error('Gagal menyimpan sesi latihan lengkap:', error);
    return false;
  }
}

export async function fetchAllSessions() {
  try {
    // Hapus '.all()' karena db.select() dengan await sudah mengembalikan data array
    const result = await db.select().from(sessions);
    return result;
  } catch (error) {
    console.error('Gagal memuat riwayat sesi:', error);
    return [];
  }
}