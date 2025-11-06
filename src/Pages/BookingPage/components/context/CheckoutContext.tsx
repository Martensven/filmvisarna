import { createContext, useContext, useState } from "react";
import type { Seat } from "../../../../Interfaces/type";

interface CheckoutContextType {
    screeningId: string | null;
    setScreeningId: (id: string | null) => void;
    selectedSeats: string[];
    toggleSeat: (seatId: string) => void;
    availableSeats: Seat[];
    setAvailableSeats: (seats: Seat[]) => void;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
    const [screeningId, setScreeningId] = useState<string | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [availableSeats, setAvailableSeats] = useState<Seat[]>([]);

    const toggleSeat = (seatId: string) => {
        setSelectedSeats((prev) =>
            prev.includes(seatId)
                ? prev.filter((id) => id !== seatId)
                : [...prev, seatId]
        );
    };

    return (
        <CheckoutContext.Provider
            value={{
                screeningId,
                setScreeningId,
                selectedSeats,
                toggleSeat,
                availableSeats,
                setAvailableSeats,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckout() {
    const context = useContext(CheckoutContext);
    if (!context) {
        throw new Error("useCheckout måste användas inom en CheckoutProvider");
    }
    return context;
}
