// src/ble/mock/MockBleTransport.ts

export const mockRepSummaries = [
  {
    repIndex: 1,
    durationMs: 1200,
    peakVelocity: 0.45, // m/s
    meanVelocity: 0.35,
    trunkAngleMin: 15.5, // derajat
    trunkAngleMax: 45.0,
    deviationScore: 0.05, // sangat efisien
    classification: "normal",
    confidence: 98,
    timestampMs: 10000,
  },
  {
    repIndex: 2,
    durationMs: 1350,
    peakVelocity: 0.42, 
    meanVelocity: 0.32,
    trunkAngleMin: 16.0,
    trunkAngleMax: 47.0,
    deviationScore: 0.15,
    classification: "normal",
    confidence: 95,
    timestampMs: 14000,
  },
  {
    repIndex: 3,
    durationMs: 1600,
    peakVelocity: 0.32, 
    meanVelocity: 0.25,
    trunkAngleMin: 22.0,
    trunkAngleMax: 55.0,
    deviationScore: 0.55, 
    classification: "fatigue", // Mulai terdeteksi kelelahan otot
    confidence: 88,
    timestampMs: 19000,
  },
  {
    repIndex: 4,
    durationMs: 1800,
    peakVelocity: 0.28, 
    meanVelocity: 0.20,
    trunkAngleMin: 28.0,
    trunkAngleMax: 60.0,
    deviationScore: 0.85, 
    classification: "form_change", // Teknik sudah berantakan
    confidence: 92,
    timestampMs: 25000,
  }
];