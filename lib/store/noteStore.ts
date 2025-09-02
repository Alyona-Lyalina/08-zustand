import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note } from '../../types/note';

type Tag = Note['tag'];

interface DraftState {
  title: string;
  content: string;
  tag: Tag;
}

interface NoteDraftStore {
  draft: DraftState;
  setDraft: (note: Partial<DraftState>) => void;
  clearDraft: () => void;
}

const initialDraft: DraftState = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set((state) => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
    },
  ),
);