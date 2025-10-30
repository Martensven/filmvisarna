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
    
    setSelectedSeat(new Set());
    setBookedSeats(selectShowing.bookedSeats || []);
    setPendingSeats(selectShowing.pendingSeats || []);

    const fetchSeats = async () => {
      try {
        const res = await fetch(`/api/auditoriums/${selectShowing.auditorium._id}/seats`);
        const data = await res.json();
        setSeats(data);
      } catch (err) {
        console.error("Failed to load seats:", err);
      }
    };

    fetchSeats();

    // Socket.IO setup
    sockets.emit("join_showing", selectShowing._id);

    sockets.on("seat_update", (data: { bookedSeats: string[]; pendingSeats: string[] }) => {
      setBookedSeats(data.bookedSeats);
      setPendingSeats(data.pendingSeats);
    });
    
    return () => {
      sockets.emit("leave_showing", selectShowing._id);
      sockets.off("seat_update");
    };
  }, [selectShowing?._id, selectShowing?.auditorium?._id]);

  
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
    const seatKey = seat._id;
    
    // Prevent interaction with booked or pending
    if (bookedSeats.includes(seatKey) || pendingSeats.includes(seatKey)) return;
    
    setSelectedSeat((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(seatKey)) {
        newSet.delete(seatKey);
        sockets.emit("seat_unselect", { showingId: selectShowing._id, seatKey });
      } else {
        if (newSet.size >= totalTickets) return prev;
        newSet.add(seatKey);
        sockets.emit("seat_select", { showingId: selectShowing._id, seatKey });
      }
      return newSet;
    });
  };
  
  console.log("this is bookedSeats:", bookedSeats);
  console.log("seat._id type:", typeof seats[0]?._id, seats[0]?._id);
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
            <div key={rowI} className="flex mb-1">
              {rowSeats.map((seat) => {
                const seatKey = seat._id; // use MongoDB seat ID
                const isBooked = bookedSeats.includes(seat._id);
                const isPending = pendingSeats.includes(seat._id);
                const isSelected = selectedSeat.has(seatKey);
                const isAccessible = seat.accessible;

                let color = "#243365";
                if (isBooked) color = "#d9534f"; 
                else if (isPending) color = "#f0ad4e"; 
                else if (isSelected) color = "#5cb85c"; 
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
                    } ${isBooked ? "(Upptagen)" : isPending ? "(Väntar...)" : ""}`}
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
            .map((key) => {
              const [r, s] = key.split("-").map(Number);
              return `Rad ${r + 1}, Stol ${s + 1}`;
            })
            .join(", ") || "Inga"}
        </div>

        <p className="mt-3">
          Antal platser valda: {selectedSeat.size} / {totalTickets}
        </p>
      </article>
    </section>
  );
}