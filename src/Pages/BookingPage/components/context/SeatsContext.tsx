import { createContext, useContext, useState, useEffect } from "react";
import { useAmountSeats } from "../hooks/useAmountSeats";

type Seat = { _id: string; seatNumber: number };
type Screening = { _id: string; date: string; time: string; movie: any };
type TicketSelection = { _id: string; ticketName: string; quantity: number; price: number };

interface SeatsContextType {
  // Ticket counts
  countAdult: number;
  countSenior: number;
  countChild: number;
  setCountAdult: (n: number) => void;
  setCountSenior: (n: number) => void;
  setCountChild: (n: number) => void;
  totalTickets: number;
  totalPrice: number;
  adultPrice: number;
  seniorPrice: number;
  childPrice: number;

  // Fields for checkout
  selectedSeats: Seat[];
  setSelectedSeats: (seats: Seat[]) => void;
  selectedScreening: Screening | null;
  setSelectedScreening: (s: Screening) => void;
  selectedTickets: TicketSelection[];
  setSelectedTickets: (tickets: TicketSelection[]) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
}

export const SeatsContext = createContext<SeatsContextType | null>(null);

export function SeatsProvider({ children }: { children: React.ReactNode }) {
  const ticketData = useAmountSeats();

  // Booking states
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<TicketSelection[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (!res.ok) throw new Error("Not logged in");
        const data = await res.json();
        setUserId(data.userId);
        console.log("Logged in user:", data.email);
      } catch (err) {
        console.log("No active session");
        setUserId(null);
      }
    };

    checkLogin();
  }, []);

  const value: SeatsContextType = {
    ...ticketData,
    selectedSeats,
    setSelectedSeats,
    selectedScreening,
    setSelectedScreening,
    selectedTickets,
    setSelectedTickets,
    userId,
    setUserId,
  };

  return <SeatsContext.Provider value={value}>{children}</SeatsContext.Provider>;
}

export function useSeats() {
  const context = useContext(SeatsContext);
  if (!context) throw new Error("useSeats must be used within a SeatsProvider");
  return context;
}
