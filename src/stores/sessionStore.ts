import { create } from 'zustand';

interface SessionState {
  sessionId: string | null;
  exercise: string;
  startedAt: number | null;
  sets: any[];
  startSession: (exerciseName: string) => void;
  addSetData: (setData: any) => void;
  resetSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  exercise: 'Squat',
  startedAt: null,
  sets: [],
  startSession: (exerciseName) => set({
    sessionId: Date.now().toString(),
    exercise: exerciseName,
    startedAt: Date.now(),
    sets: [],
  }),
  addSetData: (setData) => set((state) => ({
    sets: [...state.sets, setData]
  })),
  resetSession: () => set({
    sessionId: null,
    startedAt: null,
    sets: []
  }),
}));