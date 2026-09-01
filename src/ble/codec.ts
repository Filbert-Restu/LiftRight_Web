import { toByteArray } from "react-native-quick-base64";

export interface RepSummaryPayload {
  repIndex: number;
  durationMs: number;
  peakVelocity: number;      // dalam m/s
  meanVelocity: number;      // dalam m/s
  trunkAngleMin: number;     // dalam derajat
  trunkAngleMax: number;     // dalam derajat
  deviationScore: number;
  classification: "normal" | "fatigue" | "form_change";
  confidence: number;
  timestampMs: number;
}

export function decodeRepSummary(base64: string): RepSummaryPayload {
  const buffer = toByteArray(base64).buffer;
  const view = new DataView(buffer);

  const classIndex = view.getUint8(14);
  const classificationMap: ("normal" | "fatigue" | "form_change")[] = ["normal", "fatigue", "form_change"];

  return {
    repIndex:       view.getUint16(0, true),
    durationMs:     view.getUint16(2, true),
    peakVelocity:   view.getInt16(4, true) / 1000,   // Skala mm/s diubah ke m/s
    meanVelocity:   view.getInt16(6, true) / 1000,   // Skala mm/s diubah ke m/s
    trunkAngleMin:  view.getInt16(8, true) / 10,     // Skala desimal derajat
    trunkAngleMax:  view.getInt16(10, true) / 10,    // Skala desimal derajat
    deviationScore: view.getInt16(12, true) / 100,
    classification: classificationMap[classIndex] || "normal",
    confidence:     view.getUint8(15),
    timestampMs:    view.getUint32(16, true),
  };
}