import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id"), // Tambahkan kolom ini untuk menyimpan ID Supabase
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