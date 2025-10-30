
import { useNavigate } from "react-router-dom";
import { useSeats } from "../../BookingPage/components/context/SeatsContext";

export default function UserOrderComponent() {
  const navigate = useNavigate();
  const { selectedSeats, selectedScreening, selectedTickets, userId } = useSeats();

  const handleUserBooking = async () => {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          user_id: userId, // Logged in user
          screening_id: selectedScreening?._id,
          seat_ids: selectedSeats.map((s) => s._id),
          tickets: selectedTickets.map((t) => ({
            ticket_id: t._id,
            quantity: t.quantity,
          })),
        }),
      });

      console.log("Booking response:", res);

      if (!res.ok) {
      const errText = await res.text();
      console.error("Booking error response:", errText); 
      throw new Error("Booking failed");
    }

      const data = await res.json();
      navigate(`/checkout/${data._id}`); 
    } catch (err) {
      console.error("User booking error:", err);
      alert("Kunde inte skapa bokning.");
    }
  };

  return (
    <main className="container_box w-86 h-auto p-3 m-3 text-center">
      <p className="m-3">Bekräfta bokning som medlem:</p>
      <button
        onClick={handleUserBooking}
        className="main_buttons w-36 h-10 text-sm"
      >
        Bekräfta
      </button>
    </main>
  );
}