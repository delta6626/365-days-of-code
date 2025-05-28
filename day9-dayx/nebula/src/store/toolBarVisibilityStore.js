import { create } from "zustand";

export const useToolBarVisibilityStore = create(function (set) {
  return {
    toolBarVisible: false,
    setToolBarVisible: function (newVisibilityStatus) {
      set({ toolBarVisible: newVisibilityStatus });
    },
  };
});
