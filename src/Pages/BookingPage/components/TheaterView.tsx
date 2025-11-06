import { useState, useEffect, useMemo } from "react";
import type { Showing, Seat } from "../../../Interfaces/type.ts";
import { useSeats } from "./context/SeatsContext";
import { useCheckout } from "./context/CheckoutContext";
import { sockets } from "./context/sockets.tsx";

interface Props {
  selectShowing: Showing | null;
}

export default function TheaterView({ selectShowing }: Props) {
  const { totalTickets } = useSeats();
  const {
    setScreeningId,
    selectedSeats,
    toggleSeat: toggleCheckoutSeat,
    setAvailableSeats,
  } = useCheckout();

  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [pendingSeats, setPendingSeats] = useState<{ seatId: string; owner: string }[]>([]);
  const [socketId, setSocketId] = useState("");
  const [seats, setSeats] = useState<Seat[]>([]);

  // 1. Hooks (always run, regardless of state)
 useEffect(() => {
  const handleConnect = () => {
    console.log("Socket connected:", sockets.id);
    setSocketId(sockets.id ?? "");
  };

  sockets.on("connect", handleConnect);

  // ✅ Proper cleanup returning void
  return () => {
    sockets.off("connect", handleConnect);
  };
}, []);


  useEffect(() => {
    if (!selectShowing || !selectShowing.auditorium?._id) return;

    setScreeningId(selectShowing._id);
    setBookedSeats(selectShowing.bookedSeats || []);

    // Normalize pending seats
    const normalizedPending = (selectShowing.pendingSeats ?? []).map((p: any) =>
      typeof p === "string" ? { seatId: p, owner: "" } : p
    );
    setPendingSeats(normalizedPending);

    const fetchSeats = async () => {
      try {
        const res = await fetch(`/api/auditoriums/${selectShowing.auditorium._id}/seats`);
        const data: Seat[] = await res.json();
        setSeats(data);
        setAvailableSeats(data);
      } catch (err) {
        console.error("Failed to load seats:", err);
      }
    };
    fetchSeats();

    sockets.emit("joinScreening", selectShowing._id);

    const handleSeatUpdate = (data: {
      bookedSeats?: string[];
      pendingSeats?: { seatId: string; owner: string }[];
    }) => {
      if (data.bookedSeats) setBookedSeats(data.bookedSeats);
      if (data.pendingSeats) setPendingSeats(data.pendingSeats);
    };

    sockets.on("seatUpdate", handleSeatUpdate);

    return () => {
      sockets.emit("leaveScreening", selectShowing._id);
      sockets.off("seatUpdate", handleSeatUpdate);
    };
  }, [selectShowing?._id, selectShowing?.auditorium?._id, setAvailableSeats, setScreeningId]);

  // 2. Derived values (computed hooks BEFORE conditionals)
  const rows = useMemo(() => {
    return seats.reduce((acc: Seat[][], s) => {
      if (!acc[s.rowNumber]) acc[s.rowNumber] = [];
      acc[s.rowNumber].push(s);
      return acc;
    }, []);
  }, [seats]);

  const selectedSeatsDisplay = useMemo(() => {
    if (!selectedSeats || !selectedSeats.length) return "Inga";
    const mapped = selectedSeats
      .map((id) => {
        const seat = seats.find((s) => s._id === id);
        if (!seat) return null;
        return `Rad ${seat.rowNumber + 1}, Stol ${seat.seatNumber + 1}`;
      })
      .filter(Boolean);
    return mapped.length ? mapped.join(" — ") : "Inga";
  }, [selectedSeats, seats]);

  // 3. Conditionals AFTER all hooks
  if (!selectShowing) return <p>Laddar visning...</p>;
  if (!seats.length) return <p>Laddar platser...</p>;

  // 4. Handlers
  const handleToggle = (seatId: string) => {
    if (!selectShowing) return;
    const seat = seats.find((s) => s._id === seatId);
    if (!seat) return;

    const isBooked = bookedSeats.includes(seatId);
    const pendingOwner = pendingSeats.find((p) => p.seatId === seatId)?.owner;
    const isPendingByOther = !!pendingOwner && pendingOwner !== socketId && pendingOwner !== sockets.id;

    if (isBooked || isPendingByOther) return;

    const isCurrentlySelected = selectedSeats.includes(seatId);
    if (!isCurrentlySelected && selectedSeats.length >= totalTickets) return;

    toggleCheckoutSeat(seatId);

    if (isCurrentlySelected) {
      sockets.emit("seatUnselect", { screeningId: selectShowing._id, seatId });
    } else {
      sockets.emit("seatSelect", { screeningId: selectShowing._id, seatId });
    }
  };

  // 5. Render
  return (
    <section className="w-full flex justify-center items-center">
      <article className="flex flex-col items-center w-full">
        <h3 className="mb-2">{selectShowing.movie.title}</h3>
        <p className="mb-2">
          {selectShowing.auditorium.name} — {selectShowing.time}
        </p>

        {rows.map((row, rowI) => (
          <div key={rowI} className="flex justify-center mb-1">
            {row.map((seat) => {
              const isBooked = bookedSeats.includes(seat._id);
              const isSelected = selectedSeats.includes(seat._id);
              const pendingEntry = pendingSeats.find((p) => p.seatId === seat._id);
              const isPendingByOther = !!pendingEntry && pendingEntry.owner !== socketId && pendingEntry.owner !== sockets.id;
              const isAccessible = seat.accessible;

              let color = "#343d5eff";
              if (isBooked) color = "#d9534f";
              else if (isSelected) color = "#5cb85c";
              else if (isPendingByOther) color = "#f0ad4e";
              else if (isAccessible) color = "#dede39";

              return (
                <button
                  key={seat._id}
                  onClick={() => handleToggle(seat._id)}
                  style={{
                    width: 22,
                    height: 22,
                    margin: 2,
                    borderRadius: 4,
                    backgroundColor: color,
                    cursor: isBooked || isPendingByOther ? "not-allowed" : "pointer",
                  }}
                />
              );
            })}
          </div>
        ))}

        <div className="mt-4 text-center">
          <strong>Valda stolar:</strong> {selectedSeatsDisplay}
        </div>

        <p className="mt-2">
          Antal platser valda: {selectedSeats.length} / {totalTickets}
        </p>
      </article>
    </section>
  );
}
