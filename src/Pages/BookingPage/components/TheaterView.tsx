import { useState, useEffect, useMemo } from "react";
import type { Showing, Seat } from "../../../Interfaces/type.ts";
import { useSeats } from "./context/SeatsContext";
import { useCheckout } from "./context/CheckoutContext";
import { sockets } from "./context/sockets.tsx";

interface Props {
  selectShowing: Showing | null;
}

export default function TheaterView({ selectShowing }: Props) {
  // === Contexts ===
  // Seat selection info (how many tickets user has selected)
  const { totalTickets } = useSeats();

  // Checkout context controls: seat selection, screening id, etc.
  const {
    setScreeningId,
    selectedSeats,
    toggleSeat: toggleCheckoutSeat,
    setAvailableSeats,
  } = useCheckout();

  // === Local State ===
  const [bookedSeats, setBookedSeats] = useState<string[]>([]); // Seats that are already booked
  const [pendingSeats, setPendingSeats] = useState<{ seatId: string; owner: string }[]>([]); // Seats that are selected but not confirmed (temporary)
  const [socketId, setSocketId] = useState(""); // The current user's socket connection id
  const [seats, setSeats] = useState<Seat[]>([]); // The entire seat layout of the auditorium

  // === Capture Socket Connection ===
  // When the socket connects, we save its unique ID.
  useEffect(() => {
    const handleConnect = () => {
      console.log("✅ Socket connected:", sockets.id);
      setSocketId(sockets.id ?? "");
    };

    sockets.on("connect", handleConnect);

    // Cleanup listener when component unmounts
    return () => {
      sockets.off("connect", handleConnect);
    };
  }, []);

  // === Load Showing + Sync Socket Events ===
  useEffect(() => {
    if (!selectShowing || !selectShowing.auditorium?._id) return;

    // Register which showing (screening) we’re dealing with in the Checkout context
    setScreeningId(selectShowing._id);

    // Load seats already booked for this showing
    setBookedSeats(selectShowing.bookedSeats || []);

    // Normalize any pending seat data to the expected structure
    const normalizedPending = (selectShowing.pendingSeats ?? []).map((p: any) =>
      typeof p === "string" ? { seatId: p, owner: "" } : p
    );
    setPendingSeats(normalizedPending);

    // === Fetch all seat data (layout of auditorium) ===
    const fetchSeats = async () => {
      try {
        const res = await fetch(`/api/auditoriums/${selectShowing.auditorium._id}/seats`);
        const data: Seat[] = await res.json();
        setSeats(data);
        setAvailableSeats(data);
      } catch (err) {
        console.error("❌ Failed to load seats:", err);
      }
    };
    fetchSeats();

    // === Join socket "room" for this screening ===
    sockets.emit("joinScreening", selectShowing._id);

    // Listen for any seat updates (real-time from other users)
    const handleSeatUpdate = (data: {
      bookedSeats?: string[];
      pendingSeats?: { seatId: string; owner: string }[];
    }) => {
      if (data.bookedSeats) setBookedSeats(data.bookedSeats);
      if (data.pendingSeats) setPendingSeats(data.pendingSeats);
    };

    sockets.on("seatUpdate", handleSeatUpdate);

    // Cleanup on unmount or when switching to another showing
    return () => {
      sockets.emit("leaveScreening", selectShowing._id);
      sockets.off("seatUpdate", handleSeatUpdate);
    };
  }, [selectShowing?._id, selectShowing?.auditorium?._id, setAvailableSeats, setScreeningId]);

  // === Group Seats by Row ===
  // useMemo ensures this only recalculates when `seats` changes.
  const rows = useMemo(() => {
    return seats.reduce((acc: Seat[][], s) => {
      if (!acc[s.rowNumber]) acc[s.rowNumber] = [];
      acc[s.rowNumber].push(s);
      return acc;
    }, []);
  }, [seats]);

  // === Readable list of selected seats ===
  const selectedSeatsDisplay = useMemo(() => {
    if (!selectedSeats || !selectedSeats.length) return "Inga"; // ("None" in Swedish)
    const mapped = selectedSeats
      .map((id) => {
        const seat = seats.find((s) => s._id === id);
        if (!seat) return null;
        return `Rad ${seat.rowNumber + 1}, Stol ${seat.seatNumber + 1}`;
      })
      .filter(Boolean);
    return mapped.length ? mapped.join(" — ") : "Inga";
  }, [selectedSeats, seats]);

  // === Prevent rendering early while data is loading ===
  if (!selectShowing) return <p>Laddar visning...</p>; // "Loading showing..."
  if (!seats.length) return <p>Laddar platser...</p>;  // "Loading seats..."

  // === Seat Selection Handler ===
  const handleToggle = (seatId: string) => {
    if (!selectShowing) return;
    const seat = seats.find((s) => s._id === seatId);
    if (!seat) return;

    const isBooked = bookedSeats.includes(seatId);
    const pendingOwner = pendingSeats.find((p) => p.seatId === seatId)?.owner;
    const isPendingByOther = !!pendingOwner && pendingOwner !== socketId && pendingOwner !== sockets.id;

    // Don’t allow selecting already booked or someone else's pending seats
    if (isBooked || isPendingByOther) return;

    const isCurrentlySelected = selectedSeats.includes(seatId);

    // Don’t exceed number of tickets user purchased
    if (!isCurrentlySelected && selectedSeats.length >= totalTickets) return;

    // Toggle locally
    toggleCheckoutSeat(seatId);

    // Emit event to server for other users
    if (isCurrentlySelected) {
      sockets.emit("seatUnselect", { screeningId: selectShowing._id, seatId });
    } else {
      sockets.emit("seatSelect", { screeningId: selectShowing._id, seatId });
    }
  };

  return (
    <section className="w-full flex justify-center items-center">
      <article className="flex flex-col items-center w-full">
        {/* Movie & showing info */}
        <p>{selectShowing.auditorium.name}</p>
        <p>Tid: {selectShowing.time.slice(0, 5)}</p>

        {/* Cinema frame" visuell appeal */}
        <span
          className="inline-flex flex-none shrink-0 grow-0 w-[280px] h-[40px]
          bg-gradient-to-b from-sky-100 to-sky-900 rounded-sm mt-8 mb-8
          justify-center items-center text-zinc-200 font-semibold text-2xl
          sm:scale-105 xl:scale-115"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)" }}
        >
          <p className="text-black opacity-90 text-base italic">{selectShowing.movie.title}</p>
        </span>

        {/* Seat Grid */}
        {rows.map((row, rowI) => (
          <div key={rowI} className="flex justify-center mb-1">
            {row.map((seat) => {
              // Determine visual state of each seat
              const isBooked = bookedSeats.includes(seat._id);
              const isSelected = selectedSeats.includes(seat._id);
              const pendingEntry = pendingSeats.find((p) => p.seatId === seat._id);
              const isPendingByOther =
                !!pendingEntry && pendingEntry.owner !== socketId && pendingEntry.owner !== sockets.id;
              const isAccessible = seat.accessible;

              // Color code:
              // red = booked, green = your seat, orange = others pending, yellow = accessible
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
                  title={`Rad ${seat.rowNumber + 1}, Stol ${seat.seatNumber + 1}`}
                />
              );
            })}
          </div>
        ))}

        {/* Seat summary */}
        <div className="mt-4 text-center">
          <strong>Valda stolar:</strong> {selectedSeatsDisplay}
        </div>

        <p className="mt-2">
          Antal platser valda: {selectedSeats.length} / {totalTickets}
        </p>

        <section
          className="flex flex-col justify-center items-start w-full px-4 pt-5  gap-x-4 gap-y-2 
          mb-10
          lg:justify-start"
        >
          <article className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#dede39]" />
            <span className="text-sm sm:text-base">Handikappanpassad</span>
          </article>

          <article className="flex items-center gap-2 pl-0">
            <span className="w-4 h-4 rounded-full bg-[#5cb85c]" />
            <span className="text-sm sm:text-base">Vald stol</span>
          </article>

          <article className="flex items-center gap-2 pl-0">
            <span className="w-4 h-4 rounded-full bg-[#f0ad4e]" />
            <span className="text-sm sm:text-base">Bokas av annan</span>
          </article>

          <article className="flex items-center gap-2 pl-0">
            <span className="w-4 h-4 rounded-full bg-[#d9534f]" />
            <span className="text-sm sm:text-base">Upptagen</span>
          </article>
        </section>
      </article>
    </section>
  );
}
