import { NoteResponseDto } from "mote-types";
import { create } from "zustand";

interface IEvents {
  selectedNotes: NoteResponseDto[];
  deleteMode: boolean;
  toggleDeleteMode: () => void;
  addToSelectedNotes: (value: NoteResponseDto) => void;
}

export const useNoteStore = create<IEvents>()((set, get) => ({
  selectedNotes: [],
  deleteMode: false,
  toggleDeleteMode: () => {
    const deleteMode = get().deleteMode;

    set((state) => ({
      deleteMode: !state.deleteMode,
    }));
  },
  addToSelectedNotes: (value) => {
    const deleteMode = get().deleteMode;
    const selectedNotes = get().selectedNotes;

    if (deleteMode) {
      const exists = selectedNotes.includes(value);

      if (!exists) {
        set((state) => {
          state.selectedNotes.push(value);

          return {
            selectedNotes: state.selectedNotes,
          };
        });
      } else {
        set((state) => {
          const notes = state.selectedNotes.filter((e) => e.id !== value.id);

          return {
            selectedNotes: notes,
          };
        });
      }
    }
  },
}));
