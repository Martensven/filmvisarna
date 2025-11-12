import { useEffect, useState } from "react";

interface TicketType {
    _id: string;
    ticketName: string;
    price: number;
}

export function useAmountSeats() {
    const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
    const [counts, setCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        const fetchTicketTypes = async () => {
            try {
                const res = await fetch("/api/ticket-types");
                const data = await res.json();
                setTicketTypes(data);
                const initialCounts = data.reduce(
                    (acc: Record<string, number>, type: TicketType) => {
                        acc[type._id] = 0;
                        return acc;
                    },
                    {}
                );
                setCounts(initialCounts);
            } catch (err) {
                console.error("Kunde inte hämta biljett-typer:", err);
            }
        };
        fetchTicketTypes();
    }, []);

    const setCount = (id: string, value: number) =>
        setCounts((prev) => ({ ...prev, [id]: value }));

    const totalTickets = Object.values(counts).reduce((a, b) => a + b, 0);
    const totalPrice = ticketTypes.reduce(
        (sum, t) => sum + (counts[t._id] || 0) * t.price,
        0
    );

    return {
        ticketTypes,
        counts,
        setCount,
        totalTickets,
        totalPrice,
    };
}
