import { useState, useEffect } from "react";
import type { Showing, Seat } from "../../../Interfaces/type.ts";
import { useSeats } from "./context/SeatsContext";
import { sockets } from "./context/sockets.tsx";

interface Props {
  selectShowing: Showing | null;
}

export default function TheaterView({ selectShowing}: Props) {
  const { totalTickets } = useSeats();
  const [selectedSeat, setSelectedSeat] = useState<Set<string>>(new Set());
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [pendingSeats, setPendingSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);

  // fetch auditorium seats
  useEffect(() => {
    if (!selectShowing || !selectShowing.auditorium?._id) return;
    
    // Reset current seat state when switching screenings
    setSelectedSeat(new Set());
    setBookedSeats(selectShowing.bookedSeats || []);
    setPendingSeats(selectShowing.pendingSeats || []);

    // Fetch seat layout
    const fetchSeats = async () => {
      try {
        const res = await fetch(`/api/auditoriums/${selectShowing.auditorium._id}/seats`, {
          method: "GET",
          headers: {"Content-Type": "application/json"}
        });
        const data = await res.json();
        setSeats(data);
      } catch (err) {
        console.error("Failed to load seats:", err);
      }};
    fetchSeats();
    
    // --- SOCKET SETUP ---
    sockets.emit("joinScreening", selectShowing._id);

    // Listen for live updates from other users
    const handleSeatUpdate = (data: { bookedSeats?: string[]; pendingSeats?: string[] }) => {
      console.log("Incoming seat update:", data); 
      if (data.bookedSeats) setBookedSeats(data.bookedSeats);
      if (data.pendingSeats) setPendingSeats(data.pendingSeats);
    };
    
    sockets.on("seatUpdate", handleSeatUpdate);
    return () => {
      sockets.emit("leaveScreening", selectShowing._id); 
      sockets.off("seatUpdate", handleSeatUpdate);
    };}, [selectShowing?._id, selectShowing?.auditorium?._id]);
  
  if (!selectShowing) return <p>Laddar föreställning...</p>;
  if (!seats.length) return <p>Laddar platser...</p>;

  // Group seats in rows
  const rows = seats.reduce((acc: Seat[][], seat) => {
    if (!acc[seat.rowNumber]) acc[seat.rowNumber] = [];
    acc[seat.rowNumber].push(seat);
    return acc;
  }, []);
  
  // toggle
  const toggleSeat = (row: number, seatNumber: number) => {
    if (!selectShowing) return;
    const seat = seats.find(s => s.rowNumber === row && s.seatNumber === seatNumber);
    if (!seat) return;
    const seatId = seat._id;

    // Prevent interaction with booked or pending
    if (bookedSeats.includes(seatId) || pendingSeats.includes(seatId)) return;

    setSelectedSeat(prev => {
      const newSet = new Set(prev);
      if (newSet.has(seatId)) {
        newSet.delete(seatId);
        sockets.emit("seatUnselect", { screeningId: selectShowing._id, seatId });
      } else {
        if (newSet.size >= totalTickets) return prev;
        newSet.add(seatId);
        sockets.emit("seatSelect", { screeningId: selectShowing._id, seatId });
      }
    return newSet;
    });
  };
  
  return (
    <section className="flex flex-col items-center w-11/12 glass_effect mt-5 mb-5
    lg:w-11/12 lg:h-100 lg:flex lg:justify-center lg:items-center">
      <article className="flex flex-col items-center w-11/12 
      md:w-8/12 
      lg:w-6/12">
        <h2 className="p-3">{selectShowing.movie.title}</h2>
        <p>{selectShowing.auditorium.name}</p>
        <p>Tid: {selectShowing.time}</p>

        {/* Seat grid */}
        <div className="mt-4">
          {rows.map((rowSeats, rowI) => (
            <div key={rowI} className="flex mb-1 justify-center">
              {rowSeats.map((seat) => {
                const seatKey = seat._id; // use MongoDB seat ID
                const isBooked = bookedSeats.includes(seatKey);
                const isPending = pendingSeats.includes(seatKey);
                const isSelected = selectedSeat.has(seatKey);
                const isAccessible = seat.accessible;

                let color = "#243365";
                if (isBooked) color = "#d9534f"; 
                else if (isSelected) color = "#5cb85c"; 
                else if (isPending) color = "#f0ad4e"; 
                else if (isAccessible) color = "#dede39"; 

                return (
                  <button
                    key={seat._id}
                    onClick={() => toggleSeat(seat.rowNumber, seat.seatNumber)}
                    style={{
                      width: 26,
                      height: 26,
                      marginRight: 3,
                      borderRadius: 4,
                      backgroundColor: color,
                      border: "1px solid white",
                      cursor: isBooked ? "not-allowed" : "pointer",
                    }}
                    title={`Rad ${seat.rowNumber + 1}, Stol ${seat.seatNumber + 1} ${
                      isAccessible ? "(Tillgänglighetsanpassad)" : ""
                    } ${isBooked ? "(Upptagen)" : isPending ? "(Håller på att bli bokat)" : ""}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Seat summary */}
        <div className="mt-3 text-center">
          <strong>Valda stolar:</strong>{" "}
          {Array.from(selectedSeat)
          .map((seatId) => {
            const seat = seats.find((s) => s._id === seatId);
            if (!seat) return null;
            return `Rad ${seat.rowNumber + 1}, Stol ${seat.seatNumber + 1}`;
          })
          .filter(Boolean)
          .join(", ") || "Inga"}
        </div>

        <p className="mt-3">
          Antal platser valda: {selectedSeat.size} / {totalTickets}
        </p>
      </article>
    </section>
  );
}