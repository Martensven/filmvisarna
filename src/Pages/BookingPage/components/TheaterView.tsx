import { useState, useEffect } from "react";
import type { Showing, Seat } from "../../../Interfaces/type.ts";
import { useSeats } from "./context/SeatsContext";
import { sockets } from "./context/sockets.tsx";

interface Props {
  selectShowing: Showing | null;
}

export default function TheaterView({ selectShowing }: Props) {
  const { totalTickets } = useSeats();
  const [selectedSeat, setSelectedSeat] = useState<Set<string>>(new Set());
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [pendingSeats, setPendingSeats] = useState<
    { seatId: string; owner: string }[]
  >([]);
  const [socketId, setSocketId] = useState<string>("");
  const [seats, setSeats] = useState<Seat[]>([]);

  // Capture unique socket ID when connecting
  useEffect(() => {
    const handleConnect = () => {
      console.log("✅ Connected to socket:", sockets.id);
      setSocketId(sockets.id ?? "");
    };

    sockets.on("connect", handleConnect);

    return () => {
      sockets.off("connect", handleConnect);
    };
  }, []);

  // Fetch seats & handle socket events
  useEffect(() => {
    if (!selectShowing || !selectShowing.auditorium?._id) return;

    // Reset state when switching screenings
    setSelectedSeat(new Set());
    setBookedSeats(selectShowing.bookedSeats || []);
    setPendingSeats(
      (selectShowing.pendingSeats || []).map((seatId: string) => ({
        seatId,
        owner: "",
      }))
    );

    // Fetch seat layout
    const fetchSeats = async () => {
      try {
        const res = await fetch(
          `/api/auditoriums/${selectShowing.auditorium._id}/seats`
        );
        const data = await res.json();
        setSeats(data);
      } catch (err) {
        console.error("Failed to load seats:", err);
      }
    };
    fetchSeats();

    // --- SOCKET SETUP ---
    sockets.emit("joinScreening", selectShowing._id);

    const handleSeatUpdate = (data: {
      bookedSeats?: string[];
      pendingSeats?: { seatId: string; owner: string }[];
    }) => {
      console.log("Incoming seat update:", data);
      if (data.bookedSeats) setBookedSeats(data.bookedSeats);
      if (data.pendingSeats) setPendingSeats(data.pendingSeats);
    };

    sockets.on("seatUpdate", handleSeatUpdate);

    return () => {
      sockets.emit("leaveScreening", selectShowing._id);
      sockets.off("seatUpdate", handleSeatUpdate);
    };
  }, [selectShowing?._id, selectShowing?.auditorium?._id]);

  if (!selectShowing) return <p>Laddar föreställning...</p>;
  if (!seats.length) return <p>Laddar platser...</p>;

  // Group seats by rows
  const rows = seats.reduce((acc: Seat[][], seat) => {
    if (!acc[seat.rowNumber]) acc[seat.rowNumber] = [];
    acc[seat.rowNumber].push(seat);
    return acc;
  }, []);

  // Toggle seat selection
  const toggleSeat = (row: number, seatNumber: number) => {
    if (!selectShowing) return;
    const seat = seats.find(
      (s) => s.rowNumber === row && s.seatNumber === seatNumber
    );
    if (!seat) return;
    const seatId = seat._id;

    // Find if seat is pending & who owns it
    const pendingOwner = pendingSeats.find((p) => p.seatId === seatId)?.owner;

    // Prevent clicking booked or others' pending seats
    if (
      bookedSeats.includes(seatId) ||
      (pendingOwner && pendingOwner !== socketId && pendingOwner !== sockets.id)
    )
      return;

    // Handle selection of seats
    setSelectedSeat((prev) => {
      const newSet = new Set(prev);
      const isSelected = newSet.has(seatId);

      if (isSelected) {
        newSet.delete(seatId);
        sockets.emit("seatUnselect", {
          screeningId: selectShowing._id,
          seatId,
        });
      } else {
        if (newSet.size >= totalTickets) return prev;
        newSet.add(seatId);
        sockets.emit("seatSelect", { screeningId: selectShowing._id, seatId });
      }

      return newSet;
    });
  };

  return (
    <section className="w-full flex justify-center items-center">
      <article
        className="flex flex-col items-center w-full 
      md:w-full 
      lg:w-11/12 lg:h-180"
      >
        <h2
          className="p-3
        lg:text-lg "
        >
          
        </h2>
        <p>{selectShowing.auditorium.name}</p>
        <p>Tid: {selectShowing.time.slice(0,5)}</p>

        {/* Cinema frame" visuell appeal */}

        <span
          className="w-full h-20 bg-gradient-to-b from-sky-100 to-sky-900 h-2 rounded-sm mt-8 
            flex justify-center items-center text-zinc-200 font-semibold text-2xl
            md:w-full
            lg:w-9/12 lg:h-3 lg:mt-15 lg:mb-10 lg:shadow-lg lg:shadow-sky-200"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)" }}
        >
          <p className="text-black opacity-90 text-base italic">{selectShowing.movie.title}</p>
        </span>
        <div className="mx-auto w-9/11 h-2 shadow-lg shadow-white mb-10 bg-sky-900 blur"></div>

        {/* Seat grid */}
        <div className="mt-2
        md:scale-110">
          {rows.map((rowSeats, rowI) => (
            <div key={rowI} className="flex mb-1 justify-center w-full">
              {rowSeats.map((seat) => {
                const seatKey = seat._id;
                const isBooked = bookedSeats.includes(seatKey);
                const pendingSeat = pendingSeats.find(
                  (p) => p.seatId === seatKey
                );
                const isPending = !!pendingSeat;
                const isMine = pendingSeat?.owner === socketId;
                const isSelected = selectedSeat.has(seatKey);
                const isAccessible = seat.accessible;

                let color = "#343d5eff";
                if (isBooked) color = "#d9534f";
                else if (isSelected) color = "#5cb85c";
                else if (isPending && !isMine) color = "#f0ad4e";
                else if (isAccessible) color = "#dede39";

                return (
                  <button
                    key={seat._id}
                    onClick={() => toggleSeat(seat.rowNumber, seat.seatNumber)}
                    style={{
                      width: 22,
                      height: 22,
                      marginRight: 3,
                      borderRadius: 4,
                      backgroundColor: color,
                      border: "1px solid transparent",
                      borderImageSource:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0.74), rgba(175, 175, 175, 0.81))",
                      borderImageSlice: 1,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      cursor: isBooked ? "not-allowed" : "pointer",
                    }}
                    title={`Rad ${seat.rowNumber + 1}, Stol ${
                      seat.seatNumber + 1
                    } ${isAccessible ? "(Tillgänglighetsanpassad)" : ""} ${
                      isBooked
                        ? "(Upptagen)"
                        : isPending
                        ? isMine
                          ? "(Din valda stol)"
                          : "(Håller på att bli bokad)"
                        : ""
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Seat summary */}
        <div
          className="mt-3 text-center
        lg:mt-10"
        >
          <strong>Valda stolar:</strong>{" "}
          {Array.from(selectedSeat)
            .map((seatId) => {
              const seat = seats.find((s) => s._id === seatId);
              if (!seat) return null;
              return `Rad ${seat.rowNumber + 1} Stol ${seat.seatNumber + 1}`;
            })
            .filter(Boolean)
            .join(", ") || "Inga"}
        </div>

        <p className="mt-3 mb-3">
          Antal platser valda: {selectedSeat.size} / {totalTickets}
        </p>
      </article>
    </section>
  );
}
