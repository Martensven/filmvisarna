import { useState, useEffect } from "react";
import { useSeats } from "./context/SeatsContext";
import type { Theater, Seat } from "../../../Interfaces/type.ts"; // Theater interface
import { sockets } from "./context/sockets.tsx"; // Socket.IO connection

interface TheaterViewProps {
  theaterView: Theater;
  selectShowing: string | null;
}

interface Auditorium {
  _id: string;
  name: string;
}

interface Movie {
  _id: string;
  title: string;
  imageSrc: string;
}

export interface Showing {
  _id: string;
  auditorium: Auditorium;
  bookedSeats: string[];
  date: string;
  movie: Movie;
  scheduleType: "smallTheater" | "bigTheater";
  showTime: string;
  time: string;
}

export default function TheaterView({ theaterView, selectShowing }: TheaterViewProps) {
  const [selectedSeat, setSelectedSeat] = useState<Set<string>>(new Set());
  const [liveBookedSeats, setLiveBookedSeats] = useState<Set<string>>(new Set());
  const { totalTickets } = useSeats();

  // Fetch initial showing data (including booked seats)
  const fetchShowing = async () => {
    if (!selectShowing) return;
    try {
      const response = await fetch(`/api/screenings/movie/${selectShowing}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data: Showing = await response.json();
      setLiveBookedSeats(new Set(data.bookedSeats));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchShowing();
  }, [selectShowing]);

  // Socket.IO live updates
  useEffect(() => {
    if (!selectShowing) return;

    // Join a room for this showing
    sockets.emit("joinShowingRoom", selectShowing);

    // Listen for live seat updates
    sockets.on("seatBooked", (seatKey: string) => {
      setLiveBookedSeats((prev) => new Set(prev).add(seatKey));
    });

    sockets.on("seatReleased", (seatKey: string) => {
      setLiveBookedSeats((prev) => {
        const newSet = new Set(prev);
        newSet.delete(seatKey);
        return newSet;
      });
    });

    // Clean up on unmount
    return () => {
      sockets.off("seatBooked");
      sockets.off("seatReleased");
    };
  }, [selectShowing]);

  // Toggle seat selection locally
  const toggle = (rowNumber: number, seatNumber: number) => {
    const key = `${rowNumber}-${seatNumber}`;

    // Do nothing if the seat is already booked by someone else
    if (liveBookedSeats.has(key)) return;

    setSelectedSeat((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
        // notify server that user released seat
        sockets.emit("releaseSeat", { showingId: selectShowing, seatKey: key });
      } else {
        if (newSet.size >= totalTickets) return prev;
        newSet.add(key);
        // notify server that user selected seat
        sockets.emit("bookSeat", { showingId: selectShowing, seatKey: key });
      }
      return newSet;
    });
  };

  // Group seats by row
  const rows = theaterView.seats.reduce((acc: Seat[][], seat) => {
    if (!acc[seat.rowNumber]) acc[seat.rowNumber] = [];
    acc[seat.rowNumber].push(seat);
    return acc;
  }, []);

  // ---------------- Render ----------------
  return (
    <section className="flex flex-col w-full h-auto justify-center items-center mt-5 mb-5 container_box
                        sm:w-full sm:h-auto 
                        md:flex md:justify-center items-center md:w-11/12 md:mt-0 
                        lg:w-full">
      <article className="flex flex-col justify-center w-11/12 h-auto m-3 container_content
                          md:w-11/12 md:h-auto 
                          lg:w-8/12 lg:h-auto lg:mt-20 lg:mb-10 lg:p-5 lg:scale-125">
        <h2 className="p-3">{theaterView.name}</h2>

        {/* Seats Grid */}
        <div>
          {rows.map((rowSeats, rowI) => (
            <div key={rowI} className="flex mb-1">
              {rowSeats.map((seat) => {
                const key = `${seat.rowNumber}-${seat.seatNumber}`;
                const selected = selectedSeat.has(key);
                const booked = liveBookedSeats.has(key);
                const isAccessible = seat.accessible;

                return (
                  <button
                    key={seat._id}
                    onClick={() => toggle(seat.rowNumber, seat.seatNumber)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      backgroundColor: booked
                        ? "#d9534f" // red = booked by others
                        : selected
                        ? "green"
                        : isAccessible
                        ? "#dede39"
                        : "#243365",
                      border: "1px solid white",
                      cursor: booked ? "not-allowed" : "pointer",
                      marginRight: 2,
                    }}
                    title={`Rad ${seat.rowNumber + 1}, stol ${seat.seatNumber + 1} ${
                      isAccessible ? "(Funktionshinderanpassade)" : ""
                    } ${booked ? "(Upptagen)" : ""}`}
                    disabled={booked}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Selected Seats */}
        <span>
          <strong>Valda Stolar:</strong>{" "}
          {Array.from(selectedSeat)
            .map((key) => {
              const [row, seat] = key.split("-").map(Number);
              return `Rad ${row + 1}, Stol ${seat + 1}`;
            })
            .join(", ")}
        </span>
      </article>

      {/* Choose Seats Button */}
      <section className="flex flex-row justify-end">
        <button className="main_buttons w-20 h-8 m-5 text-sm">Välj</button>
      </section>

      <p className="mb-2">
        Antal platser valda: {selectedSeat.size} / {totalTickets}
      </p>
    </section>
  );
}