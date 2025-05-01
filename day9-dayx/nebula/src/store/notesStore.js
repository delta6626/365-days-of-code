import { create } from "zustand";

export const useNotesStore = create(function (set) {
  return {
    notes: null,
    setNotes: function (notesObject) {
      set({ notes: notesObject });
    },
  };
});
