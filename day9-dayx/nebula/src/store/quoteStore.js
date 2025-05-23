import { create } from "zustand";

export const useQuoteStore = create(function (set) {
  return {
    quote: [],
    setQuote: function (newQuoteArray) {
      set({ quote: newQuoteArray });
    },
  };
});
