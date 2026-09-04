import { eq, isNull } from 'drizzle-orm';
import { db } from '../db/client';
import { reps, sessions, sets } from '../db/schema';
import { supabase } from './supabase';

export async function syncOfflineSessions() {
  try {
    // Langsung ambil data sesi lokal yang kolom syncedAt-nya masih null
    const unsyncedSessions = await db
      .select()
      .from(sessions)
      .where(isNull(sessions.syncedAt))
      .all();

    if (unsyncedSessions.length === 0) {
      console.log('Tidak ada data antrean latihan yang perlu disinkronkan.');
      return { success: true, count: 0 };
    }

    console.log(`Menemukan ${unsyncedSessions.length} sesi untuk disinkronkan ke cloud...`);

    for (const session of unsyncedSessions) {
      // Ambil set terkait sesi ini dari SQLite
      const sessionSets = await db
        .select()
        .from(sets)
        .where(eq(sets.sessionId, session.id))
        .all();

      const formattedSets = [];
      for (const set of sessionSets) {
        const setReps = await db
          .select()
          .from(reps)
          .where(eq(reps.setId, set.id))
          .all();

        formattedSets.push({
          ...set,
          reps: setReps,
        });
      }

      const payload = {
        id: session.id,
        user_id: session.userId,
        started_at: session.startedAt,
        ended_at: session.endedAt,
        exercise: session.exercise,
        total_volume_kg: session.totalVolumeKg,
        avg_efficiency: session.avgEfficiency,
        sets: formattedSets,
      };

      // Kirim data ke Supabase (jika offline/gagal, blok catch akan menangkapnya)
      const { error: sessionError } = await supabase
        .from('sessions')
        .upsert({
          id: payload.id,
          user_id: payload.user_id,
          started_at: payload.started_at,
          ended_at: payload.ended_at,
          exercise: payload.exercise,
          total_volume_kg: payload.total_volume_kg,
          avg_efficiency: payload.avg_efficiency,
        });

      if (sessionError) {
        console.error(`Gagal mengunggah sesi ${session.id}:`, sessionError.message);
        continue; 
      }

      for (const s of formattedSets) {
        await supabase.from('sets').upsert({
          id: s.id,
          session_id: session.id,
          set_index: s.setIndex,
          load_kg: s.loadKg,
          rep_count: s.repCount,
          efficiency_score: s.efficiencyScore,
          velocity_loss_pct: s.velocityLossPct,
          sticking_angle_deg: s.stickingAngleDeg,
          classification: s.classification,
        });

        for (const r of s.reps) {
          await supabase.from('reps').upsert({
            id: r.id,
            set_id: s.id,
            rep_index: r.repIndex,
            peak_velocity: r.peakVelocity,
            mean_velocity: r.meanVelocity,
            trunk_angle_min: r.trunkAngleMin,
            trunk_angle_max: r.trunkAngleMax,
            deviation_score: r.deviationScore,
            classification: r.classification,
            confidence: r.confidence,
          });
        }
      }

      const currentTimestamp = Date.now();
      await db
        .update(sessions)
        .set({ syncedAt: currentTimestamp })
        .where(eq(sessions.id, session.id));

      console.log(`Sesi ${session.id} berhasil disinkronkan dan ditandai di SQLite.`);
    }

    return { success: true, count: unsyncedSessions.length };
  } catch (error) {
    console.error('Terjadi kesalahan saat proses sinkronisasi (kemungkinan offline):', error);
    return { success: false, error };
  }
}