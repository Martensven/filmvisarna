import { useState, useEffect } from "react";
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
    screeningId,
    setScreeningId,
    selectedSeats,
    toggleSeat: toggleCheckoutSeat,
    setAvailableSeats,
  } = useCheckout();

  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [pendingSeats, setPendingSeats] = useState<{ seatId: string; owner: string }[]>([]);
  const [socketId, setSocketId] = useState("");
  const [seats, setSeats] = useState<Seat[]>([]);

  // Socket connect
  useEffect(() => {
    const handleConnect = () => {
      console.log("✅ Socket connected:", sockets.id);
      setSocketId(sockets.id ?? "");
    };

    sockets.on("connect", handleConnect);

    // ✅ Cleanup-funktion som returnerar void
    return () => {
      sockets.off("connect", handleConnect);
    };
  }, []);

  // Load seats and listen for updates
  useEffect(() => {
    if (!selectShowing || !selectShowing.auditorium?._id) return;

    setScreeningId(selectShowing._id);
    setBookedSeats(selectShowing.bookedSeats || []);
    setPendingSeats((selectShowing.pendingSeats || []).map((id: string) => ({ seatId: id, owner: "" })));

    const fetchSeats = async () => {
      const res = await fetch(`/api/auditoriums/${selectShowing.auditorium._id}/seats`);
      const data = await res.json();
      setSeats(data);
      setAvailableSeats(data);
    };
    fetchSeats();

    sockets.emit("joinScreening", selectShowing._id);

    const handleSeatUpdate = (data: { bookedSeats?: string[]; pendingSeats?: { seatId: string; owner: string }[] }) => {
      if (data.bookedSeats) setBookedSeats(data.bookedSeats);
      if (data.pendingSeats) setPendingSeats(data.pendingSeats);
    };

    sockets.on("seatUpdate", handleSeatUpdate);
    return () => {
      sockets.emit("leaveScreening", selectShowing._id);
      sockets.off("seatUpdate", handleSeatUpdate);
    };
  }, [selectShowing?._id, selectShowing?.auditorium?._id]);

  if (!selectShowing) return <p>Laddar visning...</p>;
  if (!seats.length) return <p>Laddar platser...</p>;

  const rows = seats.reduce((acc: Seat[][], s) => {
    if (!acc[s.rowNumber]) acc[s.rowNumber] = [];
    acc[s.rowNumber].push(s);
    return acc;
  }, []);

  const handleToggle = (seatId: string) => {
    const seat = seats.find((s) => s._id === seatId);
    if (!seat) return;

    const isBooked = bookedSeats.includes(seatId);
    const isPending = pendingSeats.some((p) => p.seatId === seatId && p.owner !== socketId);

    if (isBooked || isPending) return;
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= totalTickets) return;

    toggleCheckoutSeat(seatId);
    sockets.emit(selectedSeats.includes(seatId) ? "seatUnselect" : "seatSelect", {
      screeningId: selectShowing._id,
      seatId,
    });
  };

  return (
    <section className="w-full flex justify-center items-center">
      <article className="flex flex-col items-center w-full">
        <h3>{selectShowing.movie.title}</h3>
        {rows.map((row, rowI) => (
          <div key={rowI} className="flex justify-center mb-1">
            {row.map((seat) => {
              const isBooked = bookedSeats.includes(seat._id);
              const isSelected = selectedSeats.includes(seat._id);
              const isPending = pendingSeats.some((p) => p.seatId === seat._id && p.owner !== socketId);

              let color = "#343d5eff";
              if (isBooked) color = "#d9534f";
              else if (isSelected) color = "#5cb85c";
              else if (isPending) color = "#f0ad4e";

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
                  }}
                />
              );
            })}
          </div>
        ))}
      </article>
    </section>
  );
}
