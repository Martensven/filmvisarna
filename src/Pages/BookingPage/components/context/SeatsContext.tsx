import { createContext, useContext } from "react";
import { useAmountSeats } from "../hooks/useAmountSeats"; // justera sökvägen

const SeatsContext = createContext<ReturnType<typeof useAmountSeats> | null>(null);

export function SeatsProvider({ children }: { children: React.ReactNode }) {
    const seats = useAmountSeats();
    return <SeatsContext.Provider value={seats}>{children}</SeatsContext.Provider>;
}

export function useSeats() {
    const context = useContext(SeatsContext);
    if (!context) {
        throw new Error("useSeats must be used within a SeatsProvider");
    }
    return context;
}
