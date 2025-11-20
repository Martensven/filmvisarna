import { createContext, useContext } from "react";
import { useAmountSeats } from "./useAmountSeats";

const SeatsContext = createContext<ReturnType<typeof useAmountSeats> | null>(null);

export function SeatsProvider({ children, movieAge, }: { children: React.ReactNode; movieAge?: number | null; }) {
  const seats = useAmountSeats(movieAge);
  return <SeatsContext.Provider value={seats}>{children}</SeatsContext.Provider>;
}

export function useSeats() {
  const context = useContext(SeatsContext);
  if (!context) {
    throw new Error("useSeats must be used within a SeatsProvider");
  }
  return context;
}
